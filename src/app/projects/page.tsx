import { PageShell } from "@/components/site/page-shell";
import { featuredProjects, type Project } from "@/content/site";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Projects",
  description:
    "Selected software development projects with product context, technical notes, and implementation details.",
};

const mediaStyles: Record<
  Project["media"],
  { label: string; background: string; sheet: string }
> = {
  interface: {
    label: "text-sky-300/80",
    background:
      "bg-[radial-gradient(circle_at_30%_30%,rgba(125,211,252,0.28),transparent_14rem),linear-gradient(135deg,rgba(15,23,42,0.3),rgba(2,6,23,0.85))]",
    sheet: "border-sky-200/20 from-sky-300/[0.08]",
  },
  systems: {
    label: "text-emerald-300/70",
    background:
      "bg-[radial-gradient(circle_at_70%_30%,rgba(74,222,128,0.18),transparent_14rem),linear-gradient(225deg,rgba(8,13,23,0.5),rgba(2,6,23,0.88))]",
    sheet: "border-emerald-200/20 from-emerald-300/[0.07]",
  },
  delivery: {
    label: "text-violet-300/70",
    background:
      "bg-[radial-gradient(circle_at_45%_25%,rgba(216,180,254,0.2),transparent_14rem),linear-gradient(135deg,rgba(15,23,42,0.35),rgba(2,6,23,0.88))]",
    sheet: "border-violet-200/20 from-violet-300/[0.07]",
  },
};

/* Abstract layered sheets rising toward the light — stands in for product imagery. */
function ProjectMedia({ project }: { project: Project }) {
  const style = mediaStyles[project.media];

  return (
    <div className={cn("relative min-h-[16rem]", style.background)}>
      <div className="absolute inset-x-10 bottom-10 top-14 rounded-t-2xl border border-b-0 border-white/15 bg-gradient-to-b from-white/[0.09] to-transparent backdrop-blur-sm" />
      <div
        className={cn(
          "absolute inset-x-16 bottom-10 top-24 rounded-t-xl border border-b-0 bg-gradient-to-b to-transparent",
          style.sheet
        )}
      />
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <PageShell
      title="Things I've built."
      subtitle={
        <>
          Product context first,{" "}
          <span className="text-sky-300/90">then the code</span>.
        </>
      }
    >
      <div className="space-y-10">
        {featuredProjects.map((project, index) => {
          const style = mediaStyles[project.media];
          const mediaOnLeft = index % 2 === 1;

          return (
            <article
              key={project.title}
              className={cn(
                "glow-pane grid gap-8 overflow-hidden rounded-3xl border border-white/[0.12] bg-white/[0.05] text-white shadow-2xl shadow-sky-950/30 backdrop-blur-2xl",
                mediaOnLeft
                  ? "glow-pane-tilt-left lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
                  : "glow-pane-tilt-right lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
              )}
            >
              <div
                className={cn(
                  "order-last min-h-[16rem]",
                  mediaOnLeft && "lg:order-first"
                )}
              >
                <ProjectMedia project={project} />
              </div>
              <div className="order-first p-8 sm:p-10">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h2 className="text-3xl font-semibold">{project.title}</h2>
                  <span className={cn("font-mono text-sm", style.label)}>
                    {project.year} · {project.status.toLowerCase()}
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/45">{project.role}</p>
                <p className="mt-5 max-w-xl text-base leading-8 text-white/60">
                  {project.problem}
                </p>
                <p className="mt-4 max-w-xl text-base leading-8 text-white/60">
                  {project.contribution} {project.result}
                </p>
                <p className="mt-6 font-mono text-sm text-white/40">
                  {project.stack.join(" · ")}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </PageShell>
  );
}
