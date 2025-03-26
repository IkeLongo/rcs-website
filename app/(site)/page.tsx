import { HomeHero } from '@/app/ui/home/home-hero';
import { HomeWhy } from '@/app/ui/home/why';
import { DoContainer } from '@/app/ui/home/do-container';
import ScrollingOptions from '@/app/ui/home/scrolling-options';
import Pricing from '@/app/ui/pricing/selector';
import { Footer } from '@/app/ui/layout/footer';

export default function Home() {

  return (
    <div className='relative'>
      <div className="relative h-auto w-full bg-cover bg-top bg-home-pattern overflow-x-hidden">
        <HomeHero />
        <HomeWhy />
        <DoContainer />
        <ScrollingOptions />
        <Pricing />
        <Footer 
          bgGradientClass='bg-footer-bg-gradient'
        />
      </div>
    </div>
  );
}
