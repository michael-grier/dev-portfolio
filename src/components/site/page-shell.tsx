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
        "relative isolate flex w-full flex-1 flex-col overflow-hidden px-5 pb-16 pt-32 sm:px-8 lg:px-10",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_20%_18%,rgba(125,211,252,0.2),transparent_18rem),radial-gradient(circle_at_82%_12%,rgba(56,189,248,0.16),transparent_20rem)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-24 -z-10 h-px bg-gradient-to-r from-transparent via-sky-200/18 to-transparent"
      />
      <div className="mx-auto w-full max-w-6xl">
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
      </div>
    </section>
  );
}
