import { MapPin } from "lucide-react";

import { Container } from "@/components/layout/container";
import { ContactForm } from "@/components/sections/contact-form";
import { CopyButton } from "@/components/shared/copy-button";
import { LocalTime } from "@/components/shared/local-time";
import { SectionHeading } from "@/components/shared/section-heading";
import { SocialLinks } from "@/components/shared/social-links";
import { getProfile } from "@/data";
import { getDictionary, getLocale } from "@/i18n";

export async function Contact() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const profile = getProfile(locale);
  return (
    <section id="contact" className="scroll-mt-24 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={dict.contact.eyebrow}
          title={dict.contact.title}
          lead={dict.contact.lead}
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
                  label={dict.contact.copyEmail}
                />
              </div>
            </div>

            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                Elsewhere
              </p>
              <SocialLinks socials={profile.socials} className="-ml-2 mt-2" />
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
                <LocalTime timeZone={profile.contact.timezone} label={dict.glance.localTime} />
              </p>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty-balance">
              A direct email always reaches me. The form goes to the same inbox —
              use whichever you prefer.
            </p>
          </div>

          <ContactForm locale={locale} labels={dict.contact.form} />
        </div>
      </Container>
    </section>
  );
}
