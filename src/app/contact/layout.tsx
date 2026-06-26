import type { Metadata } from 'next';
import { SOCIAL_OG_IMAGES } from '@/lib/schema';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Contact Us — Get Your Free Cleaning Quote',
  description:
    'Get in touch with 3 Sisters Services. Call (657) 737-7171, email contact@3sistersservices.com, or send us a message. Serving New York and California — Mon–Sat 8am–6pm.',
  alternates: {
    canonical: 'https://3sistersservices.com/contact/',
  },
  openGraph: {
    title: 'Contact 3 Sisters Services — Phone, Email & Service Areas',
    description:
      'Call (657) 737-7171 or email contact@3sistersservices.com for a free cleaning quote. Family-owned, bonded & insured. Serving New York and California.',
    url: 'https://3sistersservices.com/contact/',
    type: 'website',
    images: SOCIAL_OG_IMAGES,
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Contact Us', href: '/contact' },
        ]}
      />
      {children}
    </>
  );
}
