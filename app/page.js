import Navbar from './Navbar';
import Image from 'next/image';
import {Button, ButtonGroup} from "@nextui-org/button";

export default function Home() {
  return (
    <div className="relative h-full w-full bg-auto bg-top bg-home-pattern">
      <Navbar className="-mr-1 sticky top-0 z-50"/>
      <div className="relative h-full w-full">
        <Image 
          src="/home-hero-blob.svg"
          alt="Background-blob"
          width={417}
          height={653}
          className="absolute left-10 top-0"
        />
        <div className="absolute top-32 left-16 z-0 p-6">
          <h1 className="w-[292px] text-[32px] text-gray-900 font-gentium-book-plus font-bold text-right">Crafting <span className='italic text-blue-300'>Powerful</span><br />Websites and<br />Branding for<br />Your Business</h1>
          <p className="text-gray-800 text-[14px] text-right mt-4">Propel your business forward with<br />innovative web solutions, reliable<br />hosting, and impactful branding.</p>
          <div className="flex justify-end mt-4">
            <Button
              href="#"
              className="w-[140px] h-[36px] top-10 font-maven-pro text-blue-700 text-[12px] font-bold rounded-[24px] bg-babyblue-300">
              Book a Call
            </Button>
          </div>
        </div>
        <div className="absolute left-[10%] top-[65%]">
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
      <div className="relative h-[445px] w-full">
        <div className="absolute h-full z-40 w-full">
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
        {/* Content for this section */}
        <div className="relative z-50 p-6 flex flex-col items-center justify-center h-full">
          <h2 className="w-auto text-[32px] text-white font-gentium-book-plus font-bold text-center drop-shadow-[2px_10px_4.6px_rgba(0,0,0,0.25)]">Why Choose Us</h2>
          <div className='w-[295px] h-[248px] mt-10 rounded-[20px] bg-white/30 drop-shadow-[0_2.2px_2.2px_rgba(0,0,0,0.25)] backdrop-blur-[10px]'>
            
          </div>
        </div>
      </div>
    </div>
  );
}
