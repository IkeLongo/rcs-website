
import Image from 'next/image';
import {Button, ButtonGroup} from "@nextui-org/button";

export default function Process() {

  return (
    <div className="relative flex flex-col w-full h-[775px] overflow-x-hidden">
      <div className="absolute -top-16 w-full h-full flex self-end bg-service-hero-blob bg-right bg-auto bg-no-repeat overflow-x-hidden -mr-1">
      </div>
      <div className="relative flex flex-col w-full h-full overflow-x-hidden">
        <div className="absolute -right-4 top-6 w-full h-auto flex justify-end transform rotate--4.961 overflow-x-hidden">
          <Image
            src="/Bouncing planets and blinking stars in space.gif"
            alt="Bouncing Planets and blinking stars in space"
            layout="intrinsic"
            width={311} // Adjust the width as needed
            height={491.44} // Adjust the height as needed
            className="object-contain"
            priority // Preload this image
            loading="eager" // Load this image eagerly
          />
        </div>
        <div className="absolute right-20 top-20 w-full h-auto flex justify-end">
          <Image
            src="/Large Rotating Plannet.gif"
            alt="Large Rotating Planet"
            layout="intrinsic"
            width={100} // Adjust the width as needed
            height={89} // Adjust the height as needed
            className="object-contain"
            priority // Preload this image
            loading="eager" // Load this image eagerly
          />
        </div>
        <div className="absolute right-40 top-96 w-full h-auto flex justify-end">
          <Image
            src="/Cloud.gif"
            alt="Small Cloud"
            layout="intrinsic"
            width={60} // Adjust the width as needed
            height={60} // Adjust the height as needed
            className="object-contain"
            priority // Preload this image
            loading="eager" // Load this image eagerly
          />
        </div>
        <div className="absolute right-4 bottom-60 w-full h-auto flex justify-end">
          <Image
            src="/Cloud.gif"
            alt="Big Cloud"
            layout="intrinsic"
            width={141} // Adjust the width as needed
            height={141} // Adjust the height as needed
            className="object-contain"
            priority // Preload this image
            loading="eager" // Load this image eagerly
          />
        </div>
        <div className="absolute right-36 bottom-52 w-full h-auto flex justify-end">
          <Image
            src="/Main clip art.svg"
            alt="Creative cloud clipart with web designers"
            layout="intrinsic"
            width={225} // Adjust the width as needed
            height={130} // Adjust the height as needed
            className="object-contain"
            priority // Preload this image
            loading="eager" // Load this image eagerly
          />
        </div>
        <div className="absolute w-[336px] top-48 right-6 w-full h-auto flex flex-col self-end gap-4">
          <h1 className='font-gentium-book-plus text-[32px] font-bold text-right leading-9'>
            Turn Your Website<br/>& Brand into Your<br/>Top <span className='italic text-blue-300'>Sales </span>Tools
          </h1>
          <h2 className='font-maven-pro text-[14px] text-right leading-4'>
            Our brands and websites strategically<br/> connect your services to the right clients,<br/> enabling you to raise prices and sell<br/> with confidence.
          </h2>
        </div>
      </div>
      <Button
        href="/booking"
        className="absolute bottom-0 w-[260px] h-[45px] self-center font-maven-pro text-white text-[14px] rounded-[20px] bg-blue-300">
        Book a Call
      </Button>
    </div>
  );
}