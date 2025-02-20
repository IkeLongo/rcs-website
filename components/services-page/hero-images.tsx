import Image from "next/image";

export default function HeroImages() {
  return (
    <>
      {/* Bouncing Planets and Stars */}
      <div className="absolute -right-4 -top-28 w-[311px] h-[491px] flex justify-end transform rotate--4.961 overflow-x-hidden md:-top-20 lg:w-[400px] lg:-top-32 lg:right-12 lg:rotate-[-10deg]">
        <Image
          src="/Bouncing planets and blinking stars in space.gif"
          alt="Bouncing Planets and blinking stars in space"
          layout="fill"
          className="object-contain"
          priority
          loading="eager"
        />
      </div>

      {/* Large Rotating Planet */}
      <div className="absolute right-20 top-28 w-[100px] h-[89px] flex justify-end md:top-60 lg:top-20 lg:right-48">
        <Image
          src="/Large Rotating Plannet.gif"
          alt="Large Rotating Planet"
          layout="fill"
          className="object-contain"
          priority
          loading="eager"
        />
      </div>

      {/* Small Cloud */}
      <div className="absolute right-4 bottom-40 w-[40px] h-[96px] flex justify-end lg:right-10 lg:top-[400px]">
        <Image
          src="/Cloud.gif"
          alt="Small Cloud"
          layout="fill"
          className="object-contain"
          priority
          loading="eager"
        />
      </div>

      {/* Big Cloud */}
      <div className="absolute right-4 bottom-52 w-[141px] h-[141px] flex justify-end md:bottom-52 lg:right-40 lg:bottom-80">
        <Image
          src="/Cloud.gif"
          alt="Big Cloud"
          layout="fill"
          className="object-contain"
          priority
          loading="eager"
        />
      </div>

      {/* Main Clip Art */}
      <div className="absolute right-36 bottom-40 w-[225px] h-[130px] flex justify-end md:bottom-40 lg:w-[250px] lg:h-[190px] lg:right-80 lg:bottom-[288px] overflow-hidden">
        <Image
          src="/Main clip art.svg"
          alt="Creative cloud clipart with web designers"
          layout="fill"
          className="object-contain"
          priority
          loading="eager"
        />
      </div>
    </>
  );
}
