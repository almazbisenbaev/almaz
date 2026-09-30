import Link from 'next/link';
import Image from 'next/image';

import { postDate, postPath } from '@/data/posts';

/**
 * One row in the `/posts` listing. Posts published elsewhere open in a new tab
 * through a plain anchor; posts hosted here are client-side navigations.
 *
 * @param {Object} props
 * @param {Object} props.post - An entry from `@/data/posts`.
 */
export default function BlogThumbnail({ post }) {
  const isExternal = Boolean(post.href);
  const Wrapper = isExternal ? 'a' : Link;
  const wrapperProps = isExternal
    ? { href: post.href, target: '_blank', rel: 'noopener noreferrer' }
    : { href: postPath(post) };
  const heading = post.cardTitle ?? post.title;

  return (
    <Wrapper {...wrapperProps} className="blog-thumb">

      <div className="blog-thumb-details">
        <div className="blog-thumb-date">{postDate(post)}</div>
      </div>

      <div className="blog-thumb-pic">
        <Image
          src={post.thumbnail}
          alt={heading}
          width={440}
          height={247}
          className="rounded-lg object-cover"
        />
      </div>

      <div className="blog-thumb-content">
        <h2 className="blog-thumb-title">{heading}</h2>
      </div>

    </Wrapper>
  );
}
