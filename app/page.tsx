import HomeHero from '@/components/home-hero';
import HomeWhy from '@/components/why';
import DoContainer from '@/components/do-container';
import ScrollingOptions from '@/components/scrolling-options';
import Pricing from '@/components/pricing/selector';
import Footer from '@/components/layout/footer';

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
