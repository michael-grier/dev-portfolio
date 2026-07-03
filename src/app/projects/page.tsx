import { ArrowUpRight } from "lucide-react";

import { PageShell } from "@/components/site/page-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { featuredProjects } from "@/content/site";

export const metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <PageShell
      eyebrow="Projects"
      title="Recent development work"
      description="Selected projects presented with media, concise product context, technical notes, and links."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <Card
            key={project.title}
            className="overflow-hidden border-white/10 bg-white/[0.06] text-white backdrop-blur-xl"
          >
            <div className="aspect-video border-b border-white/10 bg-[radial-gradient(circle_at_50%_40%,rgba(125,211,252,0.35),rgba(15,23,42,0.3)_36%,rgba(2,6,23,0.75)_70%)]" />
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle>{project.title}</CardTitle>
                  <p className="mt-1 text-sm text-white/48">
                    {project.year} / {project.status}
                  </p>
                </div>
                <ArrowUpRight className="size-4 text-white/44" />
              </div>
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
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
