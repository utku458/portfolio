import { Mail } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import { GitHubIcon, LinkedInIcon } from "@/components/shared/brand-icons";
import { profile } from "@/data";
import type { SocialPlatform } from "@/types";
import { cn } from "@/lib/utils";

/**
 * `Record<SocialPlatform, …>` rather than a lookup with a fallback: adding a
 * platform to the union without giving it an icon becomes a compile error.
 */
const ICONS: Record<SocialPlatform, ComponentType<SVGProps<SVGSVGElement>>> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: Mail,
};

export function SocialLinks({ className }: { readonly className?: string }) {
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {profile.socials.map((social) => {
        const Icon = ICONS[social.platform];
        const isExternal = social.href.startsWith("http");
        return (
          <li key={social.platform}>
            <a
              href={social.href}
              aria-label={social.label}
              title={social.label}
              {...(isExternal
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
              className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Icon className="size-4.5" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
