// app/(site)/page.tsx

import { Suspense } from 'react';
import HomeHero from '@/ui/home/home-hero';
import HomeSeoScanTeaser from '@/ui/home/home-seo-scan-teaser';
import HomeWhy from '@/ui/home/why';
import UniqueWebsites from '@/ui/home/crafting-unique-websites';
import ForgetFittingInContainer from '@/ui/home/forget-fitting-in';
import Portfolio from '@/ui/home/portfolio';
import PricingClient from '@/ui/home/client/pricing-client';
import Footer from '@/ui/layout/footer';
import StickyBottomButton from '@/ui/components/sticky-button-bottom';

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
          <Portfolio />
        </Suspense>
        <Suspense fallback={null}>
          <ForgetFittingInContainer />
        </Suspense>
        <Suspense fallback={null}>
          <PricingClient />
        </Suspense>
        <Suspense fallback={null}>
          <Footer bgGradientClass="bg-footer-bg-gradient" />
        </Suspense>
        <StickyBottomButton />
      </div>
    </div>
  );
}
