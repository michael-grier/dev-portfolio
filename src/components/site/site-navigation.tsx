"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { navItems, siteConfig } from "@/content/site";
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

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6">
      <nav
        aria-label="Primary"
        className="pointer-events-auto hidden h-14 min-w-[560px] items-center justify-between rounded-full border border-white/15 bg-white/12 px-3 text-sm text-white shadow-2xl shadow-sky-950/30 backdrop-blur-2xl md:flex"
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

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-full px-3 py-2 text-xs font-medium text-white/68 outline-none transition hover:bg-white/12 hover:text-white focus-visible:ring-2 focus-visible:ring-sky-300",
                  isActive && "bg-white/16 text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="pointer-events-auto flex w-full max-w-sm items-center justify-between rounded-full border border-white/15 bg-white/12 px-2 py-2 text-white shadow-2xl shadow-sky-950/30 backdrop-blur-2xl md:hidden">
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
      </div>
    </header>
  );
}
