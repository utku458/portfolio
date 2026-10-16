import Image from "next/image";

import { HeroPortraitField } from "@/components/sections/hero-portrait-field";
import { profileFacts } from "@/data";

interface HeroPortraitProps {
  /** Describes the photograph to someone who cannot see it. */
  readonly alt: string;
}

/** Shared with the Person structured data, so both always name the same file. */
const PORTRAIT = profileFacts.portrait;

/**
 * The hero's second column: a disc, at the scale of an avatar.
 *
 * The photograph is still a cut-out — macOS Vision's subject mask, baked into
 * the asset — but it is no longer asked to stand on the page unaided. A
 * free-standing cut-out has to hide its own silhouette, and a mask that fades
 * the edge to nothing only works when the page behind it is dark; on a light
 * background the same fade reads as a torn edge. The disc removes the problem
 * rather than managing it: the only hard edge is a circle, which is obviously
 * deliberate, and the cut-out's own outline meets a filled surface instead of
 * the page.
 *
 * Inside it the figure is bottom-aligned and narrower than the disc, so there
 * is headroom above the hair and the shoulders run off the lower edge. Framing
 * a head dead-centre in a circle is what makes a portrait look like a form
 * field; this is the framing a photographer would have chosen.
 *
 * The fill is a gradient rather than a flat colour because the photograph was
 * lit flat against white: it carries no background of its own, and a flat disc
 * would make that obvious. The gradient also gives the near-black suit
 * somewhere to sit in the dark theme, which is the job the rim light used to
 * do when the figure floated free.
 *
 * `priority` because on a wide screen this is beside the <h1>, which is the LCP
 * element — the optimizer should not defer what a visitor sees first.
 */
export function HeroPortrait({ alt }: HeroPortraitProps) {
  return (
    <HeroPortraitField>
      <div className="relative size-full overflow-hidden rounded-full bg-[radial-gradient(120%_100%_at_50%_0%,color-mix(in_oklch,var(--color-primary)_14%,var(--color-card)),var(--color-card))] ring-1 ring-border">
        <Image
          src={PORTRAIT.src}
          alt={alt}
          width={PORTRAIT.width}
          height={PORTRAIT.height}
          priority
          sizes="(min-width: 1024px) 11rem, (min-width: 640px) 10rem, 9rem"
          className="absolute bottom-0 left-1/2 w-[82%] -translate-x-1/2 select-none"
        />
      </div>
    </HeroPortraitField>
  );
}
