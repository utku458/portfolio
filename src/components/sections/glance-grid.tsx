import { MapPin } from "lucide-react";

import { NoteCell, StatCell } from "@/components/sections/glance-cells";
import { LocalTime } from "@/components/shared/local-time";
import { BentoCell, BentoGrid } from "@/components/ui/bento";
import { getProfile, getProjects } from "@/data";
import { getDictionary, getLocale } from "@/i18n";
import { fill } from "@/lib/contact";
import { buildHeadlineStats } from "@/lib/stats";

/**
 * The composition site.
 *
 * Note what this file does and does not do: it chooses *which* cells exist and
 * *how much room* each one takes, and it hands each cell its content. It never
 * reaches inside a cell to style it, and no cell knows it is in a bento. That
 * separation is the whole point — a new layout is a new arrangement here, not a
 * rewrite anywhere else.
 */
export async function GlanceGrid() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const profile = getProfile(locale);

  const stats = buildHeadlineStats(
    {
      projects: getProjects(locale),
      experience: profile.experience,
      education: profile.education,
    },
    dict.stats,
  );

  return (
    <BentoGrid>
      {stats.map((stat) => (
        <BentoCell key={stat.id} variant="frame">
          <StatCell stat={stat} />
        </BentoCell>
      ))}

      <BentoCell span={2}>
        <NoteCell label={dict.glance.currently}>
          <p>
            {fill(dict.glance.studyingAt, {
              field: profile.education[0]?.field ?? "",
              institution: profile.education[0]?.institution ?? "",
            })}{" "}
            {dict.glance.availabilityNote[profile.availability]}
          </p>
        </NoteCell>
      </BentoCell>

      <BentoCell span={2}>
        <NoteCell label={dict.glance.basedIn}>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="inline-flex items-center gap-1.5">
              <MapPin aria-hidden className="size-3.5 text-muted-foreground" />
              {profile.contact.location}
            </span>
            <span className="text-muted-foreground">
              <LocalTime timeZone={profile.contact.timezone} label={dict.glance.localTime} />
            </span>
          </p>
        </NoteCell>
      </BentoCell>
    </BentoGrid>
  );
}
