/**
 * Breadcrumbs — Renders BreadcrumbList JSON-LD only (no visual UI).
 *
 * Visual breadcrumb is page-specific; this component handles SEO schema.
 * Usage: <Breadcrumbs items={[{label:'Home', href:'/'}, {label:'Services', href:'/services'}]} />
 *
 * Pattern adapted from L,B&J Solutions Wave 1.5 schema strategy.
 */

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const SITE_URL = 'https://3sistersservices.com';

function absoluteUrl(href: string): string {
  if (href.startsWith('http')) return href;
  if (href.startsWith('/')) return `${SITE_URL}${href}`;
  return `${SITE_URL}/${href}`;
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
