import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";
import Header from '@/components/layout/Header';
import PageLoader from '@/components/PageLoader';
import Rays from "@/components/light-rays";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: {
    default: "Almaz Bisenbaev | Full-Stack Web Developer (Almaz Bissenbayev | Алмаз Бисенбаев | Алмаз Бисембаев)",
    template: "%s | Almaz Bisenbaev"
  },
  description: "Almaz Bisenbaev - Full-Stack Web Developer with UX Design expertise. Specializing in WordPress, React, and modern web development.",
  metadataBase: new URL("https://helloalmaz.com"),
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  },
  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_CODE"
  },
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://helloalmaz.com',
    title: "Almaz Bisenbaev | Full-Stack Web Developer",
    description: "Almaz Bisenbaev - Full-Stack Web Developer with UX Design expertise. Specializing in WordPress, React, and modern web development.",
    siteName: 'Almaz Bisenbaev',
    alternateLocale: ['kk_KZ'],
    images: [
      {
        url: '/preview-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Almaz Bisenbaev - Full-Stack Web Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Almaz Bisenbaev | Full-Stack Web Developer",
    description: "Almaz Bisenbaev - Full-Stack Web Developer with UX Design expertise. Specializing in WordPress, React, and modern web development.",
    creator: '@almazbisenbaev',
    images: ['/preview-twitter.jpg'],
  },
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
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=general-sans@1,2&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <noscript>
          <style>{`.page-loader { opacity: 1 !important; }`}</style>
        </noscript>
      </head>
      <body
        className={`antialiased overflow-x-hidden relative min-h-screen`}
      >

        <Rays
          backgroundColor="#F4F4F4"
          style={{ 
            zIndex: -1, 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            height: '100vh', 
            opacity: '0.5',
            pointerEvents: 'none'
          }}
          raysColor={{ mode: "multi", color1: "#2060DF", color2: "#ffffff" }}
        />


        <PageLoader>
          <Header />
          {children}
        
          <GoogleAnalytics gaId="G-10DVM02K4H" />
        </PageLoader>
      </body>
    </html>
  );
}
