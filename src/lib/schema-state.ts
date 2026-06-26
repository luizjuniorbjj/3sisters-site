/**
 * src/lib/schema-state.ts
 * JSON-LD generators for state hub pages — Wave 3.1.2 (2026-05-25)
 *
 * Emits per state @graph:
 *   - Place (state) with geo + Wikidata sameAs
 *   - Service areaServed = State (entire state)
 *   - ItemList of cities (linked or coverage)
 *   - BreadcrumbList Home > {State}
 */

import type { StatePage } from '@/data/states';
import { ORG_ID, SITE_URL } from '@/lib/schema';

export function generateStatePlaceSchema(state: StatePage) {
  return {
    '@type': 'Place',
    '@id': `${SITE_URL}/states/${state.slug}#place`,
    name: state.name,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: state.coords.lat,
      longitude: state.coords.lng,
    },
    sameAs: [`https://www.wikidata.org/wiki/${state.wikidataQID}`],
  };
}

export function generateStateServiceSchema(state: StatePage) {
  return {
    '@type': 'Service',
    '@id': `${SITE_URL}/states/${state.slug}#service`,
    name: `Cleaning Services in ${state.name}`,
    description: state.introFactual,
    serviceType: 'Residential and commercial cleaning',
    provider: { '@id': ORG_ID },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: state.name,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/booking/`,
    },
  };
}

export function generateStateCityListSchema(state: StatePage) {
  return {
    '@type': 'ItemList',
    '@id': `${SITE_URL}/states/${state.slug}#cities`,
    name: `Cities we serve in ${state.name}`,
    numberOfItems: state.cities.length,
    itemListElement: state.cities.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: c.hasPage
        ? {
            '@type': 'City',
            name: `${c.name}, ${state.abbr}`,
            url: `${SITE_URL}/cities/${c.slug}/`,
            ...(c.county ? { containedInPlace: { '@type': 'AdministrativeArea', name: c.county } } : {}),
          }
        : {
            '@type': 'City',
            name: `${c.name}, ${state.abbr}`,
            ...(c.county ? { containedInPlace: { '@type': 'AdministrativeArea', name: c.county } } : {}),
          },
    })),
  };
}

export function generateStateBreadcrumbSchema(state: StatePage) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}/states/${state.slug}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: state.name,
        item: `${SITE_URL}/states/${state.slug}/`,
      },
    ],
  };
}

export function generateStateGraph(state: StatePage) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      generateStatePlaceSchema(state),
      generateStateServiceSchema(state),
      generateStateCityListSchema(state),
      generateStateBreadcrumbSchema(state),
    ],
  };
}
