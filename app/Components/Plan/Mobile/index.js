import { useEffect, useRef } from 'react';
import PremiumCard from './Premium';
import NormalCard from './Normal';

export default function Mobile() {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollLeft = (scrollContainer.scrollWidth - scrollContainer.clientWidth) / 2;
    }
  }, []);

	return (
    <div className="flex overflow-x-auto mx-[24px]" ref={scrollContainerRef}>
      <div className="flex min-w-full">
        <NormalCard
          monthlyPrice={300}
          totalPrice="3,600"
          planName="Base"
          planDescription="Perfect for businesses starting fresh, our Base plan delivers a professional, foundational website to establish your online presence."
          features={[
            "1-3 Pages",
            "strategy call",
            "Custom Website Design",
            "Basic SEO",
            "In House Development",
            "Simple Contact Form",
            "SSL Security"
          ]}
        />
        <PremiumCard
          monthlyPrice={800}
          totalPrice="9,600"
          planName="Pro"
          planDescription="Designed for established businesses, the Pro plan enhances your online presence with strategic design to turn visitors into clients."
          features={[
            "4-8 Pages",
            "Strategy Call",
            "Custom Website Design",
            "Advanced SEO",
            "In House Development",
            "Custom Contact Form",
            "Interactive Features"
          ]}
        />
        <NormalCard
          monthlyPrice="1,300"
          totalPrice="15,600"
          planName="Enterprise"
          planDescription="The Enterprise plan is built for businesses that need powerful, customized websites, from booking systems to e-commerce solutions."
          features={[
            "9+ Pages",
            "Strategy Call",
            "Custom, scalable Website Design",
            "Advanced SEO",
            "Live Chat systems",
            "Advacned Security",
            "API Integrations"
          ]}
        />
      </div>
    </div>
  );
}