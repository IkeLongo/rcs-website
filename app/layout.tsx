// import "./globals.css";
import CookieBanner from "@/app/ui/cookie-prefs/cookie-banner";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { ReactNode } from "react";
import type { Metadata } from 'next'
import Analytics from "./actions/analytics/analytics";
import './globals.css';

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
        <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
      </head>
      <body
        className={`antialiased overflow-x-hidden bg-navy-500`}
      >
        <Analytics />
        <CookieBanner />
        <ToastContainer limit={1} theme="dark" />
        {children}
      </body>
    </html>
  );
}
