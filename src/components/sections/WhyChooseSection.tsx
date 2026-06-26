import Link from 'next/link';
import { siteConfig } from '@/data/site';

export const WhyChooseSection = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <div className="flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 w-fit bg-white border border-slate-200 rounded-full px-4 py-2">
              <span className="text-2xl font-outfit font-bold text-blue-600">
                2
              </span>
              <span className="text-sm font-medium text-slate-700">
                States · Family-Owned
              </span>
            </div>

            <h2 className="font-outfit font-bold text-4xl sm:text-5xl leading-tight text-slate-900">
              We Don&apos;t Just Clean, We Care For Your Home.
            </h2>

            <p className="text-lg text-slate-600">
              We&apos;re a family-owned cleaning company serving New York and California.
              Bonded, insured, and background-checked — our team
              treats every home and office like our own.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6 mt-4">
              {siteConfig.whyChoose.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-outfit font-bold text-slate-900 mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-slate-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mt-4"
            >
              More About Us
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-6">
            {/* Image */}
            <div className="rounded-2xl h-96 relative overflow-hidden">
              <img
                src="/images/hero/whychoose-bg.jpg"
                alt="Modern, organized living space"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Quote Card */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
              <blockquote className="text-slate-700 italic mb-4">
                &ldquo;Finally found a company I can trust! 3Sisters keeps my home spotless every
                week. The ladies are super friendly and pay great attention to detail.&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                  AJ
                </div>
                <div>
                  <p className="font-outfit font-bold text-slate-900">Amanda J.</p>
                  <p className="text-sm text-slate-600">Brooklyn, NY · Regular Cleaning</p>
                </div>
              </div>
            </div>

            {/* Scrolling Tags */}
            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <p className="text-xs text-slate-600 uppercase tracking-wide mb-3">
                What We Offer
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Regular Cleaning',
                  'Deep Cleaning',
                  'Move-In / Move-Out',
                  'Airbnb Turnovers',
                  'Office & Commercial',
                  'Personal Organizing',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
