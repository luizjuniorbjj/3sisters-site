import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/data/site';

export const PricingSection = () => {
  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background image with soft overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/hero/whychoose-bg.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/92" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-blue-600 uppercase tracking-wide mb-3">
            Our Packages
          </p>
          <h2 className="font-outfit font-bold text-4xl sm:text-5xl text-slate-900 mb-4">
            Choose How Often You Want Us.
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            One-time, recurring, or commercial — every plan includes our bonded &amp; insured
            team and the same standard of care across New York and California.
            All pricing is custom-quoted based on your space, frequency, and add-ons.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteConfig.pricing.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl transition-all duration-200 ${
                plan.isPopular
                  ? 'border-2 border-blue-600 bg-white shadow-lg scale-105'
                  : 'border border-slate-200 bg-white shadow-sm hover:shadow-md'
              }`}
            >
              <div className="p-8">
                {/* Popular Badge */}
                {plan.isPopular && (
                  <Badge variant="primary" className="mb-4 justify-center w-full">
                    Most Popular
                  </Badge>
                )}

                {/* Plan Name */}
                <h3 className="font-outfit font-bold text-2xl text-slate-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-slate-600 text-sm mb-6">{plan.description}</p>

                {/* Custom Quote Callout */}
                <div className="mb-8">
                  <p className="font-outfit font-bold text-2xl text-slate-900 mb-1">
                    Custom Quote
                  </p>
                  <p className="text-sm text-slate-600">
                    Priced by space, frequency &amp; add-ons
                  </p>
                </div>

                {/* CTA Button — commercial card routes to the contact form
                    (consultative quote), matching the Office & Commercial
                    service page; residential plans go to online booking. */}
                <Button
                  variant={plan.isPopular ? 'primary' : 'outline'}
                  size="lg"
                  className="w-full mb-8"
                  href={plan.id === 'commercial' ? '/contact?service=office-commercial' : '/booking'}
                >
                  {plan.cta}
                </Button>

                {/* Features List */}
                <div className="space-y-4">
                  <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                    What's Included
                  </p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
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
                        <span className="text-slate-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ or Info */}
        <div className="mt-16 text-center">
          <p className="text-slate-600 mb-4">
            All plans include a bonded &amp; insured, background-checked team and our care, trust,
            and flexibility promise. Final pricing is custom-quoted based on your space.
          </p>
          <a
            href="/contact"
            className="inline-block text-blue-600 hover:text-blue-700 font-medium"
          >
            Talk to Us About a Custom Quote →
          </a>
        </div>
      </div>
    </section>
  );
};
