import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /*
     * One cover is still an SVG illustration we author ourselves and serve from
     * /public (FitApp, which has no public build to screenshot). There are no
     * remote or user-supplied images anywhere in this app, which is the case
     * `dangerouslyAllowSVG` actually exists to warn about. The policy below is
     * Next's documented hardening: the optimizer serves it with no script
     * execution and a full sandbox.
     *
     * When that last illustration becomes a screenshot, this block can go.
     */
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
