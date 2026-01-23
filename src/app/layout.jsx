import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";
import Header from '@/components/layout/Header';
import PageLoader from '@/components/PageLoader';
import ScrollSkewWrapper from '@/components/ScrollSkewWrapper';
import Head from 'next/head';

export const metadata = {
  title: "Almaz Bisenbaev | Full-Stack Web Developer (Almaz Bissenbayev | Алмаз Бисенбаев | Алмаз Бисембаев)",
  description: "Almaz Bisenbaev - Full-Stack Web Developer with UX Design expertise. Specializing in WordPress, React, and modern web development.",
  keywords: [
    'Almaz Bisenbaev',
    'Almaz Bissenbayev',
    'Алмаз Бисенбаев',
    'Алмаз Бисембаев',
    'Full-Stack Developer',
    'Web Developer',
    'WordPress Developer',
    'React Developer',
    'Node.js Developer',
    'Web Development',
    'UX Design'
  ],
  authors: [
    { name: 'Almaz Bisenbaev' },
    { name: 'Almaz Bissenbayev' },
    { name: 'Алмаз Бисенбаев' },
    { name: 'Алмаз Бисембаев' }
  ],
  // openGraph: {
  //   type: 'website',
  //   locale: 'en_US',
  //   url: 'https://yourwebsite.com',
  //   title: 'Almaz Bisenbaev - Full-Stack Web Developer',
  //   description: 'Professional Full-Stack Web Developer with expertise in modern web technologies',
  //   siteName: 'Almaz Bisenbaev',
  //   alternateLocale: ['kk_KZ'],
  //   images: [
  //     {
  //       url: 'https://yourwebsite.com/images/og-image.jpg',
  //       width: 1200,
  //       height: 630,
  //       alt: 'Almaz Bisenbaev - Full-Stack Web Developer',
  //     },
  //   ],
  // },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'Almaz Bisenbaev - Full-Stack Web Developer',
  //   description: 'Professional Full-Stack Web Developer with expertise in modern web technologies',
  //   creator: '@almazbisenbaev',
  //   images: ['https://yourwebsite.com/images/og-image.jpg'],
  // },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
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
      "Node.js",
      "JavaScript",
      "UX Design"
    ]
  };

  return (
    <html lang="en">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=general-sans@1,2&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href="https://yourwebsite.com" />
        <meta name="author" content="Almaz Bisenbaev" />
        <meta name="robots" content="index, follow" />
        <meta name="revisit-after" content="7 days" />
        <meta name="google-site-verification" content="YOUR_GOOGLE_SEARCH_CONSOLE_CODE" />
        <noscript>
          <style>{`.page-loader { opacity: 1 !important; }`}</style>
        </noscript>
      </head>
      <body
        className={`antialiased overflow-x-hidden`}
      >
        <PageLoader>
          <ScrollSkewWrapper>
            <Header />
            {children}
          </ScrollSkewWrapper>
        
          <GoogleAnalytics gaId="G-10DVM02K4H" />
        </PageLoader>
      </body>
    </html>
  );
}
