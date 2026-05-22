export default function BlogJsonLd({ post }) {
  if (!post) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": `https://helloalmaz.com${post.thumbnail}`,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": "Almaz Bissenbayev",
      "url": "https://helloalmaz.com"
    },
    "publisher": {
      "@type": "Person",
      "name": "Almaz Bissenbayev"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://helloalmaz.com${post.link}`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
