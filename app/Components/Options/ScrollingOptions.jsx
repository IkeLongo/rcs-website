"use client";

import { useEffect, useRef } from "react";
import Option from "./page"; // Adjust path based on your folder structure

export default function ScrollingOptions() {
  const optionsContainerRef1 = useRef(null);
  const optionsContainerRef2 = useRef(null);

  useEffect(() => {
    const assignRef = (ref) => {
      if (ref) {
        const clone = ref.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        ref.parentNode.appendChild(clone);
      }
    };

    assignRef(optionsContainerRef1.current);
    assignRef(optionsContainerRef2.current);
  }, []);

  return (
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
  );
}

