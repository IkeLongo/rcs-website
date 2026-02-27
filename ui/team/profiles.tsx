'use client';

import { useState, useEffect } from 'react';
import { Avatar, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, User, Link } from "@heroui/react";
import TeamMemberCard from "./team-member-card";
import { TeamMember } from '@/types/components';
import Image from 'next/image';

const people: TeamMember[] = [
  {
    memberName: "Isaac Longoria",
    position: "Software Engineer",
    imageRoute: "/isaac-profile-image.webp",
    imageAvatar: "/isaac-headshot-avatar.webp",
    imagePosition: "object-top",
    imageDescription: "Profile image of Isaac Longoria",
    bgImageClass: "bg-photo-1",
    description: `Isaac is a visionary leader with a passion to empower business owners by providing them with the opportunity to establish a strong online presence.
      After a rewarding collegiate baseball career, he earned a Bachelor of Science in Computer Information Systems and Security from Our Lady of the Lake University.
      In his free time, he enjoys coaching baseball, serving at his church, spending time with friends, and exploring the great outdoors.`,
    profileLink: "https://www.instagram.com/ike.longo/",
    profileUsername: "ike.longo",
  },
  {
    memberName: "Barbara Longoria",
    position: "UX Designer",
    imageRoute: "/barbara-profile-image.webp",
    imagePosition: "object-top",
    imageDescription: "Profile image of Barbara Longoria",
    bgImageClass: "bg-photo-2",
    description: "Barbara oversees all tech innovations, leading the charge in cutting-edge technology solutions.",
    profileLink: "https://www.linkedin.com/in/janesmith",
    profileUsername: "barbaralongoria",
  },
  {
    memberName: "Caitlyn Longoria",
    position: "Branding Assistant",
    imageRoute: "/caitlyn-profile-image.webp",
    imagePosition: "object-top",
    imageDescription: "Profile image of Caitlyn Longoria",
    bgImageClass: "bg-photo-3",
    description: "Caitlyn manages the company's finances with precision, ensuring fiscal responsibility and growth.",
    profileLink: "https://www.linkedin.com/in/alicejohnson",
    profileUsername: "caitlynlongoria",
  },
  {
    memberName: "Derek Prado",
    position: "Assistant Software Engineer",
    imageRoute: "/derek-profile-image.webp",
    imagePosition: "object-bottom",
    imageDescription: "Profile image of Derek Prado",
    bgImageClass: "bg-photo-4",
    description: "Derek ensures operations run smoothly, focusing on optimizing performance and productivity.",
    profileLink: "https://www.linkedin.com/in/bobbrown",
    profileUsername: "derekprado",
  },
];


export default function Profiles() {
  const [selectedTeamMember, setSelectedTeamMember] = useState<number>(0);
  const [isMdOrHigher, setIsMdOrHigher] = useState<boolean>(false);

  // Modal state management
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [activeProfile, setActiveProfile] = useState<TeamMember | null>(null);

  const handleProfileClick = (index: number) => {
    setSelectedTeamMember(index);

    // Only open modal if the selected member is clicked again (in focus)
    if (selectedTeamMember === index) {
      setActiveProfile(people[index]);
      onOpen();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMdOrHigher(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col w-full gap-4 h-full max-w-96 self-center md:flex-row md:max-w-[900px] md:gap-2">
      {/* Desktop View */}
      <div className="hidden md:flex md:flex-row md:w-full md:h-full md:self-center md:max-w-[900px] md:gap-2 md:mx-16">
        {people.map((member, index) => (
          <TeamMemberCard
            key={index}
            member={member}
            selected={selectedTeamMember === index}
            onClick={() => handleProfileClick(index)}
            onViewProfile={() => {
              setActiveProfile(member);
              onOpen();
            }}
          />
        ))}
      </div>

      {/* Mobile View */}
      <div className="flex flex-col md:hidden gap-4">
        {/* Selected Member on Top */}
        <TeamMemberCard
          member={people[selectedTeamMember]}
          selected={true}
          onClick={() => handleProfileClick(selectedTeamMember)}
          isSmallScreen={true}
          onViewProfile={() => {
            setActiveProfile(people[selectedTeamMember]);
            onOpen();
          }}
        />

        {/* Unselected Members Below */}
        <div className="flex flex-row gap-2">
          {people
            .map((member, index) => ({
              member,
              index,
            }))
            .filter(({ index }) => index !== selectedTeamMember)
            .map(({ member, index }) => (
              <TeamMemberCard
                key={index}
                member={member}
                selected={false}
                onClick={() => setSelectedTeamMember(index)} // ✅ Now setting the correct index
                isSmallScreen={true}
                onViewProfile={() => {
                  setActiveProfile(member);
                  onOpen();
                }}
              />
            ))}
        </div>
      </div>

      {/* Modal for Profile Info */}
      <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" className='bg-navy-800 mx-3 my-0 rounded-[14px]'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-gray-900 font-maven-pro text-md2">
                <User
                  avatarProps={{
                    showFallback: true,
                    isBordered: true,
                    size: "sm",
                    src: activeProfile?.imageAvatar || activeProfile?.imageRoute,
                    name: activeProfile?.memberName || "Profile Image",
                    style: { opacity: 1 },
                    classNames: {
                      base: "w-16 h-16 rounded-full border border-gray-500 border-width-2",
                      img: "opacity-100",
                    }
                  }}
                  description={
                    <Link isExternal href={activeProfile?.profileLink || "#"} size="sm" className='text-blue-200'>
                      <Image
                        src="/instagram-color.svg"
                        alt="Instagram Icon"
                        width={4}
                        height={4}
                        className="w-4 h-4 mr-1"
                      />
                      @{activeProfile?.profileUsername || "username"}
                    </Link>
                  }
                  name={activeProfile?.memberName}
                  classNames={{
                    base: "gap-4 justify-start",
                    name: "text-md text-white text-left",
                  }}
                />
              </ModalHeader>
              <ModalBody className='pb-4'>
                <p className='text-white text-left'>{activeProfile?.description}</p>
              </ModalBody>
              <ModalFooter className='bg-navy-975'>
                <Button className='bg-blue-900 text-white font-bold rounded-lg min-h-8' variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}