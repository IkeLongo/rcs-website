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
      <div className='flex flex-col w-full'>
        <AccordionItem 
          iconRoute="/services-Target.gif"
          iconDescription="Target icon animation"
          title="Who Should Consider This?"
          description="This package is ideal for business owners looking to start or elevate their online presence. Whether you're launching a new business or growing an established one, we offer options tailored to fit your unique needs. From engaging design to custom development, this package covers it all, giving you the resources to host your website smoothly and turn visitors into loyal customers."
        />
        <AccordionItem 
          iconRoute="/services-Dollar.gif"
          iconDescription="Money icon animation"
          title="Investment"
          description="We offer three distinct website design and development packages, crafted to fit your needs and budget, eliminating any extra costs. To ease the financial burden, payments are broken into manageable 12-month increments. The Base plan begins at $300/month, the Pro plan at $800/month, and the Enterprise plan at $1,300/month. Click below to view the full pricing details."
        />
        <AccordionItem 
          iconRoute="/services-check-list.gif"
          iconDescription="Check list icon animation"
          title="What's Included?"
          description="Strategy Call
            Custom Website Design
            Search Engine Optimization
            In-House Development
            Customer Engagement Form
            Cyber Security
            Interactive Features
            A.I. Chat Systems
            Booking and E-Commerce Systems
            API Integrations"
        />
        <AccordionItem 
          iconRoute="/services-calendar.gif"
          iconDescription="Calendar icon animation"
          title="Timeline"
          description="At River City Design Studios, we take a detailed, customer-focused approach to deliver outstanding results as efficiently as possible. Our team can design and develop your website with a swift 90-day turnaround."
        />
      </div>
    </div>
  );
}