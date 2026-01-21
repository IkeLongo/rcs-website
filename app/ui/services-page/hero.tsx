
import HeroImages from "@/app/ui/services-page/hero-images";
import Image from "next/image";
// import FadeInUp from "@/app/ui/components/fade-in-up";

export async function Hero() {

  return (
    <div className="relative flex flex-col w-full h-[725px] overflow-x-hidden md:overflow-hidden md:-top-0 bg-white">
      <div className="absolute w-full h-full flex self-end overflow-x-hidden md:overflow-hidden -mr-1 md:scale-125 md:-top-0 md:right-0 lg:hidden">
        <Image
          src="/service-hero-bg-blob.webp"
          alt=""
          fill
          className="object-contain object-bottom object-right"
        />
      </div>
      <div className="hidden lg:block lg:absolute lg:-top-0 lg:w-full lg:h-full lg:flex lg:self-end lg:mr-32 xl:mr-60 2xl:mr-96">
        <Image
          src="/service-hero-bg-blob.webp"
          alt=""
          fill
          className="object-contain object-right-bottom scale-125 xl:scale-150"
        />
      </div>
      <div className="relative flex flex-col w-full h-full overflow-x-hidden">
        
        {/* Imported Hero Images */}
        <HeroImages />

        <div className="absolute top-28 right-6 h-auto flex flex-col self-end gap-4 md:left-[15%] md:right-auto md:top-60 md:gap-10 lg:left-[10%] lg:top-44 lg:w-[482px] xl:left-[25%]">
          <div className="flex flex-col align-self-end w-68 gap-4">
            <h1 className='!font-bold !text-left leading-9 !md:text-left !md:text-2xl !lg:text-[64px] !lg:leading-[3.5rem] !text-navy-500'>
              {/* <FadeInUp> */}
                Turn Your <span className='italic text-white md:text-green-500'>Website</span><br/>& <span className='italic text-white md:text-green-500'>Brand</span> into Your<br/>Top Sales Tools
              {/* </FadeInUp> */}
            </h1>
            <h2 className='!font-maven-pro !font-normal !text-base !text-left leading-5 !md:text-left !lg:text-md2 !lg:leading-[1.5rem] !lg:w-[300px] !xl:w-[336px]'>
              {/* <FadeInUp> */}
                <span className="w-60 block text-navy-500 text-right md:text-left">
                  Our brands and websites strategically <span className='lg:hidden'/> 
                  connect your services to the right <span className='lg:hidden'/>
                  clients, enabling you to raise prices <span className='lg:hidden'/>
                  and sell with confidence.
                </span>
              {/* </FadeInUp> */}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}