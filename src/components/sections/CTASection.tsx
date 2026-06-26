import { Button } from '@/components/ui/Button';

export const CTASection = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-blue-700">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-outfit font-bold text-4xl sm:text-5xl text-white mb-6">
          Ready to Book Your Clean?
        </h2>
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Tell us about your space — we&apos;ll get back to you with a custom quote.
          Bonded, insured, and trusted in New York and California.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="primary"
            size="lg"
            href="/booking"
            className="bg-white text-blue-600 hover:bg-blue-50 w-full sm:w-auto"
          >
            Book Appointment
          </Button>
          <Button
            variant="outline"
            size="lg"
            href="/contact"
            className="border-2 border-white text-white hover:bg-blue-600 w-full sm:w-auto"
          >
            Contact Now
          </Button>
        </div>
      </div>
    </section>
  );
};
