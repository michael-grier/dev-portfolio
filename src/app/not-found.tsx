import Link from "next/link";

import { PageShell } from "@/components/site/page-shell";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <PageShell
      title="No page here."
      intro="The page may have moved, or the address may be from an older version of this site. The main pages are still in the navigation."
      className="min-h-screen"
    >
      <div className="flex flex-wrap items-center gap-5 text-[15px] font-medium">
        <Button asChild size="lg" className="h-11 px-5 text-[15px]">
          <Link href="/">Back home</Link>
        </Button>
        <Link
          href="/projects"
          className="text-ink underline decoration-ink/30 underline-offset-4 outline-none transition-colors hover:text-blue hover:decoration-blue focus-visible:ring-2 focus-visible:ring-blue"
        >
          Projects
        </Link>
      </div>
    </PageShell>
  );
}
