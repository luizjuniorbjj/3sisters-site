import { Metadata } from 'next';
import { SOCIAL_OG_IMAGES } from '@/lib/schema';
import { Badge } from '@/components/ui/Badge';
import { PricingSection } from '@/components/sections/PricingSection';
import { CTASection } from '@/components/sections/CTASection';
import { faqs } from '@/data/site';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Quote-based cleaning pricing — no public rates, no hidden costs. Free same-day estimates for homes and offices in New York and California.',
  alternates: { canonical: 'https://3sistersservices.com/pricing/' },
  openGraph: {
    title: 'Pricing | 3 Sisters Services',
    description: 'Free quote, no hidden fees, no contracts.',
    url: 'https://3sistersservices.com/pricing/',
    type: 'website',
    images: SOCIAL_OG_IMAGES,
  },
};

function FAQAccordion() {
  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <details key={i} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
            <h3 className="font-outfit font-semibold text-lg text-slate-900 pr-4">{faq.question}</h3>
            <span className="text-blue-600 text-2xl shrink-0 group-open:rotate-45 transition-transform">+</span>
          </summary>
          <div className="px-6 pb-6 text-slate-500 text-sm leading-relaxed">
            {faq.answer}
          </div>
        </details>
      ))}
    </div>
  );
}

export default function PricingPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Pricing', href: '/pricing' },
        ]}
      />
      {/* Hero */}
      <section className="bg-gradient-to-b from-rose-50/30 to-white pt-32 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="primary" className="mb-6">PRICING</Badge>
          <h1 className="font-outfit font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-900 mb-6">
            Plans for{' '}
            <span className="text-blue-600">Every Home.</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Every plan is custom-quoted based on your space, frequency, and add-ons. Bonded, insured, and background-checked on every visit.
          </p>
        </div>
      </section>

      <PricingSection />

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">FAQ</Badge>
            <h2 className="font-outfit font-bold text-3xl sm:text-4xl text-slate-900">
              Frequently Asked <span className="text-blue-600">Questions.</span>
            </h2>
          </div>
          <FAQAccordion />
        </div>
      </section>

      <CTASection />
    </>
  );
}
