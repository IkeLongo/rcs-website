"use client";

import Navbar from '../Navbar';
import Hero from './hero';
import Process from './process';
import ServiceBlocks from '../Components/Services';
import Footer from '../Footer';
import {  useRef } from 'react';

export default function Services() {
  const whyRef = useRef(null);
  const planRef = useRef(null);

  return (
    <div className='overflow-x-hidden'>
      {/* Navbar */}
      {/* <div className="fixed top-0 z-50 w-full">
        <Navbar whyRef={whyRef} planRef={planRef} />
      </div> */}

      {/* Hero */}
      <Hero />

      {/* Process */}
      <Process />

      {/* Service Block */}
      <ServiceBlocks />

      {/* Footer */}
      <Footer 
        bgGradientClass='bg-footer-bg-gradient-solid'
      />
    </div>
  );
}