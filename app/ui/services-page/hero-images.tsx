import Image from "next/image";
import AnimatedLottie from "../components/animations";
import bouncingPlanetsandStarsAnimation from "@/app/lib/assets/bouncing-planets-and-stars-animation.json";
import largeRotatingPlanetAnimation from "@/app/lib/assets/large-rotating-planet.json";
import cloudAnimation from "@/app/lib/assets/cloud-animation.json";

export default function HeroImages() {
  return (<>
    {/* Bouncing Planets and Stars */}
    {/* <div className="absolute -right-4 -top-28 w-[311px] h-[491px] flex justify-end transform rotate--4.961 overflow-x-hidden md:-top-20 lg:w-[400px] lg:-top-32 lg:right-12 lg:rotate-[-10deg]">
      <AnimatedLottie
        animationData={bouncingPlanetsandStarsAnimation}
        className="object-contain"
      />
    </div> */}
    {/* Large Rotating Planet */}
    {/* <div className="absolute right-20 top-28 w-[100px] h-[89px] flex justify-end md:top-60 lg:top-20 lg:right-48">
      <AnimatedLottie
        animationData={largeRotatingPlanetAnimation}
        className="object-contain h-[142px] w-[152px]"
        style={{
          maxWidth: "100%",
          height: "auto"
        }}
      />
    </div> */}
    {/* Small Cloud */}
    <div className="absolute right-6 bottom-[250px] md:bottom-[100px] lg:bottom-[350px] w-[161px] lg:w-[200px] h-[161px] lg:h-[200px] flex justify-end lg:right-10">
      <AnimatedLottie
        animationData={cloudAnimation}
        className="object-contain"
      />
    </div>
    {/* Big Cloud */}
    <div className="absolute left-0 md:left-[400px] lg:left-[800px] bottom-[300px] md:bottom-40 lg:bottom-[450px] w-[161px] h-[161px] flex justify-end">
      <AnimatedLottie
        animationData={cloudAnimation}
        className="object-contain"
      />
    </div>
    {/* Main Clip Art */}
    <div className="absolute right-0 bottom-10 md:bottom-64 lg:bottom-[150px] w-[400px] h-[320px] flex justify-end lg:w-[632px] lg:h-[386px] lg:right-40 overflow-hidden">
      <Image
        src="/cloud-clipart-design-team.webp"
        alt="Creative cloud clipart with web designers"
        className="object-contain"
        priority
        loading="eager"
        fill
        sizes="100vw" />
    </div>
  </>);
}
