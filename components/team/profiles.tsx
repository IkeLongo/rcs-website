'use client';

import { useState, useEffect } from 'react';
import Main from './main';
import Sub from './sub';
import Image from 'next/image';
import { TeamMember } from '@/types/components';

const people: TeamMember[] = [
  {
    memberName: 'John Doe',
    position: 'CEO',
    imageRoute: '/Image 1.jpg',
    imageDescription: 'Team member 1',
    bgImageClass: 'bg-photo-1',
    top: '0%',
    right: '60%',
  },
  {
    memberName: 'Jane Smith',
    position: 'CTO',
    imageRoute: '/Image 2.jpg',
    imageDescription: 'Team member 2',
    bgImageClass: 'bg-photo-2',
    top: '50%',
    right: '50%',
  },
  {
    memberName: 'Alice Johnson',
    position: 'CFO',
    imageRoute: '/Image 3.jpg',
    imageDescription: 'Team member 3',
    bgImageClass: 'bg-photo-3',
    top: '50%',
    right: '50%',
  },
  {
    memberName: 'Bob Brown',
    position: 'COO',
    imageRoute: '/Image 4.jpg',
    imageDescription: 'Team member 4',
    bgImageClass : 'bg-photo-4',
    top: '50%',
    right: '47%',
  },
  {
    memberName: 'Charlie Davis',
    position: 'CMO',
    imageRoute: '/Image 5.jpg',
    imageDescription: 'Team member 5',
    bgImageClass: 'bg-photo-5',
    top: '50%',
    right: '50%',
  },
];

export default function Profiles() {
  const [mainProps, setMainProps] = useState<TeamMember>(people[0]); // ✅ Type the state
  const [subProps, setSubProps] = useState<TeamMember[]>(people.slice(1)); // ✅ Type the array
  const [isMdOrHigher, setIsMdOrHigher] = useState<boolean>(false); // ✅ Boolean state
  const [clickedIndex, setClickedIndex] = useState<number | null>(null); // ✅ Can be a number or null
  const [selectedTeamMember, setSelectedTeamMember] = useState<number>(1); // ✅ A number

  useEffect(() => {
    const handleResize = () => {
      setIsMdOrHigher(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial value

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubClick = (index: number): void => { // ✅ Add type
    console.log('handleSubClick called with index:', index);
    console.log('isMdOrHigher:', isMdOrHigher);

    if (isMdOrHigher) {
      console.log('Setting clickedIndex to:', index);
      setClickedIndex(index);
    } else {
      const newSubProps = [...subProps];
      const clickedSubProps = newSubProps[index];

      // Swap the properties
      newSubProps[index] = mainProps;

      console.log('Swapping mainProps with clickedSubProps');
      setMainProps(clickedSubProps);
      setSubProps(newSubProps);
    }
  };

  const handleTeamMemberClick = (index: number): void => { // ✅ Add type
    setSelectedTeamMember(index);
    console.log('Selected team member index:', index);
  };

  return (
    <div className='flex flex-col w-full gap-4 h-full max-w-96 self-center md:flex-row md:max-w-[900px] md:gap-2 md:mx-6'>
      <div className="flex flex-col w-full gap-4 h-full max-w-96 self-center md:flex-row md:hidden md:max-w-[800px] md:gap-2 md:mx-6">
        <Main 
          memberName={mainProps.memberName}
          position={mainProps.position}
          bgImageClass={mainProps.bgImageClass}
          className={`transition-all duration-500 ${
            clickedIndex === null
              ? "w-full md:w-1/2"
              : clickedIndex === -1
              ? "w-full md:w-1/2"
              : "w-full md:w-1/4"
          }`}
          onClick={() => handleSubClick(-1)}
        />
        <div className="flex w-full aspect-square max-h-80 gap-1 md:gap-2 md:max-h-96">
          {subProps.map((props, index) => (
            <Sub
              key={index}
              imageRoute={props.imageRoute}
              imageDescription={props.imageDescription}
              top={props.top}
              right={props.right}
              className={`transition-all duration-500 ${
                clickedIndex === null
                  ? "w-full md:w-1/2"
                  : clickedIndex === index
                  ? "w-full md:w-1/2"
                  : "w-full md:w-1/4"
              }`}
              onClick={() => handleSubClick(index)}
            />
          ))}
        </div>
      </div>
      <div className="hidden md:flex md:flex-row md:w-full md:h-full md:self-center md:max-w-[900px] md:gap-2">
        <div className="flex w-full aspect-square max-h-80 gap-1 md:gap-2 md:max-h-96">
          <div 
            className={`relative flex bg-team-blend rounded-[16px] cursor-pointer overflow-hidden transition-all ${selectedTeamMember === 1 ? 'w-1/2' : 'w-[12.5%]'}`}
            onClick={() => handleTeamMemberClick(1)}
          >
            {/* Mask and Image Container */}
            <div className={`absolute inset-0 rounded-[16px] transition-all overflow-hidden ${selectedTeamMember === 1 ? 'mix-blend-normal' : 'mix-blend-luminosity'}`}>
              <Image
                src='/Image 1.jpg'
                alt='Team member 1'
                layout="fill" // Fill the parent container completely
                objectFit="cover" // Ensures image maintains aspect ratio and fills the parent
                className='object-top'
              />
              {selectedTeamMember === 1 ? (
              <div className='absolute bottom-4 left-4 right-4 h-[66px] flex flex-col justify-center self-end bg-[#27272A] rounded-[16px] p-4 py-6 gap-[5px] translate-y-0 transition-all'> 
                <h3 className='text-white font-maven-pro text-[18.5px] my-0'>John Doe</h3>
                <p className='text-white font-abhaya-libre text-[10px] md:text-[12px] lg:text-[14px]'>CEO</p>
              </div>
              ) : (
                <div className='absolute bottom-4 left-4 right-4 h-[66px] flex flex-col justify-center self-end bg-[#27272A] rounded-[16px] p-4 py-6 gap-[5px] translate-y-[150%] transition-all'> 
                  <h3 className='text-white font-maven-pro text-[18.5px] my-0'>John Doe</h3>
                  <p className='text-white font-abhaya-libre text-[10px] md:text-[12px] lg:text-[14px]'>CEO</p>
                </div>
              )}
            </div>
          </div>
          <div 
            className={`relative flex bg-team-blend rounded-[16px] cursor-pointer overflow-hidden transition-all ${selectedTeamMember === 2 ? 'w-1/2' : 'w-[12.5%]'}`}
            onClick={() => handleTeamMemberClick(2)}
          >
            {/* Mask and Image Container */}
            <div className={`absolute inset-0 rounded-[16px] transition-all overflow-hidden ${selectedTeamMember === 2 ? 'mix-blend-normal' : 'mix-blend-luminosity'}`}>
              <Image
                src='/Image 2.jpg'
                alt='Team member 2'
                layout="fill" // Fill the parent container completely
                objectFit="cover" // Ensures image maintains aspect ratio and fills the parent
                className='object-top'
              />
              {selectedTeamMember === 2 ? (
              <div className='absolute bottom-4 left-4 right-4 h-[66px] flex flex-col justify-center self-end bg-[#27272A] rounded-[16px] p-4 py-6 gap-[5px] translate-y-0 transition-all'> 
                <h3 className='text-white font-maven-pro text-[18.5px] my-0'>Jane Smith</h3>
                <p className='text-white font-abhaya-libre text-[10px] md:text-[12px] lg:text-[14px]'>CTO</p>
              </div>
              ) : (
                <div className='absolute bottom-4 left-4 right-4 h-[66px] flex flex-col justify-center self-end bg-[#27272A] rounded-[16px] p-4 py-6 gap-[5px] translate-y-[150%] transition-all'> 
                  <h3 className='text-white font-maven-pro text-[18.5px] my-0'>Jane Smith</h3>
                  <p className='text-white font-abhaya-libre text-[10px] md:text-[12px] lg:text-[14px]'>CTO</p>
                </div>
              )}
            </div>
          </div>
          <div 
            className={`relative flex bg-team-blend rounded-[16px] cursor-pointer overflow-hidden transition-all ${selectedTeamMember === 3 ? 'w-1/2' : 'w-[12.5%]'}`}
            onClick={() => handleTeamMemberClick(3)}
          >
            {/* Mask and Image Container */}
            <div className={`absolute inset-0 rounded-[16px] transition-all overflow-hidden ${selectedTeamMember === 3 ? 'mix-blend-normal' : 'mix-blend-luminosity'}`}>
              <Image
                src='/Image 3.jpg'
                alt='Team member 3'
                layout="fill" // Fill the parent container completely
                objectFit="cover" // Ensures image maintains aspect ratio and fills the parent
                className='object-center'
              />
              {selectedTeamMember === 3 ? (
              <div className='absolute bottom-4 left-4 right-4 h-[66px] flex flex-col justify-center self-end bg-[#27272A] rounded-[16px] p-4 py-6 gap-[5px] translate-y-0 transition-all'> 
                <h3 className='text-white font-maven-pro text-[18.5px] my-0'>Alice Johnson</h3>
                <p className='text-white font-abhaya-libre text-[10px] md:text-[12px] lg:text-[14px]'>CFO</p>
              </div>
              ) : (
                <div className='absolute bottom-4 left-4 right-4 h-[66px] flex flex-col justify-center self-end bg-[#27272A] rounded-[16px] p-4 py-6 gap-[5px] translate-y-[150%] transition-all'> 
                  <h3 className='text-white font-maven-pro text-[18.5px] my-0'>Alice Johnson</h3>
                  <p className='text-white font-abhaya-libre text-[10px] md:text-[12px] lg:text-[14px]'>CFO</p>
                </div>
              )}
            </div>
          </div>
          <div 
            className={`relative flex bg-team-blend rounded-[16px] cursor-pointer overflow-hidden transition-all ${selectedTeamMember === 4 ? 'w-1/2' : 'w-[12.5%]'}`}
            onClick={() => handleTeamMemberClick(4)}
          >
            {/* Mask and Image Container */}
            <div className={`absolute inset-0 rounded-[16px] transition-all overflow-hidden ${selectedTeamMember === 4 ? 'mix-blend-normal' : 'mix-blend-luminosity'}`}>
              <Image
                src='/Image 4.jpg'
                alt='Team member 4'
                layout="fill" // Fill the parent container completely
                objectFit="cover" // Ensures image maintains aspect ratio and fills the parent
                className='object-center'
              />
              {selectedTeamMember === 4 ? (
              <div className='absolute bottom-4 left-4 right-4 h-[66px] flex flex-col justify-center self-end bg-[#27272A] rounded-[16px] p-4 py-6 gap-[5px] translate-y-0 transition-all'> 
                <h3 className='text-white font-maven-pro text-[18.5px] my-0'>Bob Brown</h3>
                <p className='text-white font-abhaya-libre text-[10px] md:text-[12px] lg:text-[14px]'>COO</p>
              </div>
              ) : (
                <div className='absolute bottom-4 left-4 right-4 h-[66px] flex flex-col justify-center self-end bg-[#27272A] rounded-[16px] p-4 py-6 gap-[5px] translate-y-[150%] transition-all'> 
                  <h3 className='text-white font-maven-pro text-[18.5px] my-0'>Bob Brown</h3>
                  <p className='text-white font-abhaya-libre text-[10px] md:text-[12px] lg:text-[14px]'>COO</p>
                </div>
              )}
            </div>
          </div>
          <div 
            className={`relative flex bg-team-blend rounded-[16px] cursor-pointer overflow-hidden transition-all ${selectedTeamMember === 5 ? 'w-1/2' : 'w-[12.5%]'}`}
            onClick={() => handleTeamMemberClick(5)}
          >
            {/* Mask and Image Container */}
            <div className={`absolute inset-0 rounded-[16px] transition-all overflow-hidden ${selectedTeamMember === 5 ? 'mix-blend-normal' : 'mix-blend-luminosity'}`}>
              <Image
                src='/Image 5.jpg'
                alt='Team member 5'
                layout="fill" // Fill the parent container completely
                objectFit="cover" // Ensures image maintains aspect ratio and fills the parent
                className='object-top'
              />
              {selectedTeamMember === 5 ? (
              <div className='absolute bottom-4 left-4 right-4 h-[66px] flex flex-col justify-center self-end bg-[#27272A] rounded-[16px] p-4 py-6 gap-[5px] translate-y-0 transition-all'> 
                <h3 className='text-white font-maven-pro text-[18.5px] my-0'>Charlie Davis</h3>
                <p className='text-white font-abhaya-libre text-[10px] md:text-[12px] lg:text-[14px]'>CMO</p>
              </div>
              ) : (
                <div className='absolute bottom-4 left-4 right-4 h-[66px] flex flex-col justify-center self-end bg-[#27272A] rounded-[16px] p-4 py-6 gap-[5px] translate-y-[150%] transition-all'> 
                  <h3 className='text-white font-maven-pro text-[18.5px] my-0'>Charlie Davis</h3>
                  <p className='text-white font-abhaya-libre text-[10px] md:text-[12px] lg:text-[14px]'>CMO</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}