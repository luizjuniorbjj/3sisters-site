import { Metadata } from 'next';
import { SOCIAL_OG_IMAGES } from '@/lib/schema';
import { Badge } from '@/components/ui/Badge';
import { BookingSection } from '@/components/sections/BookingSection';
import { BookingBenefits } from '@/components/sections/BookingBenefits';
import { CTASection } from '@/components/sections/CTASection';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Book Now',
  description:
    'Schedule your professional cleaning service in minutes. Family-owned, bonded & insured. Serving New York and California — Mon–Sat 8am–6pm.',
  alternates: { canonical: 'https://3sistersservices.com/booking/' },
  openGraph: {
    title: 'Book Your Cleaning | 3 Sisters Services',
    description: 'Get a free cleaning quote in minutes.',
    url: 'https://3sistersservices.com/booking/',
    type: 'website',
    images: SOCIAL_OG_IMAGES,
  },
};

export default function BookingPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Booking', href: '/booking' },
        ]}
      />
      {/* Hero */}
      <section className="bg-gradient-to-b from-rose-50/30 to-white pt-32 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="primary" className="mb-6">BOOK NOW</Badge>
          <h1 className="font-outfit font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-900 mb-6">
            Schedule Your{' '}
            <span className="text-blue-600">Cleaning.</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Tell us about your space, pick a date, and confirm your booking in minutes. Mon–Sat, 8am–6pm.
          </p>
        </div>
      </section>

      {/* Why book with us — 6 cards */}
      <BookingBenefits />

      {/* Native xcleaners booking form (ADR-3S-002 — restores ADR-3S-001 WS-A) */}
      <BookingSection />

      <CTASection />
    </>
  );
}
