import Image from "next/image";
import { CardProps } from '@/types/components';
import 'simplebar-react/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';

export default function NormalCard({ monthlyPrice, totalPrice, planName, planDescription, features }: CardProps) {
  return (
    (<div className="flex h-auto items-center gap-[40px] justify-center">
      <div className="relative flex flex-col w-[220px] lg:w-[300px] h-[530px] lg:h-[575px] justify-start">
        <Image
          src="/mobile-normal-bg.svg"
          alt=""
          fill
          className="object-cover object-center"
        />
        <div className="relative z-10 flex items-center justify-center self-end uppercase w-[99px] h-[22px] bg-white rounded-[20px] mx-10 my-7">
          <p className="hidden">Most Popular</p>
        </div>

        <div className='relative z-10 flex flex-col items-stretch h-[447px] lg:h-[525px] pb-16 md:top-0 ml-6 lg:ml-14 mr-1 lg:mr-12 box-border'>
          <div className='flex flex-col self-stretch grow'>
            <div className='-mt-12 lg:-mt-12'>
              <div className="flex flex gap-1 items-end transition-opacity duration-500 opacity-100">
                <div className='font-maven-pro text-normal-card-dark-purple text-[20px] lg:text-md2 font-semibold'>
                  ${monthlyPrice}
                </div>
                <div className='font-maven-pro text-normal-card-gray text-sm lg:text-sm pb-[2px]'>
                  /month
                </div>
              </div>
            </div>
            {totalPrice && (
              <div className='-mt-1 fade-text'>
                <div className='font-maven-pro text-gray-500 text-sm lg:text-[12px] text-left'>
                  ${totalPrice} Total
                </div>
              </div>
            )}
            <div className='flex flex-col pt-0 md:pt-2 grow gap-4'>
              <div className="fade-text">
                <div className='font-maven-pro self-stretch text-[20px] lg:text-md2 text-normal-card-dark-purple font-semibold my-2 md:mt-0 text-left leading-6'>
                  {planName}
                </div>
                <div className='text-normal-card-gray text-sm lg:text-sm pr-4 leading-4 text-left'>
                  {planDescription}
                </div>
              </div>
              <SimpleBar autoHide={false} className="h-[150px] grow overflow-y-auto relative pr-2">                
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-2 items-center pr-10 lg:pr-10 fade-text">
                    <Image
                      src="/checkmark-blue.svg"
                      alt="Checkmark"
                      width={15}
                      height={15}
                      style={{
                        maxWidth: "100%",
                        height: "auto"
                      }} />
                    <div className="text-normal-card-gray text-sm lg:text-[14px] capitalize leading-4 text-left my-1">
                      {feature}
                    </div>
                  </div>
                ))}
              </SimpleBar>
            </div>
          </div>
        </div>
      </div>
    </div>)
  );
}