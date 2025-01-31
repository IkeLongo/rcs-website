
import Link from 'next/link';
import Image from 'next/image';
import PreferencesModal from '../Components/CookiePreferences/page';

export default function Footer( {bgGradientClass} ) {

  const scrollToTop = (e) => {
    e.preventDefault();
    const duration = 1000; // Duration in milliseconds
    const start = window.scrollY;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    const scroll = () => {
      const currentTime = 'now' in window.performance ? performance.now() : new Date().getTime();
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, start, -start, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  };

  return (
    <div className={`relative w-full h-auto shrink-0 px-8 pb-1 z-50 md:pt-4 lg:pt-10 ${bgGradientClass}`}>
      <div className="flex w-full inline-flex justify-between items-center md:justify-center">
        <Link href="/" passHref>
          <Image
            src="/SiteLogo-mobile.svg"
            alt="Logo"
            width={116}
            height={26}
            className='cursor-pointer w-[116px] h-[26px] lg:w-[150px] lg:h-[39px]'
          />
        </Link>
        <Image
          src="/footer-app-dev.gif"
          alt="Mobile Application Developer"
          width={152}
          height={142}
          className="-mr-4 md:hidden"
        />
      </div>
      <div className="flex flex-col gap-[46px] md:flex-row md:justify-between md:py-10 lg:items-center lg:justify-center">
        <Image
          src="/footer-app-dev.gif"
          alt="Mobile Application Developer"
          width={152}
          height={142}
          className="hidden md:block w-[152px] h-[142px] lg:w-[200px] lg:h-[186px]"
        />
        <div className='flex flex-col md:flex-row lg:flex-col md:grow justify-center gap-[15px] lg:gap-10 md:justify-around lg:justify-center lg:flex-row lg:grow-0'>
          <div className="flex flex-col justify-center gap-[15px] md:justify-start lg:flex-row lg:self-start lg:items-center lg:gap-[30px]">
            <h4 className="font-roboto text-[12px] lg:text-[14px] font-bold">
              Contact Us
            </h4>
            <div className="flex flex-col justify-center gap-[10px] md:gap-6 md:justify-start lg:flex-row">
              <div className="flex items-center gap-3 lg:gap-2">
                <Image
                  src="/email.svg"
                  alt="Email Icon"
                  width={20}
                  height={20}
                  className="w-[20px] h-[20px] lg:w-[26px] lg:h-[26px]"
                />
                <p className="font-roboto text-[12px] lg:text-[14px]">
                  contact@rivercitycreatives.com
                </p>
              </div>
              <div className="flex items-center gap-3 lg:gap-2">
                <Image
                  src="/phone.svg"
                  alt="Phone Icon"
                  width={20}
                  height={20}
                  className="w-[20px] h-[20px] lg:w-[26px] lg:h-[26px]"
                />
                <p className="font-roboto text-[12px] lg:text-[14px]">
                  (210) 555-5555
                </p>
              </div>
              <div className="flex items-center gap-3 lg:gap-2">
                <Image
                  src="/location.svg"
                  alt="Location Icon"
                  width={20}
                  height={20}
                  className="w-[20px] h-[20px] lg:w-[26px] lg:h-[26px]"
                />
                <p className="font-roboto text-[12px] lg:text-[14px]">
                  San Antonio, Texas
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-[15px] lg:gap-[40px] md:justify-start lg:flex-row lg:self-start lg:items-center">
            <h4 className="font-roboto text-[12px] lg:text-[14px] font-bold">
              Follow Us
            </h4>
            <div className="flex items-center self-stretch gap-[32px] md:hidden lg:flex">
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
            <div className="hidden md:flex lg:hidden md:items-center md:self-stretch md:gap-[32px] md:flex-col md:justify-start">
              <div className='flex gap-8 justify-start'>
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
              </div>
              <div className='flex gap-8 justify-start'>
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
          </div>
        </div>
        <div className="flex flex-col gap-4 md:hidden">
          <div className="font-roboto text-[12px] flex flex-col gap-[10px] self-stretch">
            <Link href="/privacy" className="block text-white">
              Cookie & Privacy Policy
            </Link>
            <Link href="/terms-of-use" className="block text-white">
              Terms of Use
            </Link>
            <Link href="/sales-and-refunds" className="block text-white">
              Sales and Refunds
            </Link>
            <Link href="/legal" className="block text-white">
              Legal
            </Link>
            <Link href="/site-map" className="block text-white">
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
          <Link href="/terms-of-use" className="block text-white">
            Terms of Use
          </Link>
          <Link href="/sales-and-refunds" className="block text-white">
            Sales and Refunds
          </Link>
          <Link href="/legal" className="block text-white">
            Legal
          </Link>
          <Link href="/site-map" className="block text-white">
            Site Map
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <p className="font-roboto text-[11px] font-light text-white">
            © 2024 All Rights Reserved
          </p>
        </div>
      </div>
      <button className="absolute bottom-8 right-5" onClick={scrollToTop}>
        <Image
          src="/footer-arrow-up.svg"
          alt="Arrow Up Icon"
          width={30}
          height={30}
        />
      </button>

      {/* Preferences Modal */}
      <PreferencesModal
        isOpen={preferencesOpen}
        onClose={() => setPreferencesOpen(false)}
        essentialCookies={essentialCookies}
        analyticsCookies={analyticsCookies}
        handleToggleEssentials={handleToggleEssentials}
        handleToggleAnalytics={handleToggleAnalytics}
        handleSavePreferences={handleSavePreferences}
      />
    </div>
  );
}