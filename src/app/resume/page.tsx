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
    <PageShell title="Resume." intro="Read it here, or take the PDF.">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div>
          <div className="max-w-xl space-y-5 text-pretty text-[19px] leading-8 text-ink/80">
            {resumeSummary.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
          <Button asChild size="lg" className="mt-8 h-11 px-5 text-[15px]">
            <a href="/resume.pdf" download>
              Download PDF
            </a>
          </Button>

          <div className="mt-16 divide-y divide-ink/12 border-y border-ink/12">
            {experienceRoles.map((role) => (
              <article key={`${role.title}-${role.period}`} className="py-8">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h2 className="text-2xl font-medium tracking-[-0.01em]">
                    {role.title}
                  </h2>
                  <p className="text-sm text-ink/55">{role.period}</p>
                </div>
                <p className="mt-1 text-sm text-ink/55">{role.organization}</p>
                <p className="mt-4 max-w-xl text-[17px] leading-7 text-ink/80">
                  {role.summary}
                </p>
                <ul className="mt-4 max-w-xl list-disc space-y-2 pl-5 text-base leading-6 text-ink/70">
                  {role.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <div>
          <dl className="divide-y divide-ink/12 border-y border-ink/12">
            {skillGroups.map((group) => (
              <div key={group.label} className="py-5">
                <dt className="text-lg font-medium">{group.label}</dt>
                <dd className="mt-1 text-base leading-6 text-ink/70">
                  {group.skills.join(", ")}
                </dd>
              </div>
            ))}
          </dl>
          <dl className="mt-10 divide-y divide-ink/12 border-y border-ink/12">
            {educationItems.map((item) => (
              <div key={item.label} className="py-5">
                <dt className="text-lg font-medium">{item.label}</dt>
                <dd className="mt-1 text-base leading-6 text-ink/70">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </PageShell>
  );
}
