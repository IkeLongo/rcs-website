
import Image from 'next/image';
import {Button, ButtonGroup} from "@nextui-org/button";
import Profiles from '../profiles';

export default function Hero() {

  return (
    <div className="relative flex flex-col w-full h-[1250px] px-4 bg-team-pattern bg-top -top-24 bg-cover overflow-hidden gap-10 shrink-0">
      <div>
        <Image
          src='/blue-elipse.svg'
          alt='Blue elipse'
          width={300}
          height={300}
          className='absolute top-0 -right-10'
        />
      </div>
      <div className='relative flex flex-col h-auto top-60 gap-10'>
        <div className='flex flex-col gap-1'>
          <h1 className='w-auto text-[32px] text-white font-gentium-book-plus font-bold text-left drop-shadow-[2px_10px_4.6px_rgba(0,0,0,0.25)]'>
            Our Team
          </h1>
          <p className='font-avenir text-left text-[14px] leading-5'>
            Meet our team of passionate professionals dedicated to deliver outstanding results for your business. With backgrounds in graphic design, web development, and tech solutions, we have the necessary experience to elevate your online presence.
          </p>
        </div>
        <Profiles />
      </div>
        <Image
          src='/green-elipse.svg'
          alt='Green elipse'
          width={300}
          height={300}
          className='absolute -bottom-60 left-0 rotate-180 -z-10'
        />
    </div>
  );
}