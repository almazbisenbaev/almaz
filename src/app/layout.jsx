import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";
import Header from '@/components/layout/Header';
import PageLoader from '@/components/PageLoader';

export const metadata = {
  title: "Almaz Bisenbaev - Full-Stack Web Developer",
  description: "Full-Stack Web Developer with UX Designer background",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=general-sans@1,2&display=swap" rel="stylesheet" />
        <noscript>
          <style>{`.page-loader { opacity: 1 !important; }`}</style>
        </noscript>
      </head>
      <body
        className={`antialiased`}
      >
        <PageLoader>
          <Header />

          {children}
        
          <GoogleAnalytics gaId="G-10DVM02K4H" />
        </PageLoader>
      </body>
    </html>
  );
}
