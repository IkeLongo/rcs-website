"use client";

import { useEffect, useRef } from 'react';
import Navbar from './Navbar';
import Do from './Components/Do';
import Option from './Components/Options';
import Image from 'next/image';
import {Button, ButtonGroup} from "@nextui-org/button";

export default function Home() {
  const optionsContainerRef1 = useRef(null);
  const optionsContainerRef2 = useRef(null);

  useEffect(() => {
    const assignRef = (ref) => {
      if (ref) {
        const clone = ref.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        ref.parentNode.appendChild(clone);
      }
    };

    assignRef(optionsContainerRef1.current);
    assignRef(optionsContainerRef2.current);
  }, []);

  return (
    <div className="relative h-[4199px] w-full bg-cover bg-top bg-home-pattern overflow-x-hidden">
      {/* Navbar */}
      <Navbar className="sticky top-0 z-50" />

      {/* Hero Section */}
      <div className="relative w-full h-[800px]">
        <Image 
          src="/home-hero-blob.svg"
          alt="Background-blob"
          width={417}
          height={653}
          className="absolute left-10 top-0"
        />
        <div className="absolute top-32 left-16 z-10 p-6">
          <h1 className="w-[292px] text-[32px] text-gray-900 font-gentium-book-plus font-bold text-right">
            Crafting <span className='italic text-blue-300'>Powerful</span><br />
            Websites and<br />Branding for<br />Your Business
          </h1>
          <p className="text-gray-800 text-[14px] text-right mt-4">
            Propel your business forward with<br />
            innovative web solutions, reliable<br />
            hosting, and impactful branding.
          </p>
          <div className="flex justify-end mt-4">
            <Button
              href="#"
              className="w-[140px] h-[36px] font-maven-pro text-blue-700 text-[12px] font-bold rounded-[24px] bg-babyblue-300">
              Book a Call
            </Button>
          </div>
        </div>
        <div className="absolute left-[10%] top-[500px]">
          <Image
            src="/home-hero-gif-blob.svg"
            alt="Hero gif background blob"
            width={224}
            height={212}
          />
          <img
            src="/home-page-gif.gif"
            alt="Home page gif"
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      </div>

      {/* Why Section */}
      <div className="relative w-full h-[445px] bg-transparent">
        <div className="absolute w-full h-full">
          <Image
            src="home-why-green-blob.svg"
            alt="First blob"
            width={116}
            height={165}
            className="absolute right-10 top-20"
          />
          <Image
            src="home-why-blue-blob.svg"
            alt="Second blob"
            width={163}
            height={144}
            className="absolute left-10 bottom-0"
          />
        </div>
        <div className="relative z-10 p-6 flex flex-col items-center justify-center h-full">
          <h3 className="w-auto text-[32px] text-white font-gentium-book-plus font-bold text-center drop-shadow-[2px_10px_4.6px_rgba(0,0,0,0.25)]">
            Why Choose Us
          </h3>
          <div className="w-[295px] h-[248px] mt-10 rounded-[20px] bg-white/30 drop-shadow-[0_2.2px_2.2px_rgba(0,0,0,0.25)] backdrop-blur-[10px]">
            {/* Video Content */}
          </div>
        </div>
      </div>

      {/* Do Section */}
      <div className="relative w-full min-h-[596px] bg-transparent">
        <div className="relative z-10 p-6 pt-20 flex flex-col items-center justify-start h-full gap-10">
          <h3 className="w-auto text-[32px] text-white font-gentium-book-plus font-bold text-center drop-shadow-[2px_10px_4.6px_rgba(0,0,0,0.25)]">
            What We Do
          </h3>
          <div className="overflow-x-auto w-full">
            <div className="flex gap-[19px] min-h-[470px]">
              <Do 
                icon="/home-do-web.gif"
                title="Website Design & Development"
                description="Our Web Design & Development package delivers captivating designs tailored to engage and convert your audience. Each website is crafted with strategic attention to detail, bringing your digital vision to life with a high-performing, user-friendly website on all devices."
              />
              <Do 
                icon="/home-do-brand.gif"
                title="Branding & Visual Identity Systems"
                description="Our Branding & Visual Identity Systems package creates a cohesive identity that resonates with your audience. From custom logos to color palettes and iconography, we build a distinctive visual story to elevate your brand and leave a lasting impression across all platforms."
              />
              <Do 
                icon="/home-do-host.gif"
                title="Hosting, Maintenance & Security "
                description="Simplify website management with our Hosting, Maintenance, and Security package, which covers updates, security, and protection. Our package ensures that your site runs smoothly and securely, giving you peace of mind letting you focus on your business."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Options Section */}
      <div className="relative w-full min-h-[450px] bg-transparent">
        <div className="relative z-10 p-6 pt-20 flex flex-col items-center justify-start h-full gap-10">
          <h3 className="w-auto text-[32px] text-white font-gentium-book-plus font-bold text-center drop-shadow-[2px_10px_4.6px_rgba(0,0,0,0.25)]">
            Options to Suit<br />Every Vision
          </h3>
          <div className="flex flex-col gap-10 w-full">
            <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_50px,_black_calc(100%-100px),transparent_100%)]">
              <div className="flex gap-[19px] animate-infinite-scroll" ref={optionsContainerRef1}>
                <Option 
                  icon="/Api.svg"
                  title="Integrations"
                />
                <Option 
                  icon="/Bezier Tool.svg"
                  title="Web Design"
                />
                <Option 
                  icon="/Paint Swatches.svg"
                  title="Branding"
                />
                <Option 
                  icon="/Art Brush.svg"
                  title="Logos"
                />
                <Option 
                  icon="/Online Equalizer.svg"
                  title="Maintenance"
                />
              </div>
            </div>
            <div className="w-full justify-end inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_50px,_black_calc(100%-100px),transparent_100%)]">
              <div className="flex pt-1 gap-[19px] animate-reverse-infinite-scroll" ref={optionsContainerRef2}>
                <Option 
                  icon="/Transformation Tool.svg"
                  title="Typography"
                />
                <Option 
                  icon="/Mobile Profile.svg"
                  title="Social Media"
                />
                <Option 
                  icon="/Cloud Energy.svg"
                  title="Web Hosting"
                />
                <Option 
                  icon="/Criminal Record.svg"
                  title="Web Security"
                />
                <Option 
                  icon="/Source Page.svg"
                  title="Development"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
