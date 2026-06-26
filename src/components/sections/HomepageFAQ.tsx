import { FAQ_DATA, generateFAQPageSchema, FAQ_DATE_MODIFIED } from '@/data/faq';
import { JsonLd } from '@/components/seo/JsonLd';
import { slugify } from '@/lib/slugify';

const HOMEPAGE_FAQ_INDICES = [0, 3, 7, 9, 14];
const HOMEPAGE_FAQS = HOMEPAGE_FAQ_INDICES.map((i) => FAQ_DATA[i]);

const baseSchema = generateFAQPageSchema(HOMEPAGE_FAQS, 'en');
const HOMEPAGE_FAQ_SCHEMA = {
  ...baseSchema,
  '@id': 'https://3sistersservices.com/#faq-home',
  isPartOf: { '@id': 'https://3sistersservices.com/#website' },
  dateModified: FAQ_DATE_MODIFIED,
};

export const HomepageFAQ = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <JsonLd data={HOMEPAGE_FAQ_SCHEMA} />
      <div className="max-w-3xl mx-auto">
        <h2 className="font-outfit font-bold text-3xl sm:text-4xl text-slate-900 mb-3 text-center">
          Common Questions
        </h2>
        <p className="text-slate-500 text-center mb-10">
          Quick answers about booking, pricing, and how we work.
        </p>
        <div className="space-y-4">
          {HOMEPAGE_FAQS.map((faq, i) => (
            <details
              key={i}
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
                className="px-6 pb-6 text-slate-500 leading-relaxed"
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <span itemProp="text">{faq.en.answer}</span>
              </div>
            </details>
          ))}
        </div>
        <div className="text-center mt-8">
          <a
            href="/faq"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            View all FAQs
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
