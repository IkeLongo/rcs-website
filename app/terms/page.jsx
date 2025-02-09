"use client";

import Main from './main/page';
import Footer from '../Footer/page';

export default function Home() {

  return (
    <div className="relative h-auto w-full bg-cover bg-top overflow-x-hidden top-24">
      {/* Hero Section */}
      <Main />

      {/* Footer */}
      <Footer 
        bgGradientClass='bg-footer-bg-gradient-solid'
      />
    </div>
  );
}