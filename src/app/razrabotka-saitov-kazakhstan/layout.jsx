import SiteDocument from "@/components/layout/site-document";
import "./russian.css";

// A separate root keeps the Russian document language in the initial HTML,
// while both languages share the same design, fonts, and analytics.
export default function RussianLayout({ children }) {
  return <SiteDocument lang="ru-KZ" showHeader={false}>{children}</SiteDocument>;
}
