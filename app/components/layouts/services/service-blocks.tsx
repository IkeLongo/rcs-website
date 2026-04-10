"use client";

import { useRouter } from 'next/navigation';
import { LaptopMinimal, Palette, TrendingUp } from "lucide-react";
import LightBlueBlock from "./light-blue-block";
import DarkBlueBlock from "./dark-blue-block";

export default function ServiceBlocks() {
  const router = useRouter();

  return (
    <div className="relative flex flex-col w-full h-auto items-center justify-center bg-navy-500 z-40">
      <div className="flex flex-col h-auto w-full items-center justify-center md:flex-row">
        <LightBlueBlock
          icon={LaptopMinimal}
          title="Website Design & <br />Development"
          imageSrc="/website-engineer.webp"
          blockId="block-1"
          onClick={() => router.push('/services/web-design-development')}
          top="top-[25%]"
        />
        <DarkBlueBlock
          icon={Palette}
          title="Branding & Visual<br />Identity"
          imageSrc="/website-design-tools.webp"
          blockId="block-2"
          onClick={() => router.push('/services/branding-visual-identity')}
          top="top-[22%]"
        />
        <LightBlueBlock
          icon={TrendingUp}
          title="Lead Capture &<br />Growth Systems"
          imageSrc="/female-finger-touching-a-beam-of-light-surrounded.webp"
          blockId="block-3"
          onClick={() => router.push('/services/lead-capture-growth-systems')}
          top="top-[25%]"
        />
      </div>
    </div>
  );
}
