/**
 * src/lib/schema-city.ts
 * JSON-LD generators for city pages — Wave 3.0 (2026-05-25)
 *
 * Emits @graph with 4 entities per city:
 *  - Service (areaServed: City)
 *  - Place (geo + Wikidata sameAs)
 *  - FAQPage (city-specific with author Person)
 *  - BreadcrumbList
 *
 * SSoT: projects/3sisters/seo/wave3.0-city-pattern-spec.md
 */

import type { CityPage } from '@/data/cities';
import { ORG_ID, PERSON_ID, SITE_URL } from '@/lib/schema';

const CITY_FAQ_DATE_MODIFIED = '2026-05-25';

export function generateCityServiceSchema(city: CityPage) {
  return {
    '@type': 'Service',
    '@id': `${SITE_URL}/cities/${city.slug}#service`,
    name: `Cleaning Services in ${city.name}, ${city.stateAbbr}`,
    description: city.introFactual,
    serviceType: 'Residential and commercial cleaning',
    provider: { '@id': ORG_ID },
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: city.stateName,
      },
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/booking/`,
    },
  };
}

export function generateCityPlaceSchema(city: CityPage) {
  return {
    '@type': 'Place',
    '@id': `${SITE_URL}/cities/${city.slug}#place`,
    name: `${city.name}, ${city.stateAbbr}`,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: city.coords.lat,
      longitude: city.coords.lng,
    },
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: city.county,
    },
    sameAs: [`https://www.wikidata.org/wiki/${city.wikidataQID}`],
  };
}

export function generateCityFAQSchema(city: CityPage) {
  return {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/cities/${city.slug}#faq`,
    isPartOf: { '@id': `${SITE_URL}/cities/${city.slug}` },
    dateModified: CITY_FAQ_DATE_MODIFIED,
    inLanguage: 'en-US',
    mainEntity: city.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      about: {
        '@type': 'Place',
        name: `${city.name}, ${city.stateAbbr}`,
        sameAs: `https://www.wikidata.org/wiki/${city.wikidataQID}`,
      },
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
        author: { '@id': PERSON_ID },
      },
    })),
  };
}

/**
 * Atlas Wave 1.5 — Camada 4: HowTo embutido per city.
 * Generates "How to book cleaning in {city}" HowTo schema.
 * Wave 3.1.1 (2026-05-25).
 */
export function generateCityBookingHowToSchema(city: CityPage) {
  return {
    '@type': 'HowTo',
    '@id': `${SITE_URL}/cities/${city.slug}#howto-book`,
    name: `How to Book Cleaning in ${city.name}, ${city.stateAbbr}`,
    description: `Three ways to book a cleaning with 3 Sisters Services in ${city.name}, ${city.stateAbbr}. Every booking is confirmed personally by a family member.`,
    inLanguage: 'en-US',
    totalTime: 'PT5M',
    about: {
      '@type': 'Place',
      name: `${city.name}, ${city.stateAbbr}`,
      sameAs: `https://www.wikidata.org/wiki/${city.wikidataQID}`,
    },
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: `Book online for ${city.name}`,
        text: `Visit 3sistersservices.com/booking and select your service, frequency, and preferred date for your ${city.name} address.`,
        url: `${SITE_URL}/booking/`,
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
        text: `A team member confirms every ${city.name} booking personally with quote details and arrival window. Our client portal stays available for quick rescheduling between visits.`,
      },
    ],
  };
}

/**
 * Atlas Wave 1.5 — Camada 5: SpeakableSpecification subset per city.
 * Marks 2 FAQs per city as speakable for voice search.
 * Wave 3.1.1 (2026-05-25).
 */
export function generateCitySpeakableSchema(city: CityPage) {
  return {
    '@type': 'WebPage',
    '@id': `${SITE_URL}/cities/${city.slug}#webpage`,
    url: `${SITE_URL}/cities/${city.slug}/`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.speakable-city-intro', '.speakable-city-faq'],
    },
    inLanguage: 'en-US',
  };
}

export function generateCityBreadcrumbSchema(city: CityPage) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}/cities/${city.slug}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${city.name}, ${city.stateAbbr}`,
        item: `${SITE_URL}/cities/${city.slug}/`,
      },
    ],
  };
}

export function generateCityGraph(city: CityPage) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      generateCityServiceSchema(city),
      generateCityPlaceSchema(city),
      generateCityFAQSchema(city),
      generateCityBreadcrumbSchema(city),
      generateCityBookingHowToSchema(city),
      generateCitySpeakableSchema(city),
    ],
  };
}
