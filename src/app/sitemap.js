import { postsData } from '@/lib/data';

export default function sitemap() {
  const baseUrl = 'https://helloalmaz.com';

  const posts = postsData
    .filter(post => !post.isExternal)
    .map((post) => ({
      url: `${baseUrl}${post.link}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...posts,
  ]
}
