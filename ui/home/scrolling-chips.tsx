"use client";

import Chip from "../components/chip"; // Adjust path based on your folder structure

export default function ScrollingChips() {
  const firstRowOptions = [
    { icon: "/api-icon.svg", title: "Integrations" },
    { icon: "/bezier-tool.svg", title: "Web Design" },
    { icon: "/paint-swatches.svg", title: "Branding" },
    { icon: "/art-brush-icon.svg", title: "Logos" },
    { icon: "/online-equalizer.svg", title: "Maintenance" },
  ];

  const secondRowOptions = [
    { icon: "/transformation-tool.svg", title: "Typography" },
    { icon: "/mobile-phone.svg", title: "Social Media" },
    { icon: "/cloud-energy.svg", title: "Web Hosting" },
    { icon: "/crimal-record.svg", title: "Web Security" },
    { icon: "/source-page.svg", title: "Development" },
  ];

  return (
    <div className="flex flex-col gap-10 w-full max-w-[950px]">
      {/* First Row */}
      <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_20px,_black_calc(100%-40px),transparent_100%)]">
        <div className="flex gap-[19px] pr-[19px] animate-infinite-scroll md:gap-[58px] md:pr-[58px]">
          {firstRowOptions.map((option, index) => (
            <Chip key={index} icon={option.icon} title={option.title} />
          ))}
          {firstRowOptions.map((option, index) => (
            <Chip key={`duplicate-${index}`} icon={option.icon} title={option.title} />
          ))}
        </div>
      </div>

      {/* Second Row */}
      <div className="w-full justify-end inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_20px,_black_calc(100%-40px),transparent_100%)]">
        <div className="flex pt-1 gap-[19px] pl-[19px] animate-reverse-infinite-scroll md:gap-[58px] md:pl-[58px]">
          {secondRowOptions.map((option, index) => (
            <Chip key={index} icon={option.icon} title={option.title} />
          ))}
          {secondRowOptions.map((option, index) => (
            <Chip key={`duplicate-${index}`} icon={option.icon} title={option.title} />
          ))}
        </div>
      </div>
    </div>
  );
}