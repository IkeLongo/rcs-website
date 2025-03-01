import '../../app/styles.css'
import { MainTeamMemberProps } from '@/types/components';

export default function Main( {memberName, position, bgImageClass}: MainTeamMemberProps) {

  return (
    <div className={`flex w-full aspect-square bg-photo-1 bg-top bg-cover rounded-[16px] p-4 transition-all ${bgImageClass} md:max-h-96 md:z-5`}>
      <div className='w-full h-[66px] flex flex-col justify-center self-end bg-[#27272A] rounded-[16px] p-4 py-6 gap-[5px]'>
        <h3 className='text-white font-maven-pro text-[18.5px]'>
          {memberName}
        </h3>
        <p className='text-white font-abhaya-libre text-[10px] md:text-[12px] lg:text-[14px]'>
          {position}
        </p>
      </div>
    </div>
  );
}