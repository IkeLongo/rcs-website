import { Hero } from '@/app/ui/services-page/hero';
import Process from '@/app/ui/services-page/process';
import ServiceBlocks from '@/app/ui/services-page/service-blocks';
import Footer from '@/app/ui/layout/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Branding & Web Design Services',
  description: 'Explore our creative services—branding, web design, e-commerce development, and ongoing support. Serving small businesses in San Antonio and beyond.',
  twitter: {
    card: 'summary_large_image',
  },
  openGraph: {
    images: [
      {
        url: 'https://rivercitycreatives.com/services', // Custom OpenGraph image for the booking page
        width: 1200,
        height: 630,
        alt: 'Services | RiverCity Creatives Web Design & Branding',
        type: 'website', // Specify the MIME type
      },
    ],
  },
  alternates: {
    canonical: 'https://rivercitycreatives.com/services', // Add your canonical URL here
  },
}

export default function Services() {

  return (
    <div className='flex flex-col overflow-x-hidden services'>
      <Hero />
      <Process />
      <ServiceBlocks />
      <Footer 
        bgGradientClass='bg-footer-bg-gradient-solid'
      />
    </div>
  );
}