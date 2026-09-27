helloalmaz.com

## Russian landing page

`/razrabotka-saitov-kazakhstan` is a standalone service page for Russian-speaking clients in Kazakhstan.
Edit its copy, metadata, and structured data in `src/app/razrabotka-saitov-kazakhstan/page.jsx`. Project
links and images come from `src/lib/data.js`; Russian descriptions are on the page.
The page is included in `/sitemap.xml` and `public/llms.txt`, with a discreet
Russian-language link in the English pages' footer. It is not linked in the
header menu, and the Russian landing page itself has no header. The old `/ru`
URL permanently redirects to this page and is excluded from the sitemap.

The page uses a self-referencing canonical URL, `ru-KZ` document language,
index/follow directives, and Kazakhstan service structured data. It is a
standalone service page, so it does not declare the different English homepage
as an equivalent `hreflang` translation. Keep `/razrabotka-saitov-kazakhstan`'s sitemap `lastModified`
date in sync with significant page edits instead of refreshing it on every build.

English pages are grouped under `src/app/(site)` without changing their URLs.
English and Russian root layouts share `SiteDocument`, which renders the correct
HTML language, fonts, analytics, and localized header/footer. Separate roots keep
both languages statically rendered; navigation between them loads a new document.
`global-not-found.jsx` preserves the custom 404 across both roots using Next.js's
`experimental.globalNotFound` option.

Run `npm run build` to check static generation, then `npm start` to preview.
The page becomes available to search engines once deployed; the robots file
already points crawlers to the sitemap. After deployment, verify that
`https://helloalmaz.com/razrabotka-saitov-kazakhstan` returns 200 and appears in the public sitemap.
In the site's Google Search Console property, submit `/sitemap.xml` if it has
not been submitted already, then inspect `/razrabotka-saitov-kazakhstan` and request indexing. If the
site is managed in Yandex Webmaster, submit the same sitemap there too.
These account-level submissions are separate from the repository changes;
they do not guarantee indexing or rankings. `llms.txt` is supplementary
information for tools that read it, not a replacement for the sitemap or links.
