/**
 * src/data/states.ts
 * State hub pages data — Wave 3.1.2 (2026-05-25)
 *
 * 2 states served (Florida de-scoped 2026-06-08 — booking is NYC-only via Launch27):
 *   - New York: 3 cities (Manhattan, Brooklyn, Queens)
 *   - California: 1 city (San Francisco)
 */

export interface StateCityRef {
  name: string;
  slug?: string;        // se city page LIVE → /cities/{slug}; senão sem link
  county?: string;
  hasPage: boolean;     // true = LIVE city page; false = coverage area
}

export interface StatePage {
  slug: string;
  name: string;
  abbr: 'FL' | 'NY' | 'CA';
  coords: { lat: number; lng: number };
  wikidataQID: string;
  introFactual: string;
  serviceContext: string;
  cities: StateCityRef[];
}

const ALL_STATE_PAGES: StatePage[] = [
  {
    slug: 'florida',
    name: 'Florida',
    abbr: 'FL',
    coords: { lat: 27.9944, lng: -81.7603 },
    wikidataQID: 'Q812',
    introFactual: `Florida is 3 Sisters Services' largest operating region. We run weekly and bi-weekly cleaning routes across seven cities in Broward and Palm Beach counties — from oceanfront condos in Lighthouse Point to gated estates in Parkland and Southwest Ranches. Bonded, insured, and trilingual on every visit since 2019.`,
    serviceContext: `Our Florida calendar covers single-family homes, condos, gated communities, beach rentals, and equestrian estates. Routes are organized by county — Broward (Fort Lauderdale, Parkland, Weston, Lighthouse Point, Southwest Ranches) and Palm Beach (Boca Raton, Delray Beach) — with trilingual (EN/ES/PT) handling for the region's large Hispanic and Latin-American homeowner base. South Florida humidity and proximity to the Atlantic shape how we clean: closer attention to bathrooms and kitchens, sand sweep on entryways near the beach, and pre-storm reset bookings during hurricane season.`,
    cities: [
      { name: 'Fort Lauderdale', slug: 'fort-lauderdale-fl', county: 'Broward County', hasPage: true },
      { name: 'Boca Raton', slug: 'boca-raton-fl', county: 'Palm Beach County', hasPage: true },
      { name: 'Parkland', slug: 'parkland-fl', county: 'Broward County', hasPage: true },
      { name: 'Weston', slug: 'weston-fl', county: 'Broward County', hasPage: true },
      { name: 'Delray Beach', slug: 'delray-beach-fl', county: 'Palm Beach County', hasPage: true },
      { name: 'Lighthouse Point', slug: 'lighthouse-point-fl', county: 'Broward County', hasPage: true },
      { name: 'Southwest Ranches', slug: 'southwest-ranches-fl', county: 'Broward County', hasPage: true },
    ],
  },
  {
    slug: 'new-york',
    name: 'New York',
    abbr: 'NY',
    coords: { lat: 40.7128, lng: -74.0060 },
    wikidataQID: 'Q60',
    introFactual: `New York City is part of our regular coverage area. 3 Sisters Services runs cleaning routes across Manhattan, Brooklyn, and Queens — apartments, brownstones, townhouses, and office spaces. Our WeWork Soho office anchors the NY operation. Bonded, insured, and trilingual (EN/ES/PT).`,
    serviceContext: `New York City work runs differently than our Florida route — building access, elevator scheduling, and doorman coordination shape every visit. Manhattan condos, Brooklyn brownstones, and Queens single-family homes are on our regular schedule. We handle weekly, bi-weekly, one-time deep cleans, and Move-In/Move-Out work. The route is trilingual (EN/ES/PT) for the city's large Hispanic homeowner population, and we coordinate building rules per address.`,
    cities: [
      { name: 'Manhattan', slug: 'manhattan-ny', county: 'New York County', hasPage: true },
      { name: 'Brooklyn', slug: 'brooklyn-ny', county: 'Kings County', hasPage: true },
      { name: 'Queens', slug: 'queens-ny', county: 'Queens County', hasPage: true },
    ],
  },
  {
    slug: 'california',
    name: 'California',
    abbr: 'CA',
    coords: { lat: 37.7749, lng: -122.4194 },
    wikidataQID: 'Q99',
    introFactual: `California is part of 3 Sisters Services' coverage area. We serve San Francisco from a Regus office in Mountain View, with routes across the city's neighborhoods. Bonded, insured, and trilingual on every visit since 2019.`,
    serviceContext: `San Francisco work covers single-family homes, condos, and Airbnb turnovers across the city. Our team handles the variation in building stock — Victorians in Pacific Heights, mid-century homes in the Sunset, modern condos SoMa, and rentals near tourist corridors. Trilingual (EN/ES/PT) service available for the city's Hispanic and Latin-American homeowner base.`,
    cities: [
      { name: 'San Francisco', slug: 'san-francisco-ca', county: 'San Francisco County', hasPage: true },
    ],
  },
];

// WS-B (ADR-3S-001): Florida retired from the site. New York + California stay.
// Filter keeps source data intact (reversible); FL is excluded from every consumer.
export const STATE_PAGES: StatePage[] = ALL_STATE_PAGES.filter((s) => s.abbr !== 'FL');

export function getStateBySlug(slug: string): StatePage | undefined {
  return STATE_PAGES.find((s) => s.slug === slug);
}
