import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";
import Header from '@/components/layout/header';
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Footer from '@/components/layout/footer';
import SmoothScroll from '@/components/layout/smooth-scroll';

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: {
    default: "Almaz Bisenbaev | Full-Stack Web Developer (Almaz Bissenbayev | Алмаз Бисенбаев | Алмаз Бисембаев)",
    template: "%s | Almaz Bisenbaev"
  },
  description: "Freelance web developer specializing in React, WordPress, and WooCommerce. Building fast, scalable websites for startups and businesses",
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
    'Webflow Developer',
    'Framer Developer',
    'Supabase Developer',
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
    description: "Freelance web developer specializing in React, WordPress, and WooCommerce. Building fast, scalable websites for startups and businesses",
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
    description: "Freelance web developer specializing in React, WordPress, and WooCommerce. Building fast, scalable websites for startups and businesses",
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
    <html lang="en" className={cn("font-sans", inter.variable)}>
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

        <Header />

        <main>{children}</main>

        <Footer />
      
        <GoogleAnalytics gaId="G-10DVM02K4H" strategy="afterInteractive" />
      </body>
    </html>
  );
}
