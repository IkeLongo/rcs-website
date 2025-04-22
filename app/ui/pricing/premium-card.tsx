import Image from "next/image";
import {Button, ButtonGroup} from "@nextui-org/button";
import Link from 'next/link';
import { CardProps } from '@/types/components';
import SimpleBar from 'simplebar-react';

export default function PremiumCard({ monthlyPrice, totalPrice, planName, planDescription, features }: CardProps) {

	return (
      (<div className="flex h-auto items-center gap-[40px] justify-center">
        <div className="flex flex-col w-[265px] lg:w-[315px] h-[530px] lg:h-[625px] justify-start bg-mobile-premium-bg bg-center bg-cover">
          <div className="relative z-10 flex items-center justify-center self-end uppercase w-[99px] lg:w-[115px] h-[22px] lg:h-[22px] bg-white rounded-[20px] mx-10 lg:mr-12 my-7">
            <p className="uppercase font-maven-pro font-semibold text-center text-[8px] lg:text-[10px] text-blue-500 py-2">Most Popular</p>
          </div>

          <div className='flex flex-col items-stretch h-[447px] lg:h-[525px] pb-16 lg:pb-14'>
            <div className='pl-12 lg:pl-14 flex flex-col self-stretch grow'>
              <div className='flex gap-1 items-end -mt-6'>
                <p className='font-maven-pro text-white text-[20px] lg:text-md2 font-semibold fade-text'>
                  ${monthlyPrice}
                </p>
                <p className='font-maven-pro text-gray-200 text-[11px] lg:text-[14px] pb-[4px]'>
                  /month
                </p>
              </div>
              {totalPrice && (
                <div className='-mt-1'>
                  <p className='font-maven-pro text-purple-300 text-[11px] lg:text-[12px] text-left'>
                    ${totalPrice} Total
                  </p>
                </div>
              )}
              <div className='flex flex-col pt-0 grow pr-7 lg:pr-8 gap-4'>
                <div className="fade-text">
                  <p className='self-stretch font-maven-pro text-[20px] lg:text-md2 text-white font-semibold my-2 text-left'>
                    {planName}
                  </p>
                  <p className='font-maven-pro text-gray-200 text-[11px] lg:text-sm pr-4 lg:pr-12 leading-5 text-left'>
                    {planDescription}
                  </p>
                </div>
                <SimpleBar autoHide={false} className='h-[150px] grow overflow-y-auto relative pr-2 custom-scroll'>
                  {features.map((feature, index) => (
                    <div key={index} className='flex gap-2 items-center pr-10 lg:pr-12'>
                      <Image
                        src="/checkmark-white.svg"
                        alt="Checkmark"
                        width={15}
                        height={15}
                        className=""
                        style={{
                          maxWidth: "100%",
                          height: "auto"
                        }} />
                      <p className='font-maven-pro text-gray-200 text-[12px] lg:text-[14px] capitalize leading-4 text-left my-1'>
                        {feature}
                      </p>
                    </div>
                  ))}
                </SimpleBar>
              </div>
            </div>
            <Link href="/booking" passHref className='self-center pt-4'>
              <Button
                href="/booking"
                className="w-[172px] lg:w-[200px] h-[35px] lg:h-[40px] font-maven-pro font-semibold text-purple-500 text-[12px] lg:text-[14px] rounded-[20px] bg-white self-center">
                Book a Call
              </Button>
            </Link>
          </div>
        </div>
      </div>)
    );
}