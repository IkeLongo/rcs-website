import Image from 'next/image';
import {Button, ButtonGroup} from "@nextui-org/button";
import Link from 'next/link';
import { CardProps } from '@/types/components';

export default function NormalCard({ monthlyPrice, totalPrice, planName, planDescription, features }: CardProps) {
  return (
    <div className="flex h-auto items-center gap-[40px] justify-center">
      <div className="flex flex-col w-[250px] lg:w-[300px] h-[506px] lg:h-[575px] justify-start bg-mobile-normal-bg bg-center bg-cover">
        <div className="relative invisible z-10 flex items-center justify-center self-end uppercase w-[99px] h-[22px] bg-white rounded-[20px] mx-10 my-7">
          <p className="hidden">Most Popular</p>
        </div>

        <div className='flex flex-col items-stretch h-[447px] lg:h-[525px] pb-16 md:-top-10 lg:top-4'>
          <div className='pl-12 lg:pl-14 flex flex-col self-stretch grow gap-1'>
            <div className='-mt-12 lg:-mt-12'>
              <div className="flex flex gap-1 items-end transition-opacity duration-500 opacity-100">
                <p className='font-maven-pro text-normal-card-dark-purple text-[20px] lg:text-md2 font-semibold'>
                  ${monthlyPrice}
                </p>
                <p className='font-maven-pro text-normal-card-gray text-[11px] lg:text-sm pb-[2px]'>
                  /month
                </p>
              </div>
            </div>
            {totalPrice && (
              <div className='-mt-1 fade-text'>
                <p className='font-maven-pro text-gray-300 text-[11px] lg:text-[12px] text-left'>
                  ${totalPrice} Total
                </p>
              </div>
            )}
            <div className='flex flex-col pt-0 md:pt-2 grow pr-6 lg:pr-9 gap-4'>
              <div className="fade-text">
                <p className='font-maven-pro self-stretch text-[20px] lg:text-md2 text-normal-card-dark-purple font-semibold my-2 md:mt-0 text-left'>
                  {planName}
                </p>
                <p className='text-normal-card-gray text-[11px] lg:text-sm pr-4 lg:pr-12 leading-5 text-left'>
                  {planDescription}
                </p>
              </div>
              <div className="h-[150px] grow overflow-y-auto relative pr-2 custom-scroll">                
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-2 items-center pr-10 lg:pr-12 fade-text">
                    <Image 
                      src="/normal-checkmark.svg"
                      alt="Checkmark"
                      width={15}
                      height={15}
                    />
                    <p className="text-normal-card-gray text-[12px] lg:text-[14px] capitalize leading-4 text-left my-1">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Link href="/booking" passHref className='self-center pt-4'>
            <Button
              className="w-[172px] lg:w-[200px] h-[35px] lg:h-[40px] font-maven-pro font-semibold text-babyblue-500 text-[12px] lg:text-[14px] rounded-[20px] bg-[#F0FBFF] self-center">
              Book a Call
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}