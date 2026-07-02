"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'About', isExternal: false },
    { href: '/posts', label: 'Blog', isExternal: false },
    { href: 'https://docs.google.com/document/d/1ykZuyNLrrTx62nWshYpj2i4OUJUxrdfdQd9-yiiNKpM/edit?usp=sharing', label: 'Resume', isExternal: true },
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
      ? '!text-black transition-colors'
      : '!text-zinc-500 hover:!text-black transition-colors';

  return (
    <header className='py-5'>
      <div className="container px-5">
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

              if (item.isExternal) {
                return (
                  <a
                    key={`${item.href}-${item.label}`}
                    href={item.href}
                    className={linkClassName(item.href)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                );
              }

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
