// app/(site)/booking/page.tsx

import type { Metadata } from "next";
import BookingClient from '@/app/ui/booking/booking-client';
import Footer from '@/app/ui/layout/footer';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Book a Discovery Call",
  description:
    "Schedule a free discovery call with River City Creatives. Let’s talk about your brand, website, and how we can bring your vision to life.",
  alternates: { canonical: "https://rivercitycreatives.com/booking" },
  openGraph: {
    images: [
      {
        url: "https://rivercitycreatives.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Book a Discovery Call with RiverCity Creatives Branding and Web Design",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export default function Booking() {

  return (
    <>
      <BookingClient />
      <Footer 
        bgGradientClass='bg-footer-bg-gradient-solid'
      />
    </>
  );
}