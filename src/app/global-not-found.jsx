import SiteDocument from "@/components/layout/site-document";
import { AUTHOR_NAME } from "@/lib/site";
import NotFound from "./(site)/not-found";

// Shared by both roots via `experimental.globalNotFound`, so the custom 404
// survives on the English and Russian sides of the site.
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
