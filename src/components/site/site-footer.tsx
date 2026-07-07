"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

import { contactLinks, navItems, siteConfig } from "@/content/site";

export function SiteFooter() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <footer className="border-t border-white/10 bg-background/72 px-5 py-10 text-white backdrop-blur-xl sm:px-8 lg:px-10">
      <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-[1fr_auto_auto] md:items-start">
        <div className="max-w-md">
          <Link
            href="/"
            className="font-semibold outline-none transition hover:text-sky-100 focus-visible:ring-2 focus-visible:ring-sky-300"
          >
            {siteConfig.name}
          </Link>
          <p className="mt-3 text-sm leading-6 text-white/56">
            {siteConfig.headline}
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-sky-200/62">
            {siteConfig.location} / {siteConfig.availability}
          </p>
        </div>

        <nav aria-label="Footer navigation" className="grid gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-200/62">
            Pages
          </p>
          <div className="grid gap-2">
            {navItems.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-white/58 outline-none transition hover:text-white focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <nav aria-label="Footer contact links" className="grid gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-200/62">
            Contact
          </p>
          <div className="grid gap-2">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http") ? "noreferrer noopener" : undefined
                }
                className="group flex items-center gap-2 text-sm text-white/58 outline-none transition hover:text-white focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                {link.label}
                {link.href.startsWith("http") ? (
                  <ArrowUpRight className="size-3.5 text-white/34 transition group-hover:text-white/70" />
                ) : null}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </footer>
  );
}
