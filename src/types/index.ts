// Navigation
// NOTE: sublinks is an alias for children (some components use item.sublinks).
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  sublinks?: NavItem[]; // alias for children
}

// Site Configuration
// NOTE: This interface supports BOTH flat (siteConfig.phone) and nested
// (siteConfig.site.phone) access patterns to keep all components in the
// template working without structural changes.
export interface SiteConfig {
  name: string;
  description: string;
  tagline: string;
  phone: string;
  phoneHref: string;
  email: string;
  address: string;
  social?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  // Nested aliases for components that use siteConfig.site.X / .nav / .services etc
  // Required (always populated by data/site.ts) — TypeScript safe to use without ? checks.
  site: {
    name: string;
    description: string;
    tagline: string;
    phone: string;
    phoneHref: string;
    email: string;
    address: string;
  };
  nav: NavItem[];
  services: Service[];
  pricing: PricingPlan[];
  testimonials: Testimonial[];
  whyChoose: Feature[];
  blog: BlogPost[];
  team: TeamMember[];
  faqs: FAQ[];
  stats: Stat[];
}

// Services
export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  estimatedTime: string;
  startingPrice?: number; // optional: 3 Sisters is quote-based, no public rates
  icon: string;
  image?: string; // path to service image
}

// Pricing Plans
// NOTE: ctaText and cta are aliases (some components use plan.cta).
export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice?: number; // optional: 3 Sisters is quote-based
  yearlyPrice?: number; // optional: 3 Sisters is quote-based
  features: string[];
  isPopular: boolean;
  ctaText: string;
  cta?: string; // alias for ctaText
}

// Testimonials
// NOTE: name + author are aliases (same data) for component compatibility.
// Same for serviceType + service.
export interface Testimonial {
  id: string;
  name: string;
  author?: string; // alias for name (some components use testimonial.author)
  role: string;
  quote: string;
  rating: number;
  avatar?: string;
  serviceType?: string;
  service?: string; // alias for serviceType
}

// Team Members
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  rating: number;
  image?: string;
  bio?: string;
}

// Blog Posts
// NOTE: href is an alias for `/blog/${slug}` (used by some components like BlogSection).
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: number;
  image?: string;
  href: string; // alias for `/blog/${slug}` — REQUIRED (used by BlogSection Link)
}

// FAQ
export interface FAQ {
  question: string;
  answer: string;
}

// Statistics
export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

// Features/Why Choose
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string;
}
