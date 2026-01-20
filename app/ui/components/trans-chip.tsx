"use client";

export default function TransChip({
  label = "Web Design",
  className = "",
  variant = "desktop",
}: {
  label?: string;
  className?: string;
  variant?: "desktop" | "mobile";
}) {
  const isMobile = variant === "mobile";

  return (
    <div className={`relative inline-flex justify-center items-center ${className}`}>
      <div
        className={[
          "relative px-7 py-4 rounded-[25px] flex justify-center items-center overflow-hidden",
          // shared background tint
          "bg-white/15",
          // desktop glass
          !isMobile ? "backdrop-blur-md" : "",
          // shadows
          !isMobile
            ? "[box-shadow:0_6px_5px_0_rgba(0,0,0,0.25),inset_4px_4px_8px_0_rgba(255,255,255,0.18),inset_-2px_-2px_5px_0_rgba(0,0,0,0.25)]"
            : "shadow-sm", // cheap
        ].join(" ")}
      >
        {/* Overlay: keep but lighter on mobile */}
        <div
          className={[
            "absolute inset-0 rounded-[30px] pointer-events-none",
            !isMobile ? "bg-white/10" : "bg-white/5",
          ].join(" ")}
        />

        <div className="relative text-center text-sky-950 text-sm lg:text-md font-semibold font-maven-pro">
          {label}
        </div>
      </div>
    </div>
  );
}
