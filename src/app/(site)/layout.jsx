import SiteDocument from "@/components/layout/site-document";

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
  return <SiteDocument>{children}</SiteDocument>;
}
