import Link from "next/link";
import { ArrowLeft, BriefcaseBusiness, Mail } from "lucide-react";

import { PageShell } from "@/components/site/page-shell";
import { Button } from "@/components/ui/button";
import { contactLinks } from "@/content/site";

export default function NotFound() {
  const emailHref =
    contactLinks.find((link) => link.href.startsWith("mailto:"))?.href ??
    "/contact";

  return (
    <PageShell
      title="Lost in the dark."
      subtitle={
        <>
          There's <span className="text-sky-300/90">no page</span> at this
          address.
        </>
      }
      className="min-h-screen"
    >
      <div className="max-w-2xl">
        <p className="text-lg leading-9 text-white/65">
          The page may have moved, or the URL may be using an older portfolio
          path. The main pages are still available from the navigation.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-11 rounded-full bg-white text-slate-950 hover:bg-sky-100"
          >
            <Link href="/">
              <ArrowLeft className="size-4" />
              Back home
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-11 rounded-full border-white/18 bg-white/8 text-white hover:bg-white/14 hover:text-white"
          >
            <Link href="/projects">
              Projects
              <BriefcaseBusiness className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-11 rounded-full border-white/18 bg-white/8 text-white hover:bg-white/14 hover:text-white"
          >
            <a href={emailHref}>
              Contact
              <Mail className="size-4" />
            </a>
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
