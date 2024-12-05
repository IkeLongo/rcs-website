"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, ButtonGroup } from "@nextui-org/button";
import AccordionItem from "../accordion-item";

export default function InfoBlock() {

  return (
    <div className="flex flex-col w-full items-center px-4 py-[45px] gap-[37px]">
      <div className='flex gap-[11px] self-start'>
        <Image
          src="/back arrow.svg"
          alt="Back Arrow"
          layout="intrinsic"
          width={6.37} // Adjust the width as needed
          height={11.22} // Adjust the height as needed to maintain aspect ratio
          className="object-contain"
        />
        <p className='text-center font-avenir text-[12px] drop-shadow-[2px_10px_4.6px_rgba(0,0,0,0.25)]'>
          Back to Services
        </p>
      </div>
      <h4 className='text-center font-maven-pro font-bold text-[24px] drop-shadow-[2px_10px_4.6px_rgba(0,0,0,0.25)]'>
        Web Design & Development
      </h4>
      <AccordionItem />
    </div>
  );
}