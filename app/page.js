import Navbar from './Navbar';
import Image from 'next/image';
import {Button, ButtonGroup} from "@nextui-org/button";

export default function Home() {
  return (
    <div className="relative h-full w-fill bg-cover bg-top bg-home-pattern -mr-1">
      <Navbar className="-mr-1"/>
      <div className="relative h-full w-full">
        <Image 
          src="/home-hero-blob.svg"
          alt="Background-blob"
          width={417}
          height={653}
          className="absolute left-10 top-0"
        />
        <div className="absolute top-32 left-16 z-40 p-6">
          <h1 className="w-[292px] text-[28px] text-gray-900 font-gentium-book-plus font-bold text-right">Crafting <span className='italic text-blue-300'>Powerful</span><br />Websites and<br />Branding for<br />Your Business</h1>
          <p className="text-gray-800 text-[14px] text-right mt-4">Propel your business forward with<br />innovative web solutions, reliable<br />hosting, and impactful branding.</p>
          <div className="flex justify-end mt-4">
            <Button
              href="#"
              className="w-[140px] h-[36px] top-10 font-maven-pro text-blue-700 text-[12px] font-bold rounded-[24px] bg-babyblue-300">
              Book a Call
            </Button>
          </div>
        </div>
        <div className="absolute left-[10%] top-[100%]">
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
      {/* <h1 className="text-4xl text-center text-white pt-10">Welcome to Next.js</h1> */}
    </div>
  );
}
