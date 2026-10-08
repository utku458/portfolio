import { MapPin } from "lucide-react";

import { NoteCell, StatCell } from "@/components/sections/glance-cells";
import { LocalTime } from "@/components/shared/local-time";
import { BentoCell, BentoGrid } from "@/components/ui/bento";
import { profile, projects } from "@/data";
import { buildHeadlineStats } from "@/lib/stats";

const AVAILABILITY_NOTE: Record<typeof profile.availability, string> = {
  "open-to-work": "Open to full-time roles and selective freelance work.",
  "open-to-offers": "Open to the right offer.",
  "not-looking": "Heads-down on current work.",
};

/**
 * The composition site.
 *
 * Note what this file does and does not do: it chooses *which* cells exist and
 * *how much room* each one takes, and it hands each cell its content. It never
 * reaches inside a cell to style it, and no cell knows it is in a bento. That
 * separation is the whole point — a new layout is a new arrangement here, not a
 * rewrite anywhere else.
 */
export function GlanceGrid() {
  const stats = buildHeadlineStats({
    projects,
    experience: profile.experience,
    education: profile.education,
  });

  return (
    <BentoGrid>
      {stats.map((stat) => (
        <BentoCell key={stat.id} variant="frame">
          <StatCell stat={stat} />
        </BentoCell>
      ))}

      <BentoCell span={2}>
        <NoteCell label="Currently">
          <p>
            {profile.education[0]?.field} at {profile.education[0]?.institution}.{" "}
            {AVAILABILITY_NOTE[profile.availability]}
          </p>
        </NoteCell>
      </BentoCell>

      <BentoCell span={2}>
        <NoteCell label="Based in">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="inline-flex items-center gap-1.5">
              <MapPin aria-hidden className="size-3.5 text-muted-foreground" />
              {profile.contact.location}
            </span>
            <span className="text-muted-foreground">
              <LocalTime />
            </span>
          </p>
        </NoteCell>
      </BentoCell>
    </BentoGrid>
  );
}
