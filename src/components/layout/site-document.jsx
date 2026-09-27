import { GoogleAnalytics } from '@next/third-parties/google';
import "@/app/globals.css";
import Header from '@/components/layout/header';
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Footer from '@/components/layout/footer';
import SmoothScroll from '@/components/layout/smooth-scroll';

const inter = Inter({subsets:['latin', 'cyrillic'],variable:'--font-sans'});

export default function SiteDocument({ children, lang = "en", showHeader = true }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://helloalmaz.com/#person",
    "name": "Almaz Bisenbaev",
    "alternateName": [
      "Almaz Bissenbayev",
      "Алмаз Бисенбаев",
      "Алмаз Бисембаев"
    ],
    "url": "https://helloalmaz.com",
    "sameAs": [
      "https://twitter.com/almazbisenbaev",
      "https://www.youtube.com/@webdevandstuff",
      "https://www.threads.com/@almazbisenbaev"
    ],
    "jobTitle": "Full-Stack Web Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "description": "Professional Full-Stack Web Developer with expertise in WordPress, React, and modern web development.",
    "knowsAbout": [
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
      "UX Design"
    ]
  };

  return (
    <html lang={lang} className={cn("font-sans", inter.variable)}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body
        className={`antialiased overflow-x-hidden relative min-h-screen`}
      >
        {/* PRELOADER — uncomment to re-enable
        <div className="site-preloader" aria-hidden="true">
          <span className="site-preloader__hello">Hello</span>
        </div>
        */}

        <SmoothScroll />

        {showHeader && <Header locale={lang} />}

        <main>{children}</main>

        <Footer locale={lang} />
      
        <GoogleAnalytics gaId="G-10DVM02K4H" strategy="afterInteractive" />
      </body>
    </html>
  );
}
