/**
 * Single source of truth for the facts that appear in metadata, structured
 * data, the sitemap and the footer. Anything repeated across those places
 * belongs here, so a rename or a new profile link is a one-line change.
 */

export const SITE_URL = "https://helloalmaz.com";

/** Stable @id for the Person node in site-wide JSON-LD, referenced by page graphs. */
export const PERSON_ID = `${SITE_URL}/#person`;

export const AUTHOR_NAME = "Almaz Bisenbaev";

/** Latin and Cyrillic spellings of the same name, used for search discovery. */
export const AUTHOR_NAME_VARIANTS = [
  "Almaz Bisenbaev",
  "Almaz Bissenbayev",
  "Алмаз Бисенбаев",
  "Алмаз Бисембаев",
];

export const AUTHOR_JOB_TITLE = "Full-Stack Web Developer";

export const TWITTER_HANDLE = "@almazbisenbaev";

export const PROFILES = {
  telegram: "https://t.me/almazbisenbaev",
  threads: "https://www.threads.com/@almazbisenbaev",
  youtube: "https://www.youtube.com/@webdevandstuff",
  twitter: "https://twitter.com/almazbisenbaev",
  linkedin: "https://linkedin.com/in/almazbisenbaev",
  upwork: "https://www.upwork.com/freelancers/~01fc6ec6fb228858ff",
};

export const GOOGLE_ANALYTICS_ID = "G-10DVM02K4H";

/** Shared social-preview images; paths resolve against `metadataBase`. */
export const OPEN_GRAPH_IMAGE = {
  url: "/preview-opengraph.jpg",
  width: 1200,
  height: 630,
};

export const TWITTER_IMAGE = "/preview-twitter.jpg";

/** Absolute URL for a site-relative path, as structured data requires. */
export const absoluteUrl = (path) => `${SITE_URL}${path}`;
