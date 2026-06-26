'use client';

/**
 * TrackingEvents — dataLayer event pushes for GTM (ADR-019 canonical schema).
 * Container: GTM-PDB47Q3V (3 Sisters). GA4: G-K5LSETGQJY.
 *
 * Events (delegated listeners, all pages):
 *  - phone_click   → any <a href="tel:...">
 *  - schedule_click → Book Now / booking CTAs (a[href^="/booking"])
 *  - quote_click    → "Get a Free Quote" CTAs to /contact?service=… (quote funnel intent)
 *  - quote_lead     → pushed by the contact form handler on submit (quote funnel conversion)
 *  - generate_lead  → booking completion only (fired inline by BookingSection.tsx on
 *                     completed booking; ADR-3S-002 — not handled here)
 *
 * Localhost guard: suppressed on localhost / 127.0.0.1 / *.local
 * (feedback_gtm_no_double_firing). whatsapp_click intentionally NOT used
 * (3 Sisters has no WhatsApp channel — Wave 3.5 decision).
 */

import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function isLocal(host: string): boolean {
  return (
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host.endsWith('.local') ||
    host.endsWith('.pages.dev') // preview deploys: keep prod analytics clean
  );
}

function surfaceFromPath(path: string): string {
  if (path.startsWith('/cities/')) return 'city_page';
  if (path === '/' || path === '') return 'homepage';
  return 'other';
}

function locationFromEl(el: Element): string {
  if (el.closest('header')) return 'nav';
  if (el.closest('footer')) return 'footer';
  if (el.closest('[data-cta="hero"]')) return 'hero';
  return 'other';
}

export function TrackingEvents() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isLocal(window.location.hostname)) return;

    window.dataLayer = window.dataLayer || [];
    const push = (o: Record<string, unknown>) => window.dataLayer!.push(o);

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const anchor = target.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      const source = surfaceFromPath(window.location.pathname);

      if (href.startsWith('tel:')) {
        push({ event: 'phone_click', source, location: locationFromEl(anchor) });
        return;
      }
      if (href === '/booking' || href.startsWith('/booking/') || href.startsWith('/booking?')) {
        push({
          event: 'schedule_click',
          source,
          location: locationFromEl(anchor),
          button_text: (anchor.textContent || '').trim().slice(0, 60),
        });
        return;
      }
      // Quote intent: "Get a Free Quote" CTAs that route to the contact form
      // pre-filled with a service (commercial funnel). Plain /contact nav links
      // (no ?service=) are navigation, not quote intent — intentionally skipped.
      if (href.startsWith('/contact?service=') || href.startsWith('/contact/?service=')) {
        const service = new URLSearchParams(href.slice(href.indexOf('?'))).get('service') || '';
        push({
          event: 'quote_click',
          service,
          source,
          location: locationFromEl(anchor),
          button_text: (anchor.textContent || '').trim().slice(0, 60),
        });
      }
    };

    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
