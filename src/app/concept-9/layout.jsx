import { Lora, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "@/components/concepts/base.css";
import "./ground.css";

const serif = Lora({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--ground-serif",
  display: "swap",
});
const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--ground-sans",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--ground-mono",
  display: "swap",
});
export const metadata = {
  title: "Common Ground — Almaz | Concept 09",
  description:
    "Thoughtful websites, made with a human touch. Independent development by Almaz Bisenbaev.",
  robots: { index: false, follow: true },
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#193c32",
};
export default function Layout({ children }) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="ground-body">{children}</body>
    </html>
  );
}
