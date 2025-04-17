const { LEGAL_COMPANY_NAME } = process.env;
const { DBA_NAME } = process.env;
const { SITE_NAME_VAR } = process.env;
const { BUSINESS_EMAIL } = process.env;

export async function ContactAboutNotice() {
  return (
    <section id="how-can-you-contact-us-about-this-notice" className="mt-8">
      <h3>17. How Can You Contact Us About This Notice?</h3>
      <p className="mt-6">If you have questions or comments about this notice, you may contact our Data Protection Officer (DPO) by email at{' '}
        <a href={`mailto:${BUSINESS_EMAIL}`} className="text-blue-400 hover:underline">
          {BUSINESS_EMAIL}
        </a>, by phone at 210-730-6232, or by post to:</p>
      
      <p className="mt-4">{ LEGAL_COMPANY_NAME }</p>
      <p className="">{ DBA_NAME }</p>
      <p className="">5900 Balcones Drive STE 100</p>
      <p className="">Austin, TX 78731</p>
      <p className="">United States of America</p>
    </section>
  )
}