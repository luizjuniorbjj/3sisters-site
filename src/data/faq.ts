/**
 * src/data/faq.ts
 * FAQ Semantic Wave 1.5 — bilingual EN/ES with category grouping + speakable subset
 *
 * Source of truth: projects/atlascertificados/seo/faq-semantic-pattern.md
 * Voice: family-owned warmth, direct, practical — zero corporate buzzwords
 *
 * Update FAQ_DATE_MODIFIED only on substantive Q&A edits (not every deploy).
 */

export const FAQ_DATE_MODIFIED = '2026-05-22';

export type FAQCategory =
  | 'Booking & Scheduling'
  | 'Pricing & Payment'
  | 'Services & Coverage'
  | 'Trust & Safety'
  | 'Pets, Keys & Supplies'
  | 'Cancellation & Guarantee';

export interface FAQItem {
  category: FAQCategory;
  en: { question: string; answer: string };
  es: { question: string; answer: string };
  speakable: boolean;
}

export const FAQ_DATA: FAQItem[] = [
  // ─────────────────────────────────────────────────────────
  // Booking & Scheduling (3)
  // ─────────────────────────────────────────────────────────
  {
    category: 'Booking & Scheduling',
    en: {
      question: 'How do I book a cleaning with 3 Sisters Services?',
      answer:
        'You can book online through our booking page, call us at (657) 737-7171, or chat with us through our website. Our online portal handles quick scheduling, and a team member personally confirms every booking Monday through Saturday, 8am to 6pm.',
    },
    es: {
      question: '¿Cómo agendo una limpieza con 3 Sisters Services?',
      answer:
        'Puede agendar en línea desde nuestra página de booking, llamarnos al (657) 737-7171, o conversar con nosotros por el chat del sitio. Nuestro portal online maneja el agendamiento rápido, y un miembro del equipo confirma cada reserva personalmente de lunes a sábado, de 8am a 6pm.',
    },
    speakable: true,
  },
  {
    category: 'Booking & Scheduling',
    en: {
      question: 'How far in advance should I schedule a cleaning?',
      answer:
        'For Regular and Deep Cleanings we recommend booking 3 to 5 days ahead so we can match you with the right cleaner. Move-In/Move-Out and Airbnb turnovers we often fit within 24 to 48 hours when our New York or California schedule allows — just call us and we will tell you straight.',
    },
    es: {
      question: '¿Con cuánta anticipación debo agendar?',
      answer:
        'Para limpieza regular y profunda recomendamos reservar con 3 a 5 días de anticipación para asignarle el equipo adecuado. Para mudanzas y turnovers de Airbnb a menudo entramos en 24 a 48 horas si la agenda de Nueva York o California lo permite — llámenos y le decimos con honestidad.',
    },
    speakable: true,
  },
  {
    category: 'Booking & Scheduling',
    en: {
      question: 'How often can I schedule recurring service?',
      answer:
        'You choose the rhythm — weekly, every other week, or monthly. Most families and offices pick bi-weekly because it keeps the home consistently clean without overspending. You can pause or reschedule any time without penalty.',
    },
    es: {
      question: '¿Con qué frecuencia puedo agendar servicio recurrente?',
      answer:
        'Usted elige el ritmo — semanal, cada dos semanas o mensual. La mayoría de familias y oficinas escogen cada dos semanas porque mantiene la casa consistentemente limpia sin gastar de más. Puede pausar o reagendar en cualquier momento sin penalidad.',
    },
    speakable: false,
  },

  // ─────────────────────────────────────────────────────────
  // Pricing & Payment (3)
  // ─────────────────────────────────────────────────────────
  {
    category: 'Pricing & Payment',
    en: {
      question: 'How much does a cleaning cost?',
      answer:
        'Every home and office is different, so we quote each job individually based on square footage, number of bedrooms and bathrooms, frequency, and any add-ons like inside the oven, fridge, or cabinets. Use our online booking form to get a clear quote in real time — no obligation, no hidden fees. You can also call (657) 737-7171 for a guided estimate.',
    },
    es: {
      question: '¿Cuánto cuesta una limpieza?',
      answer:
        'Cada casa y oficina es distinta, así que cotizamos cada trabajo según los metros cuadrados, número de habitaciones y baños, frecuencia, y extras como horno, refrigerador o gabinetes por dentro. Use nuestro formulario online y reciba una cotización clara en tiempo real — sin compromiso ni cargos ocultos. También puede llamar al (657) 737-7171 para una estimación guiada.',
    },
    speakable: true,
  },
  {
    category: 'Pricing & Payment',
    en: {
      question: 'How do I pay, and when am I charged?',
      answer:
        'You can pay by credit card, PayPal, or cash. If you pay by card, your details are collected securely through our booking system when you book — there is no pre-authorization hold, and your card is only charged after the cleaning is completed. Prefer to pay with cash? Just select it when you book and settle up with your cleaner at the end of the visit.',
    },
    es: {
      question: '¿Cómo pago y cuándo me cobran?',
      answer:
        'Puede pagar con tarjeta de crédito, PayPal o efectivo. Si paga con tarjeta, sus datos se guardan de forma segura a través de nuestro sistema de reservas al momento de reservar — no hay retención previa y la tarjeta solo se cobra después de que la limpieza termine. ¿Prefiere pagar en efectivo? Selecciónelo al reservar y pague a su limpiador al final de la visita.',
    },
    speakable: true,
  },
  {
    category: 'Pricing & Payment',
    en: {
      question: 'Do you offer discounts for recurring cleanings?',
      answer:
        'Yes — weekly, bi-weekly, and monthly plans get a better rate than a one-time clean because we can plan our routes in New York and California more efficiently. We share the recurring price with you in the same quote so you can compare side by side.',
    },
    es: {
      question: '¿Ofrecen descuentos para limpiezas recurrentes?',
      answer:
        'Sí — los planes semanales, quincenales y mensuales tienen mejor tarifa que una limpieza única porque podemos planear mejor las rutas en Nueva York y California. Le mostramos el precio recurrente en la misma cotización para que compare lado a lado.',
    },
    speakable: false,
  },

  // ─────────────────────────────────────────────────────────
  // Services & Coverage (3)
  // ─────────────────────────────────────────────────────────
  {
    category: 'Services & Coverage',
    en: {
      question: 'What cleaning services do you offer?',
      answer:
        'We offer six services: Regular Cleaning, Deep Cleaning, Move-In/Move-Out Cleaning, Airbnb & Vacation Rental Turnovers, Office & Commercial Cleaning, and Personal Organizing. Most clients start with a Deep Cleaning and then move into a recurring Regular plan.',
    },
    es: {
      question: '¿Qué servicios de limpieza ofrecen?',
      answer:
        'Ofrecemos seis servicios: Limpieza Regular, Limpieza Profunda, Limpieza de Mudanza, Turnovers de Airbnb y Renta Vacacional, Limpieza de Oficina y Comercial, y Organización Personal. La mayoría de los clientes empieza con una Limpieza Profunda y luego pasa a un plan Regular recurrente.',
    },
    speakable: true,
  },
  {
    category: 'Services & Coverage',
    en: {
      question: 'Which cities do you serve?',
      answer:
        'We serve 4 cities across 2 states: Manhattan, Brooklyn, and Queens in New York; and San Francisco in California. If you are outside these areas, call us at (657) 737-7171 and we will tell you honestly whether we can cover your address.',
    },
    es: {
      question: '¿En qué ciudades trabajan?',
      answer:
        'Atendemos 4 ciudades en 2 estados: Manhattan, Brooklyn y Queens en Nueva York; y San Francisco en California. Si está fuera de estas áreas, llámenos al (657) 737-7171 y le decimos con honestidad si podemos cubrir su dirección.',
    },
    speakable: true,
  },
  {
    category: 'Services & Coverage',
    en: {
      question: 'What is the difference between Regular and Deep Cleaning?',
      answer:
        'Regular Cleaning maintains an already clean home — dusting, vacuuming, mopping, bathrooms and kitchens, trash. Deep Cleaning resets a space: behind and under furniture, baseboards, doors and frames, walls, kitchen grease and grout, vents. New clients almost always start with a Deep, then keep it up with Regular visits.',
    },
    es: {
      question: '¿Cuál es la diferencia entre Limpieza Regular y Profunda?',
      answer:
        'La Limpieza Regular mantiene una casa ya limpia — sacudir polvo, aspirar, trapear, baños y cocinas, basura. La Limpieza Profunda reinicia el espacio: detrás y debajo de muebles, zócalos, puertas y marcos, paredes, grasa y lechada de cocina, ventilaciones. Los clientes nuevos casi siempre empiezan con una Profunda y luego mantienen con visitas Regulares.',
    },
    speakable: false,
  },

  // ─────────────────────────────────────────────────────────
  // Trust & Safety (2)
  // ─────────────────────────────────────────────────────────
  {
    category: 'Trust & Safety',
    en: {
      question: 'Are you bonded, insured, and background-checked?',
      answer:
        "Yes — 3 Sisters Services is fully bonded and insured, and every cleaner on our team is background-checked and trained before they ever step into your home. Family-owned means we vet every person the same way we would vet someone walking into our own family's house.",
    },
    es: {
      question: '¿Están bonded, asegurados y verifican antecedentes?',
      answer:
        'Sí — 3 Sisters Services tiene seguro y fianza completos, y cada persona de nuestro equipo pasa una verificación de antecedentes y entrenamiento antes de entrar a su casa. Al ser una empresa familiar, evaluamos a cada persona como si fuera a entrar a la casa de nuestra propia familia.',
    },
    speakable: true,
  },
  {
    category: 'Trust & Safety',
    en: {
      question: 'Will I get the same cleaner every visit?',
      answer:
        'For recurring plans we send the same cleaner whenever possible — it matters because they learn your home, your preferences, and your pets. If your regular cleaner is sick or on vacation, we send a teammate who has been briefed on your home so the standard stays the same.',
    },
    es: {
      question: '¿Siempre me asignan la misma persona?',
      answer:
        'En los planes recurrentes enviamos a la misma persona siempre que es posible — importa porque ella aprende su casa, sus preferencias y sus mascotas. Si su limpiadora habitual está enferma o de vacaciones, enviamos a una compañera ya informada sobre su casa para que el estándar se mantenga.',
    },
    speakable: false,
  },

  // ─────────────────────────────────────────────────────────
  // Pets, Keys & Supplies (3)
  // ─────────────────────────────────────────────────────────
  {
    category: 'Pets, Keys & Supplies',
    en: {
      question: 'Do I need to provide cleaning supplies?',
      answer:
        'Yes — we ask clients to provide their own cleaning supplies so we can use the products you already trust in your home: your favorite floor cleaner, the disinfectant safe for your countertops, the soap your kids are not sensitive to. If you need a recommendation list, just ask.',
    },
    es: {
      question: '¿Tengo que proveer los productos de limpieza?',
      answer:
        'Sí — pedimos que los clientes provean sus propios productos de limpieza para que usemos lo que usted ya confía en su casa: su limpiador de pisos favorito, el desinfectante seguro para sus mesones, el jabón al que sus hijos no son sensibles. Si necesita una lista recomendada, solo díganos.',
    },
    speakable: true,
  },
  {
    category: 'Pets, Keys & Supplies',
    en: {
      question: 'What is your pet policy?',
      answer:
        'We love pets and they are welcome to be home. For the best results we ask that pets stay out of the room we are actively cleaning — vacuums, mops and cleaning products can stress animals, and we want them comfortable and safe while we work.',
    },
    es: {
      question: '¿Cuál es su política con mascotas?',
      answer:
        'Amamos las mascotas y pueden estar en casa. Para mejores resultados pedimos que la mascota se mantenga fuera del cuarto que estamos limpiando — la aspiradora, el trapeador y los productos pueden estresar a los animales, y queremos que estén cómodos y seguros mientras trabajamos.',
    },
    speakable: false,
  },
  {
    category: 'Pets, Keys & Supplies',
    en: {
      question: 'How do you handle keys or building access when I am not home?',
      answer:
        'You decide what works for you: leave a key with the doorman or concierge (common in Manhattan and Brooklyn buildings), give us a lockbox code, or share a smart-lock one-time code. Every access detail is stored privately and only the assigned cleaner sees it for that visit.',
    },
    es: {
      question: '¿Cómo manejan llaves o acceso al edificio cuando no estoy en casa?',
      answer:
        'Usted decide lo que funciona: dejar una llave con el portero o conserje (común en edificios de Manhattan y Brooklyn), darnos un código de caja de seguridad, o compartir un código único de cerradura inteligente. Cada detalle de acceso se guarda en privado y solo la persona asignada lo ve para esa visita.',
    },
    speakable: false,
  },

  // ─────────────────────────────────────────────────────────
  // Cancellation & Guarantee (2)
  // ─────────────────────────────────────────────────────────
  {
    category: 'Cancellation & Guarantee',
    en: {
      question: 'What is your cancellation policy?',
      answer:
        'You can reschedule or cancel for free up to 72 hours before your appointment — manage it yourself in the client portal dashboard, or call us at (657) 737-7171. Cancellations inside 72 hours are subject to a $50 fee because we have already blocked the time and the cleaner on our schedule.',
    },
    es: {
      question: '¿Cuál es su política de cancelación?',
      answer:
        'Puede reagendar o cancelar gratis hasta 72 horas antes de su cita — gestione directamente en el dashboard del portal del cliente, o llame al (657) 737-7171. Cancelaciones dentro de las 72 horas tienen un cargo de $50 porque ya bloqueamos el horario y la limpiadora en agenda.',
    },
    speakable: true,
  },
  {
    category: 'Cancellation & Guarantee',
    en: {
      question: 'What happens if I am not satisfied with the cleaning?',
      answer:
        'Tell us within 24 hours and we come back to re-clean the areas you are not happy with — no extra charge, no debate. Family-owned means our name is on every visit, so if something is off, we fix it before you pay a tip or write a review.',
    },
    es: {
      question: '¿Qué pasa si no quedo satisfecho con la limpieza?',
      answer:
        'Avísenos dentro de las 24 horas y volvemos a limpiar las áreas con las que no quedó conforme — sin cargo extra, sin discusión. Al ser empresa familiar, nuestro nombre está en cada visita, así que si algo no quedó bien, lo arreglamos antes de que deje una propina o escriba una reseña.',
    },
    speakable: true,
  },
];

// ─────────────────────────────────────────────────────────
// JSON-LD Schema generators (Wave 1.5)
// ─────────────────────────────────────────────────────────

/**
 * FAQPage JSON-LD schema generator.
 * Use on /faq, homepage (subset 4-5 inline), and any city/service page surfacing FAQ block.
 *
 * Wave 2.1 (2026-05-25): acceptedAnswer.author Person — Atlas Wave 1.5 Camada 2.
 */
const PERSON_FOUNDER_ID = 'https://3sistersservices.com/#person-founder';

export function generateFAQPageSchema(
  faqs: FAQItem[],
  locale: 'en' | 'es' = 'en'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id':
      locale === 'es'
        ? 'https://3sistersservices.com/es/faq#faqpage'
        : 'https://3sistersservices.com/faq#faqpage',
    isPartOf: {
      '@id':
        locale === 'es'
          ? 'https://3sistersservices.com/es/faq'
          : 'https://3sistersservices.com/faq',
    },
    dateModified: FAQ_DATE_MODIFIED,
    inLanguage: locale === 'es' ? 'es-US' : 'en-US',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq[locale].question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq[locale].answer,
        author: { '@id': PERSON_FOUNDER_ID },
      },
    })),
  };
}

/**
 * HowTo schema for "How do I book a cleaning" — Atlas Wave 1.5 Camada 4.
 * Emitted standalone on /faq page (complements FAQPage Q0 entry).
 * Wave 2.1 (2026-05-25).
 */
export function generateHowToBookingSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': 'https://3sistersservices.com/faq#howto-book',
    name: 'How to Book a Cleaning with 3 Sisters Services',
    description:
      'Three ways to book a cleaning with 3 Sisters Cleaning and Home Organizing across New York and California. Our online portal handles quick scheduling and a team member personally confirms every booking.',
    inLanguage: 'en-US',
    totalTime: 'PT5M',
    supply: [],
    tool: [],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Book online',
        text: 'Visit our booking page at 3sistersservices.com/booking and choose your service, frequency, and preferred date — get a quote in real time.',
        url: 'https://3sistersservices.com/booking/',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Call us',
        text: 'Call (657) 737-7171 Monday through Saturday, 8am to 6pm. We answer in English, Spanish, or Portuguese.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Chat through our website',
        text: 'Use the website chat for a fast reply during business hours — connected directly to our scheduling team.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Receive personal confirmation',
        text: 'A team member confirms every booking personally with quote details and arrival window. Our client portal stays available for quick rescheduling between visits.',
      },
    ],
  };
}

/**
 * Speakable subset schema — only for /faq page.
 * Targets perguntas marcadas speakable=true (voice-friendly).
 */
export function generateSpeakableSchema(faqs: FAQItem[]) {
  const speakableFaqs = faqs.filter((f) => f.speakable);
  return {
    '@context': 'https://schema.org',
    '@type': 'SpeakableSpecification',
    xpath: speakableFaqs.map(
      (_, i) => `//div[@itemtype='https://schema.org/Question'][${i + 1}]`
    ),
    cssSelector: ['.speakable-faq-category', '.speakable-faq-answer'],
  };
}

/**
 * Group FAQs by category (UI accordion sections).
 * Preserves original order within each category.
 */
export function groupFAQsByCategory(faqs: FAQItem[]) {
  const grouped: Partial<Record<FAQCategory, FAQItem[]>> = {};
  for (const faq of faqs) {
    if (!grouped[faq.category]) grouped[faq.category] = [];
    grouped[faq.category]!.push(faq);
  }
  return grouped;
}
