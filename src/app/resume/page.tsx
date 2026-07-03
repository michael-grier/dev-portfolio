import { Download } from "lucide-react";

import { PageShell } from "@/components/site/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { skillGroups, siteConfig } from "@/content/site";

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
      <div className="grid gap-5 lg:grid-cols-[0.7fr_0.3fr]">
        <Card className="border-white/10 bg-white/[0.06] text-white backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Experience snapshot</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5 text-sm leading-7 text-white/62">
            <p>
              Recent work centers on building maintainable product interfaces,
              designing practical data flows, and shipping features with clear
              user value.
            </p>
            <p>
              The resume page is structured for fast scanning across experience,
              skills, education, and the downloadable PDF.
            </p>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/[0.06] text-white backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Download</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button
              asChild
              className="h-10 rounded-full bg-white text-slate-950 hover:bg-sky-100"
            >
              <a href="/resume.pdf" download>
                PDF resume
                <Download className="size-4" />
              </a>
            </Button>
            <div className="grid gap-3">
              {skillGroups.map((group) => (
                <div key={group.label}>
                  <p className="text-sm font-medium text-white">
                    {group.label}
                  </p>
                  <p className="mt-1 text-sm text-white/54">
                    {group.skills.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
