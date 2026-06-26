/**
 * src/data/service-pages.ts
 * Dedicated service pages data — Wave 4.0 (2026-05-30)
 *
 * Pilot: office-commercial-cleaning. Replicate remaining 5 services in Wave 4.1.
 * SSoT: projects/3sisters/seo/service-page-pattern-spec.md
 * Copy: projects/3sisters/research/wave4.0-mouse-commercial.md
 * Design: projects/3sisters/design/wave4.0-commercial-page-design.md
 */

export interface ServicePageFAQ {
  q: string;
  a: string;
}

export interface ServiceSpaceType {
  name: string;
  description: string;
}

export interface ServiceBenefit {
  title: string;
  desc: string;
}

export interface ServicePage {
  slug: string; // 'office-commercial-cleaning' (= service.slug em site.ts)
  serviceId: string; // FK p/ services[] em site.ts
  name: string;
  shortName: string;
  serviceTypeSchema: string;
  alternateNames: string[];
  metaTitle: string;
  metaDescription: string;
  heroH1: string;
  heroKeyword: string; // palavra do H1 que recebe accent
  heroStyle: 'dark' | 'light'; // dark = comercial B2B; light = residencial (warm)
  heroSubtitle: string;
  ctaHref: string; // destino do CTA "Get a Free Quote" — commercial=/contact (quote consultivo), residencial=/booking
  localAuthority: string; // linha de autoridade regional (faixa abaixo do hero)
  trustSignals: string[];
  introFactual: string;
  whatsIncluded: string[];
  industriesIntro: string;
  industries: string[]; // segmentos de negócio (SEO + ICP)
  industriesNote: string;
  benefits: ServiceBenefit[]; // resultado comercial (Why it matters)
  frequencyIntro: string;
  frequencies: string[]; // Daily / Weekly / Bi-weekly / Custom schedule
  operationsIntro: string;
  operations: ServiceBenefit[]; // reassurances operacionais B2B (reusa shape {title, desc})
  spaceTypes: ServiceSpaceType[];
  serviceContext: string[]; // parágrafos (alvo do word count gate, ≥300 únicas)
  faqs: ServicePageFAQ[];
}

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: 'office-commercial-cleaning',
    serviceId: 'office-commercial-cleaning',
    name: 'Office & Commercial Cleaning',
    shortName: 'Office & Commercial',
    serviceTypeSchema: 'Commercial cleaning',
    alternateNames: ['Office Cleaning', 'Commercial Cleaning', 'Janitorial Service'],
    metaTitle: 'Office & Commercial Cleaning in New York & California',
    metaDescription:
      'Family-owned office and commercial cleaning, scheduled around your business hours. Bonded, insured, and trilingual (EN/ES/PT). Serving FL, NY & CA since 2019.',
    heroH1: 'Office & Commercial Cleaning',
    heroKeyword: 'Commercial',
    heroStyle: 'dark',
    heroSubtitle:
      'A family-run team keeping offices and commercial spaces clean across New York and California — on a schedule that works around your business, not the other way around.',
    ctaHref: '/contact?service=office-commercial',
    localAuthority:
      'Serving businesses throughout New York City and the San Francisco Bay Area.',
    trustSignals: [
      'Family-Owned Since 2019',
      'Bonded & Insured',
      'Trilingual Team (EN / ES / PT)',
      'FL · NY · CA',
    ],
    introFactual:
      'A clean office says something before anyone says a word. It tells your team you care, and it tells visitors you pay attention to details. 3 Sisters keeps your workspace consistently clean and ready — handled by a small family team you get to know by name.',
    whatsIncluded: [
      'Dust desks, monitors, keyboards, and phones',
      'Disinfect shared office equipment and high-touch surfaces',
      'Vacuum carpets and clean hard floors',
      'Empty trash cans and recycling bins',
      'Sanitize restrooms — toilets, sinks, counters, and mirrors',
      'Refill soap, paper towels, and hygiene supplies',
      'Clean the breakroom and kitchen — countertops, microwave, sink',
      'Wipe down door handles and light switches',
    ],
    industriesIntro:
      'We clean offices and workspaces across many kinds of businesses — from medical and dental practices to law firms, retail floors, and small local shops. Whatever your industry, we tailor the routine to how your space is used.',
    industries: [
      'Medical Offices',
      'Dental Offices',
      'Law Firms',
      'Accounting Offices',
      'Real Estate Offices',
      'Retail Stores',
      'Property Management Offices',
      'Small Businesses',
    ],
    industriesNote:
      "Every space is different. A dental office has priorities a law firm doesn't — we walk your space first and build the cleaning around it.",
    benefits: [
      {
        title: 'A healthier workplace',
        desc: 'Fewer germs on shared desks, door handles, and breakrooms means fewer sick days for your team.',
      },
      {
        title: 'A strong first impression',
        desc: 'Clients and visitors judge your business the moment they walk in — a clean space says you care.',
      },
      {
        title: 'Reduced dust and allergens',
        desc: 'Regular detail cleaning clears the dust and allergens that build up in carpets, vents, and surfaces.',
      },
      {
        title: 'A clearer, more focused space',
        desc: 'A tidy, organized workspace is simply an easier place to get good work done.',
      },
      {
        title: "Consistency you don't manage",
        desc: 'The same trusted team, the same standard, every visit — you never have to chase or re-explain.',
      },
    ],
    frequencyIntro:
      'Flexible cleaning schedules — daily, weekly, bi-weekly, or a custom plan built around your business hours.',
    frequencies: ['Daily', 'Weekly', 'Bi-weekly', 'Custom schedule'],
    operationsIntro:
      'Running a business means the cleaning has to fit around you — your hours, your access, your privacy. Here is how we handle it.',
    operations: [
      {
        title: 'We work around your hours',
        desc: 'Early mornings, after close, or weekends — we clean when it will not interrupt your patients, clients, or staff. You decide the window; we keep it.',
      },
      {
        title: 'Secure access, your way',
        desc: "We follow your building's access protocol — a key, an alarm code, or a front-desk check-in. However you let us in, the same team uses it every visit.",
      },
      {
        title: 'The same team every time',
        desc: 'A dedicated crew that learns your space, your priorities, and your rules — no rotating strangers walking through your office each week.',
      },
      {
        title: 'Discreet and background-checked',
        desc: 'Every cleaner is background-checked. We keep confidential areas, documents, and private offices exactly as you left them.',
      },
    ],
    spaceTypes: [
      {
        name: 'Private & professional offices',
        description:
          'Desks, meeting rooms, reception, and the shared equipment your team relies on.',
      },
      {
        name: 'Coworking & shared workspaces',
        description:
          'High-traffic common areas, kitchens, and restrooms kept ready through the day.',
      },
      {
        name: 'Small commercial spaces',
        description:
          'Storefront-back areas, studios, and offices that need a dependable, recurring clean.',
      },
    ],
    serviceContext: [
      "Running a business means the cleaning is the last thing you want to think about — and the first thing people notice when it slips. That's the gap a family-owned team fills well. At 3 Sisters, the same small crew comes back to your space, learns how your office works, and keeps it the way you like it without you having to explain it twice.",
      "We build the cleaning around your hours, not ours. If your team works nine to five, we can come in early, stay late, or handle the weekend, so the vacuum is never running while you're trying to close a deal. If you'd rather we work alongside the day, that's fine too. Most offices settle into a weekly or bi-weekly rhythm, and we keep that rhythm steady so the space never has a chance to look tired.",
      'Every visit covers the parts of an office that quietly wear down trust: the restrooms guests judge you by, the breakroom your team actually lives in, the desks and shared equipment that collect a week of fingerprints, and the floors that carry the whole place. We restock the supplies that always seem to run out at the worst moment, and we disinfect the handles and switches everyone touches without thinking.',
      "Because we're bonded and insured, you're covered the moment we walk in — and because we're a small family team, you get one point of contact who actually answers, in English, Spanish, or Portuguese. There's no call center and no long-term contract holding you hostage. You get a real, real-time quote up front, your card is only charged after the work is done, and if your needs change, you can adjust your schedule through your client portal or a quick call. We've been doing this since 2019, one clean office at a time, across New York and California.",
    ],
    faqs: [
      {
        q: 'How does pricing work for office cleaning?',
        a: "We give you a real-time quote based on the size of your space, how often you'd like us, and any extras you need — no waiting days for a number. There's no deposit and no pre-authorization hold on your card. You're only charged after the cleaning is actually done.",
      },
      {
        q: 'Can you clean after business hours or on weekends?',
        a: 'Yes. We schedule around your business, not the other way around. We can come in early, stay after close, or handle weekends so the cleaning never interrupts your team or your clients. Many offices choose after-hours visits for exactly that reason.',
      },
      {
        q: 'How do you clean a dental or medical office?',
        a: 'We clean the parts of your practice that patients and staff see and share — reception, waiting areas, restrooms, common areas, floors, and surfaces — scheduled around your patient hours so we are never in the way. Clinical sterilization of treatment rooms stays with your clinical team; we keep everything around it consistently clean and presentable.',
      },
      {
        q: 'Can you clean our law firm or office after hours?',
        a: 'Yes. We regularly clean offices and law firms before opening, after closing, or on weekends, so the work never interrupts your team or your clients. You get a dedicated, background-checked crew that respects confidentiality — documents, files, and private offices stay exactly as you left them.',
      },
      {
        q: 'How do you handle building access and security?',
        a: 'However your building works. We follow your access protocol — a key, an alarm code, or a front-desk check-in — and the same trusted team uses it on every visit. Every cleaner is background-checked, so after-hours access stays secure and predictable.',
      },
      {
        q: 'Are you bonded and insured?',
        a: "Yes — every visit is bonded and insured, so your business is covered from the moment we arrive. Our cleaners are background-checked, and because we're a small family team, you tend to see the same faces each time rather than a rotating crew.",
      },
      {
        q: 'Do I have to sign a long-term contract?',
        a: "No. We don't lock you into anything. Most offices choose a weekly or bi-weekly schedule because it keeps the space consistently clean, but you can pause, reschedule, or adjust through your client portal or a quick call whenever your needs change.",
      },
      {
        q: 'What kinds of commercial spaces do you clean?',
        a: 'We clean offices and commercial spaces of all kinds — medical and dental practices, law firms, accounting offices, real estate agencies, retail stores, property management offices, and small businesses. Every job is built around your hours and your priorities: the restrooms, breakroom, desks, shared equipment, and floors that keep your space looking professional.',
      },
      {
        q: 'How often can you clean our office?',
        a: 'As often as your business needs. We offer daily, weekly, and bi-weekly schedules, plus fully custom plans built around your hours and foot traffic. Many offices start weekly or bi-weekly and adjust from there — and you can change your frequency anytime through your client portal or a quick call.',
      },
      {
        q: 'Which areas do you serve?',
        a: 'We serve commercial clients across New York (Manhattan, Brooklyn, Queens) and California (San Francisco). Not sure if you are in range? Reach out and we will let you know right away.',
      },
    ],
  },

  // ── Residential service pages (Wave 4.1) — light hero, ctaHref /booking ──
  {
    slug: 'regular-cleaning',
    serviceId: 'regular-cleaning',
    name: 'Regular Cleaning',
    shortName: 'Regular',
    serviceTypeSchema: 'Recurring residential cleaning',
    alternateNames: ['Recurring Cleaning', 'Weekly Cleaning', 'Maid Service'],
    metaTitle: 'Regular Cleaning — Weekly, Bi-Weekly & Monthly | 3 Sisters',
    metaDescription:
      'Recurring home cleaning on your schedule — weekly, bi-weekly, or monthly. Family-owned, bonded & insured, the same trusted cleaner. Serving FL, NY & CA since 2019.',
    heroH1: 'Regular Cleaning',
    heroKeyword: 'Regular',
    heroStyle: 'light',
    heroSubtitle:
      'A consistently clean home, on the schedule that fits your life — with the same trusted family team every visit.',
    ctaHref: '/booking',
    localAuthority: 'Serving homes across New York and California.',
    trustSignals: ['Family-Owned Since 2019', 'Bonded & Insured', 'Trilingual (EN / ES / PT)', 'FL · NY · CA'],
    introFactual:
      "A regular clean is the one that quietly runs your home in the background — so you never think about the dust on the baseboards or the film on the bathroom mirror, because someone you trust handles it before it becomes a problem.",
    whatsIncluded: [
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
    industriesIntro: '',
    industries: [],
    industriesNote: '',
    benefits: [],
    frequencyIntro: 'Pick the rhythm that fits your home — weekly, bi-weekly, or monthly. You can change it anytime.',
    frequencies: ['Weekly', 'Bi-weekly', 'Monthly', 'Custom'],
    operationsIntro: '',
    operations: [],
    spaceTypes: [],
    serviceContext: [
      "A regular clean is the one that quietly runs your home in the background. You don't think about the dust on the baseboards or the film on the bathroom mirror — because someone you trust handles it before it ever becomes a problem. That's what a recurring plan with 3 Sisters is for: a home that simply stays ready, week after week, without you managing it.",
      'We build the routine around how you actually live. Most families settle into weekly or bi-weekly visits — kitchens and bathrooms get the most attention because that is where a home shows wear first, while bedrooms and living areas get a steady dust, vacuum, and tidy. You tell us the spots that matter most to you, and the same cleaner learns them so you never have to repeat yourself.',
      'Because it is the same small family team coming back, the quality compounds. They know which rooms the kids use, which surfaces need the gentle product, where the vacuum cord reaches and where it does not. New strangers every week never build that. We keep your visit consistent — same standard, same faces, whenever possible.',
      'Booking is simple and honest: you get a real-time quote up front, your card is saved securely with no pre-authorization hold, and you are only charged after the cleaning is done. Pause, skip, or reschedule through your client portal or a quick call. We have kept homes across New York and California consistently clean since 2019 — bonded, insured, and trilingual on every visit.',
    ],
    faqs: [
      { q: 'How often should I schedule a regular cleaning?', a: 'Most homes do best on a weekly or bi-weekly rhythm — it keeps things consistently clean without a big single-visit cost. Monthly works for lower-traffic homes. You can change your frequency anytime through your client portal or a quick call.' },
      { q: 'Will I get the same cleaner each time?', a: "Whenever possible, yes. We're a small family team and we keep your visit with the same cleaner so they learn your home and your preferences. If they're ever out, a teammate who knows your notes covers the visit." },
      { q: 'Do I need to be home during the cleaning?', a: 'No. Most clients give us a key, a code, or a doorman name and come back to a fresh home. If you prefer to be there, that is fine too — we work around your routine.' },
      { q: "What's included in a regular cleaning?", a: 'Dusting and wiping surfaces, kitchen counters and tables, vacuuming and mopping floors, bathroom sanitization, mirrors and glass, trash, and general tidying. Add-ons like inside the oven, fridge, or cabinets are available — just ask when you book.' },
    ],
  },
  {
    slug: 'deep-cleaning',
    serviceId: 'deep-cleaning',
    name: 'Deep Cleaning',
    shortName: 'Deep',
    serviceTypeSchema: 'Deep residential cleaning',
    alternateNames: ['Spring Cleaning', 'Detailed Cleaning', 'Post-Renovation Cleaning'],
    metaTitle: 'Deep Cleaning — Top-to-Bottom Home Reset | 3 Sisters',
    metaDescription:
      'A full top-to-bottom reset — behind furniture, baseboards, kitchen grease, vents, and more. Family-owned, bonded & insured. Serving FL, NY & CA since 2019.',
    heroH1: 'Deep Cleaning',
    heroKeyword: 'Deep',
    heroStyle: 'light',
    heroSubtitle:
      'The top-to-bottom reset your home needs once or twice a year — the work that surface cleaning never reaches.',
    ctaHref: '/booking',
    localAuthority: 'Serving homes across New York and California.',
    trustSignals: ['Family-Owned Since 2019', 'Bonded & Insured', 'Trilingual (EN / ES / PT)', 'FL · NY · CA'],
    introFactual:
      'A deep clean is not a bigger regular clean — it is a different job. It reaches the work that gets skipped week to week: the grease on top of the cabinets, the grout, the vents, the baseboards that frame every room.',
    whatsIncluded: [
      'Clean behind/under furniture',
      'Scrub baseboards, doors, and frames',
      'Wipe down walls and remove smudges',
      'Detail clean kitchen (backsplash, grout, grease buildup)',
      'Sanitize bathrooms thoroughly',
      'Clean vents and air returns',
    ],
    industriesIntro: '',
    industries: [],
    industriesNote: '',
    benefits: [],
    frequencyIntro: '',
    frequencies: [],
    operationsIntro: '',
    operations: [],
    spaceTypes: [],
    serviceContext: [
      'A deep clean is not a bigger regular clean — it is a different job. It is the work that gets skipped week to week because it takes time: the grease film on top of the kitchen cabinets, the grout between the backsplash tiles, the dust on the air return vents, the baseboards that frame every room. A deep clean reaches all of it in one focused visit.',
      'Most people book a deep clean at a turning point — moving into a long-untouched space, recovering from a renovation, opening a seasonal home after months closed up, or simply resetting before the holidays. Coastal humidity makes this even more important: bathrooms and kitchens build up faster near the water, so a reset clears what the climate keeps adding.',
      'Our team works room by room, behind and under the furniture, scrubbing baseboards, doors and frames, wiping walls and removing smudges, detailing the kitchen down to the grout and grease, sanitizing bathrooms thoroughly, and clearing the vents and air returns most cleaners ignore. It is usually a full-day service — we give you an honest time window when we send your quote, not a guess after we arrive.',
      'You do not need to pre-clean anything — doing our job before we arrive just means you pay for less than you booked. Declutter the surfaces, point us at the rooms that matter most, and leave the rest to us. Real-time quote up front, card saved securely with no pre-authorization hold, charged only after the work is done. Many clients pair a deep clean with a recurring Regular plan to keep the reset going. Family-owned, bonded, insured, and trilingual across New York and California since 2019.',
    ],
    faqs: [
      { q: 'How is a deep cleaning different from a regular cleaning?', a: 'A regular cleaning maintains an already-clean home. A deep cleaning does the heavy work that builds up over months — behind furniture, baseboards, kitchen grease and grout, vents, and full bathroom sanitization. Most homes need one once or twice a year.' },
      { q: 'How long does a deep cleaning take?', a: 'For most homes it is a full-day service — usually four to eight hours depending on square footage, number of bathrooms, and add-ons like inside the oven or fridge. We send an honest time window with your quote.' },
      { q: 'When should I book a deep cleaning?', a: 'Common moments are post-renovation, moving in or out, opening a seasonal home, after a long winter, or before hosting. If it has been more than a few months since a thorough clean, a deep clean is the right reset.' },
      { q: 'Do I need to prepare anything before a deep cleaning?', a: 'Just declutter — put away mail, laundry, and items we cannot clean around. You do not need to pre-clean bathrooms or vacuum. If there is a room to skip, tell us in advance and we route around it.' },
    ],
  },
  {
    slug: 'move-in-out-cleaning',
    serviceId: 'move-in-out-cleaning',
    name: 'Move-In / Move-Out Cleaning',
    shortName: 'Move-In / Move-Out',
    serviceTypeSchema: 'Move-in/move-out cleaning',
    alternateNames: ['Move-Out Cleaning', 'Move-In Cleaning', 'Turnover Cleaning'],
    metaTitle: 'Move-In / Move-Out Cleaning — Deposit-Ready | 3 Sisters',
    metaDescription:
      'Detailed move-in/move-out cleaning — inside cabinets, appliances, windows, and a final sweep. Family-owned, bonded & insured. Serving FL, NY & CA since 2019.',
    heroH1: 'Move-In / Move-Out Cleaning',
    heroKeyword: 'Move-Out',
    heroStyle: 'light',
    heroSubtitle:
      'An empty home cleaned to the corners — so you get the deposit back, or hand over a place that shows like new.',
    ctaHref: '/booking',
    localAuthority: 'Serving homes across New York and California.',
    trustSignals: ['Family-Owned Since 2019', 'Bonded & Insured', 'Trilingual (EN / ES / PT)', 'FL · NY · CA'],
    introFactual:
      'Moving is stressful enough without scrubbing the place you are leaving — or the one you are about to live in. A move-in/move-out clean is built for an empty home, where every cabinet, drawer, and appliance is finally reachable.',
    whatsIncluded: [
      'Clean inside cabinets and drawers (kitchen & bathroom)',
      'Clean all appliances inside and out',
      'Vacuum and mop all floors',
      'Remove cobwebs and dust baseboards',
      'Wash windows and windowsills',
      'Deep clean toilets, showers, and tubs',
      'Disinfect light switches and doorknobs',
      'Trash removal and final sweep',
    ],
    industriesIntro: '',
    industries: [],
    industriesNote: '',
    benefits: [],
    frequencyIntro: '',
    frequencies: [],
    operationsIntro: '',
    operations: [],
    spaceTypes: [],
    serviceContext: [
      'Moving is stressful enough without scrubbing the place you are leaving — or the one you are about to live in. A move-in/move-out clean is built for an empty home, where every cabinet, drawer, and appliance is finally reachable. It is the clean that protects your deposit on the way out, or hands you a genuinely fresh start on the way in.',
      'An empty space hides its dirt in the places furniture used to cover: the back corners of kitchen cabinets, the gap behind the fridge, the windowsills, the baseboards along every wall. We clean inside cabinets and drawers in the kitchen and bathrooms, scrub all appliances inside and out, wash windows and sills, remove cobwebs, and deep clean every toilet, shower, and tub before a final sweep and trash removal.',
      'Landlords and property managers judge a move-out by the details — the oven, the inside of the fridge, the grout, the corners. We clean to that standard so the walkthrough goes your way. For a move-in, the same thoroughness means you are settling into a home that has actually been reset, not just glanced over by the last tenant.',
      'We aim for same-day turnaround so your move keeps moving. You get a real-time quote based on the size and condition of the space, your card is saved securely with no pre-authorization hold, and you are charged only after the work is complete. Tell us about access — keys, lockbox, building rules — and we handle the rest. Family-owned, bonded, insured, and trilingual across New York and California since 2019.',
    ],
    faqs: [
      { q: 'Will a move-out cleaning help me get my deposit back?', a: "That is exactly what it is built for. We clean to the standard landlords and property managers check at walkthrough — inside cabinets and appliances, windows, baseboards, grout, and a final sweep. We can't guarantee a landlord's decision, but we clean so the cleaning isn't what costs you." },
      { q: "What's included that a regular cleaning doesn't cover?", a: 'Inside cabinets and drawers, inside all appliances, windows and sills, cobweb removal, deep-cleaned toilets/showers/tubs, and a final trash removal and sweep — the detail work an empty home needs and an occupied home does not.' },
      { q: 'Can you clean the same day I move out?', a: 'Usually yes — same-day turnaround is our most common move-out request. Book ahead when you can so we lock the window between your move and the walkthrough or the new tenant.' },
      { q: 'Do you clean before move-in too?', a: "Yes. A move-in clean resets the home before your things arrive — inside cabinets, appliances, bathrooms, and floors — so you start fresh instead of inheriting the last tenant's dust." },
    ],
  },
  {
    slug: 'airbnb-cleaning',
    serviceId: 'airbnb-cleaning',
    name: 'Airbnb & Vacation Rental Cleaning',
    shortName: 'Airbnb',
    serviceTypeSchema: 'Short-term rental turnover cleaning',
    alternateNames: ['Vacation Rental Cleaning', 'Short-Term Rental Cleaning', 'Turnover Cleaning'],
    metaTitle: 'Airbnb & Vacation Rental Cleaning — 5-Star Turnovers | 3 Sisters',
    metaDescription:
      'Reliable Airbnb turnovers between guests — linen change, restock, and a guest-ready presentation check. Family-owned, bonded & insured. Serving FL, NY & CA since 2019.',
    heroH1: 'Airbnb & Vacation Rental Cleaning',
    heroKeyword: 'Vacation Rental',
    heroStyle: 'light',
    heroSubtitle:
      'Guest-ready turnovers between every booking — so your reviews stay five stars and your calendar keeps moving.',
    ctaHref: '/booking',
    localAuthority: 'Serving homes across New York and California.',
    trustSignals: ['Family-Owned Since 2019', 'Bonded & Insured', 'Trilingual (EN / ES / PT)', 'FL · NY · CA'],
    introFactual:
      'In short-term rentals, the cleaning is the product. A guest forgives a lot, but never a hair on the pillow or food left in the fridge — those end up in the review, and the review ends up costing you the next booking.',
    whatsIncluded: [
      'Change bed linens and make beds',
      'Dust all furniture and fixtures',
      'Clean mirrors and windows',
      'Sanitize kitchen and restock basic items',
      'Clean and sanitize bathroom',
      'Empty trash and replace liners',
      'Check for forgotten items from guests',
      'Ensure overall presentation and smell is guest-ready',
    ],
    industriesIntro: '',
    industries: [],
    industriesNote: '',
    benefits: [],
    frequencyIntro: 'Book per-turnover or set a recurring schedule that matches your booking calendar.',
    frequencies: ['Per turnover', 'Weekly', 'Custom schedule'],
    operationsIntro: '',
    operations: [],
    spaceTypes: [],
    serviceContext: [
      'In short-term rentals, the cleaning is the product. A guest forgives a lot, but never a hair on the pillow or food left in the fridge — those end up in the review, and the review ends up costing you the next booking. An Airbnb turnover is a different discipline from home cleaning: it is fast, it is checklist-driven, and it has to be guest-ready, not just clean.',
      'Every turnover we run covers the things guests grade you on without ever mentioning them: fresh linens and a hospitality-made bed, a spotless bathroom with no hair anywhere and restocked essentials, a kitchen with an empty fridge and clean counters, and trash out with new liners. We finish with a lost-and-found sweep and a final scent-and-presentation check — the difference between clean and five stars.',
      'Timing is everything in this work. Most turnovers happen in the few-hour window between an 11am checkout and a 3pm check-in, so we plan routes to keep a team in your area across multiple properties in one shift. If you manage more than one unit, ask about bundling — it makes the timing safer and the schedule predictable.',
      'We change linens but do not supply them — most hosts keep two or three sets per bed so the dirty set goes out and the clean set goes on during the same visit, and we can pick up and return your laundry if you set that up. Real-time quote, card saved securely with no pre-authorization hold, charged after the turnover is done. Family-owned, bonded, insured, and trilingual across New York and California since 2019.',
    ],
    faqs: [
      { q: 'How long does an Airbnb turnover take?', a: 'A studio or 1-bedroom takes 60 to 90 minutes; a 2-bedroom 90 to 120 minutes. Larger units or ones with hot tubs take longer and we quote those individually. Linen change and basic restock are always included.' },
      { q: 'Can you handle same-day turnovers between checkout and check-in?', a: 'Yes — same-day turnovers in the standard 11am-to-3pm window are our most common short-term-rental job. Bundling units in the same area makes the timing safer. Set up a recurring turnover schedule and we hold your slots.' },
      { q: 'Do you provide the linens and supplies?', a: 'We change linens but do not supply them — most hosts keep spare sets on site so the swap happens in one visit. We can pick up and return your laundry if you arrange it at booking, and we restock basics you leave for us.' },
      { q: 'Can you clean multiple properties on a schedule?', a: 'Yes. Many hosts run a recurring turnover schedule with us across several units. We route a team through your area in one shift to keep timing tight between bookings — ask about bundling when you book.' },
    ],
  },
  {
    slug: 'personal-organizing',
    serviceId: 'personal-organizing',
    name: 'Personal Organizing Services',
    shortName: 'Organizing',
    serviceTypeSchema: 'Home organizing service',
    alternateNames: ['Home Organizing', 'Decluttering Service', 'Closet Organization'],
    metaTitle: 'Personal Organizing — Declutter & Reset Your Space | 3 Sisters',
    metaDescription:
      'Decluttering, closet and pantry organization, and custom storage that actually lasts. Family-owned, bonded & insured. Serving FL, NY & CA since 2019.',
    heroH1: 'Personal Organizing Services',
    heroKeyword: 'Organizing',
    heroStyle: 'light',
    heroSubtitle:
      'Declutter, reset, and create a calm, functional space — with a system you can actually keep up.',
    ctaHref: '/booking',
    localAuthority: 'Serving homes across New York and California.',
    trustSignals: ['Family-Owned Since 2019', 'Bonded & Insured', 'Trilingual (EN / ES / PT)', 'FL · NY · CA'],
    introFactual:
      'Clutter is not a cleaning problem — it is a systems problem. You can vacuum a room every week and still feel like it is never under control, because the closet, the pantry, and the cabinets have no logic to fall back on.',
    whatsIncluded: [
      'Decluttering of rooms and storage areas',
      'Closet, pantry, and cabinet organization',
      'Custom storage solutions',
      'Donation and disposal coordination',
      'Maintenance plans available',
    ],
    industriesIntro: '',
    industries: [],
    industriesNote: '',
    benefits: [],
    frequencyIntro: '',
    frequencies: [],
    operationsIntro: '',
    operations: [],
    spaceTypes: [],
    serviceContext: [
      'Clutter is not a cleaning problem — it is a systems problem. You can vacuum a room every week and still feel like it is never under control, because the closet, the pantry, and the cabinets have no logic to fall back on. Personal organizing fixes the system, not just the surface, so the calm actually lasts after we leave.',
      'We start where the friction is: the rooms and storage areas that overflow, the closet you avoid, the pantry where things expire in the back, the cabinets that never close right. We declutter with you, sort what stays from what goes, and coordinate donation and disposal so the excess actually leaves the house instead of migrating to another room.',
      'Then we build storage that fits how you live — not a magazine photo you cannot maintain. Custom solutions for your closets, pantry, and cabinets, labeled and logical, so everything has a home and putting things away takes seconds instead of decisions. The goal is a space you can keep organized on autopilot, not one that looks good for a week and collapses.',
      'Because organizing is personal, we work alongside you and respect what matters — nothing leaves without your say. Projects are scoped to the space and the goal, so you get a real-time quote up front, your card is saved securely with no pre-authorization hold, and you are charged only after the work is done. Maintenance plans are available if you want us back to keep the system tight. Family-owned, bonded, insured, and trilingual across New York and California since 2019.',
    ],
    faqs: [
      { q: 'What does a personal organizing session include?', a: 'Decluttering rooms and storage areas, organizing closets, pantries, and cabinets, custom storage solutions, and coordinating donation and disposal of what you let go. We build a system you can actually maintain, and offer maintenance plans if you want us back.' },
      { q: 'Do you make me throw things away?', a: 'Never. Organizing is personal — nothing leaves without your say. We help you decide what stays and what goes, and we handle donation and disposal for the items you choose to release.' },
      { q: 'How is organizing priced?', a: 'It is project-based, scoped to the space and your goal. You get a real-time quote up front, your card is saved securely with no pre-authorization hold, and you are charged only after the work is done.' },
      { q: 'Can you help me keep it organized afterward?', a: 'Yes — maintenance plans are available. Many clients book a periodic reset so the system stays tight as life happens. We can fold that into a recurring schedule whenever you like.' },
    ],
  },
];

export function getServicePageBySlug(slug: string): ServicePage | undefined {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}

export function hasServicePage(slug: string): boolean {
  return SERVICE_PAGES.some((s) => s.slug === slug);
}
