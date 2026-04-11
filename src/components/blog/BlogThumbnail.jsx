import Link from 'next/link';

export default function BlogThumbnail({ title, date, link, isExternal, thumbnail }) {
  const CardContent = () => (
    <div className="group h-full flex flex-col transition-all duration-300">
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg mb-4 bg-neutral-100">
        <img
          src={thumbnail}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {isExternal && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-white/80 backdrop-blur-sm p-1.5 rounded-full border border-neutral-200">
              <svg className="w-3.5 h-3.5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1">
        <div className="text-neutral-400 text-xs font-medium uppercase tracking-widest mb-2">{date}</div>
        <h3 className="text-lg font-medium text-neutral-900 group-hover:text-neutral-600 transition-colors leading-snug">
          {title}
        </h3>
      </div>
    </div>
  );

  if (isExternal) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full">
        <CardContent />
      </a>
    );
  }

  return (
    <Link href={link} className="block h-full">
      <CardContent />
    </Link>
  );
}
