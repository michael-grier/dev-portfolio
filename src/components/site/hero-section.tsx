"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { RisoLightfield } from "@/components/site/riso-lightfield";
import { siteConfig } from "@/content/site";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  // Copy waits for the ink flood to settle.
  const contentDelay = shouldReduceMotion ? 0 : 1.25;
  const initial = shouldReduceMotion ? false : { opacity: 0, y: 8 };

  return (
    <section className="relative h-[100svh] overflow-hidden">
      <RisoLightfield
        className="absolute inset-0"
        focal={{ x: 0.8, y: 0.3 }}
        intro
        intensity={1.4}
        spread={1.5}
        drift={0.5}
      />

      <div className="absolute inset-x-0 bottom-0 px-5 pb-10 sm:px-10 sm:pb-12">
        <motion.h1
          initial={initial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: contentDelay, ease: easeOut }}
          className="max-w-4xl text-balance text-[clamp(2.4rem,6.5vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.015em] text-ink"
        >
          {siteConfig.hero.greeting}
          <br />
          <span className="text-ink/50">{siteConfig.hero.subtitle}</span>
        </motion.h1>

        <motion.div
          initial={initial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: contentDelay + 0.3, ease: easeOut }}
          className="mt-8 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end"
        >
          <p className="max-w-lg text-pretty text-[17px] leading-7 text-ink/75">
            {siteConfig.hero.intro}
          </p>
          <div className="flex items-center gap-5 text-[15px] font-medium">
            <Button asChild size="lg" className="h-11 px-5 text-[15px]">
              <Link href="/projects">View projects</Link>
            </Button>
            <Link
              href="/resume"
              className="text-ink underline decoration-ink/30 underline-offset-4 outline-none transition-colors hover:text-blue hover:decoration-blue focus-visible:ring-2 focus-visible:ring-blue"
            >
              Resume
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
