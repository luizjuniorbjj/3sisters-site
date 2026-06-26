import { Metadata } from 'next';
import { SOCIAL_OG_IMAGES } from '@/lib/schema';
import { Badge } from '@/components/ui/Badge';
import { CTASection } from '@/components/sections/CTASection';
import { teamMembers } from '@/data/site';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Our Team',
  description:
    'Meet our trained, background-checked cleaning specialists serving New York and California. Bonded, insured, and family-trusted.',
  alternates: { canonical: 'https://3sistersservices.com/team/' },
  openGraph: {
    title: 'Our Team | 3 Sisters Services',
    description: 'Trained, vetted cleaning specialists. Bonded and insured.',
    url: 'https://3sistersservices.com/team/',
    type: 'website',
    images: SOCIAL_OG_IMAGES,
  },
};

export default function TeamPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Our Team', href: '/team' },
        ]}
      />
      {/* Hero */}
      <section className="bg-gradient-to-b from-rose-50/30 to-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Badge variant="primary" className="mb-6">OUR TEAM</Badge>
          <h1 className="font-outfit font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-900 mb-6 max-w-3xl">
            Meet Our{' '}
            <span className="text-blue-600">Specialists.</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl">
            Trained, vetted, and background-checked &mdash; our team is the reason families across New York and California trust us with their homes.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden group hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[4/5] overflow-hidden bg-slate-50">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="bg-gradient-to-br from-slate-100 to-slate-200 w-full h-full" />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-outfit font-bold text-lg text-slate-900">{member.name}</h3>
                  <p className="text-slate-500 text-sm mb-3">{member.role}</p>
                  <p className="text-slate-500 text-xs leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
