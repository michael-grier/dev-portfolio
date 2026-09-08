import { PageShell } from "@/components/site/page-shell";
import { Button } from "@/components/ui/button";
import resume from "@/content/resume.json";

export const metadata = {
  title: "Resume",
  description:
    "Michael Grier's software development experience, selected projects, technical skills, and downloadable resume.",
  alternates: { canonical: "/resume" },
};

const textLink =
  "underline decoration-ink/30 underline-offset-4 outline-none transition-colors hover:text-blue hover:decoration-blue focus-visible:ring-2 focus-visible:ring-blue";

// The page and downloadable documents use the same resume content.
export default function ResumePage() {
  return (
    <PageShell title="Resume." intro="Read it here, or take a copy.">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <p className="max-w-2xl text-pretty text-[19px] leading-8 text-ink/80">
            {resume.summary}
          </p>
          <address className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm not-italic text-ink/70">
            <span>{resume.location}</span>
            <a href={`mailto:${resume.email}`} className={textLink}>
              {resume.email}
            </a>
            <a href={resume.github} className={textLink}>
              GitHub: {resume.github.replace("https://github.com/", "")}
            </a>
          </address>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button asChild size="lg" className="h-11 px-5 text-[15px]">
              <a href="/Michael_Grier_Resume.pdf" download="Michael_Grier_Resume.pdf">
                Download PDF
              </a>
            </Button>
            <a
              href="/Michael_Grier_Resume.docx"
              download="Michael_Grier_Resume.docx"
              className={`text-[15px] ${textLink}`}
            >
              Download Word
            </a>
          </div>

          <section aria-labelledby="experience-heading" className="mt-16">
            <h2 id="experience-heading" className="text-3xl font-medium">
              Experience
            </h2>
            <div className="mt-6 divide-y divide-ink/12 border-b border-ink/12">
              {resume.experience.map((role) => (
                <article key={`${role.title}-${role.period}`} className="py-8 first:pt-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="text-2xl font-medium tracking-[-0.01em]">
                      {role.title}
                    </h3>
                    <p className="text-sm text-ink/65">{role.period}</p>
                  </div>
                  <p className="mt-1 text-sm text-ink/65">
                    {role.organization}, {role.location}
                  </p>
                  {role.products.map((product) => (
                    <section key={product.name} className="mt-8">
                      <h4 className="text-xl font-medium">{product.name}</h4>
                      <p className="mt-1 text-sm text-ink/65">
                        {product.description}
                      </p>
                      <ul className="mt-4 list-disc space-y-3 pl-5 text-base leading-7 text-ink/80 marker:text-blue">
                        {product.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </section>
                  ))}
                  {role.bullets.map((bullet) => (
                    <p key={bullet} className="mt-4 text-base leading-7 text-ink/80">
                      {bullet}
                    </p>
                  ))}
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="projects-heading" className="mt-14">
            <h2 id="projects-heading" className="text-3xl font-medium">
              Selected projects
            </h2>
            <p className="mt-2 text-sm text-ink/65">Independent development</p>
            <div className="mt-6 divide-y divide-ink/12 border-b border-ink/12">
              {resume.projects.map((project) => (
                <article key={project.name} className="py-8 first:pt-0">
                  <h3 className="text-xl font-medium tracking-[-0.01em]">
                    <a
                      href={project.href}
                      className="outline-none transition-colors hover:text-blue hover:underline hover:underline-offset-4 focus-visible:ring-2 focus-visible:ring-blue"
                    >
                      {project.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-ink/65">{project.description}</p>
                  <p className="mt-4 text-base leading-7 text-ink/80">
                    {project.bullet}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-ink/65">{project.stack}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-12" aria-label="Technical skills and education">
          <section aria-labelledby="skills-heading">
            <h2 id="skills-heading" className="text-3xl font-medium">
              Technical skills
            </h2>
            <dl className="mt-6 divide-y divide-ink/12 border-b border-ink/12">
              {resume.skills.map((group) => (
                <div key={group.label} className="py-5 first:pt-0">
                  <dt className="text-lg font-medium">{group.label}</dt>
                  <dd className="mt-2 text-base leading-7 text-ink/75">
                    {group.items.join(", ")}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
          <section aria-labelledby="education-heading">
            <h2 id="education-heading" className="text-3xl font-medium">
              Education
            </h2>
            <div className="mt-6 divide-y divide-ink/12 border-b border-ink/12">
              {resume.education.map((item) => (
                <article key={item.qualification} className="py-5 first:pt-0">
                  <h3 className="text-lg font-medium">{item.qualification}</h3>
                  <p className="mt-2 text-base leading-6 text-ink/75">
                    {item.institution}
                  </p>
                  <p className="mt-1 text-sm text-ink/65">{item.detail}</p>
                </article>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </PageShell>
  );
}
