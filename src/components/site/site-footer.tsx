"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SocialIcon } from "@/components/site/social-icons";
import { contactLinks, siteConfig } from "@/content/site";

export function SiteFooter() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <footer className="relative border-t border-ink/12 px-5 py-8 text-sm sm:px-10">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6">
        <div>
          <Link
            href="/"
            className="font-medium text-ink outline-none focus-visible:ring-2 focus-visible:ring-blue"
          >
            {siteConfig.name}
          </Link>
          <p className="mt-1 text-ink/55">
            {siteConfig.role}, {siteConfig.location}. {siteConfig.availability}.
          </p>
        </div>
        <nav aria-label="Profiles" className="flex gap-4">
          {contactLinks.map((link) =>
            link.icon ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={link.label}
                className="text-ink/70 outline-none transition-colors hover:text-blue focus-visible:ring-2 focus-visible:ring-blue"
              >
                <SocialIcon icon={link.icon} className="size-5" />
              </a>
            ) : null
          )}
        </nav>
      </div>
    </footer>
  );
}
