import { GoogleAnalytics } from '@next/third-parties/google';
import { Funnel_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from '@/components/layout/Header';

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Almaz Bisenbaev - Full-Stack Web Developer",
  description: "Full-Stack Web Developer with UX Designer background",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${funnelDisplay.variable} ${inter.variable} antialiased`}
      >
        <Header />

        {children}
      
        <GoogleAnalytics gaId="G-10DVM02K4H" />
      </body>
    </html>
  );
}
