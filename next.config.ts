import type { NextConfig } from "next";

/**
 * Deliberately empty.
 *
 * The image optimizer previously needed `dangerouslyAllowSVG` for the
 * placeholder cover illustrations. Every cover is now a screenshot of the real
 * thing, so the flag and its sandboxing policy are gone with them — the safest
 * configuration being the one you no longer need.
 */
const nextConfig: NextConfig = {};

export default nextConfig;
