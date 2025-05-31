"use client";

import { useSwipeable } from "react-swipeable";
import { useState } from "react";
import {Tab, Tabs} from "@heroui/react";
import PremiumCard from "./premium-card";
import NormalCard from "./normal-card";

const plans = [
  {
    key: "web-design",
    title: "Web Design",
    monthlyPrice: "350",
    totalPrice: "4,200",
    planName: "Web Design & Development",
    planDescription: `Launch a custom, responsive website that reflects your brand, engages visitors, 
                      and supports your goals—with expert development and a seamless user experience.`,
    features: [
              "Strategy Call",
              "Custom Website Design",
              "In House Development",
              "1-3 Web Pages",
              "Responsive Design",
              "Contact Form",
              "On-Page SEO",
              "SSL Security",
              "Two Months Free Hosting & Support",
              "Domain Name Registration",
              "Google Analytics Setup",
              "Google Business Profile Setup",
            ],
  },
  {
    key: "web-branding",
    title: (
      <>
        Web <span className="text-green-500">&</span> Branding
      </>
    ),
    monthlyPrice: "450",
    totalPrice: "5,400",
    planName: (
      <>
        Web Design <span className="font-passero-one text-lime-500 font-normal text-md2">PLUS</span> Branding
      </>
    ),
    planDescription: `Bring your brand to life with a complete identity and a high-quality website. 
                      Ideal for service-based businesses ready to launch a clean, conversion-focused online presence.`,
    features: [
              "Everything in Web Design",
              "Everything in Branding",
              "Performance Optimization",
              "Social Media Starter Kit",
              "Professional Photoshoot",
              "Brand Messaging Guide",
              "Launch Graphics for Social Media",
              "Email Sign-Up Integration",
              "Website Training Session",
              "Mockup Previews of Your Brand & Website",
              "Client Launch Checklist"
            ],
  },
  {
    key: "branding",
    title: "Branding",
    monthlyPrice: "183",
    totalPrice: "2,200",
    planName: "Branding & Visual Identity",
    planDescription: `Build a strong visual identity before launching your website. 
                      This package helps your brand stand out and connect through a thoughtful, 
                      strategic design process.`,
    features: [
              "1-on-1 Brand Discovery Session",
              "Brand Moodboard",
              "Brand Style Guide",
              "Color Palette",
              "Primary Logo Design",
              "2 Secondary Logos",
              "Icon Variations",
              "Custom Brand Pattern",
              "2 Font Licenses",
              "2 Printing Assets",
              "Mission & Vision Worksheet",
            ],
  },
];

export default function Pricing() {
  
  // Default to "Web Design & Branding" (index 1)
  const [selectedIndex, setSelectedIndex] = useState(1);

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (selectedIndex < plans.length - 1) setSelectedIndex(selectedIndex + 1);
    },
    onSwipedRight: () => {
      if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
    },
    trackMouse: true, // allows swipe with mouse as well
  });

	return (
    <div id='pricing' className="relative w-full min-h-[450px] bg-home-pricing-bg bg-cover bg-top">
      <div className="relative z-10 p-6 pt-10 flex flex-col items-center justify-start h-full gap-4">
        <h3>
          Choose Your Plan!
        </h3>
      </div>
      <div className='flex flex-col items-center pb-16'>
        {/* Tabs Row */}
        <div className="flex flex-col items-center">
          <div className="w-auto max-w-3xl px-6 flex items-center justify-center">
            <Tabs
              aria-label="Dynamic tabs"
              selectedKey={plans[selectedIndex].key}
              onSelectionChange={(key) => {
                const idx = plans.findIndex((plan) => plan.key === key);
                setSelectedIndex(idx);
              }}
              variant="solid"
              radius="lg"
              classNames={{
                base: "w-full whitespace-nowrap bg-alice-blue-500 rounded-[14px] p-1 px-0 h-[40px] mx-2 self-center",
                tabList: "w-full flex items-center justify-center",
                tabContent: "group-data-[selected=true]:text-white p-1 font-source-sans-pro text-sm font-semibold text-navy-500 rounded-sm",
                tab: "h-[30px] w-fit rounded-[10px] bg-transparent data-[selected=true]:bg-navy-500",
              }}
            >
              {plans.map((plan, idx) => (
                <Tab key={plan.key} title={plan.title} />
              ))}
            </Tabs>
          </div>

          {/* Cards Row */}
          <div className="relative w-full max-w-3xl overflow-hidden pt-16">
            <div
              {...handlers}
              className="flex justify-center gap-6 transition-transform duration-500 ease-in-out"
              style={{
                width: `${plans.length * 220}px`,
                transform: `translateX(calc(50% - ${(selectedIndex + 0.5) * (100 / plans.length)}%))`,
                touchAction: "pan-y", // allows horizontal swipe
              }}
            >
              {plans.map((plan, idx) => (
                <div
                  key={plan.key}
                  className="flex-shrink-0 flex justify-center items-end"
                  style={{ width: "220px" }}
                >
                  {idx === 1 ? (
                    <div className={selectedIndex === idx ? "scale-110 z-10" : "opacity-80"}>
                      <PremiumCard {...plan} />
                    </div>
                  ) : (
                    <div className={selectedIndex === idx ? "scale-110 z-10" : "opacity-80"}>
                      <NormalCard {...plan} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="w-full text-navy-500 px-8">Need something a little different? Every package is customizable to match your goals. Listed prices are starting points and may vary based on your project’s needs.</p>
      </div>
    </div>
  );
}
