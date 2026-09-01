import type { ReactNode } from "react";

import { PageStarfieldCanvas } from "@/components/site/page-starfield-canvas";
import { cn } from "@/lib/utils";

type PageShellProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function PageShell({
  title,
  subtitle,
  children,
  className,
}: PageShellProps) {
  return (
    <section
      className={cn(
        "relative flex w-full flex-1 flex-col px-5 pb-20 pt-40 sm:px-8 lg:px-10",
        className
      )}
    >
      <PageStarfieldCanvas />
      <div aria-hidden="true" className="page-beam" />
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="max-w-3xl">
          <h1 className="text-balance text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl">
            {title}
            {subtitle ? (
              <span className="mt-3 block text-3xl leading-tight text-white/40 sm:text-4xl">
                {subtitle}
              </span>
            ) : null}
          </h1>
        </div>
        <div className="mt-16">{children}</div>
      </div>
    </section>
  );
}
