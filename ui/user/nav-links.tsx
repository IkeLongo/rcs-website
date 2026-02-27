'use client';

import {
  HomeIcon,
  PencilSquareIcon,
  NewspaperIcon,
  PhotoIcon,
  WrenchIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  CreditCardIcon,
  Cog6ToothIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Updated sidebar links
const links = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Website Editor', href: '/dashboard/editor', icon: PencilSquareIcon },
  { name: 'Blog Manager', href: '/dashboard/blog', icon: NewspaperIcon },
  { name: 'Gallery', href: '/dashboard/gallery', icon: PhotoIcon },
  { name: 'Request Work', href: '/dashboard/request', icon: WrenchIcon },
  { name: 'SEO Tools', href: '/dashboard/seo', icon: ChartBarIcon },
  { name: 'Hosting Info', href: '/dashboard/hosting', icon: ShieldCheckIcon },
  { name: 'Payment Info', href: '/dashboard/payments', icon: CreditCardIcon },
  { name: 'Account Settings', href: '/dashboard/account', icon: Cog6ToothIcon },
];

// Function to determine if a link is locked based on subscription level
function isLinkLocked(linkName: string, subscriptionLevel: string): boolean {
  const lockedLinksForBasic = ['SEO Tools', 'Hosting Info']; // Example locked links for "Basic" subscription
  return subscriptionLevel === 'Basic' && lockedLinksForBasic.includes(linkName);
}

export default function NavLinks() {
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
