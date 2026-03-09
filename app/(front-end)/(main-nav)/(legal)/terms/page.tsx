// app/(site)/(legal)/terms/page.tsx

import type { Metadata } from "next";
import TermsContent from '@/app/components/legal/content/terms-content';
import LegalPage from '@/app/components/legal/components/LegalPage';
import LegalToc from '@/app/components/legal/components/LegalToc';
import SimpleFooter from "@/app/components/layouts/footer/simple-footer";

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: "Review the terms and conditions for using River City Creatives' website and services.",
  twitter: {
    card: 'summary_large_image',
  },
  openGraph: {
    type: 'website',
    images: [
      {
        url: 'https://rivercitycreatives.com/opengraph-image.png', // Custom OpenGraph image for the booking page
        width: 1200,
        height: 630,
        alt: 'Terms & Conditions | RiverCity Creatives Web Design & Branding',
      },
    ],
  },
  alternates: {
    canonical: 'https://rivercitycreatives.com/terms', // Add your canonical URL here
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function TermsPage() {
  return (
    <>
      <LegalPage
        title="Terms & Conditions"
        lastUpdated="March 5, 2026"
        toc={<LegalToc />}
      >
        <TermsContent />
      </LegalPage>
      <SimpleFooter />
    </>
  );
}