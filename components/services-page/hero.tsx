
import HeroImages from "@/components/services-page/hero-images";
import { Button } from "@nextui-org/button";
import Link from 'next/link';

export async function Hero() {

  return (
    <div className="relative flex flex-col w-full h-[775px] overflow-x-hidden md:-top-0">
      <div className="absolute -top-16 w-full h-full flex self-end bg-service-hero-blob bg-right bg-auto bg-no-repeat overflow-x-hidden -mr-1 md:-top-0 lg:hidden"></div>
      <div className="hidden lg:block lg:absolute lg:-top-16 lg:w-full lg:h-full lg:flex lg:self-end lg:bg-service-hero-blob-desktop lg:bg-right lg:bg-auto lg:bg-no-repeat lg:overflow-x-hidden lg:-mr-1 lg:bg-right-bottom"></div>
      <div className="relative flex flex-col w-full h-full overflow-x-hidden">
        
        {/* Imported Hero Images */}
        <HeroImages />

        <div className="absolute w-[336px] top-48 right-6 w-full h-auto flex flex-col self-end gap-4 md:left-[15%] md:right-auto md:top-60 md:gap-10 lg:left-[10%] lg:top-44 lg:w-[482px] xl:left-[25%]">
          <h1 className='font-bold text-right leading-9 md:text-left lg:text-[46px] lg:leading-[3.5rem]'>
            Turn Your Website<br/>& Brand into Your<br/>Top <span className='italic text-blue-300'>Sales </span>Tools
          </h1>
          <h2 className='font-maven-pro font-normal text-sm text-right leading-4 md:text-left lg:text-md lg:leading-[1.5rem] lg:w-[300px] xl:w-[336px]'>
            Our brands and websites strategically<br className='lg:hidden'/> connect your services to the right<br className='lg:hidden'/>clients, enabling you to raise prices<br className='lg:hidden'/>and sell with confidence.
          </h2>
          <div className="hidden md:block">
            <Link href="/booking" passHref>
              <Button className="w-[157px] h-[45px] font-maven-pro text-white text-[14px] rounded-[24px] bg-blue-300">
                Book a Call
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center md:hidden">
        <Link href="/booking" passHref>
          <Button className="w-[260px] h-[45px] font-maven-pro text-white text-[14px] rounded-[20px] bg-blue-300">
            Book a Call
          </Button>
        </Link>
      </div>
    </div>
  );
}