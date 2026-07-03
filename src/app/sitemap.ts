import type { MetadataRoute } from "next";

import { navItems, siteConfig } from "@/content/site";

const lastModified = new Date("2026-07-03T00:00:00.000Z");
const baseUrl = siteConfig.url.replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  return navItems.map((item) => ({
    url: `${baseUrl}${item.href}`,
    lastModified,
    changeFrequency: item.href === "/" ? "monthly" : "yearly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
