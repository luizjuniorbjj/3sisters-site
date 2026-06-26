'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const HeroSection = () => {
  const [frequency, setFrequency] = useState<'one-time' | 'weekly'>('one-time');
  const [homeSize, setHomeSize] = useState('3-bed');

  // Build booking URL with pre-filled selections (passes intent to /booking page).
  const bookingHref = `/booking?service=${frequency === 'weekly' ? 'recurring' : 'one-time'}&size=${homeSize}`;

  return (
    <section className="relative bg-gradient-to-b from-slate-50 to-white pt-4 sm:pt-12 lg:pt-20 pb-12 sm:pb-20 lg:pb-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 lg:items-center">
          {/* Left Side — text/CTAs (below photo on mobile, left-column on desktop) */}
          <div className="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1 lg:col-span-2">
            <Badge variant="outline" className="w-fit">
              FAMILY-OWNED · BONDED &amp; INSURED
            </Badge>

            <h1 className="font-outfit font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight text-slate-900">
              Family-Owned Cleaning,{' '}
              <span className="relative">
                <span className="text-blue-600">Trusted</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-green-200 -z-10"></span>
              </span>{' '}
              across New York &amp; California.
            </h1>

            <p className="text-lg text-slate-600 max-w-xl">
              Regular, deep, move-in/out, Airbnb, office and personal organizing services in New York and California. Bonded, insured, and background-checked — care, trust, and flexibility on every visit.
            </p>

            {/* Badges Row */}
            <div className="flex flex-wrap gap-4">
              {['Bonded & Insured', 'Background Checked', 'Family-Owned'].map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg"
                >
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-slate-900">{badge}</span>
                </div>
              ))}
            </div>

            {/* Buttons — desktop only (mobile has Book Now + Call below hero photo) */}
            <div className="hidden lg:flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" href="/services">
                View Services
              </Button>
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                How it works
              </Button>
            </div>
          </div>

          {/* Right Side - Hero photo + Quick Estimate Card (first on mobile, right-column on desktop) */}
          <div className="relative w-full lg:h-[560px] order-1 lg:order-2 lg:col-span-3">
            {/* Hero photo — stacked on mobile, fills container on desktop */}
            <img
              src="/images/hero/cleaning-team.jpg"
              alt="3 Sisters Services cleaning team at work"
              className="block w-full aspect-[3/2] lg:aspect-auto lg:absolute lg:inset-0 lg:h-full object-cover object-top rounded-3xl sm:rounded-[32px] lg:rounded-2xl shadow-lg lg:shadow-xl"
            />

            {/* Quick Quote Bar — stacked below photo on mobile, floating overlay on desktop */}
            <div className="relative mt-4 lg:mt-0 lg:absolute lg:left-6 lg:right-6 lg:bottom-4 bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 lg:p-4 shadow-xl lg:shadow-2xl z-10">
              {/* Header Banner */}
              <div className="flex items-center gap-2.5 mb-3 p-2.5 bg-gradient-to-r from-blue-50 to-blue-50/40 rounded-xl border border-blue-100">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap leading-tight">
                    <h3 className="font-outfit font-bold text-base text-slate-900">
                      Quick Quote
                    </h3>
                    <Badge variant="primary">Free · Fast</Badge>
                    <span className="hidden lg:inline text-[11px] text-slate-600">
                      · No commitment · Bonded &amp; Insured
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 lg:hidden">
                    Custom quote · No commitment · Bonded &amp; Insured
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-3">
                {/* Frequency */}
                <div className="flex-1 min-w-0">
                  <label className="block text-xs font-medium text-slate-500 uppercase tracking-wide mb-1.5">
                    Frequency
                  </label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value as 'one-time' | 'weekly')}
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg font-inter text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="one-time">One-time</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>

                {/* Home Size */}
                <div className="flex-1 min-w-0">
                  <label className="block text-xs font-medium text-slate-500 uppercase tracking-wide mb-1.5">
                    Home Size
                  </label>
                  <select
                    value={homeSize}
                    onChange={(e) => setHomeSize(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg font-inter text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="1-bed">1 Bedroom</option>
                    <option value="2-bed">2 Bedrooms</option>
                    <option value="3-bed">3 Bedrooms</option>
                    <option value="4bed-plus">4+ Bedrooms</option>
                  </select>
                </div>

                {/* CTA */}
                <div className="sm:pl-1">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto lg:h-[42px] lg:px-8 lg:text-base lg:py-0 whitespace-nowrap"
                    href={bookingHref}
                  >
                    Get a Free Quote
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
