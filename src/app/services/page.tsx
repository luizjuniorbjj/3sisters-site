import { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CTASection } from '@/components/sections/CTASection';
import { services } from '@/data/site';
import { hasServicePage } from '@/data/service-pages';
import { Home, Building2, Sparkles, Truck, Bed, Layers, Clock, DollarSign, ChevronRight } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { SERVICES_PAGE_GRAPH, SOCIAL_OG_IMAGES } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Six cleaning services for homes, offices, Airbnbs, and move-in/move-out transitions in New York and California. Bonded, insured, and background-checked.',
  alternates: { canonical: 'https://3sistersservices.com/services/' },
  openGraph: {
    title: 'Services | 3 Sisters Services',
    description:
      'Regular, deep, move-in/out, Airbnb, office, and personal organizing cleaning services.',
    url: 'https://3sistersservices.com/services/',
    type: 'website',
    images: SOCIAL_OG_IMAGES,
  },
};

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="w-6 h-6" />,
  Building2: <Building2 className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  Truck: <Truck className="w-6 h-6" />,
  Bed: <Bed className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={SERVICES_PAGE_GRAPH} />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
        ]}
      />
      {/* Hero */}
      <section className="bg-gradient-to-b from-rose-50/30 to-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Badge variant="primary" className="mb-6">OUR SERVICES</Badge>
          <h1 className="font-outfit font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-900 mb-6 max-w-3xl">
            Expert Cleaning for{' '}
            <span className="text-blue-600">Every Space.</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl">
            Six trusted cleaning services for homes, offices, Airbnbs, and move-ins/outs across New York and California. Bonded, insured, and background-checked on every visit.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    {iconMap[service.icon] || <Sparkles className="w-6 h-6" />}
                  </div>
                  <Badge variant="outline">Service Overview</Badge>
                </div>

                <h3 className="font-outfit font-bold text-2xl text-slate-900 mb-3">
                  {service.name}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                      <svg className="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <div className="flex gap-6">
                    <div>
                      <div className="flex items-center gap-1 text-xs text-slate-400 mb-1">
                        <Clock className="w-3 h-3" /> Est. Time
                      </div>
                      <p className="font-medium text-slate-900 text-sm">{service.estimatedTime}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-xs text-slate-400 mb-1">
                        <DollarSign className="w-3 h-3" /> Pricing
                      </div>
                      <p className="font-medium text-slate-900 text-sm">Custom Quote</p>
                    </div>
                  </div>
                  {hasServicePage(service.slug) ? (
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-blue-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      View Details <ChevronRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <span className="text-slate-400 text-sm font-medium flex items-center gap-1">
                      Get a Quote <ChevronRight className="w-4 h-4" />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
