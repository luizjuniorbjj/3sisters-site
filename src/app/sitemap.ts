import type { MetadataRoute } from 'next';
import { SERVICE_CITY_PAGES } from '@/data/service-city';

// Final production domain (DNS cutover target).
const BASE_URL = 'https://3sistersservices.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${BASE_URL}/`, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/services/`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/services/office-commercial-cleaning/`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/services/regular-cleaning/`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/services/deep-cleaning/`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/services/move-in-out-cleaning/`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/services/airbnb-cleaning/`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/services/personal-organizing/`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/booking/`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/about/`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/faq/`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/pricing/`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/contact/`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/team/`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog/`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog/how-to-prepare-for-deep-cleaning/`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/blog/hiring-cleaning-service-nyc/`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/blog/airbnb-cleaning-checklist/`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    // Florida city hubs retired (WS-B / ADR-3S-001) — 301 -> home in _redirects.
    { url: `${BASE_URL}/cities/manhattan-ny/`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/cities/brooklyn-ny/`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/cities/queens-ny/`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/cities/san-francisco-ca/`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/states/new-york/`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/states/california/`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/legal/privacy/`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/legal/terms/`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    // Service × City matrix cells (Wave 5.x) — high-intent local pages
    ...SERVICE_CITY_PAGES.map((sc) => ({
      url: `${BASE_URL}/cities/${sc.citySlug}/${sc.serviceSlug}/`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
