"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'About' },
    { href: '/posts/', label: 'Posts' },
    { href: '#', label: 'Resume' },
  ];

  const normalizePath = (path) => {
    if (path === '/') return '/';
    return path.replace(/\/+$/, '');
  };

  const isActive = (href) => {
    if (!href || href === '#') return false;

    const current = normalizePath(pathname || '/');
    const target = normalizePath(href);

    if (target === '/') return current === '/';
    return current === target || current.startsWith(`${target}/`);
  };

  const linkClassName = (href) =>
    isActive(href)
      ? '!text-[var(--accent)] transition-colors'
      : '!text-zinc-500 hover:!text-[var(--accent)] transition-colors';

  return (
    <header className='py-5'>
      <div className="container mx-auto px-6">
        <div className="hdr-row flex items-start flex-col sm:flex-row sm:items-end gap-5 justify-between font-medium text-sm leading-tight">

          <div className=''>
              <Link 
                href="/"
                className="flex flex-col gap-1"
              >
                <div>Almaz Bissenbayev</div>
                <div className='opacity-50'> Web Developer</div>
              </Link>           
          </div>

          <nav className="flex gap-4">
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={`${item.href}-${item.label}`}
                  href={item.href}
                  className={linkClassName(item.href)}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

        </div>
      </div>
    </header>
  );
};

export default Header;
