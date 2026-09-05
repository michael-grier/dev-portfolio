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
    <PageShell title="Let's talk." intro="Direct lines, no forms.">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div>
          <p className="max-w-xl text-pretty text-[19px] leading-8 text-ink/80">
            I&apos;m most interested in practical product engineering work: clear
            web interfaces, typed React applications, full-stack features, and
            teams that care about maintainable delivery.
          </p>
          <p className="mt-4 text-sm text-ink/55">
            {siteConfig.location}. {siteConfig.availability}.
          </p>
          <Button asChild size="lg" className="mt-8 h-11 px-5 text-[15px]">
            <a href={primaryContactHref}>Email me</a>
          </Button>
        </div>

        <dl className="divide-y divide-ink/12 border-y border-ink/12">
          {contactLinks.map((link) => (
            <div key={link.label} className="py-5">
              <dt className="text-lg font-medium">{link.label}</dt>
              <dd className="mt-1">
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
                  className="break-words text-base text-blue underline decoration-blue/30 underline-offset-4 outline-none hover:decoration-blue focus-visible:ring-2 focus-visible:ring-blue"
                >
                  {link.value}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </PageShell>
  );
}
