// app/layout.tsx

import CookieBanner from "@/app/ui/cookie-prefs/cookie-banner";
import Analytics from "./actions/analytics/analytics";
import FadeOverlay from "./ui/components/fade-overlay";

import { ReactNode } from "react";
import Metadata from 'next'
import { ToastContainer, toast } from 'react-toastify';
import './globals.css';
import "react-toastify/dist/ReactToastify.css";

// Add this line to access GTM_ID
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  metadataBase: new URL('https://rivercitycreatives.com'),
  title: {
    default: 'Branding & Web Design in San Antonio, TX | RiverCity Creatives',
    template: '%s | RiverCity Creatives',
  },
  description: 'RiverCity Creatives is a San Antonio-based studio offering custom branding and web design for small businesses. Let’s build your digital presence.',
  twitter: {
    card: 'summary_large_image',
  },
  openGraph: {
    images: [
      {
        url: 'https://rivercitycreatives.com/',
        width: 1200,
        height: 630,
        alt: 'Branding & Web Design in San Antonio, TX | RiverCity Creatives',
        type: 'website',
      },
    ],
  },
  alternates: {
    canonical: 'https://rivercitycreatives.com', // Add your canonical URL here
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Passero+One&display=swap" rel="stylesheet" />
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="YvtVvAh3G5ErmXjBQTesMQ" async></script>
        <Analytics />
      </head>
      <body
        className={`antialiased overflow-x-hidden bg-navy-500`}
      >
        <FadeOverlay />
        {/* GTM Noscript - MUST be immediately after opening body tag */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <CookieBanner />
        <ToastContainer limit={1} theme="dark" />
        {children}
      </body>
    </html>
  );
}
