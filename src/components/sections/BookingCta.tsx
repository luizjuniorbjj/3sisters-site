import { Button } from '@/components/ui/Button';

/**
 * BookingCta — compact "Book Now" call-to-action for the homepage.
 * Replaces the inline booking form on the home page (ADR-3S-001, option A):
 * the heavy hosted booking widget now lives only on /booking. A click on
 * "Book Now" (href="/booking") still emits schedule_click via TrackingEvents.
 */
export function BookingCta() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-5xl mx-auto rounded-2xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-12 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Ready when you are
            </span>
            <h2 className="font-outfit font-bold text-3xl sm:text-4xl text-slate-900 mt-3 mb-4">
              Book your cleaning in minutes.
            </h2>
            <p className="text-lg text-slate-500">
              Pick your home size, choose a date, and confirm. Bonded, insured, and
              family-owned since 2019 — Mon–Sat, 8am–6pm.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
            <Button variant="primary" size="lg" href="/booking" className="w-full">
              Book Now
            </Button>
            <Button variant="outline" size="lg" href="tel:+16577377171" className="w-full">
              Call (657) 737-7171
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
