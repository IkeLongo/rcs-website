"use client";

import { useEffect, useRef } from "react";
import Option from "./option"; // Adjust path based on your folder structure

export default function ScrollingOptions() {
  const optionsContainerRef1 = useRef<HTMLDivElement | null>(null);
  const optionsContainerRef2 = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const assignRef = (ref: HTMLDivElement | null) => {
      if (ref) {
        const clone = ref.cloneNode(true) as HTMLDivElement;
        clone.setAttribute("aria-hidden", "true");
        ref.parentNode?.appendChild(clone);
      }
    };

    assignRef(optionsContainerRef1.current);
    assignRef(optionsContainerRef2.current);
  }, []);

  return (
    <div className="relative w-full h-[450px] pt-12 bg-transparent md:h-[400px]">
      <div className="relative z-10 p-6 pt-20 flex flex-col items-center justify-start h-full gap-10">
        <h3 className="w-auto text-[32px] text-white font-gentium-book-plus font-bold text-center drop-shadow-[2px_10px_4.6px_rgba(0,0,0,0.25)]">
          Options to Suit<br className='md:hidden'/> Every Vision
        </h3>
        <div className="flex flex-col gap-10 w-full max-w-[950px]">
          {/* First Row */}
          <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_50px,_black_calc(100%-100px),transparent_100%)]">
            <div
              className="flex gap-[19px] pr-[19px] animate-infinite-scroll md:gap-[58px] md:pr-[58px]"
              ref={optionsContainerRef1}
            >
              <Option icon="/Api.svg" title="Integrations" />
              <Option icon="/Bezier Tool.svg" title="Web Design" />
              <Option icon="/Paint Swatches.svg" title="Branding" />
              <Option icon="/Art Brush.svg" title="Logos" />
              <Option icon="/Online Equalizer.svg" title="Maintenance" />
            </div>
          </div>

          {/* Second Row */}
          <div className="w-full justify-end inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_50px,_black_calc(100%-100px),transparent_100%)]">
            <div
              className="flex pt-1 gap-[19px] pl-[19px] animate-reverse-infinite-scroll md:gap-[58px] md:pl-[58px]"
              ref={optionsContainerRef2}
            >
              <Option icon="/Transformation Tool.svg" title="Typography" />
              <Option icon="/Mobile Profile.svg" title="Social Media" />
              <Option icon="/Cloud Energy.svg" title="Web Hosting" />
              <Option icon="/Criminal Record.svg" title="Web Security" />
              <Option icon="/Source Page.svg" title="Development" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
