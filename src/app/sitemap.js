import { internalPosts, postPath } from '@/data/posts';
import { SITE_URL } from '@/lib/site';
import { servicePath, lastModified } from './razrabotka-saitov-kazakhstan/routing.mjs';

export default function sitemap() {
  const buildDate = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: buildDate,
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${SITE_URL}${servicePath}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/wordpress-developer`,
      lastModified: buildDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/posts`,
      lastModified: buildDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/silverskin`,
      lastModified: buildDate,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    ...internalPosts.map((post) => ({
      url: `${SITE_URL}${postPath(post)}`,
      lastModified: buildDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
  ];
}
