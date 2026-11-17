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
    global-not-found.jsx          Custom 404 for all routes
    globals.css                   Shared styles and theme
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

## Routing and indexing

Root layouts share `SiteDocument` for fonts, analytics and site-wide structured
data. Each root sets its document language in the initial HTML. The custom 404
uses Next.js's `experimental.globalNotFound` option to cover all routes.

After deploying a new indexable page, verify its URL returns 200 and appears
in `/sitemap.xml`. You can submit the sitemap and inspect the URL in Google
Search Console. `public/llms.txt` provides a profile summary for tools that
read it.

## Known issue

`npm run lint` currently crashes with
`TypeError: scopeManager.addGlobals is not a function`. ESLint 10 requires
`addGlobals` on the parser's scope manager, and `eslint-config-next@16.2.11`
parses with Next's vendored `@babel/eslint-parser`, whose bundled `eslint-scope`
predates that API. Pinning `eslint` to `^9` is the fix; the build itself is
unaffected.
