"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, ButtonGroup } from "@nextui-org/button";
import AccordionItem from "../accordion-item";

export default function InfoBlock({ selectedBlock, onBack, isTransitioning }) {
  useEffect(() => {
    const element = document.getElementById(selectedBlock);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedBlock]);

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col w-full items-center max-w-[900px]">
        {/* Accordion Block 1 */}
        <div id="block-1" className={`flex flex-col w-full items-center px-4 py-[45px] pt-[100px] md:pt-[120px] gap-[37px] ${selectedBlock === 'block-1' ? 'block' : 'hidden'}`}>
          <div className={`flex w-full gap-[11px] self-start cursor-pointer ${isTransitioning ? 'slide-out-left-0' : 'slide-in-right initial-offscreen'}`} onClick={onBack}>
            <Image
              src="/back arrow.svg"
              alt="Back Arrow"
              layout="intrinsic"
              width={6.37} // Adjust the width as needed
              height={11.22} // Adjust the height as needed to maintain aspect ratio
              className="object-contain"
            />
            <p className='text-center font-avenir text-[12px] md:text-[14px] drop-shadow-[2px_10px_4.6px_rgba(0,0,0,0.25)] lg:text-[16px]'>
              Back to Services
            </p>
          </div>
          <h4 className={`text-center w-full font-maven-pro font-bold text-[24px] lg:text-[32px] drop-shadow-[2px_10px_4.6px_rgba(0,0,0,0.25)] delay-5 ${isTransitioning ? 'slide-out-left-1' : 'initial-offscreen slide-in-right'}`}>
            Web Design & Development
          </h4>
          <div className='flex flex-col w-full'>
            <AccordionItem 
              iconRoute="/services-Target.gif"
              iconDescription="Target icon animation"
              title="Who Should Consider This?"
              description="This package is ideal for business owners looking to start or elevate their online presence. Whether you're launching a new business or growing an established one, we offer options tailored to fit your unique needs. From engaging design to custom development, this package covers it all, giving you the resources to host your website smoothly and turn visitors into loyal customers."
              className={`delay-7 ${isTransitioning ? 'slide-out-left-2' : 'initial-offscreen slide-in-right'}`}
            />
            <AccordionItem 
              iconRoute="/services-Dollar.gif"
              iconDescription="Money icon animation"
              title="Investment"
              description="We offer three distinct website design and development packages, crafted to fit your needs and budget, eliminating any extra costs. To ease the financial burden, payments are broken into manageable 12-month increments. The Base plan begins at $300/month, the Pro plan at $800/month, and the Enterprise plan at $1,300/month. Click below to view the full pricing details."
              className={`delay-8 ${isTransitioning ? 'slide-out-left-3' : 'initial-offscreen slide-in-right'}`}
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
              className={`delay-9 ${isTransitioning ? 'slide-out-left-4' : 'initial-offscreen slide-in-right'}`}
            />
            <AccordionItem 
              iconRoute="/services-calendar.gif"
              iconDescription="Calendar icon animation"
              title="Timeline"
              description="At River City Design Studios, we take a detailed, customer-focused approach to deliver outstanding results as efficiently as possible. Our team can design and develop your website with a swift 90-day turnaround."
              className={`delay-10 ${isTransitioning ? 'slide-out-left-5' : 'initial-offscreen slide-in-right'}`}
            />
          </div>
        </div>

        {/* Accordion Block 2 */}
        <div id="block-2" className={`flex flex-col w-full items-center px-4 py-[45px] pt-[100px] md:pt-[120px] gap-[37px] ${selectedBlock === 'block-2' ? 'block' : 'hidden'}`}>
          <div className={`flex w-full gap-[11px] self-start cursor-pointer ${isTransitioning ? 'slide-out-left-0' : 'slide-in-right initial-offscreen'}`} onClick={onBack}>
            <Image
              src="/back arrow.svg"
              alt="Back Arrow"
              layout="intrinsic"
              width={6.37} // Adjust the width as needed
              height={11.22} // Adjust the height as needed to maintain aspect ratio
              className="object-contain"
            />
            <p className='text-center font-avenir text-[12px] md:text-[14px] drop-shadow-[2px_10px_4.6px_rgba(0,0,0,0.25)]'>
              Back to Services
            </p>
          </div>
          <h4 className={`text-center w-full font-maven-pro font-bold text-[24px] lg:text-[32px] drop-shadow-[2px_10px_4.6px_rgba(0,0,0,0.25)] delay-5 ${isTransitioning ? 'slide-out-left-1' : 'initial-offscreen slide-in-right'}`}>
            Visual & Identity Systems
          </h4>
          <div className='flex flex-col w-full'>
            <AccordionItem 
              iconRoute="/services-Target.gif"
              iconDescription="Target icon animation"
              title="Who Should Consider This?"
              description="This package is ideal for business owners ready to elevate their brand’s visual impact. Whether you're just starting out or seeking a fresh identity for a well-established brand, our branding and visual identity systems ensure your brand resonates with your audience and stands out from the competition."
              className={`delay-7 ${isTransitioning ? 'slide-out-left-2' : 'initial-offscreen slide-in-right'}`}
            />
            <AccordionItem 
              iconRoute="/services-Dollar.gif"
              iconDescription="Money icon animation"
              title="Investment"
              description="Our branding packages provide a range of options to fit your unique goals and budget, with the flexibility to pay monthly and cancel anytime. The Base Package starts at $200/month and includes essential branding elements like a custom logo, color palette, and typography to get you started with a professional look. The Pro Package, at $450/month, expands to additional brand assets like custom icons and patterns, perfect for businesses looking to enhance brand recognition. For those seeking a complete visual overhaul, our Enterprise Package at $750/month covers comprehensive branding needs, including multiple logo variations, custom patterns, and an extended suite of design assets to create a cohesive, standout brand identity."
              className={`delay-8 ${isTransitioning ? 'slide-out-left-3' : 'initial-offscreen slide-in-right'}`}
            />
            <AccordionItem 
              iconRoute="/services-check-list.gif"
              iconDescription="Check list icon animation"
              title="What's Included?"
              description="Each branding package covers essential elements to bring your brand to life. From custom logo designs, typography, and brand color palettes to optional add-ons like additional professional photography, graphic elements or video production, we build a cohesive and compelling visual identity. Your package will include everything you need to make your brand instantly recognizable."
              className={`delay-9 ${isTransitioning ? 'slide-out-left-4' : 'initial-offscreen slide-in-right'}`}
            />
            <AccordionItem 
              iconRoute="/services-calendar.gif"
              iconDescription="Calendar icon animation"
              title="Timeline"
              description="Our branding process is designed to be thorough yet efficient. From initial concepts to the final delivery of assets, we aim for a timeline of 60-90 days, depending on your package and any added custom elements. We prioritize communication and client feedback, ensuring your brand identity is developed to perfection, on schedule."
              className={`delay-10 ${isTransitioning ? 'slide-out-left-5' : 'initial-offscreen slide-in-right'}`}
            />
          </div>
        </div>

        {/* Accordion Block 3 */}
        <div id="block-3" className={`flex flex-col w-full items-center px-4 py-[45px] pt-[100px] md:pt-[120px] gap-[37px] ${selectedBlock === 'block-3' ? 'block' : 'hidden'}`}>
          <div className={`flex w-full gap-[11px] self-start cursor-pointer ${isTransitioning ? 'slide-out-left-0' : 'slide-in-right initial-offscreen'}`} onClick={onBack}>
            <Image
              src="/back arrow.svg"
              alt="Back Arrow"
              layout="intrinsic"
              width={6.37} // Adjust the width as needed
              height={11.22} // Adjust the height as needed to maintain aspect ratio
              className="object-contain"
            />
            <p className='text-center font-avenir text-[12px] md:text-[14px] drop-shadow-[2px_10px_4.6px_rgba(0,0,0,0.25)]'>
              Back to Services
            </p>
          </div>
          <h4 className={`text-center w-full font-maven-pro font-bold text-[24px] lg:text-[32px] drop-shadow-[2px_10px_4.6px_rgba(0,0,0,0.25)] delay-5 ${isTransitioning ? 'slide-out-left-1' : 'initial-offscreen slide-in-right'}`}>
            Hosting, Maintenance & Security
          </h4>
          <div className='flex flex-col w-full'>
            <AccordionItem 
              iconRoute="/services-Target.gif"
              iconDescription="Target icon animation"
              title="Who Should Consider This?"
              description="This package is perfect for business owners who want to secure their online presence and ensure their website operates smoothly, without the hassle of managing technical updates or security protocols. Whether you’re just launching or have an established site, our hosting, maintenance, and security services are crafted to keep your site running safely, securely, and efficiently 24/7/365."
              className={`delay-7 ${isTransitioning ? 'slide-out-left-2' : 'initial-offscreen slide-in-right'}`}
            />
            <AccordionItem 
              iconRoute="/services-Dollar.gif"
              iconDescription="Money icon animation"
              title="Investment"
              description="We offer three different plans to meet the needs of businesses of all sizes and technical requirements. Each plan is designed to provide essential maintenance and security without overpaying for services you don’t need. To keep things hassle-free, payments are made on a month-to-month basis, giving you the flexibility to cancel anytime. Our Base plan starts at $99/month, Pro is $219/month, and the Enterprise plan is $599/month, offering more robust security and SEO maintenance. Click below for a full pricing breakdown."
              className={`delay-8 ${isTransitioning ? 'slide-out-left-3' : 'initial-offscreen slide-in-right'}`}
            />
            <AccordionItem 
              iconRoute="/services-check-list.gif"
              iconDescription="Check list icon animation"
              title="What's Included?"
              description="With each plan, you’ll receive reliable hosting, regular updates, and robust security features to protect your website. The Base plan includes essential hosting and one hour of monthly maintenance. The Pro adds two hours of maintenance, while the Enterprise plan expands with comprehensive SEO support and monthly reporting. All plans come with a 30% discount on additional work, so you have the flexibility to scale when needed."
              className={`delay-9 ${isTransitioning ? 'slide-out-left-4' : 'initial-offscreen slide-in-right'}`}
            />
            <AccordionItem 
              iconRoute="/services-calendar.gif"
              iconDescription="Calendar icon animation"
              title="Timeline"
              description="Our hosting, maintenance, and security services are designed for ongoing support, with no setup delay. Once you sign up, our team will have your site securely hosted and maintained within 48 hours. We continuously monitor and optimize performance, providing real-time updates and monthly reports for higher-tier plans, so your site remains protected and up-to-date."
              className={`delay-10 ${isTransitioning ? 'slide-out-left-5' : 'initial-offscreen slide-in-right'}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}