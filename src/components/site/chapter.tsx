import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ChapterProps = {
  number: string;
  title: string;
  children: ReactNode;
  // Rows nested under a page section use h3 so the outline stays honest.
  headingLevel?: "h2" | "h3";
  className?: string;
};

// One numbered row of a page that reads top to bottom: label left, content right.
export function Chapter({ number, title, children, headingLevel = "h2", className }: ChapterProps) {
  const Heading = headingLevel;
  return (
    <section
      className={cn(
        "grid gap-6 border-t border-ink/12 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-14",
        className
      )}
    >
      <Heading className="text-lg font-medium">
        <span className="mr-3 text-blue">{number}</span>
        {title}
      </Heading>
      <div className="max-w-xl">{children}</div>
    </section>
  );
}
