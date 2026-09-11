import { describe, expect, it } from "vitest";

import { navItems, siteConfig } from "@/content/site";

import robots from "./robots";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("lists every navigation route as an absolute url", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toEqual(navItems.map((item) => `${siteConfig.url}${item.href}`));
  });

  it("ranks the home page highest", () => {
    const [home, ...rest] = sitemap();
    expect(home.url).toBe(siteConfig.url + "/");
    expect(home.priority).toBe(1);
    for (const entry of rest) expect(entry.priority).toBeLessThan(1);
  });
});

describe("robots", () => {
  it("allows crawling and points at the absolute sitemap", () => {
    const result = robots();
    expect(result.rules).toEqual({ userAgent: "*", allow: "/" });
    expect(result.sitemap).toBe(`${siteConfig.url}/sitemap.xml`);
  });
});
