import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { dictionaryFor, getLocaleOrDefault } from "@/i18n";

export default async function NotFound() {
  // Deliberately the forgiving reader: this page is what renders when the
  // locale segment was the thing that was wrong.
  const locale = await getLocaleOrDefault();
  const dict = dictionaryFor(locale);

  return (
    <section className="flex min-h-[70svh] items-center py-24">
      <Container>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          404
        </p>
        <h1 className="mt-4 text-headline font-semibold">{dict.notFound.title}</h1>
        <p className="mt-4 max-w-md text-muted-foreground text-pretty-balance">
          {dict.notFound.lead}
        </p>
        <Button asChild className="mt-8">
          <Link href={`/${locale}`}>{dict.notFound.backHome}</Link>
        </Button>
      </Container>
    </section>
  );
}
