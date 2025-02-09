import Image from 'next/image';
import {Button, ButtonGroup} from "@nextui-org/button";
import Link from 'next/link';

export default function PremiumCard({ monthlyPrice, totalPrice, planName, planDescription, features }) {

	return (
    <div className="flex h-auto items-center gap-[40px] justify-center">
      <div className="flex flex-col w-[250px] lg:w-[315px] h-[506px] lg:h-[625px] justify-start bg-mobile-premium-bg bg-center bg-cover">
        <div className="relative z-10 flex items-center justify-center self-end uppercase w-[99px] lg:w-[115px] h-[22px] lg:h-[22px] bg-white rounded-[20px] mx-10 lg:mr-12 my-7">
          <p className="uppercase font-maven-pro font-semibold text-center text-[8px] lg:text-[10px] text-blue-500 py-2">Most Popular</p>
        </div>

        <div className='flex flex-col items-stretch h-[447px] lg:h-[525px] pb-20 lg:pb-14'>
          <div className='pl-12 lg:pl-14 flex flex-col self-stretch grow'>
            <div className='flex gap-1 items-end -mt-6'>
              <p className='font-maven-pro text-white text-[20px] lg:text-[24px] font-semibold fade-text'>
                ${monthlyPrice}
              </p>
              <p className='font-maven-pro text-gray-200 text-[11px] lg:text-[14px] pb-1'>
                /month
              </p>
            </div>
            {totalPrice && (
              <div className='-mt-1'>
                <p className='font-maven-pro text-purple-300 text-[11px] lg:text-[12px]'>
                  ${totalPrice} Total
                </p>
              </div>
            )}
            <div className='flex flex-col pt-2 grow'>
              <h4 className='self-stretch font-maven-pro text-[20px] lg:text-[24px] text-white font-semibold'>
                {planName}
              </h4>
              <p className='font-maven-pro text-gray-200 text-[11px] lg:text-[14px] pr-10 lg:pr-12'>
                {planDescription}
              </p>
              <div className='flex flex-col py-4 justify-between grow'>
                {features.map((feature, index) => (
                  <div key={index} className='flex gap-2 items-center pr-10 lg:pr-12'>
                    <Image 
                      src="/premium-checkmark.svg"
                      alt="Checkmark"
                      width={15}
                      height={15}
                      className=""
                    />
                    <p className='font-maven-pro text-gray-200 text-[12px] lg:text-[14px] capitalize leading-4'>
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Link href="/booking" passHref className='self-center'>
            <Button
              href="/booking"
              className="w-[172px] lg:w-[200px] h-[35px] lg:h-[40px] font-maven-pro font-semibold text-purple-500 text-[12px] lg:text-[14px] rounded-[20px] bg-white self-center">
              Book a Call
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}