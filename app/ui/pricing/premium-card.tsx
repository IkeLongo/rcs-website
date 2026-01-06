import Image from "next/image";
import { CardProps } from '@/types/components';
import SimpleBar from 'simplebar-react';

export default function PremiumCard({ monthlyPrice, totalPrice, planName, planDescription, features }: CardProps) {

	return (
      (<div className="flex h-auto items-center gap-[40px] justify-center">
        <div className="flex flex-col w-[212px] lg:w-[315px] h-[530px] lg:h-[625px] justify-start bg-mobile-premium-bg bg-center bg-cover">
          <div className="relative z-10 flex items-center justify-center self-end uppercase w-[99px] lg:w-[115px] h-[22px] lg:h-[22px] bg-white rounded-[20px] mx-10 mr-6 lg:mr-12 my-7">
            <div className="uppercase !font-maven-pro !font-semibold !text-center !text-[8px] !lg:text-[10px] !text-blue-500 py-2">Most Popular</div>
          </div>

          <div className='flex flex-col items-stretch h-[447px] lg:h-[525px] pb-10 lg:pb-14 ml-6 lg:ml-14 mr-1 lg:mr-12 box-border'>
            <div className='flex flex-col self-stretch grow'>

              <div className='w-auto flex gap-1 items-end -mt-6'>
                <div className='font-maven-pro text-white text-[20px] lg:text-md2 font-semibold fade-text'>
                  ${monthlyPrice}
                </div>
                <div className='font-maven-pro text-purple-300 text-sm lg:text-[14px] pb-[4px]'>
                  /month
                </div>
              </div>
              {totalPrice && (
                <div className='-mt-1'>
                  <div className='w-auto font-maven-pro text-purple-300 text-sm lg:text-[12px] text-left'>
                    ${totalPrice} Total
                  </div>
                </div>
              )}
              <div className='flex flex-col pt-0 grow gap-4'>
                <div className="fade-text">
                  <div className='self-stretch font-maven-pro text-[20px] lg:text-md2 text-white font-semibold my-2 text-left leading-6'>
                    {planName}
                  </div>
                  <div className='font-maven-pro text-gray-200 text-sm lg:text-sm pr-4 leading-4 text-left'>
                    {planDescription}
                  </div>
                </div>
                <SimpleBar autoHide={false} className='h-[150px] grow overflow-y-auto relative mr-[2px] mb-4'>
                  {features.map((feature, index) => (
                    <div key={index} className='flex gap-2 items-center pr-8 lg:pr-8'>
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
                      <div className='font-maven-pro text-gray-200 text-sm lg:text-[14px] capitalize leading-4 text-left my-1'>
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