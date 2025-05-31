import Link from 'next/link';
import Image from "next/image";
import ScrollToTopButton from './scroll-to-top';
import { FooterProps } from '@/types/components';
import AnimatedLottie from "../components/animations";
import footerAnimation from "@/app/lib/assets/footer-animation.json";
const { BUSINESS_EMAIL } = process.env;

export default function Footer( {bgGradientClass}: FooterProps ) {

  return (
    (<div className="relative w-full h-auto shrink-0 px-8 pb-1 z-50 md:pt-4 lg:pt-10 bg-navy-500">
      <div className="flex w-full inline-flex justify-between items-center md:justify-center">
        <Link href="/" passHref>
          <Image
            src="/logo-rivercity-creatives-horizontal-green-white.svg"
            alt="Rivercity Creatives Logo"
            width={200} // This is still required for Next.js Image optimization
            height={100}
            className="cursor-pointer w-[150px] lg:w-[200px] h-auto"
          />
        </Link>
        <AnimatedLottie
          animationData={footerAnimation}
          className="-mr-4 md:hidden w-[152px] h-[142px]"
          style={{
            maxWidth: "100%",
            height: "auto"
          }}
        />
      </div>
      <div className="flex flex-col gap-[46px] md:flex-row md:justify-between md:pb-10 md:pt-0 lg:items-center lg:justify-center">
        <AnimatedLottie
          animationData={footerAnimation}
          className="hidden md:block w-[152px] h-[142px] lg:w-[200px] lg:h-[186px]"
          style={{
            maxWidth: "100%",
            height: "auto"
          }}
        />
        <div className='flex flex-col md:flex-row lg:flex-col md:grow justify-center gap-[24px] lg:gap-10 md:justify-around lg:justify-center lg:flex-row lg:grow-0'>
          <div className="flex flex-col justify-center gap-[15px] md:justify-start lg:flex-row lg:self-start lg:items-center lg:gap-[30px]">
            <p className="text-left font-bold my-1">
              Contact Us
            </p>
            <div className="flex flex-col justify-center gap-[10px] md:gap-6 md:justify-start lg:flex-row">
              <div className="flex items-center gap-3 lg:gap-2">
                <Image
                  src="/email.svg"
                  alt="Email Icon"
                  width={20}
                  height={20}
                  className="w-[20px] h-[20px] lg:w-[26px] lg:h-[26px]"
                  style={{
                    maxWidth: "100%",
                    height: "auto"
                  }} />
                <a href={`mailto:${BUSINESS_EMAIL}`} className="font-roboto text-[12px] lg:text-[14px] text-white">
                  {BUSINESS_EMAIL}
                </a>
              </div>
              <div className="flex items-center gap-3 lg:gap-2">
                <Image
                  src="/phone.svg"
                  alt="Phone Icon"
                  width={20}
                  height={20}
                  className="w-[20px] h-[20px] lg:w-[26px] lg:h-[26px]"
                  style={{
                    maxWidth: "100%",
                    height: "auto"
                  }} />
                <p className="font-roboto text-[12px] lg:text-[14px]">
                  (210) 730-6232
                </p>
              </div>
              <div className="flex items-center gap-3 lg:gap-2">
                <Image
                  src="/location.svg"
                  alt="Location Icon"
                  width={20}
                  height={20}
                  className="w-[20px] h-[20px] lg:w-[26px] lg:h-[26px]"
                  style={{
                    maxWidth: "100%",
                    height: "auto"
                  }} />
                <p className="font-roboto text-[12px] lg:text-[14px]">
                  San Antonio, Texas
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-[15px] lg:gap-[40px] md:justify-start lg:flex-row lg:self-start lg:items-center">
            <p className="text-left font-bold my-1">
              Follow Us
            </p>
            <div className="flex items-center self-stretch gap-[32px] md:hidden lg:flex">
              <Image
                src="/facebook.svg"
                alt="Facebook Icon"
                width={30}
                height={30}
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} />
              <Image
                src="/twitter.svg"
                alt="Twitter Icon"
                width={30}
                height={30}
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} />
              <Image
                src="/instagram.svg"
                alt="Instagram Icon"
                width={30}
                height={30}
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} />
              <Image
                src="/messenger.svg"
                alt="Messenger Icon"
                width={30}
                height={30}
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} />
              <Image
                src="/figma.svg"
                alt="Figma Icon"
                width={30}
                height={30}
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} />
            </div>
            <div className="hidden md:flex lg:hidden md:items-center md:self-stretch md:gap-[32px] md:flex-col md:justify-start">
              <div className='flex gap-8 justify-start'>
                <Image
                  src="/facebook.svg"
                  alt="Facebook Icon"
                  width={30}
                  height={30}
                  style={{
                    maxWidth: "100%",
                    height: "auto"
                  }} />
                <Image
                  src="/twitter.svg"
                  alt="Twitter Icon"
                  width={30}
                  height={30}
                  style={{
                    maxWidth: "100%",
                    height: "auto"
                  }} />
                <Image
                  src="/instagram.svg"
                  alt="Instagram Icon"
                  width={30}
                  height={30}
                  style={{
                    maxWidth: "100%",
                    height: "auto"
                  }} />
              </div>
              <div className='flex gap-8 justify-start'>
                <Image
                  src="/messenger.svg"
                  alt="Messenger Icon"
                  width={30}
                  height={30}
                  style={{
                    maxWidth: "100%",
                    height: "auto"
                  }} />
                <Image
                  src="/figma.svg"
                  alt="Figma Icon"
                  width={30}
                  height={30}
                  style={{
                    maxWidth: "100%",
                    height: "auto"
                  }} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:hidden">
          <div className="font-roboto text-[12px] flex flex-col gap-[10px] self-stretch">
            <Link href="/privacy" className="block text-white">
              Cookie & Privacy Policy
            </Link>
            <Link href="/terms" className="block text-white">
              Terms & Conditions
            </Link>
            {/* <Link href="/sales-and-refunds" className="block text-white">
              Sales and Refunds
            </Link>
            <Link href="/legal" className="block text-white">
              Legal
            </Link> */}
            <Link href="/sitemap.xml" className="block text-white">
              Site Map
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <p className="font-roboto text-[11px] font-light text-white">
              © 2024 All Rights Reserved
            </p>
          </div>
        </div>
      </div>
      <div className="hidden md:block md:flex md:flex-col md:gap-4">
        <div className="flex gap-[10px] self-center justify-between w-[535px] font-roboto text-[12px]">
          <Link href="/privacy" className="block text-white">
            Cookie & Privacy Policy
          </Link>
          <Link href="/terms" className="block text-white">
            Terms & Conditions
          </Link>
          {/* <Link href="/sales-and-refunds" className="block text-white">
            Sales and Refunds
          </Link>
          <Link href="/legal" className="block text-white">
            Legal
          </Link> */}
          <Link href="/sitemap.xml" className="block text-white">
            Site Map
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <p className="font-roboto text-[11px] font-light text-white">
            © 2024 All Rights Reserved
          </p>
        </div>
      </div>
      <ScrollToTopButton />
    </div>)
  );
}