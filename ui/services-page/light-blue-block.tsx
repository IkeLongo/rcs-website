"use client";

import { useEffect, useState } from 'react';
import Image from "next/image";
import { BlockProps } from '@/types/components';

export default function LightBlueBlock({ iconRoute, iconDescription, iconWidth, title, imageSrc, blockId, onClick, top }: BlockProps) {
  const [isHalfway, setIsHalfway] = useState(false);
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLg(window.innerWidth >= 1024);
    };

    const handleScroll = () => {
      if (!isLg) {
        const element = document.getElementById(blockId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const halfwayPoint = window.innerHeight / 2;
          if (rect.top <= halfwayPoint && rect.bottom >= halfwayPoint) {
            setIsHalfway(true);
          } else {
            setIsHalfway(false);
          }
        }
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    handleResize(); // Set initial value

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [blockId, isLg]);

  return (
    (<div className="group relative flex flex-col w-full aspect-square items-center justify-center gap-[10px] cursor-pointer" onClick={onClick}>
      <Image
        src={imageSrc}
        alt=""
        fill
        className="object-cover object-center"
      />
      <div
        id={blockId}
        className={`relative flex flex-col w-full h-full aspect-square items-center justify-center gap-[10px] ease-in-out duration-500 ${
          isHalfway && !isLg ? 'bg-lightblueoverlay' : 'bg-light-blue-radial-gradient'
        } ${isLg ? 'hover:bg-lightblueoverlay' : ''}`}
      >
        <Image
          src={iconRoute}
          alt={iconDescription}
          width={Number(iconWidth)}
          // Adjust the height as needed to maintain aspect ratio
          height={51}
          className={`object-contain absolute left-1/2 transform -translate-x-1/2 ${top}`}
          style={{
            maxWidth: "100%",
            height: "auto"
          }} />
        <h4
          className={`!font-maven-pro !font-bold ease-in-out duration-500 md:pt-10 ${
            isHalfway && !isLg ? '!text-[28px] !md:text-[18px]' : '!text-[24px] !md:text-[16px]'
          } !text-navy-500 ${isLg ? 'group-hover:!text-[26px] lg:!text-[22px]' : ''}`}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>
    </div>)
  );
}