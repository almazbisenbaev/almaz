import { absoluteUrl, AUTHOR_NAME, SITE_URL } from '@/lib/site';
import { postPath } from '@/data/posts';

/**
 * BlogPosting structured data for a post hosted on this site.
 *
 * @param {Object} props
 * @param {Object} props.post - An entry from `@/data/posts`.
 */
export default function BlogJsonLd({ post }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: absoluteUrl(post.thumbnail),
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: AUTHOR_NAME, url: SITE_URL },
    publisher: { "@type": "Person", name: AUTHOR_NAME },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(postPath(post)),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
