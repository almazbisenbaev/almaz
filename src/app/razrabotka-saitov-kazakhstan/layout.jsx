import SiteDocument from "@/components/layout/site-document";
import { Inter } from "next/font/google";
import "./russian.css";

const inter = Inter({ subsets: ['cyrillic'], variable: '--font-sans' });

// A separate root keeps the Russian document language in the initial HTML,
// while both languages share the same design, fonts, and analytics.
export default function RussianLayout({ children }) {
  return (
    <SiteDocument
      lang="ru-KZ"
      showHeaderNavigation={false}
      showFooter={false}
      fontVariable={inter.variable}
    >
      {children}
    </SiteDocument>
  );
}
