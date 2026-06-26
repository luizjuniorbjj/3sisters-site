'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CTASection } from '@/components/sections/CTASection';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { siteConfig } from '@/data/site';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const SERVICE_OPTIONS = [
  { value: 'regular', label: 'Regular Cleaning' },
  { value: 'deep', label: 'Deep Cleaning' },
  { value: 'move-in-out', label: 'Move-In / Move-Out Cleaning' },
  { value: 'airbnb', label: 'Airbnb & Vacation Rental Cleaning' },
  { value: 'office-commercial', label: 'Office & Commercial Cleaning' },
  { value: 'organizing', label: 'Personal Organizing' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    smsConsent: false, // TCPA SMS opt-in (optional, unchecked by default)
    website: '', // honeypot
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Pre-select service from ?service= query param (e.g. linked from /services/[slug]).
  // Client-side only — safe under static export (no useSearchParams Suspense boundary needed).
  useEffect(() => {
    const svc = new URLSearchParams(window.location.search).get('service');
    if (svc && SERVICE_OPTIONS.some((s) => s.value === svc)) {
      setFormData((prev) => ({ ...prev, service: svc }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.website) return; // honeypot
    setSubmitting(true);
    setSubmitError('');

    const serviceLabel =
      SERVICE_OPTIONS.find((s) => s.value === formData.service)?.label || '(not specified)';

    const payload = {
      _subject: `Contact message — ${formData.name}`,
      _template: 'table',
      _captcha: 'false',
      Name: formData.name,
      Email: formData.email,
      Phone: formData.phone || '(not provided)',
      Service: serviceLabel,
      Message: formData.message,
    };

    try {
      // Primary: same-origin Pages Function → GHL (contact + opportunity) + email backup.
      // Fallback: direct FormSubmit (e.g. `next dev`, where the Function isn't running).
      let delivered = false;
      try {
        const apiRes = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service: formData.service,
            message: formData.message,
            sms_consent: formData.smsConsent,
            website: formData.website,
          }),
        });
        if (apiRes.ok) {
          const apiData = await apiRes.json().catch(() => ({}));
          delivered = apiData.success !== false;
        }
      } catch {
        delivered = false;
      }

      if (!delivered) {
        const res = await fetch('https://formsubmit.co/ajax/contact@3sistersservices.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok || data.success !== 'true') {
          throw new Error(data.message || 'Unable to send — please try again or call (657) 737-7171.');
        }
      }
      setSubmitted(true);
      setSubmitting(false);
      // GA4 conversion event — fires only on confirmed submit.
      // `quote_lead` (NOT generate_lead): keeps the contact/quote funnel distinct
      // from booking conversions (booking keeps generate_lead). Pairs with quote_click.
      // Guard prod-only (skip localhost / preview) to match TrackingEvents.
      if (typeof window !== 'undefined') {
        const host = window.location.hostname;
        const isLocal =
          host === 'localhost' ||
          host === '127.0.0.1' ||
          host.endsWith('.local') ||
          host.endsWith('.pages.dev');
        if (!isLocal) {
          const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
          w.dataLayer = w.dataLayer || [];
          w.dataLayer.push({ event: 'quote_lead', source: 'contact_form', form_service: serviceLabel });
        }
      }
    } catch (err) {
      setSubmitting(false);
      setSubmitError(
        err instanceof Error ? err.message : 'Unable to send — please try again or call (657) 737-7171.'
      );
    }
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Contact', href: '/contact' },
        ]}
      />
      {/* Hero */}
      <section className="bg-gradient-to-b from-rose-50/30 to-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Badge variant="primary" className="mb-6">CONTACT US</Badge>
          <h1 className="font-outfit font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-900 mb-6 max-w-3xl">
            Get <span className="text-blue-600">In Touch</span> With Us.
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl">
            Have questions or ready to book? Reach out to our team and we&apos;ll get back to you within one business day (Mon&ndash;Sat, 8am&ndash;6pm).
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Phone className="w-6 h-6" />, label: 'Call Us', value: siteConfig.phone },
              { icon: <Mail className="w-6 h-6" />, label: 'Email Support', value: siteConfig.email },
              { icon: <MapPin className="w-6 h-6" />, label: 'Service Areas', value: siteConfig.address },
              { icon: <Clock className="w-6 h-6" />, label: 'Business Hours', value: 'Mon - Sat: 8AM - 6PM' },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-2xl border border-slate-200 p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mx-auto mb-4">
                  {item.icon}
                </div>
                <p className="text-sm text-slate-400 mb-1">{item.label}</p>
                <p className="font-medium text-slate-900 text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form + Service Areas */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form / Success */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="font-outfit font-bold text-2xl text-slate-900 mb-3">Message Sent!</h2>
                  <p className="text-slate-500 text-sm">
                    Thank you, <strong>{formData.name}</strong>. We received your message and will reply within one business day (Mon&ndash;Sat, 8am&ndash;6pm).
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="font-outfit font-bold text-2xl text-slate-900 mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          placeholder="john@email.com"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Service Type</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      >
                        <option value="">Select a service</option>
                        {SERVICE_OPTIONS.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={5}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                        placeholder="Tell us about your cleaning needs..."
                        required
                      />
                    </div>
                    {/* Honeypot — hidden from users, traps bots */}
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="absolute -left-[9999px] w-px h-px opacity-0"
                    />
                    {/* TCPA SMS opt-in (separate, unchecked by default; not required) */}
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.smsConsent}
                        onChange={(e) => setFormData({ ...formData, smsConsent: e.target.checked })}
                        className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-600"
                      />
                      <span className="text-sm font-medium text-slate-700">
                        Text me updates about my request. I agree to receive SMS from 3 Sisters Services
                        at the number provided. Msg &amp; data rates may apply; reply STOP to opt out. <span className="text-slate-400">(optional)</span>
                      </span>
                    </label>
                    {submitError && (
                      <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                        {submitError}
                      </div>
                    )}
                    <Button type="submit" variant="primary" size="lg" className="w-full" disabled={submitting}>
                      {submitting ? 'Sending…' : 'Send Message'}
                    </Button>
                  </form>
                </>
              )}
            </div>

            {/* Service Areas */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <h2 className="font-outfit font-bold text-2xl text-slate-900">Where We Clean</h2>
              </div>
              <p className="text-slate-500 text-sm mb-8">
                3 Sisters Services is a mobile cleaning company — we bring our team to you across two metro areas.
              </p>
              <div className="space-y-6">
                <div className="border-l-2 border-blue-600 pl-4">
                  <p className="font-outfit font-bold text-slate-900">New York</p>
                  <p className="text-slate-500 text-sm">
                    Manhattan, Brooklyn, Queens
                  </p>
                  <p className="text-slate-400 text-xs mt-1">
                    Office: WeWork Soho — 175 Varick St, New York, NY 10014
                  </p>
                </div>
                <div className="border-l-2 border-blue-600 pl-4">
                  <p className="font-outfit font-bold text-slate-900">California</p>
                  <p className="text-slate-500 text-sm">
                    San Francisco
                  </p>
                  <p className="text-slate-400 text-xs mt-1">
                    Office: Regus Mountain View Downtown — 800 W El Camino Real, Mountain View, CA 94040
                  </p>
                </div>
              </div>
              <p className="text-slate-400 text-xs mt-8">
                Not sure if we cover your area? Call us at {siteConfig.phone} and we&apos;ll let you know.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
