import type { ReactNode } from "react";

type ChapterProps = {
  number: string;
  title: string;
  children: ReactNode;
};

// One numbered row of a page that reads top to bottom: label left, content right.
export function Chapter({ number, title, children }: ChapterProps) {
  return (
    <section className="grid gap-6 border-t border-ink/12 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-14">
      <h2 className="text-lg font-medium">
        <span className="mr-3 text-blue">{number}</span>
        {title}
      </h2>
      <div className="max-w-xl">{children}</div>
    </section>
  );
}
