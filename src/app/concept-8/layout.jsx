import { Anton, Manrope, IBM_Plex_Mono } from "next/font/google";
import "@/components/concepts/base.css";
import "./redline.css";

const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--red-display",
  display: "swap",
});
const sans = Manrope({
  subsets: ["latin"],
  variable: "--red-sans",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--red-mono",
  display: "swap",
});
export const metadata = {
  title: "REDLINE — Almaz | Concept 08",
  description:
    "Independent web development with a little more character. A kinetic portfolio by Almaz Bisenbaev.",
  robots: { index: false, follow: true },
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f0442d",
};
export default function Layout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="red-body">{children}</body>
    </html>
  );
}
