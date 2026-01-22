import Image from "next/image";
import AnimatedLottie from "../components/animations/lottie-animation-template";
import cloudAnimation from "@/app/lib/assets/cloud-animation.json";

export default function HeroImages() {
  return (<>
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
