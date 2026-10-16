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
 * What makes that work is the pool. The photograph was taken at night with rim
 * light on the hair and shoulders, and a lit edge only reads as deliberate
 * against something dark; on bare white it looks like a bad cut. So the figure
 * carries its own darkness, sized larger than he is and fading to nothing, and
 * the themes use it differently: a vignette he emerges from in the light theme,
 * a faint glow that lifts him off the background in the dark one. The colour is
 * the `--portrait-pool` token, not a value typed in here.
 *
 * The lower edge is masked rather than cropped. The subject mask ends where the
 * original frame ended — mid-thigh — and a straight horizontal line across a
 * body is the one thing that gives a cut-out away instantly. Fading the last
 * third to nothing lets him dissolve into the page instead, which is also why
 * the figure can sit low in the hero without needing a floor to stand on.
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

      <Image
        src={PORTRAIT.src}
        alt={alt}
        width={PORTRAIT.width}
        height={PORTRAIT.height}
        priority
        sizes="(min-width: 1024px) 24rem, (min-width: 640px) 18rem, 15rem"
        className="relative h-auto w-full select-none [mask-image:linear-gradient(to_bottom,black_58%,transparent_96%)]"
      />
    </div>
  );
}
