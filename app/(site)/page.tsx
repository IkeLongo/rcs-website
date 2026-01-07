// app/(site)/page.tsx

import { Suspense } from 'react';
import HomeHeroClient from '@/app/ui/home/home-hero-client';
import HomeWhy from '@/app/ui/home/why';
import UniqueWebsites from '@/app/ui/home/crafting-unique-websites';
import ExtraordinaryContainer from '@/app/ui/home/extraordinary-container';
import Portfolio from '@/app/ui/home/portfolio';
import Pricing from '@/app/ui/pricing/selector';
import Footer from '@/app/ui/layout/footer';
import StickyBottomButton from '../ui/components/sticky-button-bottom';

export default function Home() {

  return (
    <div className='base relative'>
      <div className="relative h-auto w-full bg-cover bg-top bg-navy-500 overflow-x-hidden">
        <HomeHeroClient />
        <Suspense fallback={null}>
          <HomeWhy />
        </Suspense>
        <Suspense fallback={null}>
          <UniqueWebsites />
        </Suspense>
        <Suspense fallback={null}>
          <ExtraordinaryContainer />
        </Suspense>
        <Suspense fallback={null}>
          <Portfolio />
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
