import localFont from "next/font/local";
import "./globals.css";
import CookieBanner from "@/app/ui/cookie-prefs/cookie-banner";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { ReactNode } from "react";
import type { Metadata } from 'next'
import Analytics from "./actions/analytics/analytics";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rivercitycreatives.com'),
  title: {
    default: 'RiverCity Creatives',
    template: '%s | RiverCity Creatives',
  },
  description: 'RiverCity Creatives is a San Antonio-based studio offering custom branding and web design for small businesses. Let’s build your digital presence.',
  twitter: {
    card: 'summary_large_image',
  },
  openGraph: {
    images: [
      {
        url: 'https://rivercitycreatives.com/api/og', // Path to your OpenGraph image route
        width: 1200,
        height: 630,
        alt: 'RiverCity Creatives OpenGraph Image',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden bg-gray-900`}
      >
        <Analytics />
        <CookieBanner />
        <ToastContainer limit={1} theme="dark" />
        {children}
      </body>
    </html>
  );
}
