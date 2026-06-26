'use client';

import { useState, useEffect, useMemo, useCallback, useRef, memo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { loadStripe, Stripe as StripeJs, StripeCardElement } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/Button';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';

// 3 Sisters Services area: New York (Manhattan / Brooklyn / Queens) and California
// (San Francisco). Limiting the State dropdown to these 2 prevents bookings from
// outside coverage. Florida was de-scoped from this site (ADR-3S-001 WS-B); the
// booking form follows suit (ADR-3S-002 D2).
const US_STATES = ['NY', 'CA'];

const XCLEANERS_BASE = 'https://app.xcleaners.app/api/v1/clean/3sisters/public';

// Cloudflare Turnstile (ADR-3S-003) — anti card-testing on /setup-intent.
// Empty sitekey = INERT: no widget renders, no token sent, backend stays inert.
// Set to the real sitekey (from the CF dashboard) to activate, then rebuild.
// TEMP UNBLOCK 2026-06-13: Turnstile widget failing to render on 3sistersservices.com
// (CF 401, no iframe → no token → backend 403 → Book Now stuck disabled). Set empty to
// go INERT (no widget, no token) while the CF Turnstile hostname allowlist is fixed.
// MUST be paired with unsetting TURNSTILE_SECRET on the xcleaners backend (else 403).
// Backlog: restore real sitekey once the widget hostnames are corrected (Caminho 1).
const TURNSTILE_SITEKEY = '';

declare global {
  interface Window {
    turnstile?: {
      render: (el: string | HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// API types (match xcleaners /public/* response shapes)
// ─────────────────────────────────────────────────────────────────────────────

interface ApiService {
  id: string;
  name: string;
  slug: string;
  category: string | null;
  tier: 'basic' | 'deep' | 'premium' | null;
  bedrooms: number | null;
  bathrooms: number | null;
  base_price: string | null;
  estimated_duration_minutes: number | null;
}

interface ApiExtra {
  id: string;
  name: string;
  price: string;
  duration_minutes?: number; // #4 — added to the booking time window
}

interface ApiFrequency {
  id: string;
  name: string;
  interval_weeks: number | null;
  discount_pct: string;
  is_default: boolean;
}

interface ApiEstimate {
  breakdown: {
    base_amount?: string;
    subtotal_service?: string;
    extras_sum?: string;
    subtotal?: string;
    discount_amount?: string;
    tax_amount?: string;
    final_amount?: string;
    [key: string]: string | undefined;
  };
  formatted: {
    subtotal?: string;
    discount?: string;
    adjustment?: string;
    amount_before_tax?: string;
    tax?: string;
    final?: string;
    [key: string]: string | undefined;
  };
}

interface SetupIntentResponse {
  client_secret: string;
  setup_intent_id: string;
  customer_id: string;
  publishable_key: string;
  stripe_account_id: string;
}

// Helper: tier label display
const TIER_LABEL: Record<string, string> = {
  basic: 'Basic',
  deep: 'Deep',
  premium: 'Premium',
};

// Helper: size key from service (used to group services by size)
const sizeKey = (s: ApiService): string => {
  if (s.bedrooms === 0 || (s.name || '').toLowerCase().includes('studio')) return 'studio';
  return `${s.bedrooms ?? '?'}r-${s.bathrooms ?? '?'}b`;
};

const sizeLabel = (s: ApiService): string => {
  if (s.bedrooms === 0 || (s.name || '').toLowerCase().includes('studio')) return 'Studio Apartment';
  const beds = s.bedrooms;
  const baths = s.bathrooms;
  const bedLabel = beds === 1 ? '1 Bedroom' : `${beds} Bedrooms`;
  const bathLabel = baths === 1 ? '1 Bathroom' : `${baths} Bathrooms`;
  return `${bedLabel} × ${bathLabel}`;
};

// Format ISO date "YYYY-MM-DD" + time "HH:MM" → "05/26/2026 @ 10:00 AM"
const formatScheduleLine = (date: string, time: string): string => {
  if (!date && !time) return '';
  let datePart = '';
  if (date) {
    const [y, m, d] = date.split('-');
    if (y && m && d) datePart = `${m}/${d}/${y}`;
  }
  let timePart = '';
  if (time) {
    const [hh, mm] = time.split(':').map(Number);
    if (!isNaN(hh) && !isNaN(mm)) {
      const period = hh >= 12 ? 'PM' : 'AM';
      const h12 = hh === 0 ? 12 : hh > 12 ? hh - 12 : hh;
      timePart = `${h12}:${String(mm).padStart(2, '0')} ${period}`;
    }
  }
  if (datePart && timePart) return `${datePart} @ ${timePart}`;
  return datePart || timePart;
};

// ── Booking calendar + time-slot helpers ────────────────────────────────────
const toISODate = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};
const fromISODate = (iso: string): Date => new Date(`${iso}T00:00:00`);
const formatDateLong = (iso: string): string =>
  fromISODate(iso).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
const hhmmToMin = (s: string): number => parseInt(s.slice(0, 2), 10) * 60 + parseInt(s.slice(3, 5), 10);
const minToHHMM = (t: number): string => `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
// Full set of candidate start times in a day's window (whole hours; taken ones greyed in UI).
const genWindowSlots = (open: string, close: string, durationMin: number, step = 60): string[] => {
  const out: string[] = [];
  const last = hhmmToMin(close) - (durationMin || 120);
  for (let t = hhmmToMin(open); t <= last; t += step) out.push(minToHHMM(t));
  return out;
};
const fmtSlot = (hhmm: string): string => {
  const h = parseInt(hhmm.slice(0, 2), 10);
  const m = parseInt(hhmm.slice(3, 5), 10);
  const ap = h < 12 ? 'AM' : 'PM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${ap}`;
};

// Cache stripePromise per (publishable_key, stripeAccount) — SetupIntent is created
// on the CONNECTED account, so Stripe.js must be loaded with { stripeAccount } or
// confirmCardSetup will look up the SetupIntent on the platform and fail with
// "No such setupintent: 'seti_xxx'".
const stripePromiseCache = new Map<string, Promise<StripeJs | null>>();
const getStripePromise = (pk: string, stripeAccount: string): Promise<StripeJs | null> => {
  const cacheKey = `${pk}::${stripeAccount}`;
  if (!stripePromiseCache.has(cacheKey)) {
    stripePromiseCache.set(cacheKey, loadStripe(pk, { stripeAccount }));
  }
  return stripePromiseCache.get(cacheKey) as Promise<StripeJs | null>;
};

// Turnstile mount point (ADR-3S-003). Memoized so React never reconciles/wipes the
// widget that api.js injects imperatively. The explicit render happens in an effect
// (Cloudflare's auto-render is skipped because api.js is injected dynamically after
// DOMContentLoaded). Renders nothing when the sitekey is empty (inert).
const TurnstileBox = memo(function TurnstileBox() {
  if (!TURNSTILE_SITEKEY) return null;
  return <div id="cf-turnstile-container" className="flex justify-center" />;
});

export const BookingSection = () => (
  <Suspense fallback={<div className="py-16 text-center text-slate-500">Loading booking form…</div>}>
    <BookingSectionInner />
  </Suspense>
);

const BookingSectionInner = () => {
  const searchParams = useSearchParams();

  // ── Catalog state (fetched from xcleaners API on mount) ─────────────────
  const [services, setServices] = useState<ApiService[]>([]);
  const [extras, setExtras] = useState<ApiExtra[]>([]);
  const [frequencies, setFrequencies] = useState<ApiFrequency[]>([]);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogError, setCatalogError] = useState<string>('');

  // ── Form state ──────────────────────────────────────────────────────────
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apt: '',
    city: '',
    state: 'NY',
    zip: '',
    sizeKey: '',         // e.g. 'studio', '2r-1b'  — empty until user actively selects
    tier: '' as '' | 'basic' | 'deep' | 'premium',
    extras: [] as string[],   // extra IDs
    frequencyId: '',     // frequency UUID
    date: '',
    time: '',
    instructions: '',
    terms: false,
    smsConsent: false,   // #3 — TCPA SMS consent (opt-in)
    website: '',         // honeypot
  });

  // ── Estimate state ──────────────────────────────────────────────────────
  const [estimate, setEstimate] = useState<ApiEstimate | null>(null);
  const [estimateLoading, setEstimateLoading] = useState(false);

  // ── Stripe SetupIntent state ────────────────────────────────────────────
  const [setupIntent, setSetupIntent] = useState<SetupIntentResponse | null>(null);
  const [setupIntentLoading, setSetupIntentLoading] = useState(false);
  const [setupIntentError, setSetupIntentError] = useState<string>('');

  // Turnstile (ADR-3S-003): latest token held in a ref to avoid re-render loops.
  const turnstileTokenRef = useRef<string>('');
  const [cardError, setCardError] = useState<string>('');
  const [cardComplete, setCardComplete] = useState(false);

  // Ref to hold the live confirmCardSetup function from inside <Elements>
  const confirmCardRef = useRef<
    | (() => Promise<{ ok: true } | { ok: false; error: string }>)
    | null
  >(null);

  // ── Fetch catalog on mount ──────────────────────────────────────────────
  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        setCatalogLoading(true);
        setCatalogError('');
        const [sRes, eRes, fRes] = await Promise.all([
          fetch(`${XCLEANERS_BASE}/services`, { signal: ctrl.signal }),
          fetch(`${XCLEANERS_BASE}/extras`, { signal: ctrl.signal }),
          fetch(`${XCLEANERS_BASE}/frequencies`, { signal: ctrl.signal }),
        ]);
        if (!sRes.ok || !eRes.ok || !fRes.ok) {
          throw new Error('Service catalog unavailable');
        }
        const [sJson, eJson, fJson] = (await Promise.all([
          sRes.json(), eRes.json(), fRes.json(),
        ])) as [ApiService[], ApiExtra[], ApiFrequency[]];
        setServices(sJson);
        setExtras(eJson);
        setFrequencies(fJson);

        // Default selections from URL params + catalog
        const svcParam = searchParams.get('service');
        const sizeParam = searchParams.get('size');
        const defaultFreq = fJson.find((f) => f.is_default) || fJson[0];

        // Only pre-fill sizeKey if explicit URL param given (deep link from pricing CTA).
        // Otherwise keep '' so user must actively select → sidebar shows placeholder.
        const sizeFromParam = sizeParam === '1-bed' ? '1r-1b'
                : sizeParam === '2-bed' ? '2r-1b'
                : sizeParam === '3-bed' ? '3r-2b'
                : sizeParam === '4bed-plus' ? '4r-3b'
                : '';

        setForm((prev) => ({
          ...prev,
          sizeKey: sizeFromParam,
          // tier stays '' until user picks size (availableTiers depends on sizeKey)
          tier: sizeFromParam ? 'basic' : '',
          frequencyId: svcParam === 'recurring'
            ? (fJson.find((f) => f.name.toLowerCase().includes('weekly'))?.id || defaultFreq?.id || '')
            : (defaultFreq?.id || ''),
        }));
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setCatalogError('Catalog unavailable. Please try again or call (657) 737-7171.');
        }
      } finally {
        setCatalogLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, [searchParams]);

  // ── Derived: unique sizes + tiers from services ─────────────────────────
  const uniqueSizes = useMemo(() => {
    const map = new Map<string, { key: string; label: string }>();
    for (const s of services) {
      const k = sizeKey(s);
      if (!map.has(k)) map.set(k, { key: k, label: sizeLabel(s) });
    }
    return Array.from(map.values());
  }, [services]);

  const availableTiers = useMemo(() => {
    const set = new Set<string>();
    for (const s of services) {
      if (sizeKey(s) === form.sizeKey && s.tier) set.add(s.tier);
    }
    // Order: basic, deep, premium
    return (['basic', 'deep', 'premium'] as const).filter((t) => set.has(t));
  }, [services, form.sizeKey]);

  // Resolve current selected service (size + tier) → service object
  const selectedService = useMemo(() => {
    return services.find((s) => sizeKey(s) === form.sizeKey && s.tier === form.tier) || null;
  }, [services, form.sizeKey, form.tier]);

  // ── Booking availability: owner-released dates (calendar) + free time slots ──
  const [availDays, setAvailDays] = useState<Record<string, { open: string; close: string }>>({});
  const [availLoading, setAvailLoading] = useState(true);
  const [freeSlots, setFreeSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [showCal, setShowCal] = useState(false);
  const calRef = useRef<HTMLDivElement>(null);

  // Close the date calendar popover on outside click.
  useEffect(() => {
    if (!showCal) return;
    const onDown = (e: MouseEvent) => {
      if (calRef.current && !calRef.current.contains(e.target as Node)) setShowCal(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [showCal]);

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        setAvailLoading(true);
        const r = await fetch(`${XCLEANERS_BASE}/availability?days=90`, { signal: ctrl.signal });
        if (r.ok) {
          const j = (await r.json()) as Array<{ date: string; open: boolean; open_time?: string | null; close_time?: string | null }>;
          const map: Record<string, { open: string; close: string }> = {};
          for (const d of j) if (d.open) map[d.date] = { open: d.open_time || '08:00', close: d.close_time || '17:00' };
          setAvailDays(map);
        }
      } catch (err) {
        if ((err as Error).name !== 'AbortError') setAvailDays({});
      } finally {
        setAvailLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, []);

  useEffect(() => {
    if (!form.date) { setFreeSlots([]); return; }
    const durationMin = selectedService
      ? (selectedService.estimated_duration_minutes || 0)
        + form.extras.reduce((sum, id) => sum + (extras.find((e) => e.id === id)?.duration_minutes || 0), 0)
      : 120;
    const ctrl = new AbortController();
    (async () => {
      try {
        setSlotsLoading(true);
        const qs = new URLSearchParams({ date: form.date, duration_minutes: String(durationMin || 120), state: form.state || '', zip: form.zip || '' });
        const r = await fetch(`${XCLEANERS_BASE}/availability/slots?${qs.toString()}`, { signal: ctrl.signal });
        const j = r.ok ? await r.json() : null;
        setFreeSlots(j && Array.isArray(j.slots) ? j.slots : []);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') setFreeSlots([]);
      } finally {
        setSlotsLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, [form.date, form.state, form.zip, form.extras, selectedService, extras]);

  // ── Missing-requirements helper for disabled submit button ──────────────
  // Computes a list of human-readable reasons why the Book Now button is
  // disabled, shown inline below the button so the user knows exactly what
  // is still required. MUST be declared above all conditional early-returns
  // below (catalogLoading, catalogError) to keep hook order stable across
  // renders — moving it below the early-returns triggers React error #310
  // ("Rendered more hooks than during the previous render") on first paint
  // when loading completes.
  const missingReasons = useMemo(() => {
    const reasons: string[] = [];
    if (!selectedService) reasons.push('Choose your home size and service level');
    if (!form.date || !form.time) reasons.push('Pick a preferred date and time');
    if (!setupIntent) reasons.push('Loading payment form…');
    if (!cardComplete) reasons.push('Complete your card details');
    if (!form.terms) reasons.push('Accept Terms of Service');
    return reasons;
  }, [selectedService, form.date, form.time, form.terms, setupIntent, cardComplete]);
  const submitDisabled = submitting || missingReasons.length > 0;

  // ── Live estimate (debounced ~500ms) ────────────────────────────────────
  const fetchEstimate = useCallback(async () => {
    if (!selectedService) {
      setEstimate(null);
      return;
    }
    setEstimateLoading(true);
    try {
      const res = await fetch(`${XCLEANERS_BASE}/estimate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: selectedService.id,
          extras: form.extras.map((id) => ({ extra_id: id, qty: 1 })),
          frequency_id: form.frequencyId || null,
          // address → per-location sales tax in the live estimate
          state: form.state || null,
          zip_code: form.zip || null,
        }),
      });
      if (res.ok) {
        const data = (await res.json()) as ApiEstimate;
        setEstimate(data);
      } else {
        setEstimate(null);
      }
    } catch {
      setEstimate(null);
    } finally {
      setEstimateLoading(false);
    }
  }, [selectedService, form.extras, form.frequencyId, form.state, form.zip]);

  useEffect(() => {
    const t = setTimeout(fetchEstimate, 500);
    return () => clearTimeout(t);
  }, [fetchEstimate]);

  // ── Fetch SetupIntent (debounced 800ms) when email + name change ───────
  // Invalidates current SetupIntent and re-fetches a fresh one.
  // Stripe Customer becomes orphaned in test mode but that's acceptable.
  useEffect(() => {
    const { firstName, lastName, email } = form;
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !email.includes('@')) {
      setSetupIntent(null);
      setSetupIntentError('');
      return;
    }
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      setSetupIntentLoading(true);
      setSetupIntentError('');
      // Invalidate previous intent so user must re-enter card
      setSetupIntent(null);
      setCardComplete(false);
      setCardError('');
      // Turnstile race guard (ADR-3S-003): when the widget is configured, wait up to
      // ~3s for its token before calling /setup-intent so a fast autofill doesn't fire
      // before the token is ready (which would 403 under enforcement). Inert when
      // TURNSTILE_SITEKEY is empty — the loop is skipped entirely.
      if (TURNSTILE_SITEKEY && !turnstileTokenRef.current) {
        for (let i = 0; i < 15 && !turnstileTokenRef.current; i++) {
          await new Promise((r) => setTimeout(r, 200));
          if (ctrl.signal.aborted) return;
        }
      }
      try {
        const res = await fetch(`${XCLEANERS_BASE}/setup-intent`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email, first_name: firstName, last_name: lastName,
            turnstile_token: turnstileTokenRef.current || undefined, // ADR-3S-003
          }),
          signal: ctrl.signal,
        });
        if (!res.ok) {
          throw new Error(`Setup intent failed (${res.status})`);
        }
        const data = (await res.json()) as SetupIntentResponse;
        if (!data.client_secret || !data.publishable_key) {
          throw new Error('Invalid setup intent response');
        }
        setSetupIntent(data);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setSetupIntentError(
            'Could not initialize secure payment. Please try again or call (657) 737-7171.'
          );
        }
      } finally {
        setSetupIntentLoading(false);
        // Refresh the single-use Turnstile token for the next request (implicit widget).
        if (TURNSTILE_SITEKEY && window.turnstile) {
          turnstileTokenRef.current = '';
          try { window.turnstile.reset(); } catch { /* noop */ }
        }
      }
    }, 800);
    return () => {
      ctrl.abort();
      clearTimeout(t);
    };
  }, [form.firstName, form.lastName, form.email]);

  // ── Turnstile widget (ADR-3S-003) — explicit render via readiness poll.
  // api.js is injected dynamically (after DOMContentLoaded), so Cloudflare's implicit
  // auto-render does not fire. We poll until window.turnstile + the container are ready,
  // then explicitly render once (childElementCount guard prevents a double render if the
  // effect runs twice). Inert when TURNSTILE_SITEKEY is empty (no script, no widget).
  useEffect(() => {
    if (!TURNSTILE_SITEKEY) return;
    const SCRIPT_ID = 'cf-turnstile-script';
    if (!document.getElementById(SCRIPT_ID)) {
      const s = document.createElement('script');
      s.id = SCRIPT_ID;
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      s.async = true;
      s.defer = true;
      document.head.appendChild(s);
    }
    let done = false;
    let tries = 0;
    const iv = setInterval(() => {
      if (done || tries++ > 60) { clearInterval(iv); return; }
      const el = document.getElementById('cf-turnstile-container');
      if (!window.turnstile || !el || el.childElementCount > 0) return;
      try {
        window.turnstile.render(el, {
          sitekey: TURNSTILE_SITEKEY,
          callback: (token: string) => { turnstileTokenRef.current = token; },
          'error-callback': () => { turnstileTokenRef.current = ''; },
          'expired-callback': () => { turnstileTokenRef.current = ''; },
        });
        done = true;
        clearInterval(iv);
      } catch { /* retry next tick */ }
    }, 250);
    return () => clearInterval(iv);
  }, []);

  // ── Helpers ─────────────────────────────────────────────────────────────
  const update = (name: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const toggleExtra = (id: string) =>
    setForm((prev) => ({
      ...prev,
      extras: prev.extras.includes(id) ? prev.extras.filter((x) => x !== id) : [...prev.extras, id],
    }));

  // ── Submit handler ──────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.website) return;
    if (!form.terms) return;
    if (!selectedService) {
      setSubmitError('Please select a service.');
      return;
    }
    if (!setupIntent || !confirmCardRef.current) {
      setSubmitError(
        'Please add a card to confirm your booking. You won’t be charged until your cleaning is complete.'
      );
      return;
    }
    if (!cardComplete) {
      setSubmitError(
        'Please add a card to confirm your booking. You won’t be charged until your cleaning is complete.'
      );
      return;
    }

    setSubmitting(true);
    setSubmitError('');
    setCardError('');

    // 1) Confirm card setup with Stripe FIRST. If it fails, abort — don't
    //    send anything to xcleaners or FormSubmit.
    const cardResult = await confirmCardRef.current();
    if (!cardResult.ok) {
      setSubmitting(false);
      setCardError(cardResult.error);
      setSubmitError(cardResult.error);
      return;
    }

    const serviceLabel = selectedService.name + (selectedService.tier ? ` (${TIER_LABEL[selectedService.tier]})` : '');
    const extrasLabels = form.extras
      .map((id) => extras.find((e) => e.id === id)?.name)
      .filter(Boolean) as string[];
    const freqObj = frequencies.find((f) => f.id === form.frequencyId);
    const freqLabel = freqObj?.name || '';
    const estimateLine = estimate?.formatted?.final
      ? `Estimated quote: ${estimate.formatted.final}`
      : '';

    const messageParts = [estimateLine, form.instructions].filter(Boolean);

    const xclPayload = {
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      phone: form.phone,
      service_requested: serviceLabel,
      address: form.address + (form.apt ? ' ' + form.apt : ''),
      city: form.city,
      state: form.state,
      zip_code: form.zip,
      bedrooms: selectedService.bedrooms ?? undefined,
      bathrooms: selectedService.bathrooms ?? undefined,
      // #2 — send exact catalog IDs so the booking links the precise rows
      // (ends the fragile name-match fallback).
      service_id: selectedService.id,
      frequency_id: form.frequencyId || undefined,
      extras: extrasLabels,  // text names — kept for the email/lead message
      // #1 — structured extras so the booking is priced + persisted as line items
      extra_items: form.extras.map((id) => ({ extra_id: id, qty: 1 })),
      frequency: freqLabel,
      preferred_date: form.date || undefined,
      preferred_time: form.time || undefined,
      message: messageParts.join('\n\n') || undefined,
      // #3 — TCPA SMS opt-in (false => client receives no SMS, legal fail-safe)
      sms_consent: form.smsConsent,
      website: form.website,
      // Stripe linkage — card is on file, charged after service completion
      setup_intent_id: setupIntent.setup_intent_id,
      stripe_customer_id: setupIntent.customer_id,
    };

        // Fallback proxy - /api/contact (CF Pages Function -> clawtobusiness backend)
    // Full notification chain: email owner+SMS+GHL, client confirmation email+SMS,
    // with internal FormSubmit fallback if the backend itself is unreachable.
    const bookingSummary =
      'BOOKING:\n' +
      '- ' + serviceLabel + (extrasLabels.length ? ' + ' + extrasLabels.join(', ') : '') + '\n' +
      (freqLabel ? '- ' + freqLabel + '\n' : '') +
      '- ' + form.date + ' at ' + form.time + '\n' +
      '- ' + form.address + (form.apt ? ' ' + form.apt : '') + ', ' + form.city + ', ' + form.state + ' ' + form.zip + '\n' +
      (estimateLine ? estimateLine + '\n' : '') +
      'Card on file: ' + setupIntent.setup_intent_id;

    // Sequential: xcleaners primary -> fallback proxy only if xcleaners fails


    let xclOk = false;
    try {
      const xclRes = await fetch(XCLEANERS_BASE + '/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(xclPayload),
      });
      xclOk = xclRes.ok;
    } catch {
      xclOk = false;
    }

    let fsOk = false;
    if (!xclOk) {
      try {
        const fsRes = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: (form.firstName + ' ' + form.lastName).trim(),
            email: form.email,
            phone: form.phone,
            service: serviceLabel,
            message: 'BOOKING FALLBACK - xcleaners unreachable\n\n' + bookingSummary + '\n\nInstructions: ' + (form.instructions || '(none)'),
            sms_consent: form.smsConsent,
          }),
        });
        if (fsRes.ok) {
          const data = await fsRes.json();
          fsOk = data.success === true;
        }
      } catch {
        fsOk = false;
      }
    }

    if (!xclOk && !fsOk) {
      setSubmitting(false);
      setSubmitError('Unable to send — please try again or call (657) 737-7171.');
      return;
    }

    // generate_lead on completed booking (proven lead — user finished the wizard) —
    // reuses the existing "GA4 — Generate Lead" tag (Custom Event trigger `generate_lead`).
    // Guard prod-only (skip localhost / preview) to match TrackingEvents + contact form.
    if (typeof window !== 'undefined') {
      const host = window.location.hostname;
      const isLocal =
        host === 'localhost' ||
        host === '127.0.0.1' ||
        host.endsWith('.local') ||
        host.endsWith('.pages.dev');
      if (!isLocal) {
        const rawAmount = estimate?.breakdown?.final_amount;
        const bookingValue = rawAmount ? parseFloat(rawAmount) : undefined;
        const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({
          event: 'generate_lead',
          source: 'booking_wizard',
          form_service: serviceLabel,
          value: Number.isFinite(bookingValue) ? bookingValue : undefined,
          currency: 'USD',
        });
      }
    }

    setSubmitted(true);
    setSubmitting(false);
  };

  const inputCls =
    'w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm font-inter text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent';
  const labelCls = 'block text-xs font-medium text-slate-700 uppercase tracking-wide mb-1.5';

  if (submitted) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-[50vh] flex items-center">
        <div className="max-w-2xl mx-auto text-center bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-outfit font-bold text-3xl sm:text-4xl text-slate-900 mb-3">
            Booking Confirmed!
          </h2>
          <p className="text-slate-600 mb-6">
            Thank you, <strong>{form.firstName}</strong>. We received your booking. You&apos;ll get a confirmation email shortly with details and a link to manage your booking.
          </p>
          <p className="text-sm text-slate-500 mb-8">
            Confirmation sent to <strong>{form.email}</strong>.<br/>
            Need to reach us? Call <a href="tel:+16577377171" className="text-blue-600 underline">(657) 737-7171</a> (Mon–Sat 8am–6pm).
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" size="lg" href="/">Back to Home</Button>
            <Button variant="primary" size="lg" href="tel:+16577377171">Call Us Now</Button>
          </div>
        </div>
      </section>
    );
  }

  if (catalogLoading) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 text-sm">Loading our services and pricing…</p>
        </div>
      </section>
    );
  }

  if (catalogError) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-[50vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <p className="text-red-700 mb-4">{catalogError}</p>
          <Button variant="primary" size="lg" href="tel:+16577377171">Call (657) 737-7171</Button>
        </div>
      </section>
    );
  }

  // ── BOOKING SUMMARY (sidebar desktop / sticky mobile) — invoice-style estimate ──
  const scheduleLine = formatScheduleLine(form.date, form.time);
  const selectedFreq = frequencies.find((f) => f.id === form.frequencyId);
  const freqDiscount = selectedFreq ? parseFloat(selectedFreq.discount_pct) : 0;
  const freqLine = selectedFreq
    ? freqDiscount > 0 ? `${selectedFreq.name} · ${freqDiscount}% off` : selectedFreq.name
    : '';
  const sizeDescLine = selectedService ? sizeLabel(selectedService) : '';
  const tierLine = selectedService?.tier ? TIER_LABEL[selectedService.tier] : '';
  const subtotalServiceFmt = estimate?.breakdown.subtotal_service
    ? `$${parseFloat(estimate.breakdown.subtotal_service).toFixed(2)}`
    : null;

  // Estimated time = service duration + Σ selected-extra durations (#4/#5).
  const totalDurationMin = selectedService
    ? (selectedService.estimated_duration_minutes || 0)
      + form.extras.reduce((sum, id) => sum + (extras.find((e) => e.id === id)?.duration_minutes || 0), 0)
    : 0;
  const estimatedDurationLabel = totalDurationMin > 0
    ? (() => {
        const h = Math.floor(totalDurationMin / 60);
        const m = totalDurationMin % 60;
        return [h ? `${h}h` : '', m ? `${m}m` : ''].filter(Boolean).join(' ');
      })()
    : '';

  const BookingSummary = ({ compact = false }: { compact?: boolean }) => (
    <div className={`bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden ${compact ? 'p-4' : 'p-5'}`}>
      {/* Blue highlight banner header (brand #2563eb) */}
      <div className={`${compact ? '-mx-4 -mt-4' : '-mx-5 -mt-5'} mb-4 px-5 py-3 bg-blue-600`}>
        <h3 className="font-outfit font-bold text-xs uppercase tracking-wider text-white">
          Booking Summary
        </h3>
      </div>

      {selectedService ? (
        <>
          {/* Service line */}
          <div className="flex items-start justify-between gap-2 text-sm">
            <div className="text-slate-900 font-medium">
              {sizeDescLine}
              {tierLine && <span className="text-slate-500 font-normal"> · {tierLine}</span>}
            </div>
            {subtotalServiceFmt && (
              <div className="font-semibold text-slate-900 whitespace-nowrap">{subtotalServiceFmt}</div>
            )}
          </div>

          {/* Date/time */}
          {scheduleLine && (
            <div className="text-xs text-slate-500 mt-1">{scheduleLine}</div>
          )}

          {/* Frequency */}
          {freqLine && (
            <div className={`text-xs mt-1 ${freqDiscount > 0 ? 'text-green-700 font-medium' : 'text-slate-500'}`}>
              {freqLine}
            </div>
          )}

          {/* Extras (if any) — itemized by name + price (#5) */}
          {form.extras.length > 0 && (
            <div className="mt-2 pt-2 border-t border-slate-100 space-y-1">
              <div className="text-[11px] uppercase tracking-wide text-slate-400">Add-ons</div>
              {form.extras.map((id) => {
                const ex = extras.find((e) => e.id === id);
                if (!ex) return null;
                return (
                  <div key={id} className="flex items-center justify-between gap-2 text-xs text-slate-600">
                    <span>{ex.name}</span>
                    <span className="whitespace-nowrap">${parseFloat(ex.price).toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Estimated duration — service + Σ extras (#4/#5) */}
          {estimatedDurationLabel && (
            <div className="text-xs text-slate-500 mt-2">
              <span className="text-slate-700 font-medium">Estimated time: </span>{estimatedDurationLabel}
            </div>
          )}

          {/* Breakdown */}
          <div className="border-t border-slate-100 mt-4 pt-3 space-y-1.5 text-sm">
            {estimate?.formatted.subtotal && (
              <div className="flex justify-between text-slate-600">
                <span className="text-xs uppercase tracking-wide">Sub-total</span>
                <span>{estimate.formatted.subtotal}</span>
              </div>
            )}
            {estimate?.formatted.discount && parseFloat(estimate.breakdown.discount_amount || '0') > 0 && (
              <div className="flex justify-between text-green-700">
                <span className="text-xs uppercase tracking-wide">Discount</span>
                <span>−{estimate.formatted.discount}</span>
              </div>
            )}
            {estimate?.formatted.tax && parseFloat(estimate.breakdown.tax_amount || '0') > 0 && (
              <div className="flex justify-between text-slate-500">
                <span className="text-xs uppercase tracking-wide">Sales tax</span>
                <span>{estimate.formatted.tax}</span>
              </div>
            )}
          </div>

          {/* TOTAL */}
          <div className="border-t-2 border-slate-200 mt-3 pt-3 flex items-baseline justify-between">
            <span className="font-outfit font-bold text-sm uppercase tracking-wide text-slate-900">Total</span>
            <span className="font-outfit font-bold text-2xl text-blue-700">
              {estimateLoading
                ? <span className="text-base text-slate-400 italic">calculating…</span>
                : estimate?.formatted.final || '—'}
            </span>
          </div>

          {/* Card-on-file note (sutil, sem emoji — alinhado ao zero-AI-traces) */}
          <div className="border-t border-slate-100 mt-3 pt-3 flex items-start gap-2">
            <svg className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="2" y="6" width="20" height="12" rx="2" />
              <path d="M2 10h20" />
            </svg>
            <p className="text-[11px] text-slate-500 leading-snug">
              Card on file — charged when cleaning is complete.
            </p>
          </div>

          <p className="text-[10px] text-slate-400 mt-3 leading-snug italic">
            Estimate based on standard pricing. Final quote confirmed by our team.
          </p>
        </>
      ) : (
        <p className="text-sm text-slate-500">
          Select your home size and service level to see your estimated total.
        </p>
      )}
    </div>
  );

  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 pb-32 lg:pb-16">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_360px] gap-6 lg:gap-8 lg:items-start">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* STEP 1 — Contact */}
            <div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Step 1</span>
                <h3 className="font-outfit font-bold text-lg text-slate-900">Who you are</h3>
              </div>
              <p className="text-xs text-slate-500 mb-4">We&apos;ll use this to confirm your booking and send your quote.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>First name*</label>
                  <input required type="text" value={form.firstName} onChange={(e) => update('firstName', e.target.value)} className={inputCls} autoComplete="given-name" />
                </div>
                <div>
                  <label className={labelCls}>Last name*</label>
                  <input required type="text" value={form.lastName} onChange={(e) => update('lastName', e.target.value)} className={inputCls} autoComplete="family-name" />
                </div>
                <div>
                  <label className={labelCls}>Email*</label>
                  <input required type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className={inputCls} autoComplete="email" />
                </div>
                <div>
                  <label className={labelCls}>Phone*</label>
                  <input required type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="(555) 123-4567" className={inputCls} autoComplete="tel" />
                </div>
              </div>
            </div>

            {/* STEP 2 — Address */}
            <div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Step 2</span>
                <h3 className="font-outfit font-bold text-lg text-slate-900">Service address</h3>
              </div>
              <p className="text-xs text-slate-500 mb-4">Where would you like us to clean?</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className={labelCls}>Street address*</label>
                  <input required type="text" value={form.address} onChange={(e) => update('address', e.target.value)} className={inputCls} autoComplete="street-address" />
                </div>
                <div>
                  <label className={labelCls}>Apt / Suite</label>
                  <input type="text" value={form.apt} onChange={(e) => update('apt', e.target.value)} className={inputCls} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>City*</label>
                  <input required type="text" value={form.city} onChange={(e) => update('city', e.target.value)} className={inputCls} autoComplete="address-level2" />
                </div>
                <div className="grid grid-cols-2 gap-3 sm:col-span-1">
                  <div>
                    <label className={labelCls}>State*</label>
                    <select required value={form.state} onChange={(e) => update('state', e.target.value)} className={inputCls}>
                      {US_STATES.map((s) => (<option key={s} value={s}>{s}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Zip*</label>
                    <input required type="text" inputMode="numeric" pattern="[0-9]{5}" maxLength={5} value={form.zip} onChange={(e) => update('zip', e.target.value)} className={inputCls} autoComplete="postal-code" />
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3 — Size + Tier (from API) */}
            <div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Step 3</span>
                <h3 className="font-outfit font-bold text-lg text-slate-900">Your space &amp; service level</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Home size*</label>
                  <select required value={form.sizeKey} onChange={(e) => {
                    update('sizeKey', e.target.value);
                    // Reset tier when size changes — availableTiers depends on size
                    update('tier', e.target.value ? 'basic' : '');
                  }} className={inputCls}>
                    <option value="" disabled>Select your home size</option>
                    {uniqueSizes.map((s) => (<option key={s.key} value={s.key}>{s.label}</option>))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Service level*</label>
                  <select required value={form.tier} onChange={(e) => update('tier', e.target.value)} className={inputCls} disabled={!form.sizeKey}>
                    <option value="" disabled>{form.sizeKey ? 'Select service level' : 'Pick home size first'}</option>
                    {availableTiers.map((t) => (<option key={t} value={t}>{TIER_LABEL[t]}</option>))}
                  </select>
                </div>
              </div>
              {selectedService?.base_price && (
                <p className="text-xs text-slate-500 mt-2">
                  Starting at <strong className="text-slate-900">${selectedService.base_price}</strong>
                  {selectedService.estimated_duration_minutes && ` · ~${Math.round(selectedService.estimated_duration_minutes / 60)}h estimated`}
                </p>
              )}
            </div>

            {/* STEP 4 — Extras (from API) */}
            <div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Step 4</span>
                <h3 className="font-outfit font-bold text-lg text-slate-900">Select extras</h3>
              </div>
              <p className="text-xs text-slate-500 mb-4">Add-ons to customize your cleaning (optional).</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {extras.map((ex) => {
                  const active = form.extras.includes(ex.id);
                  return (
                    <button type="button" key={ex.id} onClick={() => toggleExtra(ex.id)}
                      className={`text-sm px-3 py-2.5 rounded-lg border-2 font-medium transition-colors text-left ${
                        active ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}>
                      <div className="flex items-center justify-between gap-2">
                        <span>{active ? '✓ ' : ''}{ex.name}</span>
                        <span className="text-xs opacity-75">+${ex.price}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 5 — Frequency (from API) */}
            <div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Step 5</span>
                <h3 className="font-outfit font-bold text-lg text-slate-900">How often?</h3>
              </div>
              <p className="text-xs text-slate-500 mb-4">Recurring cleanings get a standing discount. Cancel anytime.</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {frequencies.map((f) => {
                  const active = form.frequencyId === f.id;
                  const discountNum = parseFloat(f.discount_pct);
                  return (
                    <button type="button" key={f.id} onClick={() => update('frequencyId', f.id)}
                      className={`text-sm px-3 py-3 rounded-lg border-2 font-medium transition-colors flex flex-col items-center ${
                        active ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}>
                      <span>{f.name}</span>
                      {discountNum > 0 && (
                        <span className="text-[10px] mt-0.5 opacity-80">{discountNum}% off</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 6 — Payment method (Stripe) */}
            <div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Step 6</span>
                <h3 className="font-outfit font-bold text-lg text-slate-900">Payment method</h3>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                We save your card securely. You won&apos;t be charged until your cleaning is complete.
              </p>
              <CardStep
                setupIntent={setupIntent}
                setupIntentLoading={setupIntentLoading}
                setupIntentError={setupIntentError}
                billingName={`${form.firstName} ${form.lastName}`.trim()}
                billingEmail={form.email}
                cardError={cardError}
                onCardChange={(complete, error) => {
                  setCardComplete(complete);
                  setCardError(error || '');
                }}
                registerConfirm={(fn) => { confirmCardRef.current = fn; }}
              />
            </div>

            {/* STEP 7 — Schedule */}
            <div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Step 7</span>
                <h3 className="font-outfit font-bold text-lg text-slate-900">Schedule</h3>
              </div>
              <p className="text-xs text-slate-500 mb-4">Mon–Sat. Past days can&apos;t be selected; booked times show greyed in the list.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Preferred date*</label>
                  <div className="relative" ref={calRef}>
                    <button
                      type="button"
                      onClick={() => setShowCal((s) => !s)}
                      className={`${inputCls} text-left flex items-center justify-between`}
                    >
                      <span className={form.date ? 'text-slate-900' : 'text-slate-400'}>
                        {form.date ? formatDateLong(form.date) : 'Select a date'}
                      </span>
                      <svg className="w-4 h-4 text-slate-400 flex-shrink-0 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <path d="M16 2v4M8 2v4M3 10h18" />
                      </svg>
                    </button>
                    {showCal && (
                      <div className="absolute bottom-full left-0 z-30 mb-1 bg-white border border-slate-200 rounded-lg shadow-xl p-2">
                        <DayPicker
                          mode="single"
                          selected={form.date ? fromISODate(form.date) : undefined}
                          onSelect={(d?: Date) => { setForm((p) => ({ ...p, date: d ? toISODate(d) : '', time: '' })); setShowCal(false); }}
                          disabled={[{ before: new Date(new Date().setHours(0, 0, 0, 0)) }, (d: Date) => !availDays[toISODate(d)]]}
                          startMonth={new Date()}
                        />
                      </div>
                    )}
                  </div>
                  {!availLoading && Object.keys(availDays).length === 0 && (
                    <p className="text-xs text-amber-600 mt-1">Scheduling unavailable — please call (657) 737-7171.</p>
                  )}
                </div>
                <div>
                  <label className={labelCls}>Preferred time*</label>
                  <select
                    required
                    value={form.time}
                    onChange={(e) => update('time', e.target.value)}
                    disabled={!form.date || slotsLoading}
                    className={inputCls}
                  >
                    <option value="">
                      {!form.date ? 'Pick a date first' : slotsLoading ? 'Loading…' : 'Select a time'}
                    </option>
                    {form.date && !slotsLoading && (() => {
                      const win = availDays[form.date];
                      const all = win ? genWindowSlots(win.open, win.close, totalDurationMin || 120) : [];
                      const freeSet = new Set(freeSlots);
                      return all.map((t) => (
                        <option key={t} value={t} disabled={!freeSet.has(t)}>
                          {fmtSlot(t)}{freeSet.has(t) ? '' : ' — booked'}
                        </option>
                      ));
                    })()}
                  </select>
                </div>
              </div>
            </div>

            {/* STEP 8 — Notes */}
            <div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Step 8</span>
                <h3 className="font-outfit font-bold text-lg text-slate-900">Special instructions</h3>
              </div>
              <textarea rows={3} value={form.instructions} onChange={(e) => update('instructions', e.target.value)}
                placeholder="Access instructions, parking notes, pets, areas to skip, etc. (optional)"
                className={inputCls}
              />
            </div>

            {/* Honeypot */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
              value={form.website} onChange={(e) => update('website', e.target.value)}
              className="absolute -left-[9999px] w-px h-px opacity-0" />

            {/* Cloudflare Turnstile (ADR-3S-003) — managed widget; empty when inert */}
            <TurnstileBox />

            {/* Terms + disclaimer */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <label className="flex items-start gap-3 cursor-pointer">
                <input required type="checkbox" checked={form.terms} onChange={(e) => update('terms', e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-600" />
                <span className="text-sm font-medium text-slate-700">
                  I affirm that I have read and agree to the{' '}
                  <a href="/legal/terms" className="text-blue-600 underline">Terms of Service</a>.
                </span>
              </label>
              {/* #3 — TCPA SMS opt-in (separate, unchecked by default; not required) */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={form.smsConsent} onChange={(e) => update('smsConsent', e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-600" />
                <span className="text-sm font-medium text-slate-700">
                  Text me booking updates &amp; reminders. I agree to receive SMS from 3 Sisters Services
                  at the number provided. Msg &amp; data rates may apply; reply STOP to opt out. <span className="text-slate-400">(optional)</span>
                </span>
              </label>
              <p className="text-[11px] leading-relaxed text-slate-500 pl-7">
                By entering any information, you affirm you have read and agree to the{' '}
                <a href="/legal/terms" className="text-blue-600 underline">Terms of Service</a>{' '}and{' '}
                <a href="/legal/privacy" className="text-blue-600 underline">Privacy Policy</a>. By clicking <strong>Book Now</strong> you
                agree your order reflects the specifics of your home. We reserve the right to modify your booking to account for additional costs.
                Cancellations made less than 72 hours before your scheduled cleaning are subject to a <strong>$50 cancellation fee</strong>. You also
                agree and authorize 3 Sisters Services Cleaning and its vendors to deliver marketing and other material via the information provided.
              </p>
            </div>

            {/* Submit */}
            <div className="pt-2">
              {submitError && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                  {submitError}
                </div>
              )}
              <Button type="submit" variant="primary" size="lg" className="w-full" disabled={submitDisabled}>
                {submitting ? 'Confirming…' : 'Book Now'}
              </Button>
              {!submitting && missingReasons.length > 0 && (
                <p className="text-xs text-amber-600 text-center mt-2">
                  {missingReasons.join(' · ')}
                </p>
              )}
              <p className="text-[11px] text-slate-500 text-center mt-3">
                By clicking the <strong>Book Now</strong> button you are agreeing to our{' '}
                <a href="/legal/terms" className="text-blue-600 underline">Terms of Service</a>{' '}and{' '}
                <a href="/legal/privacy" className="text-blue-600 underline">Privacy Policy</a>.
              </p>
              <p className="text-xs text-slate-500 text-center mt-2">
                You&apos;ll receive a confirmation email shortly with details and a link to manage your booking.
              </p>
            </div>
          </form>
        </div>

        {/* Sidebar BOOKING SUMMARY (desktop only, sticky) */}
        <aside className="hidden lg:block lg:sticky lg:top-24">
          <BookingSummary />
        </aside>
      </div>

      {/* Sticky bottom bar (mobile only) — collapsed pill, tap to expand */}
      <MobileSummaryBar
        estimate={estimate}
        estimateLoading={estimateLoading}
        selectedService={selectedService}
        summary={<BookingSummary compact />}
      />
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// CardStep — Stripe CardElement wrapped in <Elements> when SetupIntent ready.
// Skeleton while loading. Error state when /setup-intent fails.
// ─────────────────────────────────────────────────────────────────────────────

interface CardStepProps {
  setupIntent: SetupIntentResponse | null;
  setupIntentLoading: boolean;
  setupIntentError: string;
  billingName: string;
  billingEmail: string;
  cardError: string;
  onCardChange: (complete: boolean, error?: string) => void;
  registerConfirm: (
    fn: () => Promise<{ ok: true } | { ok: false; error: string }>
  ) => void;
}

const CardStep = ({
  setupIntent,
  setupIntentLoading,
  setupIntentError,
  billingName,
  billingEmail,
  cardError,
  onCardChange,
  registerConfirm,
}: CardStepProps) => {
  // No name/email yet → prompt user to fill in contact info first
  if (!setupIntent && !setupIntentLoading && !setupIntentError) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center">
        <p className="text-sm text-slate-500">
          Fill in your name and email above to securely add your card.
        </p>
      </div>
    );
  }

  // Loading or refreshing the SetupIntent → skeleton
  if (setupIntentLoading || !setupIntent) {
    if (setupIntentError) {
      return (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-4">
          <p className="text-sm text-red-700">{setupIntentError}</p>
        </div>
      );
    }
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-5 animate-pulse">
        <div className="h-3 w-24 bg-slate-200 rounded mb-3" />
        <div className="h-10 w-full bg-white border border-slate-200 rounded" />
      </div>
    );
  }

  const stripePromise = getStripePromise(setupIntent.publishable_key, setupIntent.stripe_account_id);

  return (
    <Elements
      // Key on client_secret forces re-mount when intent changes
      key={setupIntent.client_secret}
      stripe={stripePromise}
      options={{ clientSecret: setupIntent.client_secret }}
    >
      <CardForm
        clientSecret={setupIntent.client_secret}
        billingName={billingName}
        billingEmail={billingEmail}
        cardError={cardError}
        onCardChange={onCardChange}
        registerConfirm={registerConfirm}
      />
    </Elements>
  );
};

interface CardFormProps {
  clientSecret: string;
  billingName: string;
  billingEmail: string;
  cardError: string;
  onCardChange: (complete: boolean, error?: string) => void;
  registerConfirm: (
    fn: () => Promise<{ ok: true } | { ok: false; error: string }>
  ) => void;
}

const CardForm = ({
  clientSecret,
  billingName,
  billingEmail,
  cardError,
  onCardChange,
  registerConfirm,
}: CardFormProps) => {
  const stripe = useStripe();
  const elements = useElements();

  // Track latest props in refs so the registered confirm function always
  // uses the freshest billing details without forcing re-registration.
  const billingNameRef = useRef(billingName);
  const billingEmailRef = useRef(billingEmail);
  useEffect(() => { billingNameRef.current = billingName; }, [billingName]);
  useEffect(() => { billingEmailRef.current = billingEmail; }, [billingEmail]);

  // Register the confirmCardSetup callback with the parent whenever Stripe/Elements ready
  useEffect(() => {
    if (!stripe || !elements) return;
    registerConfirm(async () => {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        return { ok: false, error: 'Card field not ready. Please try again.' };
      }
      const result = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: cardElement as StripeCardElement,
          billing_details: {
            name: billingNameRef.current,
            email: billingEmailRef.current,
          },
        },
      });
      if (result.error) {
        return { ok: false, error: result.error.message || 'Card was declined. Please try another.' };
      }
      return { ok: true };
    });
  }, [stripe, elements, clientSecret, registerConfirm]);

  return (
    <div>
      <div className="rounded-lg border border-slate-300 bg-white px-4 py-3.5 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent">
        <CardElement
          options={{
            hidePostalCode: false,
            style: {
              base: {
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif',
                color: '#0F172A',
                '::placeholder': { color: '#94A3B8' },
              },
              invalid: { color: '#B91C1C' },
            },
          }}
          onChange={(e) => onCardChange(e.complete, e.error?.message)}
        />
        {cardError && (
          <p className="mt-2 text-xs text-red-700">{cardError}</p>
        )}
      </div>

      {/* Trust row — Stripe + uniform colored card brands (same size/format).
          Inline SVGs, no external images, no ornamental emojis. */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2.5">
        <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 mr-1">
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="11" width="18" height="10" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Secured by <strong className="font-semibold" style={{ color: '#635BFF' }}>Stripe</strong>
        </span>
        <span className="flex items-center gap-2" aria-label="Accepted cards: Visa, Mastercard, American Express, Discover">
          <span className="inline-flex h-9 w-14 items-center justify-center rounded-md border border-slate-200 bg-white shadow-sm text-sm font-bold italic" style={{ color: '#1A1F71' }}>VISA</span>
          <span className="inline-flex h-9 w-14 items-center justify-center rounded-md border border-slate-200 bg-white shadow-sm" aria-hidden="true">
            <svg viewBox="0 0 32 20" className="h-6"><circle cx="13" cy="10" r="6.5" fill="#EB001B" /><circle cx="19" cy="10" r="6.5" fill="#F79E1B" fillOpacity="0.9" /></svg>
          </span>
          <span className="inline-flex h-9 w-14 items-center justify-center rounded-md border border-slate-200 bg-white shadow-sm text-[11px] font-bold" style={{ color: '#2E77BC' }}>AMEX</span>
          <span className="inline-flex h-9 w-14 items-center justify-center rounded-md border border-slate-200 bg-white shadow-sm text-[9px] font-bold tracking-tight text-slate-700">DISC<span style={{ color: '#FF6000' }}>O</span>VER</span>
        </span>
      </div>
      <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
        Your card is encrypted and securely stored by Stripe. You will not be
        charged now — payment is processed only after your cleaning is complete.
      </p>
    </div>
  );
};

/** Mobile-only sticky bar that shows the running total + expandable summary. */
const MobileSummaryBar = ({
  estimate,
  estimateLoading,
  selectedService,
  summary,
}: {
  estimate: ApiEstimate | null;
  estimateLoading: boolean;
  selectedService: ApiService | null;
  summary: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  if (!selectedService) return null;
  return (
    <>
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        {open && <div className="p-4 max-h-[60vh] overflow-y-auto">{summary}</div>}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-4 bg-white"
          aria-expanded={open}
        >
          <div className="flex flex-col items-start">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              {open ? 'Tap to close' : 'Estimated total'}
            </span>
            <span className="font-outfit font-bold text-xl text-blue-700">
              {estimateLoading
                ? <span className="text-base text-slate-400 italic">calculating…</span>
                : estimate?.formatted.final || '—'}
            </span>
          </div>
          <span className="text-sm font-medium text-blue-600">
            {open ? '▼ Close' : '▲ View details'}
          </span>
        </button>
      </div>
    </>
  );
};
