import Do from "./do";
import "@/app/globals.css";

export async function DoContainer() {
  // Array of services to be displayed
  const services = [
    {
      icon: "/home-web-design-animation",
      title: "Website Design & Development",
      description:
        "Our Web Design & Development package delivers captivating designs tailored to engage and convert your audience. Each website is crafted with strategic attention to detail, bringing your digital vision to life with a high-performing, user-friendly website on all devices.",
      link: "/services#block-1",
    },
    {
      icon: "/home-branding-animation",
      title: "Branding & Visual Identity Systems",
      description:
        "Our Branding & Visual Identity Systems package creates a cohesive identity that resonates with your audience. From custom logos to color palettes and iconography, we build a distinctive visual story to elevate your brand and leave a lasting impression across all platforms.",
      link: "/services#block-2",
    },
    {
      icon: "/home-hosting-animation",
      title: "Hosting, Maintenance & Security",
      description:
        "Simplify website management with our Hosting, Maintenance, and Security package, which covers updates, security, and protection. Our package ensures that your site runs smoothly and securely, giving you peace of mind letting you focus on your business.",
      link: "/services#block-3",
    },
  ];

  return (
    <div className="relative w-full min-h-[596px] bg-transparent">
      <div className="relative z-10 p-6 pt-20 flex flex-col items-center justify-start h-full gap-10">
        <h3>
          What We Do
        </h3>
      </div>

      <div className="flex justify-center overflow-x-auto overflow-y-hidden mx-[26px] md:mx-[80px]">
        <div className="flex gap-6 w-full max-w-[950px]">
          {/* Map through the services array */}
          {services.map((service, index) => (
            <div className="flex min-w-[250px]" key={index}>
              <Do
                icon={service.icon}
                title={service.title}
                description={service.description}
                className="min-w-[300px] flex-shrink-0 md:min-w-[350px]"
                link={service.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
