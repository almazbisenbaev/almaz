# helloalmaz.com

Personal site and portfolio. Next.js App Router, Tailwind v4, fully statically
rendered.

```
npm run dev      # local development
npm run build    # verify static generation
npm start        # preview the production build
```

## Layout

```
src/
  app/
    (site)/                       English pages — the group does not affect URLs
    razrabotka-saitov-kazakhstan/ Russian landing page (its own root layout)
    global-not-found.jsx          404 shared by both roots
    globals.css                   All site styles
  components/                     One directory per component
  data/                           Site content: works, reviews, posts
  hooks/                          Shared client hooks
  lib/                            site.js (shared constants), utils.js (cn)
```

Content lives in `src/data`, not in the pages: `works.js` (client projects),
`reviews.js` (testimonials) and `posts.js` (the blog index, which also drives
the sitemap's internal post URLs). Facts that appear in more than one place —
the site URL, name spellings, profile links, social preview images — live in
`src/lib/site.js`.

Tailwind v4 is configured in CSS. There is no `tailwind.config.ts`: the theme
is the `@theme inline` block in `src/app/globals.css`, and the tokens it maps
are defined in `:root` directly above it.

## Russian landing page

`/razrabotka-saitov-kazakhstan` is a standalone service page for
Russian-speaking clients in Kazakhstan. Its copy, metadata and structured data
are in `src/app/razrabotka-saitov-kazakhstan/page.jsx`; project links and
images come from `src/data/works.js`, with the Russian descriptions layered on
top in the page itself.

The page is in `/sitemap.xml` and `public/llms.txt`, with a discreet
Russian-language link in the English pages' footer. It is not in the header
menu, and has no header of its own. The old `/ru` URL permanently redirects
here and is excluded from the sitemap.

It uses a self-referencing canonical URL, `ru-KZ` document language,
index/follow directives and Kazakhstan service structured data. Because it is a
standalone service page rather than a translation, it does not declare the
English homepage as an equivalent `hreflang` alternate. Keep its sitemap
`lastModified` date (`RUSSIAN_LANDING_LAST_MODIFIED` in `src/app/sitemap.js`) in
sync with significant edits instead of refreshing it on every build.

English and Russian roots share `SiteDocument`, which renders the correct
document language, fonts, analytics and localized header/footer. Separate roots
keep both languages statically rendered; navigating between them loads a new
document. `global-not-found.jsx` preserves the custom 404 across both roots via
Next.js's `experimental.globalNotFound` option.

## After deploying the Russian page

These are account-level steps, separate from the repository, and they do not
guarantee indexing or rankings:

1. Verify `https://helloalmaz.com/razrabotka-saitov-kazakhstan` returns 200 and
   appears in the public sitemap.
2. In Google Search Console, submit `/sitemap.xml` if it has not been submitted,
   then inspect the page and request indexing.
3. If the site is in Yandex Webmaster, submit the same sitemap there.

`llms.txt` is supplementary information for tools that read it, not a
replacement for the sitemap or for links.

## Known issue

`npm run lint` currently crashes with
`TypeError: scopeManager.addGlobals is not a function`. ESLint 10 requires
`addGlobals` on the parser's scope manager, and `eslint-config-next@16.2.11`
parses with Next's vendored `@babel/eslint-parser`, whose bundled `eslint-scope`
predates that API. Pinning `eslint` to `^9` is the fix; the build itself is
unaffected.
