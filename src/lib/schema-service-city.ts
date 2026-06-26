/**
 * src/lib/schema-service-city.ts
 * JSON-LD @graph for Service × City matrix pages (Wave 5.0).
 *
 * 5 entities per cell (BreadcrumbList is emitted by <Breadcrumbs> component):
 *  - Service  (CITY-SCOPED @id ${pageUrl}#service, isSimilarTo canonical service)
 *  - Place    (REUSES city @id ${SITE_URL}/cities/{citySlug}#place)
 *  - FAQPage  (author Person, about -> city-scoped service)
 *  - HowTo    ("How to Book {service} in {city}")
 *  - WebPage + Speakable
 *
 * SSoT: projects/3sisters/seo/service-city-matrix-spec.md
 */

import type { CityPage } from '@/data/cities';
import type { ServiceCityPage } from '@/data/service-city';
import { ORG_ID, PERSON_ID, SITE_URL } from '@/lib/schema';

const SC_FAQ_DATE_MODIFIED = '2026-06-04';

export function generateServiceCityGraph(sc: ServiceCityPage, city: CityPage) {
  const pageUrl = `${SITE_URL}/cities/${city.slug}/${sc.serviceSlug}/`;
  const placeId = `${SITE_URL}/cities/${city.slug}#place`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. Service — CITY-SCOPED @id (one entity per cell), linked to the
      //    canonical statewide service via isSimilarTo. Avoids redefining the
      //    same @id across 42 cells (Smith MEDIUM-2).
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: `${sc.serviceName} in ${city.name}, ${city.stateAbbr}`,
        description: sc.answerFirst,
        serviceType: sc.serviceTypeSchema,
        provider: { '@id': ORG_ID },
        areaServed: { '@id': placeId },
        isSimilarTo: { '@id': `${SITE_URL}/services/#${sc.serviceSlug}` },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: `${SITE_URL}${sc.ctaHref}`,
        },
        mainEntityOfPage: pageUrl,
      },
      // 2. Place — reuses the city's place entity
      {
        '@type': 'Place',
        '@id': placeId,
        name: `${city.name}, ${city.stateAbbr}`,
        geo: {
          '@type': 'GeoCoordinates',
          latitude: city.coords.lat,
          longitude: city.coords.lng,
        },
        containedInPlace: { '@type': 'AdministrativeArea', name: city.county },
        sameAs: [`https://www.wikidata.org/wiki/${city.wikidataQID}`],
      },
      // 3. FAQPage
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        isPartOf: { '@id': pageUrl },
        dateModified: SC_FAQ_DATE_MODIFIED,
        inLanguage: 'en-US',
        mainEntity: sc.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          about: { '@type': 'Service', '@id': `${pageUrl}#service` },
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a,
            author: { '@id': PERSON_ID },
          },
        })),
      },
      // 4. HowTo
      {
        '@type': 'HowTo',
        '@id': `${pageUrl}#howto-book`,
        name: `How to Book ${sc.serviceName} in ${city.name}, ${city.stateAbbr}`,
        description: `Book ${sc.serviceName.toLowerCase()} with 3 Sisters Services in ${city.name}. Every booking is confirmed personally, in English, Spanish, or Portuguese.`,
        inLanguage: 'en-US',
        totalTime: 'PT5M',
        about: { '@id': placeId },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: `Request a real-time quote`,
            text: `Tell us your ${city.name} home's size and what you need — you get a real-time quote with no pre-authorization hold.`,
            url: `${SITE_URL}${sc.ctaHref}`,
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Call our trilingual team',
            text: `Call (657) 737-7171 Monday through Saturday, 8am to 6pm. Our ${city.name} team answers in English, Spanish, or Portuguese.`,
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Chat through our website',
            text: `Use the website chat for a fast reply during business hours — our scheduling team handles ${city.name} requests directly.`,
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Receive personal confirmation',
            text: `A team member confirms your ${city.name} ${sc.serviceName.toLowerCase()} personally with quote details and an arrival window.`,
          },
        ],
      },
      // NOTE: BreadcrumbList is emitted by the <Breadcrumbs> component (single
      // source) — NOT duplicated here (Smith MEDIUM-1). The component already
      // renders the 4-level Home > State > City > Service trail as JSON-LD.
      // WebPage + Speakable
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.speakable-sc-answer', '.speakable-sc-faq'],
        },
        inLanguage: 'en-US',
      },
    ],
  };
}
