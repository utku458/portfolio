import type { NextConfig } from "next";

/**
 * One policy for the whole site.
 *
 * Every external origin is absent on purpose: `next/font/google` downloads the
 * fonts at build time and serves them from `/_next`, so nothing is fetched from
 * a third party at runtime and the policy can stay at `'self'`.
 *
 * `'unsafe-inline'` on scripts is the honest compromise. Next inlines the RSC
 * payload and the bootstrap script into every prerendered page; removing it
 * means a per-request nonce, which means `proxy.ts` has to run on every route
 * and every page stops being static. That is a real cost for a site whose pages
 * render no user input at all — there is no string from a visitor anywhere in
 * the HTML, so there is nothing for an injected script to arrive through. What
 * the policy still buys is the part that matters here: `script-src 'self'`
 * blocks a script loaded from any other origin, and `object-src 'none'` plus
 * `base-uri 'self'` close the two classic rewrite tricks.
 */
/**
 * React's development build uses `eval()` to rebuild stack traces across
 * environments — it says so itself when the policy blocks it, and it says it
 * never does this in production. Without this the dev server throws on every
 * page load. The allowance is keyed on NODE_ENV, so it cannot reach the image:
 * `next build` runs with NODE_ENV=production.
 */
const scriptSrc =
  process.env.NODE_ENV === "development"
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
    : "script-src 'self' 'unsafe-inline'";

const contentSecurityPolicy = [
  "default-src 'self'",
  scriptSrc,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  /**
   * Built for a container, not for a platform.
   *
   * `standalone` emits a self-contained server with only the packages the app
   * actually imports, so the runtime image carries no `node_modules` tree and
   * no package manager. The trade-off is that the build output no longer
   * includes `public/` or `.next/static` — the Dockerfile copies both, and
   * forgetting either is the classic "site loads with no CSS and no images".
   */
  output: "standalone",

  /** Says "Next.js" to every scanner for no benefit to anyone. */
  poweredByHeader: false,

  /** The OAuth consent screen of CareerPilot links to the language-neutral address. */
  async redirects() {
    return [{ source: "/privacy", destination: "/en/privacy", permanent: false }];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          // Two years, subdomains included, so a visitor who types the bare
          // domain never makes a cleartext request after the first one.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Stops a browser from "helpfully" re-interpreting a response as a
          // type it was not served as — the route by which an uploaded or
          // user-named file becomes a script.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // `frame-ancestors` above is the modern form; this is the same rule
          // for browsers that never learned it.
          { key: "X-Frame-Options", value: "DENY" },
          // Send the full URL within the site, only the origin when leaving it:
          // an outbound link should not tell the destination which page sent it.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Nothing here needs a camera, a microphone or a location, so nothing
          // embedded in the page may ask for one.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
