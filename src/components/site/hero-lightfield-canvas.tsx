"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

type HeroLightfieldCanvasProps = {
  className?: string;
};

type LightfieldLayer = {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  focalX: number;
  focalY: number;
  diagonal: number;
};

type TaperedRayOptions = {
  angle: number;
  length: number;
  endWidth: number;
  alpha: number;
  apexOffset?: number;
  apexWidth?: number;
  shadowBlur?: number;
};

const MAX_CANVAS_PIXELS = 1_500_000;
const MAX_PIXEL_RATIO = 1.15;

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

const BURST_ANGLES = [
  -3.02, -2.72, -2.42, -2.16, -1.92, -1.72, -1.55, -1.38, -1.22, -1.02,
  -0.86, -0.66, -0.46, -0.28, -0.12, 0.08, 0.28, 0.46, 0.64, 0.84, 1.02,
  1.18, 1.36, 1.54, 1.72, 1.9, 2.08, 2.24, 2.42, 2.68,
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function getRenderScale(width: number, height: number) {
  const deviceRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
  const pixelBudgetRatio = Math.sqrt(MAX_CANVAS_PIXELS / Math.max(width * height, 1));

  return clamp(Math.min(deviceRatio, pixelBudgetRatio), 0.72, MAX_PIXEL_RATIO);
}

function getIntroFlash(time: number) {
  const reveal = easeOutCubic(clamp(time / 1500, 0, 1));
  const decay = clamp(1 - time / 6200, 0, 1);
  const primaryFlash = Math.exp(-Math.pow((time - 850) / 520, 2));
  const secondaryFlash = Math.exp(-Math.pow((time - 2100) / 720, 2)) * 0.72;
  const finalFlash = Math.exp(-Math.pow((time - 3600) / 1000, 2)) * 0.32;

  return {
    reveal,
    flash: (primaryFlash + secondaryFlash + finalFlash) * decay,
  };
}

function createLayer(
  width: number,
  height: number,
  renderScale: number,
  draw: (context: CanvasRenderingContext2D, layer: LightfieldLayer) => void
) {
  const canvas = document.createElement("canvas");
  const focalX = width * 0.52;
  const focalY = height * 0.55;
  const layer = {
    canvas,
    width,
    height,
    focalX,
    focalY,
    diagonal: Math.hypot(width, height),
  };
  const context = canvas.getContext("2d", { alpha: true });

  canvas.width = Math.max(1, Math.floor(width * renderScale));
  canvas.height = Math.max(1, Math.floor(height * renderScale));

  if (!context) {
    return layer;
  }

  context.setTransform(renderScale, 0, 0, renderScale, 0, 0);
  context.imageSmoothingEnabled = true;
  draw(context, layer);

  return layer;
}

function drawTaperedRay(
  context: CanvasRenderingContext2D,
  layer: LightfieldLayer,
  {
    angle,
    length,
    endWidth,
    alpha,
    apexOffset = 7,
    apexWidth = 0.9,
    shadowBlur = 0,
  }: TaperedRayOptions
) {
  const directionX = Math.cos(angle);
  const directionY = Math.sin(angle);
  const normalX = -directionY;
  const normalY = directionX;
  const startX = layer.focalX + directionX * apexOffset;
  const startY = layer.focalY + directionY * apexOffset;
  const endX = layer.focalX + directionX * layer.diagonal * length;
  const endY = layer.focalY + directionY * layer.diagonal * length;
  const startHalfWidth = apexWidth / 2;
  const endHalfWidth = endWidth / 2;
  const gradient = context.createLinearGradient(startX, startY, endX, endY);

  gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.76})`);
  gradient.addColorStop(0.08, `rgba(224, 244, 255, ${alpha})`);
  gradient.addColorStop(0.22, `rgba(125, 211, 252, ${alpha * 0.58})`);
  gradient.addColorStop(0.56, `rgba(14, 165, 233, ${alpha * 0.24})`);
  gradient.addColorStop(1, "rgba(2, 6, 23, 0)");

  context.save();
  if (shadowBlur > 0) {
    context.shadowColor = `rgba(125, 211, 252, ${alpha * 0.62})`;
    context.shadowBlur = shadowBlur;
  }
  context.beginPath();
  context.moveTo(startX + normalX * startHalfWidth, startY + normalY * startHalfWidth);
  context.lineTo(endX + normalX * endHalfWidth, endY + normalY * endHalfWidth);
  context.lineTo(endX - normalX * endHalfWidth, endY - normalY * endHalfWidth);
  context.lineTo(startX - normalX * startHalfWidth, startY - normalY * startHalfWidth);
  context.closePath();
  context.fillStyle = gradient;
  context.fill();
  context.restore();
}

function drawBaseRays(context: CanvasRenderingContext2D, layer: LightfieldLayer) {
  const { width } = layer;

  context.globalCompositeOperation = "screen";

  STREAKS.forEach((streak, index) => {
    const angle = streak.angle + Math.sin(index * 1.8) * 0.025;
    const brightness = streak.alpha * 0.95;
    const endWidth = streak.width * (width > 700 ? 18 : 12);

    drawTaperedRay(context, layer, {
      angle,
      length: streak.length,
      endWidth,
      alpha: brightness * 0.54,
      apexWidth: 0.8,
      shadowBlur: index % 5 === 0 ? 10 : 0,
    });
    drawTaperedRay(context, layer, {
      angle: angle + Math.sin(index * 1.27) * 0.012,
      length: streak.length * 0.98,
      endWidth: endWidth * 0.28,
      alpha: brightness * 0.74,
      apexWidth: 0.45,
    });
  });
}

function drawSweepRays(context: CanvasRenderingContext2D, layer: LightfieldLayer) {
  const { width } = layer;

  context.globalCompositeOperation = "screen";

  STREAKS.forEach((streak, index) => {
    if (index % 3 !== 1) {
      return;
    }

    const angle = streak.angle + Math.sin(index * 0.7) * 0.05;
    const endWidth = streak.width * (width > 700 ? 26 : 17);
    const alpha = streak.alpha * 0.68;

    drawTaperedRay(context, layer, {
      angle,
      length: streak.length * 1.04,
      endWidth,
      alpha,
      apexWidth: 0.6,
      shadowBlur: 14,
    });
  });
}

function drawBurstRays(context: CanvasRenderingContext2D, layer: LightfieldLayer) {
  const { focalX, focalY, diagonal, width, height } = layer;
  const bloom = context.createRadialGradient(
    focalX,
    focalY,
    0,
    focalX,
    focalY,
    diagonal * 0.38
  );

  context.globalCompositeOperation = "screen";

  bloom.addColorStop(0, "rgba(255, 255, 255, 0.92)");
  bloom.addColorStop(0.08, "rgba(224, 244, 255, 0.72)");
  bloom.addColorStop(0.22, "rgba(56, 189, 248, 0.34)");
  bloom.addColorStop(1, "rgba(2, 6, 23, 0)");

  context.fillStyle = bloom;
  context.fillRect(0, 0, width, height);

  BURST_ANGLES.forEach((baseAngle, index) => {
    const angle = baseAngle + Math.sin(index * 0.9) * 0.035;
    const broadRay = index % 4 === 0;
    const alpha = broadRay ? 0.94 : 0.72;
    const endWidth = (broadRay ? 130 : 58) * (width > 700 ? 1 : 0.72);

    drawTaperedRay(context, layer, {
      angle,
      length: 1.12,
      endWidth,
      alpha: alpha * 0.82,
      apexOffset: 10,
      apexWidth: broadRay ? 1.6 : 0.8,
      shadowBlur: broadRay ? 18 : 8,
    });
    drawTaperedRay(context, layer, {
      angle,
      length: 1.08,
      endWidth: endWidth * 0.24,
      alpha: alpha * 0.92,
      apexOffset: 8,
      apexWidth: 0.4,
    });
  });
}

function drawFocalBloom(
  context: CanvasRenderingContext2D,
  focalX: number,
  focalY: number,
  width: number,
  height: number,
  diagonal: number,
  pulse: number
) {
  const bloom = context.createRadialGradient(
    focalX,
    focalY,
    0,
    focalX,
    focalY,
    diagonal * 0.42
  );

  bloom.addColorStop(0, `rgba(235, 249, 255, ${0.32 + pulse * 0.16})`);
  bloom.addColorStop(0.08, `rgba(125, 211, 252, ${0.14 + pulse * 0.08})`);
  bloom.addColorStop(0.34, "rgba(14, 165, 233, 0.07)");
  bloom.addColorStop(1, "rgba(2, 6, 23, 0)");

  context.globalCompositeOperation = "source-over";
  context.fillStyle = bloom;
  context.fillRect(0, 0, width, height);
}

function drawLayer(
  context: CanvasRenderingContext2D,
  layer: LightfieldLayer,
  alpha: number,
  offsetX: number,
  offsetY: number,
  rotation: number,
  scale: number
) {
  context.save();
  context.globalCompositeOperation = "screen";
  context.globalAlpha = clamp(alpha, 0, 1);
  context.translate(layer.focalX + offsetX, layer.focalY + offsetY);
  context.rotate(rotation);
  context.scale(scale, scale);
  context.translate(-layer.focalX, -layer.focalY);
  context.drawImage(layer.canvas, 0, 0, layer.width, layer.height);
  context.restore();
}

function drawLightfield(
  context: CanvasRenderingContext2D,
  baseLayer: LightfieldLayer,
  sweepLayer: LightfieldLayer,
  burstLayer: LightfieldLayer,
  time: number,
  reducedMotion: boolean
) {
  const { width, height, diagonal } = baseLayer;
  const driftX = reducedMotion ? 0 : Math.sin(time * 0.00036) * 34;
  const driftY = reducedMotion ? 0 : Math.cos(time * 0.00042) * 24;
  const focalX = baseLayer.focalX + driftX;
  const focalY = baseLayer.focalY + driftY;
  const pulse = reducedMotion ? 0.62 : 0.56 + Math.sin(time * 0.0017) * 0.26;
  const ambientAlpha = reducedMotion ? 0.78 : 0.72 + Math.sin(time * 0.00135) * 0.14;
  const motionRamp = reducedMotion ? 0 : easeOutCubic(clamp(time / 1700, 0, 1));
  const sweepAlpha = reducedMotion
    ? 0
    : motionRamp * (0.24 + Math.sin(time * 0.00105) * 0.12);

  context.clearRect(0, 0, width, height);
  drawFocalBloom(context, focalX, focalY, width, height, diagonal, pulse);
  drawLayer(
    context,
    baseLayer,
    ambientAlpha,
    driftX * 0.42,
    driftY * 0.42,
    reducedMotion ? 0 : Math.sin(time * 0.00018) * 0.028,
    reducedMotion ? 1 : 1 + Math.sin(time * 0.00024) * 0.032
  );

  if (!reducedMotion) {
    drawLayer(
      context,
      sweepLayer,
      sweepAlpha,
      Math.sin(time * 0.00062) * 42,
      Math.cos(time * 0.00048) * 30,
      Math.sin(time * 0.00034) * 0.058,
      1.03 + Math.sin(time * 0.0004) * 0.05
    );
    drawLayer(
      context,
      sweepLayer,
      sweepAlpha * 0.58,
      Math.sin(time * 0.00052 + 1.8) * -34,
      Math.cos(time * 0.00044 + 0.7) * -24,
      Math.cos(time * 0.00028) * -0.046,
      1.08 + Math.cos(time * 0.00036) * 0.04
    );
  }

  if (!reducedMotion) {
    const { reveal, flash } = getIntroFlash(time);

    if (flash > 0.012) {
      const flashAlpha = clamp(flash * 1.4, 0, 1);
      const burstScale = 0.86 + reveal * 0.16 + flash * 0.07;

      drawLayer(
        context,
        burstLayer,
        flashAlpha,
        driftX * 0.55,
        driftY * 0.55,
        Math.sin(time * 0.00055) * 0.018,
        burstScale
      );
      drawLayer(
        context,
        burstLayer,
        flashAlpha * 0.36,
        driftX * -0.24,
        driftY * -0.24,
        -Math.sin(time * 0.00038) * 0.016,
        burstScale * 1.08
      );
    }
  }

  context.globalCompositeOperation = "source-over";
  context.globalAlpha = 1;
}

export function HeroLightfieldCanvas({ className }: HeroLightfieldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: true, desynchronized: true });

    if (!context) {
      return;
    }

    let animationFrame = 0;
    let baseLayer: LightfieldLayer | null = null;
    let sweepLayer: LightfieldLayer | null = null;
    let burstLayer: LightfieldLayer | null = null;
    const reducedMotion = Boolean(shouldReduceMotion);
    const startTime = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      const renderScale = getRenderScale(width, height);

      canvas.width = Math.floor(width * renderScale);
      canvas.height = Math.floor(height * renderScale);
      context.setTransform(renderScale, 0, 0, renderScale, 0, 0);
      context.imageSmoothingEnabled = true;

      baseLayer = createLayer(width, height, renderScale, drawBaseRays);
      sweepLayer = createLayer(width, height, renderScale, drawSweepRays);
      burstLayer = createLayer(width, height, renderScale, drawBurstRays);
      drawLightfield(context, baseLayer, sweepLayer, burstLayer, 0, reducedMotion);
    };

    const render = (time: number) => {
      if (baseLayer && sweepLayer && burstLayer) {
        drawLightfield(context, baseLayer, sweepLayer, burstLayer, time - startTime, reducedMotion);
      }

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
