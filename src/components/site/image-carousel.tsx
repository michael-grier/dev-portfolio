"use client";

import Image from "next/image";
import { useCallback, useState, useSyncExternalStore } from "react";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { ProjectImage } from "@/content/site";
import { cn } from "@/lib/utils";

type ImageCarouselProps = {
  name: string;
  images: ProjectImage[];
};

const arrowClassName =
  "z-10 size-9 border-ink/20 bg-paper/50 text-blue/65 hover:border-blue/65 hover:bg-paper/70 hover:text-blue/85 focus-visible:border-blue focus-visible:ring-blue motion-reduce:transition-none [@media(hover:hover)]:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100";

export function ImageCarousel({ name, images }: ImageCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  // Embla owns selection, including swipes and resize reinitialization.
  const subscribe = useCallback((onChange: () => void) => {
    api?.on("select", onChange).on("reInit", onChange);
    return () => {
      api?.off("select", onChange).off("reInit", onChange);
    };
  }, [api]);
  const current = useSyncExternalStore(
    subscribe,
    () => api?.selectedScrollSnap() ?? 0,
    () => 0,
  );

  const first = images[0];
  if (!first) return null;

  // Keep a stable stage while browsing. Size each image to its own aspect ratio
  // so rounded corners follow the screenshot even when it leaves empty space.
  // The height cap prevents portrait app screens from taking over the viewport.
  const aspectRatio = first.src.width / first.src.height;
  const multiple = images.length > 1;

  // Clip the captured window edge as well as its corners so it cannot form a
  // straight dark border that stops abruptly at the carousel's rounded outline.
  return (
    <Carousel
      aria-label={`${name} images`}
      className="group mx-auto w-full min-w-0 self-start overflow-hidden bg-muted [clip-path:inset(2px_round_8px)]"
      opts={{
        loop: multiple,
        watchDrag: multiple,
        breakpoints: { "(prefers-reduced-motion: reduce)": { duration: 0 } },
      }}
      setApi={setApi}
      style={{ maxWidth: aspectRatio < 1 ? `calc(55svh * ${aspectRatio})` : undefined }}
    >
      <CarouselContent className="ml-0 touch-pan-y">
        {images.map((image, index) => (
          <CarouselItem
            aria-label={`${index + 1} of ${images.length}`}
            aria-hidden={index !== current}
            className="pl-0"
            key={image.src.src}
          >
            <div className="relative" style={{ aspectRatio }}>
              <Image
                src={image.src}
                alt={image.alt}
                sizes="(min-width: 1600px) 895px, (min-width: 1280px) calc((100vw - 128px) * 1.55 / 2.55), (min-width: 640px) calc(100vw - 80px), calc(100vw - 40px)"
                className="absolute inset-0 m-auto h-auto max-h-full w-auto max-w-full rounded-[8px]"
                loading={index === 0 ? "eager" : "lazy"}
                draggable={false}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {multiple && (
        <>
          <span
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          >
            Image {current + 1} of {images.length}
          </span>
          <CarouselPrevious className={cn(arrowClassName, "left-3")} />
          <CarouselNext className={cn(arrowClassName, "right-3")} />
          <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center px-1">
            {images.map((image, index) => (
              <button
                type="button"
                key={image.src.src}
                aria-label={`Go to image ${index + 1}`}
                aria-current={index === current ? "true" : undefined}
                className="group/dot flex size-7 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-blue"
                onClick={() => api?.scrollTo(index)}
              >
                <span className={cn(
                  "h-1.5 rounded-full bg-blue/60 ring-1 ring-paper/40 transition-all group-hover/dot:bg-blue/85 motion-reduce:transition-none",
                  index === current ? "w-4" : "w-1.5",
                )} />
              </button>
            ))}
          </div>
        </>
      )}
    </Carousel>
  );
}
