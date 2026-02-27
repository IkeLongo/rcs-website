// app/ui/team/profiles-client.tsx
"use client";

import dynamic from "next/dynamic";

const Profiles = dynamic(() => import('./profiles'), { ssr: false });

export default function ProfilesClient() {
  return <Profiles />;
}
