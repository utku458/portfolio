import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";
import { getProjectBySlug, projects } from "@/data";

export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

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
            "radial-gradient(900px circle at 88% 0%, rgba(113,172,255,0.18), transparent 60%)",
          color: "#f2f4f6",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#71acff",
            }}
          >
            Case study
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 88,
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            {project?.title ?? "Project"}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              maxWidth: 940,
              fontSize: 34,
              lineHeight: 1.35,
              color: "#9aa2ad",
            }}
          >
            {project?.tagline ?? ""}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", height: 1, backgroundColor: "#23282f" }} />
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 26,
              color: "#9aa2ad",
            }}
          >
            {siteConfig.name}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
