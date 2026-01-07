// app/ui/services-page/services-client.tsx
"use client";

import dynamic from 'next/dynamic';

const Process = dynamic(() => import('./process'), { ssr: false });
const ServiceBlocks = dynamic(() => import('./service-blocks'), { ssr: false });

export default function ServicesClient() {
  return (
    <>
      <Process />
      <ServiceBlocks />
    </>
  );
}
