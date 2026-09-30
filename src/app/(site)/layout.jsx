import SiteDocument from "@/components/layout/site-document";
import {
  AUTHOR_NAME,
  AUTHOR_NAME_VARIANTS,
  OPEN_GRAPH_IMAGE,
  SITE_URL,
  TWITTER_HANDLE,
  TWITTER_IMAGE,
} from "@/lib/site";

const DESCRIPTION =
  "Freelance web developer specializing in React, WordPress, and WooCommerce. Building fast, scalable websites for startups and businesses";
const SOCIAL_TITLE = `${AUTHOR_NAME} | Full-Stack Web Developer`;

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: {
    // The name variants are in the browser title because they are the queries
    // people actually search for; the shorter form is used for social cards.
    default: `${SOCIAL_TITLE} (${AUTHOR_NAME_VARIANTS.slice(1).join(' | ')})`,
    template: `%s | ${AUTHOR_NAME}`,
  },
  description: DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  keywords: [
    ...AUTHOR_NAME_VARIANTS,
    'Full-Stack Developer',
    'Web Developer',
    'WordPress Developer',
    'React Developer',
    'Node.js Developer',
    'Webflow Developer',
    'Framer Developer',
    'Supabase Developer',
    'Web Development',
    'UX Design',
  ],
  authors: AUTHOR_NAME_VARIANTS.map((name) => ({ name })),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: SOCIAL_TITLE,
    description: DESCRIPTION,
    siteName: AUTHOR_NAME,
    alternateLocale: ['kk_KZ'],
    images: [{ ...OPEN_GRAPH_IMAGE, alt: `${AUTHOR_NAME} - Full-Stack Web Developer` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SOCIAL_TITLE,
    description: DESCRIPTION,
    creator: TWITTER_HANDLE,
    images: [TWITTER_IMAGE],
  },
};

export default function RootLayout({ children }) {
  return <SiteDocument>{children}</SiteDocument>;
}
