"use client";

import { useRef, useState } from "react";
import { Copy, Check, Search } from "lucide-react";
import type { MemberRecord } from "@/app/api/ghl/[client]/members/route";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function capitalizeName(value: string | undefined | null): string {
  if (!value) return "";
  return value
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function statusPriority(m: MemberRecord): number {
  if (m.isActive)       return 1;
  if (m.isExpiringSoon) return 2;
  if (m.isLowSessions)  return 3;
  if (m.isInactive)     return 4;
  if (m.isExpired)      return 5;
  if (m.isNeedsSetup)   return 6;
  return 7;
}

function fmtDate(iso: string | null): string {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

function rowAccent(m: MemberRecord): string {
  if (m.isNeedsSetup) return "opacity-50";
  if (m.isExpired)    return "bg-red-950/20";
  if (m.isExpiringSoon || m.isLowSessions) return "bg-amber-950/20";
  return "";
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

type BadgeColor = "emerald" | "red" | "amber" | "zinc" | "gray" | "orange";

const BADGE_STYLES: Record<BadgeColor, string> = {
  emerald: "bg-emerald-900/50 text-emerald-300 border-emerald-700/50",
  red:     "bg-red-900/50     text-red-300     border-red-700/50",
  amber:   "bg-amber-900/50   text-amber-300   border-amber-700/50",
  orange:  "bg-orange-900/50  text-orange-300  border-orange-700/50",
  zinc:    "bg-zinc-800       text-zinc-300     border-zinc-700",
  gray:    "bg-zinc-800/50    text-zinc-500     border-zinc-700/50",
};

function Badge({ text, color }: { text: string; color: BadgeColor }) {
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${BADGE_STYLES[color]}`}
    >
      {text}
    </span>
  );
}

function StatusBadge({ m }: { m: MemberRecord }) {
  const status = m.membershipStatus ?? "—";
  if (m.isNeedsSetup)   return <Badge text={status} color="gray" />;
  if (m.isExpired)      return <Badge text={status} color="red" />;
  if (m.isExpiringSoon) return <Badge text={status} color="amber" />;
  if (m.isActive)       return <Badge text={status} color="emerald" />;
  if (m.isInactive)     return <Badge text={status} color="zinc" />;
  return <Badge text={status} color="zinc" />;
}

function SessionsCell({ m }: { m: MemberRecord }) {
  if (m.isNeedsSetup)           return <span className="text-zinc-600">—</span>;
  if (m.hasNoSessionsRemaining) return <span className="text-red-400 font-semibold">{m.sessionsRemaining}</span>;
  if (m.isLowSessions)          return <span className="text-orange-400 font-semibold">{m.sessionsRemaining}</span>;
  return <span className="text-white">{m.sessionsRemaining}</span>;
}

// ---------------------------------------------------------------------------
// Copy button
// ---------------------------------------------------------------------------

function CopyButton({ value, copyKey }: { value: string; copyKey: string }) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  function handleCopy(e: React.MouseEvent) {
    e.stopPropagation();
    navigator.clipboard.writeText(value).then(() => {
      setCopiedKey(copyKey);
      setTimeout(() => setCopiedKey(null), 1500);
    });
  }

  const copied = copiedKey === copyKey;

  return (
    <button
      type="button"
      aria-label="Copy"
      onMouseDown={(e) => e.stopPropagation()}
      onClick={handleCopy}
      className="ml-1.5 inline-flex items-center opacity-30 hover:opacity-80 transition-opacity"
    >
      {copied
        ? <Check size={13} className="text-emerald-400" />
        : <Copy size={13} className="text-zinc-400" />}
    </button>
  );
}

const COLUMN_HEADERS = [
  "Name", "Status", "Type",
  "Sessions", "Total Used", "End Date", "Last Check-In",
  "Phone", "Email",
];

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export default function MembersTable({ members }: { members: MemberRecord[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  function onMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    if (!scrollRef.current) return;
    setIsDragging(true);
    dragStartX.current = e.pageX - scrollRef.current.offsetLeft;
    dragScrollLeft.current = scrollRef.current.scrollLeft;
  }

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - dragStartX.current;
    scrollRef.current.scrollLeft = dragScrollLeft.current - walk;
  }

  function stopDragging() {
    setIsDragging(false);
  }

  const q = query.trim().toLowerCase();

  const FLAG_FILTERS: Record<string, (m: MemberRecord) => boolean> = {
    all:           () => true,
    active:        (m) => m.isActive,
    inactive:      (m) => m.isInactive,
    expired:       (m) => m.isExpired,
    expiringSoon:  (m) => m.isExpiringSoon,
    lowSessions:   (m) => m.isLowSessions,
    noSessions:    (m) => m.hasNoSessionsRemaining,
    needsSetup:    (m) => m.isNeedsSetup,
  };

  const filtered = members
    .filter(FLAG_FILTERS[activeFilter] ?? (() => true))
    .filter((m) => {
      if (!q) return true;
      const firstName = capitalizeName(m.firstName);
      const lastName = capitalizeName(m.lastName);
      const displayName = [firstName, lastName].filter(Boolean).join(" ") || m.name;
      return (
        displayName.toLowerCase().includes(q) ||
        (m.phone ?? "").toLowerCase().includes(q) ||
        (m.email ?? "").toLowerCase().includes(q) ||
        (m.membershipType ?? "").toLowerCase().includes(q) ||
        (m.membershipStatus ?? "").toLowerCase().includes(q)
      );
    });

  const sorted = [...filtered].sort((a, b) => statusPriority(a) - statusPriority(b));

  return (
    <div className="space-y-3">
      {/* Search input */}
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search members..."
          className="w-full rounded-lg bg-zinc-900 border border-zinc-700 pl-9 pr-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
        />
        {q && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
            {sorted.length} result{sorted.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Filter buttons */}
      {(() => {
        const filters: { key: string; label: string; color: string }[] = [
          { key: "all",          label: "All",           color: "zinc" },
          { key: "active",       label: "Active",        color: "emerald" },
          { key: "inactive",     label: "Inactive",      color: "zinc" },
          { key: "expired",      label: "Expired",       color: "red" },
          { key: "expiringSoon", label: "Expiring Soon", color: "amber" },
          { key: "lowSessions",  label: "Low Sessions",  color: "orange" },
          { key: "noSessions",   label: "No Sessions",   color: "red" },
          { key: "needsSetup",   label: "Needs Setup",   color: "violet" },
        ];
        const ACTIVE_STYLES: Record<string, string> = {
          zinc:    "bg-zinc-700 text-white border-zinc-500",
          emerald: "bg-emerald-900/70 text-emerald-300 border-emerald-600",
          red:     "bg-red-900/70 text-red-300 border-red-600",
          amber:   "bg-amber-900/70 text-amber-300 border-amber-600",
          orange:  "bg-orange-900/70 text-orange-300 border-orange-600",
          violet:  "bg-violet-900/70 text-violet-300 border-violet-600",
        };
        return (
          <div className="flex flex-wrap gap-1.5">
            {filters.map(({ key, label, color }) => {
              const isSelected = activeFilter === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveFilter(key)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors whitespace-nowrap ${
                    isSelected
                      ? ACTIVE_STYLES[color]
                      : "bg-transparent text-zinc-500 border-zinc-700 hover:border-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        );
      })()}

      {/* Scrollable table */}
      <div
        ref={scrollRef}
        className={`custom-scrollbar rounded-xl border border-zinc-800 max-h-[520px] overflow-y-auto overflow-x-auto select-none shadow-lg ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
    >
      <table className="w-full text-sm min-w-[900px]">
        <thead className="sticky top-0 z-10">
          <tr className="border-b border-zinc-800 bg-zinc-900">
            {COLUMN_HEADERS.map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-zinc-500 whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((m, i) => {
            const firstName = capitalizeName(m.firstName);
            const lastName = capitalizeName(m.lastName);
            const displayName =
              [firstName, lastName].filter(Boolean).join(" ") || m.name;

            return (
              <tr
                key={m.id}
                className={`border-b border-zinc-800/60 transition-colors hover:bg-zinc-800/40 ${rowAccent(m)} ${i % 2 === 0 ? "bg-zinc-900/30" : "bg-zinc-900/10"}`}
              >
                <td className="px-4 py-3 font-medium text-white whitespace-nowrap">
                  <span className="inline-flex items-center gap-0">
                    {displayName}
                    {displayName && <CopyButton value={displayName} copyKey={`${m.id}-name`} />}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap"><StatusBadge m={m} /></td>
                <td className="px-4 py-3 text-zinc-300 whitespace-nowrap">{m.membershipType ?? "—"}</td>
                <td className="px-4 py-3 text-center whitespace-nowrap"><SessionsCell m={m} /></td>
                <td className="px-4 py-3 text-center text-zinc-400 whitespace-nowrap">
                  {m.isNeedsSetup ? <span className="text-zinc-600">—</span> : m.totalSessionsUsed}
                </td>
                <td className="px-4 py-3 text-zinc-400 whitespace-nowrap">
                  {m.isExpiringSoon
                    ? <span className="text-amber-400">{fmtDate(m.membershipEndDate)}</span>
                    : m.isExpired
                      ? <span className="text-red-400">{fmtDate(m.membershipEndDate)}</span>
                      : fmtDate(m.membershipEndDate)}
                </td>
                <td className="px-4 py-3 text-zinc-400 whitespace-nowrap">{fmtDate(m.lastCheckInDate)}</td>
                <td className="px-4 py-3 text-zinc-400 whitespace-nowrap">
                  <span className="inline-flex items-center gap-0">
                    {m.phone ?? "—"}
                    {m.phone && <CopyButton value={m.phone} copyKey={`${m.id}-phone`} />}
                  </span>
                </td>
                <td className="px-4 py-3 text-zinc-400 whitespace-nowrap">
                  <span className="inline-flex items-center gap-0">
                    {m.email ?? "—"}
                    {m.email && <CopyButton value={m.email} copyKey={`${m.id}-email`} />}
                  </span>
                </td>
              </tr>
            );
          })}
          {sorted.length === 0 && (
            <tr>
              <td colSpan={9} className="px-4 py-10 text-center text-zinc-600 text-sm">
                No members found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
}
