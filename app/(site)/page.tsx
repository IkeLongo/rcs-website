// app/(site)/page.tsx

import { Suspense } from 'react';
import HomeHero from '@/app/ui/home/home-hero';
import HomeSeoScanTeaser from '../ui/home/home-seo-scan-teaser';
import HomeWhy from '../ui/home/why';
import UniqueWebsites from '@/app/ui/home/crafting-unique-websites';
import ForgetFittingInContainer from '../ui/home/forget-fitting-in';
import Portfolio from '@/app/ui/home/portfolio';
import Pricing from '@/app/ui/pricing/selector';
import Footer from '@/app/ui/layout/footer';
import StickyBottomButton from '../ui/components/sticky-button-bottom';

export default function Home() {

  return (
    <div className='base relative'>
      <div className="relative h-auto w-full bg-cover bg-top bg-navy-500 overflow-x-hidden">
        <HomeHero />
        <Suspense fallback={null}>
          <HomeSeoScanTeaser />
        </Suspense>
        <Suspense fallback={null}>
          <HomeWhy />
        </Suspense>
        <Suspense fallback={null}>
          <UniqueWebsites />
        </Suspense>
        <Suspense fallback={null}>
          <ForgetFittingInContainer />
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
