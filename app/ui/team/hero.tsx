import Image from "next/image";
import Profiles from './profiles';

export async function Hero() {
  return (
    (<div className="relative flex flex-col w-full h-auto px-4 mb-20 bg-navy-500 bg-top bg-repeat-x bg-auto overflow-visible gap-10 shrink-0 md:-top-0 md:mb-20">
      {/* Decorative Image */}
      <Image
        src='/blue-elipse.svg'
        alt='Blue elipse'
        width={300}
        height={300}
        className='absolute -top-10 -right-32'
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
      {/* Main Content */}
      <div className="relative flex flex-col h-auto gap-10 mt-28 md:mt-40 md:z-5">
        {/* Heading and Description */}
        <div className="flex flex-col gap-1 max-w-96 self-center md:w-full md:max-w-[900px] md:px-16">
          <h1 className="w-auto text-left font-bold drop-shadow-[2px_10px_4.6px_rgba(0,0,0,0.25)] lg:text-[46px]">
            Our Team
          </h1>
          <p className="font-avenir text-left leading-5">
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
        className='absolute -bottom-80 left-0 rotate-180 z-0 md:left-32 md:-bottom-80 md:z-0'
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
    </div>)
  );
}