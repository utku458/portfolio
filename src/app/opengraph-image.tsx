import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";
import { profile } from "@/data";

export const alt = `${siteConfig.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time, not designed in Figma and exported as a PNG — which
 * means it can never drift from the content it advertises.
 *
 * Satori (what renders this) supports flexbox only and will not resolve CSS
 * custom properties, so the theme values are inlined as hex here. They mirror
 * the dark palette in `globals.css`.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#0b0f14",
          backgroundImage:
            "radial-gradient(900px circle at 12% 0%, rgba(113,172,255,0.18), transparent 60%)",
          color: "#f2f4f6",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 24,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#9aa2ad",
            }}
          >
            {profile.title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 104,
              fontWeight: 700,
              letterSpacing: "-0.035em",
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              maxWidth: 900,
              fontSize: 34,
              lineHeight: 1.35,
              color: "#9aa2ad",
            }}
          >
            {profile.headline}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{ display: "flex", height: 1, backgroundColor: "#23282f" }}
          />
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 24,
              letterSpacing: "0.12em",
              color: "#71acff",
            }}
          >
            SWIFTUI · KOTLIN · REACT → C# .NET API → MYSQL
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
