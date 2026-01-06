"use client";
import React from "react";
import { AnimatedTooltip } from "@/app/ui/animations/animated-tooltip";
const people = [
  {
    id: 1,
    name: "Isaac Longoria",
    designation: "Software Engineer",
    image:
      "/isaac-headshot-avatar.webp",
  },
  {
    id: 2,
    name: "Barbara Longoria",
    designation: "UX Designer",
    image:
      "/barbara-profile-image.webp",
  },
  {
    id: 3,
    name: "Caitlyn Longoria",
    designation: "Branding Assistant",
    image:
      "/caitlyn-profile-image.webp",
  },
  {
    id: 4,
    name: "Derek Prado",
    designation: "Assistant Software Engineer",
    image:
      "/Image 4.jpg",
  },
  // {
  //   id: 5,
  //   name: "Tyler Durden",
  //   designation: "Soap Developer",
  //   image:
  //     "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  // },
  // {
  //   id: 6,
  //   name: "Dora",
  //   designation: "The Explorer",
  //   image:
  //     "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  // },
];

export function AnimatedTooltipLocation() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 pt-6 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
