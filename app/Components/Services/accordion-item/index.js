"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@nextui-org/button";
import '../../../styles.css'

export default function AccordionItem({ iconRoute, iconDescription, title, description, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

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
    <div className={`flex flex-col w-full cursor-pointer hover-section ${className}`} onClick={toggleAccordion}>
      <div className={`flex w-full py-[15px] justify-between ${isOpen ? 'no-border' : 'border-b border-solid border-gray-500 delay-500'} hover:text-babyblue-500 hover-bounce`}>
        <div className='flex gap-[10px]'>
          <Image
            src={iconRoute}
            alt={iconDescription}
            layout="intrinsic"
            width={25} // Adjust the width as needed
            height={25} // Adjust the height as needed to maintain aspect ratio
            className="object-contain"
          />
          <p className={`text-center font-gentium-book-plus text-[16px] italic ${isOpen ? 'text-babyblue-500' : 'hover-text-babyblue-500'}`}>
            {title}
          </p>
        </div>
        <Image
          src={isOpen ? "/Up.svg" : "/Down.svg"}
          alt={isOpen ? "Bouncing Up Arrow" : "Bouncing Down Arrow"}
          layout="intrinsic"
          width={11.22} // Adjust the width as needed
          height={6.37} // Adjust the height as needed to maintain aspect ratio
          className="object-contain icon-bounce"
        />
      </div>

      <div ref={contentRef} className={`accordion-content ${isOpen ? 'open' : ''}`}>
        <div className='flex flex-col p-[30px] gap-[30px] pt-0 justify-start border-b border-solid border-babyblue-500'>
          <p className='font-avenir text-[12px]'>
            {description}
          </p>
          <Button
            href="/#pricing"
            className="w-[118px] h-[37px] font-maven-pro text-white text-[12px] rounded-[20px] bg-blue-300">
            View Pricing
          </Button>
        </div>
      </div>
    </div>
  );
}