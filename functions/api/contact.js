/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Proxies the 3 Sisters contact form (3sistersservices.com/contact) to the
 * clawtobusiness backend, which is the single source of truth for lead handling:
 *   • Saves the lead (demo_leads + lead_events, UTM attribution)
 *   • Sends the branded email (approved standard template, with logo) to the
 *     business notification inbox AND a confirmation email to the client
 *   • Sends SMS to the owner (Quo) and — only with explicit TCPA consent
 *     (sms_consent) — a confirmation SMS to the client
 *   • Mirrors the lead into GoHighLevel (contact + opportunity)
 *
 * The edge keeps only: honeypot rejection, minimal field validation, and a
 * FormSubmit fallback so a lead is never lost if the backend is unreachable.
 *
 * The frontend (src/app/contact/page.tsx) fires the quote_lead dataLayer event
 * itself on success.
 */

const BACKEND = 'https://clawtobusiness.com/api/b/3-sisters-services/contact-form';
const FALLBACK_EMAIL = 'contact@3sistersservices.com';

const SERVICE_LABELS = {
  regular: 'Regular Cleaning',
  deep: 'Deep Cleaning',
  'move-in-out': 'Move-In / Move-Out Cleaning',
  airbnb: 'Airbnb & Vacation Rental Cleaning',
  'office-commercial': 'Office & Commercial Cleaning',
  organizing: 'Personal Organizing',
};

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export async function onRequestPost({ request }) {
  // Forward the real visitor IP so the backend's per-IP rate limit applies to
  // the user, not to Cloudflare's shared egress IP (which would 429 everyone).
  const clientIp = request.headers.get('CF-Connecting-IP') || '';

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ success: false, error: 'Invalid payload' }, 400);
  }

  const {
    name = '',
    email = '',
    phone = '',
    service = '',
    message = '',
    sms_consent = false,
    website = '', // honeypot
  } = body || {};

  // Honeypot tripped → pretend success, do nothing (bots get a clean 200).
  if (website) return json({ success: true });

  if (!name.trim() || !email.trim() || !message.trim()) {
    return json({ success: false, error: 'Missing required fields' }, 400);
  }

  // --- Primary: proxy to the clawtobusiness backend (email + SMS + GHL) ---
  try {
    const res = await fetch(BACKEND, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(clientIp ? { 'X-Forwarded-For': clientIp } : {}),
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        service: service.trim(),
        message: message.trim(),
        source: 'website',
        lang: 'en',
        sms_consent: sms_consent === true,
      }),
    });
    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      if (data && data.ok !== false) {
        return json({ success: true, detail: { backend: 'ok' } });
      }
    }
    // Non-2xx or ok:false → fall through to the FormSubmit fallback.
  } catch {
    // Network error reaching backend → fall through to the fallback.
  }

  // --- Fallback: FormSubmit (best-effort) so the lead is never lost ---
  const serviceLabel = SERVICE_LABELS[service] || '(not specified)';
  try {
    const mailRes = await fetch(`https://formsubmit.co/ajax/${FALLBACK_EMAIL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `Contact message — ${name.trim()}`,
        _template: 'table',
        _captcha: 'false',
        Name: name.trim(),
        Email: email.trim(),
        Phone: phone.trim() || '(not provided)',
        Service: serviceLabel,
        Message: message.trim(),
        'SMS consent': sms_consent === true ? 'yes' : 'no',
      }),
    });
    if (mailRes.ok) {
      return json({ success: true, detail: { backend: 'fallback_email' } });
    }
    return json({ success: false, detail: { backend: 'down', email: `err_${mailRes.status}` } }, 502);
  } catch {
    return json({ success: false, detail: { backend: 'down', email: 'exception' } }, 502);
  }
}
// Non-POST methods get an automatic 405 from Pages (no handler exported).
