import type { NextConfig } from "next";

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
};

export default nextConfig;
