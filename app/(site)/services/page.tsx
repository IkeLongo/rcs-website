import { Hero } from '@/app/ui/services-page/hero';
import Process from '@/app/ui/services-page/process';
import ServiceBlocks from '@/app/ui/services-page/service-blocks';
import { Footer } from '@/app/ui/layout/footer';

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