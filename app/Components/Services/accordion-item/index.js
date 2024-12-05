"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from "@nextui-org/button";
import '../../../styles.css'

export default function AccordionItem() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='flex flex-col w-full'>
      {/* Closed State */}
      {!isOpen && (
        <div className="flex w-full py-[15px] justify-between border-b border-solid border-gray-500 cursor-pointer hover:text-babyblue-500 hover-bounce" onClick={toggleAccordion}>
          <div className='flex gap-[10px]'>
            <Image
              src="/services-Target.gif"
              alt="Target gif"
              layout="intrinsic"
              width={25} // Adjust the width as needed
              height={25} // Adjust the height as needed to maintain aspect ratio
              className="object-contain"
            />
            <p className='text-center font-gentium-book-plus text-[16px] italic'>
              Who Should Consider This?
            </p>
          </div>
          <Image
            src="/Down.svg"
            alt="Bouncing down Arrow"
            layout="intrinsic"
            width={11.22} // Adjust the width as needed
            height={6.37} // Adjust the height as needed to maintain aspect ratio
            className="object-contain icon-bounce"
          />
        </div>
      )}

      {/* Open State */}
      {isOpen && (
        <div className='flex flex-col w-full border-b border-solid border-babyblue-500 cursor-pointer hover-bounce'>
          <div className="flex w-full py-[15px] justify-between" onClick={toggleAccordion}>
            <div className='flex gap-[10px]'>
              <Image
                src="/services-Target.gif"
                alt="Target gif"
                layout="intrinsic"
                width={25} // Adjust the width as needed
                height={25} // Adjust the height as needed to maintain aspect ratio
                className="object-contain"
              />
              <p className='text-center font-gentium-book-plus text-[16px] text-babyblue-500 italic'>
                Who Should Consider This?
              </p>
            </div>
            <Image
              src="/Up.svg"
              alt="Bouncing Up Arrow"
              layout="intrinsic"
              width={11.22} // Adjust the width as needed
              height={6.37} // Adjust the height as needed to maintain aspect ratio
              className="object-contain icon-bounce"
            />
          </div>
          <div className='flex flex-col p-[30px] gap-[30px] pt-0 justify-start'>
            <p className='font-avenir text-[12px] '>
              This is just a dummy text that has been inserted as a placeholder for future content. While it may seem insignificant at first glance, the use of dummy text is a common practice in the design and publishing industry, as it allows designers and developers to visualize the layout and overall aesthetic of a project without being distracted by the actual content.
            </p>
            <Button
              href="#"
              className=" w-[118px] h-[37px] font-maven-pro text-white text-[12px] rounded-[20px] bg-blue-300">
              View Pricing
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}