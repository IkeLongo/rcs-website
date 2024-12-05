import LightBlueBlock from "./light-blue-block";
import DarkBlueBlock from "./dark-blue-block";

import Image from 'next/image';
import {Button, ButtonGroup} from "@nextui-org/button";

export default function ServiceBlocks({  }) {
  return (
    <div className="flex flex-col h-auto items-center justify-center">
      <LightBlueBlock 
        iconRoute="/services-computer.svg"
        iconDescription="Computer icon"
        iconWidth="70"
        title="Website Design & <br />Development"
        bgImageClass="bg-service-mobile-webdev-bg"
        blockId="block-1"
      />
      <DarkBlueBlock 
        iconRoute="/services-lightbulb.svg"
        iconDescription="Lightbulb icon"
        iconWidth="47"
        title="Visual & Identity<br />Systems"
        bgImageClass="bg-service-mobile-branding-bg"
        blockId="block-2"
      />
      <LightBlueBlock 
        iconRoute="/services-hosting.svg"
        iconDescription="Servers icon"
        iconWidth="57"
        title="Hosting, Maintenance & <br />Security"
        bgImageClass="bg-service-mobile-hosting-bg"
        blockId="block-3"
      />
    </div>
  );
}