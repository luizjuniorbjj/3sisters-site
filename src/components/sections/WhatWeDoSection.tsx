import { Badge } from '@/components/ui/Badge';

export const WhatWeDoSection = () => {
  const cards = [
    {
      title: 'Residential Care',
      description: 'Regular, deep, and move-in/out cleaning for homes and apartments. Customizable schedules with the same trusted cleaner whenever possible.',
      features: [
        'Regular & deep cleaning',
        'Move-in / move-out resets',
        'Add-ons: oven, fridge, cabinets, windows',
        'Weekly, bi-weekly, or monthly',
      ],
      stat: '100%',
      statLabel: 'Bonded & Insured',
      bgGradient: 'from-blue-100 to-blue-50',
    },
    {
      title: 'Office & Commercial',
      description: 'Recurring office cleaning scheduled around your business hours. Restrooms, breakrooms, common areas — we keep your workspace ready every day.',
      features: [
        'Office & workspace cleaning',
        'After-hours service available',
        'Restroom & breakroom care',
        'Custom schedule',
      ],
      stat: 'Mon–Sat',
      statLabel: '8am – 6pm',
      cta: { text: 'Book Now', href: '/booking' },
      bgGradient: 'from-green-100 to-green-50',
    },
    {
      title: 'Airbnb & Organizing',
      description: 'Same-day Airbnb turnovers with linen change and restock — plus personal organizing for closets, pantries, and storage spaces.',
      features: [
        'Airbnb turnover ready',
        'Linen change & restock',
        'Decluttering & organizing',
        'Custom storage solutions',
      ],
      cta: { text: 'Contact Us', href: '/contact' },
      bgGradient: 'from-purple-100 to-purple-50',
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-blue-600 uppercase tracking-wide mb-3">
            What We Do
          </p>
          <h2 className="font-outfit font-bold text-4xl sm:text-5xl text-slate-900 mb-6">
            Bespoke Cleaning Solutions for <span className="text-blue-600">Exceptional Living.</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${card.bgGradient} rounded-2xl p-8 flex flex-col h-full`}
            >
              <h3 className="font-outfit font-bold text-2xl text-slate-900 mb-3">
                {card.title}
              </h3>
              <p className="text-slate-700 mb-6 flex-grow">
                {card.description}
              </p>

              {/* Features List */}
              <ul className="space-y-2 mb-8">
                {card.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Stat or CTA */}
              {card.stat ? (
                <div className="bg-white rounded-lg p-4">
                  <p className="text-3xl font-outfit font-bold text-blue-600 mb-1">
                    {card.stat}
                  </p>
                  <p className="text-xs font-medium text-slate-600">
                    {card.statLabel}
                  </p>
                </div>
              ) : (
                card.cta && (
                  <a
                    href={card.cta.href}
                    className="inline-block px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors duration-200"
                  >
                    {card.cta.text}
                  </a>
                )
              )}
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="bg-slate-900 rounded-2xl p-8 sm:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { stat: '100%', label: 'Bonded & Insured' },
              { stat: '100%', label: 'Background Checked' },
              { stat: 'Family', label: 'Owned & Operated' },
            ].map((item, i) => (
              <div key={i}>
                <p className="font-outfit font-bold text-4xl text-white mb-2">
                  {item.stat}
                </p>
                <p className="text-slate-400 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
