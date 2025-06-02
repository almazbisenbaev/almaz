import { GoogleAnalytics } from '@next/third-parties/google';

// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
      <GoogleAnalytics gaId="G-10DVM02K4H" />
    </html>
  );
}
