import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "@/components/concepts/base.css";
import "./offscreen.css";

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--desk-sans",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--desk-mono",
  display: "swap",
});
export const metadata = {
  title: "Offscreen — Almaz OS | Concept 10",
  description:
    "A small desktop for big ideas. Explore the work, tools, and experiments of Almaz Bisenbaev.",
  robots: { index: false, follow: true },
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#c3b4ec",
};
export default function Layout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="desk-body">{children}</body>
    </html>
  );
}
