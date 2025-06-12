"use client";

import Image from "next/image";
import Link from 'next/link';
import AnimatedLottie from "../components/animations";
import { DoProps } from "@/types/components";

export default function Do({ animation, title, description, onClick, className }: DoProps) {
  return (
    (<div className="min-w-[233px] p-6 flex flex-col justify-between gap-4 items-stretch rounded-[14px] border border-gray-500 bg-do-custom-gradient">
      <div className='flex flex-col items-center'>
        <AnimatedLottie
          animationData={animation}
          className="h-[60.25px] w-[60.25px]"
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
        <h4 className='my-2'>{title}</h4>
      </div>
      <p className="flex-grow">
        {description}
      </p>
      <button
        type="button"
        onClick={onClick}
        className="flex justify-center gap-1 uppercase text-inherit bg-transparent border-none outline-none cursor-pointer"
        aria-label={`Learn more about ${title}`}
      >
        <p className='uppercase'>Learn More</p>
        <Image
          src="/arrow-pointing-right.svg"
          alt="Right arrow"
          width={20}
          height={20}
          className=""
          style={{
            maxWidth: "100%",
            height: "auto"
          }} />
      </button>
    </div>)
  );
}
