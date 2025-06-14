'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Why Choose Us?', href: '/#why' },
  { name: 'Pricing', href: '/#pricing' },
  { name: 'Services', href: '/services' },
  { name: 'Team', href: '/team' },
];

export default function NavLinks({ onClick }: {onClick: () => void}) {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            onClick={onClick} // Attach the onClick function
            className="flex h-[48px] grow font-maven-pro items-center justify-start md:justify-center gap-2 hover:font-bold md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <p
              className={clsx(
                pathname === link.href ? 'text-green-600 font-bold' : 'font-medium hover:font-bold text-white md:text-navy-500'
              )}
            >
              {link.name}
            </p>
          </Link>
        );
      })}
    </>
  );
}