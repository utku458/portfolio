import { ImageResponse } from "next/og";

import { profileFacts } from "@/data";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** The "UA." mark from the navbar, generated as the browser-tab icon. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0b0f14",
          color: "#f2f4f6",
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          borderRadius: 7,
        }}
      >
        {profileFacts.initials}
      </div>
    ),
    { ...size },
  );
}
