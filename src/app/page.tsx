import Link from "next/link";
import { ArrowRight, Download, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { featuredProjects, siteConfig, skillGroups } from "@/content/site";

export default function Home() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-5 pb-16 pt-32 sm:px-8 lg:px-10">
      <div className="hero-atmosphere absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div className="max-w-3xl">
          <Badge className="mb-6 border-white/14 bg-white/10 text-sky-100 hover:bg-white/10">
            <Sparkles className="size-3" />
            {siteConfig.availability}
          </Badge>
          <h1 className="text-balance text-5xl font-semibold leading-[0.98] tracking-normal text-white sm:text-6xl lg:text-7xl">
            {siteConfig.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-white/66 sm:text-lg">
            {siteConfig.shortIntro}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-11 rounded-full bg-white text-slate-950 hover:bg-sky-100"
            >
              <Link href="/projects">
                View projects
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 rounded-full border-white/18 bg-white/8 text-white hover:bg-white/14 hover:text-white"
            >
              <Link href="/resume">
                Resume
                <Download className="size-4" />
              </Link>
            </Button>
          </div>
        </div>

        <Card className="border-white/12 bg-white/[0.07] text-white shadow-2xl shadow-sky-950/30 backdrop-blur-2xl">
          <CardContent className="grid gap-6 p-5 sm:p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200/70">
                Current focus
              </p>
              <p className="mt-3 text-lg leading-7 text-white/80">
                Building portfolio-ready product experiences with careful UI,
                typed frontends, and reliable delivery habits.
              </p>
            </div>
            <div className="grid gap-3">
              {skillGroups.map((group) => (
                <div
                  key={group.label}
                  className="rounded-2xl border border-white/10 bg-black/18 p-4"
                >
                  <p className="text-sm font-medium text-white">
                    {group.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/58">
                    {group.skills.join(" / ")}
                  </p>
                </div>
              ))}
            </div>
            <div className="grid gap-3 border-t border-white/10 pt-5">
              {featuredProjects.slice(0, 2).map((project) => (
                <Link
                  key={project.title}
                  href="/projects"
                  className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 outline-none transition hover:bg-white/[0.08] focus-visible:ring-2 focus-visible:ring-sky-300"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium text-white">{project.title}</p>
                    <ArrowRight className="size-4 text-white/40 transition group-hover:translate-x-0.5 group-hover:text-white" />
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/56">
                    {project.summary}
                  </p>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
