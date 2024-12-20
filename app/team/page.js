"use client";

import { useEffect, useRef } from 'react';
import Navbar from '../Navbar';
import Hero from './hero';
import Footer from '../Footer';
import Image from 'next/image';
import {Button, ButtonGroup} from "@nextui-org/button";

export default function Home() {

  return (
    <div className="relative h-auto w-full bg-cover bg-top overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Footer */}
      <Footer 
        bgGradientClass='bg-footer-bg-gradient-solid'
      />
    </div>
  );
}