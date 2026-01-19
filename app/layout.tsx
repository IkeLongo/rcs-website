// app/layout.tsx

import CookieBanner from "@/app/ui/cookie-prefs/cookie-banner";
import AnalyticsGA4 from "./actions/analytics/analytics";
import FadeOverlay from "./ui/components/fade-overlay";
import ToastProvider from "@/app/ui/providers/toast-provider";

import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next"

import type { Metadata } from "next";
import './globals.css';

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
      </head>
      <body
        className={`antialiased overflow-x-hidden bg-navy-500`}
      >
        <AnalyticsGA4 />
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
        {/* ✅ Global toast container mounted once, client-side */}
        <ToastProvider />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
