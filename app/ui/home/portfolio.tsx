"use client";

import WebsiteWork from "./website-work";
import BrandingWork from "./branding-work";
import {Tabs, Tab, Card, CardBody} from "@heroui/react";

export default function Portfolio() {

  return (
    <div className="flex flex-col items-center bg-alice-blue-500">
      <h3 className="text-navy-500 pt-10">
        Our Work
      </h3>
      <p className="text-navy-500 mt-2 mb-8 text-center max-w-xl">
        A selection of websites and brands we've brought to life.
      </p>
      <div className="flex w-full flex-col gap-6">
        <Tabs
        aria-label="Dynamic tabs"
        variant="solid"
        radius="lg"
        classNames={{
          base: "bg-alice-blue-200 rounded-[10px] p-1 h-[40px] w-[200px] self-center",
          tabContent: "group-data-[selected=true]:text-navy-500 p-1 font-avenir text-sm text-blue-500 rounded-sm",
          tab: "h-[30px] rounded-[5px] bg-transparent data-[selected=true]:bg-light-green-500",
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