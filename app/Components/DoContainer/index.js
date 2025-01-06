import Image from 'next/image';
import Do from '../Do';
import '../../styles.css'

export default function DoContainer() {
  const scrollToId = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
  
    const elementRect = element.getBoundingClientRect();
    const elementTop = elementRect.top + window.scrollY;
    const viewportHeight = window.innerHeight;
  
    // Calculate offset to center the element in the viewport
    const offset = (viewportHeight - elementRect.height) / 2;
  
    window.scrollTo({
      top: elementTop - offset,
      behavior: 'smooth',
    });
  };

  return (
    <div className="flex overflow-x-scroll overflow-y-hidden mx-[26px]">
      <div className='flex gap-6 min-w-full'>
        <div onClick={() => scrollToId('block-1')} className="flex min-w-[250px]">
          <Do 
            icon="/home-do-web.gif"
            title="Website Design & Development"
            description="Our Web Design & Development package delivers captivating designs tailored to engage and convert your audience. Each website is crafted with strategic attention to detail, bringing your digital vision to life with a high-performing, user-friendly website on all devices."
            className="min-w-[300px] flex-shrink-0"
            link="/services#block-1"
          />
        </div>
        <div onClick={() => scrollToId('block-2')} className="flex min-w-[250px]">
          <Do 
            icon="/home-do-brand.gif"
            title="Branding & Visual Identity Systems"
            description="Our Branding & Visual Identity Systems package creates a cohesive identity that resonates with your audience. From custom logos to color palettes and iconography, we build a distinctive visual story to elevate your brand and leave a lasting impression across all platforms."
            className="min-w-[300px] flex-shrink-0"
            link="/services#block-2"
          />
        </div>
        <div onClick={() => scrollToId('block-3')} className="flex min-w-[250px]">
          <Do 
            icon="/home-do-host.gif"
            title="Hosting, Maintenance & Security"
            description="Simplify website management with our Hosting, Maintenance, and Security package, which covers updates, security, and protection. Our package ensures that your site runs smoothly and securely, giving you peace of mind letting you focus on your business."
            className="min-w-[300px] flex-shrink-0"
            link="/services#block-3"
          />
        </div>
      </div>
    </div>
  );
}