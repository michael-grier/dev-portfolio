import { existsSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { contactLinks, featuredProjects, navItems, siteConfig } from "@/content/site";

const appDir = path.resolve(__dirname, "../app");

describe("site content", () => {
  it("uses an absolute site url without a trailing slash", () => {
    expect(siteConfig.url).toMatch(/^https:\/\/[^/]+$/);
  });

  it("only links navigation to routes that exist", () => {
    for (const item of navItems) {
      expect(existsSync(path.join(appDir, item.href, "page.tsx")), item.href).toBe(true);
    }
  });

  it("gives every project a GitHub repo and alt text on every image", () => {
    for (const project of featuredProjects) {
      expect(project.repo, project.title).toMatch(/^https:\/\/github\.com\/michael-grier\//);
      for (const image of project.images ?? []) {
        expect(image.alt.trim().length, project.title).toBeGreaterThan(0);
      }
    }
  });

  it("keeps contact hrefs well formed", () => {
    for (const link of contactLinks) {
      expect(link.href, link.label).toMatch(/^(https:\/\/|mailto:)/);
    }
  });
});
