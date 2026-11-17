import SiteDocument from "@/components/layout/site-document";
import { AUTHOR_NAME } from "@/lib/site";
import NotFound from "./(site)/not-found";

export const metadata = {
  title: `Page not found | ${AUTHOR_NAME}`,
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <SiteDocument>
      <NotFound />
    </SiteDocument>
  );
}
