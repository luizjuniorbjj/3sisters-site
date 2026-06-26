import type { Metadata } from 'next';
import { SOCIAL_OG_IMAGES } from '@/lib/schema';
import { notFound } from 'next/navigation';
import { SERVICE_PAGES, getServicePageBySlug } from '@/data/service-pages';
import { generateServiceGraph } from '@/lib/schema-service';
import { JsonLd } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/Button';
import { slugify } from '@/lib/slugify';

export function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const sp = getServicePageBySlug(params.slug);
  if (!sp) return {};
  return {
    title: sp.metaTitle,
    description: sp.metaDescription,
    alternates: { canonical: `/services/${sp.slug}/` },
    openGraph: {
      title: `${sp.name} | 3 Sisters Services`,
      description: sp.metaDescription,
      url: `https://3sistersservices.com/services/${sp.slug}/`,
      type: 'website',
      images: SOCIAL_OG_IMAGES,
    },
  };
}

/** Renders the H1 with the keyword accented. accentClass: primary-400 on dark, blue-600 on light. */
function renderHeroH1(h1: string, keyword: string, accentClass: string) {
  const idx = h1.indexOf(keyword);
  if (idx === -1) return h1;
  return (
    <>
      {h1.slice(0, idx)}
      <span className={accentClass}>{keyword}</span>
      {h1.slice(idx + keyword.length)}
    </>
  );
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const sp = getServicePageBySlug(params.slug);
  if (!sp) notFound();

  const isDark = sp.heroStyle === 'dark';

  return (
    <>
      <JsonLd data={generateServiceGraph(sp)} />

      {/* Hero — dark band (B2B/commercial) OR light gradient (residential) per heroStyle */}
      <section
        className={
          isDark
            ? 'bg-dark pt-32 pb-16 px-4 sm:px-6 lg:px-8'
            : 'bg-gradient-to-b from-rose-50/30 to-white pt-32 pb-16 px-4 sm:px-6 lg:px-8'
        }
      >
        <div className="max-w-7xl mx-auto">
          <nav
            aria-label="Breadcrumb"
            className={`mb-6 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
          >
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <a href="/" className={isDark ? 'hover:text-white transition-colors' : 'hover:text-slate-900 transition-colors'}>
                  Home
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <a href="/services" className={isDark ? 'hover:text-white transition-colors' : 'hover:text-slate-900 transition-colors'}>
                  Services
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className={isDark ? 'text-slate-200' : 'text-slate-700'}>{sp.shortName}</li>
            </ol>
          </nav>
          <h1
            className={`font-heading font-bold text-4xl sm:text-5xl lg:text-6xl mb-6 max-w-4xl ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {renderHeroH1(sp.heroH1, sp.heroKeyword, isDark ? 'text-primary-400' : 'text-blue-600')}
          </h1>
          <p
            className={`speakable-service-intro text-lg max-w-3xl mb-4 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            {sp.heroSubtitle}
          </p>
          {sp.localAuthority && (
            <p className={`text-sm font-medium max-w-3xl mb-8 ${isDark ? 'text-primary-400' : 'text-blue-600'}`}>
              {sp.localAuthority}
            </p>
          )}
          <Button variant="primary" size="md" href={sp.ctaHref}>
            Get a Free Quote
          </Button>
        </div>
      </section>

      {/* Trust band — honest credentials */}
      <section className="bg-surface border-b border-border px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-slate-700">
          {sp.trustSignals.map((signal, i) => (
            <span key={signal} className="flex items-center gap-6">
              {i > 0 && <span className="hidden sm:inline text-border">|</span>}
              <span>{signal}</span>
            </span>
          ))}
        </div>
      </section>

      {/* Intro factual */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-slate-700 leading-relaxed">{sp.introFactual}</p>
        </div>
      </section>

      {/* What's included — title left (asymmetry), 2-col grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading font-bold text-3xl text-slate-900 mb-8">
            What&rsquo;s included
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {sp.whatsIncluded.map((item) => (
              <li key={item} className="flex items-start gap-3 text-slate-700">
                <svg
                  className="w-5 h-5 mt-0.5 shrink-0"
                  style={{ color: '#03543F' }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Industries we serve — segments (SEO + ICP) */}
      {sp.industries.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading font-bold text-3xl text-slate-900 mb-4">
              Industries we serve
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed max-w-3xl mb-8">
              {sp.industriesIntro}
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              {sp.industries.map((industry) => (
                <span
                  key={industry}
                  className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium px-4 py-2 rounded-full"
                >
                  {industry}
                </span>
              ))}
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-3xl">
              {sp.industriesNote}
            </p>
          </div>
        </section>
      )}

      {/* Service context */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-3xl text-slate-900 mb-6">
            How we keep your workspace ready
          </h2>
          <div className="space-y-5">
            {sp.serviceContext.map((para, i) => (
              <p key={i} className="text-lg text-slate-700 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters — commercial benefits (result, not service) */}
      {sp.benefits.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading font-bold text-3xl text-slate-900 mb-8">
              Why a clean workspace matters
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sp.benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="bg-white border border-slate-200 rounded-2xl p-6"
                >
                  <h3 className="font-heading font-semibold text-lg text-slate-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Flexible scheduling — frequency options */}
      {sp.frequencies.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading font-bold text-3xl text-slate-900 mb-4">
              A schedule that fits your business
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-8">{sp.frequencyIntro}</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {sp.frequencies.map((freq) => (
                <span
                  key={freq}
                  className="bg-white border border-slate-200 text-slate-900 text-sm font-medium px-5 py-2.5 rounded-full"
                >
                  {freq}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How we work in your space — operational reassurances (B2B) */}
      {sp.operations.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading font-bold text-3xl text-slate-900 mb-4">
              How we work in your space
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed max-w-3xl mb-8">
              {sp.operationsIntro}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sp.operations.map((op) => (
                <div
                  key={op.title}
                  className="bg-white border border-slate-200 rounded-2xl p-6"
                >
                  <h3 className="font-heading font-semibold text-lg text-slate-900 mb-2">
                    {op.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{op.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs — same accordion pattern as city pages */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-3xl text-slate-900 mb-8 text-center">
            Common questions about {sp.shortName.toLowerCase()} cleaning
          </h2>
          <div className="space-y-4">
            {sp.faqs.map((faq, i) => (
              <details
                key={i}
                id={`q-${slugify(faq.q)}`}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden"
                itemScope
                itemType="https://schema.org/Question"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h3
                    className="font-heading font-semibold text-lg text-slate-900 pr-4"
                    itemProp="name"
                  >
                    {faq.q}
                  </h3>
                  <span className="text-primary text-2xl shrink-0 group-open:rotate-45 transition-transform duration-200">
                    +
                  </span>
                </summary>
                <div
                  className={`px-6 pb-6 text-slate-500 leading-relaxed${i < 2 ? ' speakable-service-faq' : ''}`}
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <span itemProp="text">{faq.a}</span>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-bold text-3xl text-slate-900 mb-4">
            Get a free quote for your space
          </h2>
          <p className="text-slate-600 mb-8">
            Call (657) 737-7171 Mon–Sat, 8am–6pm, or request a quote online — we confirm every
            booking personally.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="md" href={sp.ctaHref}>
              Get a Free Quote
            </Button>
            <Button variant="outline" size="md" href="tel:+16577377171">
              Call (657) 737-7171
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
