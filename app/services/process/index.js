import Image from 'next/image';
import {Button, ButtonGroup} from "@nextui-org/button";

export default function Hero() {

  return (
    <div className=''>
      <div className='relative top-20 flex flex-col gap-[16px] bg-white mx-4 px-[34px] py-[20px] rounded-[10px] shadow-[-11px_15px_7.5px_0_rgba(0,0,0,0.25)] z-10'>
        <div>
          <p className="text-gray-800 font-bold text-[15px] font-maven-pro">
            JUMP TO
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <a href="#section1" className="text-gray-800 font-bold text-[15px] font-maven-pro">Website Design & Development</a>
          <a href="#section2" className="text-gray-800 font-bold text-[15px] font-maven-pro">Branding & Visual Identity Systems</a>
          <a href="#section3" className="text-gray-800 font-bold text-[15px] font-maven-pro">Hosting, Maintenance & Security</a>
        </div>
      </div>
      <div className="relative flex flex-col w-full h-auto px-4 pt-[150px] pb-[50px] gap-14 bg-gray-800 overflow-x-hidden z-5">
        <div className='flex flex-col gap-4'>
          <h3 className='w-auto text-[32px] text-white font-gentium-book-plus font-bold text-center drop-shadow-[2px_10px_4.6px_rgba(0,0,0,0.25)]'>
            Our Process is Simple<br/>& Effective
          </h3>
          <p className='font-avenir text-center text-[14px]'>
            Achieving your vision is easy with our refined and effective approach.
          </p>
        </div>
        <div className='flex flex-col px-4 gap-[50px]'>
          <div className='flex flex-col items-center gap-4'>
            <Image
              src="/phone-actions-ringing.svg"
              alt="Phone ringing icon"
              layout="intrinsic"
              width={70} // Adjust the width as needed
              height={70} // Adjust the height as needed
              className="object-contain"
            />
            <h4 className='text-center font-maven-pro text-[20px] font-bold'>
              Book a Call
            </h4>
            <p className='font-avenir text-center text-[14px]'>
              Schedule a complimentary discovery call to discuss your goals and explore how our services can best support you.
            </p>
          </div>
          <div className='flex flex-col items-center gap-4'>
            <Image
              src="/content-write.svg"
              alt="Content write icon"
              layout="intrinsic"
              width={70} // Adjust the width as needed
              height={70} // Adjust the height as needed
              className="object-contain"
            />
            <h4 className='text-center font-maven-pro text-[20px] font-bold'>
              Get Started
            </h4>
            <p className='font-avenir text-center text-[14px]'>
              Start your journey by signing the contract, making your first payment, and filling out the client questionnaire.
            </p>
          </div>
          <div className='flex flex-col items-center gap-4'>
            <Image
              src="/programming-user-code.svg"
              alt="User programming code icon"
              layout="intrinsic"
              width={70} // Adjust the width as needed
              height={70} // Adjust the height as needed
              className="object-contain"
            />
            <h4 className='text-center font-maven-pro text-[20px] font-bold'>
              Stay Updated
            </h4>
            <p className='font-avenir text-center text-[14px]'>
              Our team will start crafting your personalized website and branding, keeping you updated at every step.
            </p>
          </div>
          <div className='flex flex-col items-center gap-4'>
            <Image
              src="/presentation-analytics.svg"
              alt="Presenting analytics icon"
              layout="intrinsic"
              width={70} // Adjust the width as needed
              height={70} // Adjust the height as needed
              className="object-contain"
            />
            <h4 className='text-center font-maven-pro text-[20px] font-bold'>
              Receive Deliverables
            </h4>
            <p className='font-avenir text-center text-[14px]'>
              Receive your tailored service package, and see the exciting impact it makes on your business growth.
            </p>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-[16px] bg-gray-900 px-[34px] py-[60px]'>
        <p className="font-avenir text-center text-[14px]">
          Click on any of the service boxes below to learn more about each option.
        </p>
      </div>
    </div>
  );
}