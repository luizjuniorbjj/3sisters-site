import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { WhyChooseSection } from '@/components/sections/WhyChooseSection';
import { WhatWeDoSection } from '@/components/sections/WhatWeDoSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { BookingCta } from '@/components/sections/BookingCta';
import { BlogSection } from '@/components/sections/BlogSection';
import { HomepageFAQ } from '@/components/sections/HomepageFAQ';
import { ServiceAreasSection } from '@/components/sections/ServiceAreasSection';
import { CTASection } from '@/components/sections/CTASection';
import { JsonLd } from '@/components/seo/JsonLd';
import { HOMEPAGE_GRAPH } from '@/lib/schema';

export default function HomePage() {
  return (
    <>
      <JsonLd data={HOMEPAGE_GRAPH} />
      <HeroSection />
      <ServicesSection />
      <WhyChooseSection />
      <WhatWeDoSection />
      <TestimonialsSection />
      <PricingSection />
      <BookingCta />
      <BlogSection />
      <ServiceAreasSection />
      <HomepageFAQ />
      <CTASection />
    </>
  );
}
