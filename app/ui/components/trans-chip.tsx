import React from "react";

export default function TransChip({
  label = "Web Design",
  className = "",
}: { label?: string; className?: string }) {
  return (
    <div className={`relative inline-flex justify-center items-center ${className}`}>
      <div className="
        relative
        px-7 py-4
        rounded-[25px]
        flex justify-center items-center
        overflow-hidden
        bg-gray-50/10
        backdrop-blur-md
        [box-shadow:0_6px_5px_0_rgba(0,0,0,0.25),inset_4px_4px_8px_0_rgba(255,255,255,0.18),inset_-2px_-2px_5px_0_rgba(0,0,0,0.25)]
      ">
        {/* Glassy overlay */}
        <div className="absolute inset-0 rounded-[30px] bg-gray-50/10 pointer-events-none" />
        {/* Text above the glass */}
        <div className="relative text-center text-sky-950 text-sm lg:text-md font-semibold font-maven-pro drop-shadow-sm">
          {label}
        </div>
      </div>
    </div>
  );
}