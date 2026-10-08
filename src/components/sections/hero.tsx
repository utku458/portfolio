import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { GlanceGrid } from "@/components/sections/glance-grid";
import { HeroBackground } from "@/components/sections/hero-background";
import { SocialLinks } from "@/components/shared/social-links";
import { Button } from "@/components/ui/button";
import { profile } from "@/data";
import type { AvailabilityStatus } from "@/types";

const AVAILABILITY_COPY: Record<AvailabilityStatus, string> = {
  "open-to-work": "Open to new opportunities",
  "open-to-offers": "Open to interesting offers",
  "not-looking": "Not currently looking",
};

/**
 * A server component. The entrance animation is CSS, so it plays on the first
 * paint rather than waiting for hydration — which matters because the <h1> here
 * is the page's LCP element.
 *
 * The introduction is held to `--measure-prose` while the bento below runs the
 * full container width. That contrast — a narrow column of text against a wide
 * grid — is what stops a page of full-width paragraphs from reading as a wall.
 */
export function Hero() {
  return (
    <section className="relative py-20 sm:py-28">
      <HeroBackground />

      <Container>
        <div className="max-w-(--measure-prose)">
          <p className="inline-flex animate-fade-up items-center gap-2.5 rounded-full border border-border bg-card/70 py-1.5 pl-3 pr-4 text-xs font-medium backdrop-blur-sm">
            <span className="relative flex size-2">
              <span
                aria-hidden
                className="absolute inline-flex size-full animate-pulse-dot rounded-full bg-emerald-500"
              />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {AVAILABILITY_COPY[profile.availability]}
          </p>

          <h1 className="mt-7 animate-fade-up text-display font-semibold text-balance [animation-delay:70ms]">
            {profile.name}
          </h1>

          <p className="mt-3 animate-fade-up font-mono text-sm uppercase tracking-[0.16em] text-primary [animation-delay:120ms]">
            {profile.title}
          </p>

          <p className="mt-7 animate-fade-up text-lg leading-relaxed text-muted-foreground text-pretty-balance [animation-delay:180ms]">
            {profile.headline}
          </p>

          <div className="mt-9 flex animate-fade-up flex-wrap items-center gap-3 [animation-delay:240ms]">
            <Button asChild size="lg">
              <a href="#projects">
                View projects
                <ArrowRight aria-hidden />
              </a>
            </Button>
            {/*
              The secondary CTA was the CV download. With the PDF withheld, the
              next most useful thing to offer is the conversation it was meant
              to start — not a button that downloads nothing.
            */}
            <Button asChild variant="outline" size="lg">
              <a href="#contact">Get in touch</a>
            </Button>
            <SocialLinks className="sm:ml-2" />
          </div>

          {/* The architecture, in one line. Says more than a wall of logos. */}
          <p className="mt-12 flex animate-fade-up flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground [animation-delay:300ms] sm:text-xs">
            <span>SwiftUI · Kotlin · React</span>
            <span aria-hidden className="text-primary">&rarr;</span>
            <span>C# .NET API</span>
            <span aria-hidden className="text-primary">&rarr;</span>
            <span>MySQL</span>
          </p>
        </div>

        <div className="mt-16 sm:mt-20">
          <GlanceGrid />
        </div>
      </Container>
    </section>
  );
}
