// app/ui/home/home-hero-client.tsx
"use client";

import dynamic from 'next/dynamic';

const HomeHero = dynamic(() => import('./home-hero'), { ssr: false });

export default function HomeHeroClient() {
  return <HomeHero />;
}
