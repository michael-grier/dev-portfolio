import { ImageCarousel } from "@/components/site/image-carousel";
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
  if (project.images?.length) {
    return (
      <ImageCarousel images={project.images} name={project.title} />
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
      contentClassName="max-w-[95rem]"
      title="Things I've built."
      intro="Two apps for the skate scene I'm part of, and a tool for the work itself. What each one had to get right, and what I built to do it."
    >
      <div className="divide-y divide-ink/12 border-y border-ink/12">
        {featuredProjects.map((project) => (
          <article
            key={project.title}
            className="grid gap-7 py-8 md:py-12 xl:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] xl:gap-12"
          >
            <ProjectMedia project={project} />
            <div>
              <div>
                <h2 className="text-3xl font-medium tracking-[-0.01em]">
                  {project.title}
                </h2>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-3 inline-block text-sm text-blue underline decoration-blue/30 underline-offset-4 outline-none hover:decoration-blue focus-visible:ring-2 focus-visible:ring-blue"
                >
                  {project.repo.replace("https://", "")}
                </a>
              </div>
              <p className="mt-4 text-sm text-ink/55">{project.tagline}</p>
              <div className="mt-6 grid gap-5 text-[17px] leading-7 text-ink/80 md:grid-cols-2 md:gap-8 xl:grid-cols-1 xl:gap-5">
                {project.summary.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <p className="mt-4 text-sm text-ink/55">{project.stack.join(", ")}</p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
