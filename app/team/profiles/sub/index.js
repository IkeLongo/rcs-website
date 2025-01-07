import Image from 'next/image';

export default function Sub({ imageRoute, imageDescription, top = '50%', right = '50%', onClick }) {
  return (
    <div 
      className='relative flex w-full bg-team-blend rounded-[16px] cursor-pointer overflow-hidden transition-all'
      onClick={onClick}
    >
      {/* Mask and Image Container */}
      <div className="absolute inset-0 mix-blend-luminosity rounded-[16px] transition-all overflow-hidden">
        <Image
          src={imageRoute}
          alt={imageDescription}
          layout="fill" // Fill the parent container completely
          objectFit="cover" // Ensures image maintains aspect ratio and fills the parent
          objectPosition={`${right} ${top}`} // Dynamic positioning
          className="transition-all"
        />
      </div>
    </div>
  );
}