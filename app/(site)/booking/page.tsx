import { Metadata } from 'next';
import { BookingWidget } from '@/app/ui/booking/booking';

export const metadata: Metadata = {
  title: 'Book a Discovery Call',
  description: "Schedule a free discovery call with River City Creatives. Let’s talk about your brand, website, and how we can bring your vision to life.",
  twitter: {
    card: 'summary_large_image',
  },
}

export default function Booking() {

  return (
    <BookingWidget />
  );
}