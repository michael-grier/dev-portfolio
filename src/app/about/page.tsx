import { Sparkles, Workflow } from "lucide-react";

import { PageShell } from "@/components/site/page-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { aboutPrinciples, siteConfig, workingStyle } from "@/content/site";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="A pragmatic builder with product instincts"
      description="Background, working style, technical interests, and the kinds of problems that are a strong fit."
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(18rem,0.45fr)]">
        <Card className="border-white/10 bg-white/[0.06] text-white shadow-2xl shadow-sky-950/20 backdrop-blur-xl">
          <CardContent className="grid gap-6 p-6 text-base leading-8 text-white/66">
            <Badge className="w-fit border-white/12 bg-white/10 text-sky-100 hover:bg-white/10">
              <Sparkles className="size-3" />
              {siteConfig.role}
            </Badge>
            <p>
              {siteConfig.name} builds web software with attention to UX,
              maintainability, and the details that make tools feel dependable.
              The work sits at the intersection of clean interface design,
              typed implementation, and practical product judgment.
            </p>
            <p>
              I like problems where the surface area is real: unclear workflows,
              messy states, and implementation details that need to become a
              coherent product experience. The strongest projects are the ones
              where technical quality makes the product easier to understand.
            </p>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/[0.06] text-white shadow-2xl shadow-sky-950/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Working Style</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="grid gap-4">
              {workingStyle.map((item, index) => (
                <li
                  key={item}
                  className="grid grid-cols-[2rem_1fr] gap-3 text-sm leading-6 text-white/62"
                >
                  <span className="flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/10 text-xs font-semibold text-sky-100">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {aboutPrinciples.map((principle) => (
          <div
            key={principle.label}
            className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 text-white shadow-xl shadow-sky-950/10 backdrop-blur-xl"
          >
            <Workflow className="size-5 text-sky-200/76" />
            <h2 className="mt-4 text-lg font-semibold text-white">
              {principle.label}
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/62">
              {principle.description}
            </p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
