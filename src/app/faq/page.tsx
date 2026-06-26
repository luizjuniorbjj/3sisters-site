import { Metadata } from 'next';
import { SOCIAL_OG_IMAGES } from '@/lib/schema';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CTASection } from '@/components/sections/CTASection';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import {
  FAQ_DATA,
  generateFAQPageSchema,
  generateSpeakableSchema,
  generateHowToBookingSchema,
  groupFAQsByCategory,
} from '@/data/faq';
import { slugify } from '@/lib/slugify';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Answers about booking, pricing, supplies, pets, payment, bonded & insured cleaners, and cancellation. Serving New York and California.',
  alternates: { canonical: 'https://3sistersservices.com/faq/' },
  openGraph: {
    title: 'FAQ | 3 Sisters Services',
    description:
      'Common questions about our cleaning services, pricing, and policies.',
    url: 'https://3sistersservices.com/faq/',
    type: 'website',
    images: SOCIAL_OG_IMAGES,
  },
};

const FAQ_PAGE_SCHEMA = generateFAQPageSchema(FAQ_DATA, 'en');
const SPEAKABLE_SCHEMA = generateSpeakableSchema(FAQ_DATA);
const HOWTO_BOOKING_SCHEMA = generateHowToBookingSchema();
const GROUPED = groupFAQsByCategory(FAQ_DATA);
const CATEGORIES = Object.keys(GROUPED) as Array<keyof typeof GROUPED>;

export default function FAQPage() {
  return (
    <>
      <JsonLd data={FAQ_PAGE_SCHEMA} />
      <JsonLd data={SPEAKABLE_SCHEMA} />
      <JsonLd data={HOWTO_BOOKING_SCHEMA} />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'FAQ', href: '/faq' },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-rose-50/30 to-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="primary" className="mb-6">FAQ</Badge>
          <h1 className="font-outfit font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-900 mb-6">
            Frequently Asked{' '}
            <span className="text-blue-600">Questions.</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Everything you need to know about our cleaning services, pricing, and
            policies in New York and California. Can&apos;t find what
            you&apos;re looking for? Contact our support team.
          </p>
        </div>
      </section>

      {/* FAQ Categories + Accordion */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-12">
          {CATEGORIES.map((category) => {
            const items = GROUPED[category]!;
            return (
              <div key={category}>
                <h2 className="speakable-faq-category font-outfit font-bold text-2xl text-slate-900 mb-5">
                  {category}
                </h2>
                <div className="space-y-4">
                  {items.map((faq, i) => (
                    <details
                      key={`${category}-${i}`}
                      id={`q-${slugify(faq.en.question)}`}
                      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden"
                      itemScope
                      itemType="https://schema.org/Question"
                    >
                      <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                        <h3
                          className="font-outfit font-semibold text-lg text-slate-900 pr-4"
                          itemProp="name"
                        >
                          {faq.en.question}
                        </h3>
                        <span className="text-blue-600 text-2xl shrink-0 group-open:rotate-45 transition-transform duration-200">
                          +
                        </span>
                      </summary>
                      <div
                        className={`px-6 pb-6 text-slate-500 leading-relaxed${faq.speakable ? ' speakable-faq-answer' : ''}`}
                        itemScope
                        itemProp="acceptedAnswer"
                        itemType="https://schema.org/Answer"
                      >
                        <span itemProp="text">{faq.en.answer}</span>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-outfit font-bold text-2xl text-slate-900 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-slate-500 mb-6">
            Reach us Mon–Sat, 8am–6pm. We respond to every inquiry personally.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="md" href="/contact">Contact Us</Button>
            <Button variant="outline" size="md" href="tel:+16577377171">Call (657) 737-7171</Button>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
