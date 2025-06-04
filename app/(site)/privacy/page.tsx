import { PrivacyNotice } from '@/app/ui/privacy/privacy-notice';
import { Summary } from '@/app/ui/privacy/summary';
import { TableOfContents } from '@/app/ui/privacy/table-of-contents';
import Footer from '@/app/ui/layout/footer';
import { InfoWeCollect } from '@/app/ui/privacy/info-we-collect';
import { ProcessYourInfo } from '@/app/ui/privacy/process-your-info';
import { LegalBasis } from '@/app/ui/privacy/legal-basis';
import { SharePersonalInfo } from '@/app/ui/privacy/share-personal-info';
import { ThirdPartyWebsites } from '@/app/ui/privacy/third-party-websites';
import { CookieTrackingTech } from '@/app/ui/privacy/cookie-tracking-technologies';
import { SocailLogins } from '@/app/ui/privacy/social-logins';
import { InfoTranIntl } from '@/app/ui/privacy/info-trans-intl';
import { KeepInfo } from '@/app/ui/privacy/keep-info';
import { KeepInfoSafe } from '@/app/ui/privacy/keep-info-safe';
import { MinorInfo } from '@/app/ui/privacy/minor-info';
import { PrivacyRights } from '@/app/ui/privacy/privacy-rights';
import { DoNotTrack } from '@/app/ui/privacy/do-not-track';
import { California } from '@/app/ui/privacy/california';
import { Virginia } from '@/app/ui/privacy/virginia';
import { UpdatesToNotice } from '@/app/ui/privacy/updates-to-notice';
import { ContactAboutNotice } from '@/app/ui/privacy/contact-about-notice';
import Cookies from '@/app/ui/privacy/cookies';
import PrivacyContactForm from '@/app/ui/privacy/form';
import { Metadata } from 'next';
import StickyBottomButton from '../../ui/components/sticky-button-bottom';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how River City Creatives collects, uses, and protects your personal information when you use our website and services.',
  twitter: {
    card: 'summary_large_image',
  },
  openGraph: {
    images: [
      {
        url: 'https://rivercitycreatives.com/privacy', // Custom OpenGraph image for the booking page
        width: 1200,
        height: 630,
        alt: 'Privacy Policy | RiverCity Creatives Web Design & Branding',
        type: 'website', // Specify the MIME type
      },
    ],
  },
  alternates: {
    canonical: 'https://rivercitycreatives.com/privacy', // Add your canonical URL here
  },
}

export default function Home() {

  return (
    <div className="bg-blue-100 flex flex-col justify-center items-center min-h-screen">
      <div className="relative h-auto w-full max-w-[1020px] bg-cover bg-top overflow-x-hidden top-24 mb-24 px-4">
        <div className="flex flex-col justify-center items-center">
          <header className="text-center py-8">
            <h1 className="text-navy-975">Website Privacy Policy</h1>
            <p className="text-navy-500">Last updated June 4, 2025</p>
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
            <StickyBottomButton />
          </main>
        </div>
      </div>
      <div className="relative flex flex-col justify-center items-center w-full h-auto px-4 pb-10 bg-gray-700 overflow-visible shrink-0 md:-top-0 text-white font-avenir tracking-wide">
        <div id="cookie-policy" className="text-center py-8 max-w-[60em]">
          <h3 className="text-2xl font-maven-pro font-bold text-center md:pt-8">Website Cookie Policy</h3>
          <p className="text-sm font-maven-pro">Last updated January 24, 2025</p>
        </div>
        <Cookies />
      </div>
      <div className="relative bg-gray-900 flex flex-col w-full max-w-[60em] h-auto px-4 pb-10 overflow-visible shrink-0 md:-top-0 md:mb-20 text-white font-avenir tracking-wide">
        <div id="data-subject-request" className="text-center py-8">
          <h3 className="text-2xl font-maven-pro font-bold text-center">Data Subject Request</h3>
        </div>
        <section id="dpo-contact-form" className='px-6 py-8'>
          <PrivacyContactForm />
        </section>
      </div>
      <Footer bgGradientClass='bg-footer-bg-gradient-solid'/>
    </div>
  );
}