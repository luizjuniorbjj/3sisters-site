import { Clock, Shield, Star, MousePointerClick, MessageCircle, CreditCard } from 'lucide-react';

/**
 * BookingBenefits — 6 cards "Why book with 3 Sisters Services"
 *
 * Trust cards shown above the booking form:
 *   SAVES YOU TIME / SAFETY FIRST / ONLY THE BEST QUALITY /
 *   EASY TO GET HELP / SEAMLESS COMMUNICATION / CASH FREE PAYMENT
 *
 * Layout: 3 cols (desktop) / 2 cols (tablet) / 1 col (mobile).
 * Position: above <BookingSection> on /booking/ — pre-sell trust before the form.
 */

const BENEFITS = [
  {
    icon: Clock,
    title: 'Saves You Time',
    desc: 'Our service helps you live smarter, giving you time to focus on what’s most important.',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
  },
  {
    icon: Shield,
    title: 'Safety First',
    desc: 'We rigorously vet all of our cleaners, who undergo identity checks as well as in-person interviews.',
    iconColor: 'text-green-600',
    iconBg: 'bg-green-50',
  },
  {
    icon: Star,
    title: 'Only the Best Quality',
    desc: 'Our skilled professionals go above and beyond on every job. Cleaners are rated and reviewed after each task.',
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-50',
  },
  {
    icon: MousePointerClick,
    title: 'Easy to Get Help',
    desc: 'Select your ZIP code, number of bedrooms and bathrooms, date, and relax while we take care of your home.',
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-50',
  },
  {
    icon: MessageCircle,
    title: 'Seamless Communication',
    desc: 'Online communication makes it easy for you to stay in touch with your cleaners.',
    iconColor: 'text-rose-600',
    iconBg: 'bg-rose-50',
  },
  {
    icon: CreditCard,
    title: 'Cash-Free Payment',
    desc: 'Pay securely online only when the cleaning is complete.',
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-50',
  },
];

export const BookingBenefits = () => (
  <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="font-outfit font-bold text-2xl sm:text-3xl text-slate-900 mb-2">
          Why book with us
        </h2>
        <p className="text-slate-500 text-sm">
          Family-owned. Bonded &amp; insured. Trusted in New York and California.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {BENEFITS.map(({ icon: Icon, title, desc, iconColor, iconBg }) => (
          <div
            key={title}
            className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
          >
            <div className={`flex-shrink-0 w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>
            <div>
              <h3 className="font-outfit font-bold text-base text-slate-900 mb-1">{title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
