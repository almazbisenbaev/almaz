import { GoogleAnalytics } from '@next/third-parties/google';

// import { Geist, Geist_Mono } from "next/font/google";
import { Funnel_Display, Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

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
        {/* <link href="https://api.fontshare.com/v2/css?f[]=switzer@1,2&f[]=clash-display@1&display=swap" rel="stylesheet" /> */}
      </head>

      <body
        className={`${funnelDisplay.variable} ${inter.variable} antialiased`}
      >

        <header className='hdr'>
          <div className="container mx-auto p-6">
            <div className="hdr-row flex flex-col sm:flex-row gap-3 justify-between leading-tight font-semibold">

              <div className='flex gap-1'>
                <Link 
                  href="/"
                  className="hdr-link font-semibold"
                >
                  Almaz Bissenbayev,
                </Link>
                <span className='opacity-50'> Web Developer</span>
              </div>

              <div>
                <Link 
                  href="/posts/"
                  className="hdr-link font-semibold"
                >
                  Posts
                </Link>
              </div>

            </div>
          </div>
        </header>

        {children}
      
        <GoogleAnalytics gaId="G-10DVM02K4H" />
      </body>
      
    </html>
  );
}
