/**
 * Content-Security-Policy.
 *
 * Sources this site actually needs, and why each one is here:
 *
 *   script-src   'unsafe-inline' is unavoidable, not laziness. The App Router
 *                streams its RSC payload as inline `self.__next_f.push(...)`
 *                <script> tags, and the JSON-LD block in app/layout.jsx is
 *                inline too. The nonce alternative requires reading the nonce
 *                in middleware, which opts every route out of static
 *                prerendering — a real cost for a site that is 100% static.
 *                googletagmanager.com serves gtag.js (@next/third-parties).
 *   style-src    Same shape: `experimental.inlineCss` emits the route CSS as an
 *                inline <style>, and several components set `style={{...}}`.
 *   img-src      data:/blob: cover next/image placeholders; the Google hosts
 *                cover the analytics collection pixel.
 *   connect-src  The GA4 beacon endpoints, including the regional
 *                (region1.google-analytics.com) and server-side variants.
 *   font-src     next/font self-hosts Inter, so 'self' is enough.
 *   media-src    The portfolio .mp4/.webm clips, all served from /public.
 *
 * Even with 'unsafe-inline' on scripts this is worth enabling: it still blocks
 * injected *external* scripts, plugin/object embeds, <base> hijacking, and form
 * posts to attacker origins, and it pins framing to same-origin.
 *
 * `next dev` needs two extra sources that must never reach production:
 * React's development build calls eval() to rebuild callstacks across
 * environments, and Turbopack pushes HMR updates over a websocket. Both are
 * gated on NODE_ENV below, so the shipped policy stays eval-free.
 */
const isDev = process.env.NODE_ENV === 'development';

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval' blob:" : ''} https://www.googletagmanager.com https://www.google-analytics.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com",
  "font-src 'self' data:",
  "media-src 'self'",
  `connect-src 'self'${isDev ? ' ws: wss:' : ''} https://www.googletagmanager.com https://*.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com`,
  "worker-src 'self' blob:",
  "manifest-src 'self'",
].join('; ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  experimental: {
    // Inlines the route's CSS as a <style> tag in the streamed HTML instead of
    // linking it, which removes the last render-blocking request from the
    // critical path. Unlike the `optimizeCss` flag noted below, this one is
    // implemented in the App Router render path, so it actually applies here.
    //
    // The trade-off: ~9 KB (brotli) of CSS rides along in every HTML response
    // rather than being fetched once and served from cache on later pages. That
    // is the right side of the trade for this site — traffic is overwhelmingly
    // single-page first visits, where the saved round trip beats the reuse.
    inlineCss: true,
  },
  // NOTE: `experimental.optimizeCss` used to be set here. It is a no-op on this
  // site: Next only runs its critical-CSS inliner from `server/post-process.js`,
  // which is reachable solely from the Pages Router render path. This app is
  // entirely App Router, so the flag inlined nothing while still printing an
  // "✓ optimizeCss" line at build time. Removed to stop it reading as active.
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    )

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      }
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
  async headers() {
    return [
      {
        // Security headers applied to every route.
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: contentSecurityPolicy },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|webp|avif|ico)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(js|css)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
