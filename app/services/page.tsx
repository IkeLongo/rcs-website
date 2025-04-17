import { Hero } from '@/components/services-page/hero';
import Process from '@/components/services-page/process';
import ServiceBlocks from '@/components/services-page/service-blocks';
import { Footer } from '@/components/layout/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Branding & Web Design Services',
  description: 'Explore our creative services—branding, web design, e-commerce development, and ongoing support. Serving small businesses in San Antonio and beyond.',
  twitter: {
    card: 'summary_large_image',
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