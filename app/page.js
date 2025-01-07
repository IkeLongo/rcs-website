"use client";

import { useEffect, useRef } from 'react';
import Navbar from './Navbar';
import DoContainer from './Components/DoContainer';
import Option from './Components/Options';
import Plan from './Components/Plan';
import Footer from './Footer';
import Image from 'next/image';
import {Button, ButtonGroup} from "@nextui-org/button";
import Link from 'next/link';

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

  useEffect(() => {
    if (window.location.hash === '#plan') {
      const element = document.getElementById('plan');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className="relative h-auto w-full bg-cover bg-top bg-home-pattern overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative w-full h-[800px] md:h-[550px]">
        {/* Mobile-only image */}
        <Image 
          src="/home-hero-blob.svg"
          alt="Background-blob"
          width={417}
          height={653}
          className="absolute left-auto -right-6 top-0 md:hidden"
        />
        {/* Tablet and desktop-only image */}
        <Image 
          src="/home-hero-blob-tablet.svg"
          alt="Background-blob"
          width={417}
          height={653}
          className="hidden md:block absolute left-10 top-0 md:left-auto md:-right-2 md:-top-32 md:w-[450px] md:h-[647px]"
        />
        <div className="absolute top-32 right-4 z-10 p-6 md:top-4 md:right-0 md:left-auto md:flex md:flex-col md:items-end md:justify-end">
          <h1 className="w-[292px] text-[32px] text-gray-900 font-gentium-book-plus font-bold text-right md:hidden">
            Crafting <span className='italic text-blue-300'>Powerful</span><br />
            Websites and<br />Branding for<br />Your Business
          </h1>
          <h1 className="hidden md:block md:w-[340px] md:text-[32px] md:text-gray-900 md:font-gentium-book-plus md:font-bold md:text-right">
            Crafting <span className='italic text-blue-300'>Powerful</span><br />
            Websites and Branding<br />for Your Business<br />
          </h1>
          <p className="text-gray-800 text-[14px] text-right mt-4 md:hidden">
            Propel your business forward with<br />
            innovative web solutions, reliable<br />
            hosting, and impactful branding.
          </p>
          <p className="hidden md:block md:text-gray-800 md:text-[14px] md:text-right md:mt-4">
            Propel your business forward with innovative web<br />
            solutions, reliable hosting, and impactful branding.<br />
          </p>
          <div className="flex justify-end mt-4 md:mt-10">
            <Link href="/booking" passHref>
              <Button className="w-[140px] h-[36px] font-maven-pro text-blue-700 text-[12px] font-bold rounded-[24px] bg-babyblue-300">
                Book a Call
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute left-[10%] top-[500px] md:top-[150px]">
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
      <div id='why' className="relative w-full h-[445px] bg-transparent">
        <div className="absolute w-full h-full">
          <Image
            src="home-why-green-blob.svg"
            alt="First blob"
            width={116}
            height={165}
            className="absolute right-10 top-20 md:w-[210px] md:h-[284px] md:right-20"
          />
          <Image
            src="home-why-blue-blob.svg"
            alt="Second blob"
            width={163}
            height={144}
            className="absolute left-10 bottom-0 md:w-[271px] md:h-[226px]"
          />
        </div>
        <div className="relative z-10 p-6 flex flex-col items-center justify-center h-full">
          <h3 className="w-auto text-[32px] text-white font-gentium-book-plus font-bold text-center drop-shadow-[2px_10px_4.6px_rgba(0,0,0,0.25)]">
            Why Choose Us
          </h3>
          <div className="w-[295px] h-[248px] mt-10 rounded-[20px] bg-white/30 drop-shadow-[0_2.2px_2.2px_rgba(0,0,0,0.25)] backdrop-blur-[10px] md:w-[400px] md:h-[337px]">
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
        </div>
        <DoContainer />
      </div>

      {/* Options Section */}
      <div className="relative w-full h-[450px] bg-transparent md:h-[400px]">
        <div className="relative z-10 p-6 pt-20 flex flex-col items-center justify-start h-full gap-10">
          <h3 className="w-auto text-[32px] text-white font-gentium-book-plus font-bold text-center drop-shadow-[2px_10px_4.6px_rgba(0,0,0,0.25)]">
            Options to Suit<br className='md:hidden'/> Every Vision
          </h3>
          <div className="flex flex-col gap-10 w-full">
            <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_50px,_black_calc(100%-100px),transparent_100%)]">
              <div className="flex gap-[19px] pr-[19px] animate-infinite-scroll md:gap-[58px] md:pr-[58px]" ref={optionsContainerRef1}>
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
              <div className="flex pt-1 gap-[19px] pl-[19px] animate-reverse-infinite-scroll md:gap-[58px] md:pl-[58px]" ref={optionsContainerRef2}>
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

      {/* Plan Section */}
      <div id='plan' className="relative w-full min-h-[450px] bg-transparent">
        <div className="relative z-10 p-6 pt-6 flex flex-col items-center justify-start h-full gap-4">
          <h3 className="w-auto text-[32px] text-white font-gentium-book-plus font-bold text-center drop-shadow-[2px_10px_4.6px_rgba(0,0,0,0.25)]">
            Choose Your Right Plan
          </h3>
          <p className='font-avenir text-center text-[14px] text-white max-w-[500px]'>
            Select from our best plans according to the service you need. Need more or less? Book a call to discuss a custom subscription for a seamless fit. 
          </p>
        </div>
        <Plan />
      </div>

      {/* Footer */}
      <Footer 
        bgGradientClass='bg-footer-bg-gradient'
      />
    </div>
  );
}
