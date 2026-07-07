"use client";

import Link from "next/link";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { heroLines, siteConfig, skillGroups } from "@/content/site";
import { HeroLightfieldCanvas } from "@/components/site/hero-lightfield-canvas";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const contentDelay = shouldReduceMotion ? 0 : 1.28;
  const initial = shouldReduceMotion ? false : { opacity: 0, y: 18 };
  const lineInitial = shouldReduceMotion ? false : { opacity: 0, y: 22 };
  const cardInitial = shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 };

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-5 py-[clamp(6rem,10vh,7.5rem)] sm:px-8 lg:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(14,165,233,0.22),transparent_20rem)]" />
      <HeroLightfieldCanvas className="opacity-95" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.2),rgba(2,6,23,0.05)_38%,rgba(2,6,23,0.55)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-3xl">
          <motion.div
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.68, delay: contentDelay, ease: easeOut }}
          >
            <Badge className="mb-5 border-white/14 bg-white/10 text-sky-100 hover:bg-white/10">
              <Sparkles className="size-3" />
              {siteConfig.availability}
            </Badge>
          </motion.div>

          <h1 className="sr-only">{siteConfig.headline}</h1>
          <div
            aria-hidden="true"
            className="text-balance text-5xl font-semibold leading-[0.96] text-white sm:text-6xl lg:text-[clamp(4rem,5.8vw,4.5rem)]"
          >
            {heroLines.map((line, index) => (
              <motion.span
                key={line}
                className="block"
                initial={lineInitial}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.78,
                  delay: contentDelay + 0.12 + index * 0.13,
                  ease: easeOut,
                }}
              >
                {line}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: contentDelay + 0.68, ease: easeOut }}
            className="mt-5 max-w-2xl text-pretty text-base leading-7 text-white/66 sm:text-lg"
          >
            {siteConfig.shortIntro}
          </motion.p>

          <motion.div
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: contentDelay + 0.82, ease: easeOut }}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
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
          </motion.div>
        </div>

        <motion.div
          initial={cardInitial}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.86, delay: contentDelay + 0.74, ease: easeOut }}
        >
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
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
