import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  robots: { index: false },
  alternates: { canonical: '/legal/privacy/' },
};

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Privacy Policy', href: '/legal/privacy' },
        ]}
      />
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto prose prose-slate">
          <h1 className="font-outfit font-bold text-4xl text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-slate-400 mb-12">Last updated: May 30, 2026</p>

        <p className="text-slate-600 leading-relaxed mb-8">
          3 Sisters Services (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a family-owned cleaning company serving New York and California. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or book our services.
        </p>

        <h2 className="font-outfit font-bold text-xl text-slate-900 mt-10 mb-4">1. Information We Collect</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          We collect the following categories of information:
        </p>
        <ul className="text-slate-600 leading-relaxed mb-6 list-disc pl-6 space-y-2">
          <li><strong>Contact information</strong> — your name, email address, phone number, and service address.</li>
          <li><strong>Booking and service information</strong> — the type of service requested, scheduling details, access instructions, property details relevant to the cleaning, and any notes or preferences you share with us.</li>
          <li><strong>Payment-related information</strong> — the billing details needed to process your payment. Card payments are handled by our PCI-compliant processor; we do not store full card numbers on our servers (see Section 4).</li>
          <li><strong>Communications</strong> — records of your interactions with us by SMS, email, phone, website chat, and customer support.</li>
          <li><strong>Quality-assurance photos</strong> — before-and-after photographs of serviced areas, as described in our Terms of Service.</li>
          <li><strong>Website and analytics data</strong> — basic usage data collected through cookies and analytics tools when you visit our website, such as pages viewed and general device information.</li>
        </ul>

        <h2 className="font-outfit font-bold text-xl text-slate-900 mt-10 mb-4">2. How We Use Your Information</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          We use your information to schedule, confirm, and fulfill your cleaning services; provide quotes, estimates, and invoices; process payments; send appointment reminders and service updates by SMS and email; respond to your questions and provide customer support; maintain quality assurance and resolve service or billing disputes; improve our website and services; and&mdash;only with your consent&mdash;send occasional updates or promotions. We do not sell your personal information.
        </p>

        <h2 className="font-outfit font-bold text-xl text-slate-900 mt-10 mb-4">3. Information Sharing</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          We share information only with the cleaning team assigned to your booking, our payment processors (such as Fullsteam Pay and PayPal), and service providers that help us run our business (such as SMS, email, scheduling, and analytics tools). These providers handle your information under their own terms and privacy policies. We may also share information when required by law. We do not sell your personal information.
        </p>

        <h2 className="font-outfit font-bold text-xl text-slate-900 mt-10 mb-4">4. Data Security</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          We use industry-standard security practices to protect your personal information. Card payments are handled securely by our PCI-compliant third-party payment processor; we do not store full card numbers on our servers. Cards are only charged after the cleaning is completed.
        </p>

        <h2 className="font-outfit font-bold text-xl text-slate-900 mt-10 mb-4">5. SMS &amp; Email Communications</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          With your consent, we may send service-related text messages and emails, including appointment reminders, scheduling updates, confirmations, invoices, and support messages. Message and data rates may apply to SMS depending on your carrier and plan. You can opt out of SMS at any time by replying STOP, and you can opt out of marketing emails using the unsubscribe link; transactional messages needed to fulfill your booking may still be sent. For more detail on these communications, see our Terms of Service.
        </p>

        <h2 className="font-outfit font-bold text-xl text-slate-900 mt-10 mb-4">6. Cookies</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          Our website uses cookies to enhance your browsing experience, remember preferences, and analyze site traffic. You can manage or disable cookies through your browser settings at any time.
        </p>

        <h2 className="font-outfit font-bold text-xl text-slate-900 mt-10 mb-4">7. Your Rights</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          You have the right to access, correct, or delete your personal information, and to opt out of marketing communications at any time. To exercise these rights, contact us using the details in Section 8.
        </p>

        <h2 className="font-outfit font-bold text-xl text-slate-900 mt-10 mb-4">8. Contact</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          For privacy-related questions, please contact us at <a href="mailto:contact@3sistersservices.com" className="text-blue-600 underline">contact@3sistersservices.com</a> or call <a href="tel:+16577377171" className="text-blue-600 underline">+1 (657) 737-7171</a>. Hours: Mon–Sat, 8am–6pm.
        </p>
        </div>
      </section>
    </>
  );
}
