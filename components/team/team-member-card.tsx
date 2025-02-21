import Image from "next/image";
import { TeamMember } from "@/types/components";

interface TeamMemberCardProps {
  member: TeamMember;
  selected: boolean;
  onClick: () => void;
  isSmallScreen?: boolean; // ✅ Add a flag for small screens
}

export default function TeamMemberCard({
  member,
  selected,
  onClick,
  isSmallScreen = false,
}: TeamMemberCardProps) {
  return (
    <div
      className={`relative flex bg-team-blend rounded-[16px] cursor-pointer overflow-hidden transition-all ${
        isSmallScreen
          ? selected
            ? "w-full h-96"
            : "w-1/3 h-64" // ✅ Smaller thumbnails for unselected on small screens
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
        {/* Member Info */}
        <div
          className={`absolute bottom-4 left-4 right-4 h-[66px] flex flex-col justify-center self-end bg-[#27272A] rounded-[16px] p-4 py-6 gap-[5px] transition-all ${
            selected ? "translate-y-0" : "translate-y-[150%]"
          }`}
        >
          <p className="font-maven-pro text-[18.5px] my-0 text-left">
            {member.memberName}
          </p>
          <p className="font-abhaya-libre md:text-[12px] lg:text-[14px] text-left">
            {member.position}
          </p>
        </div>
      </div>
    </div>
  );
}
