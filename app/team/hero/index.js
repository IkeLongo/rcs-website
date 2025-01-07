import Image from 'next/image';
import { Button, ButtonGroup } from "@nextui-org/button";
import Profiles from '../profiles';

export default function Hero() {
  return (
    <div className="relative flex flex-col w-full h-auto px-4 mb-20 bg-team-pattern bg-cover bg-top bg-auto overflow-visible gap-10 shrink-0 md:-top-32 md:h-[calc(100vh)]">
      {/* Decorative Image */}
      <Image
        src='/blue-elipse.svg'
        alt='Blue elipse'
        width={300}
        height={300}
        className='absolute -top-10 -right-32'
      />

      {/* Main Content */}
      <div className="relative flex flex-col h-auto gap-10 mt-28 md:mt-36">
        {/* Heading and Description */}
        <div className="flex flex-col gap-1 max-w-96 self-center md:max-w-[420px] md:mx-16 md:self-start">
          <h1 className="w-auto text-[32px] text-white font-gentium-book-plus font-bold text-left drop-shadow-[2px_10px_4.6px_rgba(0,0,0,0.25)]">
            Our Team
          </h1>
          <p className="font-avenir text-left text-[14px] leading-5">
            Meet our team of passionate professionals dedicated to delivering outstanding results for your business. With backgrounds in graphic design, web development, and tech solutions, we have the necessary experience to elevate your online presence.
          </p>
        </div>

        {/* Profiles Component */}
        <Profiles />
      </div>

      {/* Decorative Image */}
      <Image
        src='/green-elipse.svg'
        alt='Green elipse'
        width={300}
        height={300}
        className='absolute -bottom-80 left-0 rotate-180 -z-10 md:left-32'
      />
    </div>
  );
}
