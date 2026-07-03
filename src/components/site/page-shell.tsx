import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageShellProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function PageShell({
  eyebrow,
  title,
  description,
  children,
  className,
}: PageShellProps) {
  return (
    <section
      className={cn(
        "mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pb-16 pt-32 sm:px-8 lg:px-10",
        className
      )}
    >
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-sky-200/72">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-balance text-4xl font-semibold leading-tight tracking-normal text-white sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-white/62 sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
      <div className="mt-10">{children}</div>
    </section>
  );
}
