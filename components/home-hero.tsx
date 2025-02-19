import Image from 'next/image';
import { Button } from "@nextui-org/button";
import Link from 'next/link';

export async function HomeHero() {

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full md:top-20 h-[800px] md:h-[550px]">
        {/* Mobile-only image */}
        <Image 
          src="/home-hero-blob.svg"
          alt="Background-blob"
          width={417}
          height={653}
          className="absolute left-auto -right-6 top-0 md:hidden"
        />
        {/* Tablet and desktop-only image */}
        <Image 
          src="/home-hero-blob-tablet.svg"
          alt="Background-blob"
          width={417}
          height={653}
          className="hidden md:block absolute top-0 md:left-auto md:-right-2 md:-top-32 md:w-[450px] md:h-[647px] lg:w-[750px] lg:h-[732px] lg:-right-20 xl:hidden"
        />
        {/* XL screen size */}
        <Image 
          src="/home-hero-blob-xl.svg"
          alt="Background-blob"
          width={417}
          height={653}
          className="hidden xl:block absolute -top-28 xl:w-[950px] xl:h-auto xl:-right-48"
        />
        <div className="absolute top-32 right-4 z-10 p-6 md:top-4 md:right-0 md:left-auto md:flex md:flex-col md:items-end md:justify-end lg:right-10 xl:right-20">
          <h1 className="w-[292px] text-[32px] text-gray-900 font-gentium-book-plus font-bold text-right md:hidden">
            Crafting <span className='italic text-blue-300'>Powerful</span><br />
            Websites and<br />Branding for<br />Your Business
          </h1>
          <h1 className="hidden md:block md:w-[340px] md:text-[32px] md:text-gray-900 md:font-gentium-book-plus md:font-bold md:text-right lg:text-[36px] lg:w-[400px]">
            Crafting <span className='italic text-blue-300'>Powerful</span><br />
            Websites and Branding<br />for Your Business<br />
          </h1>
          <p className="text-gray-800 text-[14px] text-right mt-4 md:hidden">
            Propel your business forward with<br />
            innovative web solutions, reliable<br />
            hosting, and impactful branding.
          </p>
          <p className="hidden md:block md:text-gray-800 md:text-[14px] md:text-right md:mt-4 lg:text-[16px]">
            Propel your business forward with innovative web<br />
            solutions, reliable hosting, and impactful branding.<br />
          </p>
          <div className="flex justify-end mt-4 md:mt-10">
            <Link href="/booking" passHref>
              <Button className="w-[140px] h-[36px] font-maven-pro text-blue-700 text-[12px] font-bold rounded-[24px] bg-babyblue-300 lg:text-[16px] lg:w-[180px] lg:h-[48px]">
                Book a Call
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute left-[10%] top-[500px] md:top-[150px]">
          <Image
            src="/home-hero-gif-blob.svg"
            alt="Hero gif background blob"
            width={224}
            height={212}
            className="w-[224px] h-[212px] lg:w-[300px] lg:h-[300px] 2xl:w-[400px] 2xl:h-[400px]"
          />
          <img
            src="/home-page-gif.gif"
            alt="Home page gif"
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      </div>
    </>
  );
}
