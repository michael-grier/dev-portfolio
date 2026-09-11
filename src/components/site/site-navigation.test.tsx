import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SiteNavigation } from "./site-navigation";

const usePathname = vi.fn<() => string>();
vi.mock("next/navigation", () => ({ usePathname: () => usePathname() }));

describe("SiteNavigation", () => {
  it("marks the current route and nothing else", () => {
    usePathname.mockReturnValue("/projects");
    render(<SiteNavigation />);

    const nav = screen.getByRole("navigation", { name: "Primary" });
    const links = nav.querySelectorAll("a");
    const current = nav.querySelectorAll("[aria-current='page']");

    expect(links.length).toBeGreaterThan(1);
    expect(current).toHaveLength(1);
    expect(current[0]).toHaveTextContent("Projects");
  });

  it("marks nothing on the home page, which is reached through the name link", () => {
    usePathname.mockReturnValue("/");
    render(<SiteNavigation />);

    expect(document.querySelector("[aria-current='page']")).toBeNull();
    expect(screen.getByRole("link", { name: "Michael Grier" })).toHaveAttribute("href", "/");
  });
});
