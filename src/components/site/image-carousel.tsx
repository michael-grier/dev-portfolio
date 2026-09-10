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

// Every project gets the same 16:9 stage. A landscape screenshot fills it
// edge to edge; portrait phone screens are narrow enough to sit three per slide.
const PHONES_PER_SLIDE = 3;

function isPortrait(image: ProjectImage) {
  return image.src.height > image.src.width;
}

function groupSlides(images: ProjectImage[]): ProjectImage[][] {
  const slides: ProjectImage[][] = [];
  let run: ProjectImage[] = [];
  const flushRun = () => {
    // Spread the run evenly, fuller slides first, so the last is never a lone phone.
    const count = Math.ceil(run.length / PHONES_PER_SLIDE);
    for (let i = 0; i < count; i += 1) {
      slides.push(run.slice(Math.ceil((i * run.length) / count), Math.ceil(((i + 1) * run.length) / count)));
    }
    run = [];
  };
  for (const image of images) {
    if (isPortrait(image)) {
      run.push(image);
    } else {
      flushRun();
      slides.push([image]);
    }
  }
  flushRun();
  return slides;
}

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

  const slides = groupSlides(images);
  const currentSlide = slides[current];
  if (!currentSlide) return null;
  const multiple = slides.length > 1;

  return (
    <figure>
      <Carousel
        aria-label={`${name} images`}
        className="group overflow-hidden rounded-sm border border-ink/14 bg-muted"
        opts={{
          loop: multiple,
          watchDrag: multiple,
          breakpoints: { "(prefers-reduced-motion: reduce)": { duration: 0 } },
        }}
        setApi={setApi}
      >
        <CarouselContent className="ml-0 touch-pan-y">
          {slides.map((slide, index) => (
            <CarouselItem
              aria-label={`${index + 1} of ${slides.length}`}
              aria-hidden={index !== current}
              className="pl-0"
              key={slide[0]?.src.src}
            >
              {slide.every(isPortrait) ? (
                <div
                  className={cn(
                    "flex aspect-video items-center justify-center gap-5 p-6 sm:gap-8 sm:p-10",
                    // Leave room for the dots under the phones.
                    multiple && "pb-12 sm:pb-12",
                  )}
                >
                  {slide.map((image) => (
                    <Image
                      key={image.src.src}
                      src={image.src}
                      // The caption below the frame describes the slide, so the
                      // image itself stays silent to screen readers.
                      alt=""
                      sizes="(min-width: 1152px) 360px, 33vw"
                      className="h-auto max-h-full w-auto max-w-full min-w-0 rounded-[6px] border border-ink/10 object-contain"
                      // The whole first slide is visible at once, so it all loads with the page.
                      loading={index === 0 ? "eager" : "lazy"}
                      draggable={false}
                    />
                  ))}
                </div>
              ) : (
                <div className="relative aspect-video">
                  {slide.map((image) => (
                    <Image
                      key={image.src.src}
                      src={image.src}
                      alt=""
                      fill
                      sizes="(min-width: 1152px) 1152px, 100vw"
                      className="object-cover"
                      loading={index === 0 ? "eager" : "lazy"}
                      draggable={false}
                    />
                  ))}
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        {multiple && (
          <>
            <CarouselPrevious className={cn(arrowClassName, "left-3")} />
            <CarouselNext className={cn(arrowClassName, "right-3")} />
            <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center px-1">
              {slides.map((slide, index) => (
                <button
                  type="button"
                  key={slide[0]?.src.src}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === current ? "true" : undefined}
                  className="group/dot flex size-7 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-blue"
                  onClick={() => api?.scrollTo(index)}
                >
                  <span className={cn(
                    // Inactive dots match the arrows: translucent paper with a faint ink edge.
                    "h-1.5 rounded-full ring-1 ring-ink/20 transition-all motion-reduce:transition-none",
                    index === current
                      ? "w-4 bg-blue"
                      : "w-1.5 bg-paper/50 group-hover/dot:bg-paper/70",
                  )} />
                </button>
              ))}
            </div>
          </>
        )}
      </Carousel>
      <figcaption aria-live="polite" className="mt-3 text-sm leading-5 text-ink/55">
        {multiple && <span className="mr-2 text-blue">{current + 1}/{slides.length}</span>}
        {currentSlide.map((image) => image.alt).join(" ")}
      </figcaption>
    </figure>
  );
}
