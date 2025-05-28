import Image from "next/image";
import ScrollingOptions from "./scrolling-options"; // Adjust path based on your folder structure

export default function OptionsContainer() {
  return (
    <div className="relative flex justify-center w-full py-10 bg-transparent">
      {/* Decorative background images */}
      <Image
        src="/home-extraordinary-left-blob.svg"
        alt=""
        width={119.54}
        height={85.24}
        className="absolute -left-16 top-20 z-0 pointer-events-none select-none"
        aria-hidden="true"
      />
      <Image
        src="/home-extraordinary-left-blob.svg"
        alt=""
        width={119.54}
        height={85.24}
        className="absolute -left-10 top-40 z-0 pointer-events-none select-none"
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
        className="absolute -bottom-20 z-0 pointer-events-none select-none min-w-[120vw]"
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="flex z-10 p-6 pt-0 flex flex-col items-center justify-start h-full w-full gap-10">
        <div className="w-full max-w-[950px] flex flex-col justify-center items-center gap-6">
          <h4 className="text-white text-center mb-0">
            Forget Fitting In<br className="md:hidden" /> Let's Create Something <span className="text-lime-500 italic">Extraordinary!</span>
          </h4>
          <hr className="w-[50%] border-t-[0.35px] border-gray-400" />
          <p className="text-white text-center">
            We are a creative agency that specializes in crafting unique websites and memorable brands that draws in dream clients and elevates your business.
          </p>
        </div>
        <ScrollingOptions />
      </div>
    </div>
  );
}