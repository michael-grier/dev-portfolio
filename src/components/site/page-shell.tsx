import type { ReactNode } from "react";

import { PageLightfield } from "@/components/site/riso-lightfield";
import { cn } from "@/lib/utils";

type PageShellProps = {
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function PageShell({ title, intro, children, className, contentClassName }: PageShellProps) {
  return (
    <section
      className={cn(
        "relative flex w-full flex-1 flex-col px-5 pb-32 pt-32 sm:px-10 sm:pt-40",
        className
      )}
    >
      <PageLightfield />
      <div className={cn("relative mx-auto w-full max-w-6xl", contentClassName)}>
        <h1 className="max-w-3xl text-balance text-[clamp(2.4rem,5.5vw,4.5rem)] font-medium leading-[1] tracking-[-0.015em] text-ink">
          {title}
        </h1>
        {intro ? (
          <p className="mt-5 max-w-xl text-pretty text-lg leading-7 text-ink/70">
            {intro}
          </p>
        ) : null}
        <div className="mt-16">{children}</div>
      </div>
    </section>
  );
}
