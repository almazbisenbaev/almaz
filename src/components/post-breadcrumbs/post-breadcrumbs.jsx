import Link from 'next/link';

export default function PostBreadcrumbs({ title }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-xs leading-tight font-medium lowercase tracking-tight text-neutral-400">
      <ol className="flex min-w-0 items-center gap-1 whitespace-nowrap">
        <li className="flex shrink-0 items-center gap-1">
          <Link href="/" className="transition-colors hover:text-neutral-900">
            helloalmaz
          </Link>
          <span aria-hidden="true">/</span>
        </li>
        <li className="flex shrink-0 items-center gap-1">
          <Link href="/posts" className="transition-colors hover:text-neutral-900">
            posts
          </Link>
          <span aria-hidden="true">/</span>
        </li>
        <li aria-current="page" className="min-w-0 truncate" title={title}>
          {title}
        </li>
      </ol>
    </nav>
  );
}
