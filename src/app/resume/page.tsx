import { CalendarDays, CircleCheck, Download } from "lucide-react";

import { PageShell } from "@/components/site/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  educationItems,
  experienceRoles,
  resumeHighlights,
  resumeSummary,
  skillGroups,
  siteConfig,
} from "@/content/site";

export const metadata = {
  title: "Resume",
};

export default function ResumePage() {
  return (
    <PageShell
      eyebrow="Resume"
      title={`${siteConfig.name}, ${siteConfig.role}`}
      description="A concise view of experience, skills, and the technical strengths behind recent work."
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <Card className="border-white/10 bg-white/[0.06] text-white shadow-2xl shadow-sky-950/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Experience</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            <div className="grid gap-4 text-base leading-8 text-white/68">
              {resumeSummary.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>

            <Separator className="bg-white/10" />

            <div className="grid gap-6">
              {experienceRoles.map((role) => (
                <article key={`${role.title}-${role.period}`} className="grid gap-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-white">
                        {role.title}
                      </h2>
                      <p className="mt-1 text-sm text-white/52">
                        {role.organization}
                      </p>
                    </div>
                    <Badge className="w-fit border-white/12 bg-white/10 text-sky-100 hover:bg-white/10">
                      <CalendarDays className="size-3" />
                      {role.period}
                    </Badge>
                  </div>
                  <p className="text-sm leading-7 text-white/62">
                    {role.summary}
                  </p>
                  <ul className="grid gap-3">
                    {role.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="grid grid-cols-[1rem_1fr] gap-3 text-sm leading-6 text-white/62"
                      >
                        <CircleCheck className="mt-1 size-4 text-sky-200/72" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/[0.06] text-white shadow-2xl shadow-sky-950/20 backdrop-blur-xl lg:sticky lg:top-28 lg:self-start">
          <CardHeader>
            <CardTitle>Resume PDF</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <Button
              asChild
              size="lg"
              className="h-11 rounded-full bg-white text-slate-950 hover:bg-sky-100"
            >
              <a href="/resume.pdf" download>
                Download PDF
                <Download className="size-4" />
              </a>
            </Button>

            <div className="grid gap-3">
              {resumeHighlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-2xl border border-white/10 bg-black/18 p-4 text-sm leading-6 text-white/62"
                >
                  {highlight}
                </div>
              ))}
            </div>

            <Separator className="bg-white/10" />

            <div className="grid gap-4">
              {skillGroups.map((group) => (
                <div key={group.label}>
                  <p className="text-sm font-medium text-white">
                    {group.label}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-white/54">
                    {group.skills.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {educationItems.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 text-white shadow-xl shadow-sky-950/10 backdrop-blur-xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-200/70">
              {item.label}
            </p>
            <p className="mt-3 text-sm leading-6 text-white/62">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
