import { Clock3, MapPin, Send } from "lucide-react";

import { PageShell } from "@/components/site/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { contactLinks, siteConfig } from "@/content/site";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  const primaryContactHref =
    contactLinks.find((link) => link.href.startsWith("mailto:"))?.href ??
    contactLinks[0]?.href ??
    "/contact";

  return (
    <PageShell
      eyebrow="Contact"
      title="Let’s keep it direct"
      description="Use these links to reach out, review code, or connect professionally."
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(18rem,0.45fr)]">
        <Card className="border-white/10 bg-white/[0.06] text-white shadow-2xl shadow-sky-950/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Available for the right software role</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <p className="max-w-2xl text-base leading-8 text-white/66">
              I’m most interested in practical product engineering work: clear
              web interfaces, typed React applications, full-stack features,
              and teams that care about maintainable delivery.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-11 rounded-full bg-white text-slate-950 hover:bg-sky-100"
              >
                <a href={primaryContactHref}>
                  Email me
                  <Send className="size-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-11 rounded-full border-white/18 bg-white/8 text-white hover:bg-white/14 hover:text-white"
              >
                <a href="/resume.pdf" download>
                  Download resume
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/[0.06] text-white shadow-2xl shadow-sky-950/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-[1rem_1fr] gap-3 text-sm leading-6 text-white/62">
              <MapPin className="mt-1 size-4 text-sky-200/76" />
              <span>{siteConfig.location}</span>
            </div>
            <div className="grid grid-cols-[1rem_1fr] gap-3 text-sm leading-6 text-white/62">
              <Clock3 className="mt-1 size-4 text-sky-200/76" />
              <span>{siteConfig.availability}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {contactLinks.map((link) => {
          const Icon = link.icon;

          return (
            <a
              key={link.label}
              href={link.href}
              className="group rounded-2xl border border-white/10 bg-white/[0.05] p-5 text-white shadow-xl shadow-sky-950/10 outline-none backdrop-blur-xl transition hover:bg-white/[0.08] focus-visible:ring-2 focus-visible:ring-sky-300"
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http")
                  ? "noreferrer noopener"
                  : undefined
              }
            >
              <Icon className="size-5 text-sky-200/80" />
              <p className="mt-4 font-medium text-white">{link.label}</p>
              <p className="mt-2 break-words text-sm leading-6 text-white/54 group-hover:text-white/72">
                {link.value}
              </p>
            </a>
          );
        })}
      </div>
    </PageShell>
  );
}
