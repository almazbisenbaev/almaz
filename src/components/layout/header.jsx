"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import ArrowUpRight from '@/components/icons/arrow-up-right';
import { PROFILES } from '@/lib/site';

const NAV_ITEMS = [
  { href: '/', label: 'About' },
  { href: '/posts', label: 'Blog' },
  { href: PROFILES.linkedin, label: 'Hire me', isExternal: true },
];

const navLinkClassName = 'opacity-75 transition-opacity aria-[current=page]:opacity-100 hover:opacity-100 focus-visible:opacity-100';

/** Trailing slashes are equivalent for matching, but "/" must stay itself. */
const normalizePath = (path) => (path === '/' ? '/' : path.replace(/\/+$/, ''));

const Header = ({ showNavigation = true }) => {
  const pathname = usePathname();

  // "/" only matches itself; every other item also matches its sub-pages, so
  // an article keeps "Blog" highlighted.
  const isActive = (href) => {
    if (href.startsWith('http')) return false;

    const current = normalizePath(pathname || '/');
    const target = normalizePath(href);

    if (target === '/') return current === '/';
    return current === target || current.startsWith(`${target}/`);
  };

  return (
    <header className="py-5 text-[#dc143c]">
      <div className="site-container">
        <div className="hdr-row flex items-start flex-col sm:flex-row sm:items-end gap-5 justify-between font-medium text-sm leading-tight">

          <Link href="/" prefetch={pathname === '/' ? false : null} className="flex flex-col gap-1">
            <div>Almaz Bissenbayev</div>
            <div className='opacity-65'>Web Developer</div>
          </Link>

          {showNavigation && <nav aria-label="Main navigation" className="flex flex-wrap gap-4">
            {NAV_ITEMS.map(({ href, label, isExternal }) =>
              isExternal ? (
                <a
                  key={href}
                  href={href}
                  className={`inline-flex items-center gap-1 ${navLinkClassName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {label}
                  <ArrowUpRight className="h-[0.7em]" />
                </a>
              ) : (
                <Link
                  key={href}
                  href={href}
                  prefetch={pathname === href ? false : null}
                  className={navLinkClassName}
                  aria-current={isActive(href) ? 'page' : undefined}
                >
                  {label}
                </Link>
              )
            )}
          </nav>}

        </div>
      </div>
    </header>
  );
};

export default Header;
