// app/layout.tsx

import AnalyticsGA4 from "@/app/components/analytics/analytics-ga4";
import ClarityScript from "@/app/components/analytics/microsoft-clarity";
import { ReactNode } from "react";
import { AnalyticsProvider } from "@/app/components/analytics/analytics-provider";
import CookieBanner from "@/app/components/cookies/components/CookieBannerUI";
import { Maven_Pro, Source_Sans_3 } from "next/font/google";
import './globals.css';

import type { Metadata } from "next";

const mavenPro = Maven_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-maven-pro",
  display: "swap",
});

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-sans-3",
  display: "swap",
});

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
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="YvtVvAh3G5ErmXjBQTesMQ" async></script>
          <ClarityScript />
      </head>
      <body
        className={`${mavenPro.className} ${sourceSans3.className} antialiased overflow-x-hidden bg-navy-500`}
      >
        <AnalyticsGA4 />
        <CookieBanner />
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  );
}
