"use client";

import { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import { Button } from "@nextui-org/button";
import Link from 'next/link';
import '/app/styles.css';
import { AccordionItemProps } from '@/types/components';

export default function AccordionItem({ iconRoute, iconDescription, title, description, className }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen && contentRef.current) {
      contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
    } else if (contentRef.current) {
      contentRef.current.style.maxHeight = '0px';
    }
  }, [isOpen]);

  return (
    (<div className={`flex flex-col w-full cursor-pointer hover-section ${className}`} onClick={toggleAccordion}>
      <div className={`flex w-full py-[15px] pr-6 justify-between ${isOpen ? 'no-border' : 'border-b border-solid border-gray-500 delay-500'} hover:text-babyblue-500 hover-bounce`}>
        <div className='flex gap-[10px]'>
          <video
            autoPlay
            loop
            muted
            playsInline
            width={25}
            height={25}
            className="object-contain"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          >
            <source src={`${iconRoute}.webm`} type="video/webm" />
            <source src={`${iconRoute}.mp4`} type="video/mp4" />
          </video>
          <p className={`leading-1 pt-1 text-base italic ${isOpen ? 'text-babyblue-500' : 'hover-text-babyblue-500'}`}>
            {title}
          </p>
        </div>
        <Image
          src={isOpen ? "/Up.svg" : "/Down.svg"}
          alt={isOpen ? "Bouncing Up Arrow" : "Bouncing Down Arrow"}
          // Adjust the width as needed
          width={11.22}
          // Adjust the height as needed to maintain aspect ratio
          height={6.37}
          className="object-contain icon-bounce w-[11.22px] h-[6.37px] md:w-[14px] md:h-[14px] lg:w-[16px] lg:h-[16px]"
          style={{
            maxWidth: "100%",
            height: "auto"
          }} />
      </div>
      <div ref={contentRef} className={`accordion-content ${isOpen ? 'open' : ''}`}>
        <div className='flex flex-col p-[30px] gap-[30px] pt-0 justify-start border-b border-solid border-babyblue-500'>
          <p className='text-left'>
            {description}
          </p>
          <Link href="/#plan" passHref scroll={false}>
            <Button className="w-[118px] h-[37px] font-maven-pro text-white text-[12px] md:text-[14px] rounded-[20px] bg-blue-300">
              View Pricing
            </Button>
          </Link>
        </div>
      </div>
    </div>)
  );
}