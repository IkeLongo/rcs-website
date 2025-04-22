"use client";

import Option from "./option"; // Adjust path based on your folder structure

export default function ScrollingOptions() {
  const firstRowOptions = [
    { icon: "/api-icon.svg", title: "Integrations" },
    { icon: "/web-design-icon.svg", title: "Web Design" },
    { icon: "/branding-icon.svg", title: "Branding" },
    { icon: "/art-brush-icon.svg", title: "Logos" },
    { icon: "/maintenance-icon.svg", title: "Maintenance" },
  ];

  const secondRowOptions = [
    { icon: "/typography-icon.svg", title: "Typography" },
    { icon: "/social-media-icon.svg", title: "Social Media" },
    { icon: "/web-hosting-icon.svg", title: "Web Hosting" },
    { icon: "/web-security-icon.svg", title: "Web Security" },
    { icon: "/development-icon.svg", title: "Development" },
  ];

  return (
    <div className="flex flex-col gap-10 w-full max-w-[950px]">
      {/* First Row */}
      <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_50px,_black_calc(100%-100px),transparent_100%)]">
        <div className="flex gap-[19px] pr-[19px] animate-infinite-scroll md:gap-[58px] md:pr-[58px]">
          {firstRowOptions.map((option, index) => (
            <Option key={index} icon={option.icon} title={option.title} />
          ))}
          {firstRowOptions.map((option, index) => (
            <Option key={`duplicate-${index}`} icon={option.icon} title={option.title} />
          ))}
        </div>
      </div>

      {/* Second Row */}
      <div className="w-full justify-end inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_50px,_black_calc(100%-100px),transparent_100%)]">
        <div className="flex pt-1 gap-[19px] pl-[19px] animate-reverse-infinite-scroll md:gap-[58px] md:pl-[58px]">
          {secondRowOptions.map((option, index) => (
            <Option key={index} icon={option.icon} title={option.title} />
          ))}
          {secondRowOptions.map((option, index) => (
            <Option key={`duplicate-${index}`} icon={option.icon} title={option.title} />
          ))}
        </div>
      </div>
    </div>
  );
}