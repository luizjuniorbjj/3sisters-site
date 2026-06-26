/**
 * src/data/blog-posts.ts
 *
 * 3 Sisters Services — Blog post content (bilingual EN/ES with inline FAQ).
 *
 * Voice contract: family-owned warmth, direct, practical. Zero corporate
 * buzzwords (no "leverage", "transform your", "revolutionize", "amazing",
 * "seamless", "elevate"). Pattern source:
 *   - Atlas Certificados Wave 1.5 FAQ semantic pattern
 *   - LBJ Solutions Moat Guide voice (craftsman direct prose)
 *
 * Author Person @id reference matches PERSON_ID in src/lib/schema.ts.
 */

export interface BlogFAQ {
  question: string;
  answer: string;
  speakable: boolean;
}

export interface BlogPostLocale {
  title: string;
  description: string;
  leadParagraph: string;
  sections: Array<{ heading: string; html: string }>;
  closingCta: string;
  faqs: BlogFAQ[];
}

export interface BlogPostContent {
  slug: string;
  category: string;
  readMinutes: number;
  publishedDate: string;
  modifiedDate: string;
  cover: string;
  author: { name: string; role: string };
  en: BlogPostLocale;
  es: BlogPostLocale;
}

export const BLOG_POSTS: BlogPostContent[] = [
  // ─────────────────────────────────────────────────────────────
  // POST 1 — How to Prepare Your Home for a Deep Cleaning
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'how-to-prepare-for-deep-cleaning',
    category: 'Cleaning Tips',
    readMinutes: 5,
    publishedDate: '2026-05-23',
    modifiedDate: '2026-05-23',
    cover: '/images/blog/post-1.jpg',
    author: { name: 'The 3 Sisters Family', role: 'Family Owners' },
    en: {
      title: 'How to Prepare Your Home for a Deep Cleaning',
      description:
        'A practical checklist from a family-owned cleaning team in New York and California — what to do the day before, what to leave to us, and what to expect.',
      leadParagraph:
        "Deep cleanings work best when the house is ready to be cleaned — not picked up. The short version: clear surfaces, secure pets and valuables, point us toward the rooms you care about most. Everything else is our job. Below is exactly what we tell every client when they book their first Deep Cleaning with us, whether the home is a Brooklyn walk-up, a Queens single-family home, or a San Francisco condo.",
      sections: [
        {
          heading: 'The day before — declutter, not deep clean',
          html: '<p>You do not need to clean before we arrive. You do need to put away the things we cannot clean around: mail piles on the counter, kids&apos; school papers, the laundry on the bed, the box of holiday decorations in the corner of the dining room. If we cannot see the surface, we cannot deep clean the surface.</p><p>Ten focused minutes per room is enough. Put items where they belong, or into a labeled bin. Anything that is genuinely trash goes in the trash — we will take the bag out for you.</p>',
        },
        {
          heading: 'The morning of — pets, parking, access',
          html: '<p>Three things matter on the morning of your Deep Cleaning:</p><ol><li><strong>Pets.</strong> Tell us where they will be. Vacuums and floor cleaners stress most animals. A bedroom with the door closed, a crate in a quiet corner, a backyard, or a friend&apos;s house — anything that keeps them calm and safe while we work.</li><li><strong>Parking.</strong> In Manhattan, Brooklyn, and Queens, tell us about street cleaning days, alternate-side rules, or whether your building has a service entrance. In San Francisco, point us to the driveway or guest parking.</li><li><strong>Access.</strong> Door code, doorman name, lockbox combo, smart-lock one-time code — whatever it is, we confirm it the day before. Every access detail is stored privately and only the assigned cleaner sees it for your visit.</li></ol>',
        },
        {
          heading: 'What we bring vs what you provide',
          html: '<p>We bring our own vacuums, mops, microfiber cloths, scrubbing brushes, and tools. You provide the cleaning products — your favorite floor cleaner, the disinfectant safe for your countertops, the soap your kids are not sensitive to. There is a reason for that: every home has its own surfaces, finishes, and people. The product you already trust beats whatever we would carry in a generic kit. If you want a recommendation list, ask when you book and we will send one.</p>',
        },
        {
          heading: 'How long it actually takes',
          html: '<p>A Deep Cleaning is a reset, not a recurring clean. For most homes it is a full-day service — usually four to eight hours depending on square footage, number of bathrooms, and whether you want extras like inside the oven, fridge, or cabinets. We will give you an honest time window when you call <a href="tel:+16577377171">(657) 737-7171</a> or send your details through the <a href="/booking">booking form</a>.</p><p>If you have to be out of the house, that is fine — most clients are. If you want to be home, that is also fine — we will work around you. What we ask is the freedom to move through the rooms in the order that makes sense for the job, not the order that feels polite.</p>',
        },
        {
          heading: 'What you do not need to do',
          html: '<p>You do not need to pre-clean the bathrooms. You do not need to vacuum the rugs. You do not need to wipe the kitchen counters or empty the trash. The job of a Deep Cleaning is to do the work that has not been done in months — behind and under the furniture, the baseboards, the walls, the kitchen grease and grout, the vents. If you do our job before we arrive, you are paying for less than you booked.</p><p>One last thing: if there is a room you actively want us to skip — the home office, the nursery during nap time, the guest room you are using as a closet — tell us in advance and we will route around it.</p>',
        },
      ],
      closingCta:
        'Ready to book your Deep Cleaning? Call <a href="tel:+16577377171">(657) 737-7171</a> Monday through Saturday between 8am and 6pm, or send your details through our <a href="/booking">booking form</a> and we will reply with a clear quote the same day.',
      faqs: [
        {
          question: 'How long does a Deep Cleaning take in a typical 2-bedroom apartment?',
          answer:
            'For a 2-bedroom apartment in good condition, a Deep Cleaning takes our team 4 to 6 hours. Add extras like inside the oven or inside cabinets and you add 30 to 60 minutes each. We give you a time window when we send the quote so there are no surprises.',
          speakable: true,
        },
        {
          question: 'Do I need to be home during a Deep Cleaning?',
          answer:
            'No. Most clients leave us a key with the doorman, give us a lockbox code, or share a smart-lock one-time code, and come back to a fresh home. If you prefer to be there, that is fine too — we will work around your routine.',
          speakable: true,
        },
        {
          question: 'Should I clean before the cleaners arrive?',
          answer:
            'You should declutter, not clean. Put away mail, laundry, kids&apos; toys, and anything we cannot clean around. Leave the actual cleaning to us — that is what you booked.',
          speakable: false,
        },
        {
          question: 'How often should I schedule a Deep Cleaning?',
          answer:
            'Most clients book a Deep Cleaning once or twice a year and keep it up with bi-weekly Regular visits in between. Post-renovation, after a long winter, or when moving back into a long-untouched space are also natural times to book one.',
          speakable: false,
        },
      ],
    },
    es: {
      title: 'Cómo preparar su casa para una limpieza profunda',
      description:
        'Lista práctica de un equipo familiar de limpieza en Nueva York y California — qué hacer el día anterior, qué dejarnos a nosotros, y qué esperar.',
      leadParagraph:
        'Las limpiezas profundas funcionan mejor cuando la casa está lista para ser limpiada — no recogida. La versión corta: despeje las superficies, ponga a salvo mascotas y objetos de valor, indíquenos los cuartos que más le importan. Lo demás es nuestro trabajo. Esto es exactamente lo que decimos a cada cliente cuando reserva su primera Limpieza Profunda, ya sea en un walk-up de Brooklyn, una casa unifamiliar en Queens o un condominio en San Francisco.',
      sections: [
        {
          heading: 'El día anterior — ordene, no limpie',
          html: '<p>No necesita limpiar antes de que lleguemos. Sí necesita guardar lo que no podemos limpiar alrededor: las cartas en la mesa, los papeles del colegio, la ropa sobre la cama, la caja de decoraciones navideñas en el comedor. Si no vemos la superficie, no podemos limpiarla a fondo.</p><p>Diez minutos enfocados por cuarto bastan. Ponga cada cosa donde va, o en una caja etiquetada. Lo que sea basura va a la basura — la bolsa la sacamos nosotros.</p>',
        },
        {
          heading: 'La mañana de — mascotas, estacionamiento, acceso',
          html: '<p>Tres cosas importan la mañana de su Limpieza Profunda:</p><ol><li><strong>Mascotas.</strong> Díganos dónde estarán. La aspiradora y los productos estresan a la mayoría de los animales. Un cuarto con la puerta cerrada, una jaula en una esquina tranquila, el patio o la casa de un amigo — lo que las mantenga cómodas y seguras mientras trabajamos.</li><li><strong>Estacionamiento.</strong> En Manhattan, Brooklyn y Queens, cuéntenos sobre los días de limpieza de calle, las reglas de alternate-side, o si el edificio tiene entrada de servicio. En San Francisco, indíquenos el driveway o el estacionamiento de visitas.</li><li><strong>Acceso.</strong> Código de puerta, nombre del conserje, combinación de caja de seguridad, código único de cerradura inteligente — sea lo que sea, lo confirmamos el día anterior. Cada detalle se guarda en privado y solo la persona asignada lo ve para su visita.</li></ol>',
        },
        {
          heading: 'Qué traemos vs qué provee usted',
          html: '<p>Traemos nuestras propias aspiradoras, trapeadores, paños de microfibra, cepillos y herramientas. Usted provee los productos de limpieza — su limpiador de pisos favorito, el desinfectante seguro para sus mesones, el jabón al que sus hijos no son sensibles. Hay una razón: cada casa tiene sus propias superficies, acabados y personas. El producto en el que ya confía es mejor que cualquier cosa genérica que llevaríamos en un kit. Si quiere una lista recomendada, pídala al reservar y se la enviamos.</p>',
        },
        {
          heading: 'Cuánto tiempo toma de verdad',
          html: '<p>Una Limpieza Profunda es un reinicio, no una limpieza recurrente. Para la mayoría de casas es servicio de día completo — generalmente entre cuatro y ocho horas según los metros cuadrados, el número de baños y si quiere extras como horno, refrigerador o gabinetes por dentro. Le daremos un rango de tiempo honesto cuando llame al <a href="tel:+16577377171">(657) 737-7171</a> o envíe sus datos por el <a href="/booking">formulario de reserva</a>.</p><p>Si necesita salir de la casa, está bien — la mayoría de clientes lo hace. Si quiere quedarse, también está bien — trabajamos a su alrededor. Lo que pedimos es libertad para movernos por los cuartos en el orden que tiene sentido para el trabajo, no en el orden que se siente cortés.</p>',
        },
        {
          heading: 'Lo que no necesita hacer',
          html: '<p>No necesita pre-limpiar los baños. No necesita aspirar las alfombras. No necesita pasar el trapo en los mesones de cocina ni vaciar la basura. El trabajo de una Limpieza Profunda es hacer lo que no se ha hecho en meses — detrás y debajo de los muebles, los zócalos, las paredes, la grasa y lechada de la cocina, las ventilaciones. Si hace nuestro trabajo antes de que lleguemos, está pagando por menos de lo que reservó.</p><p>Una última cosa: si hay un cuarto que activamente quiere que saltemos — la oficina, el cuarto del bebé durante la siesta, el cuarto de huéspedes que usa como closet — díganos con anticipación y lo respetamos.</p>',
        },
      ],
      closingCta:
        '¿Listo para reservar su Limpieza Profunda? Llame al <a href="tel:+16577377171">(657) 737-7171</a> de lunes a sábado entre 8am y 6pm, o envíe sus datos por nuestro <a href="/booking">formulario de reserva</a> y le respondemos con una cotización clara el mismo día.',
      faqs: [
        {
          question: '¿Cuánto dura una Limpieza Profunda en un apartamento de 2 habitaciones?',
          answer:
            'Para un apartamento de 2 habitaciones en buen estado, una Limpieza Profunda toma a nuestro equipo entre 4 y 6 horas. Agregar extras como el horno o gabinetes por dentro añade 30 a 60 minutos cada uno. Le damos un rango de tiempo al enviar la cotización para que no haya sorpresas.',
          speakable: true,
        },
        {
          question: '¿Tengo que estar en casa durante una Limpieza Profunda?',
          answer:
            'No. La mayoría de clientes deja una llave con el conserje, nos da el código de la caja de seguridad o un código único de cerradura inteligente, y vuelve a una casa fresca. Si prefiere quedarse, también está bien — trabajamos a su alrededor.',
          speakable: true,
        },
        {
          question: '¿Debo limpiar antes de que lleguen los limpiadores?',
          answer:
            'Debe ordenar, no limpiar. Guarde cartas, ropa, juguetes de los niños y cualquier cosa alrededor de la que no podamos limpiar. Deje la limpieza real para nosotros — para eso reservó.',
          speakable: false,
        },
        {
          question: '¿Con qué frecuencia debo agendar una Limpieza Profunda?',
          answer:
            'La mayoría de clientes reserva una Limpieza Profunda una o dos veces al año y la mantiene con visitas Regulares quincenales en el medio. Después de renovaciones, al final del invierno, o al volver a un espacio que estuvo cerrado mucho tiempo son momentos naturales para reservar una.',
          speakable: false,
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────
  // POST 2 — Hiring a Cleaning Service in NYC: What to Look For
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'hiring-cleaning-service-nyc',
    category: 'Hiring Guide',
    readMinutes: 6,
    publishedDate: '2026-05-23',
    modifiedDate: '2026-05-23',
    cover: '/images/blog/post-2.jpg',
    author: { name: 'The 3 Sisters Family', role: 'Family Owners' },
    en: {
      title: 'Hiring a Cleaning Service in NYC: What to Look For',
      description:
        'A straight checklist for hiring a cleaning company in New York — bonded, insured, background-checked, transparent pricing, and the red flags that should make you walk away.',
      leadParagraph:
        'New York City is its own animal. Manhattan, Brooklyn, and Queens add layers that most cleaning checklists ignore: doormen, freight elevators, alternate-side parking, walk-ups, co-op board rules. Hiring the right cleaning service in New York means asking specific questions before you ever schedule a first visit. Here is the checklist we wish more clients had used before they found us — and what to do with the answers.',
      sections: [
        {
          heading: 'Bonded, insured, background-checked — what each actually means',
          html: '<p>You will see those three words on every cleaning company website. They mean different things, and you should know the difference:</p><ul><li><strong>Bonded</strong> means the company carries a surety bond. If a cleaner damages or steals something, the bond pays you. Ask the company for the name of the bonding agency.</li><li><strong>Insured</strong> means general liability insurance covers accidental damage during a cleaning — broken vase, scratched floor, water leak. Ask for the policy number or a certificate of insurance (COI). Reputable companies share both within a business day.</li><li><strong>Background-checked</strong> means every cleaner on the team has had a criminal background check before stepping into your home. Ask who runs the check and how often it is renewed.</li></ul><p>3 Sisters Services is bonded and insured, and every cleaner is background-checked, screened, and trained before their first visit. We share the COI on request.</p>',
        },
        {
          heading: 'Recurring vs one-time — when each makes sense',
          html: '<p>One-time cleanings cost more per visit because the company cannot plan its route or its team around you. Recurring cleanings (weekly, bi-weekly, monthly) cost less per visit because the schedule is predictable. Most NYC families pick bi-weekly — it keeps the home consistently clean without the budget hit of weekly.</p><p>One-time is the right choice for: post-renovation cleanings, move-in or move-out, Airbnb turnovers between bookings, and the occasional reset before a holiday party. See our <a href="/services">six service options</a> if you are not sure which fits your situation.</p>',
        },
        {
          heading: 'Red flags — walk away if you see these',
          html: '<p>Some signs are subtle. Others should send you straight back to your search:</p><ol><li><strong>Cash-only or Venmo-only.</strong> No traceability for either side. A reputable company processes payments with a hold on a credit or debit card and charges only after the service is complete.</li><li><strong>No COI on request.</strong> If they cannot send proof of insurance, they probably do not have it.</li><li><strong>Flat quote without seeing the space.</strong> A real quote depends on square footage, bedrooms, bathrooms, frequency, and add-ons. A flat number from a website without details means surprise charges later.</li><li><strong>No fixed business hours.</strong> Mon–Sat 8am–6pm with a phone someone actually answers signals an operating business. 24/7 chatbot replies with no callback signal a lead-gen broker, not the cleaning team.</li><li><strong>No clear cancellation policy.</strong> A 24-hour window is standard. Anything vague usually means surprise charges after the fact.</li></ol>',
        },
        {
          heading: 'Borough realities to ask about',
          html: '<p>Geography matters in New York:</p><ul><li><strong>Manhattan.</strong> Doorman or concierge access, freight elevator scheduling for any service appointment over an hour, co-op board rules for certain buildings.</li><li><strong>Brooklyn.</strong> Walk-ups (no elevator), narrow stairwells, and street parking with alternate-side schedules — a 7am start may mean the team has to move a van across the block.</li><li><strong>Queens.</strong> Mixed building types, longer drives between visits, often the most flexibility on start times.</li></ul><p>A team that already cleans your borough knows these realities without being told twice.</p>',
        },
        {
          heading: 'Pricing transparency — what an honest quote looks like',
          html: '<p>An honest cleaning quote lists what is included, what costs extra, and how billing works. Ours always says: the base price for the service tier, the add-ons (inside oven, inside fridge, inside cabinets, extra bathrooms, laundry), the frequency discount if you book recurring, and the payment terms (card hold at booking, charge after the cleaning is complete and you are satisfied). No hidden fees. No travel surcharges in our service areas.</p><p>If you have a price question we have not answered, our <a href="/faq">FAQ page</a> covers the common ones, or call <a href="tel:+16577377171">(657) 737-7171</a> and ask directly.</p>',
        },
      ],
      closingCta:
        'Looking for a cleaning service in NYC that meets every item on this list? Send your details through the <a href="/booking">booking form</a> or call <a href="tel:+16577377171">(657) 737-7171</a> Monday through Saturday. Same-day quotes, no obligation.',
      faqs: [
        {
          question: 'What is the average cost of a cleaning service in NYC?',
          answer:
            'In New York City, a recurring 1-bedroom Regular Cleaning typically runs $130 to $180 and a 2-bedroom $170 to $230, depending on frequency, add-ons, and building type. Deep Cleanings and Move-In/Out jobs cost more because they take longer. We quote each home individually — call (657) 737-7171 for an honest number for yours.',
          speakable: false,
        },
        {
          question: 'How do I know if a cleaning company is legitimate?',
          answer:
            'Check three things: a phone number with real business hours someone answers, a certificate of insurance they can send on request, and a clear cancellation policy in writing. If any of those three are missing, look elsewhere.',
          speakable: true,
        },
        {
          question: 'Do NYC cleaning services bring their own supplies?',
          answer:
            'Some do, some do not. We bring vacuums, mops, microfiber cloths, and tools, but we ask clients to provide their own cleaning products. That way we use what you already trust in your home — your floor cleaner, your disinfectant, your soap.',
          speakable: true,
        },
        {
          question: 'Can I tip the cleaners, and is it expected?',
          answer:
            'Tipping is appreciated but never expected. If you are happy with the work, a 10 to 20 percent tip is the common range in NYC. Cash or app are both fine. The cleaner sees 100% of the tip.',
          speakable: false,
        },
      ],
    },
    es: {
      title: 'Cómo contratar un servicio de limpieza en NYC: lo que debe buscar',
      description:
        'Lista directa para contratar una empresa de limpieza en Nueva York — bonded, asegurada, antecedentes verificados, precios transparentes y las señales de alerta.',
      leadParagraph:
        'Nueva York es su propio mundo. Manhattan, Brooklyn y Queens añaden capas que la mayoría de las listas ignoran: porteros, montacargas, alternate-side parking, walk-ups, reglas de juntas de co-op. Contratar el servicio correcto en Nueva York significa hacer preguntas específicas antes de agendar la primera visita. Aquí está la lista que desearíamos que más clientes hubieran usado antes de encontrarnos — y qué hacer con las respuestas.',
      sections: [
        {
          heading: 'Bonded, asegurada, antecedentes verificados — qué significa cada uno',
          html: '<p>Verá esas tres palabras en cada sitio de limpieza. Significan cosas distintas, y usted debe saber la diferencia:</p><ul><li><strong>Bonded</strong> significa que la empresa tiene un surety bond. Si una persona del equipo daña o se lleva algo, el bond le paga a usted. Pida el nombre de la agencia que emite el bond.</li><li><strong>Asegurada</strong> significa que tiene seguro de responsabilidad civil para daños accidentales durante una limpieza — un florero roto, un piso rayado, una fuga. Pida el número de póliza o un certificado de seguro (COI). Las empresas serias lo envían en un día hábil.</li><li><strong>Antecedentes verificados</strong> significa que cada persona del equipo pasa una verificación de antecedentes antes de entrar a su casa. Pregunte quién hace la verificación y con qué frecuencia se renueva.</li></ul><p>3 Sisters Services tiene bond y seguro completos, y cada limpiadora pasa verificación de antecedentes, evaluación y entrenamiento antes de su primera visita. Enviamos el COI a pedido.</p>',
        },
        {
          heading: 'Recurrente vs única — cuándo cada una tiene sentido',
          html: '<p>Las limpiezas únicas cuestan más por visita porque la empresa no puede planear su ruta ni su equipo alrededor de usted. Las recurrentes (semanal, quincenal, mensual) cuestan menos por visita porque el calendario es predecible. La mayoría de familias en NYC escoge quincenal — mantiene la casa consistentemente limpia sin el impacto de presupuesto de la semanal.</p><p>La opción única es correcta para: limpieza post-renovación, mudanza de entrada o salida, turnovers de Airbnb entre reservas, y el reinicio ocasional antes de una fiesta. Vea nuestros <a href="/services">seis servicios</a> si no está seguro cuál encaja con su situación.</p>',
        },
        {
          heading: 'Señales de alerta — váyase si ve esto',
          html: '<p>Algunas señales son sutiles. Otras deberían mandarle de regreso a su búsqueda:</p><ol><li><strong>Solo efectivo o solo Venmo.</strong> Sin trazabilidad para ninguna parte. Una empresa seria procesa pagos con una retención en tarjeta de crédito o débito y cobra solo después de terminar.</li><li><strong>Sin COI cuando se pide.</strong> Si no pueden enviar prueba de seguro, probablemente no la tienen.</li><li><strong>Cotización fija sin ver el espacio.</strong> Una cotización real depende de metros cuadrados, habitaciones, baños, frecuencia y extras. Un número fijo de un sitio web sin detalles significa cargos sorpresa después.</li><li><strong>Sin horario fijo.</strong> Lun–Sáb 8am–6pm con un teléfono que alguien contesta señala un negocio operativo. Respuestas de chatbot 24/7 sin devolución de llamada señalan un broker de leads, no el equipo de limpieza.</li><li><strong>Política de cancelación poco clara.</strong> Una ventana de 24 horas es estándar. Cualquier cosa vaga generalmente significa cargos sorpresa después.</li></ol>',
        },
        {
          heading: 'Realidades de cada condado que debe preguntar',
          html: '<p>La geografía importa en Nueva York:</p><ul><li><strong>Manhattan.</strong> Acceso con portero o conserje, agendar montacarga para cualquier visita de servicio mayor a una hora, reglas de junta de co-op en ciertos edificios.</li><li><strong>Brooklyn.</strong> Walk-ups (sin elevador), escaleras angostas, estacionamiento en calle con horarios alternate-side — un inicio a las 7am puede significar mover la camioneta de cuadra.</li><li><strong>Queens.</strong> Tipos de edificio mixtos, trayectos más largos entre visitas, a menudo la mayor flexibilidad en horas de inicio.</li></ul><p>Un equipo que ya limpia en su condado conoce estas realidades sin que se las repita dos veces.</p>',
        },
        {
          heading: 'Precio transparente — cómo se ve una cotización honesta',
          html: '<p>Una cotización honesta lista qué está incluido, qué cuesta extra y cómo funciona la facturación. La nuestra siempre dice: el precio base del tipo de servicio, los extras (horno, refrigerador, gabinetes por dentro, baños extra, lavandería), el descuento por frecuencia si reserva recurrente, y los términos de pago (retención al reservar, cobro después de terminar la limpieza y estar conforme). Sin cargos ocultos. Sin recargos por traslado en nuestras áreas.</p><p>Si tiene una pregunta de precio que no respondimos, nuestra <a href="/faq">página de FAQ</a> cubre las más comunes, o llame al <a href="tel:+16577377171">(657) 737-7171</a> y pregunte directamente.</p>',
        },
      ],
      closingCta:
        '¿Busca un servicio de limpieza en NYC que cumpla cada punto de esta lista? Envíe sus datos por el <a href="/booking">formulario de reserva</a> o llame al <a href="tel:+16577377171">(657) 737-7171</a> de lunes a sábado. Cotizaciones el mismo día, sin compromiso.',
      faqs: [
        {
          question: '¿Cuánto cuesta en promedio un servicio de limpieza en NYC?',
          answer:
            'En Nueva York, una Limpieza Regular recurrente de 1 habitación va de $130 a $180 y una de 2 habitaciones de $170 a $230, según la frecuencia, los extras y el tipo de edificio. Las Limpiezas Profundas y de Mudanza cuestan más porque toman más tiempo. Cotizamos cada casa individualmente — llame al (657) 737-7171 para un número honesto para la suya.',
          speakable: false,
        },
        {
          question: '¿Cómo sé si una empresa de limpieza es legítima?',
          answer:
            'Revise tres cosas: un teléfono con horario real que alguien conteste, un certificado de seguro que puedan enviar a pedido, y una política de cancelación clara por escrito. Si falta cualquiera de las tres, busque en otro lado.',
          speakable: true,
        },
        {
          question: '¿Los servicios de limpieza en NYC traen sus propios productos?',
          answer:
            'Algunos sí, otros no. Nosotros traemos aspiradoras, trapeadores, paños de microfibra y herramientas, pero pedimos que los clientes provean sus propios productos. Así usamos lo que usted ya confía en su casa — su limpiador de pisos, su desinfectante, su jabón.',
          speakable: true,
        },
        {
          question: '¿Se puede dar propina y es esperado?',
          answer:
            'La propina se agradece pero no se espera. Si quedó conforme con el trabajo, un 10 a 20 por ciento es el rango común en NYC. Efectivo o app, ambos están bien. La persona del equipo recibe el 100% de la propina.',
          speakable: false,
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────
  // POST 3 — The Airbnb Cleaning Checklist for 5-Star Reviews
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'airbnb-cleaning-checklist',
    category: 'Hosts',
    readMinutes: 4,
    publishedDate: '2026-05-23',
    modifiedDate: '2026-05-23',
    cover: '/images/blog/post-3.jpg',
    author: { name: 'The 3 Sisters Family', role: 'Family Owners' },
    en: {
      title: 'The Airbnb Cleaning Checklist for 5-Star Reviews',
      description:
        'What guests actually notice when they walk into your short-term rental — the non-negotiables, the 5-star details, and how to handle same-day turnovers without losing your evening.',
      leadParagraph:
        'Five-star Airbnb reviews almost always come down to two things: the photos matched the listing, and the place was actually clean when the guest walked in. The first is your job at the start of the listing. The second is the job of every turnover. We have been doing Airbnb turnovers in New York and California long enough to know exactly what guests notice — and what they grade you on without ever leaving a comment about it.',
      sections: [
        {
          heading: 'The non-negotiables — guests will not forgive these',
          html: '<p>Three things will tank your rating no matter how nice your listing photos are:</p><ol><li><strong>The bed.</strong> Fresh linens, made hospitality-style (corners tucked, pillows arranged, throw on the foot of the bed). A hair on the pillow ends the review before it starts.</li><li><strong>The bathroom.</strong> No hair anywhere — drain, tub, vanity, floor. Toilet bowl scrubbed and the seat down. Fresh towels folded or rolled. Soap and toilet paper restocked. A clean smell, not a perfumed one.</li><li><strong>The kitchen.</strong> No food in the fridge from the last guest. Sink empty and dry. Counters wiped. Dishwasher empty. Trash bag out, new bag in. Coffee station ready if you offer one.</li></ol><p>If any of these three are wrong, the review will say so. If all three are right, the review will not mention them — they are the floor, not the ceiling.</p>',
        },
        {
          heading: 'The details that earn 5 stars',
          html: '<p>The 5-star bumps come from things guests do not expect:</p><ul><li><strong>Scent.</strong> A neutral, clean smell at the door — not floral, not chemical. Open a window for ten minutes before they arrive if you have time.</li><li><strong>Lighting.</strong> Lamps turned on, blinds at a welcoming half-open. The walk-in moment matters.</li><li><strong>Restock basics.</strong> Toilet paper backup, dish soap, hand soap, sponge, salt and pepper, sugar, coffee, tea. Small stuff. Guests notice.</li><li><strong>Presentation.</strong> A folded note, a small welcome touch, slippers by the door if you offer them, towels arranged neatly. None of this is cleaning — but the cleaner who notices is the cleaner who delivers 5-star turnovers.</li></ul>',
        },
        {
          heading: 'Same-day turnover logistics',
          html: '<p>Most STR turnovers happen between an 11am checkout and a 3pm check-in. That is a four-hour window — minus drive time, parking, and the elevator wait in Manhattan or the freight schedule in some Brooklyn buildings. We plan our Airbnb routes so that one team stays in your neighborhood across multiple properties in a single shift. If you manage more than one unit, ask about route bundling when you call <a href="tel:+16577377171">(657) 737-7171</a>.</p><p>Our <a href="/services">Airbnb &amp; Vacation Rental Cleaning</a> includes linen change, full dust and surface clean, mirror and window care, kitchen sanitization with basic restock, bathroom reset, trash and liner replacement, a lost-and-found sweep, and a final scent and presentation check.</p>',
        },
        {
          heading: 'Lost-and-found and damage protocol',
          html: '<p>Guests leave things behind every week. Chargers, water bottles, a single sock, sometimes a passport. We log everything we find during the turnover with a photo and timestamp and message you before the next guest checks in — you decide whether to ship, hold, or discard. We also log anything that arrived broken or marked so you can flag the previous guest with Airbnb before the new one walks into the same issue.</p>',
        },
      ],
      closingCta:
        'Running one Airbnb or twenty in New York or California? Schedule a turnover or talk through your portfolio with us — call <a href="tel:+16577377171">(657) 737-7171</a> or send your details through the <a href="/booking">booking form</a>.',
      faqs: [
        {
          question: 'How long does a typical Airbnb turnover take?',
          answer:
            'A studio or 1-bedroom turnover takes our team 60 to 90 minutes. A 2-bedroom 90 to 120 minutes. Larger units or units with hot tubs and saunas take longer and we quote those individually. Linen change and basic restock are always included.',
          speakable: true,
        },
        {
          question: 'Do you provide linens for Airbnb turnovers?',
          answer:
            'We change the linens, but we do not supply them. Most hosts keep two or three sets per bed in a closet so the dirty set goes out and the clean set goes on the bed during the same turnover. We can pick up your laundry and return it next visit if you set that up at booking.',
          speakable: false,
        },
        {
          question: 'Can you handle same-day turnovers between checkout and check-in?',
          answer:
            'Yes — same-day turnovers in the standard 11am-to-3pm window are our most common Airbnb job. Bundle multiple units in the same neighborhood to make the timing safer. Call (657) 737-7171 to set up a recurring turnover schedule.',
          speakable: true,
        },
      ],
    },
    es: {
      title: 'La lista de limpieza Airbnb para reseñas de 5 estrellas',
      description:
        'Qué notan los huéspedes cuando entran a su renta de corto plazo — lo no negociable, los detalles de 5 estrellas y cómo manejar turnovers el mismo día.',
      leadParagraph:
        'Las reseñas de 5 estrellas en Airbnb casi siempre se reducen a dos cosas: las fotos coincidían con el anuncio, y el lugar estaba realmente limpio cuando el huésped entró. La primera es su trabajo al inicio del anuncio. La segunda es el trabajo de cada turnover. Hemos hecho turnovers de Airbnb en Nueva York y California el suficiente tiempo para saber exactamente qué notan los huéspedes — y por qué los califican sin nunca dejar un comentario sobre eso.',
      sections: [
        {
          heading: 'Lo no negociable — los huéspedes no perdonan esto',
          html: '<p>Tres cosas hunden su rating sin importar qué tan lindas sean las fotos del anuncio:</p><ol><li><strong>La cama.</strong> Sábanas frescas, tendida estilo hotel (esquinas metidas, almohadas acomodadas, manta a los pies). Un pelo en la almohada termina la reseña antes de empezar.</li><li><strong>El baño.</strong> Sin pelos en ningún lado — desagüe, tina, vanity, piso. Inodoro tallado y la tapa abajo. Toallas frescas dobladas o enrolladas. Jabón y papel higiénico reabastecidos. Olor a limpio, no a perfume.</li><li><strong>La cocina.</strong> Sin comida del último huésped en el refrigerador. Fregadero vacío y seco. Mesones limpios. Lavavajillas vacío. Bolsa de basura afuera, bolsa nueva adentro. Estación de café lista si la ofrece.</li></ol><p>Si cualquiera de las tres falla, la reseña lo dirá. Si las tres están bien, la reseña no las mencionará — son el piso, no el techo.</p>',
        },
        {
          heading: 'Los detalles que ganan 5 estrellas',
          html: '<p>El salto a 5 estrellas viene de cosas que los huéspedes no esperan:</p><ul><li><strong>Aroma.</strong> Olor neutro y limpio en la puerta — ni floral ni químico. Abra una ventana diez minutos antes de que lleguen si tiene tiempo.</li><li><strong>Iluminación.</strong> Lámparas encendidas, persianas a media apertura acogedora. El momento de entrar importa.</li><li><strong>Reabastecer básicos.</strong> Reserva de papel higiénico, lavavajillas, jabón de manos, esponja, sal y pimienta, azúcar, café, té. Cosas pequeñas. Los huéspedes lo notan.</li><li><strong>Presentación.</strong> Una nota doblada, un detalle pequeño de bienvenida, pantuflas en la puerta si las ofrece, toallas acomodadas. Nada de esto es limpieza — pero la persona que lo nota es la que entrega turnovers de 5 estrellas.</li></ul>',
        },
        {
          heading: 'Logística de turnover el mismo día',
          html: '<p>La mayoría de turnovers de STR pasan entre un check-out a las 11am y un check-in a las 3pm. Esa es una ventana de cuatro horas — menos el trayecto, el estacionamiento y la espera del elevador en Manhattan o el horario del montacarga en algunos edificios de Brooklyn. Planeamos nuestras rutas de Airbnb para que un equipo se quede en su zona cubriendo varias propiedades en un mismo turno. Si maneja más de una unidad, pregunte sobre bundling de rutas al llamar al <a href="tel:+16577377171">(657) 737-7171</a>.</p><p>Nuestra <a href="/services">Limpieza de Airbnb y Renta Vacacional</a> incluye cambio de sábanas, limpieza completa de polvo y superficies, espejos y ventanas, sanitización de cocina con reabasto básico, reinicio del baño, basura y bolsa nueva, revisión de objetos olvidados, y verificación final de aroma y presentación.</p>',
        },
        {
          heading: 'Protocolo de objetos olvidados y daños',
          html: '<p>Los huéspedes olvidan cosas cada semana. Cargadores, botellas de agua, un solo calcetín, a veces un pasaporte. Registramos todo lo que encontramos durante el turnover con foto y hora y le avisamos antes de que el próximo huésped entre — usted decide si envía, guarda o descarta. También registramos cualquier cosa que llegó rota o marcada para que pueda señalar al huésped anterior con Airbnb antes de que el nuevo entre al mismo problema.</p>',
        },
      ],
      closingCta:
        '¿Maneja un Airbnb o veinte en Nueva York o California? Agende un turnover o conversemos sobre su portafolio — llame al <a href="tel:+16577377171">(657) 737-7171</a> o envíe sus datos por el <a href="/booking">formulario de reserva</a>.',
      faqs: [
        {
          question: '¿Cuánto dura un turnover típico de Airbnb?',
          answer:
            'Un turnover de estudio o 1 habitación toma a nuestro equipo de 60 a 90 minutos. Un 2 habitaciones de 90 a 120 minutos. Unidades más grandes o con jacuzzi y sauna toman más y las cotizamos individualmente. Cambio de sábanas y reabasto básico siempre incluidos.',
          speakable: true,
        },
        {
          question: '¿Proveen las sábanas para los turnovers de Airbnb?',
          answer:
            'Cambiamos las sábanas pero no las proveemos. La mayoría de hosts guarda dos o tres juegos por cama en un closet para que el juego sucio salga y el limpio entre en el mismo turnover. Podemos recoger su lavandería y devolverla en la próxima visita si lo configura al reservar.',
          speakable: false,
        },
        {
          question: '¿Pueden hacer turnovers el mismo día entre checkout y check-in?',
          answer:
            'Sí — los turnovers el mismo día en la ventana estándar de 11am a 3pm son nuestro trabajo de Airbnb más común. Agrupar varias unidades en el mismo barrio hace el timing más seguro. Llame al (657) 737-7171 para configurar un calendario recurrente.',
          speakable: true,
        },
      ],
    },
  },
];

export function getBlogPost(slug: string): BlogPostContent | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}
