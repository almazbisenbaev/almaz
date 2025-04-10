import { Geist, Geist_Mono } from "next/font/google";
import { Space_Grotesk } from 'next/font/google';
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'], // or ['latin-ext'] if needed
  weight: ['400', '500', '600', '700'], // choose the weights you want
  variable: '--font-space-grotesk', // optional: for using as a CSS variable
  display: 'swap',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Almaz Bisenbaev - Full-Stack Web Developer",
  description: "Full-Stack Web Developer with UX Designer background",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
