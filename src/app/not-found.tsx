import Link from "next/link";
import { ArrowLeft, BriefcaseBusiness, Mail } from "lucide-react";

import { PageShell } from "@/components/site/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { contactLinks } from "@/content/site";

export default function NotFound() {
  const emailHref =
    contactLinks.find((link) => link.href.startsWith("mailto:"))?.href ??
    "/contact";

  return (
    <PageShell
      eyebrow="404"
      title="This route does not exist"
      description="The page may have moved, or the URL may be using an older portfolio path."
      className="min-h-screen"
    >
      <Card className="max-w-3xl border-white/10 bg-white/[0.06] text-white shadow-2xl shadow-sky-950/20 backdrop-blur-xl">
        <CardContent className="grid gap-6 p-6">
          <p className="text-base leading-8 text-white/64">
            The main portfolio pages are still available from the navigation,
            or you can jump straight to recent work and contact details.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
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
        </CardContent>
      </Card>
    </PageShell>
  );
}
