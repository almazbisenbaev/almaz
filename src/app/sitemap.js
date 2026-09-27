export default function sitemap() {
  const baseUrl = 'https://helloalmaz.com';

  const internalPosts = [
    '/posts/vuejs-evolution',
  ];

  const posts = internalPosts.map((link) => ({
    url: `${baseUrl}${link}`,
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
      url: `${baseUrl}/razrabotka-saitov-kazakhstan`,
      // Update when the landing page changes, not on every unrelated build.
      lastModified: '2026-09-27',
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/wordpress-developer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
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
