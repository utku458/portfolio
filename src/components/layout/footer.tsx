import { ArrowUp } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { SocialLinks } from "@/components/shared/social-links";
import { navItems } from "@/config/site";
import { profile } from "@/data";

/**
 * A server component — no state, no effects, therefore no JavaScript shipped
 * for it at all.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-32 border-t border-border py-12">
      <Container>
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <p className="font-mono text-sm font-medium">
              {profile.initials}
              <span className="text-primary">.</span>
            </p>
            <p className="mt-3 text-sm text-muted-foreground text-pretty-balance">
              {profile.title} in {profile.contact.location}. Currently open to
              new opportunities.
            </p>
            <SocialLinks className="-ml-2 mt-4" />
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {year} {profile.name}. Built with Next.js, TypeScript and Tailwind CSS.
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 rounded-md text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to top
            <ArrowUp className="size-3.5" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
