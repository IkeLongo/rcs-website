import Image from "next/image";
import { Button } from "@heroui/react";
import { TeamMember } from "@/types/components";

interface TeamMemberCardProps {
  member: TeamMember;
  selected: boolean;
  onClick: () => void;
  onViewProfile: () => void; // ✅ Modal handler
  isSmallScreen?: boolean; // ✅ Small screen flag
}

export default function TeamMemberCard({
  member,
  selected,
  onClick,
  onViewProfile,
  isSmallScreen = false,
}: TeamMemberCardProps) {
  return (
    <div
      className={`relative flex bg-team-blend rounded-[16px] cursor-pointer overflow-hidden transition-all ${
        isSmallScreen
          ? selected
            ? "w-full h-96"
            : "w-1/3 h-80" // ✅ Smaller thumbnails for unselected on small screens
          : selected
          ? "w-1/2 h-96"
          : "w-[12.5%] h-96"
      }`}
      onClick={onClick}
    >
      {/* Mask and Image Container */}
      <div
        className={`absolute inset-0 rounded-[16px] transition-all overflow-hidden ${
          selected ? "mix-blend-normal" : "mix-blend-luminosity"
        }`}
      >
        <Image
          src={member.imageRoute}
          alt={member.imageDescription}
          className="object-cover"
          fill
          sizes="100vw"
        />
        
        {/* Member Info Footer */}
        <div className="flex">
          <div
            className={`absolute bottom-4 left-4 right-4 flex flex-row justify-between items-center self-end bg-gray-950/25 backdrop-blur-md rounded-[16px] p-4 py-2 transition-all ${
              selected ? "translate-y-0" : "translate-y-[150%]"
            }`}
          >
            {/* Name and Position stacked vertically */}
            <div className="flex flex-col justify-center text-left text-white">
              <p className="font-maven-pro text-md font-semibold my-0 drop-shadow-[2px_2px_4.6px_rgba(0,0,0,0.25)]">
                {member.memberName}
              </p>
              <p className="font-abhaya-libre text-base text-gray-200 text-left drop-shadow-[2px_2px_4.6px_rgba(0,0,0,0.25)]">
                {member.position}
              </p>
            </div>

            {/* View Profile Button next to the name */}
            {selected && (
              <Button
                className="bg-green-500 text-white font-semibold rounded-lg ml-4"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent parent click event
                  onViewProfile();
                }}
              >
                View Profile
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

