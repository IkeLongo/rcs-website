import InfoGraphic from "../components/info-graphic";
import "@/app/globals.css";
import webDesignAnimation from "@/app/lib/assets/home-web-design-animation.json";
import brandingAnimation from "@/app/lib/assets/home-branding-animation.json";
import hostingAnimation from "@/app/lib/assets/home-hosting-animation.json";
import FadeInUp from "../components/fade-in-up";

export default function UniqueWebsites() {
 
  // Array of services to be displayed
  const services = [
    {
      animation: webDesignAnimation,
      title: "Website Design & Development",
      description:
        "Our Web Design & Development package delivers captivating designs tailored to engage and convert your audience. Each website is crafted with strategic attention to detail, bringing your digital vision to life with a high-performing, user-friendly website on all devices.",
      link: "/services#block-1",
    },
    {
      animation: brandingAnimation,
      title: "Branding & Visual Identity Systems",
      description:
        "Our Branding & Visual Identity Systems package creates a cohesive identity that resonates with your audience. From custom logos to color palettes and iconography, we build a distinctive visual story to elevate your brand and leave a lasting impression across all platforms.",
      link: "/services#block-2",
    },
    {
      animation: hostingAnimation,
      title: "Hosting, Maintenance & Security",
      description:
        "Simplify website management with our Hosting, Maintenance, and Security package, which covers updates, security, and protection. Our package ensures that your site runs smoothly and securely, giving you peace of mind letting you focus on your business.",
      link: "/services#block-3",
    },
  ];

  return (
    <div className="relative w-full min-h-[596px] bg-home-do-mountain-range bg-origin-padding bg-cover bg-top py-10 pb-20">
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/25 mix-blend-lighten pointer-events-none z-0" />
      <div className="relative z-10 p-6 pt-0 flex flex-col items-center justify-start h-full gap-10">
        <h3 className="text-white">
          <FadeInUp>
            Crafting Unique Websites
          </FadeInUp>
        </h3>
      </div>

      <div className="relative z-10 flex justify-center overflow-x-auto overflow-y-hidden md:mx-[80px]">
        <div className="flex gap-6 w-full max-w-[950px]">
          {/* Left ghost padding */}
          <div className="min-w-[20px] flex-shrink-0" aria-hidden="true" />
          {/* Map through the services array */}
          {services.map((service, index) => (
            <div className="flex min-w-[250px]" key={index}>
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
