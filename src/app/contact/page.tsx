import { Send } from "lucide-react";

import { PageShell } from "@/components/site/page-shell";
import { Button } from "@/components/ui/button";
import { contactLinks, siteConfig } from "@/content/site";

export const metadata = {
  title: "Contact",
  description:
    "Contact links and availability details for software developer Michael Grier.",
};

export default function ContactPage() {
  const primaryContactHref =
    contactLinks.find((link) => link.href.startsWith("mailto:"))?.href ??
    contactLinks[0]?.href ??
    "/contact";

  return (
    <PageShell
      title="Let's talk."
      subtitle={
        <>
          Direct lines, <span className="text-sky-300/90">no forms</span>.
        </>
      }
    >
      <div className="max-w-2xl">
        <p className="text-lg leading-9 text-white/65">
          I&apos;m most interested in practical product engineering work: clear web
          interfaces, typed React applications, full-stack features, and teams
          that care about maintainable delivery.
        </p>
        <p className="mt-6 font-mono text-sm text-white/40">
          {siteConfig.location} · {siteConfig.availability.toLowerCase()}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        {contactLinks.map((link) => {
          const Icon = link.icon;

          return (
            <a
              key={link.label}
              href={link.href}
              className="glow-pane rounded-3xl border border-white/[0.12] bg-white/[0.05] p-7 text-white shadow-2xl shadow-sky-950/20 outline-none backdrop-blur-2xl focus-visible:ring-2 focus-visible:ring-sky-300"
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http") ? "noreferrer noopener" : undefined
              }
            >
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs text-sky-200/70">
                  {link.label.toLowerCase()}
                </p>
                <Icon className="size-4 text-sky-200/60" />
              </div>
              <p className="mt-4 break-words text-sm leading-6 text-white/70">
                {link.value}
              </p>
            </a>
          );
        })}
      </div>
    </PageShell>
  );
}
