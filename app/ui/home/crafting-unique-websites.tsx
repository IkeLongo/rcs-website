import InfoGraphic from "../components/info-graphic";
import "@/app/globals.css";
import webDesignAnimation from "@/app/lib/assets/home-web-design-animation.json";
import brandingAnimation from "@/app/lib/assets/home-branding-animation.json";
import hostingAnimation from "@/app/lib/assets/home-hosting-animation.json";
import Image from "next/image";
// import FadeInUp from "../components/fade-in-up";

export default function UniqueWebsites() {
 
  // Array of services to be displayed
  const services = [
  {
    animation: webDesignAnimation,
    title: "Website Design & Development",
    description:
      "Custom-built websites designed to engage your audience and grow your business.",
    link: "/services#block-1",
  },
  {
    animation: brandingAnimation,
    title: "Branding & Visual Identity Systems",
    description:
      "Craft a unique brand identity with logos, colors, and visuals that leave a lasting impression.",
    link: "/services#block-2",
  },
  {
    animation: hostingAnimation,
    title: "Hosting, Maintenance & Security",
    description:
      "We keep your website running fast, safe, and up to date—so you can focus on your business.",
    link: "/services#block-3",
  },
];


  return (
    <div className="relative w-full min-h-[596px] py-10 pb-20 overflow-hidden">
      <Image
        src="/home-landscape-bluegrad.webp"
        alt=""                  // decorative is fine
        fill
        loading="lazy"
        quality={70}            // ✅ lower for backgrounds
        sizes="(max-width: 768px) 100vw, 1200px"  // ✅ cap desktop
        className="object-cover object-top"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/25 mix-blend-lighten pointer-events-none z-0" />
      <div className="relative z-10 p-6 pt-0 flex flex-col items-center justify-start h-full gap-10">
        <h3 className="!text-white">
          {/* <FadeInUp
            className="text-white"
          > */}
            Crafting Unique Websites
          {/* </FadeInUp> */}
        </h3>
      </div>

      <div className="relative z-10 flex justify-center overflow-x-auto overflow-y-hidden md:mx-[80px]">
        <div className="flex gap-6 w-full max-w-[950px]">
          {/* Left ghost padding */}
          <div className="min-w-[20px] flex-shrink-0" aria-hidden="true" />
          {/* Map through the services array */}
          {services.map((service, index) => (
            <div className="flex min-w-[250px] mb-2" key={index}>
              <InfoGraphic
                animation={service.animation}
                title={service.title}
                description={service.description}
                className="min-w-[300px] flex-shrink-0 md:min-w-[350px]"
                link={service.link}
              />
            </div>
          ))}
          {/* Right ghost padding */}
          <div className="min-w-[20px] flex-shrink-0" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
