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
    <div className="flex flex-col w-full mt-20 md:mt-32 md:mb-20">
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

      <div className="flex flex-col w-full top-24 z-10 p-6 md:top-4 md:flex md:flex-row-reverse md:items-center md:justify-center md:px-20 lg:right-10 xl:right-20">
        <div className="flex flex-col items-end justify-end w-full md:w-auto md:items-end md:justify-end md:w-1/2">
          <h1 className="w-full md:w-[340px] lg:w-[400px] right-4 self-end text-right text-white">
            Crafting Powerful<br />
            <span className="italic text-lime-500">Websites</span> and <span className="italic text-lime-500">Branding</span><br />for Your Business
          </h1>

          <h2 className="font-avenir text-base font-normal lg:text-base text-white text-right mt-4 w-auto max-w-[350px] md:w-[340px] lg:w-[400px] self-end">
            Propel your business forward with innovative web
            solutions, reliable hosting, and impactful branding.
          </h2>
        </div>

        <div className="w-full md:w-1/2">
          <Carousel images={images} showDots={false} className="pt-10"/>
        </div>
      </div>
      <div className="left-[10%] top-[500px] md:top-[150px]">
      </div>
    </div>
  </>
  );
}
