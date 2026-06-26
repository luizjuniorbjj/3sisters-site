import type { Metadata } from 'next';
import { SOCIAL_OG_IMAGES } from '@/lib/schema';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CITY_PAGES, getCityBySlug } from '@/data/cities';
import { STATE_PAGES } from '@/data/states';
import { generateCityGraph } from '@/lib/schema-city';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CTASection } from '@/components/sections/CTASection';
import { slugify } from '@/lib/slugify';

export function generateStaticParams() {
  return CITY_PAGES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const city = getCityBySlug(params.slug);
  if (!city) return {};
  const firstSentence = city.introFactual.split('.')[0] + '.';
  return {
    title: `Cleaning Services in ${city.name}, ${city.stateAbbr}`,
    description: `${firstSentence} Family-owned, bonded & insured cleaning company serving ${city.name} since 2019.`,
    alternates: { canonical: `/cities/${city.slug}/` },
    openGraph: {
      title: `Cleaning Services in ${city.name}, ${city.stateAbbr} | 3 Sisters Services`,
      description: firstSentence,
      url: `https://3sistersservices.com/cities/${city.slug}/`,
      type: 'website',
      images: SOCIAL_OG_IMAGES,
    },
  };
}

const SERVICES_OFFERED = [
  { anchor: 'regular-cleaning', name: 'Regular Cleaning' },
  { anchor: 'deep-cleaning', name: 'Deep Cleaning' },
  { anchor: 'move-in-out-cleaning', name: 'Move-In / Move-Out Cleaning' },
  { anchor: 'airbnb-cleaning', name: 'Airbnb & Vacation Rental Cleaning' },
  { anchor: 'office-commercial-cleaning', name: 'Office & Commercial Cleaning' },
  { anchor: 'personal-organizing', name: 'Personal Organizing Services' },
];

export default function CityPage({ params }: { params: { slug: string } }) {
  const city = getCityBySlug(params.slug);
  if (!city) notFound();

  const state = STATE_PAGES.find((s) => s.abbr === city.stateAbbr);

  return (
    <>
      <JsonLd data={generateCityGraph(city)} />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          ...(state
            ? [{ label: state.name, href: `/states/${state.slug}` }]
            : []),
          { label: `${city.name}, ${city.stateAbbr}`, href: `/cities/${city.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-rose-50/30 to-white pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Badge variant="primary" className="mb-6">
            {city.county.toUpperCase()}
          </Badge>
          <h1 className="font-outfit font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-900 mb-6 max-w-4xl">
            Cleaning Services in{' '}
            <span className="text-blue-600">
              {city.name}, {city.stateAbbr}.
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            Family-owned. Bonded &amp; insured. Serving {city.name} and {city.county} since 2019.
          </p>
        </div>
      </section>

      {/* Intro factual */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <p className="speakable-city-intro text-lg text-slate-700 leading-relaxed">
            {city.introFactual}
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-outfit font-bold text-3xl text-slate-900 mb-8 text-center">
            Services we offer in {city.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES_OFFERED.map((s) => (
              <Link
                key={s.anchor}
                href={`/services#${s.anchor}`}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-600 hover:shadow-sm transition"
              >
                <h3 className="font-outfit font-semibold text-lg text-slate-900">{s.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Service context */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-outfit font-bold text-3xl text-slate-900 mb-6">
            How we serve {city.name}
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed">{city.serviceContext}</p>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-outfit font-bold text-2xl text-slate-900 mb-6 text-center">
            Neighborhoods we serve in {city.name}
          </h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {city.neighborhoods.map((n) => (
              <span
                key={n}
                className="bg-blue-50 text-blue-700 text-sm px-4 py-2 rounded-full border border-blue-200"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-outfit font-bold text-3xl text-slate-900 mb-8 text-center">
            Common questions about cleaning in {city.name}
          </h2>
          <div className="space-y-4">
            {city.faqs.map((faq, i) => (
              <details
                key={i}
                id={`q-${slugify(faq.q)}`}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden"
                itemScope
                itemType="https://schema.org/Question"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h3
                    className="font-outfit font-semibold text-lg text-slate-900 pr-4"
                    itemProp="name"
                  >
                    {faq.q}
                  </h3>
                  <span className="text-blue-600 text-2xl shrink-0 group-open:rotate-45 transition-transform duration-200">
                    +
                  </span>
                </summary>
                <div
                  className={`px-6 pb-6 text-slate-500 leading-relaxed${i < 2 ? ' speakable-city-faq' : ''}`}
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
            Get a free quote in {city.name}
          </h2>
          <p className="text-slate-600 mb-8">
            Call (657) 737-7171 Mon–Sat, 8am–6pm, or book online — we confirm every visit personally.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="md" href="/booking">
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
