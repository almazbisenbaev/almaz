import { GoogleAnalytics } from '@next/third-parties/google';

// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import PageTransition from '@/components/PageTransition';

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "Almaz Bisenbaev - Full-Stack Web Developer",
  description: "Full-Stack Web Developer with UX Designer background",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=switzer@1,2&f[]=clash-display@1&display=swap" rel="stylesheet" />

        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-10DVM02K4H"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());

          gtag('config', 'G-10DVM02K4H');
        </script> */}

      </head>
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`antialiased`}
      >

        <header>
          <div className="container mx-auto p-6">
            <div className="flex gap-3">
              <Link 
                href="/"
                className="font-semibold opacity-60 hover:opacity-100 transition"
              >
                {/* <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z" fill="#000"></path></svg> */}
                Home
              </Link>
              <Link 
                href="/posts/"
                className="font-semibold opacity-60 hover:opacity-100 transition"
              >
                {/* <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z" fill="#000"></path></svg> */}
                Posts
              </Link>
            </div>
          </div>
        </header>

        <PageTransition>
          {children}
        </PageTransition>
      </body>
      <GoogleAnalytics gaId="G-10DVM02K4H" />
    </html>
  );
}
