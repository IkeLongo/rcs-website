"use client";

import PrivacyNotice from '@/components/privacy/privacy-notice';
import Summary from '@/components/privacy/summary';
import TableOfContents from '@/components/privacy/table-of-contents';
import Footer from '@/components/layout/footer';
import InfoWeCollect from '@/components/privacy/info-we-collect';
import ProcessYourInfo from '@/components/privacy/process-your-info';
import LegalBasis from '@/components/privacy/legal-basis';
import SharePersonalInfo from '@/components/privacy/share-personal-info';
import ThirdPartyWebsites from '@/components/privacy/third-party-websites';
import CookieTrackingTech from '@/components/privacy/cookie-tracking-technologies';
import SocailLogins from '@/components/privacy/social-logins';
import InfoTranIntl from '@/components/privacy/info-trans-intl';
import KeepInfo from '@/components/privacy/keep-info';
import KeepInfoSafe from '@/components/privacy/keep-info-safe';
import MinorInfo from '@/components/privacy/minor-info';
import PrivacyRights from '@/components/privacy/privacy-rights';
import DoNotTrack from '@/components/privacy/do-not-track';
import California from '@/components/privacy/california';
import Virginia from '@/components/privacy/virginia';
import UpdatesToNotice from '@/components/privacy/updates-to-notice';
import ContactAboutNotice from '@/components/privacy/contact-about-notice';
import Cookies from '@/components/privacy/cookies';
import PrivacyContactForm from '@/components/privacy/form';

export default function Home() {

  return (
    <div className="bg-gray-900 flex flex-col justify-center items-center min-h-screen">
      <div className="relative h-auto w-full max-w-[1020px] bg-cover bg-top overflow-x-hidden top-24 mb-24 px-4">
        <div className="flex flex-col justify-center items-center">
          <header className="text-center py-8">
            <h1 className="text-[32px] font-gentium-book-plus">Website Privacy Policy</h1>
            <p className="text-sm font-maven-pro">Last updated January 24, 2025</p>
          </header>
          <main className="px-6 py-8">
            <PrivacyNotice />
            <Summary />
            <TableOfContents />
            <InfoWeCollect />
            <ProcessYourInfo />
            <LegalBasis />
            <SharePersonalInfo />
            <ThirdPartyWebsites />
            <CookieTrackingTech />
            <SocailLogins />
            <InfoTranIntl />
            <KeepInfo />
            <KeepInfoSafe />
            <MinorInfo />
            <PrivacyRights />
            <DoNotTrack />
            <California />
            <Virginia />
            <UpdatesToNotice />
            <ContactAboutNotice />
          </main>
        </div>
      </div>
      <div className="relative flex flex-col justify-center items-center w-full h-auto px-4 pb-10 bg-gray-700 overflow-visible shrink-0 md:-top-0 md:mb-20 text-white font-avenir tracking-wide">
        <div id="cookie-policy" className="text-center py-8 max-w-[60em]">
          <h2 className="text-[32px] font-gentium-book-plus">Website Cookie Policy</h2>
          <p className="text-sm font-maven-pro">Last updated January 24, 2025</p>
        </div>
        <Cookies />
      </div>
      <div className="relative bg-gray-900 flex flex-col w-full max-w-[60em] h-auto px-4 pb-10 overflow-visible shrink-0 md:-top-0 md:mb-20 text-white font-avenir tracking-wide">
        <div id="data-subject-request" className="text-center py-8">
          <h2 className="text-[32px] font-gentium-book-plus">Data Subject Request</h2>
        </div>
        <section id="dpo-contact-form" className='px-6 py-8'>
          <PrivacyContactForm />
        </section>
      </div>
      <Footer bgGradientClass='bg-footer-bg-gradient-solid'/>
    </div>
  );
}