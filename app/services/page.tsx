import Hero from '@/components/services-page/hero';
import Process from '@/components/services-page/process';
import ServiceBlocks from '@/components/services-page/service-blocks';
import { Footer } from '@/components/layout/footer';

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