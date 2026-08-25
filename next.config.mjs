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
        // NOTE: Content-Security-Policy is intentionally omitted — it needs to
        // be tuned by hand to allow Google Analytics, the inline JSON-LD
        // script, and three.js before it can be enabled without breaking the
        // page. Add it (start in report-only mode) once those sources are known.
        source: '/:path*',
        headers: [
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
