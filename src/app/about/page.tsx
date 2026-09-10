import Image from "next/image";

import { Chapter } from "@/components/site/chapter";
import { PageShell } from "@/components/site/page-shell";
import {
  aboutChapters,
  aboutIntro,
  aboutPersonal,
  aboutPhoto,
  aboutPrinciples,
  workingStyle,
} from "@/content/site";

import backSmith from "./back-smith.jpg";

export const metadata = {
  title: "About",
  description:
    "Background and working style of Michael Grier, a full-stack developer in Calgary.",
};

const bodyText = "text-pretty text-[19px] leading-8 text-ink/80";

export default function AboutPage() {
  return (
    <PageShell title="How I got here.">
      <div className="border-b border-ink/12">
        <section className="grid gap-6 border-t border-ink/12 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-14">
          <p className="text-pretty text-lg leading-7 text-ink/70">{aboutIntro}</p>
          <figure className="max-w-xl">
            <Image
              src={backSmith}
              alt={aboutPhoto.alt}
              sizes="(min-width: 1024px) 40vw, 100vw"
              loading="eager"
              placeholder="blur"
              className="rounded-sm border border-ink/14"
            />
            <figcaption className="mt-3 text-sm text-ink/55">{aboutPhoto.caption}</figcaption>
          </figure>
        </section>

        {aboutChapters.map((chapter, index) => (
          <Chapter key={chapter.title} number={String(index + 1).padStart(2, "0")} title={chapter.title}>
            <p className={bodyText}>{chapter.body}</p>
          </Chapter>
        ))}

        <Chapter number="04" title="What I care about">
          <dl className="divide-y divide-ink/12">
            {aboutPrinciples.map((principle) => (
              <div key={principle.label} className="py-5 first:pt-0 last:pb-0">
                <dt className="text-lg font-medium">{principle.label}</dt>
                <dd className="mt-1 text-base leading-6 text-ink/70">{principle.description}</dd>
              </div>
            ))}
          </dl>
        </Chapter>

        <Chapter number="05" title="How I work">
          <ol className="space-y-3 text-base leading-6 text-ink/75">
            {workingStyle.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </Chapter>

        <Chapter number="06" title="Off the clock">
          <p className={bodyText}>{aboutPersonal}</p>
        </Chapter>
      </div>
    </PageShell>
  );
}
