"use client";

import { useEffect, useRef } from 'react';
import Navbar from '../Navbar';
import Hero from './hero';
import Footer from '../Footer';
import Image from 'next/image';
import {Button, ButtonGroup} from "@nextui-org/button";

export default function Home() {
  const whyRef = useRef(null);
  const planRef = useRef(null);

  return (
    <div className="relative h-auto w-full bg-cover bg-top overflow-x-hidden">
      {/* Navbar */}
      {/* <div className="fixed top-0 z-50 w-full">
        <Navbar whyRef={whyRef} planRef={planRef} />
      </div> */}

      {/* Hero Section */}
      <Hero />

      {/* Footer */}
      <Footer 
        bgGradientClass='bg-footer-bg-gradient-solid'
      />
    </div>
  );
}