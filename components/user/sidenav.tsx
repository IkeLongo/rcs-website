import Link from 'next/link';
import NavLinks from './nav-links';
//import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { logout } from '@/app/actions/auth';
import Image from 'next/image';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex items-end justify-start rounded-md bg-gray-50 p-4"
        href="/"
      >
        <div className="w-32 md:w-40">
          <Image
            src="/rrc-logo-flat-gradient.svg"
            alt="Logo"
            width={160}
            height={40}
            className="w-40"
            />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
          action={async () => {
            'use server';
            await logout();
          }}
        >
          <button className="group flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6 text-black-500 group-hover:text-neongreen-700" />
            <div className="hidden md:block text-black-500 font-avenir text-sm lg:text-base group-hover:text-neongreen-700">
              Sign Out
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}