import type { Metadata } from 'next';
import { SOCIAL_OG_IMAGES } from '@/lib/schema';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata: Metadata = {
  title: 'About Us — Our Story, Our Family',
  description:
    'Meet 3 Sisters Services — a family-owned cleaning company serving New York and California. Bonded, insured, background-checked. Care, trust, and flexibility on every clean.',
  alternates: {
    canonical: 'https://3sistersservices.com/about/',
  },
  openGraph: {
    title: 'About 3 Sisters Services — Family-Owned Cleaning',
    description:
      'A family-owned cleaning company built on care, trust, and flexibility. Serving New York and California with bonded, insured, background-checked professionals.',
    url: 'https://3sistersservices.com/about/',
    type: 'website',
    images: SOCIAL_OG_IMAGES,
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'About Us', href: '/about' },
        ]}
      />
      {children}
    </>
  );
}
