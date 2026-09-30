import { GoogleAnalytics } from '@next/third-parties/google';
import { Inter } from "next/font/google";

import "@/app/globals.css";
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import SmoothScroll from '@/components/layout/smooth-scroll';
import { cn } from "@/lib/utils";
import {
  AUTHOR_JOB_TITLE,
  AUTHOR_NAME,
  AUTHOR_NAME_VARIANTS,
  GOOGLE_ANALYTICS_ID,
  PERSON_ID,
  PROFILES,
  SITE_URL,
} from "@/lib/site";

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-sans' });

// Site-wide Person node. Page-level graphs reference it by `PERSON_ID` rather
// than repeating the author's details.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: AUTHOR_NAME,
  alternateName: AUTHOR_NAME_VARIANTS.filter((variant) => variant !== AUTHOR_NAME),
  url: SITE_URL,
  sameAs: [PROFILES.twitter, PROFILES.youtube, PROFILES.threads],
  jobTitle: AUTHOR_JOB_TITLE,
  worksFor: { "@type": "Organization", name: "Freelance" },
  description:
    "Professional Full-Stack Web Developer with expertise in WordPress, React, and modern web development.",
  knowsAbout: [
    "Web Development",
    "WordPress",
    "React",
    "Next.js",
    "Node.js",
    "JavaScript",
    "Webflow",
    "Framer",
    "Supabase",
    "Figma",
    "UX Design",
  ],
};

/**
 * The <html> document shared by the English and Russian roots: one place for
 * fonts, analytics, structured data and the localized header/footer. Separate
 * roots exist so each language's document language is in the initial HTML and
 * both stay statically rendered.
 *
 * @param {Object} props
 * @param {string} [props.lang="en"] - Document language, e.g. "en" or "ru-KZ".
 * @param {boolean} [props.showHeader=true] - The Russian landing page is a
 *   standalone entry point and deliberately renders without site navigation.
 */
export default function SiteDocument({ children, lang = "en", showHeader = true }) {
  return (
    <html lang={lang} className={cn("font-sans", inter.variable)}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="antialiased overflow-x-hidden relative min-h-screen">
        <SmoothScroll />

        {showHeader && <Header />}

        <main>{children}</main>

        <Footer locale={lang} />

        <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} strategy="afterInteractive" />
      </body>
    </html>
  );
}
