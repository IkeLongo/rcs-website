// app/gym/[client]/admin/members/page.tsx
//
// Route: /gym/[client]/admin/members
// Example: https://rivercitycreatives.com/gym/maximstrong/admin/members

import { headers } from "next/headers";
import type { Metadata } from "next";
import type { MemberRecord } from "@/app/api/ghl/[client]/members/route";
import MembersTable from "./MembersTable";

export const metadata: Metadata = {
  title: "Members Dashboard",
  robots: { index: false, follow: false },
};

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

type MembersResponse =
  | {
      success: true;
      members: MemberRecord[];
      summary: {
        totalContacts: number;
        totalMembers: number;
        activeMembers: number;
        expiredMembers: number;
        inactiveMembers: number;
        expiringSoon: number;
        lowSessions: number;
        noSessionsRemaining: number;
        needsSetup: number;
      };
    }
  | { success: false; reason: string };

async function fetchMembers(
  clientSlug: string,
  host: string,
  key: string
): Promise<MembersResponse> {
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const url = `${protocol}://${host}/api/ghl/${clientSlug}/members?key=${encodeURIComponent(key)}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error(
      `[MembersDashboard] fetch failed [${res.status}]: ${text}`
    );
    return {
      success: false,
      reason: `API responded with status ${res.status}.`,
    };
  }

  const data = await res.json();
  console.log("[MembersDashboard] summary:", data.summary);
  return data as MembersResponse;
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function MembersDashboardPage({
  params,
  searchParams,
}: {
  params: Promise<{ client: string }>;
  searchParams: Promise<{ key?: string }>;
}) {
  const { client: clientSlug } = await params;
  const { key } = await searchParams;
  const host = (await headers()).get("host") ?? "localhost:3000";

  // -- Access key check ------------------------------------------------------
  const expectedKey = process.env.GYM_DASHBOARD_ACCESS_KEY;
  if (!expectedKey || !key || key !== expectedKey) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-red-400 font-semibold text-lg">Access Denied</p>
          <p className="text-zinc-500 text-sm">A valid access key is required.</p>
        </div>
      </div>
    );
  }

  const result = await fetchMembers(clientSlug, host, key);

  // -- Error state -----------------------------------------------------------
  if (!result.success) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-red-400 font-semibold">Failed to load members</p>
          <p className="text-zinc-500 text-sm">{result.reason}</p>
        </div>
      </div>
    );
  }

  const { members, summary } = result;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-1">
            {clientSlug}
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Members Dashboard
          </h1>
        </div>

        {/* Summary cards */}
        <section className="mb-10">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 mb-4">
            Summary
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <SummaryCard label="Total Members"  value={summary.totalMembers}        accent="zinc" />
            <SummaryCard label="Active"         value={summary.activeMembers}        accent="emerald" />
            <SummaryCard label="Expired"        value={summary.expiredMembers}       accent="red" />
            <SummaryCard label="Expiring Soon"  value={summary.expiringSoon}         accent="amber" />
            <SummaryCard label="Low Sessions"   value={summary.lowSessions}          accent="orange" />
            <SummaryCard label="Needs Setup"    value={summary.needsSetup}           accent="violet" />
          </div>
        </section>

        {/* Members table */}
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 mb-4">
            Members
            <span className="ml-2 text-zinc-600 normal-case font-normal">
              ({members.length} records)
            </span>
          </h2>
          <MembersTable members={members} />
        </section>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Summary card component
// ---------------------------------------------------------------------------

type CardAccent = "zinc" | "emerald" | "red" | "amber" | "orange" | "violet";

const ACCENT_STYLES: Record<
  CardAccent,
  { border: string; label: string; value: string; bg: string }
> = {
  zinc:    { bg: "bg-zinc-900",        border: "border-zinc-800",   label: "text-zinc-500",   value: "text-white" },
  emerald: { bg: "bg-emerald-950/40",  border: "border-emerald-800/50", label: "text-emerald-400", value: "text-emerald-300" },
  red:     { bg: "bg-red-950/40",      border: "border-red-800/50",     label: "text-red-400",     value: "text-red-300" },
  amber:   { bg: "bg-amber-950/40",    border: "border-amber-700/50",   label: "text-amber-400",   value: "text-amber-300" },
  orange:  { bg: "bg-orange-950/40",   border: "border-orange-700/50",  label: "text-orange-400",  value: "text-orange-300" },
  violet:  { bg: "bg-violet-950/40",   border: "border-violet-700/50",  label: "text-violet-400",  value: "text-violet-300" },
};

function SummaryCard({
  label,
  value,
  accent = "zinc",
}: {
  label: string;
  value: number;
  accent?: CardAccent;
}) {
  const s = ACCENT_STYLES[accent];
  return (
    <div
      className={`rounded-xl ${s.bg} border ${s.border} px-5 py-4 shadow-sm`}
    >
      <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${s.label}`}>
        {label}
      </p>
      <p className={`text-3xl font-extrabold leading-none ${s.value}`}>
        {value}
      </p>
    </div>
  );
}


