import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SOCIAL_OG_IMAGES } from '@/lib/schema';
import { getCityBySlug } from '@/data/cities';
import { STATE_PAGES } from '@/data/states';
import { SERVICE_CITY_PAGES, getServiceCityPage } from '@/data/service-city';
import { getCityStats } from '@/data/city-stats';
import { generateServiceCityGraph } from '@/lib/schema-service-city';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CTASection } from '@/components/sections/CTASection';
import { slugify } from '@/lib/slugify';

export function generateStaticParams() {
  return SERVICE_CITY_PAGES.map((p) => ({ slug: p.citySlug, service: p.serviceSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; service: string };
}): Promise<Metadata> {
  const sc = getServiceCityPage(params.slug, params.service);
  if (!sc) return {};
  return {
    title: sc.metaTitle,
    description: sc.metaDescription,
    alternates: { canonical: `/cities/${sc.citySlug}/${sc.serviceSlug}/` },
    openGraph: {
      title: sc.metaTitle,
      description: sc.metaDescription,
      url: `https://3sistersservices.com/cities/${sc.citySlug}/${sc.serviceSlug}/`,
      type: 'website',
      images: SOCIAL_OG_IMAGES,
    },
  };
}

export default function ServiceCityPageRoute({
  params,
}: {
  params: { slug: string; service: string };
}) {
  const sc = getServiceCityPage(params.slug, params.service);
  const city = getCityBySlug(params.slug);
  if (!sc || !city) notFound();

  const state = STATE_PAGES.find((s) => s.abbr === city.stateAbbr);
  const stats = getCityStats(city.slug);
  const localParas = sc.localContext.split('\n\n');

  return (
    <>
      <JsonLd data={generateServiceCityGraph(sc, city)} />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          ...(state ? [{ label: state.name, href: `/states/${state.slug}` }] : []),
          { label: `${city.name}, ${city.stateAbbr}`, href: `/cities/${city.slug}` },
          { label: sc.serviceName, href: `/cities/${city.slug}/${sc.serviceSlug}` },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-rose-50/30 to-white pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Badge variant="primary" className="mb-6">
            {city.county.toUpperCase()}
          </Badge>
          <h1 className="font-outfit font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-900 mb-6 max-w-4xl">
            {sc.serviceName} in{' '}
            <span className="text-blue-600">
              {city.name}, {city.stateAbbr}.
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl">{sc.heroSubtitle}</p>
        </div>
      </section>

      {/* Answer-first (GEO) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <p className="speakable-sc-answer text-lg text-slate-700 leading-relaxed">
            {sc.answerFirst}
          </p>
        </div>
      </section>

      {/* What's included */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-outfit font-bold text-3xl text-slate-900 mb-8 text-center">
            What a {sc.serviceName.toLowerCase()} in {city.name} includes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sc.whatsIncluded.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 bg-white border border-slate-200 rounded-2xl p-5"
              >
                <span className="text-blue-600 text-xl shrink-0 leading-none mt-0.5">✓</span>
                <span className="text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local context */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-outfit font-bold text-3xl text-slate-900 mb-6">
            {sc.serviceName} in {city.name}
          </h2>
          <div className="space-y-5">
            {localParas.map((p, i) => (
              <p key={i} className="text-lg text-slate-700 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* City quick facts (stats with sources) */}
      {stats && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-outfit font-bold text-2xl text-slate-900 mb-6 text-center">
              {city.name} at a glance
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 text-center">
                <div className="font-outfit font-bold text-2xl text-blue-600">
                  {stats.population.toLocaleString('en-US')}
                </div>
                <div className="text-sm text-slate-500 mt-1">Residents</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 text-center">
                <div className="font-outfit font-bold text-2xl text-blue-600">
                  {stats.medianHomeValue}
                </div>
                <div className="text-sm text-slate-500 mt-1">Median home value</div>
              </div>
              {stats.medianYearBuilt && (
                <div className="bg-white border border-slate-200 rounded-2xl p-5 text-center">
                  <div className="font-outfit font-bold text-2xl text-blue-600">
                    {stats.medianYearBuilt}
                  </div>
                  <div className="text-sm text-slate-500 mt-1">Median year built</div>
                </div>
              )}
            </div>
            <p className="text-slate-600 leading-relaxed">{stats.climateNote}</p>
            <p className="text-xs text-slate-400 mt-3">
              Sources: {stats.sources.map((s) => s.label).join(', ')}.
            </p>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-outfit font-bold text-3xl text-slate-900 mb-8 text-center">
            {sc.serviceName} in {city.name} — common questions
          </h2>
          <div className="space-y-4">
            {sc.faqs.map((faq, i) => (
              <details
                key={i}
                id={`q-${slugify(faq.q)}`}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden"
                itemScope
                itemType="https://schema.org/Question"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h3 className="font-outfit font-semibold text-lg text-slate-900 pr-4" itemProp="name">
                    {faq.q}
                  </h3>
                  <span className="text-blue-600 text-2xl shrink-0 group-open:rotate-45 transition-transform duration-200">
                    +
                  </span>
                </summary>
                <div
                  className={`px-6 pb-6 text-slate-500 leading-relaxed${i < 2 ? ' speakable-sc-faq' : ''}`}
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
          <h2 className="font-outfit font-bold text-3xl text-slate-900 mb-4">
            Get a free quote for {sc.serviceName.toLowerCase()} in {city.name}
          </h2>
          <p className="text-slate-600 mb-8">
            Call (657) 737-7171 Mon–Sat, 8am–6pm, or book online — we confirm every visit personally.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="md" href={sc.ctaHref}>
              Book online
            </Button>
            <Button variant="outline" size="md" href="tel:+16577377171">
              Call (657) 737-7171
            </Button>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
