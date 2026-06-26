import {
  SiteConfig,
  NavItem,
  Service,
  PricingPlan,
  Testimonial,
  TeamMember,
  BlogPost,
  FAQ,
  Stat,
  Feature,
} from '@/types';

// =====================================================================
// IMPORTANT — TEMPORARY PLACEHOLDERS FOR PRICING & STATS
//
// 3 Sisters Services is QUOTE-BASED — they don't publish public rates.
// However, the template's HeroSection has a hardcoded price calculator
// and PricingSection renders 3 plans with monthly/yearly numbers.
//
// Per Luiz decision (2026-04-12, "A3"): keep the calculator with
// placeholder fictional prices for now — adjust later.
//
// Same logic applies to PricingPlans below (placeholder pricing) and
// stats (qualitative values where possible).
//
// All TEMPORARY values are tagged with `// TODO PRICE` / `// TODO STAT`
// so they can be found and replaced once real pricing/stats are confirmed.
// =====================================================================

// Site Configuration
// NOTE: this object exposes BOTH flat (siteConfig.phone) AND nested
// (siteConfig.site.phone) access patterns to support all template
// components without changing component code (Luiz: "manter estrutura").
const _siteFlat = {
  name: '3 Sisters Services',
  description: 'Family-owned professional cleaning company serving New York and California with care, trust, and flexibility.',
  tagline: "If you're busy but value a clean and organized home, don't worry – we take care of it for you.",
  phone: '+1 (657) 737-7171',
  phoneHref: '+16577377171',
  email: 'contact@3sistersservices.com',
  address: 'Serving New York · California',
  social: {
    instagram: 'https://www.instagram.com/3sisters_services',
    facebook: 'https://www.facebook.com/3sistersservices',
  },
};

// Navigation
export const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Commercial', href: '/services/office-commercial-cleaning' },
  {
    label: 'Pages',
    href: '#',
    children: [
      { label: 'Our Team', href: '/team' },
      { label: 'Booking', href: '/booking' },
      { label: 'Blog', href: '/blog' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'FAQ', href: '/faq' },
    ],
    sublinks: [
      { label: 'Our Team', href: '/team' },
      { label: 'Booking', href: '/booking' },
      { label: 'Blog', href: '/blog' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  { label: 'Contact Us', href: '/contact' },
];

// Services — 6 confirmados do site WP atual com checklists reais
export const services: Service[] = [
  {
    id: 'regular-cleaning',
    name: 'Regular Cleaning',
    slug: 'regular-cleaning',
    description: 'Maintaining a clean and healthy home or office is essential for your comfort and well-being. Recurring weekly, bi-weekly, or monthly cleaning with optional add-ons.',
    features: [
      'Dust and wipe all furniture and surfaces',
      'Clean countertops and tables',
      'Vacuum carpets and rugs',
      'Mop hard floors',
      'Empty trash bins',
      'Sanitize light switches and door handles',
      'Clean mirrors and glass',
      'Disinfect bathroom surfaces',
      'Clean toilets and sinks',
      'General tidying of rooms',
    ],
    estimatedTime: '1–1.5 hrs per bedroom',
    icon: 'Home',
    image: '/images/services/regular-cleaning.jpg',
  } as Service,
  {
    id: 'deep-cleaning',
    name: 'Deep Cleaning',
    slug: 'deep-cleaning',
    description: 'Sometimes your space needs more than just surface cleaning—it needs a reset. Ideal for post-renovation and seasonal refresh.',
    features: [
      'Clean behind/under furniture',
      'Scrub baseboards, doors, and frames',
      'Wipe down walls and remove smudges',
      'Detail clean kitchen (backsplash, grout, grease buildup)',
      'Sanitize bathrooms thoroughly',
      'Clean vents and air returns',
    ],
    estimatedTime: 'Full-day service',
    icon: 'Sparkles',
    image: '/images/services/deep-cleaning.webp',
  } as Service,
  {
    id: 'move-in-out-cleaning',
    name: 'Move-In / Move-Out Cleaning',
    slug: 'move-in-out-cleaning',
    description: 'Moving is already stressful—cleaning shouldn\'t be. Fast, detailed cleaning for rentals with linen changes and supply restocking.',
    features: [
      'Clean inside cabinets and drawers (kitchen & bathroom)',
      'Clean all appliances inside and out',
      'Vacuum and mop all floors',
      'Remove cobwebs and dust baseboards',
      'Wash windows and windowsills',
      'Deep clean toilets, showers, and tubs',
      'Disinfect light switches and doorknobs',
      'Trash removal and final sweep',
    ],
    estimatedTime: 'Same-day turnaround',
    icon: 'Truck',
    image: '/images/services/move-in-out.jpg',
  } as Service,
  {
    id: 'airbnb-cleaning',
    name: 'Airbnb & Vacation Rental Cleaning',
    slug: 'airbnb-cleaning',
    description: 'In the world of short-term rentals, cleanliness is everything. Whether you\'re managing a single unit or multiple properties, we keep your space guest-ready.',
    features: [
      'Change bed linens and make beds',
      'Dust all furniture and fixtures',
      'Clean mirrors and windows',
      'Sanitize kitchen and restock basic items',
      'Clean and sanitize bathroom',
      'Empty trash and replace liners',
      'Check for forgotten items from guests',
      'Ensure overall presentation and smell is guest-ready',
    ],
    estimatedTime: 'Same-day turnover',
    icon: 'Bed',
    image: '/images/services/airbnb-cleaning.jpg',
  } as Service,
  {
    id: 'office-commercial-cleaning',
    name: 'Office & Commercial Cleaning',
    slug: 'office-commercial-cleaning',
    description: 'A clean and organized office is more than just a good first impression—it boosts employee productivity and well-being.',
    features: [
      'Dust desks, monitors, keyboards, and phones',
      'Disinfect shared office equipment',
      'Vacuum carpets and clean floors',
      'Empty trash cans and recycling bins',
      'Sanitize restrooms (toilets, sinks, counters, mirrors)',
      'Refill soap, paper towels, and hygiene items',
      'Clean office kitchen/breakroom (countertops, microwave, sink)',
      'Disinfect door handles and light switches',
    ],
    estimatedTime: 'Custom schedule',
    icon: 'Building2',
    image: '/images/services/office-cleaning.jpeg',
  } as Service,
  {
    id: 'personal-organizing',
    name: 'Personal Organizing Services',
    slug: 'personal-organizing',
    description: 'Feeling overwhelmed by clutter or struggling to keep your home or office organized? We help you reset, declutter, and create a calm, functional space.',
    features: [
      'Decluttering of rooms and storage areas',
      'Closet, pantry, and cabinet organization',
      'Custom storage solutions',
      'Donation and disposal coordination',
      'Maintenance plans available',
    ],
    estimatedTime: 'Project-based',
    icon: 'Layers',
    image: '/images/services/personal-organizer.jpg',
  } as Service,
];

// Pricing Plans — placeholder pricing per Luiz decision (A3, 2026-04-12).
// Real 3 Sisters is quote-based. Adjust before launch.
export const pricingPlans: PricingPlan[] = [
  {
    id: 'one-time',
    name: 'One-Time Cleaning',
    description: 'A single deep clean, move-in/out, or special occasion service. Quote based on your space and add-ons.',
    features: [
      'Bonded & insured team',
      'Background-checked cleaners',
      'Add-ons available (oven, fridge, cabinets, windows)',
      'Card pre-authorization, charged after service',
      'No contracts, no commitments',
    ],
    isPopular: false,
    ctaText: 'Get a Free Quote',
    cta: 'Get a Free Quote',
  } as PricingPlan,
  {
    id: 'recurring',
    name: 'Recurring Cleaning',
    description: 'Weekly, bi-weekly, or monthly plans for homes and offices. Our most popular option for busy professionals and families.',
    features: [
      'Weekly, bi-weekly, or monthly schedules',
      'Same trusted cleaner whenever possible',
      'Priority scheduling',
      'Bonded & insured team',
      'Background-checked cleaners',
      'Easy to pause or reschedule',
    ],
    isPopular: true,
    ctaText: 'Get a Free Quote',
    cta: 'Get a Free Quote',
  } as PricingPlan,
  {
    id: 'commercial',
    name: 'Office & Commercial',
    description: 'Recurring office cleaning, Airbnb turnovers, and commercial spaces. Scheduled around your business hours.',
    features: [
      'Custom cleaning schedule',
      'After-hours service available',
      'Restroom, breakroom & common area care',
      'Bonded & insured team',
      'Background-checked cleaners',
      'Dedicated account contact',
    ],
    isPopular: false,
    ctaText: 'Get a Free Quote',
    cta: 'Get a Free Quote',
  } as PricingPlan,
];

// Testimonials — 3 reais do site WP atual.
// `author` and `service` are aliases of `name` and `serviceType`
// for component compatibility (zero data invention).
export const testimonials: Testimonial[] = [
  {
    id: 'amanda-j',
    name: 'Amanda J.',
    author: 'Amanda J.',
    role: 'Brooklyn, NY',
    quote: 'Finally found a company I can trust! 3Sisters keeps my home spotless every week. The ladies are super friendly and pay great attention to detail.',
    rating: 5,
    serviceType: 'Regular Cleaning',
    service: 'Regular Cleaning',
  },
  {
    id: 'carlos-m',
    name: 'Carlos M.',
    author: 'Carlos M.',
    role: 'Queens, NY',
    quote: 'I booked a move-out cleaning and was blown away by how thorough they were. Every corner sparkled. Highly recommend!',
    rating: 5,
    serviceType: 'Move-Out Cleaning',
    service: 'Move-Out Cleaning',
  },
  {
    id: 'melissa-k',
    name: 'Melissa K.',
    author: 'Melissa K.',
    role: 'Manhattan, NY',
    quote: 'Scheduled a cleaning for my Airbnb and my guests were impressed with how clean everything was. Great communication and professionalism!',
    rating: 5,
    serviceType: 'Airbnb Cleaning',
    service: 'Airbnb Cleaning',
  },
  {
    id: 'jessica-l',
    name: 'Jessica L.',
    author: 'Jessica L.',
    role: 'San Francisco, CA',
    quote: 'Booked a deep cleaning for my apartment and the team got into every nook and cranny — it looks brand new. So friendly and professional, I already scheduled my next visit!',
    rating: 5,
    serviceType: 'Deep Cleaning',
    service: 'Deep Cleaning',
  },
];

// Team Members — placeholders neutros (gap conhecido: nomes reais das 3 sisters
// não estão publicados no site WP. Brand story placeholder Mouse v1.0 mantém
// guardrail "no invented names". Atualizar quando cliente fornecer.)
export const teamMembers: TeamMember[] = [
  {
    id: 'family-owned',
    name: 'Family-Owned Team',
    role: 'Owners',
    rating: 5,
    bio: 'A family-run team dedicated to bringing care, trust, and flexibility to every home and office we clean.',
    image: '/images/team/team-1.jpg',
  },
  {
    id: 'cleaning-specialists',
    name: 'Cleaning Specialists',
    role: 'Bonded & Insured',
    rating: 5,
    bio: 'Every cleaner on our team is thoroughly screened, background-checked, and trained to deliver consistent, high-quality results.',
    image: '/images/team/team-2.jpg',
  },
  {
    id: 'customer-care',
    name: 'Customer Care',
    role: 'Mon–Sat 8am–6pm',
    rating: 5,
    bio: 'Reach us by phone, email, or website chat. We respond to every inquiry personally.',
    image: '/images/team/team-3.jpg',
  },
];

// Blog Posts — placeholders iniciais. Conteúdo real será escrito por @copywriter Mouse.
export const blogPosts: BlogPost[] = [
  {
    id: 'how-to-prepare-for-deep-cleaning',
    title: 'How to Prepare Your Home for a Deep Cleaning',
    slug: 'how-to-prepare-for-deep-cleaning',
    href: '/blog/how-to-prepare-for-deep-cleaning',
    excerpt: 'A simple checklist to help you get the most out of your deep cleaning service — what to do the day before, what to leave to us, and what to expect.',
    date: 'May 23, 2026',
    category: 'Cleaning Tips',
    readTime: 5,
    image: '/images/blog/post-1.jpg',
  },
  {
    id: 'hiring-cleaning-service-nyc',
    title: 'Hiring a Cleaning Service in NYC: What to Look For',
    slug: 'hiring-cleaning-service-nyc',
    href: '/blog/hiring-cleaning-service-nyc',
    excerpt: 'Bonded? Insured? Background-checked? Here\'s your checklist when choosing a cleaning company in New York or California.',
    date: 'May 23, 2026',
    category: 'Hiring Guide',
    readTime: 6,
    image: '/images/blog/post-2.jpg',
  },
  {
    id: 'airbnb-cleaning-checklist',
    title: 'The Airbnb Cleaning Checklist for 5-Star Reviews',
    slug: 'airbnb-cleaning-checklist',
    href: '/blog/airbnb-cleaning-checklist',
    excerpt: 'Linens, restock, scent, presentation — what every short-term rental host should expect from a turnover service.',
    date: 'May 23, 2026',
    category: 'Hosts',
    readTime: 4,
    image: '/images/blog/post-3.jpg',
  },
];

// Why Choose Features
export const whyChooseFeatures: Feature[] = [
  {
    id: 'bonded-insured',
    title: 'Bonded & Insured',
    description: 'Full insurance and surety bond on every job — your home and belongings are protected.',
    icon: 'ShieldCheck',
  },
  {
    id: 'background-checked',
    title: 'Background-Checked Team',
    description: 'Every cleaner on our team is thoroughly screened, background-checked, and trained.',
    icon: 'CheckCircle2',
  },
  {
    id: 'family-owned',
    title: 'Family-Owned Care',
    description: 'A family-run team that treats every home and office like our own — care, trust, and flexibility.',
    icon: 'Heart',
  },
  {
    id: 'three-states',
    title: 'Trusted in 2 States',
    description: 'Serving New York and California with the same standard of quality.',
    icon: 'MapPin',
  },
];

// Statistics — qualitative (no invented numbers).
export const stats: Stat[] = [
  { value: '100%', label: 'Bonded & Insured' },
  { value: '100%', label: 'Background Checked' },
  { value: 'Family', label: 'Owned & Operated' },
  { value: '2', label: 'States Served' },
  { value: '6', label: 'Cleaning Services' },
  { value: 'Mon–Sat', label: '8am – 6pm' },
];

// FAQs — 9 reais extraídos do FAQ do site WP atual
export const faqs: FAQ[] = [
  {
    question: 'What types of cleaning services do you offer?',
    answer: 'We offer Regular Cleaning, Deep Cleaning, Move-In/Move-Out Cleaning, Airbnb & Vacation Rental Cleaning, Office & Commercial Cleaning, and Personal Organizing Services. Each service can be customized to your needs.',
  },
  {
    question: 'How often can I schedule a cleaning?',
    answer: 'Our flexible maid service allows you to schedule cleanings weekly, every other week (bi-weekly), or monthly. One-time deep cleans and special bookings are also available.',
  },
  {
    question: 'Do you offer any extras?',
    answer: 'Yes! Extra services include additional bathrooms, cleaning inside ovens, cleaning inside cabinets, cleaning inside fridges, dishes, and pet hair removal. Just ask when you book.',
  },
  {
    question: 'Do I need to provide cleaning supplies?',
    answer: 'Yes — we ask that clients provide their own cleaning supplies so we can use the products you trust in your home or space.',
  },
  {
    question: 'What is your pet policy?',
    answer: 'We love pets! For the best results, we ask that pets be restricted from the areas we are cleaning whenever possible, so our team can work efficiently and safely.',
  },
  {
    question: 'How do you handle payment?',
    answer: 'Your credit or debit card receives a hold to secure the booking. Payment is only processed after the service has been completed. We do not accept cash for bookings.',
  },
  {
    question: 'Are you bonded and insured?',
    answer: 'Yes — we are fully bonded and insured. Additionally, all of our employees are thoroughly screened, trained, and background-checked.',
  },
  {
    question: 'Should I tip my cleaner?',
    answer: 'Tips are always optional 😊 If you\'d like to tip, feel free to leave it in cash for your cleaner.',
  },
  {
    question: 'How long will my cleaning take and how many cleaners will come?',
    answer: 'We usually estimate 1–1.5 hours per bedroom, but we don\'t lock in a fixed length. We assign one cleaner to most bookings; if we feel a job needs more, we\'ll let you know in advance.',
  },
];

// Footer Links
export const footerLinks = {
  mainPages: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
    { label: 'Blog', href: '/blog' },
  ],
  information: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Booking', href: '/booking' },
    { label: 'Our Team', href: '/team' },
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Terms of Service', href: '/legal/terms' },
  ],
};

// Site Configuration — exposes BOTH flat and nested aliases
// (template components use a mix; this satisfies all of them).
export const siteConfig: SiteConfig = {
  ..._siteFlat,
  // Nested aliases for components using siteConfig.site.X / .nav / .testimonials etc.
  site: {
    name: _siteFlat.name,
    description: _siteFlat.description,
    tagline: _siteFlat.tagline,
    phone: _siteFlat.phone,
    phoneHref: _siteFlat.phoneHref,
    email: _siteFlat.email,
    address: _siteFlat.address,
  },
  nav: navigation,
  services: services,
  pricing: pricingPlans,
  testimonials: testimonials,
  whyChoose: whyChooseFeatures,
  blog: blogPosts,
  team: teamMembers,
  faqs: faqs,
  stats: stats,
};
