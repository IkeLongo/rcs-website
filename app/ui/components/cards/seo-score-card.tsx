"use client";

import { AnimatedCircle } from "@/app/ui/components/animations/animated-circle";

function ringForScore(score: number | null) {
  if (score === null) return "ring-grey-200";
  if (score >= 90) return "ring-emerald-300";
  if (score >= 80) return "ring-amber-300";
  return "ring-red-300";
}

function ringColorHex(score: number | null) {
  if (score === null) return "#e5e7eb"; // grey-200
  if (score >= 90) return "#6ee7b7";    // emerald-300
  if (score >= 80) return "#fde68a";    // amber-300
  return "#fca5a5";                     // red-300
}

function formatScore(score: number | null) {
  return score === null ? "—" : `${score}`;
}

export function SeoScoreCard({ label, value }: { label: string; value: number | null }) {
  return (
    <div
      className={["rounded-3xl border border-gray-200 bg-white shadow-sm p-5 ring-2", ringForScore(value)].join(" ")}
    >
      <p className="text-xs uppercase tracking-wide !text-gray-950 !font-maven-pro !font-bold">
        {label}
      </p>
      <div className="flex items-center justify-center mt-2">
        <AnimatedCircle
          value={value}
          progressColor={ringColorHex(value)}
          formatScore={formatScore}
        />
      </div>
      <p className="mt-2 !text-sm !text-gray-950 text-center">
        {value === null
          ? "Not available"
          : value >= 90
          ? "Strong"
          : value >= 80
          ? "Good"
          : "Needs work"}
      </p>
    </div>
  );
}
