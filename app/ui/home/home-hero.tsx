import Image from "next/image";
import { Button } from "@heroui/button";
import Link from 'next/link';
import HeroBlob from './hero-blob';

export async function HomeHero() {

  return (<>
    {/* Hero Section */}
    <div className="relative w-full md:top-20 h-[800px] md:h-[550px]">
      {/* Mobile-only image */}
      <HeroBlob />
      <div className="absolute flex flex-col top-32 right-0 z-10 p-6 md:top-4 md:right-0 md:left-auto md:flex md:flex-col md:items-end md:justify-end lg:right-10 xl:right-20">
        <h1 className="w-[250px] md:w-[340px] lg:w-[400px] self-end text-right text-gray-900">
          Crafting <span className="italic text-blue-300">Powerful</span><br />
          Websites and Branding for Your Business
        </h1>

        <p className="text-gray-800 text-right mt-4 w-[250px] md:w-[340px] lg:w-[400px] self-end">
          Propel your business forward with innovative web
          solutions, reliable hosting, and impactful branding.
        </p>

        <div className="flex justify-end mt-4 md:mt-10">
          <Link href="/booking" passHref>
            <Button
              className="bg-babyblue-300 text-blue-700 font-bold"
              radius="lg"
              variant="solid"
            >
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
          style={{
            maxWidth: "100%",
            height: "auto"
          }} />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full" // Same styles as the <img> element
        >
          <source src="home-hero-animation.webm" type="video/webm" />
          <source src="home-hero-animation.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  </>);
}
