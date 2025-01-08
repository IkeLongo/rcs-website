import Image from 'next/image';
import { useState } from 'react';
import Mobile from './Mobile';

export default function Plan() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  const serviceDetails = [
    {
      commitmentTerm: "12-Month Commitment",
      commitmentDescription: "Distribute the cost of full-scale web design and development solutions into 12 monthly payments for financial flexibility.",
    },
    {
      commitmentTerm: "12-Month Commitment",
      commitmentDescription: "Distribute the cost of full-scale branding solutions into 12 monthly payments for financial flexibility.",
    },
    {
      commitmentTerm: "Month-to-Month",
      commitmentDescription: "Enjoy the freedom of a month-to-month commitment tailored to your immediate needs.",
    },
  ];

	return (
    <div className='pb-16'>
      <div className="flex flex-col justify-center items-center">
        <div className="flex w-[385px] lg:w-[425px] p-[3px] items-center gap-4 bg-[#F1F1F1] rounded-[12px]">
          <div className='flex justify-between items-center flex-auto'>
            <div
              className={`flex py-[5px] px-[15px] justify-center items-center gap-[10px] rounded-[10px] cursor-pointer ${
                selectedIndex === 0 ? 'bg-[#359CCD] rounded-[10px] text-white' : 'text-purple-800'
              }`}
              onClick={() => handleClick(0)}
            >
              <p className={`font-source-sans-pro text-[10px] lg:text-[12px] font-bold ${selectedIndex === 0 ? 'text-white' : 'text-purple-900'}`}>
                Web Design & Dev
              </p>
            </div>
            <div
              className={`flex py-[5px] px-[15px] justify-center items-center gap-[10px] rounded-[10px] cursor-pointer ${
                selectedIndex === 1 ? 'bg-[#359CCD] rounded-[10px] text-white' : 'text-purple-900'
              }`}
              onClick={() => handleClick(1)}
            >
              <p className={`font-source-sans-pro text-[10px] lg:text-[12px] font-bold ${selectedIndex === 1 ? 'text-white' : 'text-purple-900'}`}>
                Branding & Visual
              </p>
            </div>
            <div
              className={`flex py-[5px] px-[15px] justify-center items-center gap-[10px] rounded-[10px] cursor-pointer ${
                selectedIndex === 2 ? 'bg-[#359CCD] rounded-[10px] text-white' : 'text-purple-900'
              }`}
              onClick={() => handleClick(2)}
            >
              <p className={`font-source-sans-pro text-[10px] lg:text-[12px] font-bold ${selectedIndex === 2 ? 'text-white' : 'text-purple-900'}`}>
                Hosting & Maintenance
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-4 justify-center items-center gap-[10px] self-stretch">
          <h4 className='font-maven-pro text-[16px] font-bold text-gray-200 text-center pt-[29px]'>
            {serviceDetails[selectedIndex].commitmentTerm}
          </h4>
          <p className='font-avenir text-center text-[14px] pb-[30px] text-white max-w-[400px]'>
            {serviceDetails[selectedIndex].commitmentDescription}
          </p>
        </div>
      </div>
      <Mobile selectedIndex={selectedIndex} />
    </div>
  );
}