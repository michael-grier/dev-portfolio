import Image from "next/image";

import { PageShell } from "@/components/site/page-shell";
import { featuredProjects, type Project } from "@/content/site";

export const metadata = {
  title: "Projects",
  description:
    "Selected software development projects with product context, technical notes, and implementation details.",
};

const inkColors: Record<Project["ink"], string> = {
  blue: "var(--blue)",
  pink: "var(--pink)",
  ink: "var(--ink)",
};

function ProjectMedia({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-ink/14">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="halftone aspect-[4/3] rounded-sm"
      style={{ "--dot": inkColors[project.ink] } as React.CSSProperties}
    />
  );
}

export default function ProjectsPage() {
  return (
    <PageShell
      title="Things I've built."
      intro="I love building things that help support the communities, pursuits, and people that matter to me. Here's some of the projects that I have been working on recently."
    >
      <div className="divide-y divide-ink/12 border-y border-ink/12">
        {featuredProjects.map((project) => (
          <article
            key={project.title}
            className="grid gap-8 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14"
          >
            <ProjectMedia project={project} />
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h2 className="text-3xl font-medium tracking-[-0.01em]">
                  {project.title}
                </h2>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-blue underline decoration-blue/30 underline-offset-4 outline-none hover:decoration-blue focus-visible:ring-2 focus-visible:ring-blue"
                >
                  {project.repo.replace("https://", "")}
                </a>
              </div>
              <p className="mt-2 text-sm text-ink/55">{project.tagline}</p>
              <div className="mt-6 space-y-4 text-[17px] leading-7 text-ink/80">
                {project.summary.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <p className="mt-6 text-sm text-ink/55">{project.stack.join(", ")}</p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
