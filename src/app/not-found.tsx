import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center py-24">
      <Container>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          404
        </p>
        <h1 className="mt-4 text-headline font-semibold">
          This page does not exist
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground text-pretty-balance">
          The link may be out of date, or the page may have moved.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Back to the homepage</Link>
        </Button>
      </Container>
    </section>
  );
}
