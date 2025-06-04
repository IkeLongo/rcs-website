import { Metadata } from 'next';
import { BookingWidget } from '@/app/ui/booking/booking';
import Footer from '@/app/ui/layout/footer';

export const metadata: Metadata = {
  title: 'Book a Discovery Call',
  description: "Schedule a free discovery call with River City Creatives. Let’s talk about your brand, website, and how we can bring your vision to life.",
  twitter: {
    card: 'summary_large_image',
  },
  openGraph: {
    images: [
      {
        url: 'https://rivercitycreatives.com/booking', // Custom OpenGraph image for the booking page
        width: 1200,
        height: 630,
        alt: 'Book a Discovery Call with RiverCity Creatives Branding and Web Design',
        type: 'website', // Specify the MIME type
      },
    ],
  },
  alternates: {
    canonical: 'https://rivercitycreatives.com/booking', // Add your canonical URL here
  },
}

export default function Booking() {

  return (
    <>
      <BookingWidget />
      <Footer 
        bgGradientClass='bg-footer-bg-gradient-solid'
      />
    </>
  );
}