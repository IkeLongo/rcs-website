"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, ButtonGroup } from "@nextui-org/button";

export default function LightBlueBlock({ iconRoute, iconDescription, iconWidth, title, bgImageClass, blockId }) {
  const [isHalfway, setIsHalfway] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
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
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [blockId]);

  return (
    <div className={`flex flex-col w-full aspect-square items-center justify-center gap-[10px] ${bgImageClass} bg-center`}>
      <div
        id={blockId}
        className={`flex flex-col w-full h-full aspect-square items-center justify-center gap-[10px] ${
          isHalfway ? 'bg-babyblueoverlay' : 'bg-babyblue-500'
        }`}
      >
        <Image
          src={iconRoute}
          alt={iconDescription}
          layout="intrinsic"
          width={iconWidth} // Adjust the width as needed
          height={iconWidth} // Adjust the height as needed to maintain aspect ratio
          className="object-contain"
        />
        <h1
          className={`font-maven-pro text-center font-bold ease-in-out duration-500 ${
            isHalfway ? 'text-[28px]' : 'text-[24px]'
          } text-gray-900`}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>
    </div>
  );
}