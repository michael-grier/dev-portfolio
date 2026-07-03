import { PageShell } from "@/components/site/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { contactLinks, siteConfig } from "@/content/site";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Let’s keep it direct"
      description="Use these links to reach out, review code, or connect professionally."
    >
      <div className="grid max-w-3xl gap-4 sm:grid-cols-3">
        {contactLinks.map((link) => {
          const Icon = link.icon;

          return (
            <Card
              key={link.label}
              className="border-white/10 bg-white/[0.06] text-white backdrop-blur-xl"
            >
              <CardContent className="p-5">
                <a
                  href={link.href}
                  className="group block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
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
              </CardContent>
            </Card>
          );
        })}
      </div>
      <p className="mt-6 text-sm text-white/46">
        {siteConfig.location} / {siteConfig.availability}
      </p>
    </PageShell>
  );
}
