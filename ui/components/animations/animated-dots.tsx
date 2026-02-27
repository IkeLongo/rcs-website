import React from "react";

type AnimatedDotsTextProps = {
  text: string;
  className?: string;
  dotClassName?: string;
};

export function AnimatedDotsText({
  text,
  className = "",
  dotClassName = "",
}: AnimatedDotsTextProps) {
  return (
    <span className={`flex items-center ${className}`}>
      {text}
      <span className="ml-1 flex">
        <span className={`animate-bounce ${dotClassName}`} style={{ animationDelay: "0ms" }}>.</span>
        <span className={`animate-bounce ${dotClassName}`} style={{ animationDelay: "150ms" }}>.</span>
        <span className={`animate-bounce ${dotClassName}`} style={{ animationDelay: "300ms" }}>.</span>
      </span>
    </span>
  );
}