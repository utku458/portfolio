import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    /*
     * The CV is linked from the site and meant to be downloaded, but it carries
     * a phone number and a date of birth, and search engines read PDF text.
     * Disallowing the directory keeps it one click away for a reader and out of
     * results for anyone searching for the contents instead of the person.
     */
    rules: { userAgent: "*", allow: "/", disallow: "/documents/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
