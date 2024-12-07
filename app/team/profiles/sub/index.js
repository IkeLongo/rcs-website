import Image from 'next/image';
import { Button, ButtonGroup } from "@nextui-org/button";

export default function Sub({ imageRoute, imageDescription, top, right, onClick }) {
  return (
    <div className='relative flex w-full bg-team-blend rounded-[16px] cursor-pointer overflow-hidden transition-all' onClick={onClick}>
      <div
        className="absolute h-full w-[356px] mix-blend-luminosity rounded-[16px] transition-all"
      >
      <Image
        src={imageRoute}
        alt={imageDescription}
        width={358} // Set the width to 358px
        height={358} // Set the height to 358px
        className="absolute h-full w-[356px] transition-all"
        style={{ top: top, right: right }}
      />
      </div>
    </div>
  );
}