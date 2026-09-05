"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

import { navItems, siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteNavigation() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  // On the landing page the links wait for the flash; elsewhere they are just there.
  const revealDelay = shouldReduceMotion || pathname !== "/" ? 0 : 1.5;

  // Below lg the header gets a translucent paper band so the links stay legible
  // over scrolled text; on wider screens it stays transparent over the light.
  return (
    <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between gap-4 bg-paper/85 px-5 py-4 text-[15px] backdrop-blur-md sm:px-10 sm:py-5 sm:text-base lg:bg-transparent lg:py-6 lg:text-[17px] lg:backdrop-blur-none">
      <Link
        href="/"
        className="whitespace-nowrap font-medium text-ink outline-none focus-visible:ring-2 focus-visible:ring-blue"
      >
        {siteConfig.name}
      </Link>
      <motion.nav
        aria-label="Primary"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: revealDelay }}
        className="flex gap-4 text-ink/80 sm:gap-7"
      >
        {navItems
          .filter((item) => item.href !== "/")
          .map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "outline-none transition-colors hover:text-blue focus-visible:ring-2 focus-visible:ring-blue",
                  isActive && "text-blue"
                )}
              >
                {item.label}
              </Link>
            );
          })}
      </motion.nav>
    </header>
  );
}
