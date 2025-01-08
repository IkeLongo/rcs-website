"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, ButtonGroup } from "@nextui-org/button";

export default function DarkBlueBlock({ iconRoute, iconDescription, iconWidth, title, bgImageClass, blockId, onClick, top }) {
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
    <div className={`group flex flex-col w-full aspect-square items-center justify-center gap-[10px] ${bgImageClass} bg-center bg-cover cursor-pointer`} onClick={onClick}>
      <div
        id={blockId}
        className={`relative flex flex-col w-full h-full aspect-square items-center justify-center gap-[10px] ease-in-out duration-500 ${
          isHalfway && !isLg ? 'bg-darkblueoverlay' : 'bg-babyblue-700'
        } ${isLg ? 'hover:bg-darkblueoverlay' : ''}`}
      >
        <Image
          src={iconRoute}
          alt={iconDescription}
          layout="intrinsic"
          width={iconWidth} // Adjust the width as needed
          height={51} // Adjust the height as needed to maintain aspect ratio
          className={`object-contain absolute left-1/2 transform -translate-x-1/2 ${top}`}
        />
        <h1
          className={`font-maven-pro text-center font-bold ease-in-out duration-700 md:pt-10 ${
            isHalfway && !isLg ? 'text-[28px] md:text-[18px]' : 'text-[24px] md:text-[16px]'
          } text-gray-900 ${isLg ? 'group-hover:text-[26px] lg:text-[22px]' : ''}`}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>
    </div>
  );
}