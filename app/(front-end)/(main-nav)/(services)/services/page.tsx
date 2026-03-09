// app/(site)/(services)/services/page.tsx

import { Hero } from '@/app/components/layouts/services/hero';
import Footer from '@/app/components/layouts/footer/footer';
import { Metadata } from 'next';
import StickyBottomButton from '@/app/components/ui/buttons/sticky-button-bottom';
import ServiceBlocks from '@/app/components/layouts/services/service-blocks';
import Process from '@/app/components/layouts/services/process';

export const metadata: Metadata = {
  title: 'Branding & Web Design Services',
  description: 'Explore our creative services—branding, web design, e-commerce development, and ongoing support. Serving small businesses in San Antonio and beyond.',
  twitter: {
    card: 'summary_large_image',
  },
  openGraph: {
    type: 'website',
    images: [
      {
        url: 'https://rivercitycreatives.com/services', // Custom OpenGraph image for the booking page
        width: 1200,
        height: 630,
        alt: 'Services | RiverCity Creatives Web Design & Branding',
      },
    ],
  },
  alternates: {
    canonical: 'https://rivercitycreatives.com/services', // Add your canonical URL here
  },
}

export default function Services() {

  return (
    <div className='base flex flex-col overflow-x-hidden services'>
      <Hero />
      <Process />
      <ServiceBlocks />
      <StickyBottomButton />
      <Footer 
        bgGradientClass='bg-footer-bg-gradient-solid'
      />
    </div>
  );
}