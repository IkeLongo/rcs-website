import Image from "../components/image";
import Video from 'next-video';
import webVideo from '../../../videos/why-choose-rivercity-creatives.mp4.json';

export default function HomeWhy() {

  return (<>
    {/* Why Section */}
    <div id='why' className="relative w-full h-auto bg-transparent pt-28 lg:pt-48 lg:mb-20 lg:h-fit">
      <div className="absolute w-full h-full">
        <div className="flex h-full w-full max-w-[570px] md:max-w-[1020px] items-center justify-center mx-auto relative">
          <Image
            src="/home-why-green-blob.svg"
            fallbackSrc="/home-why-green-blob.webp"
            alt="Green background blob image."
            width={116}
            height={165}
            className="absolute right-20 top-10 md:top-16 md:w-[210px] md:h-[284px] md:right-20"
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
          <Image
            src="/home-why-blue-blob.svg"
            fallbackSrc="/home-why-blue-blob.webp"
            alt="Blue background image blob"
            width={163}
            height={144}
            className="absolute left-10 bottom-20 lg:bottom-20 md:w-[271px] md:h-[226px]"
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
        </div>
      </div>
      <div className="relative z-10 p-6 pt-0 flex flex-col items-center justify-center h-full">
        <h3>
          Why Choose Us?
        </h3>
          <div className="w-full h-[230px] mt-4 rounded-[20px] drop-shadow-[0_2.2px_2.2px_rgba(0,0,0,0.25)] md:w-auto md:h-[337px] md:aspect-video lg:h-[400px] lg:w-auto">
            <Video src={webVideo.sources[0].src} className="custom-video" />
          </div>
      </div>
    </div>
  </>);
}
