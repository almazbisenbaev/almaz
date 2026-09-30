/**
 * Blog index, newest first. Feeds the `/posts` listing, the sitemap's internal
 * post URLs, and the structured data on each post page.
 *
 * Shape of an entry:
 *   slug        Stable key; for internal posts it is also the URL segment.
 *   title       Article title, used for metadata and structured data.
 *   cardTitle   Optional longer headline for the listing, when the card and
 *               the article are deliberately worded differently.
 *   description One-line summary for metadata and structured data.
 *   publishedAt ISO date. `postDate()` derives the displayed label from it, so
 *               the machine-readable and human-readable dates cannot drift.
 *   thumbnail   Listing image and structured-data image, from `/public`.
 *   href        Absolute URL for posts published elsewhere; internal posts
 *               omit it and live at `/posts/<slug>`.
 */
export const posts = [
  {
    slug: "ai-takeover-backfired",
    title: "How AI Takeover Backfired on Greedy Companies",
    publishedAt: "2026-08-30",
    thumbnail: "/blog/how-ai-takeover-back.webp",
    href: "https://medium.com/@almazbisenbaev/how-ai-takeover-backfired-on-greedy-companies-4d569c940e05",
  },
  {
    slug: "vuejs-evolution",
    title: "The same button component in 3 major versions of VueJS",
    cardTitle: "I created the same button component in 3 major versions of VueJS",
    description:
      "I created the same button component in 3 major versions of VueJS to see how it changed",
    publishedAt: "2026-06-11",
    thumbnail: "/blog/article-vuejs-cover.jpg",
  },
  {
    slug: "elementor-pagespeed",
    title: "How to make your Elementor website win PageSpeed",
    publishedAt: "2025-06-21",
    thumbnail: "/images/pagespeed-100.jpg",
    href: "https://www.threads.com/@almazbisenbaev/post/DLKwRKuRv0O",
  },
  {
    slug: "modern-css-2025",
    title: "How to Write CSS in 2025 – Modern Features You Should Be Using",
    publishedAt: "2025-06-05",
    thumbnail: "/images/how-to-write-modern-css.jpg",
    href: "https://dev.to/almazbisenbaev/how-to-write-css-in-2025-modern-features-you-should-be-using-with-examples-3g47",
  },
  {
    slug: "freelancer-productivity",
    title: "Mastering Productivity as a Freelancer",
    publishedAt: "2025-04-17",
    thumbnail: "/images/posts/productivity-course.webp",
    href: "https://webdevandstuff.hashnode.dev/mastering-productivity-1",
  },
];

/** Posts hosted on this site, which is what the sitemap should list. */
export const internalPosts = posts.filter((post) => !post.href);

export const findPost = (slug) => posts.find((post) => post.slug === slug);

/** Site-relative path of a post, whether it is hosted here or elsewhere. */
export const postPath = (post) => post.href ?? `/posts/${post.slug}`;

/**
 * Fixed UTC formatter: the label must not shift with the server's locale or
 * time zone, or the same post would render different dates in different builds.
 */
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeZone: "UTC",
});

export const postDate = (post) => dateFormatter.format(new Date(post.publishedAt));
