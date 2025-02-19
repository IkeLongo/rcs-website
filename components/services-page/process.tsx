"use client";

import Image from 'next/image';

export default function Process() {
  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
  
    const duration = 1000; // Duration in milliseconds
    const start = window.scrollY;
    const targetPosition = element.getBoundingClientRect().top + window.scrollY;
    const distance = targetPosition - start;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
  
    const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };
  
    const scroll = () => {
      const currentTime = 'now' in window.performance ? performance.now() : new Date().getTime();
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, start, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) {
        requestAnimationFrame(scroll);
      }
    };
  
    requestAnimationFrame(scroll);
  };

  return (
    <div className='md:h-auto lg:h-auto'>
      <div className="flex items-center justify-center bg-gray-900">
        <div className='relative top-20 flex flex-col w-full justify-center self-center gap-[16px] bg-white mx-4 px-[34px] py-[20px] rounded-[10px] shadow-[-11px_15px_7.5px_0_rgba(0,0,0,0.25)] z-10 md:top-20 lg:top-8 md:max-w-[665px] lg:flex-row lg:max-w-[1000px] lg:-top-24'>
          <div>
            <p className="text-gray-800 font-bold text-[15px] font-maven-pro">
              JUMP TO
            </p>
          </div>
          <div className="flex flex-col gap-4 lg:flex-row lg:gap-0">
            <a href="#block-1" className="text-gray-800 font-bold text-[15px] font-maven-pro lg:border-r lg:border-gray-300 lg:pr-4" onClick={(e) => { e.preventDefault(); scrollToId('block-1'); }}>Website Design & Development</a>
            <a href="#block-2" className="text-gray-800 font-bold text-[15px] font-maven-pro lg:border-r lg:border-gray-300 lg:px-4" onClick={(e) => { e.preventDefault(); scrollToId('block-2'); }}>Branding & Visual Identity Systems</a>
            <a href="#block-3" className="text-gray-800 font-bold text-[15px] font-maven-pro lg:pl-4" onClick={(e) => { e.preventDefault(); scrollToId('block-3'); }}>Hosting, Maintenance & Security</a>
          </div>
        </div>
      </div>
      <div className="relative flex flex-col w-full h-auto px-4 pt-[150px] pb-[50px] gap-14 bg-gray-800 overflow-x-hidden z-5 md:px-20 lg:pt-[100px]">
        <div className='flex flex-col gap-4'>
          <h3 className='w-auto text-[32px] text-white font-gentium-book-plus font-bold text-center drop-shadow-[2px_10px_4.6px_rgba(0,0,0,0.25)]'>
            Our Process is Simple<br className='md:hidden'/> & Effective
          </h3>
          <p className='font-avenir text-center text-[14px]'>
            Achieving your vision is easy with our refined and effective approach.
          </p>
        </div>
        {/* mobile and desktop container */}
        <div className='flex flex-col px-4 gap-[50px] md:hidden lg:block lg:flex lg:flex-row lg:gap-20 lg:max-w-[950px] lg:self-center'>
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
        {/* tablet container */}
        <div className='hidden md:block md:flex md:flex-col md:px-4 md:gap-20 lg:hidden'>
          <div className='flex gap-20'>
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
          </div>
          <div className='flex gap-20'>
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
      </div>
      <div className='flex flex-col gap-[16px] bg-gray-900 px-[34px] py-[60px] md:relative'>
        <p className="font-avenir text-center text-[14px]">
          Click on any of the service boxes below to learn more about each option.
        </p>
      </div>
    </div>
  );
}