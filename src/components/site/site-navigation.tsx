"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type FocusEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu } from "lucide-react";

import { contactLinks, navItems, siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SiteNavigation() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [isContactPanelOpen, setIsContactPanelOpen] = useState(false);
  const contactPanelId = "site-contact-panel";
  const isHomePage = pathname === "/";
  const desktopRevealDelay = shouldReduceMotion ? 0 : isHomePage ? 1.5 : 0.62;
  const mobileRevealDelay = shouldReduceMotion ? 0 : isHomePage ? 1.4 : 0.42;

  const handleDesktopBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsContactPanelOpen(false);
    }
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: -18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.72, delay: desktopRevealDelay, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto relative hidden md:block"
        onPointerLeave={() => setIsContactPanelOpen(false)}
        onBlur={handleDesktopBlur}
      >
        <nav
          aria-label="Primary"
          className="flex h-14 min-w-[560px] items-center justify-between rounded-full border border-white/15 bg-white/12 px-3 text-sm text-white shadow-2xl shadow-sky-950/30 backdrop-blur-2xl"
        >
          <Link
            href="/"
            className="rounded-full px-4 py-2 font-semibold text-white outline-none transition focus-visible:ring-2 focus-visible:ring-sky-300"
          >
            {siteConfig.name}
          </Link>
          <div className="flex items-center gap-1">
            {navItems.slice(1).map((item) => {
              const isActive = pathname === item.href;
              const opensContactPanel = item.href === "/contact";

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  aria-controls={opensContactPanel ? contactPanelId : undefined}
                  aria-expanded={
                    opensContactPanel ? isContactPanelOpen : undefined
                  }
                  onPointerEnter={
                    opensContactPanel
                      ? () => setIsContactPanelOpen(true)
                      : undefined
                  }
                  onFocusCapture={
                    opensContactPanel
                      ? () => setIsContactPanelOpen(true)
                      : undefined
                  }
                  className={cn(
                    "rounded-full px-3 py-2 text-xs font-medium text-white/68 outline-none transition hover:bg-white/12 hover:text-white focus-visible:ring-2 focus-visible:ring-sky-300",
                    (isActive || (opensContactPanel && isContactPanelOpen)) &&
                      "bg-white/16 text-white"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <AnimatePresence>
          {isContactPanelOpen ? (
            <motion.div
              id={contactPanelId}
              key="contact-panel"
              role="region"
              aria-label="Contact options"
              initial={shouldReduceMotion ? false : { opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-1/2 top-[calc(100%+12px)] w-[420px] -translate-x-1/2 rounded-[28px] border border-white/14 bg-white/14 p-5 text-white shadow-2xl shadow-sky-950/40 backdrop-blur-2xl"
              onPointerEnter={() => setIsContactPanelOpen(true)}
            >
              <div className="grid grid-cols-[1fr_1.1fr] gap-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200/72">
                    Availability
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/72">
                    {siteConfig.availability}
                  </p>
                  <p className="mt-4 text-xs text-white/42">
                    {siteConfig.location}
                  </p>
                </div>
                <div className="grid gap-1">
                  {contactLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={
                          link.href.startsWith("http")
                            ? "noreferrer noopener"
                            : undefined
                        }
                        className="group flex items-center justify-between gap-3 rounded-2xl px-3 py-2.5 text-sm text-white/68 outline-none transition hover:bg-white/12 hover:text-white focus-visible:ring-2 focus-visible:ring-sky-300"
                      >
                        <span className="flex items-center gap-3">
                          <Icon className="size-4 text-sky-200/72" />
                          {link.label}
                        </span>
                        <ArrowUpRight className="size-3.5 text-white/36 transition group-hover:text-white" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: -16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.62, delay: mobileRevealDelay, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto flex w-full max-w-sm items-center justify-between rounded-full border border-white/15 bg-white/12 px-2 py-2 text-white shadow-2xl shadow-sky-950/30 backdrop-blur-2xl md:hidden"
      >
        <Link
          href="/"
          className="rounded-full px-4 py-2 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
        >
          {siteConfig.name}
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full text-white hover:bg-white/14 hover:text-white"
              aria-label="Open navigation"
            >
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="top"
            className="inset-x-4 top-4 h-auto rounded-[28px] border border-white/15 bg-white/14 p-0 text-white shadow-2xl shadow-sky-950/40 backdrop-blur-2xl"
          >
            <SheetHeader className="px-5 pb-2 pt-5">
              <SheetTitle className="text-white">{siteConfig.name}</SheetTitle>
              <SheetDescription className="text-white/62">
                {siteConfig.role}
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-1 px-3 pb-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-white/70 outline-none transition hover:bg-white/12 hover:text-white focus-visible:ring-2 focus-visible:ring-sky-300",
                        isActive && "bg-white/16 text-white"
                      )}
                    >
                      <Icon className="size-4" />
                      {item.label}
                    </Link>
                  </SheetClose>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </motion.div>
    </header>
  );
}
