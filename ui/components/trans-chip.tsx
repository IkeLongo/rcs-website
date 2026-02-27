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
          // Base tint
          "bg-white/15",

          // Desktop: true glass blur
          !isMobile ? "backdrop-blur-md" : "",

          // Shadows / depth
          !isMobile
            ? "[box-shadow:0_6px_5px_0_rgba(0,0,0,0.25),inset_4px_4px_8px_0_rgba(255,255,255,0.18),inset_-2px_-2px_5px_0_rgba(0,0,0,0.25)]"
            : [
                // Mobile: subtle “fake” shadow (cheap, good-looking)
                "shadow-[0_1px_2px_rgba(0,0,0,0.12),0_4px_10px_rgba(0,0,0,0.08)]",
                // Glass rim highlight
                "ring-1 ring-white/30",
              ].join(" "),
        ].join(" ")}
      >
        {/* Fake glass depth overlay (cheap) */}
        <div
          className={[
            "absolute inset-0 pointer-events-none",
            "bg-gradient-to-b from-white/25 via-white/12 to-white/6",
            isMobile ? "opacity-90" : "opacity-100",
          ].join(" ")}
        />

        {/* Subtle edge highlights to sell the glass */}
        <div className="absolute inset-0 pointer-events-none rounded-[25px]">
          <div className="absolute left-0 right-0 top-0 h-[1px] bg-white/35" />
          <div className="absolute left-0 right-0 bottom-0 h-[1px] bg-black/10" />
        </div>

        {/* Optional: tiny static “noise” (nice on mobile, cheap) */}
        {isMobile && (
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.45) 0 1px, transparent 2px)," +
                "radial-gradient(circle at 70% 60%, rgba(255,255,255,0.35) 0 1px, transparent 2px)",
              backgroundSize: "24px 24px",
            }}
          />
        )}

        {/* Text */}
        <div className="relative text-center text-sky-950 text-sm lg:text-md font-semibold font-maven-pro">
          {label}
        </div>
      </div>
    </div>
  );
}
