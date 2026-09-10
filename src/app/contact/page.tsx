import { Chapter } from "@/components/site/chapter";
import { PageShell } from "@/components/site/page-shell";
import { contactCopy, contactLinks } from "@/content/site";

export const metadata = {
  title: "Contact",
  description:
    "How to reach Michael Grier, a full-stack developer in Calgary open to new roles.",
};

const bodyText = "text-pretty text-[19px] leading-8 text-ink/80";

export default function ContactPage() {
  return (
    <PageShell title="Let's talk." intro={contactCopy.intro}>
      <div className="border-b border-ink/12">
        <Chapter number="01" title="What I'm looking for">
          <p className={bodyText}>{contactCopy.looking}</p>
        </Chapter>

        <Chapter number="02" title="How to reach me">
          <ul className="space-y-3 text-[19px] leading-8">
            {contactLinks.map((link) => {
              const external = link.href.startsWith("http");
              return (
                <li key={link.label}>
                  <span className="mr-3 text-ink/55">{link.label}</span>
                  <a
                    href={link.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer noopener" : undefined}
                    className="break-words text-blue underline decoration-blue/30 underline-offset-4 outline-none hover:decoration-blue focus-visible:ring-2 focus-visible:ring-blue"
                  >
                    {link.value}
                  </a>
                </li>
              );
            })}
          </ul>
        </Chapter>

        <Chapter number="03" title="What happens next">
          <p className={bodyText}>{contactCopy.expect}</p>
        </Chapter>
      </div>
    </PageShell>
  );
}
