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
 * The hero's second column: the subject, with no frame around him.
 *
 * A photograph in a rounded rectangle with a border is the one treatment every
 * template already ships. The background is cut away instead — macOS Vision's
 * subject mask, baked into the asset rather than run in the browser — so the
 * figure stands on the page itself. What he stands in front of is
 * `HeroPortraitField`, which is where the composition and the interaction live.
 *
 * Two things stay here, because both are properties of this photograph rather
 * than of the backdrop:
 *
 * The dark theme needs a rim. The suit is near-black, the page is dark, and the
 * shot was lit flat against white, so without one the shoulders dissolve and a
 * face and a shirt are left floating. A `drop-shadow` follows the alpha outline
 * exactly, which makes it a rim light rather than a box shadow — the separation
 * a photograph taken on white never had to provide for itself. The light theme
 * inverts it: there the suit is already the darkest thing on the page, so a
 * faint shadow grounds it instead of outlining it.
 *
 * And the lower edge is masked rather than cropped. The frame ends mid-chest,
 * and a straight horizontal line across a body is the one thing that gives a
 * cut-out away instantly. Fading the last stretch to nothing lets him dissolve
 * into the page instead.
 *
 * `priority` because on a wide screen this is beside the <h1>, which is the LCP
 * element — the optimizer should not defer what a visitor sees first.
 */
export function HeroPortrait({ alt }: HeroPortraitProps) {
  return (
    <HeroPortraitField>
      <Image
        src={PORTRAIT.src}
        alt={alt}
        width={PORTRAIT.width}
        height={PORTRAIT.height}
        priority
        sizes="(min-width: 1024px) 18rem, (min-width: 640px) 15rem, 13rem"
        className="h-auto w-full select-none opacity-90 [filter:drop-shadow(0_14px_22px_color-mix(in_oklch,var(--color-foreground)_15%,transparent))] [mask-image:linear-gradient(to_bottom,black_74%,transparent_99%)] dark:opacity-95 dark:[filter:drop-shadow(0_0_1px_color-mix(in_oklch,var(--color-foreground)_50%,transparent))_drop-shadow(0_0_18px_color-mix(in_oklch,var(--color-primary)_32%,transparent))]"
      />
    </HeroPortraitField>
  );
}
