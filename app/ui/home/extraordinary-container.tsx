import Image from "next/image";
import ScrollingChips from "./scrolling-chips"; // Adjust path based on your folder structure
import FadeInUp from "../components/fade-in-up";

export default function ExtraordinaryContainer() {
  return (
    <div className="relative flex justify-center w-full py-10 bg-transparent md:px-24">
      {/* Decorative background images */}
      <Image
        src="/home-extraordinary-left-blob.svg"
        alt=""
        width={119.54}
        height={85.24}
        className="absolute -left-16 top-20 md:top-64 z-0 pointer-events-none select-none"
        aria-hidden="true"
      />
      <Image
        src="/home-extraordinary-left-blob.svg"
        alt=""
        width={119.54}
        height={85.24}
        className="absolute -left-10 top-40 md:top-80 z-0 pointer-events-none select-none"
        aria-hidden="true"
      />
      <Image
        src="/home-extraordinary-right-blob.svg"
        alt=""
        width={136.23}
        height={108.13}
        className="absolute -right-10 -top-4 z-0 pointer-events-none select-none"
        aria-hidden="true"
      />
      <Image
        src="/home-extraordinary-right-blob.svg"
        alt=""
        width={136.23}
        height={108.13}
        className="absolute -right-20 top-20 z-0 pointer-events-none select-none"
        aria-hidden="true"
      />
      <Image
        src="/home-spiral.webp"
        alt=""
        width={564.87}
        height={339.26}
        className="absolute -bottom-20 md:-top-8 z-0 pointer-events-none select-none min-w-[120vw]"
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="flex z-10 p-6 pt-0 flex flex-col items-center justify-start h-full w-full gap-10">
        <div className="w-full flex flex-col justify-center items-center gap-6">
          <h3 className="text-white text-center mb-0">
            <FadeInUp>
              Forget Fitting In<br className="" /> Let's Create Something <span className="text-lime-500 italic">Extraordinary!</span>
            </FadeInUp>
          </h3>
          <hr className="w-[50%] border-t-[0.35px] border-gray-400" />
          <p className="text-white text-center md:px-20 text-md md:text-md2">
            <FadeInUp>
              We are a creative agency that specializes in crafting unique websites and memorable brands that draws in dream clients and elevates your business.
            </FadeInUp>
          </p>
        </div>
        <ScrollingChips />
      </div>
    </div>
  );
}