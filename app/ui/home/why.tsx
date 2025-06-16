import Image from "../components/image";
import MuxPlayer from '@mux/mux-player-react/lazy';
//import Video from 'next-video';
//import webVideo from '../../../videos/why-choose-rivercity-creatives.mp4.json';

export default function HomeWhy() {

  return (<>
    {/* Why Section */}
    <div id='why' className="relative w-full h-auto bg-home-why py-10 lg:pt-10 lg:h-fit">
      <div className="absolute w-full h-full">
        <div className="flex h-full w-full max-w-[570px] md:max-w-[1020px] items-center justify-center mx-auto relative">
          <Image
            src="/home-blue-blob.svg"
            alt="Blue blob background image"
            width={116}
            height={165}
            className="absolute -right-10 top-10 md:top-16 md:w-[210px] md:h-[284px] md:right-20"
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
          <Image
            src="/home-green-blob.svg"
            alt="Green blob background image"
            width={163}
            height={144}
            className="absolute -left-20 bottom-20 lg:bottom-20 md:w-[271px] md:h-[226px]"
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
        </div>
      </div>
      <div className="relative z-10 p-6 pt-0 flex flex-col gap-10 items-center justify-center h-full">
        <h3>
          Why Choose Us?
        </h3>

        <div className="w-full h-[230px] rounded-[20px] drop-shadow-[0_2.2px_2.2px_rgba(0,0,0,0.25)] md:w-auto md:h-[337px] md:aspect-video lg:h-[400px] lg:w-auto items-center justify-center flex">
          <MuxPlayer
            playbackId="LQbVyBeNte01DWPMOACL02MpcwLBwpXageShslp01ttXcc"
            accentColor="#79DD1A"
            thumbnailTime={0}
            style={{ borderRadius: "20px", overflow: "hidden", display: "flex", aspectRatio: 16/9 }}
            metadata={{
              videoTitle: "Why Choose Rivercity Creatives?",
              ViewerUserId: "user-id-007",
            }}
          />
        </div>  
      </div>
    </div>
  </>);
}
