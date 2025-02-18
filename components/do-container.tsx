import Do from './do';
import '@/app/globals.css';

export default function DoContainer() {

  return (
    <div className="relative w-full min-h-[596px] pt-20 bg-transparent">
      <div className="relative z-10 p-6 pt-20 flex flex-col items-center justify-start h-full gap-10">
        <h3 className="w-auto text-[32px] text-white font-gentium-book-plus font-bold text-center drop-shadow-[2px_10px_4.6px_rgba(0,0,0,0.25)]">
          What We Do
        </h3>
      </div>
      <div className="flex justify-center overflow-x-auto overflow-y-hidden mx-[26px] md:mx-[80px]">
        <div className='flex gap-6 w-full max-w-[950px]'>
          <div className="flex min-w-[250px]">
            <Do 
              icon="/home-do-web.gif"
              title="Website Design & Development"
              description="Our Web Design & Development package delivers captivating designs tailored to engage and convert your audience. Each website is crafted with strategic attention to detail, bringing your digital vision to life with a high-performing, user-friendly website on all devices."
              className="min-w-[300px] flex-shrink-0 md:min-w-[350px]"
              link="/services#block-1"
            />
          </div>
          <div className="flex min-w-[250px]">
            <Do 
              icon="/home-do-brand.gif"
              title="Branding & Visual Identity Systems"
              description="Our Branding & Visual Identity Systems package creates a cohesive identity that resonates with your audience. From custom logos to color palettes and iconography, we build a distinctive visual story to elevate your brand and leave a lasting impression across all platforms."
              className="min-w-[300px] flex-shrink-0 md:min-w-[350px]"
              link="/services#block-2"
            />
          </div>
          <div className="flex min-w-[250px]">
            <Do 
              icon="/home-do-host.gif"
              title="Hosting, Maintenance & Security"
              description="Simplify website management with our Hosting, Maintenance, and Security package, which covers updates, security, and protection. Our package ensures that your site runs smoothly and securely, giving you peace of mind letting you focus on your business."
              className="min-w-[300px] flex-shrink-0 md:min-w-[350px]"
              link="/services#block-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}