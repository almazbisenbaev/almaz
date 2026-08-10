import Link from 'next/link';
import Image from 'next/image';

export default function BlogThumbnail({ title, date, link, isExternal, thumbnail }) {
  const LinkComponent = isExternal ? 'a' : Link;
  const linkProps = isExternal 
    ? { href: link, target: "_blank", rel: "noopener noreferrer" } 
    : { href: link };

  return (
    <LinkComponent {...linkProps} className="blog-thumb">
      
      <div className='blog-thumb-details'>
        <div className="blog-thumb-date">{date}</div>
      </div>

      <div className="blog-thumb-pic">
        <Image
          src={thumbnail}
          alt={title}
          width={440}
          height={247}
          className="rounded-lg object-cover"
        />
      </div>

      <div className='blog-thumb-content'>
        <h2 className="blog-thumb-title">{title}</h2>
      </div>

      {/* {isExternal && (
        <div className="blog-thumb-external-icon-container">
          <div className="blog-thumb-external-icon-wrapper">
            <svg className="blog-thumb-external-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </div>
      )} */}

    </LinkComponent>
  );
}
