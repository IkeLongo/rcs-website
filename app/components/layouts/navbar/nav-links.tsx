'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IconChevronDown } from '@tabler/icons-react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type NavChild = {
  name: string;
  link: string;
};

export type NavItem = {
  name: string;
  /** Required when there are no children */
  link?: string;
  children?: NavChild[];
};

// ─── Navigation data ──────────────────────────────────────────────────────────
// To add a dropdown, add a `children` array to any item and remove `link`.
// Example:
//   {
//     name: 'Services',
//     children: [
//       { name: 'Web Design', link: '/services/web-design' },
//       { name: 'SEO', link: '/services/seo' },
//     ],
//   },

export const navItems: NavItem[] = [
  { name: 'Portfolio', link: '/#portfolio' },
  { name: 'Pricing',   link: '/#pricing'   },
  { 
    name: 'Services',  link: '/services',
    children: [
      { name: 'Web Design & Development', link: '/services/web-design-development' },
      { name: 'Branding & Visual Identity', link: '/services/branding-visual-identity' },
      { name: 'Lead Capture & Growth Systems', link: '/services/lead-capture-growth-systems' },
    ],
  },
  { name: 'Team',      link: '/team'       },
  { name: 'Learn',     link: '/learn'      },
];

// ─── Desktop dropdown ─────────────────────────────────────────────────────────

function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 100);
  };

  return (
    <div className="relative" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
      <div
        aria-expanded={open}
        aria-haspopup="true"
        className="flex h-[48px] items-center gap-1 font-maven-pro font-medium text-navy-500 transition-all md:p-2 md:px-3"
      >
        {item.link ? (
          <Link href={item.link} className="hover:font-bold">{item.name}</Link>
        ) : (
          <span>{item.name}</span>
        )}
        <IconChevronDown
          size={14}
          stroke={2}
          className={clsx('transition-transform duration-200', open && 'rotate-180')}
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
            className="absolute left-0 top-full z-50 min-w-[180px] pt-1"
          >
            <div className="overflow-hidden rounded-[13px] border border-gray-200 bg-alice-blue-200/95 py-1 shadow-lg backdrop-blur-md">
              {item.children!.map((child) => (
                <Link
                  key={child.name}
                  href={child.link}
                  className="block px-4 py-2 font-maven-pro text-sm text-navy-500 transition-colors hover:bg-alice-blue-500 hover:font-semibold"
                >
                  {child.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Desktop nav (used by Navbar) ─────────────────────────────────────────────

export function DesktopNavLinks() {
  const pathname = usePathname();

  return (
    <>
      {navItems.map((item) => {
        if (item.children?.length) {
          return <DesktopDropdown key={item.name} item={item} />;
        }

        return (
          <Link
            key={item.name}
            href={item.link!}
            className="flex h-[48px] grow items-center justify-center gap-2 font-maven-pro hover:font-bold md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <p
              className={clsx(
                pathname === item.link
                  ? 'font-bold text-green-600'
                  : 'font-medium text-navy-500 hover:font-bold',
              )}
            >
              {item.name}
            </p>
          </Link>
        );
      })}
    </>
  );
}

// ─── Mobile accordion item ────────────────────────────────────────────────────

function MobileAccordionItem({ item, onClose, menuOpen }: { item: NavItem; onClose: () => void; menuOpen: boolean }) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!menuOpen) setExpanded(false);
  }, [menuOpen]);

  return (
    <div>
      <div className="flex h-[48px] w-full items-center justify-between font-maven-pro font-medium text-white md:p-2 md:px-3">
        {item.link ? (
          <Link
            href={item.link}
            onClick={() => { setExpanded(false); onClose(); }}
            className="flex-1 hover:font-bold"
          >
            {item.name}
          </Link>
        ) : (
          <span className="flex-1">{item.name}</span>
        )}
        <button
          aria-expanded={expanded}
          aria-label={`Toggle ${item.name} submenu`}
          onClick={() => setExpanded((prev) => !prev)}
          className="flex items-center pl-2"
        >
          <IconChevronDown
            size={16}
            stroke={2}
            className={clsx('transition-transform duration-200', expanded && 'rotate-180')}
          />
        </button>
      </div>

      <div
        className={clsx(
          'grid transition-[grid-template-rows] duration-200 ease-in-out',
          expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="ml-2 flex flex-col border-l border-blue-700 pb-1 pl-4">
            {item.children!.map((child) => (
              <Link
                key={child.name}
                href={child.link}
                onClick={() => { setExpanded(false); onClose(); }}
                className="flex h-[40px] items-center font-maven-pro text-sm text-white/80 transition-colors hover:font-semibold hover:text-white"
              >
                {child.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Mobile nav (used by MobileMenu) ──────────────────────────────────────────

export function MobileNavLinks({ onClick, menuOpen }: { onClick: () => void; menuOpen: boolean }) {
  const pathname = usePathname();

  return (
    <>
      {navItems.map((item) => {
        if (item.children?.length) {
          return <MobileAccordionItem key={item.name} item={item} onClose={onClick} menuOpen={menuOpen} />;
        }

        return (
          <Link
            key={item.name}
            href={item.link!}
            onClick={onClick}
            className="flex h-[48px] grow items-center justify-start gap-2 font-maven-pro hover:font-bold md:flex-none md:p-2 md:px-3"
          >
            <p
              className={clsx(
                pathname === item.link
                  ? 'font-bold text-green-600'
                  : 'font-medium text-white hover:font-bold',
              )}
            >
              {item.name}
            </p>
          </Link>
        );
      })}
    </>
  );
}