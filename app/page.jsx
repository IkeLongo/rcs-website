"use client";

// import { useEffect, useRef, useContext } from 'react';
// import Navbar from './Navbar';
import HomeHero from './Components/home-hero/HomeHero';
import HomeWhy from './Components/home-why/HomeWhy';
import DoContainer from './Components/DoContainer/page';
import ScrollingOptions from './Components/Options/ScrollingOptions';
import Plan from './Components/Plan/page';
import Footer from './Footer/page';
// import { ActiveLinkContext } from './ActiveLinkContext/page';

export default function Home() {
  // const { activeLink, setActiveLink } = useContext(ActiveLinkContext);
  // const whyRef = useRef(null);
  // const planRef = useRef(null);

  // useEffect(() => {
  //   const handleHashChange = () => {
  //     const hash = window.location.hash;
  //     if (hash === '#plan' || hash === '#why') {
  //       const element = document.getElementById(hash.substring(1));
  //       if (element) {
  //         const yOffset = -100; // Adjust this value to set the padding
  //         const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
  //         window.scrollTo({ top: y, behavior: 'smooth' });
  //       }
  //     }
  //   };
  
  //   handleHashChange(); // Handle the initial load
  //   window.addEventListener('hashchange', handleHashChange); // Handle hash changes
  
  //   return () => {
  //     window.removeEventListener('hashchange', handleHashChange);
  //   };
  // }, []);

  // useEffect(() => {
  //   // Intersection Observer to track sections
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           setActiveLink(entry.target.id);
  //         } else if (activeLink === entry.target.id) {
  //           setActiveLink('');
  //         }
  //       });
  //     },
  //     { threshold: 0.5 } // Adjust the threshold as needed
  //   );

  //   if (whyRef.current) observer.observe(whyRef.current);
  //   if (planRef.current) observer.observe(planRef.current);

  //   return () => {
  //     if (whyRef.current) observer.unobserve(whyRef.current);
  //     if (planRef.current) observer.unobserve(planRef.current);
  //   };
  // }, [whyRef, planRef, activeLink]);

  return (
    <div className='relative'>
      <div className="relative h-auto w-full bg-cover bg-top bg-home-pattern overflow-x-hidden">
        <HomeHero />

        {/* Why Section */}
        <HomeWhy />

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
            <ScrollingOptions />
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
    </div>
  );
}
