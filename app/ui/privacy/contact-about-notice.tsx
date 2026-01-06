
export async function ContactAboutNotice() {
  const { LEGAL_COMPANY_NAME } = process.env;
  const { DBA_NAME } = process.env;
  const { SITE_NAME_VAR } = process.env;
  const { BUSINESS_EMAIL } = process.env;
  
  return (
    <section id="how-can-you-contact-us-about-this-notice" className="mt-8">
      <h4 className="text-navy-975">17. How Can You Contact Us About This Notice?</h4>
      <p className="mt-6 text-navy-975 text-left">If you have questions or comments about this notice, you may contact our Data Protection Officer (DPO) by email at{' '}
        <a href={`mailto:${BUSINESS_EMAIL}`} className="text-blue-500 hover:underline">
          {BUSINESS_EMAIL}
        </a>, by phone at 210-730-6232, or by post to:</p>
      
      <p className="mt-4 text-navy-975 text-left">{ LEGAL_COMPANY_NAME }</p>
      <p className="text-navy-975 text-left">{ DBA_NAME }</p>
      <p className="text-navy-975 text-left">5900 Balcones Drive STE 100</p>
      <p className="text-navy-975 text-left">Austin, TX 78731</p>
      <p className="text-navy-975 text-left">United States of America</p>
    </section>
  )
}