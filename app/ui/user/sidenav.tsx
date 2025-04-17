import Link from "next/link";
import AdminNavLinks from "./admin-nav-links";
import Image from "next/image";
import { SignOutButton } from "./signout-button";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex items-end justify-start rounded-md bg-gray-50 p-4"
        href="/"
      >
        <div className="w-32 md:w-40">
          <Image
            src="/rcc-logo-horizontal-blue-gradient.png"
            alt="Logo"
            width={160}
            height={40}
            className="w-40"
            />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <AdminNavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <SignOutButton />
      </div>
    </div>
  );
}