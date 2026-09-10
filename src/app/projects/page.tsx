import { Chapter } from "@/components/site/chapter";
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
    return <ImageCarousel images={project.images} name={project.title} />;
  }

  return (
    <div
      className="halftone aspect-video rounded-[8px]"
      style={{ "--dot": inkColors[project.ink] } as React.CSSProperties}
    />
  );
}

const rowText = "text-pretty text-[17px] leading-7 text-ink/80";

export default function ProjectsPage() {
  return (
    <PageShell
      title="Things I've built."
      intro="I love building things that help support the communities, pursuits, and people that matter to me. Here's some of the projects that I have been working on recently."
    >
      <div className="divide-y divide-ink/12 border-t border-ink/12">
        {featuredProjects.map((project) => (
          <article key={project.title} className="py-16">
            <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
              <div>
                <h2 className="text-[2rem] font-medium tracking-[-0.01em] sm:text-4xl">
                  {project.title}
                </h2>
                <p className="mt-2 text-lg text-ink/60">{project.tagline}</p>
              </div>
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm text-blue underline decoration-blue/30 underline-offset-4 outline-none hover:decoration-blue focus-visible:ring-2 focus-visible:ring-blue"
              >
                {project.repo.replace("https://", "")}
              </a>
            </div>

            <div className="mt-8">
              <ProjectMedia project={project} />
            </div>

            <div className="mt-10 border-b border-ink/12">
              {project.summary.map((row, index) => (
                <Chapter
                  key={row.label}
                  number={String(index + 1).padStart(2, "0")}
                  title={row.label}
                  headingLevel="h3"
                  className="gap-4 py-8"
                >
                  <p className={rowText}>{row.body}</p>
                </Chapter>
              ))}
              <Chapter
                number={String(project.summary.length + 1).padStart(2, "0")}
                title="Stack"
                headingLevel="h3"
                className="gap-4 py-8"
              >
                <p className={rowText}>{project.stack.join(", ")}</p>
              </Chapter>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
