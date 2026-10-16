import Image from "next/image";

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
 * figure stands on the page itself and the hero's grid shows through behind him.
 *
 * What makes that work is the pool: the figure carries its own light, sized
 * larger than he is and fading to nothing. The themes use it differently — a
 * vignette he emerges from in the light theme, a glow that lifts him off the
 * background in the dark one. The colour is the `--portrait-pool` token, not a
 * value typed in here.
 *
 * The dark theme also needs a rim. The suit is near-black and the page is dark,
 * so without one the shoulders simply dissolve and only a face and a shirt are
 * left floating. A `drop-shadow` follows the alpha outline exactly, which makes
 * it a rim light rather than a box shadow — the separation a studio photograph
 * shot on white never had to provide for itself. The light theme inverts it:
 * there the suit is already the darkest thing on the page, so a faint dark
 * shadow grounds it instead of outlining it.
 *
 * The lower edge is masked rather than cropped. The subject mask ends where the
 * original frame ended — mid-thigh — and a straight horizontal line across a
 * body is the one thing that gives a cut-out away instantly. Fading the last
 * third to nothing lets him dissolve into the page instead, which is also why
 * the figure can sit low in the hero without needing a floor to stand on.
 *
 * He is also held back a little rather than sitting at full strength: slightly
 * transparent, so the hero's grid reads faintly through him, and in the light
 * theme blended on luminosity so the photograph's own warm cast gives way to
 * the page's palette instead of fighting it. The dark theme skips that — there
 * the page is already the night he was photographed in.
 *
 * `priority` because on a wide screen this is beside the <h1>, which is the LCP
 * element — the optimizer should not defer what a visitor sees first.
 */
export function HeroPortrait({ alt }: HeroPortraitProps) {
  return (
    <div className="pointer-events-none relative mx-auto flex w-full max-w-60 animate-fade-up justify-center [animation-delay:360ms] sm:max-w-72 lg:mx-0 lg:max-w-sm">
      <div
        aria-hidden
        className="absolute left-1/2 top-[44%] -z-10 aspect-square w-[165%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,var(--portrait-pool),transparent_72%)]"
      />

      {/*
        Two rings he stands inside. Without something behind it a cut-out reads
        as pasted on, because nothing in the composition acknowledges it — the
        figure needs a place, not just an absence of background. They are
        concentric and off-centre from the pool so the geometry does not look
        like a target, and the lower half of each is faded out by the mask
        below so they never cross the baseline the figure dissolves into.
      */}
      <div
        aria-hidden
        className="absolute left-1/2 top-[42%] -z-10 aspect-square w-[128%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20 [mask-image:linear-gradient(to_bottom,black_35%,transparent_85%)]"
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-[42%] -z-10 aspect-square w-[178%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10 [mask-image:linear-gradient(to_bottom,black_30%,transparent_80%)]"
      />

      <Image
        src={PORTRAIT.src}
        alt={alt}
        width={PORTRAIT.width}
        height={PORTRAIT.height}
        priority
        sizes="(min-width: 1024px) 24rem, (min-width: 640px) 18rem, 15rem"
        className="relative h-auto w-full select-none opacity-95 [filter:drop-shadow(0_18px_28px_color-mix(in_oklch,var(--color-foreground)_18%,transparent))] [mask-image:linear-gradient(to_bottom,black_72%,transparent_99%)] dark:opacity-100 dark:[filter:drop-shadow(0_0_1px_color-mix(in_oklch,var(--color-foreground)_55%,transparent))_drop-shadow(0_0_22px_color-mix(in_oklch,var(--color-primary)_38%,transparent))]"
      />
    </div>
  );
}
