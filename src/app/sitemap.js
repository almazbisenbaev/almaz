import { internalPosts, postPath } from '@/data/posts';
import { SITE_URL } from '@/lib/site';

/**
 * `lastModified` is the build date for pages whose content is generated from
 * data in this repository. The Russian landing page is the exception: its copy
 * is hand-written, so its date is pinned and updated deliberately with
 * significant edits rather than refreshed on every unrelated build.
 */
const RUSSIAN_LANDING_LAST_MODIFIED = '2026-09-27';

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
      url: `${SITE_URL}/razrabotka-saitov-kazakhstan`,
      lastModified: RUSSIAN_LANDING_LAST_MODIFIED,
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
    ...internalPosts.map((post) => ({
      url: `${SITE_URL}${postPath(post)}`,
      lastModified: buildDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
  ];
}
