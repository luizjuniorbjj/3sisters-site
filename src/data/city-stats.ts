/**
 * src/data/city-stats.ts
 * City statistics layer for the Service × City matrix (Wave 5.0).
 * Feeds the GEO triad (Statistics + Cite Sources) on matrix pages.
 *
 * SSoT: projects/3sisters/seo/service-city-matrix-spec.md
 * Data provenance: projects/3sisters/research/wave5.0-city-stats.md
 * No Invention: every value has a real source (US Census, Zillow, FEMA).
 * households / renterPct only filled where sourced (Southwest Ranches).
 */

export interface CityStats {
  slug: string;
  population: number;
  households?: number;
  medianHomeValue: string;
  renterPct?: number;
  medianYearBuilt?: number;
  climateNote: string;
  sources: { label: string; url?: string }[];
}

const CENSUS = { label: 'U.S. Census Bureau' };
const ZILLOW = { label: 'Zillow' };
const FEMA = { label: 'FEMA' };

export const CITY_STATS: CityStats[] = [
  {
    slug: 'fort-lauderdale-fl',
    population: 194579,
    medianHomeValue: '$503,000–$657,500',
    medianYearBuilt: 1972,
    climateNote:
      'Coastal canals and beach: salt air and sand reach entryways, and high humidity feeds bathroom and kitchen mildew. The majority of the city sits in a FEMA Special Flood Hazard Area.',
    sources: [CENSUS, ZILLOW, FEMA],
  },
  {
    slug: 'boca-raton-fl',
    population: 104232,
    medianHomeValue: '$548,000–$650,000',
    medianYearBuilt: 1983,
    climateNote:
      'Affluent coastal Palm Beach: humidity and salt air drive interior upkeep, and 77 of 86 census tracts carry significant flood risk.',
    sources: [CENSUS, ZILLOW, FEMA],
  },
  {
    slug: 'parkland-fl',
    population: 42094,
    medianHomeValue: '$1,000,000–$1,350,000',
    medianYearBuilt: 2005,
    climateNote:
      'Inland near the Everglades: newer luxury homes, less salt air than the coast, but South Florida humidity still drives interior cleaning.',
    sources: [CENSUS, ZILLOW],
  },
  {
    slug: 'weston-fl',
    population: 70674,
    medianHomeValue: '$745,000–$957,000',
    medianYearBuilt: 1995,
    climateNote:
      'Master-planned near the Everglades: water-table and drainage considerations, with humidity-driven interior upkeep on homes now passing 30 years.',
    sources: [CENSUS, ZILLOW],
  },
  {
    slug: 'delray-beach-fl',
    population: 71802,
    medianHomeValue: '$357,000–$600,000',
    medianYearBuilt: 1983,
    climateNote:
      'Coastal downtown (Atlantic Avenue): salt air and humidity, with higher flood exposure east of I-95.',
    sources: [CENSUS, ZILLOW, FEMA],
  },
  {
    slug: 'lighthouse-point-fl',
    population: 10878,
    medianHomeValue: '$688,000–$849,000',
    medianYearBuilt: 1967,
    climateNote:
      'Waterfront enclave with the oldest housing stock in the area (1967 median): extreme salt air and humidity demand closer interior attention.',
    sources: [CENSUS, ZILLOW, FEMA],
  },
  {
    slug: 'southwest-ranches-fl',
    population: 7569,
    households: 2146,
    medianHomeValue: '~$1,224,469',
    renterPct: 4.2,
    climateNote:
      'Inland equestrian town of large lots near the Everglades: low density, 95.8% owner-occupied, with high South Florida humidity.',
    sources: [
      { label: 'U.S. Census Bureau (ACS) via Data USA', url: 'https://datausa.io/profile/geo/southwest-ranches-fl/' },
      { label: 'Zillow (2026)', url: 'https://www.zillow.com/home-values/20590/southwest-ranches-fl/' },
    ],
  },
  // ─── New York tier (Wave 6) — provenance: research/wave6-ny-city-stats.md ───
  {
    slug: 'manhattan-ny',
    population: 1660664,
    medianHomeValue: '~$1,105,600',
    renterPct: 74.9,
    climateNote:
      'Dense pre-war borough with the oldest housing stock in New York City — a large share of homes were built before 1940. About three in four residents rent, much of it in walk-ups, co-ops, and high-rises, so apartment turnover, building access, and street grit drive cleaning needs.',
    sources: [
      { label: 'U.S. Census Bureau (ACS 2024) via Census Reporter', url: 'http://censusreporter.org/profiles/05000US36061-new-york-county-ny/' },
    ],
  },
  {
    slug: 'brooklyn-ny',
    population: 2617631,
    medianHomeValue: '~$912,500',
    renterPct: 70.4,
    climateNote:
      'Brownstones, walk-ups, and newer condos across a borough where roughly seven in ten residents rent and much of the stock dates to the early 1950s and earlier. Stair-heavy buildings, original kitchens and baths, and frequent rental turnover shape the work.',
    sources: [
      { label: 'U.S. Census Bureau (ACS 2024) via Census Reporter', url: 'http://censusreporter.org/profiles/05000US36047-kings-county-ny/' },
    ],
  },
  {
    slug: 'queens-ny',
    population: 2316841,
    medianHomeValue: '~$723,800',
    renterPct: 55.1,
    climateNote:
      'The most owner-heavy of the three boroughs (about 45% own), with one- and two-family homes alongside apartments and a median build year around 1952. A wide mix of housing and the city’s most diverse population shape varied cleaning needs.',
    sources: [
      { label: 'U.S. Census Bureau (ACS 2024) via Census Reporter', url: 'http://censusreporter.org/profiles/05000US36081-queens-county-ny/' },
    ],
  },
  // ─── California tier (Wave 7) — provenance: research/wave7-ca-city-stats.md ───
  {
    slug: 'san-francisco-ca',
    population: 827526,
    medianHomeValue: '~$1,314,700',
    renterPct: 63.3,
    medianYearBuilt: 1946,
    climateNote:
      'Cool, mild marine climate (fog, not humidity) with older Victorian and Edwardian stock alongside condos and high-rises. About 63% of residents rent, and steep hills mean many walk-ups without elevators — ornate trim, hardwood, and rental turnover shape the work.',
    sources: [
      { label: 'U.S. Census Bureau (ACS 2024) via Census Reporter', url: 'http://censusreporter.org/profiles/16000US0667000-san-francisco-ca/' },
    ],
  },
];

export function getCityStats(slug: string): CityStats | undefined {
  return CITY_STATS.find((s) => s.slug === slug);
}
