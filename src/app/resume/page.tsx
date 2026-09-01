import { Download } from "lucide-react";

import { PageShell } from "@/components/site/page-shell";
import { Button } from "@/components/ui/button";
import {
  educationItems,
  experienceRoles,
  resumeSummary,
  skillGroups,
} from "@/content/site";

export const metadata = {
  title: "Resume",
  description:
    "Resume details, experience summary, skills, and downloadable PDF for software developer Michael Grier.",
};

export default function ResumePage() {
  return (
    <PageShell
      title="The resume."
      subtitle={
        <>
          Read it here, or{" "}
          <span className="text-sky-300/90">take the PDF</span>.
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div>
          <div className="max-w-2xl space-y-6 text-lg leading-9 text-white/65">
            {resumeSummary.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>

          <div className="mt-16 space-y-14">
            {experienceRoles.map((role) => (
              <article
                key={`${role.title}-${role.period}`}
                className="border-t border-white/10 pt-10"
              >
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h2 className="text-2xl font-semibold text-white">
                    {role.title}
                  </h2>
                  <span className="font-mono text-sm text-sky-300/80">
                    {role.period}
                  </span>
                </div>
                <p className="mt-1 text-sm text-white/45">
                  {role.organization}
                </p>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/60">
                  {role.summary}
                </p>
                <ul className="mt-5 max-w-2xl space-y-3">
                  {role.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="grid grid-cols-[1.25rem_1fr] gap-3 text-sm leading-7 text-white/60"
                    >
                      <span
                        aria-hidden="true"
                        className="font-mono text-sky-300/60"
                      >
                        —
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <div className="glow-pane self-start rounded-3xl border border-white/[0.12] bg-white/[0.05] p-6 text-white shadow-2xl shadow-sky-950/30 backdrop-blur-2xl lg:sticky lg:top-32">
          <p className="font-mono text-xs text-sky-200/70">resume.pdf</p>
          <Button
            asChild
            size="lg"
            className="mt-4 h-11 w-full rounded-full bg-white text-slate-950 hover:bg-sky-100"
          >
            <a href="/resume.pdf" download>
              Download PDF
              <Download className="size-4" />
            </a>
          </Button>

          <div className="mt-6 grid gap-2.5">
            {skillGroups.map((group) => (
              <div
                key={group.label}
                className="rounded-2xl border border-white/10 bg-black/18 p-3"
              >
                <p className="text-sm font-medium text-white">{group.label}</p>
                <p className="mt-1.5 text-sm leading-6 text-white/55">
                  {group.skills.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20 grid gap-x-10 gap-y-8 border-t border-white/10 pt-10 sm:grid-cols-3">
        {educationItems.map((item) => (
          <div key={item.label}>
            <p className="font-mono text-xs text-sky-200/70">
              {item.label.toLowerCase()}
            </p>
            <p className="mt-3 text-sm leading-7 text-white/60">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
