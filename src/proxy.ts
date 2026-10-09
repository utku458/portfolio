import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, isLocale } from "@/i18n/config";

/**
 * Sends `/` to a language, once, before anything renders.
 *
 * Only the bare root is matched. Every other URL already carries its locale,
 * so this runs for one request per visitor and the rest of the site stays
 * fully static — the reason the matcher is this narrow rather than the usual
 * catch-all from the i18n guides.
 */
function preferredLocale(header: string | null) {
  if (!header) return defaultLocale;

  // `tr-TR;q=0.9, en;q=0.8` → the highest-weighted tag we actually publish.
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag = "", ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { tag: tag.trim().toLowerCase(), q: q ? Number(q.split("=")[1]) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    // Match the base language too, so `tr-TR` and `tr-CY` both find Turkish.
    const base = tag.split("-")[0] ?? "";
    if (isLocale(base)) return base;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const locale = preferredLocale(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}`;
  // 307, not 308: the choice depends on a header, so it must not be cached as
  // permanent by a browser that later arrives with different preferences.
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: "/",
};
