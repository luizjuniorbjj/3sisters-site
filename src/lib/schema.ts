/**
 * src/lib/schema.ts
 * Centralized JSON-LD schema definitions for 3 Sisters Services.
 *
 * Source of truth pattern: L,B&J Solutions Wave 1.5 schema-strategy.md
 * Vertical adaptation: CleaningService (instead of HousePainter).
 *
 * Canonical @id anchors:
 *   - Organization: https://3sistersservices.com/#organization
 *   - Person founder: https://3sistersservices.com/#person-founder
 *   - Legal entity: https://3sistersservices.com/#legal-entity
 *   - WebSite: https://3sistersservices.com/#website
 *   - Services: https://3sistersservices.com/services/#{slug}
 */

export const SITE_URL = 'https://3sistersservices.com';

// PATCH PRÉ-CUTOVER (2026-05-31): social preview images are served from the
// live Cloudflare Pages host because the canonical domain (3sistersservices.com)
// still serves the old WordPress site until the DNS cutover. SITE_URL stays on
// the canonical domain for canonical tags / schema @id / sitemap.
// AFTER CUTOVER: set SOCIAL_BASE_URL = SITE_URL and restore file-convention OG.
export const SOCIAL_BASE_URL = 'https://3sisters-site.pages.dev';
export const SOCIAL_IMAGE_URL = `${SOCIAL_BASE_URL}/opengraph-image.png`;
export const SOCIAL_OG_IMAGES = [
  {
    url: SOCIAL_IMAGE_URL,
    width: 1200,
    height: 630,
    type: 'image/png',
    alt: '3 Sisters Cleaning and Home Organizing',
  },
];

export const ORG_ID = `${SITE_URL}/#organization`;
export const PERSON_ID = `${SITE_URL}/#person-founder`;
export const LEGAL_ID = `${SITE_URL}/#legal-entity`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const SERVICE_AREAS = [
  { '@type': 'City' as const, name: 'Manhattan', containedInPlace: { '@type': 'AdministrativeArea' as const, name: 'New York' } },
  { '@type': 'City' as const, name: 'Brooklyn', containedInPlace: { '@type': 'AdministrativeArea' as const, name: 'New York' } },
  { '@type': 'City' as const, name: 'Queens', containedInPlace: { '@type': 'AdministrativeArea' as const, name: 'New York' } },
  { '@type': 'City' as const, name: 'San Francisco', containedInPlace: { '@type': 'AdministrativeArea' as const, name: 'California' } },
];

const SERVICE_AREAS_INTERNAL = SERVICE_AREAS;

// NAP primary = New York (WS-B / ADR-3S-001) — Florida office retired.
export const OFFICE_ADDRESSES = [
  {
    '@type': 'PostalAddress' as const,
    streetAddress: '175 Varick St',
    addressLocality: 'New York',
    addressRegion: 'NY',
    postalCode: '10014',
    addressCountry: 'US',
    geo: {
      '@type': 'GeoCoordinates' as const,
      latitude: 40.7280,
      longitude: -74.0044,
    },
  },
  {
    '@type': 'PostalAddress' as const,
    streetAddress: '800 W El Camino Real',
    addressLocality: 'Mountain View',
    addressRegion: 'CA',
    postalCode: '94040',
    addressCountry: 'US',
    geo: {
      '@type': 'GeoCoordinates' as const,
      latitude: 37.3861,
      longitude: -122.0839,
    },
  },
];

const offerStub = {
  '@type': 'Offer',
  priceCurrency: 'USD',
  availability: 'https://schema.org/InStock',
  url: `${SITE_URL}/booking/`,
};

/**
 * Homepage @graph — CleaningService + Person founder + Organization legal + WebSite + SearchAction.
 * Inject ONLY on `/` via <JsonLd data={HOMEPAGE_GRAPH} />.
 */
export const HOMEPAGE_GRAPH = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CleaningService',
      '@id': ORG_ID,
      name: '3 Sisters Cleaning and Home Organizing',
      alternateName: ['3 Sisters Services', '3Sisters Cleaning and Home Organizing', '3Sisters Services'],
      description:
        'Family-owned professional cleaning company serving New York and California. Six services — regular cleaning, deep cleaning, move-in/out, Airbnb turnovers, office & commercial cleaning, and personal organizing. Bonded, insured, and background-checked on every visit.',
      url: `${SITE_URL}/`,
      telephone: '+16577377171',
      email: 'contact@3sistersservices.com',
      priceRange: '$$',
      foundingDate: '2019',
      image: [`${SITE_URL}/images/brand/logo.png`],
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/brand/logo.png`,
      },
      address: OFFICE_ADDRESSES,
      areaServed: SERVICE_AREAS,
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '08:00',
          closes: '18:00',
        },
      ],
      knowsLanguage: ['en', 'es'],
      slogan: 'Care. Trust. Flexibility.',
      paymentAccepted: ['Credit Card', 'Debit Card'],
      currenciesAccepted: 'USD',
      sameAs: [
        'https://www.instagram.com/3sisters_services',
        'https://www.facebook.com/3sistersservices',
        'https://www.google.com/maps/place/?q=place_id:ChIJHd7qg_U_jaARfYZtUMdTLSY',
        'https://www.yelp.com/biz/3-sisters-cleaning-and-home-organizing-new-york',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: '3 Sisters Cleaning and Home Organizing — Services Catalog',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', '@id': `${SITE_URL}/services/#regular-cleaning`, name: 'Regular Cleaning' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', '@id': `${SITE_URL}/services/#deep-cleaning`, name: 'Deep Cleaning' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', '@id': `${SITE_URL}/services/#move-in-out-cleaning`, name: 'Move-In / Move-Out Cleaning' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', '@id': `${SITE_URL}/services/#airbnb-cleaning`, name: 'Airbnb & Vacation Rental Cleaning' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', '@id': `${SITE_URL}/services/#office-commercial-cleaning`, name: 'Office & Commercial Cleaning' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', '@id': `${SITE_URL}/services/#personal-organizing`, name: 'Personal Organizing Services' } },
        ],
      },
      makesOffer: [
        { '@id': `${SITE_URL}/services/#regular-cleaning` },
        { '@id': `${SITE_URL}/services/#deep-cleaning` },
        { '@id': `${SITE_URL}/services/#move-in-out-cleaning` },
        { '@id': `${SITE_URL}/services/#airbnb-cleaning` },
        { '@id': `${SITE_URL}/services/#office-commercial-cleaning` },
        { '@id': `${SITE_URL}/services/#personal-organizing` },
      ],
      founder: { '@id': PERSON_ID },
    },
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'The 3 Sisters',
      jobTitle: 'Founders & Owners',
      worksFor: { '@id': ORG_ID },
      description:
        'Family-run leadership of 3 Sisters Services. Personally oversee training, screening, and quality across New York and California operations.',
      knowsLanguage: ['en', 'es'],
    },
    {
      '@type': 'Organization',
      '@id': LEGAL_ID,
      name: '3 Sisters Cleaning and Home Organizing',
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/images/brand/logo.png`,
      foundingDate: '2019',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+16577377171',
        email: 'contact@3sistersservices.com',
        contactType: 'customer service',
        areaServed: ['US-NY', 'US-CA'],
        availableLanguage: ['English', 'Spanish'],
      },
      sameAs: [
        'https://www.instagram.com/3sisters_services',
        'https://www.facebook.com/3sistersservices',
        'https://www.google.com/maps/place/?q=place_id:ChIJHd7qg_U_jaARfYZtUMdTLSY',
        'https://www.yelp.com/biz/3-sisters-cleaning-and-home-organizing-new-york',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: '3 Sisters Cleaning and Home Organizing',
      description: 'Family-owned cleaning company serving New York and California.',
      publisher: { '@id': ORG_ID },
      inLanguage: 'en-US',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/?s={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

/**
 * Global schema (Organization + WebSite) for non-home pages.
 * Lighter than HOMEPAGE_GRAPH — no CleaningService duplication.
 * Inject in layout.tsx so it appears on all internal pages.
 */
export const GLOBAL_GRAPH = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': LEGAL_ID,
      name: '3 Sisters Cleaning and Home Organizing',
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/images/brand/logo.png`,
      foundingDate: '2019',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+16577377171',
        email: 'contact@3sistersservices.com',
        contactType: 'customer service',
        areaServed: ['US-NY', 'US-CA'],
        availableLanguage: ['English', 'Spanish'],
      },
      sameAs: [
        'https://www.instagram.com/3sisters_services',
        'https://www.facebook.com/3sistersservices',
        'https://www.google.com/maps/place/?q=place_id:ChIJHd7qg_U_jaARfYZtUMdTLSY',
        'https://www.yelp.com/biz/3-sisters-cleaning-and-home-organizing-new-york',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: '3 Sisters Cleaning and Home Organizing',
      publisher: { '@id': ORG_ID },
      inLanguage: 'en-US',
    },
  ],
};

/**
 * Services page @graph — 6 Service objects with @id anchors referenced by HOMEPAGE_GRAPH.
 * Inject ONLY on /services via <JsonLd data={SERVICES_PAGE_GRAPH} />.
 */
export const SERVICES_PAGE_GRAPH = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${SITE_URL}/services/#regular-cleaning`,
      name: 'Regular Cleaning',
      alternateName: ['Recurring Cleaning', 'Weekly Cleaning', 'House Cleaning'],
      description:
        'Recurring weekly, bi-weekly, or monthly home and office cleaning. Includes dusting, surface wiping, floor vacuuming and mopping, bathroom sanitization, kitchen detailing, and tidying. Optional add-ons: extra bathrooms, inside oven, inside fridge, inside cabinets, dishes, pet hair removal.',
      serviceType: 'Recurring residential and commercial cleaning',
      provider: { '@id': ORG_ID },
      areaServed: SERVICE_AREAS_INTERNAL,
      offers: offerStub,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Regular Cleaning Tasks',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dust and wipe all furniture and surfaces' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Clean countertops and tables' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Vacuum carpets and rugs' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mop hard floors' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Empty trash bins' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sanitize light switches and door handles' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Clean mirrors and glass' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Disinfect bathroom surfaces' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Clean toilets and sinks' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'General tidying of rooms' } },
        ],
      },
    },
    {
      '@type': 'Service',
      '@id': `${SITE_URL}/services/#deep-cleaning`,
      name: 'Deep Cleaning',
      alternateName: ['Top-to-Bottom Cleaning', 'Spring Cleaning', 'Reset Cleaning'],
      description:
        'Full reset cleaning for homes and offices that need more than surface care. Ideal post-renovation, seasonal refresh, or when moving back into a long-untouched space. Behind-furniture cleaning, baseboards, walls, kitchen detail (backsplash, grout, grease), full bathroom sanitization, vents and air returns.',
      serviceType: 'Deep residential and commercial cleaning',
      provider: { '@id': ORG_ID },
      areaServed: SERVICE_AREAS_INTERNAL,
      offers: offerStub,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Deep Cleaning Tasks',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Clean behind and under furniture' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Scrub baseboards, doors, and frames' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Wipe down walls and remove smudges' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Detail clean kitchen (backsplash, grout, grease buildup)' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sanitize bathrooms thoroughly' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Clean vents and air returns' } },
        ],
      },
    },
    {
      '@type': 'Service',
      '@id': `${SITE_URL}/services/#move-in-out-cleaning`,
      name: 'Move-In / Move-Out Cleaning',
      alternateName: ['Move-In Cleaning', 'Move-Out Cleaning', 'End-of-Tenancy Cleaning', 'Rental Turnover Cleaning'],
      description:
        'Detailed cleaning for tenants, homeowners, landlords, and property managers during transitions. Inside cabinets and drawers, all appliances inside and out, full floor care, baseboards, windows and sills, deep bathroom sanitization, light switches and doorknobs, full trash removal and final sweep.',
      serviceType: 'Move-in / move-out cleaning',
      provider: { '@id': ORG_ID },
      areaServed: SERVICE_AREAS_INTERNAL,
      offers: offerStub,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Move-In / Move-Out Cleaning Tasks',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Clean inside cabinets and drawers (kitchen and bathroom)' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Clean all appliances inside and out' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Vacuum and mop all floors' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Remove cobwebs and dust baseboards' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Wash windows and windowsills' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Deep clean toilets, showers, and tubs' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Disinfect light switches and doorknobs' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Trash removal and final sweep' } },
        ],
      },
    },
    {
      '@type': 'Service',
      '@id': `${SITE_URL}/services/#airbnb-cleaning`,
      name: 'Airbnb & Vacation Rental Cleaning',
      alternateName: ['Short-Term Rental Cleaning', 'Vacation Rental Turnover', 'STR Cleaning'],
      description:
        'Same-day guest-ready turnovers for short-term rental hosts and property managers. Linen change and bed making, full dusting, mirror and window care, kitchen sanitization with basic restock, bathroom reset, trash and liner replacement, lost-and-found check, scent and presentation verification.',
      serviceType: 'Short-term rental turnover cleaning',
      provider: { '@id': ORG_ID },
      areaServed: SERVICE_AREAS_INTERNAL,
      offers: offerStub,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Airbnb Turnover Tasks',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Change bed linens and make beds' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dust all furniture and fixtures' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Clean mirrors and windows' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sanitize kitchen and restock basic items' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Clean and sanitize bathroom' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Empty trash and replace liners' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Check for forgotten items from guests' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ensure overall presentation and guest-ready scent' } },
        ],
      },
    },
    {
      '@type': 'Service',
      '@id': `${SITE_URL}/services/#office-commercial-cleaning`,
      name: 'Office & Commercial Cleaning',
      alternateName: ['Office Cleaning', 'Commercial Cleaning', 'Janitorial Service'],
      description:
        'Custom-scheduled office and commercial space cleaning around your business hours. Desk and equipment dusting, shared equipment disinfection, full floor care, trash and recycling, restroom sanitization with restock, breakroom and kitchen care, high-touch surface disinfection.',
      serviceType: 'Commercial cleaning',
      provider: { '@id': ORG_ID },
      areaServed: SERVICE_AREAS_INTERNAL,
      offers: offerStub,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Office Cleaning Tasks',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dust desks, monitors, keyboards, and phones' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Disinfect shared office equipment' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Vacuum carpets and clean floors' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Empty trash cans and recycling bins' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sanitize restrooms (toilets, sinks, counters, mirrors)' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Refill soap, paper towels, and hygiene items' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Clean office kitchen and breakroom' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Disinfect door handles and light switches' } },
        ],
      },
    },
    {
      '@type': 'Service',
      '@id': `${SITE_URL}/services/#personal-organizing`,
      name: 'Personal Organizing Services',
      alternateName: ['Home Organizing', 'Decluttering Service', 'Closet Organization'],
      description:
        'Reset, declutter, and create calm and functional spaces in your home or office. Decluttering of rooms and storage areas, closet, pantry and cabinet organization, custom storage solutions, donation and disposal coordination, optional maintenance plans.',
      serviceType: 'Home and office organizing',
      provider: { '@id': ORG_ID },
      areaServed: SERVICE_AREAS_INTERNAL,
      offers: offerStub,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Personal Organizing Tasks',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Decluttering of rooms and storage areas' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Closet, pantry, and cabinet organization' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom storage solutions' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Donation and disposal coordination' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Maintenance plans available' } },
        ],
      },
    },
  ],
};
