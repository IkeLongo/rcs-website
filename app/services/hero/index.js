
import Image from 'next/image';
import {Button, ButtonGroup} from "@nextui-org/button";
import Link from 'next/link';

export default function Process() {

  return (
    <div className="relative flex flex-col w-full h-[775px] overflow-x-hidden md:-top-28">
      <div className="absolute -top-16 w-full h-full flex self-end bg-service-hero-blob bg-right bg-auto bg-no-repeat overflow-x-hidden -mr-1 md:-top-0 lg:hidden"></div>
      <div className="hidden lg:block lg:absolute lg:-top-16 lg:w-full lg:h-full lg:flex lg:self-end lg:bg-service-hero-blob-desktop lg:bg-right lg:bg-auto lg:bg-no-repeat lg:overflow-x-hidden lg:-mr-1 lg:bg-right-bottom"></div>
      <div className="relative flex flex-col w-full h-full overflow-x-hidden">
        <div className="absolute -right-4 -top-28 w-[311px] h-[491px] flex justify-end transform rotate--4.961 overflow-x-hidden md:-top-20 lg:w-[400px] lg:-top-32 lg:right-12 lg:rotate-[-10deg]">
          <Image
            src="/Bouncing planets and blinking stars in space.gif"
            alt="Bouncing Planets and blinking stars in space"
            layout="fill" // Make the image fill the parent container
            className="object-contain"
            priority // Preload this image
            loading="eager" // Load this image eagerly
          />
        </div>
        <div className="absolute right-20 top-28 w-[100px] h-[89px] flex justify-end md:top-60 lg:top-20 lg:right-48">
          <Image
            src="/Large Rotating Plannet.gif"
            alt="Large Rotating Planet"
            layout="fill" // Make the image fill the parent container
            className="object-contain"
            priority // Preload this image
            loading="eager" // Load this image eagerly
          />
        </div>
        <div className="absolute right-4 bottom-40 w-[40px] h-[96px] flex justify-end lg:right-10 lg:top-[400px]">
          <Image
            src="/Cloud.gif"
            alt="Small Cloud"
            layout="fill" // Make the image fill the parent container
            className="object-contain"
            priority // Preload this image
            loading="eager" // Load this image eagerly
          />
        </div>
        <div className="absolute right-4 bottom-52 w-[141px] h-[141px] flex justify-end md:bottom-52 lg:right-40 lg:bottom-80">
          <Image
            src="/Cloud.gif"
            alt="Big Cloud"
            layout="fill" // Make the image fill the parent container
            className="object-contain"
            priority // Preload this image
            loading="eager" // Load this image eagerly
          />
        </div>
        <div className="absolute right-36 bottom-40 w-[225px] h-[130px] flex justify-end md:bottom-40 lg:w-[250px] lg:h-[190px] lg:right-80 lg:bottom-[288px] overflow-hidden">
          <Image
            src="/Main clip art.svg"
            alt="Creative cloud clipart with web designers"
            layout="fill" // Make the image fill the parent container
            className="object-contain"
            priority // Preload this image
            loading="eager" // Load this image eagerly
          />
        </div>
        <div className="absolute w-[336px] top-48 right-6 w-full h-auto flex flex-col self-end gap-4 md:left-[15%] md:right-auto md:top-60 md:gap-10 lg:left-[10%] lg:top-44 lg:w-[482px] xl:left-[25%]">
          <h1 className='font-gentium-book-plus text-[32px] font-bold text-right leading-9 md:text-left lg:text-[46px] lg:leading-[3.5rem]'>
            Turn Your Website<br/>& Brand into Your<br/>Top <span className='italic text-blue-300'>Sales </span>Tools
          </h1>
          <h2 className='font-maven-pro text-[14px] text-right leading-4 md:text-left lg:text-[16px] lg:leading-[1.5rem] lg:w-[300px] xl:w-[336px]'>
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