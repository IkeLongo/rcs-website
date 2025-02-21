import Image from "next/image";
import { SubTeamMemberProps } from '@/types/components';``

export default function Sub({ imageRoute, imageDescription, top = '50%', right = '50%', onClick }: SubTeamMemberProps) {
  return (
    (<div 
      className='relative flex w-full bg-team-blend rounded-[16px] cursor-pointer overflow-hidden transition-all'
      onClick={onClick}
    >
      {/* Mask and Image Container */}
      <div className="absolute inset-0 mix-blend-luminosity rounded-[16px] transition-all overflow-hidden">
        <Image
          src={imageRoute}
          alt={imageDescription}
          // Dynamic positioning
          objectPosition={`${right} ${top}`}
          className="transition-all"
          fill
          sizes="100vw"
          style={{
            objectFit: "cover"
          }} />
      </div>
    </div>)
  );
}