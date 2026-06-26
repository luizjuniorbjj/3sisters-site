'use client';

import { Badge } from '@/components/ui/Badge';
import { siteConfig } from '@/data/site';

export const TestimonialsSection = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="primary" className="justify-center mb-6">
            Real Reviews from Real Clients
          </Badge>
          <h2 className="font-outfit font-bold text-4xl sm:text-5xl text-slate-900 mb-4">
            Loved by Locals, Trusted by Families.
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From Manhattan to San Francisco — here&apos;s what our clients
            say about working with 3 Sisters Services.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {siteConfig.testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-700 font-inter mb-6">
                "{testimonial.quote}"
              </p>

              {/* Author Info */}
              <div>
                <p className="font-outfit font-bold text-slate-900">
                  {testimonial.author}
                </p>
                <p className="text-sm text-slate-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner — replaces placeholder video block */}
        <div className="rounded-2xl overflow-hidden relative h-72 sm:h-96">
          <img
            src="/images/hero/cta-team.jpg"
            alt="3 Sisters cleaning team ready to help"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/70 to-slate-900/40" />
          <div className="relative h-full flex flex-col items-start justify-center p-8 sm:p-12 max-w-2xl">
            <p className="text-blue-200 text-sm font-medium uppercase tracking-wide mb-3">
              Ready to start?
            </p>
            <h3 className="font-outfit font-bold text-3xl sm:text-4xl text-white mb-4">
              Join the families who trust 3 Sisters every week.
            </h3>
            <p className="text-slate-200 mb-6">
              Get a free, no-obligation quote in minutes. Bonded, insured, and background-checked — care, trust, and flexibility on every visit.
            </p>
            <a
              href="/booking"
              className="inline-block bg-white text-slate-900 font-medium px-6 py-3 rounded-lg hover:bg-slate-100 transition-colors duration-200"
            >
              Get a Free Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
