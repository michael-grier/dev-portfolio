"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

type HeroLightfieldCanvasProps = {
  className?: string;
};

const STREAKS = [
  { angle: -2.88, width: 1.2, alpha: 0.34, speed: 0.34, length: 0.85 },
  { angle: -2.63, width: 2.2, alpha: 0.28, speed: 0.28, length: 0.78 },
  { angle: -2.41, width: 0.8, alpha: 0.22, speed: 0.43, length: 0.92 },
  { angle: -2.16, width: 2.8, alpha: 0.3, speed: 0.24, length: 0.82 },
  { angle: -1.96, width: 0.9, alpha: 0.22, speed: 0.37, length: 0.7 },
  { angle: -1.74, width: 2.6, alpha: 0.26, speed: 0.31, length: 0.9 },
  { angle: -1.5, width: 1.1, alpha: 0.2, speed: 0.41, length: 0.78 },
  { angle: -1.28, width: 3.1, alpha: 0.34, speed: 0.26, length: 0.95 },
  { angle: -1.05, width: 1.2, alpha: 0.24, speed: 0.32, length: 0.72 },
  { angle: -0.82, width: 2.2, alpha: 0.24, speed: 0.44, length: 0.88 },
  { angle: -0.58, width: 0.9, alpha: 0.2, speed: 0.38, length: 0.76 },
  { angle: -0.32, width: 3.2, alpha: 0.3, speed: 0.29, length: 0.96 },
  { angle: -0.08, width: 1.1, alpha: 0.22, speed: 0.34, length: 0.82 },
  { angle: 0.22, width: 2.4, alpha: 0.28, speed: 0.24, length: 0.9 },
  { angle: 0.47, width: 1, alpha: 0.18, speed: 0.36, length: 0.74 },
  { angle: 0.72, width: 2.8, alpha: 0.29, speed: 0.31, length: 0.92 },
  { angle: 0.98, width: 1.2, alpha: 0.22, speed: 0.4, length: 0.78 },
  { angle: 1.24, width: 3.4, alpha: 0.32, speed: 0.27, length: 0.98 },
  { angle: 1.48, width: 1.2, alpha: 0.2, speed: 0.36, length: 0.84 },
  { angle: 1.72, width: 2.8, alpha: 0.3, speed: 0.29, length: 0.94 },
  { angle: 1.96, width: 1, alpha: 0.2, speed: 0.42, length: 0.76 },
  { angle: 2.22, width: 2.6, alpha: 0.27, speed: 0.33, length: 0.9 },
  { angle: 2.48, width: 0.9, alpha: 0.2, speed: 0.4, length: 0.78 },
  { angle: 2.72, width: 2.2, alpha: 0.3, speed: 0.28, length: 0.86 },
];

function drawLightfield(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  reducedMotion: boolean
) {
  context.clearRect(0, 0, width, height);

  const focalX = width * 0.52;
  const focalY = height * 0.55;
  const diagonal = Math.hypot(width, height);
  const pulse = reducedMotion ? 0.65 : 0.62 + Math.sin(time * 0.0016) * 0.2;
  const bloom = context.createRadialGradient(
    focalX,
    focalY,
    0,
    focalX,
    focalY,
    diagonal * 0.42
  );

  bloom.addColorStop(0, `rgba(235, 249, 255, ${0.35 + pulse * 0.18})`);
  bloom.addColorStop(0.08, `rgba(125, 211, 252, ${0.16 + pulse * 0.08})`);
  bloom.addColorStop(0.34, "rgba(14, 165, 233, 0.08)");
  bloom.addColorStop(1, "rgba(2, 6, 23, 0)");

  context.globalCompositeOperation = "source-over";
  context.fillStyle = bloom;
  context.fillRect(0, 0, width, height);

  context.globalCompositeOperation = "screen";

  STREAKS.forEach((streak, index) => {
    const motionOffset = reducedMotion
      ? 0
      : Math.sin(time * 0.001 * streak.speed + index * 0.74) * 0.045;
    const angle = streak.angle + motionOffset;
    const drift = reducedMotion
      ? 0
      : Math.sin(time * 0.0008 * streak.speed + index) * 18;
    const startX = focalX + Math.cos(angle) * (8 + drift);
    const startY = focalY + Math.sin(angle) * (8 + drift);
    const endX = focalX + Math.cos(angle) * diagonal * streak.length;
    const endY = focalY + Math.sin(angle) * diagonal * streak.length;
    const gradient = context.createLinearGradient(startX, startY, endX, endY);
    const brightness = streak.alpha * (0.68 + pulse * 0.48);

    gradient.addColorStop(0, `rgba(255, 255, 255, ${brightness * 0.72})`);
    gradient.addColorStop(0.08, `rgba(191, 232, 255, ${brightness})`);
    gradient.addColorStop(0.38, `rgba(56, 189, 248, ${brightness * 0.48})`);
    gradient.addColorStop(1, "rgba(2, 6, 23, 0)");

    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.strokeStyle = gradient;
    context.lineWidth = streak.width * (width > 700 ? 1.4 : 0.9);
    context.stroke();
  });

  context.globalCompositeOperation = "source-over";
}

export function HeroLightfieldCanvas({ className }: HeroLightfieldCanvasProps) {
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

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    const reducedMotion = Boolean(shouldReduceMotion);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      drawLightfield(context, width, height, 0, reducedMotion);
    };

    const render = (time: number) => {
      drawLightfield(context, width, height, time, reducedMotion);

      if (!reducedMotion) {
        animationFrame = window.requestAnimationFrame(render);
      }
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
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
