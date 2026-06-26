import type { Metadata } from 'next';
import { SOCIAL_OG_IMAGES } from '@/lib/schema';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { STATE_PAGES, getStateBySlug } from '@/data/states';
import { generateStateGraph } from '@/lib/schema-state';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CTASection } from '@/components/sections/CTASection';

export function generateStaticParams() {
  return STATE_PAGES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const state = getStateBySlug(params.slug);
  if (!state) return {};
  const firstSentence = state.introFactual.split('.')[0] + '.';
  return {
    title: `Cleaning Services in ${state.name}`,
    description: `${firstSentence} Family-owned, bonded & insured cleaning company serving ${state.name} since 2019.`,
    alternates: { canonical: `/states/${state.slug}/` },
    openGraph: {
      title: `Cleaning Services in ${state.name} | 3 Sisters Services`,
      description: firstSentence,
      url: `https://3sistersservices.com/states/${state.slug}/`,
      type: 'website',
      images: SOCIAL_OG_IMAGES,
    },
  };
}

export default function StatePage({ params }: { params: { slug: string } }) {
  const state = getStateBySlug(params.slug);
  if (!state) notFound();

  return (
    <>
      <JsonLd data={generateStateGraph(state)} />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: state.name, href: `/states/${state.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-rose-50/30 to-white pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Badge variant="primary" className="mb-6">
            {state.cities.length} {state.cities.length === 1 ? 'CITY' : 'CITIES'} SERVED
          </Badge>
          <h1 className="font-outfit font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-900 mb-6 max-w-4xl">
            Cleaning Services in{' '}
            <span className="text-blue-600">{state.name}.</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            Family-owned. Bonded &amp; insured. Serving {state.name} since 2019.
          </p>
        </div>
      </section>

      {/* Intro factual */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-slate-700 leading-relaxed">{state.introFactual}</p>
        </div>
      </section>

      {/* Cities grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-outfit font-bold text-3xl text-slate-900 mb-8 text-center">
            Cities we serve in {state.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.cities.map((c) =>
              c.hasPage && c.slug ? (
                <Link
                  key={c.name}
                  href={`/cities/${c.slug}`}
                  className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-600 hover:shadow-sm transition"
                >
                  <h3 className="font-outfit font-semibold text-lg text-slate-900 mb-1">
                    {c.name}, {state.abbr}
                  </h3>
                  {c.county && (
                    <p className="text-sm text-slate-500">{c.county}</p>
                  )}
                  <span className="inline-block text-blue-600 text-sm font-medium mt-3">
                    View details →
                  </span>
                </Link>
              ) : (
                <div
                  key={c.name}
                  className="bg-white border border-slate-200 rounded-2xl p-6"
                >
                  <h3 className="font-outfit font-semibold text-lg text-slate-900 mb-1">
                    {c.name}, {state.abbr}
                  </h3>
                  {c.county && (
                    <p className="text-sm text-slate-500">{c.county}</p>
                  )}
                  <span className="inline-block text-slate-400 text-sm mt-3">
                    Coverage area — call to book
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Service context */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-outfit font-bold text-3xl text-slate-900 mb-6">
            How we work across {state.name}
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed">{state.serviceContext}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-outfit font-bold text-3xl text-slate-900 mb-4">
            Get a free quote in {state.name}
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
