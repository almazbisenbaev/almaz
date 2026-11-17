import SiteDocument from "@/components/layout/site-document";
import { Inter } from "next/font/google";
import "./landing.css";

const inter = Inter({ subsets: ['cyrillic'], variable: '--font-sans' });

export default function KazakhstanLayout({ children }) {
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
