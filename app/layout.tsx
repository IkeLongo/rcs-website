// app/layout.tsx

import AnalyticsGA4 from "./actions/analytics/analytics";
import FadeOverlay from "./ui/components/fade-overlay";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next"

import type { Metadata } from "next";

import { passeroOne } from "@/app/ui/fonts/passero-one";
import './globals.css';
import dynamic from "next/dynamic";

const CookieBanner = dynamic(() => import("@/app/ui/cookie-prefs/cookie-banner"), { loading: () => null });
const ToastProvider = dynamic(() => import("@/app/ui/providers/toast-provider"), { loading: () => null });

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
    <html lang="en" className={passeroOne.variable}>
      <head>
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="YvtVvAh3G5ErmXjBQTesMQ" async></script>
      </head>
      <body
        className={`antialiased overflow-x-hidden bg-navy-500`}
      >
        <AnalyticsGA4 />
        <FadeOverlay />
        <CookieBanner />
        <ToastProvider />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
