"use client";

import { signOut } from "next-auth/react";
import { PowerIcon } from "@heroicons/react/24/outline";

export function SignOutButton() {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" }); // Redirect to /login after sign-out
  };

  return (
    <button
      onClick={handleSignOut}
      className="group flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3"
    >
      <PowerIcon className="w-6 text-black-500 group-hover:text-neongreen-700" />
      <div className="hidden md:block text-black-500 font-avenir text-sm lg:text-base group-hover:text-neongreen-700">
        Sign Out
      </div>
    </button>
  );
}