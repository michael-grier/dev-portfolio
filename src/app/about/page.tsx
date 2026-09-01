import { PageShell } from "@/components/site/page-shell";
import { aboutPrinciples, workingStyle } from "@/content/site";

export const metadata = {
  title: "About",
  description:
    "Background, working style, and product engineering principles for software developer Michael Grier.",
};

export default function AboutPage() {
  return (
    <PageShell
      title="A builder,"
      subtitle={
        <>
          with <span className="text-sky-300/90">product instincts</span>.
        </>
      }
    >
      <div className="max-w-2xl space-y-6 text-lg leading-9 text-white/65">
        <p>
          I build web software with attention to UX, maintainability, and the
          details that make tools feel dependable. The work sits at the
          intersection of clean interface design, typed implementation, and
          practical product judgment.
        </p>
        <p>
          I like problems where the surface area is real: unclear workflows,
          messy states, and implementation details that need to become a
          coherent product experience. The strongest projects are the ones
          where technical quality makes the product easier to understand.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {aboutPrinciples.map((principle) => (
          <div
            key={principle.label}
            className="glow-pane rounded-3xl border border-white/[0.12] bg-white/[0.05] p-7 text-white shadow-2xl shadow-sky-950/20 backdrop-blur-2xl"
          >
            <p className="font-mono text-xs text-sky-200/70">
              {principle.label.toLowerCase()}
            </p>
            <p className="mt-4 text-base leading-7 text-white/70">
              {principle.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-20 max-w-2xl border-t border-white/10 pt-10">
        <h2 className="text-sm font-semibold text-white/50">How I work</h2>
        <ol className="mt-6 space-y-4">
          {workingStyle.map((item, index) => (
            <li
              key={item}
              className="grid grid-cols-[2.5rem_1fr] gap-3 text-base leading-7 text-white/60"
            >
              <span className="font-mono text-sm leading-7 text-white/35">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </PageShell>
  );
}
