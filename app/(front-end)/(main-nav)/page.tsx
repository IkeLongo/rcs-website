// app/(site)/page.tsx

import { Suspense } from 'react';
import HomeHero from '@/app/components/layouts/home/home-hero';
import HomeSeoScanTeaser from '@/app/components/layouts/home/home-seo-scan-teaser';
import HomeWhy from '@/app/components/layouts/home/why';
import UniqueWebsites from '@/app/components/layouts/home/crafting-unique-websites';
import ForgetFittingInContainer from '@/app/components/layouts/home/forget-fitting-in';
import Portfolio from '@/app/components/layouts/home/portfolio';
import PricingClient from '@/app/components/layouts/home/client/pricing-client';
import Footer from '@/app/components/layouts/footer/footer';
import StickyBottomButton from '@/app/components/ui/buttons/sticky-button-bottom';
import { TestimonialsWithCarousel } from '@/app/components/ui/carousels/testimonials-with-carousel';

export default function Home() {

  return (
    <div className='base relative'>
      <div className="relative h-auto w-full bg-cover bg-top bg-navy-500 overflow-x-hidden">
        <HomeHero />
        <Suspense fallback={null}>
          <HomeSeoScanTeaser />
        </Suspense>
        <Suspense fallback={null}>
          <TestimonialsWithCarousel />
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
