import { PageShell } from "@/components/site/page-shell";
import { aboutPrinciples, workingStyle } from "@/content/site";

export const metadata = {
  title: "About",
  description:
    "Background, working style, and product engineering principles for software developer Michael Grier.",
};

export default function AboutPage() {
  return (
    <PageShell title="A builder with product instincts.">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="max-w-xl space-y-5 text-pretty text-[19px] leading-8 text-ink/80">
          <p>
            I build web software with attention to UX, maintainability, and the
            details that make tools feel dependable. The work sits between clean
            interface design, typed implementation, and practical product
            judgment.
          </p>
          <p>
            I like problems where the surface area is real: unclear workflows,
            messy states, and implementation details that need to become a
            coherent product. Most of what I&apos;ve shipped lately has been for
            the skate scene in Calgary, because those were the tools my friends
            and I actually needed.
          </p>
        </div>
        <dl className="divide-y divide-ink/12 border-y border-ink/12">
          {aboutPrinciples.map((principle) => (
            <div key={principle.label} className="py-5">
              <dt className="text-lg font-medium">{principle.label}</dt>
              <dd className="mt-1 text-base leading-6 text-ink/70">
                {principle.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <section className="mt-20 border-t border-ink/12 pt-8">
        <h2 className="text-lg font-medium">How I work</h2>
        <ol className="mt-4 grid gap-x-12 gap-y-3 text-base leading-6 text-ink/75 md:grid-cols-2">
          {workingStyle.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>
    </PageShell>
  );
}
