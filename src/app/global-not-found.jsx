import SiteDocument from "@/components/layout/site-document";
import NotFound from "./(site)/not-found";

export const metadata = {
  title: "Page not found | Almaz Bisenbaev",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return <SiteDocument><NotFound /></SiteDocument>;
}
