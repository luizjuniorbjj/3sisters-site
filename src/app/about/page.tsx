'use client';

import { useState } from 'react';
import { PageHero } from '@/components/layout/PageHero';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CTASection } from '@/components/sections/CTASection';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { teamMembers, stats } from '@/data/site';
import { CheckCircle2, ChevronRight, Building2, Instagram } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
        ]}
      />
      {/* Hero */}
      <section className="bg-gradient-to-b from-rose-50/30 to-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Badge variant="primary" className="mb-6">WHO WE ARE</Badge>
          <h1 className="font-outfit font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-900 mb-6 max-w-3xl">
            More Than Just a{' '}
            <span className="relative inline-block">
              <span className="text-blue-600">Cleaning Company.</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-green-200/60 -z-10" />
            </span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mb-12">
            A family-owned cleaning company serving New York and California with care, trust, and flexibility. We treat every home and office like our own.
          </p>

          {/* Stats */}
          <div className="border-t border-slate-200 pt-8 flex flex-wrap gap-12">
            <div>
              <p className="font-outfit font-bold text-4xl text-slate-900">100%</p>
              <p className="text-sm text-slate-500">Bonded &amp; Insured</p>
            </div>
            <div>
              <p className="font-outfit font-bold text-4xl text-slate-900">3</p>
              <p className="text-sm text-slate-500">States Served</p>
            </div>
            <div>
              <p className="font-outfit font-bold text-4xl text-slate-900">6</p>
              <p className="text-sm text-slate-500">Cleaning Services</p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Quote */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1">
            <Badge variant="outline" className="mb-4">Family-Owned</Badge>
            <p className="text-slate-500 text-sm mb-2">Built on care, trust, and flexibility.</p>
            <blockquote className="text-2xl sm:text-3xl font-outfit font-bold text-slate-900 italic">
              &ldquo;If you&apos;re busy but value a clean and organized home, don&apos;t worry — we take care of it for you.&rdquo;
            </blockquote>
          </div>
          <div className="flex-1 rounded-2xl aspect-[3/2] overflow-hidden">
            <img
              src="/images/team/founder.jpg"
              alt="Family-owned cleaning team"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <Badge variant="outline" className="mb-4">Our Journey</Badge>
          <h2 className="font-outfit font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-12">
            From Local Roots to{' '}
            <span className="text-blue-600">Trusted Experts.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                year: 'Family',
                title: 'Family-Owned at Heart',
                desc: 'A family-run team that treats every home and office with the same care we would give our own.',
              },
              {
                year: 'Bonded',
                title: 'Bonded, Insured, Background-Checked',
                desc: 'Every cleaner on our team is thoroughly screened, trained, and background-checked. Your home and belongings are protected.',
              },
              {
                year: 'Today',
                title: 'Two States, One Standard',
                desc: 'Serving New York and California with the same standard of quality every time.',
              },
            ].map((item) => (
              <div key={item.year} className="bg-white rounded-2xl p-8 border border-slate-200">
                <span className="text-blue-600 font-outfit font-bold text-lg">{item.year}</span>
                <h3 className="font-outfit font-bold text-xl text-slate-900 mt-2 mb-3">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <Badge variant="outline" className="mb-4">Our Core Values</Badge>
          <h2 className="font-outfit font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-4">
            The Standards We <span className="text-blue-600">Uphold.</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mb-12">
            Consistency builds trust. These four pillars guide every decision we make, ensuring you receive the same high-quality service every time.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                num: '01',
                title: 'Care',
                desc: 'We treat every home and office like our own. Every detail matters, every booking is personal.',
              },
              {
                num: '02',
                title: 'Trust',
                desc: 'Bonded, insured, and background-checked. You can feel safe inviting our team into your space.',
              },
              {
                num: '03',
                title: 'Flexibility',
                desc: 'One-time deep clean, weekly visits, Airbnb turnovers, or office care — we adapt to your schedule and needs.',
              },
              {
                num: '04',
                title: 'Family-Owned',
                desc: 'A family-run team that shows up the same way every visit — dependable, careful, and kind.',
              },
            ].map((val) => (
              <div key={val.num} className="flex gap-6 p-6 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors">
                <span className="text-blue-600 font-outfit font-bold text-lg shrink-0">{val.num}</span>
                <div>
                  <h3 className="font-outfit font-bold text-xl text-slate-900 mb-2">{val.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vetting Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <Badge variant="outline" className="mb-4">Safety First</Badge>
          <h2 className="font-outfit font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-4">
            Trusted People in <span className="text-blue-600">Your Home.</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mb-12">
            Inviting someone into your home requires trust. Every cleaner on our team is bonded, insured, thoroughly screened, trained, and background-checked.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Bonded', desc: 'Surety bond protects your home and belongings on every job.' },
              { step: '02', title: 'Insured', desc: 'Full insurance coverage on every booking.' },
              { step: '03', title: 'Background-Checked', desc: 'Every cleaner is thoroughly screened before joining the team.' },
              { step: '04', title: 'Trained', desc: 'Our team is trained to deliver consistent, high-quality results.' },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-6 border border-slate-200">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-full font-outfit font-bold text-sm mb-4">
                  {item.step}
                </span>
                <h3 className="font-outfit font-bold text-lg text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-8">
            <Badge variant="primary">100% Bonded &amp; Insured</Badge>
            <Badge variant="primary">Background Checked</Badge>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <Badge variant="outline" className="mb-4">The Faces Behind Clean</Badge>
          <h2 className="font-outfit font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-4">
            Meet Our <span className="text-blue-600">Specialists.</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mb-12">
            Trained, bonded, and background-checked. Our team is the reason families across New York and California trust us with their homes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="aspect-[4/5] overflow-hidden bg-slate-50">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="bg-slate-100 w-full h-full" />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-outfit font-bold text-lg text-slate-900">{member.name}</h3>
                  <p className="text-slate-500 text-sm mb-2">{member.role}</p>
                  <p className="text-slate-500 text-xs leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Behind the Scenes */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <Badge variant="outline" className="mb-4">Transparency</Badge>
          <h2 className="font-outfit font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-12">
            Behind the <span className="text-blue-600">Scenes.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-8 border border-slate-200 flex flex-col justify-between h-64">
              <div>
                <Building2 className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="font-outfit font-bold text-xl text-slate-900 mb-2">Reach Our Team</h3>
                <p className="text-slate-500 text-sm">Mon–Sat 8am–6pm. Phone, email, or website chat.</p>
              </div>
              <a href="/contact" className="text-blue-600 text-sm font-medium flex items-center gap-1">
                Contact Us <ChevronRight className="w-4 h-4" />
              </a>
            </div>
            <a
              href="https://www.instagram.com/3sisters_services"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-8 border border-slate-200 flex flex-col justify-between h-64 hover:border-slate-300 transition-colors"
            >
              <div>
                <Instagram className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="font-outfit font-bold text-xl text-slate-900 mb-2">Follow on Instagram</h3>
                <p className="text-slate-500 text-sm">See our daily operations and team culture.</p>
              </div>
              <span className="text-blue-600 text-sm font-medium flex items-center gap-1">
                @3sisters_services <ChevronRight className="w-4 h-4" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Experience CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="outline" className="mb-4">Ready for Change?</Badge>
          <h2 className="font-outfit font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-4">
            Experience the 3 Sisters Services <span className="text-blue-600">Difference.</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto mb-8">
            You&apos;ve seen our story and our standards. Now let us bring that same level of care to your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/booking">Book Appointment</Button>
            <Button variant="outline" size="lg" href="/services">View Services</Button>
          </div>
        </div>
      </section>

      {/* Testimonial Quote */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl sm:text-3xl font-outfit font-bold text-slate-900 italic mb-4">
            &ldquo;Finally found a company I can trust! 3Sisters keeps my home spotless every week. The ladies are super friendly and pay great attention to detail.&rdquo;
          </p>
          <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Amanda J. · Brooklyn, NY</p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
