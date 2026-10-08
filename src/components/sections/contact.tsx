import { MapPin } from "lucide-react";

import { Container } from "@/components/layout/container";
import { ContactForm } from "@/components/sections/contact-form";
import { CopyButton } from "@/components/shared/copy-button";
import { LocalTime } from "@/components/shared/local-time";
import { SectionHeading } from "@/components/shared/section-heading";
import { SocialLinks } from "@/components/shared/social-links";
import { profile } from "@/data";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="05 — Contact"
          title="Let's talk"
          lead="Open to full-time roles and to interesting freelance work. If you have a problem that needs an architecture rather than a page, I would like to hear about it."
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
          <div className="space-y-8">
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                Email
              </p>
              <div className="mt-2 flex items-center gap-1">
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="rounded-sm text-lg font-medium text-primary underline-offset-4 hover:underline"
                >
                  {profile.contact.email}
                </a>
                <CopyButton
                  value={profile.contact.email}
                  label="Copy email address"
                />
              </div>
            </div>

            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                Elsewhere
              </p>
              <SocialLinks className="-ml-2 mt-2" />
            </div>

            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                Based in
              </p>
              <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin aria-hidden className="size-3.5" />
                  {profile.contact.location}
                </span>
                <LocalTime />
              </p>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty-balance">
              A direct email always reaches me. The form goes to the same inbox —
              use whichever you prefer.
            </p>
          </div>

          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
