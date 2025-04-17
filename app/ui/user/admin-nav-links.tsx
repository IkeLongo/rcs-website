'use client';

import {
  HomeIcon,
  PencilSquareIcon,
  NewspaperIcon,
  CreditCardIcon,
  UserGroupIcon,
  ServerIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Updated sidebar links
const links = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
  { name: 'Websites', href: '/admin/dashboard/websites', icon: DocumentTextIcon },
  { name: 'Work Requests', href: '/admin/dashboard/requests', icon: PencilSquareIcon },
  { name: 'Invoices & Payments', href: '/admin/dashboard/invoices&payments', icon: CreditCardIcon },
  { name: 'Clients', href: '/admin/dashboard/clients', icon: UserGroupIcon },
  { name: 'Hosting Providers', href: '/admin/dashboard/hostingproviders', icon: ServerIcon },
  { name: 'SEO Tasks', href: '/admin/dashboard/seo', icon: ShieldCheckIcon },
  { name: 'System Logs', href: '/admin/dashboard/systemlogs', icon: NewspaperIcon },
  { name: 'Admin Settings', href: '/admin/dashboard/settings', icon: Cog6ToothIcon },
];

// Function to determine if a link is locked based on subscription level
function isLinkLocked(linkName: string, subscriptionLevel: string): boolean {
  const lockedLinksForBasic = ['SEO Tools', 'Hosting Info']; // Example locked links for "Basic" subscription
  return subscriptionLevel === 'Basic' && lockedLinksForBasic.includes(linkName);
}

export default function AdminNavLinks() {
  const pathname = usePathname();
  const subscriptionLevel = 'Basic'; // Replace this with actual subscription level logic

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;
        const isLocked = isLinkLocked(link.name, subscriptionLevel);

        return (
          <Link
            key={link.name}
            href={isLocked ? '#' : link.href} // Prevent navigation if locked
            className={clsx(
              'group flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'text-neongreen-700': isActive, // Apply neon green to text when active
                'opacity-50': isLocked, // Apply opacity to locked tabs
                'text-black-500': isLocked || (!isActive && !isLocked), // Ensure locked tabs or inactive tabs have black text
              }
            )}
          >
            <LinkIcon
              className={clsx(
                'w-6',
                {
                  'text-neongreen-700': isActive, // Apply neon green to icon when active
                  'group-hover:text-neongreen-700': !isActive && !isLocked, // Apply hover effect when not active or locked
                  'text-black-500': isLocked || (!isActive && !isLocked), // Ensure locked tabs or inactive tabs have black icon
                }
              )}
            />
            <p
              className={clsx(
                'hidden md:block',
                {
                  'text-neongreen-700': isActive, // Apply neon green to text when active
                  'group-hover:text-neongreen-700': !isActive && !isLocked, // Apply hover effect when not active or locked
                  'text-black-500': isLocked || (!isActive && !isLocked), // Ensure locked tabs or inactive tabs have black text
                }
              )}
            >
              {link.name}
              {isLocked && (
                <LockClosedIcon className="inline-block w-4 ml-1 text-gray-500" />
              )}
            </p>
          </Link>
        );
      })}
    </>
  );
}