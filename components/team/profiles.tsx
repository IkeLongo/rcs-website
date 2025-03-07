'use client';

import { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, User, Link } from "@heroui/react";
import TeamMemberCard from "./team-member-card";
import { TeamMember } from '@/types/components';
import Image from 'next/image';

const people: TeamMember[] = [
  {
    memberName: "Isaac Longoria",
    position: "Chief Energy Officer",
    imageRoute: "/isaac-profile.jpg",
    imageAvatar: "/isaac-avatar.jpg",
    imagePosition: "object-top",
    imageDescription: "Profile of Isaac Longoria",
    bgImageClass: "bg-photo-1",
    description: `Isaac is a visionary leader with a passion to empower business owners by providing them with the opportunity to establish a strong online presence.
      After a rewarding collegiate baseball career, he earned a Bachelor of Science in Computer Information Systems and Security from Our Lady of the Lake University.
      In his free time, he enjoys coaching baseball, serving at his church, spending time with friends, and exploring the great outdoors.`,
    profileLink: "https://www.instagram.com/ike.longo/",
    profileUsername: "ike.longo",
  },
  {
    memberName: "Barbara Longoria",
    position: "Chief Creative Officer",
    imageRoute: "/Image 2.jpg",
    imagePosition: "object-top",
    imageDescription: "Team member 2",
    bgImageClass: "bg-photo-2",
    description: "Jane oversees all tech innovations, leading the charge in cutting-edge technology solutions.",
    profileLink: "https://www.linkedin.com/in/janesmith",
    profileUsername: "janesmith",
  },
  {
    memberName: "Alice Johnson",
    position: "CFO",
    imageRoute: "/Image 3.jpg",
    imagePosition: "object-bottom",
    imageDescription: "Team member 3",
    bgImageClass: "bg-photo-3",
    description: "Alice manages the company's finances with precision, ensuring fiscal responsibility and growth.",
    profileLink: "https://www.linkedin.com/in/alicejohnson",
    profileUsername: "alicejohnson",
  },
  {
    memberName: "Bob Brown",
    position: "COO",
    imageRoute: "/Image 4.jpg",
    imagePosition: "object-bottom",
    imageDescription: "Team member 4",
    bgImageClass: "bg-photo-4",
    description: "Bob ensures operations run smoothly, focusing on optimizing performance and productivity.",
    profileLink: "https://www.linkedin.com/in/bobbrown",
    profileUsername: "bobbrown",
  },
  {
    memberName: "Charlie Davis",
    position: "CMO",
    imageRoute: "/Image 5.jpg",
    imagePosition: "object-top",
    imageDescription: "Team member 5",
    bgImageClass: "bg-photo-5",
    description: "Charlie leads the marketing efforts, crafting strategies that engage and grow the customer base.",
    profileLink: "https://www.linkedin.com/in/charliedavis",
    profileUsername: "charliedavis",
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
    <div className="flex flex-col w-full gap-4 h-full max-w-96 self-center md:flex-row md:max-w-[900px] md:gap-2 md:mx-6">
      {/* Desktop View */}
      <div className="hidden md:flex md:flex-row md:w-full md:h-full md:self-center md:max-w-[900px] md:gap-2">
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" className='bg-gray-950'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-gray-900 font-maven-pro text-md2">
                <User
                  avatarProps={{
                    isBordered: true,
                    size: "lg",
                    src: activeProfile?.imageAvatar || activeProfile?.imageRoute,
                    name: activeProfile?.memberName || "Profile Image",
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
                    name: "text-md text-white",
                  }}
                />
              </ModalHeader>
              <ModalBody className='pb-4'>
                <p className='text-gray-200 text-left'>{activeProfile?.description}</p>
              </ModalBody>
              <ModalFooter className='bg-black-500'>
                <Button className='bg-gray-800 text-white font-bold' variant="light" onPress={onClose}>
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