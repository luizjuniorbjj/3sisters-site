/**
 * src/data/cities.ts
 * City pages data — Wave 3.0 (2026-05-25)
 *
 * SSoT spec: projects/3sisters/seo/wave3.0-city-pattern-spec.md
 * Copy: projects/3sisters/research/wave3.0-mouse-fortlauderdale.md (Mouse intocável)
 */

export interface CityPage {
  slug: string;
  name: string;
  stateAbbr: 'FL' | 'NY' | 'CA';
  stateName: 'Florida' | 'New York' | 'California';
  county: string;
  coords: { lat: number; lng: number };
  wikidataQID: string;
  neighborhoods: string[];
  introFactual: string;
  serviceContext: string;
  faqs: { q: string; a: string }[];
  neighbors?: string[];
}

const ALL_CITY_PAGES: CityPage[] = [
  {
    slug: 'fort-lauderdale-fl',
    name: 'Fort Lauderdale',
    stateAbbr: 'FL',
    stateName: 'Florida',
    county: 'Broward County',
    coords: { lat: 26.1224, lng: -80.1373 },
    wikidataQID: 'Q165972',
    neighborhoods: [
      'Las Olas',
      'Victoria Park',
      'Coral Ridge',
      'Rio Vista',
      'Tarpon River',
      'Flagler Village',
      'Sailboat Bend',
      'Riverside Park',
    ],
    introFactual: `Fort Lauderdale sits on the Atlantic coast of South Florida and is the county seat of Broward County, with neighborhoods stretching from the beach to the Intracoastal waterways. 3 Sisters Services has cleaned homes, condos, and offices across Fort Lauderdale since 2019 — bonded, insured, and trilingual on every visit.`,
    serviceContext: `Fort Lauderdale's mix of single-family homes along Las Olas and Victoria Park, condo towers in Flagler Village, and beach-facing rentals near Sebastian Street keeps our team moving in different directions every week. We schedule regular cleanings (weekly, every other week, or monthly) and one-time deep cleans, and we usually fit Move-In/Move-Out and Airbnb turnovers inside 24 to 48 hours when our Florida calendar allows. South Florida humidity adds work that drier climates skip — bathrooms and kitchens need closer attention, and homes near the beach carry sand into entryways and tile that we sweep and damp-mop on every visit. After a storm warning, we book extra hands to help homeowners reset before hurricane season picks up. Every cleaner on our Fort Lauderdale team is bonded, background-checked, and speaks English, Spanish, and Portuguese — so estimates, walkthroughs, and instructions can happen in whichever language you prefer.`,
    faqs: [
      {
        q: `Which Fort Lauderdale neighborhoods do you serve?`,
        a: `We serve every Fort Lauderdale neighborhood we can reach on our regular routes — Las Olas, Victoria Park, Coral Ridge, Rio Vista, Tarpon River, Flagler Village, Sailboat Bend, and Riverside Park are on our weekly schedule. If your address is inside city limits and we can fit it into our Broward County rounds, we cover it.`,
      },
      {
        q: `How quickly can you schedule a cleaning in Fort Lauderdale?`,
        a: `Most Fort Lauderdale jobs are booked within 24 to 48 hours of the first call or message. Recurring plans get priority slots at the rhythm you choose. Last-minute Airbnb turnovers and Move-In/Move-Out work we try to fit same-week when our Florida calendar allows — call (657) 737-7171 and we will tell you honestly.`,
      },
      {
        q: `Do you offer Airbnb turnover cleaning near Fort Lauderdale Beach?`,
        a: `Yes — we run Airbnb and short-term rental turnovers across Fort Lauderdale Beach, Las Olas, and the Intracoastal area. That includes linen change, kitchen and bath reset, sand sweep from entryways and balconies, trash, and a presentation check before your next guest checks in. Same-day turnover possible when scheduled ahead.`,
      },
      {
        q: `Do you serve Fort Lauderdale's Spanish-speaking community?`,
        a: `Yes — our entire Fort Lauderdale team is trilingual in English, Spanish, and Portuguese. Estimates, in-home walkthroughs, scheduling, and after-service feedback all happen in whichever language is easier for you. Broward County has a large Hispanic population, and many of our recurring clients in Fort Lauderdale schedule and message us in Spanish.`,
      },
    ],
    neighbors: [],
  },
  {
    slug: 'boca-raton-fl',
    name: 'Boca Raton',
    stateAbbr: 'FL',
    stateName: 'Florida',
    county: 'Palm Beach County',
    coords: { lat: 26.3683, lng: -80.1289 },
    wikidataQID: 'Q486577',
    neighborhoods: [
      'Royal Palm Yacht & Country Club',
      'Boca West',
      'Mizner Park',
      'The Sanctuary',
      'Old Floresta',
      'St Andrews',
      'Boca Pointe',
      'Camino Real',
    ],
    introFactual: `Boca Raton anchors southern Palm Beach County, with a mix of single-family homes, gated estates, and high-rise condos that runs from the beach to the western communities west of I-95. 3 Sisters Services has cleaned Boca homes and offices since 2019 — bonded, insured, and trilingual on every visit.`,
    serviceContext: `Boca Raton is the busiest line on our Florida schedule. We rotate weekly and bi-weekly through condos in Mizner Park, single-family homes in Royal Palm Yacht & Country Club, Boca West villas, and gated estates around Camino Real and St Andrews — the rhythm of a city that runs both family households and a strong retiree base. Move-In/Move-Out work picks up year-round here because Boca turns over inventory faster than most South Florida markets, and we keep deep cleans available for owners returning from summer or prepping a winter rental. Spanish is the second language of much of our regular Boca client base, so estimates, walkthroughs, and post-service feedback all happen in English, Spanish, or Portuguese without translation friction. Hurricane season brings extra demand for pre-storm reset cleans, and we book those weeks in advance.`,
    faqs: [
      {
        q: `Which Boca Raton neighborhoods does 3 Sisters Services cover?`,
        a: `We run regular routes across most of Boca Raton — Royal Palm Yacht & Country Club, Boca West, Mizner Park, The Sanctuary, Old Floresta, St Andrews, Boca Pointe, and the Camino Real corridor are on our weekly schedule. Outside those, if your address sits inside Boca city limits, we can usually pick it up on our Palm Beach County rounds.`,
      },
      {
        q: `Do you handle both condo cleanings and large estate homes in Boca Raton?`,
        a: `Yes — Boca Raton has the widest mix of property types we serve. We clean studios and 2-bedroom condos in Mizner Park, gated single-family homes in Boca West, and larger estates west of I-95 with the same team standards. Quotes scale by square footage, bedrooms and bathrooms, and add-ons like inside-oven or inside-fridge cleaning.`,
      },
      {
        q: `Is your Boca Raton team trilingual in English, Spanish, and Portuguese?`,
        a: `Yes. Our Boca Raton route is fully trilingual in English, Spanish, and Portuguese, which matters in a city where a sizable share of our recurring clients prefers Spanish for scheduling, in-home walkthroughs, and follow-up. Estimates can be sent in either language — let us know your preference when you book and we keep it consistent.`,
      },
      {
        q: `How do I get a quote for cleaning in Boca Raton?`,
        a: `Use our online booking form to get a Boca Raton quote in real time with rate, frequency, and add-on options visible upfront. You can also call (657) 737-7171 Monday through Saturday between 8am and 6pm for a guided estimate. A team member personally confirms every Boca Raton booking. There is no obligation and no fee for the quote itself.`,
      },
    ],
    neighbors: ['delray-beach-fl'],
  },
  {
    slug: 'parkland-fl',
    name: 'Parkland',
    stateAbbr: 'FL',
    stateName: 'Florida',
    county: 'Broward County',
    coords: { lat: 26.3115, lng: -80.2370 },
    wikidataQID: 'Q1031373',
    neighborhoods: [
      'Heron Bay',
      'Parkland Golf & Country Club',
      'Cypress Cove',
      'Parkland Bay',
      'Ternbridge',
      'Mayfair',
      'Watercrest',
    ],
    introFactual: `Parkland is a small, low-density city in northwest Broward County, made up almost entirely of single-family homes inside gated communities — Heron Bay, Parkland Golf & Country Club, Cypress Cove, Watercrest, and a handful of newer enclaves. 3 Sisters Services has been the recurring cleaning team for Parkland families since 2019.`,
    serviceContext: `Most of our Parkland calendar is recurring — weekly and every-other-week visits for families running busy school-and-work schedules across 3,000-plus square-foot homes. The route looks the same week after week because that is what our Parkland clients want: same cleaner whenever possible, same checklist, same arrival window. We adjust seasonally for school breaks, holidays, and the occasional party reset, but the core rhythm holds. One-time deep cleans book mostly around back-to-school and right before winter holidays. Move-in cleans happen mostly summer, when families relocate into Parkland for the school year. Every cleaner on the Parkland route is bonded, background-checked, and trained on the specific preferences your home has built up — pets at home, no-shoes policy, products under the sink we use or skip, alarm codes handled discreetly. Recurring price is shared upfront alongside the one-time rate so the math is clear.`,
    faqs: [
      {
        q: `Do you serve all the gated communities in Parkland?`,
        a: `Yes — we work inside Heron Bay, Parkland Golf & Country Club, Cypress Cove, Parkland Bay, Ternbridge, Mayfair, and Watercrest on a regular basis. Gate access is handled either by guest pass left at the gatehouse, your shared resident code, or a one-time code on the day of service. Whichever your community prefers, we follow it.`,
      },
      {
        q: `What is your typical weekly cleaning rate for a Parkland home?`,
        a: `Parkland homes are bigger than the South Florida average, so quotes are individual rather than flat. We look at square footage, bedrooms and bathrooms, pets, and the frequency you choose. Weekly and bi-weekly clients always get a better rate per visit than a one-time clean. Call (657) 737-7171 and we send a clear quote the same day.`,
      },
      {
        q: `Will I get the same cleaner every visit in Parkland?`,
        a: `On recurring Parkland plans we send the same cleaner whenever possible — it matters because she learns your home, your kids schedule, the pets, and the small things that make a difference. If your regular cleaner is sick or on vacation, we send a teammate already briefed on your home so the standard stays the same.`,
      },
      {
        q: `Do you handle move-in cleaning before my family relocates to Parkland?`,
        a: `Yes — Parkland sees a lot of summer move-ins for families relocating before the school year, and we fit Move-In cleans inside 24 to 48 hours when our Florida calendar allows. The job includes inside cabinets and drawers, all appliances inside and out, full floor care, baseboards, and a deep bathroom reset before furniture arrives.`,
      },
    ],
    neighbors: ['weston-fl'],
  },
  {
    slug: 'weston-fl',
    name: 'Weston',
    stateAbbr: 'FL',
    stateName: 'Florida',
    county: 'Broward County',
    coords: { lat: 26.1003, lng: -80.3997 },
    wikidataQID: 'Q1101178',
    neighborhoods: [
      'Weston Hills',
      'Savanna',
      'Bonaventure',
      'The Falls',
      'Windmill Ranch Estates',
      'Country Isles',
      'Indian Trace',
    ],
    introFactual: `Weston is a master-planned city in western Broward County, built on consistent standards across its gated communities — Weston Hills, Savanna, Bonaventure, The Falls, and Windmill Ranch Estates. The city's Latin-American homeowner population is among Florida's most concentrated. 3 Sisters Services has been the trilingual cleaning option Westonians have asked for since 2019.`,
    serviceContext: `Weston homes don't tolerate corner-cutting and our Weston route reflects that — fixed checklists, same cleaner whenever possible, and quality checks baked into every recurring visit. Master-planned communities here run from 2,500 square-foot townhomes in Country Isles to 6,000-plus square-foot estates in Windmill Ranch, and the cleaning approach shifts accordingly. A meaningful share of our Weston schedule is trilingual: many clients prefer Spanish or Portuguese for in-home conversation, scheduling, and feedback, and that's how we run estimates. Deep cleans are common quarterly, and we handle the seasonal reset most Weston families request before guests visit during winter. We respect the HOA quiet hours each community sets — Weston Hills, Bonaventure, and Indian Trace each have slightly different windows — and time our routes around them. Bonded, insured, background-checked stays the standard.`,
    faqs: [
      {
        q: `Which Weston communities does your team service regularly?`,
        a: `Our Weston route includes Weston Hills, Savanna, Bonaventure, The Falls, Windmill Ranch Estates, Country Isles, and Indian Trace as regular stops. We adapt scheduling around each community's HOA quiet hours and gate procedure — the Bonaventure code is shared with us in advance, Weston Hills uses guest pass at the gatehouse, and each works.`,
      },
      {
        q: `Is your team available in Spanish or Portuguese for Weston clients?`,
        a: `Yes — Weston has one of South Florida's largest Latin-American communities, and our team handles English, Spanish, and several members speak Portuguese. Walkthroughs, estimates, after-service feedback, and even quick texts about a rescheduled visit can all happen in the language you find easier. Tell us your preference once and we keep it for the duration of the plan.`,
      },
      {
        q: `Do you handle larger Weston estates over 5,000 square feet?`,
        a: `Yes — homes in Windmill Ranch Estates, The Falls, and parts of Weston Hills often run 5,000 square feet or more. We schedule those visits with extra cleaning hours and a two- or three-person team depending on layout. Pricing is per-home rather than flat-rate so larger Weston estates always get a quote that matches the actual square footage and bathroom count.`,
      },
      {
        q: `Can you coordinate with my Weston property manager or HOA?`,
        a: `Yes — for clients renting out a Weston home or coordinating through a property management company, we communicate directly with the manager on access, scheduling, and post-visit photos when requested. Same for HOA-related requirements: if your community has specific vendor sign-in or parking rules, we follow them without needing daily reminders.`,
      },
    ],
    neighbors: ['parkland-fl', 'southwest-ranches-fl'],
  },
  {
    slug: 'delray-beach-fl',
    name: 'Delray Beach',
    stateAbbr: 'FL',
    stateName: 'Florida',
    county: 'Palm Beach County',
    coords: { lat: 26.4615, lng: -80.0728 },
    wikidataQID: 'Q49202',
    neighborhoods: [
      'Atlantic Avenue',
      'Seagate',
      'Lake Ida',
      'Pineapple Grove',
      'Gulf Stream Park',
      'Tropic Isle',
      'Delaire',
    ],
    introFactual: `Delray Beach sits along Palm Beach County's Atlantic coast, with a downtown built around Atlantic Avenue and residential neighborhoods running from the ocean to Lake Ida. The mix of permanent residents, snowbirds, and short-term-rental owners is distinctive. 3 Sisters Services has run Delray cleaning routes since 2019 — bonded, insured, and trilingual.`,
    serviceContext: `Delray rhythm changes with the seasons. November through April our calendar fills with snowbird arrivals: opening-the-house cleans for owners returning to Seagate or Tropic Isle, weekly visits for the winter months, and closing cleans before they head back north. Airbnb and short-term-rental owners along Atlantic Avenue and within walking distance of the beach push us toward same-day turnovers — linen change, kitchen reset, sand sweep, presentation check before the next guest checks in. Outside of season, the schedule shifts toward Pineapple Grove condos and Lake Ida single-family homes on regular weekly or bi-weekly plans. Move-Out work peaks in May as winter renters leave. Every Delray visit comes with the same bonded, insured, background-checked team standard the rest of our Florida route uses, with trilingual (EN/ES/PT) handling for the city's growing Latin-American resident base.`,
    faqs: [
      {
        q: `Do you handle seasonal opening and closing cleans in Delray Beach?`,
        a: `Yes — snowbird opening cleans (November arrivals) and closing cleans (April-May departures) are a regular part of our Delray Beach schedule. Opening clean preps the home after months closed — dust, bathrooms, kitchen reset, linen change. Closing clean handles trash, perishables, full surface wipe, and shut-off coordination if you want. Book 2-3 weeks ahead during peak season.`,
      },
      {
        q: `Can you turn around an Airbnb in Delray Beach on the same day?`,
        a: `Yes — same-day Airbnb turnovers across Delray Beach, especially along Atlantic Avenue, Pineapple Grove, and beach-walking-distance condos, are scheduled in advance with our short-term-rental team. Standard turnover includes linen change, full kitchen and bath reset, sand sweep on entryways and balconies, trash and liner replacement, and a presentation check before guest arrival.`,
      },
      {
        q: `Which Delray Beach neighborhoods are on your regular routes?`,
        a: `Our weekly Delray Beach schedule covers Atlantic Avenue area, Seagate, Lake Ida, Pineapple Grove, Gulf Stream Park, Tropic Isle, and Delaire. Outside those, we can usually fit a Delray address into our Palm Beach County route when our calendar allows — call and we tell you honestly whether we can hold your day-of-week consistently.`,
      },
      {
        q: `How do I pay for a Delray Beach cleaning if I am not in town?`,
        a: `Card details are collected securely through Stripe at booking. There is no pre-authorization hold — your card is only charged after the cleaning is completed and you have reviewed photos or feedback. Many of our snowbird Delray clients book remotely from out of state — we send a post-service summary the same day so you can confirm or flag anything before payment processes.`,
      },
    ],
    neighbors: ['boca-raton-fl'],
  },
  {
    slug: 'lighthouse-point-fl',
    name: 'Lighthouse Point',
    stateAbbr: 'FL',
    stateName: 'Florida',
    county: 'Broward County',
    coords: { lat: 26.2756, lng: -80.0875 },
    wikidataQID: 'Q1063987',
    neighborhoods: [
      'Hillsboro Mile area',
      'North Cove',
      'South Cove',
      'Venetian Isles',
    ],
    introFactual: `Lighthouse Point is a small Broward County enclave tucked between Pompano Beach and Deerfield Beach, defined by canal-front and Intracoastal-facing homes. The Hillsboro Mile corridor anchors the high end of the market. 3 Sisters Services has been running discreet recurring routes through Lighthouse Point waterfront homes since 2019 — bonded, insured, trilingual.`,
    serviceContext: `Lighthouse Point is small enough that our cleaners get to know the dock workers, the regular pool service, and the gardener you've used for years — it's that kind of city. Most of our work here is recurring weekly or bi-weekly visits for canal-front and Intracoastal-facing homes from the Hillsboro Mile corridor down through the North Cove and South Cove neighborhoods. Boat docks bring water in, salt air does its work on metalwork and glass, and the cleaning approach factors both. Discretion is part of the contract — homeowners along Hillsboro Mile expect quiet, on-time arrival, no signage on vehicles, and no chatter about who lives where. We honor that. Move-In/Move-Out and deep-clean work in Lighthouse Point tends to be planned 4-6 weeks ahead because most owners coordinate around contractors and interior designers — we slot into their timeline, not the reverse.`,
    faqs: [
      {
        q: `Do you clean canal-front and Intracoastal homes in Lighthouse Point?`,
        a: `Yes — canal-front and Intracoastal-facing homes are the heart of our Lighthouse Point route. Salt air, sliding-door tracks, balcony rails, and dock-side patio doors all need closer attention than inland homes, and we adjust the standard checklist for it. The visit covers interior cleaning fully — we don't pressure-wash exterior or handle dock cleaning, but we coordinate around those vendors.`,
      },
      {
        q: `Is your Lighthouse Point service discreet about waterfront-home clients?`,
        a: `Yes. Our Lighthouse Point team uses unmarked vehicles on request, follows whatever entry method you set — gate, lockbox, smart lock, or doorman — and never discusses one client's home with another. Hillsboro Mile homeowners specifically asked us to confirm this is standard, and it is. Bonded, insured, and background-checked applies to every member of the team.`,
      },
      {
        q: `Can you coordinate with my regular pool, gardener, or contractor in Lighthouse Point?`,
        a: `Yes — we coordinate scheduling with the pool team, landscape crew, and contractors that already work your home in Lighthouse Point. If they are due the same morning, we adjust arrival time so we're not in each other's way. We accept access from the gardener or pool guy when you authorize it, with code or key handoff handled per your instructions.`,
      },
      {
        q: `How far in advance should I book Lighthouse Point service?`,
        a: `Recurring Lighthouse Point plans start within 1-2 weeks of your first call. Move-In/Move-Out, deep cleans, and full estate resets we ask 4-6 weeks of notice when possible because most Lighthouse Point owners coordinate around designers and contractors. Last-minute requests we try to accommodate — call (657) 737-7171 and we tell you honestly what's possible.`,
      },
    ],
    neighbors: ['fort-lauderdale-fl'],
  },
  {
    slug: 'southwest-ranches-fl',
    name: 'Southwest Ranches',
    stateAbbr: 'FL',
    stateName: 'Florida',
    county: 'Broward County',
    coords: { lat: 26.0570, lng: -80.4070 },
    wikidataQID: 'Q3501028',
    neighborhoods: [
      'Sunshine Ranches',
      'Green Meadows',
      'Rolling Oaks',
      'Country Estates',
      'Landmark Ranch Estates',
    ],
    introFactual: `Southwest Ranches is a town in western Broward County built to preserve a rural lifestyle — 1-to-5-acre estate properties, equestrian zoning across most of the town, and houses set back from the street under canopy oaks. 3 Sisters Services has cleaned Southwest Ranches estates and farmhouses since 2019, bonded, insured, and trilingual.`,
    serviceContext: `Southwest Ranches estates take longer to clean than typical South Florida homes, and we plan the schedule for it. A 4-acre property with a 5,000-plus square-foot main house, a guest house, and a barn-office means a two- or three-person team and a half-day blocked off rather than a 90-minute drop-in. The town slogan — preserving our rural lifestyle — shapes how we operate: we keep vehicles tidy on long driveways, watch for horses and dogs, and respect the privacy that brings people to Southwest Ranches in the first place. Recurring service here runs bi-weekly or monthly more often than weekly — the homes are larger but turnover slower. Deep cleans are common quarterly. Estate-management coordination with property managers, equine staff, or contractors is part of how we work most Southwest Ranches addresses. Bonded, insured, background-checked, and trilingual (EN/ES/PT) handling stays the standard.`,
    faqs: [
      {
        q: `Do you clean larger estate homes in Southwest Ranches?`,
        a: `Yes — estates are the core of our Southwest Ranches route. Homes here run from 3,500 to over 8,000 square feet on lots of one to five acres, often with guest houses, separate garages, and barn-office structures. Our quotes reflect total interior square footage cleaned, not lot size. Two- or three-person teams and half-day blocks are standard.`,
      },
      {
        q: `Can you coordinate with my property manager or equestrian staff in Southwest Ranches?`,
        a: `Yes — many Southwest Ranches estates have an on-site property manager, barn manager, or trusted handyman who handles day-to-day access. We coordinate scheduling and key/code handoff with them once you authorize it. If you prefer to be the only point of contact, we work that way too. Either model fits our Southwest Ranches workflow.`,
      },
      {
        q: `Do you offer monthly or quarterly deep cleaning for Southwest Ranches estates?`,
        a: `Yes — bi-weekly and monthly recurring plans cover most Southwest Ranches estates, with quarterly deep cleans layered on top. The quarterly visit hits the items normal cleaning skips: behind heavy furniture, baseboards on every wall, vents, fans, walls in high-traffic hallways, kitchen grease and grout. We schedule those a full day at a time, often two cleaners working through different floors at once.`,
      },
      {
        q: `How do you handle pets and horses on Southwest Ranches properties?`,
        a: `Carefully. Almost every Southwest Ranches home has dogs, several have horses or chickens, and a few have goats. We ask in advance what room to keep pets out of during cleaning, where horses are tied or pastured during our visit, and which gates need to stay closed. Our team works around the animals rather than the reverse.`,
      },
    ],
    neighbors: ['weston-fl'],
  },
  // ─── New York tier (Wave 6) — provenance: research/wave6-ny-city-stats.md ───
  {
    slug: 'manhattan-ny',
    name: 'Manhattan',
    stateAbbr: 'NY',
    stateName: 'New York',
    county: 'New York County',
    coords: { lat: 40.7831, lng: -73.9712 },
    wikidataQID: 'Q11299',
    neighborhoods: [
      'Upper East Side',
      'Upper West Side',
      'Harlem',
      'Tribeca',
      'Chelsea',
      'Greenwich Village',
      'Washington Heights',
    ],
    introFactual: `Manhattan is the most densely built borough of New York City and home to about 1,660,664 people (U.S. Census, ACS 2024), with the oldest housing stock in the city — a large share of apartments were built before 1940. 3 Sisters Services has cleaned apartments, walk-ups, and offices across Manhattan since 2019 — bonded, insured, and trilingual on every visit.`,
    serviceContext: `Manhattan is a borough of renters — roughly three in four residents rent (U.S. Census) — so a lot of our work here is apartment turnover, recurring upkeep in pre-war walk-ups and co-ops, and move-in/move-out cleans timed to lease dates. We run regular cleanings (weekly, every other week, or monthly) and one-time deep cleans from the Upper East Side and Upper West Side down through Chelsea, Greenwich Village, and Tribeca, and up to Harlem and Washington Heights. The pre-war stock changes the job: original kitchens and bathrooms, radiator dust, painted-over detail, and small dense layouts that reward careful, room-by-room work. Building access matters too — many co-ops and condos require a certificate of insurance and check cleaners in at the door, which is why bonded and background-checked matters here. Every cleaner on our Manhattan team speaks English, Spanish, and Portuguese, so the estimate, the walkthrough, and any building or scheduling instruction can happen in whichever language is easiest for you.`,
    faqs: [
      {
        q: `Which Manhattan neighborhoods do you serve?`,
        a: `We clean across Manhattan — the Upper East Side, Upper West Side, Harlem, Tribeca, Chelsea, Greenwich Village, and Washington Heights are all on our routes. If your address is in the borough and we can fit it into our New York County schedule, we cover it, from doorman high-rises to fourth-floor walk-ups.`,
      },
      {
        q: `Do you do move-in and move-out cleaning for Manhattan apartments?`,
        a: `Yes — move-in/move-out is one of our most-booked Manhattan services because the borough is mostly renters. We clean the empty unit top to bottom — inside cabinets and appliances, bathrooms, floors, and windows where reachable — so you get your deposit back or hand a clean unit to the next tenant. We schedule around lease and elevator-reservation dates. Call (657) 737-7171.`,
      },
      {
        q: `Can you meet my building's certificate of insurance (COI) requirement?`,
        a: `Yes — we are bonded and insured, and our team is background-checked, which is exactly what most Manhattan co-op and condo boards ask for before letting cleaners in. Tell us your building's management company and requirements and we will provide what's needed for access. This is standard for the pre-war and doorman buildings we work in.`,
      },
      {
        q: `Do you offer cleaning in Spanish or Portuguese in Manhattan?`,
        a: `Yes — our entire Manhattan team is trilingual in English, Spanish, and Portuguese. The estimate, the in-home walkthrough, scheduling, and any feedback afterward all happen in whichever language is easiest for you. Many of our recurring Manhattan clients book and message us in Spanish.`,
      },
    ],
    neighbors: ['brooklyn-ny', 'queens-ny'],
  },
  {
    slug: 'brooklyn-ny',
    name: 'Brooklyn',
    stateAbbr: 'NY',
    stateName: 'New York',
    county: 'Kings County',
    coords: { lat: 40.6782, lng: -73.9442 },
    wikidataQID: 'Q18419',
    neighborhoods: [
      'Williamsburg',
      'Park Slope',
      'Bushwick',
      'Bedford-Stuyvesant',
      'Brooklyn Heights',
      'Crown Heights',
      'Bay Ridge',
    ],
    introFactual: `Brooklyn is New York City's most populous borough, home to about 2,617,631 people (U.S. Census, ACS 2024), with a housing mix of brownstones, walk-ups, and newer condos — much of it built in the early 1950s and earlier. 3 Sisters Services has cleaned homes, brownstones, and apartments across Brooklyn since 2019 — bonded, insured, and trilingual on every visit.`,
    serviceContext: `About seven in ten Brooklyn residents rent (U.S. Census), so apartment turnover, recurring upkeep, and move-in/move-out cleans make up much of our Brooklyn work — alongside whole-house cleaning of the borough's brownstones. We run regular plans (weekly, every other week, or monthly) and one-time deep cleans from Williamsburg and Park Slope through Bushwick, Bed-Stuy, and Crown Heights, over to Brooklyn Heights and Bay Ridge. The older stock means stairs, original kitchens and baths, and detail that surface cleaning misses — stoops and entryways that catch street grit, radiators, and built-up grime in long-lived units. Many condo and co-op buildings ask for a certificate of insurance before access, which is why bonded and background-checked matters. Every cleaner on our Brooklyn team speaks English, Spanish, and Portuguese, so the estimate, walkthrough, and any scheduling can happen in whichever language is easiest for you.`,
    faqs: [
      {
        q: `Which Brooklyn neighborhoods do you serve?`,
        a: `We clean across Brooklyn — Williamsburg, Park Slope, Bushwick, Bedford-Stuyvesant, Brooklyn Heights, Crown Heights, and Bay Ridge are all on our routes. Brownstone, walk-up, or condo, if your address is in the borough and we can fit it into our Kings County schedule, we cover it.`,
      },
      {
        q: `Do you clean Brooklyn brownstones and multi-floor homes?`,
        a: `Yes — brownstones and multi-floor homes are core Brooklyn work for us. We clean floor by floor, including the stairs between them, and pay attention to the original detail these homes keep: woodwork, tall windows, radiators, and older kitchens and baths. For a full reset we recommend a deep clean first, then a recurring plan to hold it.`,
      },
      {
        q: `Do you do apartment turnover and move-out cleaning in Brooklyn?`,
        a: `Yes — with most of Brooklyn renting, move-in/move-out and turnover cleans are among our most-booked services. We clean the empty unit thoroughly — inside cabinets and appliances, bathrooms, floors, and reachable windows — timed to your lease or closing date. We are bonded and insured for building access. Call (657) 737-7171.`,
      },
      {
        q: `Do you offer cleaning in Spanish or Portuguese in Brooklyn?`,
        a: `Yes — our entire Brooklyn team is trilingual in English, Spanish, and Portuguese. The estimate, the walkthrough, scheduling, and after-service feedback all happen in whichever language is easiest for you. Many of our recurring Brooklyn clients book and message us in Spanish.`,
      },
    ],
    neighbors: ['manhattan-ny', 'queens-ny'],
  },
  {
    slug: 'queens-ny',
    name: 'Queens',
    stateAbbr: 'NY',
    stateName: 'New York',
    county: 'Queens County',
    coords: { lat: 40.7282, lng: -73.7949 },
    wikidataQID: 'Q18424',
    neighborhoods: [
      'Astoria',
      'Long Island City',
      'Flushing',
      'Jamaica',
      'Forest Hills',
      'Jackson Heights',
      'Bayside',
    ],
    introFactual: `Queens is the largest borough by area and one of the most diverse places in the United States, home to about 2,316,841 people (U.S. Census, ACS 2024). It is the most owner-heavy of the three boroughs we serve — roughly 45% own — with a mix of one- and two-family homes, co-ops, and apartments, much of it built around the early 1950s. 3 Sisters Services has cleaned homes and apartments across Queens since 2019 — bonded, insured, and trilingual on every visit.`,
    serviceContext: `Queens has the widest housing mix of the three boroughs — single-family and two-family homes alongside co-ops and apartment buildings — so our Queens work spans whole-house cleaning, recurring upkeep, apartment turnover, and move-in/move-out. We run regular plans (weekly, every other week, or monthly) and one-time deep cleans from Astoria and Long Island City through Jackson Heights and Forest Hills, out to Flushing, Bayside, and Jamaica. The mid-century stock rewards a deep clean of original kitchens, baths, and floors before a recurring plan keeps it in shape. For apartment and co-op buildings that ask for a certificate of insurance, our bonded and background-checked team meets the requirement. Every cleaner on our Queens team speaks English, Spanish, and Portuguese — fitting for the most multilingual borough in the city — so the estimate, walkthrough, and scheduling happen in whichever language is easiest for you.`,
    faqs: [
      {
        q: `Which Queens neighborhoods do you serve?`,
        a: `We clean across Queens — Astoria, Long Island City, Flushing, Jamaica, Forest Hills, Jackson Heights, and Bayside are all on our routes. Single-family home, two-family, co-op, or apartment, if your address is in the borough and we can fit it into our Queens County schedule, we cover it.`,
      },
      {
        q: `Do you clean both houses and apartments in Queens?`,
        a: `Yes — Queens has the widest mix of housing of the boroughs we serve, and we clean all of it. For one- and two-family homes we offer whole-house regular and deep cleaning; for co-ops and apartments we handle recurring upkeep and move-in/move-out turnovers. Tell us your home's size and we give you a real-time quote with no card hold.`,
      },
      {
        q: `Do you do move-in and move-out cleaning in Queens?`,
        a: `Yes — move-in/move-out is a regular Queens service for us, for both rentals and homes that just sold. We clean the empty space top to bottom — inside cabinets and appliances, bathrooms, floors, and reachable windows — timed to your lease or closing date. We are bonded and insured for building access. Call (657) 737-7171.`,
      },
      {
        q: `Do you offer cleaning in Spanish or Portuguese in Queens?`,
        a: `Yes — our entire Queens team is trilingual in English, Spanish, and Portuguese, which fits one of the most multilingual boroughs in the country. The estimate, walkthrough, scheduling, and feedback all happen in whichever language is easiest for you. Many of our recurring Queens clients book and message us in Spanish.`,
      },
    ],
    neighbors: ['manhattan-ny', 'brooklyn-ny'],
  },
  // ─── California tier (Wave 7) — provenance: research/wave7-ca-city-stats.md ───
  {
    slug: 'san-francisco-ca',
    name: 'San Francisco',
    stateAbbr: 'CA',
    stateName: 'California',
    county: 'San Francisco County',
    coords: { lat: 37.7749, lng: -122.4194 },
    wikidataQID: 'Q62',
    neighborhoods: [
      'Mission District',
      'SoMa',
      'Pacific Heights',
      'Noe Valley',
      'Richmond District',
      'Sunset District',
      'The Castro',
    ],
    introFactual: `San Francisco is a consolidated city and county of about 827,526 people (U.S. Census, ACS 2024), built on steep hills with a housing stock that runs from Victorian and Edwardian flats to modern SoMa condos — the median home dates to 1946. 3 Sisters Services has cleaned homes, flats, and apartments across San Francisco since 2019 — bonded, insured, and trilingual on every visit.`,
    serviceContext: `San Francisco is a renter's city — about 63% of residents rent (U.S. Census) — so apartment turnover, recurring upkeep, and move-in/move-out cleans timed to lease dates make up much of our work, alongside whole-home cleaning of the city's Victorian and Edwardian flats. We run regular plans (weekly, every other week, or monthly) and one-time deep cleans from the Mission and Noe Valley through Pacific Heights and the Castro, out to the Richmond and Sunset, and into SoMa's condo towers. The older stock changes the job: ornate trim and molding, bay windows, hardwood floors, and original woodwork need careful, non-abrasive cleaning. The city's hills mean many flats are walk-ups with no elevator, so we plan equipment and access for each building. SoMa and downtown condos often require a certificate of insurance and freight-elevator or concierge coordination — being bonded and insured is what gets us in. San Francisco's climate is cool and foggy rather than humid, so the work here is about detail and turnover, not moisture. Every cleaner on our San Francisco team is bonded, background-checked, and speaks English, Spanish, and Portuguese, so the estimate, walkthrough, and scheduling happen in whichever language is easiest for you.`,
    faqs: [
      {
        q: `Which San Francisco neighborhoods do you serve?`,
        a: `We clean across San Francisco — the Mission District, SoMa, Pacific Heights, Noe Valley, the Richmond District, the Sunset District, and the Castro are all on our routes. Victorian flat, walk-up, or SoMa condo, if your address is in the city and we can fit it into our San Francisco County schedule, we cover it.`,
      },
      {
        q: `Do you clean San Francisco Victorians and Edwardian flats?`,
        a: `Yes — these are core San Francisco work for us. Victorian and Edwardian homes come with ornate trim, molding, bay windows, and original hardwood that need careful, non-abrasive cleaning. We clean flat by flat, including the stairs between floors, and pay attention to the detail these older homes keep. For a full reset we recommend a deep clean first, then a recurring plan.`,
      },
      {
        q: `Can you meet my building's COI or HOA access requirement?`,
        a: `Yes — we are bonded and insured, and our team is background-checked, which is what SoMa and downtown condo buildings and HOAs ask for before letting a cleaner in. Tell us your building's management and requirements and we'll provide the certificate of insurance and coordinate freight-elevator or concierge access.`,
      },
      {
        q: `Do you offer cleaning in Spanish or Portuguese in San Francisco?`,
        a: `Yes — our entire San Francisco team is trilingual in English, Spanish, and Portuguese. The estimate, the walkthrough, scheduling, and after-service feedback all happen in whichever language is easiest for you. Many of our recurring San Francisco clients book and message us in Spanish. Call (657) 737-7171.`,
      },
    ],
    neighbors: [],
  },
];

// WS-B (ADR-3S-001): Florida retired. New York + California city pages stay.
// Filter keeps source data intact (reversible); FL is excluded from every consumer.
export const CITY_PAGES: CityPage[] = ALL_CITY_PAGES.filter((c) => c.stateAbbr !== 'FL');

export function getCityBySlug(slug: string): CityPage | undefined {
  return CITY_PAGES.find((c) => c.slug === slug);
}
