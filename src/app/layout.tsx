import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Outfit } from 'next/font/google';
import '@/styles/globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileStickyCta } from '@/components/layout/MobileStickyCta';
import { ChatWidget } from '@/components/ChatWidget';
import { JsonLd } from '@/components/seo/JsonLd';
import { TrackingEvents } from '@/components/seo/TrackingEvents';
import { GLOBAL_GRAPH, SITE_URL, SOCIAL_OG_IMAGES, SOCIAL_IMAGE_URL } from '@/lib/schema';

// GTM container — 3 Sisters (ADR-019). GA4 base: G-K5LSETGQJY.
const GTM_ID = 'GTM-PDB47Q3V';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '3 Sisters Cleaning and Home Organizing — Family-Owned in New York & California',
    template: '%s | 3 Sisters Cleaning and Home Organizing',
  },
  description:
    'Family-owned, bonded & insured cleaning company since 2019. Regular, deep, move-in/out, Airbnb, office and personal organizing services across New York and California. Get a free quote.',
  keywords: [
    'cleaning services',
    'house cleaning',
    'deep cleaning',
    'move-in cleaning',
    'move-out cleaning',
    'Airbnb cleaning',
    'office cleaning',
    'commercial cleaning',
    'personal organizing',
    'cleaning service Manhattan',
    'cleaning service Brooklyn',
    'cleaning service Queens',
    'cleaning service San Francisco',
    'bonded and insured cleaners',
    'family-owned cleaning company',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    siteName: '3 Sisters Cleaning and Home Organizing',
    locale: 'en_US',
    type: 'website',
    images: SOCIAL_OG_IMAGES,
  },
  twitter: {
    card: 'summary_large_image',
    images: [SOCIAL_IMAGE_URL],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <Script id="gtm-loader" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body className="font-inter text-slate-900 bg-white antialiased pb-24 lg:pb-0">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <TrackingEvents />
        <JsonLd data={GLOBAL_GRAPH} />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <MobileStickyCta />
        <ChatWidget />
      </body>
    </html>
  );
}
