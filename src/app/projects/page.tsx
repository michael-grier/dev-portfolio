import { Box, Gauge, Layers3, Terminal } from "lucide-react";

import { PageShell } from "@/components/site/page-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { featuredProjects, type Project } from "@/content/site";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Projects",
};

const mediaStyles: Record<
  Project["media"],
  {
    Icon: typeof Layers3;
    background: string;
    accent: string;
    lines: string[];
  }
> = {
  interface: {
    Icon: Layers3,
    background:
      "bg-[radial-gradient(circle_at_22%_18%,rgba(125,211,252,0.34),transparent_13rem),linear-gradient(135deg,rgba(15,23,42,0.34),rgba(2,6,23,0.88))]",
    accent: "from-sky-200/90 to-cyan-300/30",
    lines: ["w-11/12", "w-8/12", "w-10/12"],
  },
  systems: {
    Icon: Terminal,
    background:
      "bg-[radial-gradient(circle_at_78%_14%,rgba(74,222,128,0.22),transparent_12rem),linear-gradient(135deg,rgba(8,13,23,0.55),rgba(2,6,23,0.9))]",
    accent: "from-emerald-200/90 to-sky-300/30",
    lines: ["w-9/12", "w-11/12", "w-7/12"],
  },
  delivery: {
    Icon: Gauge,
    background:
      "bg-[radial-gradient(circle_at_55%_20%,rgba(216,180,254,0.22),transparent_12rem),linear-gradient(135deg,rgba(15,23,42,0.34),rgba(2,6,23,0.9))]",
    accent: "from-violet-200/90 to-sky-300/30",
    lines: ["w-10/12", "w-6/12", "w-11/12"],
  },
};

function ProjectMedia({ project }: { project: Project }) {
  const style = mediaStyles[project.media];
  const Icon = style.Icon;

  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden border-b border-white/10",
        style.background
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.1)_34%,transparent_58%)] opacity-70" />
      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/72 backdrop-blur-xl">
        <Icon className="size-3.5 text-sky-100" />
        {project.status}
      </div>
      <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/12 bg-black/24 p-4 shadow-2xl shadow-sky-950/30 backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-red-300/70" />
          <span className="size-2 rounded-full bg-amber-200/70" />
          <span className="size-2 rounded-full bg-emerald-200/70" />
        </div>
        <div className="grid gap-2">
          {style.lines.map((width, index) => (
            <div
              key={`${project.title}-${width}-${index}`}
              className={cn(
                "h-2 rounded-full bg-gradient-to-r opacity-80",
                style.accent,
                width
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <PageShell
      eyebrow="Projects"
      title="Recent development work"
      description="Selected projects presented with media, concise product context, and practical implementation notes."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <Card
            key={project.title}
            className="overflow-hidden border-white/10 bg-white/[0.06] text-white shadow-2xl shadow-sky-950/20 backdrop-blur-xl"
          >
            <ProjectMedia project={project} />
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="border-white/12 bg-white/10 text-sky-100 hover:bg-white/10">
                  <Box className="size-3" />
                  {project.year}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-white/10 text-white/70 hover:bg-white/14"
                >
                  {project.role}
                </Badge>
              </div>
              <CardTitle className="pt-2">{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <p className="text-sm leading-6 text-white/62">
                {project.summary}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <Badge
                    key={item}
                    variant="secondary"
                    className="bg-white/10 text-white hover:bg-white/14"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
              <Separator className="bg-white/10" />
              <div className="grid gap-4 text-sm leading-6">
                <div>
                  <p className="font-medium text-white">Problem</p>
                  <p className="mt-1 text-white/58">{project.problem}</p>
                </div>
                <div>
                  <p className="font-medium text-white">Contribution</p>
                  <p className="mt-1 text-white/58">{project.contribution}</p>
                </div>
                <div>
                  <p className="font-medium text-white">Result</p>
                  <p className="mt-1 text-white/58">{project.result}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
