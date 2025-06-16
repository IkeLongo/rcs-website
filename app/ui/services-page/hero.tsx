
import HeroImages from "@/app/ui/services-page/hero-images";
import { Button } from "@nextui-org/button";
import Link from 'next/link';

export async function Hero() {

  return (
    <div className="relative flex flex-col w-full h-[725px] overflow-x-hidden md:overflow-hidden md:-top-0 bg-white">
      <div className="absolute w-full h-full flex self-end bg-service-hero-bg-blob bg-bottom-right bg-no-repeat overflow-x-hidden md:overflow-hidden -mr-1 md:scale-125 md:-top-0 md:right-0 lg:hidden"></div>
      <div className="hidden lg:block lg:absolute lg:-top-16 lg:w-full lg:h-full lg:flex lg:self-end lg:bg-service-hero-bg-blob lg:bg-right lg:bg-auto lg:bg-no-repeat lg:overflow-x-hidden lg:-mr-1 lg:bg-right-bottom lg:md:scale-150 lg:right-0 lg:origin-right"></div>
      <div className="relative flex flex-col w-full h-full overflow-x-hidden">
        
        {/* Imported Hero Images */}
        <HeroImages />

        <div className="absolute top-28 right-6 h-auto flex flex-col self-end gap-4 md:left-[15%] md:right-auto md:top-60 md:gap-10 lg:left-[10%] lg:top-44 lg:w-[482px] xl:left-[25%]">
          <div className="flex flex-col align-self-end w-68 gap-4">
            <h1 className='font-bold text-right leading-9 md:text-left lg:text-[46px] lg:leading-[3.5rem] text-navy-500'>
              Turn Your <span className='italic text-white md:text-green-500'>Website</span><br/>& <span className='italic text-white md:text-green-500'>Brand</span> into Your<br/>Top Sales Tools
            </h1>
            <h2 className='font-maven-pro font-normal text-base text-right leading-5 md:text-left lg:text-md lg:leading-[1.5rem] lg:w-[300px] xl:w-[336px]'>
              <span className="w-60 block text-navy-500">
                Our brands and websites strategically <span className='lg:hidden'/> 
                connect your services to the right <span className='lg:hidden'/>
                clients, enabling you to raise prices <span className='lg:hidden'/>
                and sell with confidence.
              </span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}