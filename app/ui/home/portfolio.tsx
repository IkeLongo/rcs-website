"use client";

import WebsiteWork from "./website-work";
import BrandingWork from "./branding-work";
import {Tabs, Tab} from "@heroui/react";
import FadeInUp from "../components/fade-in-up";

export default function Portfolio() {

  return (
    <div className="flex flex-col items-center bg-alice-blue-500">
      <h3 className="text-navy-500 pt-10">
        <FadeInUp>
          Our Work
        </FadeInUp>
      </h3>
      <p className="text-navy-500 mt-2 mb-8 text-center max-w-3xl px-6 text-md2">
        <FadeInUp>
          A selection of websites and brands we've brought to life.
        </FadeInUp>
      </p>
      <div className="flex w-full flex-col gap-6 md:px-20">
        <Tabs
        aria-label="Dynamic tabs"
        variant="solid"
        radius="lg"
        classNames={{
          base: "bg-navy-500 rounded-[14px] p-1 px-0 h-[40px] w-auto self-center",
          tabContent: "group-data-[selected=true]:text-navy-500 p-1 font-source-sans-pro text-sm font-semibold text-alice-blue-500 rounded-sm",
          tab: "h-[30px] rounded-[10px] bg-transparent data-[selected=true]:bg-light-green-500",
          panel: "px-0"
        }}>
          <Tab key="websites" title="Websites">
            <WebsiteWork />
          </Tab>
          <Tab key="branding" title="Branding">
            <BrandingWork />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}