/**
 * src/lib/schema-service.ts
 * JSON-LD generators for dedicated service pages — Wave 4.0 (2026-05-30)
 *
 * Emits @graph with 5 entities per service:
 *  - Service  (REUSES canonical @id /services/#{slug} referenced by home catalog
 *              in schema.ts; adds mainEntityOfPage → dedicated URL)
 *  - FAQPage  (author Person + about Service — Atlas camadas 1+2+3)
 *  - BreadcrumbList
 *  - HowTo     (book — Atlas camada 4)
 *  - WebPage + Speakable (Atlas camada 5)
 *
 * SSoT: projects/3sisters/seo/service-page-pattern-spec.md
 */

import type { ServicePage } from '@/data/service-pages';
import { ORG_ID, PERSON_ID, SITE_URL } from '@/lib/schema';

const SERVICE_FAQ_DATE_MODIFIED = '2026-05-30';

const AREA_SERVED = [
  { '@type': 'AdministrativeArea', name: 'New York' },
  { '@type': 'AdministrativeArea', name: 'California' },
];

export function generateServiceServiceSchema(sp: ServicePage) {
  return {
    '@type': 'Service',
    // Canonical @id — same identifier already referenced by the home CleaningService
    // hasOfferCatalog in schema.ts. Consolidates the entity (no duplicate).
    '@id': `${SITE_URL}/services/#${sp.slug}`,
    name: sp.name,
    alternateName: sp.alternateNames,
    description: sp.introFactual,
    serviceType: sp.serviceTypeSchema,
    provider: { '@id': ORG_ID },
    areaServed: AREA_SERVED,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}${sp.ctaHref.split('?')[0]}/`,
    },
    // Dedicated page is the canonical descriptor of this entity.
    mainEntityOfPage: `${SITE_URL}/services/${sp.slug}/`,
  };
}

export function generateServiceFAQSchema(sp: ServicePage) {
  return {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/services/${sp.slug}#faq`,
    isPartOf: { '@id': `${SITE_URL}/services/${sp.slug}` },
    dateModified: SERVICE_FAQ_DATE_MODIFIED,
    inLanguage: 'en-US',
    mainEntity: sp.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      about: { '@type': 'Service', '@id': `${SITE_URL}/services/#${sp.slug}` },
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
        author: { '@id': PERSON_ID },
      },
    })),
  };
}

export function generateServiceBreadcrumbSchema(sp: ServicePage) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}/services/${sp.slug}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services/` },
      {
        '@type': 'ListItem',
        position: 3,
        name: sp.name,
        item: `${SITE_URL}/services/${sp.slug}/`,
      },
    ],
  };
}

export function generateServiceBookingHowToSchema(sp: ServicePage) {
  return {
    '@type': 'HowTo',
    '@id': `${SITE_URL}/services/${sp.slug}#howto-book`,
    name: `How to Book ${sp.name}`,
    description: `Three ways to book ${sp.name.toLowerCase()} with 3 Sisters Services. Every booking is confirmed personally by a family member.`,
    inLanguage: 'en-US',
    totalTime: 'PT5M',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Request a quote',
        text: 'Tell us about your space through our contact form, or call our team — we send a tailored quote for your business.',
        url: `${SITE_URL}${sp.ctaHref.split('?')[0]}/`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Call our trilingual team',
        text: 'Call (657) 737-7171 Monday through Saturday, 8am to 6pm. Our team answers in English, Spanish, or Portuguese.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Chat through our website',
        text: 'Use the website chat for a fast reply during business hours — our scheduling team handles commercial requests directly.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Receive personal confirmation',
        text: 'A team member confirms every booking personally with quote details and an arrival window. Your card is only charged after the work is done.',
      },
    ],
  };
}

export function generateServiceSpeakableSchema(sp: ServicePage) {
  return {
    '@type': 'WebPage',
    '@id': `${SITE_URL}/services/${sp.slug}#webpage`,
    url: `${SITE_URL}/services/${sp.slug}/`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.speakable-service-intro', '.speakable-service-faq'],
    },
    inLanguage: 'en-US',
  };
}

export function generateServiceGraph(sp: ServicePage) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      generateServiceServiceSchema(sp),
      generateServiceFAQSchema(sp),
      generateServiceBreadcrumbSchema(sp),
      generateServiceBookingHowToSchema(sp),
      generateServiceSpeakableSchema(sp),
    ],
  };
}
