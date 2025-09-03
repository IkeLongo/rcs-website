// "use client";

import Image from "../components/image";
import Carousel from "../components/carosel";

const images = [
  { src: "/hero-devices.webp", alt: "Responsive web design on different devices." },
  { src: "/hero-people-excited.webp", alt: "Excited people seeing their website" },
  { src: "/hero-phone-layouts.webp", alt: "Web design on phones." },
  { src: "/hero-phone-in-hand.webp", alt: "Phone in hand showing website design." },
];

export default function HomeHero() {

  return (
  <>
    {/* Hero Section */}
    <div className="flex flex-col w-full bg-alice-blue-500 overflow-hidden">
      {/* Background squiggly images */}
      <Image
        src="/mobile-hero-vector-right.svg"
        alt="Background squiggle 1"
        width={200}
        height={200}
        className="absolute right-0 top-0 z-0 pointer-events-none select-none"
        style={{ pointerEvents: "none", userSelect: "none" }}
      />
      <Image
        src="/mobile-hero-vector-left.svg"
        alt="Background squiggle 2"
        width={200}
        height={200}
        className="absolute left-0 top-20 z-0 pointer-events-none select-none"
        style={{ pointerEvents: "none", userSelect: "none" }}
      />

      <div className="relative flex flex-col w-full min-h-screen lg:max-w-[1120px] z-10 p-6 md:top-4 md:px-20 lg:self-center">
        <div className="flex flex-col w-full pt-32 self-center md:w-auto md:items-end md:justify-end md:w-1/2">
          <h1 className="w-full right-4 text-navy-500">
            Crafting Powerful <span className="italic text-neongreen-700">Websites</span> and<br /><span className="italic text-neongreen-700">Branding </span>for Your Business
          </h1>
        </div>
        {/* Centered, bottom-positioned div */}
        <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-[1220px] flex flex-col items-center">
          <Image
            src="/hero-elipse.webp"
            alt="Background elipse"
            width={890}
            height={800}
            className="z-0 pointer-events-none select-none -mt-[600px]"
            style={{ pointerEvents: "none", userSelect: "none" }}
          />
          <Image
            src="/hero-blob.webp"
            alt="Background blob"
            width={800}
            height={650}
            className="z-10 pointer-events-none select-none -mt-[500px]" // negative margin to overlap
            style={{ pointerEvents: "none", userSelect: "none" }}
          />
          {/* Barb and Isaac */}
          <div className="absolute left-1/2 bottom-2 transform -translate-x-1/2 flex items-end justify-center -gap-10 z-20 w-full">
            <Image
              src="/barb.webp"
              alt="Barb"
              width={350}
              height={450}
              className="-mr-8 z-20"
            />
            <Image
              src="/isaac.webp"
              alt="Isaac"
              width={300}
              height={400}
              className="-ml-8 z-30"
            />
          </div>
        </div>
      </div>
    </div>
  </>
  );
}
