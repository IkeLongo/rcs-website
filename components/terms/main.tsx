const { LEGAL_COMPANY_NAME } = process.env;
const { DBA_NAME } = process.env;
const { BUSINESS_EMAIL } = process.env;
const { SITE_NAME } = process.env;
const { BUSINESS_LOCATION } = process.env;


export async function Main() {

  return (

    <section id="terms-of-service" className="flex flex-col p-6 max-w-[1020px]">
      <h1 className="text-2xl font-maven-pro font-bold text-center pb-4 md:pt-8">Terms of Service</h1>
      <p className="text-sm font-maven-pro pb-8 text-center">Last Updated: Feburary 13, 2025</p>

      <p className="mt-4">
        Welcome to <strong>{LEGAL_COMPANY_NAME}</strong> (“Company”, “we”, “our”, “us”) doing business as <strong>{DBA_NAME}</strong>. By accessing or using our website 
        <a href={SITE_NAME} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline"> {SITE_NAME} </a> 
        (the “Site”) and our services, including web design, web development, branding, and hosting (collectively, the “Services”), 
        you agree to comply with and be bound by these Terms of Service (“Terms”). If you do not agree to these Terms, please do not use our Services.
      </p>

      <h4 className="mt-6 text-lg font-semibold">1. Conditions of Use</h4>
      <p className="mt-2">
        By using our Services, you agree to be bound by these Terms and all applicable laws and regulations. If you are using our Services on behalf of a business 
        or entity, you represent that you have the authority to bind that entity to these Terms.
      </p>

      <h4 className="mt-6 text-lg font-semibold">2. Privacy Policy</h4>
      <p className="mt-2">
        Your use of our Services is also governed by our 
        <a href="/privacy" className="text-blue-400 hover:underline"> Privacy Policy</a>. 
        We encourage you to review it to understand our data collection and usage practices.
      </p>

      <h4 className="mt-6 text-lg font-semibold">3. Intellectual Property</h4>
      <p className="mt-2">
        All content on our Site, including but not limited to text, images, graphics, logos, digital downloads, and software, is the property of 
        <strong> {LEGAL_COMPANY_NAME}</strong> or its content creators and is protected by international copyright and intellectual property laws. 
        Unauthorized use, reproduction, or distribution is strictly prohibited.
      </p>

      <h4 className="mt-6 text-lg font-semibold">4. Scope of Services</h4>
      <p className="mt-2">
        We offer web design, web development, branding, and hosting services. The scope, timeline, and deliverables for each project will be outlined 
        in a separate agreement between us and the client.
      </p>

      <h5 className="mt-4 text-lg font-medium">4.1 Web Design & Development</h5>
      <ul className="list-disc pl-6 mt-2">
        <li>Clients must provide all required content and assets in a timely manner.</li>
        <li>Revisions are limited to the number specified in the service agreement.</li>
      </ul>

      <h5 className="mt-4 text-lg font-medium">4.2 Branding</h5>
      <ul className="list-disc pl-6 mt-2">
        <li>Deliverables may include logos, brand guidelines, and marketing materials as agreed upon.</li>
        <li>Clients must ensure they have the rights to any assets provided to us.</li>
      </ul>

      <h5 className="mt-4 text-lg font-medium">4.3 Hosting Services</h5>
      <ul className="list-disc pl-6 mt-2">
        <li>Hosting services are subject to third-party provider terms and may require periodic maintenance and updates.</li>
        <li>We are not liable for service interruptions due to factors beyond our control (e.g., server downtime, third-party failures).</li>
      </ul>

      <h4 className="mt-6 text-lg font-semibold">5. Payments & Refunds</h4>
      <ul className="list-disc pl-6 mt-2">
        <li>Payment terms will be outlined in the service agreement. Invoices must be paid in full before work begins.</li>
        <li>Deposits are non-refundable unless otherwise specified.</li>
        <li>If a project is canceled after work has commenced, a partial refund may be issued at our discretion based on the amount of work completed.</li>
      </ul>

      <h4 className="mt-6 text-lg font-semibold">6. Communications</h4>
      <p className="mt-2">
        By using our Services, you consent to receive communications from us electronically, including emails, newsletters, and notifications related to your services. 
        You may opt out of marketing communications at any time.
      </p>

      <h4 className="mt-6 text-lg font-semibold">7. Limitations of Liability</h4>
      <p className="mt-2">
        To the maximum extent permitted by law, <strong>{LEGAL_COMPANY_NAME}</strong> shall not be liable for any direct, indirect, incidental, consequential, or special 
        damages arising from your use of our Services, including but not limited to data loss, security breaches, or service interruptions.
      </p>

      <h4 className="mt-6 text-lg font-semibold">8. Dispute Resolution</h4>
      <p className="mt-2">
        Any disputes arising from these Terms shall be resolved through arbitration in <strong>{BUSINESS_LOCATION}</strong>. You agree to waive any right to a jury trial 
        or participation in a class action lawsuit.
      </p>

      <h4 className="mt-6 text-lg font-semibold">9. User Conduct & Content</h4>
      <p className="mt-2">
        Users may post comments, reviews, or feedback, provided they do not contain illegal, obscene, defamatory, or infringing content. 
        We reserve the right to remove any content at our discretion.
      </p>

      <h4 className="mt-6 text-lg font-semibold">10. Termination</h4>
      <p className="mt-2">
        We reserve the right to terminate your access to our Services at any time if you violate these Terms. 
        Termination does not relieve you of any outstanding payment obligations.
      </p>

      <h4 className="mt-6 text-lg font-semibold">11. Changes to Terms</h4>
      <p className="mt-2">
        We may update these Terms from time to time. The latest version will be posted on our Site, and continued use of our Services constitutes acceptance of the revised Terms.
      </p>

      <h4 className="mt-6 text-lg font-semibold">12. Contact Us</h4>
      <p className="mt-2">
        If you have any questions about these Terms, please contact us at{' '}
        <a href={`mailto:${BUSINESS_EMAIL}`} className="text-blue-400 hover:underline">
          {BUSINESS_EMAIL}
        </a>.
      </p>
    </section>
  );
}
