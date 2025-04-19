// "use client";

import Image from "next/image";
import Link from 'next/link';
import { DoProps } from "@/types/components";

export default function Do({ icon, title, description, link, className }: DoProps) {
  return (
    (<div className="min-w-[233px] p-6 flex flex-col justify-between gap-4 items-stretch rounded-[14px] border border-gray-500 bg-do-custom-gradient">
      <div className='flex flex-col items-center'>
        <video
          autoPlay
          loop
          muted
          playsInline
          width={60.25}
          height={60.25}
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        >
          <source src={`${icon}.webm`} type="video/webm" />
          <source src={`${icon}.mp4`} type="video/mp4" />
        </video>
        <h4 className='my-2'>{title}</h4>
      </div>
      <p className="flex-grow">
        {description}
      </p>
      <Link
        href={link}
        passHref
        className="flex justify-center gap-1"
        aria-label={`Learn more about ${title}`} // Add a descriptive label
      >
        <p className='uppercase'>Learn More</p>
        <Image
          src="/arrow-circle-right.svg"
          alt="Right arrow"
          width={16.87}
          height={16.87}
          className=""
          style={{
            maxWidth: "100%",
            height: "auto"
          }} />
      </Link>
    </div>)
  );
}
