"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

// Low-density companion to HeroLightfieldCanvas: the same seeded-speck
// language at a fraction of the cost, so inner pages share the hero's sky
// without replaying its intro burst.

type Star = {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
  driftPhase: number;
  color: string;
};

const MAX_PIXEL_RATIO = 1.5;
const STAR_COLORS = ["255, 255, 255", "186, 230, 253", "125, 211, 252"];

function pseudoRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;

  return value - Math.floor(value);
}

function createStars(width: number, height: number): Star[] {
  const count = Math.min(70, Math.max(30, Math.floor((width * height) / 32000)));

  return Array.from({ length: count }, (_, index) => {
    const seed = index + 1;

    return {
      x: pseudoRandom(seed) * width,
      y: pseudoRandom(seed + 100) * height,
      size: 0.5 + pseudoRandom(seed + 200) * 1,
      baseAlpha: 0.14 + pseudoRandom(seed + 300) * 0.34,
      twinkleSpeed: 0.00025 + pseudoRandom(seed + 400) * 0.00045,
      phase: pseudoRandom(seed + 500) * Math.PI * 2,
      driftPhase: pseudoRandom(seed + 600) * Math.PI * 2,
      color: STAR_COLORS[index % STAR_COLORS.length],
    };
  });
}

function drawStars(
  context: CanvasRenderingContext2D,
  stars: Star[],
  width: number,
  height: number,
  time: number,
  reducedMotion: boolean
) {
  context.clearRect(0, 0, width, height);

  for (const star of stars) {
    const twinkle = reducedMotion
      ? 1
      : 0.55 + Math.sin(time * star.twinkleSpeed + star.phase) * 0.45;
    const driftX = reducedMotion
      ? 0
      : Math.sin(time * 0.00006 + star.driftPhase) * 6;
    const driftY = reducedMotion
      ? 0
      : Math.cos(time * 0.00005 + star.driftPhase) * 4;

    context.beginPath();
    context.arc(
      star.x + driftX,
      star.y + driftY,
      star.size,
      0,
      Math.PI * 2
    );
    context.fillStyle = `rgba(${star.color}, ${star.baseAlpha * twinkle})`;
    context.fill();
  }
}

export function PageStarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: true });

    if (!context) {
      return;
    }

    const reducedMotion = Boolean(shouldReduceMotion);
    let animationFrame = 0;
    let stars: Star[] = [];
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const scale = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);

      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * scale);
      canvas.height = Math.floor(height * scale);
      context.setTransform(scale, 0, 0, scale, 0, 0);
      stars = createStars(width, height);
      drawStars(context, stars, width, height, 0, reducedMotion);
    };

    const render = (time: number) => {
      drawStars(context, stars, width, height, time, reducedMotion);
      animationFrame = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);

    if (!reducedMotion) {
      animationFrame = window.requestAnimationFrame(render);
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 h-full w-full"
    />
  );
}
