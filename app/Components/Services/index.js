"use client";

import { useState, useEffect } from 'react';
import LightBlueBlock from "./light-blue-block";
import DarkBlueBlock from "./dark-blue-block";
import InfoBlock from "./info-block";
import '../../styles.css'

export default function ServiceBlocks() {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showInfoBlock, setShowInfoBlock] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  const handleBlockClick = (blockId) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedBlock(blockId);
      setShowInfoBlock(true);
      setIsTransitioning(false);
    }, 500); // Match this duration with the CSS animation duration
  };

  const handleBackToServices = () => {
    setIsTransitioning(true);
    setShowInfoBlock(false);
    setTimeout(() => {
      setSelectedBlock(null);
      setIsTransitioning(false);
    }, 1200); // Match this duration with the CSS animation duration
  };
  
  return (
    <div className="flex flex-col w-full h-auto items-center justify-center z-40">
      {selectedBlock === null ? (
        <div className={`flex flex-col h-auto w-full items-center justify-center md:flex-row ${hasLoaded ? (isTransitioning ? 'slide-out-bottom' : 'slide-in-top initial-offscreen-y') : ''}`}>
          <LightBlueBlock 
            iconRoute="/services-computer.svg"
            iconDescription="Computer icon"
            iconWidth="70"
            title="Website Design & <br />Development"
            bgImageClass="bg-service-mobile-webdev-bg bg-no-repeat bg-cover"
            blockId="block-1"
            onClick={() => handleBlockClick('block-1')}
            top="top-[25%]"
          />
          <DarkBlueBlock 
            iconRoute="/services-lightbulb.svg"
            iconDescription="Lightbulb icon"
            iconWidth="60"
            title="Visual & Identity<br />Systems"
            bgImageClass="bg-service-mobile-branding-bg bg-no-repeat bg-cover"
            blockId="block-2"
            onClick={() => handleBlockClick('block-2')}
            top="top-[22%]"
          />
          <LightBlueBlock 
            iconRoute="/services-hosting.svg"
            iconDescription="Servers icon"
            iconWidth="52"
            title="Hosting, Maintenance & <br />Security"
            bgImageClass="bg-service-mobile-hosting-bg bg-no-repeat bg-cover"
            blockId="block-3"
            onClick={() => handleBlockClick('block-3')}
            top="top-[25%]"
          />
        </div>
      ) : (
        <div className="info-block-container">
          <InfoBlock selectedBlock={selectedBlock} onBack={handleBackToServices} isTransitioning={isTransitioning} />
        </div>
      )}
    </div>
  );
}