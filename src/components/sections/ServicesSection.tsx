'use client';

import { useState } from 'react';
import { siteConfig } from '@/data/site';

export const ServicesSection = () => {
  const services = siteConfig.services;
  const [activeTab, setActiveTab] = useState(services[0]?.id || '');
  const activeService = services.find((s) => s.id === activeTab);

  // Tabs auto-generated from services (6 real services from 3 Sisters)
  const tabs = services.map((s) => ({
    id: s.id,
    // Short label fits the tab better — derive from full name
    label: s.name
      .replace('Cleaning', '')
      .replace('Services', '')
      .replace(' & Vacation Rental', '')
      .replace(' & Commercial', ' / Commercial')
      .trim(),
  }));

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-blue-600 uppercase tracking-wide mb-3">
            Our Expertise
          </p>
          <h2 className="font-outfit font-bold text-4xl sm:text-5xl text-slate-900 mb-4">
            Tailored Cleaning{' '}
            <span className="text-blue-600">Excellence.</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From residential homes to commercial spaces, we deliver professional cleaning
            solutions tailored to your specific needs.
          </p>
        </div>

        {/* Tab Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeService && (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div>
                <p className="text-sm font-medium text-blue-600 uppercase tracking-wide mb-3">
                  Service Overview
                </p>
                <h3 className="font-outfit font-bold text-3xl text-slate-900 mb-4">
                  {activeService.name}
                </h3>
                <p className="text-lg text-slate-600 mb-8">
                  {activeService.description}
                </p>

                <div className="space-y-4 mb-8">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Est. Duration</p>
                    <p className="font-outfit font-bold text-lg text-slate-900">
                      {activeService.estimatedTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Pricing</p>
                    <p className="font-outfit font-bold text-lg text-blue-600">
                      Custom Quote
                    </p>
                  </div>
                </div>

                <a
                  href="/booking"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                  Book This Service
                </a>
              </div>

              <div className="rounded-xl h-96 overflow-hidden">
                {activeService.image ? (
                  <img
                    src={activeService.image}
                    alt={activeService.name}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="bg-gradient-to-br from-blue-100 to-blue-50 w-full h-full" />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
