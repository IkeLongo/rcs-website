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

  // 🌟 Store option data in arrays
  const firstRowOptions = [
    { icon: "/Api.svg", title: "Integrations" },
    { icon: "/Bezier Tool.svg", title: "Web Design" },
    { icon: "/Paint Swatches.svg", title: "Branding" },
    { icon: "/Art Brush.svg", title: "Logos" },
    { icon: "/Online Equalizer.svg", title: "Maintenance" },
  ];

  const secondRowOptions = [
    { icon: "/Transformation Tool.svg", title: "Typography" },
    { icon: "/Mobile Profile.svg", title: "Social Media" },
    { icon: "/Cloud Energy.svg", title: "Web Hosting" },
    { icon: "/Criminal Record.svg", title: "Web Security" },
    { icon: "/Source Page.svg", title: "Development" },
  ];

  return (
    <div className="relative w-full h-[450px] pt-12 bg-transparent md:h-[400px]">
      <div className="relative z-10 p-6 pt-20 flex flex-col items-center justify-start h-full gap-10">
        <h3>
          Options to Suit<br className="md:hidden" /> Every Vision
        </h3>
        <div className="flex flex-col gap-10 w-full max-w-[950px]">
          {/* First Row */}
          <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_50px,_black_calc(100%-100px),transparent_100%)]">
            <div
              className="flex gap-[19px] pr-[19px] animate-infinite-scroll md:gap-[58px] md:pr-[58px]"
              ref={optionsContainerRef1}
            >
              {firstRowOptions.map((option, index) => (
                <Option key={index} icon={option.icon} title={option.title} />
              ))}
            </div>
          </div>

          {/* Second Row */}
          <div className="w-full justify-end inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_50px,_black_calc(100%-100px),transparent_100%)]">
            <div
              className="flex pt-1 gap-[19px] pl-[19px] animate-reverse-infinite-scroll md:gap-[58px] md:pl-[58px]"
              ref={optionsContainerRef2}
            >
              {secondRowOptions.map((option, index) => (
                <Option key={index} icon={option.icon} title={option.title} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

