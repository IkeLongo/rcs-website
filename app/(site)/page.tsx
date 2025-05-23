import { Suspense, lazy } from 'react';

import HomeHero from '@/app/ui/home/home-hero';
const HomeWhy = lazy(() => import('@/app/ui/home/why'));
const DoContainer = lazy(() => import('@/app/ui/home/do-container'));
const OptionsContainer = lazy(() => import('@/app/ui/home/options-container'));
const Pricing = lazy(() => import('@/app/ui/pricing/selector'));
const Footer = lazy(() => import('@/app/ui/layout/footer'));
import StickyBottomButton from '../ui/components/sticky-button-bottom';

export default function Home() {

  return (
    <div className='relative'>
      <div className="relative h-auto w-full bg-cover bg-top bg-navy-500 overflow-x-hidden">
        <HomeHero />
        <Suspense fallback={null}>
          <HomeWhy />
        </Suspense>
        <Suspense fallback={null}>
          <DoContainer />
        </Suspense>
        <Suspense fallback={null}>
          <OptionsContainer />
        </Suspense>
        <Suspense fallback={null}>
          <Pricing />
        </Suspense>
        <Suspense fallback={null}>
          <Footer bgGradientClass="bg-footer-bg-gradient" />
        </Suspense>
        <StickyBottomButton />
      </div>
    </div>
  );
}
