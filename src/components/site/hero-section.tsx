"use client";

import Link from "next/link";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { heroHeadline, siteConfig, skillGroups } from "@/content/site";
import { HeroLightfieldCanvas } from "@/components/site/hero-lightfield-canvas";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const contentDelay = shouldReduceMotion ? 0 : 1.28;
  const initial = shouldReduceMotion ? false : { opacity: 0, y: 18 };
  const headingInitial = shouldReduceMotion ? false : { opacity: 0, y: 22 };
  const cardInitial = shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 };

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-5 py-[clamp(6rem,10vh,7.5rem)] sm:px-8 lg:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(14,165,233,0.22),transparent_20rem)]" />
      <HeroLightfieldCanvas className="opacity-95" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.2),rgba(2,6,23,0.05)_38%,rgba(2,6,23,0.55)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.18fr)_minmax(22rem,0.82fr)] lg:items-center">
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

          <h1
            aria-label={heroHeadline}
            className="max-w-4xl text-balance"
          >
            <motion.span
              aria-hidden="true"
              className="block whitespace-nowrap text-5xl font-semibold leading-[0.94] text-white sm:text-6xl lg:text-[clamp(4rem,5.6vw,4.875rem)]"
              initial={headingInitial}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.78,
                delay: contentDelay + 0.12,
                ease: easeOut,
              }}
            >
              {siteConfig.hero.greeting}
            </motion.span>
            <motion.span
              aria-hidden="true"
              className="mt-5 block text-3xl font-semibold leading-tight text-white/42 sm:text-4xl lg:text-[clamp(2.5rem,3.8vw,3.25rem)]"
              initial={headingInitial}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.78,
                delay: contentDelay + 0.28,
                ease: easeOut,
              }}
            >
              {siteConfig.hero.rolePrefix}{" "}
              <span className="text-sky-300/90">
                {siteConfig.hero.roleHighlight}
              </span>
            </motion.span>
          </h1>

          <motion.p
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: contentDelay + 0.64, ease: easeOut }}
            className="mt-7 max-w-3xl text-pretty text-base leading-7 text-white/58 sm:text-lg"
          >
            {siteConfig.hero.intro}
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
            <CardContent className="grid gap-4 p-4 sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200/70">
                Current focus
              </p>
              <div className="grid gap-2.5">
                {skillGroups.map((group) => (
                  <div
                    key={group.label}
                    className="rounded-2xl border border-white/10 bg-black/18 p-3"
                  >
                    <p className="text-sm font-medium text-white">
                      {group.label}
                    </p>
                    <p className="mt-1.5 text-sm leading-5 text-white/58">
                      {group.skills.join(" | ")}
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
