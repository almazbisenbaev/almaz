import BlogThumbnail from '@/components/blog-thumb/blog-thumb';
import { posts } from '@/data/posts';
import { OPEN_GRAPH_IMAGE, SITE_URL, TWITTER_HANDLE, TWITTER_IMAGE } from '@/lib/site';

const TITLE = 'Blog | Almaz Bissenbayev';
const DESCRIPTION = 'Thoughts on code, design, and tech.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/posts' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${SITE_URL}/posts`,
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'Almaz Bisenbaev',
    images: [{ ...OPEN_GRAPH_IMAGE, alt: 'Almaz Bisenbaev - Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    creator: TWITTER_HANDLE,
    images: [TWITTER_IMAGE],
  },
};

export default function Posts() {
  return (
    <div className="container px-5 py-16">

      <div className="mb-16">
        <h1 className="font-bold text-5xl mb-4 tracking-tight text-neutral-900">Blog</h1>
        <p className="text-lg text-neutral-500 max-w-xl">{DESCRIPTION}</p>
      </div>

      <div className="flex flex-col">
        {posts.map((post) => (
          <BlogThumbnail key={post.slug} post={post} />
        ))}
      </div>

    </div>
  );
}
