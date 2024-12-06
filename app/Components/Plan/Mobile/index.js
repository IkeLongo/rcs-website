import { useEffect, useRef, useState } from 'react';
import PremiumCard from './Premium';
import NormalCard from './Normal';

export default function Mobile({ selectedIndex }) {
  const scrollContainerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer && scrollPosition === null) {
      // Set initial scroll position to center
      const initialScrollPosition = (scrollContainer.scrollWidth - scrollContainer.clientWidth) / 2;
      scrollContainer.scrollLeft = initialScrollPosition;
      setScrollPosition(initialScrollPosition);
    }
  }, [scrollPosition]);

  const handleScroll = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      setScrollPosition(scrollContainer.scrollLeft);
    }
  };

	return (
    <div className="flex overflow-x-auto overflow-y-hidden mx-[24px]" ref={scrollContainerRef} onScroll={handleScroll}>
      {selectedIndex === 0 && (
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
              "Advanced Security",
              "API Integrations"
            ]}
          />
        </div>
      )}
      {selectedIndex === 1 && (
        <div className="flex min-w-full">
          <NormalCard
            monthlyPrice={200}
            totalPrice="2,400"
            planName="Base"
            planDescription="Perfect for individuals or businesses with no branding who want to establish a professional image."
            features={[
              "Primary Logo Design",
              "One Secondary Logo",
              "Color Palette",
              "Mood Board",
              "2 Font Licenses",
              "Custom Brand Pattern",
              "Mission & Vision Worksheet"
            ]}
          />
          <PremiumCard
            monthlyPrice={450}
            totalPrice="5,400"
            planName="Pro"
            planDescription="Best suited for growing brands that need a comprehensive set of visual tools."
            features={[
              "Primary Logo Design",
              "2 Secondary Logos",
              "Icon Variations",
              "2 Font Licenses",
              "Custom Brand Pattern",
              "Custom Graphic Elements",
              "Professional Photography Photoshoot"
            ]}
          />
          <NormalCard
            monthlyPrice="750"
            totalPrice="9,000"
            planName="Enterprise"
            planDescription="Best for businesses requiring not just branding, but strategic, full-service design solutions."
            features={[
              "Primary Logo Design",
              "Logo & Icon Suite",
              "Custom Typography Solutions",
              "Extended Color Palette",
              "Professional Photography Photoshoot",
              "Creative Consultation"
            ]}
          />
        </div>
      )}
      {selectedIndex === 2 && (
        <div className="flex min-w-full">
          <NormalCard
            monthlyPrice={99}
            planName="Base"
            planDescription="Affordable website maintenance to keep your website running smoothly without the stress."
            features={[
              "Reliable Website Hosting",
              "1 Hour of Monthly Maintenance",
              "Discounted Hourly Rate",
              "Routine Backups",
              "Basic Security Updates",
              "Performance Monitoring",
              "Basic Analytics"
            ]}
          />
          <PremiumCard
            monthlyPrice="219"
            planName="Pro"
            planDescription="Enhanced maintenance and hosting with more support for growing sites."
            features={[
              "Reliable Website Hosting",
              "2 Hours of Monthly Maintenance",
              "Discounted Hourly Rate",
              "Enhanced Backups",
              "Advanced Security Updates",
              "Performance Monitoring & Optimization",
              "Advanced Analytics"
            ]}
          />
          <NormalCard
            monthlyPrice="599"
            planName="Enterprise"
            planDescription="Comprehensive hosting and care for websites that demand top-tier performance."
            features={[
              "Reliable Website Hosting",
              "2+ Hours of Monthly Maintenance",
              "Discounted Hourly Rate",
              "Monthly SEO Updates",
              "Premium Security",
              "Advanced Performance Optimization",
              "Comprehensive Monthly Reports"
            ]}
          />
        </div>
      )}
    </div>
  );
}