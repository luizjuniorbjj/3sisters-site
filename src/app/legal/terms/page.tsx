import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms of Service',
  robots: { index: false },
  alternates: { canonical: '/legal/terms/' },
};

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Terms of Service', href: '/legal/terms' },
        ]}
      />
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto prose prose-slate">
          <h1 className="font-outfit font-bold text-4xl text-slate-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-slate-400 mb-12">Last updated: May 30, 2026</p>

        <h2 className="font-outfit font-bold text-xl text-slate-900 mt-10 mb-4">1. Acceptance of Terms</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          By accessing the 3 Sisters Services website and booking our cleaning services, you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
        </p>

        <h2 className="font-outfit font-bold text-xl text-slate-900 mt-10 mb-4">2. Services</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          3 Sisters Services provides Regular Cleaning, Deep Cleaning, Move-In/Move-Out Cleaning, Airbnb &amp; Vacation Rental Cleaning, Office &amp; Commercial Cleaning, and Personal Organizing Services. Services are subject to availability in our service areas: New York (Manhattan, Brooklyn, Queens) and California (San Francisco).
        </p>

        <h2 className="font-outfit font-bold text-xl text-slate-900 mt-10 mb-4">3. Booking and Scheduling</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          Bookings can be made through our website (online form or website chat), by phone, or by email. All bookings are subject to confirmation and team availability. We reserve the right to reschedule a booking if necessary, with as much advance notice as possible.
        </p>

        <h2 className="font-outfit font-bold text-xl text-slate-900 mt-10 mb-4">4. Pricing and Payment</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          Our cleaning is quote-based and tailored to your space. A quote is provided before service begins. You can pay by credit card, PayPal, or cash. If you pay by card, your card details are collected securely at the time of booking and the card is only charged after the cleaning is completed, with no pre-authorization hold. Card payments are processed by third-party payment providers (such as Fullsteam Pay and PayPal). These processors are PCI-compliant, and we do not store full credit or debit card numbers on our own servers. Your use of these payment services is also subject to the applicable processor&rsquo;s terms of service and privacy policy.
        </p>

        <h2 className="font-outfit font-bold text-xl text-slate-900 mt-10 mb-4">5. Payment Authorization</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          By booking a service and providing your payment details, you authorize 3 Sisters Services to charge the card on file for the agreed quote once the cleaning is completed, including any applicable add-ons and any cancellation, no-show, or access fees described in these Terms. You confirm that you are authorized to use the payment method you provide.
        </p>

        <h2 className="font-outfit font-bold text-xl text-slate-900 mt-10 mb-4">6. Supplies</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          Clients are asked to provide their own cleaning supplies so we can use the products you trust in your home or workspace. If you have any questions about supplies, contact us before your booking.
        </p>

        <h2 className="font-outfit font-bold text-xl text-slate-900 mt-10 mb-4">7. Cancellation &amp; Rescheduling</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          You may cancel or reschedule your appointment through our online booking system, by phone, or by email. To avoid a fee, please submit your request at least 72 hours before your scheduled service. Cancellations or reschedules requested less than 72 hours in advance may be subject to a late cancellation fee of $50, which helps cover the reserved time slot and the scheduling impact on our team. Specific terms for recurring or commercial plans will be confirmed when your booking is processed.
        </p>

        <h2 className="font-outfit font-bold text-xl text-slate-900 mt-10 mb-4">8. Property Access &amp; No-Show</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          Please make sure our team can access the property at the scheduled time, including any keys, codes, gate access, or building entry instructions we may need. If our team arrives as scheduled and is unable to access the property &mdash; for example, due to a lockout, no answer, or missing access instructions &mdash; the appointment may be treated as a no-show, and a fee of up to 100% of the quoted service may apply, as the time slot was reserved and our team was dispatched. If you anticipate an access issue, please contact us in advance so we can make arrangements.
        </p>

        <h2 className="font-outfit font-bold text-xl text-slate-900 mt-10 mb-4">9. Refunds &amp; Service Satisfaction</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          Your satisfaction matters to us. Because every home and workspace is different, cleaning concerns are reviewed individually. If any part of your service does not meet your expectations, please contact us within 24 hours of completion so we can make it right. In most cases we will return to re-clean the affected areas at no additional charge. We ask for the opportunity to review and address any concern before a refund is considered. Refunds, where appropriate, are issued at our reasonable discretion based on the circumstances of the service.
        </p>

        <h2 className="font-outfit font-bold text-xl text-slate-900 mt-10 mb-4">10. Dispute Resolution &amp; Chargebacks</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          If you are dissatisfied with a service or have a billing question, please contact us within 24 hours so we can resolve it directly. We are committed to working with you in good faith and will make a reasonable effort to address any concern. Before initiating a payment dispute or chargeback with your bank or card issuer, you agree to first contact us and allow us a reasonable opportunity to resolve the matter. Many concerns can be resolved quickly through a re-clean or adjustment. Chargebacks filed without first giving us this opportunity may be contested using our service records and documentation, including appointment confirmations and quality-assurance photos.
        </p>

        <h2 className="font-outfit font-bold text-xl text-slate-900 mt-10 mb-4">11. SMS Communications</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          With your consent, we may send you text messages (SMS) related to your service, such as appointment reminders, scheduling updates, confirmations, and customer support communications. Message frequency varies, and message and data rates may apply depending on your carrier and plan. You can opt out at any time by replying STOP to any message, and reply HELP for assistance. Opting out of service-related texts may affect our ability to send you scheduling updates. Carriers are not liable for delayed or undelivered messages.
        </p>

        <h2 className="font-outfit font-bold text-xl text-slate-900 mt-10 mb-4">12. Email Communications</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          We may contact you by email to send estimates, quotes, invoices, appointment confirmations, service-related notices, and customer support communications. These service-related emails are part of providing your cleaning service. You may opt out of optional marketing or promotional emails at any time using the unsubscribe link or by contacting us; however, we may still send transactional emails necessary to fulfill your booking.
        </p>

        <h2 className="font-outfit font-bold text-xl text-slate-900 mt-10 mb-4">13. Quality Assurance Photography</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          To maintain our standards, we may take before-and-after photographs of the areas being serviced for quality assurance, team training, service documentation, and to help resolve any service or billing disputes. These photos focus on the cleaned areas and the results of our work. We take reasonable steps to avoid capturing personal, sensitive, or private items, and we do not sell these photos. If you prefer that we not photograph certain areas, please let our team know before or during the appointment. Photos are handled in accordance with our Privacy Policy.
        </p>

        <h2 className="font-outfit font-bold text-xl text-slate-900 mt-10 mb-4">14. Liability, Insurance &amp; Limitation of Liability</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          3 Sisters Services is fully bonded and insured. All of our employees are thoroughly screened, trained, and background-checked. In the unlikely event of accidental damage during a cleaning, please notify us within 24 hours so we can address it promptly; claims reported after 24 hours may be difficult to verify and resolve.
        </p>
        <p className="text-slate-600 leading-relaxed mb-6">
          To the fullest extent permitted by law, our total liability for any claim arising out of or relating to our services will not exceed the amount you paid for the specific service giving rise to the claim. We are not liable for indirect, incidental, special, or consequential damages, or for pre-existing conditions, normal wear and tear, or damage caused by faulty, aged, or improperly installed fixtures, surfaces, or items. Nothing in these Terms limits any liability that cannot be limited under applicable law.
        </p>

        <h2 className="font-outfit font-bold text-xl text-slate-900 mt-10 mb-4">15. Pet Policy</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          We love pets! For the best results, we ask that pets be restricted from the areas being cleaned whenever possible, so our team can work safely and efficiently.
        </p>

        <h2 className="font-outfit font-bold text-xl text-slate-900 mt-10 mb-4">16. Contact</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          For questions about these Terms of Service, contact us at <a href="mailto:contact@3sistersservices.com" className="text-blue-600 underline">contact@3sistersservices.com</a> or call <a href="tel:+16577377171" className="text-blue-600 underline">+1 (657) 737-7171</a>. Hours: Mon–Sat, 8am–6pm.
        </p>
        </div>
      </section>
    </>
  );
}
