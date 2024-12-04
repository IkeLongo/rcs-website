import Image from "next/image";

export default function Footer() {

  return (
    <div className="relative w-full h-auto shrink-0 px-5 bg-footer-bg-gradient">
      <div className="w-full inline-flex justify-between">
        <Image
          src="/SiteLogo-mobile.svg"
          alt="Mobile Site Logo"
          width={116}
          height={26}
        />
        <Image
          src="/footer-app-dev.gif"
          alt="Mobile Application Developer"
          width={152}
          height={142}
        />
      </div>
      <div className="flex flex-col gap-[46px]">
        <div className="flex flex-col justify-center gap-[15px]">
          <h4 className="font-roboto text-[12px] font-bold">
            Contact Us
          </h4>
          <div className="flex flex-col justify-center gap-[10px]">
            <div className="flex items-center gap-3">
              <Image
                src="/email.svg"
                alt="Email Icon"
                width={20}
                height={20}
              />
              <p className="font-roboto text-[12px]">
                support@rivercitydesignco.com
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/phone.svg"
                alt="Phone Icon"
                width={20}
                height={20}
              />
              <p className="font-roboto text-[12px]">
                (210) 555-5555
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/location.svg"
                alt="Location Icon"
                width={20}
                height={20}
              />
              <p className="font-roboto text-[12px]">
                San Antonio, Texas
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-[15px]">
          <h4 className="font-roboto text-[12px] font-bold">
            Follow Us
          </h4>
          <div className="flex items-center self-stretch gap-[32px]">
            <Image
              src="/facebook.svg"
              alt="Facebook Icon"
              width={30}
              height={30}
            />
            <Image
              src="/twitter.svg"
              alt="Twitter Icon"
              width={30}
              height={30}
            />
            <Image
              src="/instagram.svg"
              alt="Instagram Icon"
              width={30}
              height={30}
            />
            <Image
              src="/messenger.svg"
              alt="Messenger Icon"
              width={30}
              height={30}
            />
            <Image
              src="/figma.svg"
              alt="Figma Icon"
              width={30}
              height={30}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-[10px] self-stretch">
            <p className="font-roboto text-[12px]">
              Privacy Policy
            </p>
            <p className="font-roboto text-[12px]">
              Terms of Use
            </p>
            <p className="font-roboto text-[12px]">
              Sales and Refunds
            </p>
            <p className="font-roboto text-[12px]">
              Legal
            </p>
            <p className="font-roboto text-[12px]">
              Site Map
            </p>
          </div>
          <div className="flex items-center justify-center">
            <p className="font-roboto text-[11px] font-light">
              © 2024 All Rights Reserved
            </p>
          </div>
        </div>
      </div>
      <button className="absolute bottom-8 right-5">
        <Image
          src="/footer-arrow-up.svg"
          alt="Arrow Up Icon"
          width={30}
          height={30}
        />
      </button>
    </div>
  );
}