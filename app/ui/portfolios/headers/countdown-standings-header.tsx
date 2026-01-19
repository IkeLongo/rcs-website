// app/ui/portfolio/headers/CountdownStandingsHeader.tsx
"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  IconArrowUpRight,
  IconArrowDownRight,
  IconTrophy,
} from "@tabler/icons-react";
import { cn } from "@/app/lib/utils";

type Delta = "up" | "down" | "flat";

type StandingRow = {
  rank: number;
  name: string;
  points: number;
  // optional: small “tick” to imply live update on hover
  pointsTick?: number; // e.g. 6 means 1842 -> 1848
  delta?: Delta;
  highlight?: boolean; // for #1 row
};

type CountdownStandingsHeaderProps = {
  title?: string; // e.g. "Week 17 · Championship"
  footer?: string; // e.g. "1,600 Teams · Live Scoring"
  rows: StandingRow[];
  className?: string;

  /** Optional: show a tiny badge in the corner like “Live” */
  showLiveBadge?: boolean;
};

function formatPoints(n: number) {
  return n.toLocaleString();
}

function DeltaIcon({ delta }: { delta: Delta }) {
  if (delta === "up") return <IconArrowUpRight className="h-3.5 w-3.5" />;
  if (delta === "down") return <IconArrowDownRight className="h-3.5 w-3.5" />;
  return <span className="inline-block h-3.5 w-3.5" />;
}

function AnimatedNumber({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  // Motion value -> spring -> transformed text
  const mv = useMotionValue(value);
  const spring = useSpring(mv, { stiffness: 260, damping: 30, mass: 0.6 });
  const rounded = useTransform(spring, (latest) => Math.round(latest));

  React.useEffect(() => {
    mv.set(value);
  }, [value, mv]);

  const [display, setDisplay] = React.useState(formatPoints(value));

  React.useEffect(() => {
    const unsub = rounded.on("change", (v) => setDisplay(formatPoints(v)));
    return () => unsub();
  }, [rounded]);

  return <span className={className}>{display}</span>;
}

export function CountdownStandingsHeader({
  title = "Week 17 · Championship",
  footer = "1,600 Teams · Live Scoring",
  rows,
  className,
  showLiveBadge = true,
}: CountdownStandingsHeaderProps) {
  // hover state drives “tick” of points
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={cn(
        "relative flex flex-1 w-full h-full min-h-[11rem] overflow-hidden rounded-xl",
        // base background
        "bg-gradient-to-br from-[#071427] via-[#081a33] to-[#050b16]",
        className
      )}
    >
      {/* subtle grid / noise overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(190,255,90,0.18),transparent_45%),radial-gradient(circle_at_85%_65%,rgba(80,170,255,0.18),transparent_45%)]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(circle at 40% 30%, rgba(0,0,0,1), rgba(0,0,0,0) 70%)",
          }}
        />
      </div>

      {/* top label */}
      <div className="absolute left-3 top-3 z-20 flex items-center gap-2">
        <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur">
          {title}
        </span>

        {showLiveBadge && (
          <motion.span
            initial={{ opacity: 0.85 }}
            animate={{
              opacity: hovered ? [0.75, 1, 0.75] : 0.85,
            }}
            transition={{
              duration: 1.6,
              repeat: hovered ? Infinity : 0,
              ease: "easeInOut",
            }}
            className="flex items-center gap-2 rounded-full border border-lime-300/20 bg-lime-300/10 px-2.5 py-1 text-[11px] font-medium text-lime-100"
          >
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-2 w-2 rounded-full bg-lime-300 opacity-75" />
            </span>
            Live
          </motion.span>
        )}
      </div>

      {/* standings container */}
      <motion.div
        initial={false}
        animate={{
          y: hovered ? -1 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="relative z-20 flex w-full flex-col gap-2 px-4 pb-3 pt-12"
      >
        <div className="flex flex-col gap-2">
          {rows.slice(0, 4).map((r, idx) => {
            const delta: Delta = r.delta ?? "flat";
            const tick = r.pointsTick ?? (r.highlight ? 8 : 4);
            const displayPoints = hovered ? r.points + tick : r.points;

            return (
              <motion.div
                key={`${r.rank}-${r.name}-${idx}`}
                className={cn(
                  "group relative flex items-center justify-between rounded-xl border px-3 py-[2px]",
                  "bg-white/[0.06] border-white/10 backdrop-blur-sm",
                  r.highlight && "border-lime-300/30 bg-lime-300/[0.08]"
                )}
                initial={false}
                animate={{
                  boxShadow: r.highlight
                    ? hovered
                      ? "0 0 0 1px rgba(190,255,90,0.18), 0 14px 40px rgba(0,0,0,0.35)"
                      : "0 0 0 1px rgba(190,255,90,0.10), 0 10px 28px rgba(0,0,0,0.25)"
                    : hovered
                    ? "0 0 0 1px rgba(255,255,255,0.10), 0 10px 24px rgba(0,0,0,0.22)"
                    : "0 0 0 1px rgba(255,255,255,0.06), 0 8px 18px rgba(0,0,0,0.18)",
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                {/* left */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "inline-flex h-5 w-6 items-center justify-center rounded-lg border text-[10px] font-semibold",
                        r.highlight
                          ? "border-lime-300/30 bg-lime-300/10 text-lime-100"
                          : "border-white/10 bg-white/5 text-white/85"
                      )}
                    >
                      #{r.rank}
                    </span>

                    {r.highlight && (
                      <motion.span
                        initial={false}
                        animate={{ rotate: hovered ? [0, -4, 0, 4, 0] : 0 }}
                        transition={{
                          duration: 0.6,
                          ease: "easeInOut",
                        }}
                        className="text-lime-100/90"
                        title="Top team"
                      >
                        <IconTrophy className="h-4 w-4" />
                      </motion.span>
                    )}
                  </div>

                  <div className="flex flex-col leading-tight">
                    <span className="text-[12px] font-semibold text-white">
                      {r.name}
                    </span>
                    {/* <span className="text-[11px] text-white/60">
                      Rank movement
                    </span> */}
                  </div>
                </div>

                {/* right */}
                <div className="flex flex-col items-end gap-1">
                  <motion.span
                    initial={false}
                    animate={{
                      opacity: hovered ? 1 : 0.85,
                      scale: hovered ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "rounded-lg border px-2.5 py-[2px] text-[10px] font-semibold tabular-nums",
                      r.highlight
                        ? "border-lime-300/30 bg-lime-300/10 text-lime-100"
                        : "border-white/10 bg-white/5 text-white/85"
                    )}
                  >
                    <AnimatedNumber value={displayPoints} />
                  </motion.span>

                  {/* <motion.span
                    initial={false}
                    animate={{
                      opacity: delta === "flat" ? 0.35 : hovered ? 1 : 0.7,
                      scale: hovered ? 1.06 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "flex items-center gap-1 rounded-lg border px-2 py-[2px] text-[10px] font-medium",
                      delta === "up" && "border-lime-300/25 bg-lime-300/10 text-lime-100",
                      delta === "down" && "border-red-300/25 bg-red-300/10 text-red-100",
                      delta === "flat" && "border-white/10 bg-white/5 text-white/60"
                    )}
                    aria-label={`Rank change: ${delta}`}
                  >
                    <DeltaIcon delta={delta} />
                    {delta === "up" ? "Up" : delta === "down" ? "Down" : "—"}
                  </motion.span> */}
                </div>

                {/* highlight glow */}
                {r.highlight && (
                  <motion.div
                    className="pointer-events-none absolute inset-0 rounded-xl"
                    initial={false}
                    animate={{
                      opacity: hovered ? 0.35 : 0.22,
                    }}
                    transition={{ duration: 0.25 }}
                    style={{
                      boxShadow:
                        "inset 0 0 0 1px rgba(190,255,90,0.22), 0 0 36px rgba(190,255,90,0.16)",
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* footer */}
        <div className="mt-auto flex items-center justify-between pt-1">
          <span className="text-[11px] text-white/65">{footer}</span>

          <motion.span
            initial={false}
            animate={{
              opacity: hovered ? 1 : 0.65,
              x: hovered ? 2 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="text-[11px] font-medium text-white/75"
          >
            View Project →
          </motion.span>
        </div>
      </motion.div>

      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,transparent_0%,rgba(0,0,0,0.22)_55%,rgba(0,0,0,0.55)_100%)]" />
    </motion.div>
  );
}
