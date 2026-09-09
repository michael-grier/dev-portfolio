"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

// Ray colours from the apex outward, as "r,g,b" strings so alpha can vary per stop.
export type LightfieldPalette = {
  core: string;
  near: string;
  mid: string;
  far: string;
};

type HeroLightfieldCanvasProps = {
  className?: string;
  palette?: LightfieldPalette;
  // Composite op between rays: "screen" for light on dark, "source-over" for ink on paper.
  blend?: "screen" | "source-over";
  // Source position as fractions of the canvas; may sit outside 0..1.
  focal?: { x: number; y: number };
  // Play the burst flash on mount.
  intro?: boolean;
  // Delay (ms) on the intro flash so a second plate can chase the first.
  introDelay?: number;
  intensity?: number;
  // Multiplier on ray width.
  spread?: number;
  // Multiplier on the slow focal drift.
  drift?: number;
};

type LightfieldStyle = Required<
  Pick<HeroLightfieldCanvasProps, "palette" | "blend" | "focal" | "spread">
>;

export const SKY_PALETTE: LightfieldPalette = {
  core: "255, 255, 255",
  near: "224, 244, 255",
  mid: "125, 211, 252",
  far: "14, 165, 233",
};

type LightfieldLayer = {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  focalX: number;
  focalY: number;
  diagonal: number;
  palette: LightfieldPalette;
  blend: GlobalCompositeOperation;
  spread: number;
  // Elapsed time when the layer joined the composite, so it can fade in.
  shownAt?: number;
};

type RenderOptions = {
  intensity: number;
  drift: number;
  intro: boolean;
  introDelay: number;
};

type LayerShell = {
  layer: LightfieldLayer;
  context: CanvasRenderingContext2D | null;
};

type LayerSlice = (
  context: CanvasRenderingContext2D,
  layer: LightfieldLayer
) => void;

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

// Offscreen layers rasterize in small slices so the shadow-blur-heavy ray
// drawing never blocks the main thread while page content hydrates and
// animates in. Canvas commands cost almost no JS time when issued — the raster
// bill arrives on the next flush — so the cap on slices per step is what
// actually spreads the work across frames; the time budget only guards
// against slow software rasterizers that pay synchronously.
const SLICE_BUDGET_MS = 4;
const MAX_SLICES_PER_STEP = 3;

const BURST_ECHO_ALPHA = 0.36;
const BURST_ECHO_SCALE = 1.08;

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

const LIVE_RAY_INDEXES = [1, 3, 5, 7, 11, 13, 17, 21];
const GLINT_RAY_INDEXES = [2, 6, 10, 14, 18, 22];
// The intro flash as ink hitting paper: a quick attack, a short crest, and
// a long release as it soaks in. Peak sits under 1 so the two plates never
// multiply to a flat black.
const FLASH_ATTACK_MS = 600;
const FLASH_HOLD_MS = 600;
const FLASH_RELEASE_MS = 1400;
const FLASH_PEAK = 0.85;
const DETAIL_RAMP_START = 2200;
const DETAIL_RAMP_MS = 1500;
const LAYER_FADE_MS = 600;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function wrapProgress(value: number) {
  return value - Math.floor(value);
}

function triangleWave(value: number) {
  return 1 - Math.abs(wrapProgress(value) * 2 - 1);
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function pseudoRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;

  return value - Math.floor(value);
}

function getRenderScale(width: number, height: number) {
  const deviceRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
  const pixelBudgetRatio = Math.sqrt(MAX_CANVAS_PIXELS / Math.max(width * height, 1));

  return clamp(Math.min(deviceRatio, pixelBudgetRatio), 0.72, MAX_PIXEL_RATIO);
}

function easeInOutCubic(value: number) {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function getIntroFlash(time: number) {
  const reveal = easeOutCubic(clamp(time / FLASH_ATTACK_MS, 0, 1));
  const releaseStart = FLASH_ATTACK_MS + FLASH_HOLD_MS;
  const release = easeInOutCubic(clamp((time - releaseStart) / FLASH_RELEASE_MS, 0, 1));

  return { reveal, flash: reveal * (1 - release) * FLASH_PEAK };
}

function createLayerShell(
  width: number,
  height: number,
  renderScale: number,
  style: LightfieldStyle
): LayerShell {
  const canvas = document.createElement("canvas");
  const layer = {
    canvas,
    width,
    height,
    focalX: width * style.focal.x,
    focalY: height * style.focal.y,
    diagonal: Math.hypot(width, height),
    palette: style.palette,
    blend: style.blend,
    spread: style.spread,
  };
  const context = canvas.getContext("2d", { alpha: true });

  canvas.width = Math.max(1, Math.floor(width * renderScale));
  canvas.height = Math.max(1, Math.floor(height * renderScale));

  if (context) {
    context.setTransform(renderScale, 0, 0, renderScale, 0, 0);
    context.imageSmoothingEnabled = true;
  }

  return { layer, context };
}

function buildSlices(
  count: number,
  perSlice: number,
  draw: (
    context: CanvasRenderingContext2D,
    layer: LightfieldLayer,
    index: number
  ) => void,
  order?: number[]
): LayerSlice[] {
  const slices: LayerSlice[] = [];

  for (let start = 0; start < count; start += perSlice) {
    const end = Math.min(count, start + perSlice);

    slices.push((context, layer) => {
      for (let position = start; position < end; position += 1) {
        draw(context, layer, order ? order[position] : position);
      }
    });
  }

  return slices;
}

// Every stride-th index first, then the offsets in between, so a partially
// painted burst reads as a sparser full fan instead of a half-drawn one.
function stridedIndexes(count: number, stride: number): number[] {
  const order: number[] = [];

  for (let offset = 0; offset < stride; offset += 1) {
    for (let index = offset; index < count; index += stride) {
      order.push(index);
    }
  }

  return order;
}

function paintSlicesSync(
  context: CanvasRenderingContext2D,
  layer: LightfieldLayer,
  slices: LayerSlice[]
) {
  for (const slice of slices) {
    slice(context, layer);
  }
}

function scheduleSliceStep(step: () => void) {
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(step, { timeout: 32 });
  } else {
    window.setTimeout(step, 16);
  }
}

function paintSlicesProgressively(
  context: CanvasRenderingContext2D,
  layer: LightfieldLayer,
  slices: LayerSlice[],
  isCurrent: () => boolean,
  onComplete?: () => void
) {
  if (slices.length === 0) {
    onComplete?.();
    return;
  }

  let index = 0;
  const step = () => {
    if (!isCurrent()) {
      return;
    }

    const start = performance.now();
    let painted = 0;

    do {
      slices[index](context, layer);
      index += 1;
      painted += 1;
    } while (
      index < slices.length &&
      painted < MAX_SLICES_PER_STEP &&
      performance.now() - start < SLICE_BUDGET_MS
    );

    if (index < slices.length) {
      scheduleSliceStep(step);
    } else {
      onComplete?.();
    }
  };

  scheduleSliceStep(step);
}

function drawTaperedRay(
  context: CanvasRenderingContext2D,
  layer: LightfieldLayer,
  {
    angle,
    length,
    endWidth,
    alpha,
    apexOffset = 2,
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

  gradient.addColorStop(0, `rgba(${layer.palette.core}, ${alpha * 0.76})`);
  gradient.addColorStop(0.08, `rgba(${layer.palette.near}, ${alpha})`);
  gradient.addColorStop(0.22, `rgba(${layer.palette.mid}, ${alpha * 0.58})`);
  gradient.addColorStop(0.56, `rgba(${layer.palette.far}, ${alpha * 0.24})`);
  gradient.addColorStop(1, `rgba(${layer.palette.far}, 0)`);

  context.save();
  if (shadowBlur > 0) {
    context.shadowColor = `rgba(${layer.palette.mid}, ${alpha * 0.62})`;
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

function drawMaskRay(
  context: CanvasRenderingContext2D,
  layer: LightfieldLayer,
  {
    angle,
    length,
    endWidth,
    alpha,
    apexOffset = 1,
    apexWidth = 0.7,
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

  gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
  gradient.addColorStop(0.12, `rgba(255, 255, 255, ${alpha * 0.58})`);
  gradient.addColorStop(0.5, `rgba(255, 255, 255, ${alpha})`);
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  context.beginPath();
  context.moveTo(startX + normalX * startHalfWidth, startY + normalY * startHalfWidth);
  context.lineTo(endX + normalX * endHalfWidth, endY + normalY * endHalfWidth);
  context.lineTo(endX - normalX * endHalfWidth, endY - normalY * endHalfWidth);
  context.lineTo(startX - normalX * startHalfWidth, startY - normalY * startHalfWidth);
  context.closePath();
  context.fillStyle = gradient;
  context.fill();
}

function drawBaseStreak(
  context: CanvasRenderingContext2D,
  layer: LightfieldLayer,
  index: number
) {
  const streak = STREAKS[index];
  const { width } = layer;
  const angle = streak.angle + Math.sin(index * 1.8) * 0.025;
  const brightness = streak.alpha * 0.95;
  const endWidth = streak.width * (width > 700 ? 18 : 12) * layer.spread;
  const volumeWidth = endWidth * (index % 4 === 0 ? 3.4 : 2.35);

  context.globalCompositeOperation = layer.blend;

  drawTaperedRay(context, layer, {
    angle,
    length: streak.length,
    endWidth: volumeWidth,
    alpha: brightness * 0.13,
    apexWidth: 1.2,
  });
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
}

function drawShadowStreak(
  context: CanvasRenderingContext2D,
  layer: LightfieldLayer,
  index: number
) {
  if (index % 2 === 0) {
    return;
  }

  const streak = STREAKS[index];
  const { width } = layer;
  const angle = streak.angle + Math.cos(index * 0.93) * 0.045;
  const endWidth = streak.width * (width > 700 ? 34 : 23);
  const alpha = index % 5 === 0 ? 0.22 : 0.13;

  context.globalCompositeOperation = "source-over";

  drawMaskRay(context, layer, {
    angle,
    length: streak.length * 1.08,
    endWidth,
    alpha,
    apexWidth: 1.6,
  });
}

function getDustParticleCount(layer: LightfieldLayer) {
  return clamp(Math.floor((layer.width * layer.height) / 15000), 64, 150);
}

function drawDustParticle(
  context: CanvasRenderingContext2D,
  layer: LightfieldLayer,
  index: number
) {
  const { width, height, diagonal, focalX, focalY } = layer;
  const seed = index + width * 0.017 + height * 0.031;
  const angle = -2.8 + pseudoRandom(seed) * 5.6;
  const distance = diagonal * (0.1 + pseudoRandom(seed + 1) * 0.76);
  const drift = (pseudoRandom(seed + 2) - 0.5) * diagonal * 0.11;
  const directionX = Math.cos(angle);
  const directionY = Math.sin(angle);
  const normalX = -directionY;
  const normalY = directionX;
  const x = focalX + directionX * distance + normalX * drift;
  const y = focalY + directionY * distance + normalY * drift;
  const size = 0.45 + pseudoRandom(seed + 3) * (width > 700 ? 1.35 : 0.9);
  const alpha = 0.035 + pseudoRandom(seed + 4) * 0.085;

  context.globalCompositeOperation = layer.blend;
  context.save();
  context.translate(x, y);
  context.rotate(angle);
  context.beginPath();
  context.ellipse(0, 0, size * 2.8, size, 0, 0, Math.PI * 2);
  context.fillStyle = `rgba(${layer.palette.near}, ${alpha})`;
  context.fill();
  context.restore();
}

function drawSweepStreak(
  context: CanvasRenderingContext2D,
  layer: LightfieldLayer,
  index: number
) {
  if (index % 3 !== 1) {
    return;
  }

  const streak = STREAKS[index];
  const { width } = layer;
  const angle = streak.angle + Math.sin(index * 0.7) * 0.05;
  const endWidth = streak.width * (width > 700 ? 26 : 17);
  const alpha = streak.alpha * 0.68;

  context.globalCompositeOperation = layer.blend;

  drawTaperedRay(context, layer, {
    angle,
    length: streak.length * 1.04,
    endWidth,
    alpha,
    apexWidth: 0.6,
    shadowBlur: 14,
  });
}

function drawLiveRay(
  context: CanvasRenderingContext2D,
  layer: LightfieldLayer,
  focalX: number,
  focalY: number,
  diagonal: number,
  angle: number,
  length: number,
  endWidth: number,
  alpha: number,
  bandProgress: number
) {
  const directionX = Math.cos(angle);
  const directionY = Math.sin(angle);
  const normalX = -directionY;
  const normalY = directionX;
  const apexOffset = 1.5;
  const apexWidth = 0.5;
  const startX = focalX + directionX * apexOffset;
  const startY = focalY + directionY * apexOffset;
  const endX = focalX + directionX * diagonal * length;
  const endY = focalY + directionY * diagonal * length;
  const startHalfWidth = apexWidth / 2;
  const endHalfWidth = endWidth / 2;
  const gradient = context.createLinearGradient(startX, startY, endX, endY);

  gradient.addColorStop(0, `rgba(${layer.palette.core}, ${alpha * 0.62})`);
  gradient.addColorStop(0.1, `rgba(${layer.palette.near}, ${alpha})`);
  gradient.addColorStop(0.32, `rgba(${layer.palette.mid}, ${alpha * 0.5})`);
  gradient.addColorStop(0.72, `rgba(${layer.palette.far}, ${alpha * 0.16})`);
  gradient.addColorStop(1, `rgba(${layer.palette.far}, 0)`);

  context.save();
  context.globalCompositeOperation = layer.blend;
  context.beginPath();
  context.moveTo(startX + normalX * startHalfWidth, startY + normalY * startHalfWidth);
  context.lineTo(endX + normalX * endHalfWidth, endY + normalY * endHalfWidth);
  context.lineTo(endX - normalX * endHalfWidth, endY - normalY * endHalfWidth);
  context.lineTo(startX - normalX * startHalfWidth, startY - normalY * startHalfWidth);
  context.closePath();
  context.fillStyle = gradient;
  context.fill();

  const bandStart = clamp(bandProgress - 0.075, 0.02, 0.94);
  const bandEnd = clamp(bandProgress + 0.13, 0.06, 0.98);
  const bandStartWidth = apexWidth + (endWidth - apexWidth) * bandStart;
  const bandEndWidth = apexWidth + (endWidth - apexWidth) * bandEnd;
  const bandStartX = focalX + directionX * diagonal * length * bandStart;
  const bandStartY = focalY + directionY * diagonal * length * bandStart;
  const bandEndX = focalX + directionX * diagonal * length * bandEnd;
  const bandEndY = focalY + directionY * diagonal * length * bandEnd;
  const bandGradient = context.createLinearGradient(
    bandStartX,
    bandStartY,
    bandEndX,
    bandEndY
  );
  const bandAlpha = clamp(alpha * 1.9, 0, 0.42);

  bandGradient.addColorStop(0, `rgba(${layer.palette.mid}, 0)`);
  bandGradient.addColorStop(0.46, `rgba(${layer.palette.core}, ${bandAlpha})`);
  bandGradient.addColorStop(1, `rgba(${layer.palette.mid}, 0)`);

  context.shadowColor = `rgba(${layer.palette.mid}, ${bandAlpha * 0.62})`;
  context.shadowBlur = 10;
  context.beginPath();
  context.moveTo(
    bandStartX + normalX * (bandStartWidth / 2),
    bandStartY + normalY * (bandStartWidth / 2)
  );
  context.lineTo(
    bandEndX + normalX * (bandEndWidth / 2),
    bandEndY + normalY * (bandEndWidth / 2)
  );
  context.lineTo(
    bandEndX - normalX * (bandEndWidth / 2),
    bandEndY - normalY * (bandEndWidth / 2)
  );
  context.lineTo(
    bandStartX - normalX * (bandStartWidth / 2),
    bandStartY - normalY * (bandStartWidth / 2)
  );
  context.closePath();
  context.fillStyle = bandGradient;
  context.fill();
  context.restore();
}

function drawLiveRays(
  context: CanvasRenderingContext2D,
  layer: LightfieldLayer,
  focalX: number,
  focalY: number,
  time: number,
  motionRamp: number
) {
  const widthScale = (layer.width > 700 ? 22 : 14) * layer.spread;

  LIVE_RAY_INDEXES.forEach((streakIndex, liveIndex) => {
    const streak = STREAKS[streakIndex];
    const angularSweep =
      Math.sin(time * (0.00042 + streak.speed * 0.0002) + liveIndex * 0.82) * 0.052;
    const fineSweep = Math.sin(time * 0.00024 + liveIndex * 1.31) * 0.018;
    const widthPulse =
      1 + Math.sin(time * (0.0009 + streak.speed * 0.00072) + liveIndex * 1.17) * 0.34;
    const brightnessPulse =
      0.74 + Math.sin(time * (0.00155 + streak.speed * 0.0005) + liveIndex) * 0.26;
    const bandProgress =
      0.11 + wrapProgress(time * 0.00009 * (1.55 + streak.speed) + liveIndex * 0.11) * 0.78;

    drawLiveRay(
      context,
      layer,
      focalX,
      focalY,
      layer.diagonal,
      streak.angle + angularSweep + fineSweep,
      streak.length * (0.98 + Math.sin(time * 0.0003 + liveIndex) * 0.035),
      streak.width * widthScale * widthPulse,
      streak.alpha * 0.42 * brightnessPulse * motionRamp,
      bandProgress
    );
  });
}

function drawGlints(
  context: CanvasRenderingContext2D,
  layer: LightfieldLayer,
  focalX: number,
  focalY: number,
  time: number,
  motionRamp: number
) {
  context.save();
  context.globalCompositeOperation = layer.blend;

  GLINT_RAY_INDEXES.forEach((streakIndex, glintIndex) => {
    const streak = STREAKS[streakIndex];
    const cycle = wrapProgress(time * 0.000045 * (1.2 + streak.speed) + glintIndex * 0.19);
    const flash = Math.pow(triangleWave(cycle), 8) * motionRamp;

    if (flash < 0.08) {
      return;
    }

    const angle =
      streak.angle +
      Math.sin(time * 0.00034 + glintIndex * 1.4) * 0.038 +
      Math.cos(time * 0.00021 + glintIndex) * 0.014;
    const directionX = Math.cos(angle);
    const directionY = Math.sin(angle);
    const normalX = -directionY;
    const normalY = directionX;
    const travel = 0.2 + cycle * 0.62;
    const glintLength = layer.diagonal * 0.1;
    const centerX = focalX + directionX * layer.diagonal * streak.length * travel;
    const centerY = focalY + directionY * layer.diagonal * streak.length * travel;
    const startX = centerX - directionX * glintLength * 0.42;
    const startY = centerY - directionY * glintLength * 0.42;
    const endX = centerX + directionX * glintLength * 0.58;
    const endY = centerY + directionY * glintLength * 0.58;
    const width = streak.width * (layer.width > 700 ? 13 : 8) * (0.8 + flash * 0.5);
    const gradient = context.createLinearGradient(startX, startY, endX, endY);
    const alpha = clamp(streak.alpha * flash * 1.8, 0, 0.52);

    gradient.addColorStop(0, `rgba(${layer.palette.mid}, 0)`);
    gradient.addColorStop(0.48, `rgba(${layer.palette.core}, ${alpha})`);
    gradient.addColorStop(1, `rgba(${layer.palette.mid}, 0)`);

    context.save();
    context.shadowColor = `rgba(${layer.palette.near}, ${alpha * 0.62})`;
    context.shadowBlur = 14;
    context.beginPath();
    context.moveTo(startX + normalX * width, startY + normalY * width);
    context.lineTo(endX + normalX * width * 0.62, endY + normalY * width * 0.62);
    context.lineTo(endX - normalX * width * 0.62, endY - normalY * width * 0.62);
    context.lineTo(startX - normalX * width, startY - normalY * width);
    context.closePath();
    context.fillStyle = gradient;
    context.fill();
    context.restore();
  });

  context.restore();
}

function drawBurstBloom(context: CanvasRenderingContext2D, layer: LightfieldLayer) {
  const { focalX, focalY, diagonal, width, height } = layer;
  const bloom = context.createRadialGradient(
    focalX,
    focalY,
    0,
    focalX,
    focalY,
    diagonal * 0.38
  );

  context.globalCompositeOperation = layer.blend;

  bloom.addColorStop(0, `rgba(${layer.palette.core}, 0.92)`);
  bloom.addColorStop(0.08, `rgba(${layer.palette.near}, 0.72)`);
  bloom.addColorStop(0.22, `rgba(${layer.palette.mid}, 0.34)`);
  bloom.addColorStop(1, `rgba(${layer.palette.far}, 0)`);

  context.fillStyle = bloom;
  context.fillRect(0, 0, width, height);
}

function drawBurstAngle(
  context: CanvasRenderingContext2D,
  layer: LightfieldLayer,
  index: number
) {
  const { width } = layer;
  const angle = BURST_ANGLES[index] + Math.sin(index * 0.9) * 0.035;
  const broadRay = index % 4 === 0;
  const alpha = broadRay ? 0.94 : 0.72;
  const endWidth = (broadRay ? 130 : 58) * (width > 700 ? 1 : 0.72);

  context.globalCompositeOperation = layer.blend;

  drawTaperedRay(context, layer, {
    angle,
    length: 1.12,
    endWidth,
    alpha: alpha * 0.82,
    apexOffset: 3,
    apexWidth: broadRay ? 1.6 : 0.8,
    shadowBlur: broadRay ? 18 : 8,
  });
  drawTaperedRay(context, layer, {
    angle,
    length: 1.08,
    endWidth: endWidth * 0.24,
    alpha: alpha * 0.92,
    apexOffset: 2,
    apexWidth: 0.4,
  });
}

function burstLayerSlices(): LayerSlice[] {
  const passes = [
    drawBurstBloom,
    ...buildSlices(
      BURST_ANGLES.length,
      3,
      drawBurstAngle,
      stridedIndexes(BURST_ANGLES.length, 4)
    ),
  ];
  // Bake the scaled echo copy into the layer so the intro flash needs one
  // full-canvas draw per frame instead of two. The echo redraws the rays under
  // a scaled transform rather than blitting the canvas onto itself, which
  // would force a slow GPU readback.
  const echoPasses = passes.map(
    (slice): LayerSlice =>
      (context, layer) => {
        context.save();
        context.translate(layer.focalX, layer.focalY);
        context.scale(BURST_ECHO_SCALE, BURST_ECHO_SCALE);
        context.translate(-layer.focalX, -layer.focalY);
        context.globalAlpha = BURST_ECHO_ALPHA;
        slice(context, layer);
        context.restore();
      }
  );

  return [...passes, ...echoPasses];
}

function baseLayerSlices(): LayerSlice[] {
  return buildSlices(STREAKS.length, 2, drawBaseStreak);
}

function shadowLayerSlices(): LayerSlice[] {
  return buildSlices(STREAKS.length, 4, drawShadowStreak);
}

function sweepLayerSlices(): LayerSlice[] {
  return buildSlices(STREAKS.length, 4, drawSweepStreak);
}

function dustLayerSlices(layer: LightfieldLayer): LayerSlice[] {
  return buildSlices(getDustParticleCount(layer), 50, drawDustParticle);
}

function drawFocalBloom(
  context: CanvasRenderingContext2D,
  layer: LightfieldLayer,
  focalX: number,
  focalY: number,
  width: number,
  height: number,
  diagonal: number,
  pulse: number,
  time: number,
  reducedMotion: boolean
) {
  const stretch = reducedMotion ? 1 : 1.08 + Math.sin(time * 0.00052) * 0.08;
  const squeeze = reducedMotion ? 1 : 0.9 + Math.cos(time * 0.00047) * 0.06;
  const rotation = reducedMotion ? 0 : Math.sin(time * 0.00031) * 0.18;

  context.save();
  context.globalCompositeOperation = "source-over";
  context.translate(focalX, focalY);
  context.rotate(rotation);
  context.scale(stretch, squeeze);

  const bloom = context.createRadialGradient(
    0,
    0,
    0,
    0,
    0,
    diagonal * 0.42
  );

  bloom.addColorStop(0, `rgba(${layer.palette.near}, ${0.32 + pulse * 0.16})`);
  bloom.addColorStop(0.08, `rgba(${layer.palette.mid}, ${0.14 + pulse * 0.08})`);
  bloom.addColorStop(0.34, `rgba(${layer.palette.far}, 0.07)`);
  bloom.addColorStop(1, `rgba(${layer.palette.far}, 0)`);

  context.fillStyle = bloom;
  context.fillRect(-diagonal, -diagonal, diagonal * 2, diagonal * 2);
  context.restore();

  const core = context.createRadialGradient(focalX, focalY, 0, focalX, focalY, diagonal * 0.08);

  core.addColorStop(0, `rgba(${layer.palette.core}, ${0.16 + pulse * 0.12})`);
  core.addColorStop(0.34, `rgba(${layer.palette.mid}, ${0.1 + pulse * 0.08})`);
  core.addColorStop(1, `rgba(${layer.palette.far}, 0)`);

  context.globalCompositeOperation = layer.blend;
  context.fillStyle = core;
  context.fillRect(0, 0, width, height);
}

function drawLayer(
  context: CanvasRenderingContext2D,
  layer: LightfieldLayer,
  alpha: number,
  offsetX: number,
  offsetY: number,
  rotation: number,
  scale: number,
  operation: GlobalCompositeOperation = layer.blend
) {
  context.save();
  context.globalCompositeOperation = operation;
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
  baseLayer: LightfieldLayer | null,
  sweepLayer: LightfieldLayer | null,
  shadowLayer: LightfieldLayer | null,
  dustLayer: LightfieldLayer | null,
  burstLayer: LightfieldLayer,
  time: number,
  reducedMotion: boolean,
  options: RenderOptions
) {
  const sceneLayer = baseLayer ?? burstLayer;
  const { width, height, diagonal } = sceneLayer;
  const driftX = reducedMotion
    ? 0
    : (Math.sin(time * 0.000112) * 15 + Math.sin(time * 0.00024) * 4) * options.drift;
  const driftY = reducedMotion
    ? 0
    : (Math.cos(time * 0.00013) * 11 + Math.sin(time * 0.00019) * 3) * options.drift;
  const focalX = sceneLayer.focalX + driftX;
  const focalY = sceneLayer.focalY + driftY;
  const pulse = reducedMotion
    ? 0.62
    : 0.54 + Math.sin(time * 0.0014) * 0.22 + Math.sin(time * 0.00037) * 0.08;
  const layerBreath = reducedMotion ? 0 : Math.sin(time * 0.00072) * 0.16;
  const ambientAlpha =
    (reducedMotion ? 0.78 : 0.68 + layerBreath + Math.sin(time * 0.00108) * 0.08) *
    options.intensity;
  const motionRamp = reducedMotion ? 0 : easeOutCubic(clamp(time / 1700, 0, 1));
  // Without the intro flash there is nothing to wait for, so detail fades in early.
  const detailStart = options.intro ? DETAIL_RAMP_START : 300;
  const detailRamp = reducedMotion
    ? 0
    : easeOutCubic(clamp((time - detailStart) / DETAIL_RAMP_MS, 0, 1));
  const baseReveal =
    reducedMotion || !baseLayer
      ? 1
      : easeOutCubic(clamp((time - (baseLayer.shownAt ?? 0)) / LAYER_FADE_MS, 0, 1));
  const sweepAlpha = reducedMotion
    ? 0
    : detailRamp *
      (0.24 + Math.sin(time * 0.00105) * 0.12 + layerBreath * 0.24) *
      options.intensity;
  const contrastAlpha = reducedMotion
    ? 0
    : motionRamp *
      (0.055 + Math.pow(Math.max(layerBreath, 0), 2) * 0.12) *
      options.intensity;

  context.clearRect(0, 0, width, height);
  context.save();
  context.globalAlpha = options.intensity;
  drawFocalBloom(context, sceneLayer, focalX, focalY, width, height, diagonal, pulse, time, reducedMotion);
  context.restore();

  if (baseLayer) {
    drawLayer(
      context,
      baseLayer,
      ambientAlpha * baseReveal,
      driftX,
      driftY,
      reducedMotion ? 0 : Math.sin(time * 0.00018) * 0.028,
      reducedMotion ? 1 : 1 + Math.sin(time * 0.00024) * 0.032
    );

    if (!reducedMotion) {
      drawLayer(
        context,
        baseLayer,
        contrastAlpha * baseReveal,
        driftX,
        driftY,
        Math.sin(time * 0.0002 + 1.2) * -0.018,
        1.02 + Math.cos(time * 0.00032) * 0.028
      );
    }
  }

  if (!reducedMotion && sweepLayer) {
    drawLayer(
      context,
      sweepLayer,
      sweepAlpha,
      driftX,
      driftY,
      Math.sin(time * 0.00034) * 0.058,
      1.03 + Math.sin(time * 0.0004) * 0.05
    );
    drawLayer(
      context,
      sweepLayer,
      sweepAlpha * 0.58,
      driftX,
      driftY,
      Math.cos(time * 0.00028) * -0.046,
      1.08 + Math.cos(time * 0.00036) * 0.04
    );
  }

  if (shadowLayer) {
    const shadowAlpha = reducedMotion
      ? 0.28
      : detailRamp * (0.25 + Math.sin(time * 0.00051 + 1.8) * 0.08);

    drawLayer(
      context,
      shadowLayer,
      shadowAlpha,
      driftX * 0.42,
      driftY * 0.36,
      reducedMotion ? 0 : Math.sin(time * 0.00019 + 0.7) * 0.052,
      reducedMotion ? 1 : 1.02 + Math.sin(time * 0.00027) * 0.044,
      "destination-out"
    );
  }

  if (dustLayer) {
    drawLayer(
      context,
      dustLayer,
      (reducedMotion ? 0.16 : detailRamp * (0.16 + Math.sin(time * 0.00088) * 0.04)) *
        options.intensity,
      driftX * 1.26,
      driftY * 1.4,
      reducedMotion ? 0 : Math.sin(time * 0.00012) * 0.02,
      reducedMotion ? 1 : 1.01 + Math.sin(time * 0.00018 + 2.1) * 0.018
    );
  }

  if (!reducedMotion && baseLayer && detailRamp > 0) {
    drawLiveRays(context, baseLayer, focalX, focalY, time, detailRamp * options.intensity);
    drawGlints(context, baseLayer, focalX, focalY, time, detailRamp * options.intensity);
  }

  if (!reducedMotion && options.intro) {
    const { reveal, flash } = getIntroFlash(time - options.introDelay);

    if (flash > 0.012) {
      const burstScale = 0.86 + reveal * 0.16 + flash * 0.07;

      drawLayer(
        context,
        burstLayer,
        flash,
        driftX,
        driftY,
        Math.sin(time * 0.00055) * 0.018,
        burstScale
      );
    }
  }

  context.globalCompositeOperation = "source-over";
  context.globalAlpha = 1;
}

export function HeroLightfieldCanvas({
  className,
  palette = SKY_PALETTE,
  blend = "screen",
  focal = { x: 0.52, y: 0.55 },
  intro = true,
  introDelay = 0,
  intensity = 1,
  spread = 1,
  drift = 1,
}: HeroLightfieldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();
  // Callers pass fresh object literals; compare by value so the effect only
  // rebuilds the layers when the look actually changes.
  const styleKey = JSON.stringify({ palette, blend, focal, spread });

  useEffect(() => {
    const style: LightfieldStyle = JSON.parse(styleKey);
    const options: RenderOptions = { intensity, drift, intro, introDelay };
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
    let shadowLayer: LightfieldLayer | null = null;
    let dustLayer: LightfieldLayer | null = null;
    let burstLayer: LightfieldLayer | null = null;
    let baseLayerTimeout = 0;
    let sweepLayerTimeout = 0;
    let shadowLayerTimeout = 0;
    let dustLayerTimeout = 0;
    let layerGeneration = 0;
    const reducedMotion = Boolean(shouldReduceMotion);
    let startTime = performance.now();

    const clearLayerTimeouts = () => {
      window.clearTimeout(baseLayerTimeout);
      window.clearTimeout(sweepLayerTimeout);
      window.clearTimeout(shadowLayerTimeout);
      window.clearTimeout(dustLayerTimeout);
    };

    const resize = () => {
      clearLayerTimeouts();

      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      const renderScale = getRenderScale(width, height);

      layerGeneration += 1;
      const generation = layerGeneration;
      const isCurrent = () => layerGeneration === generation;

      canvas.width = Math.floor(width * renderScale);
      canvas.height = Math.floor(height * renderScale);
      context.setTransform(renderScale, 0, 0, renderScale, 0, 0);
      context.imageSmoothingEnabled = true;

      baseLayer = null;
      sweepLayer = null;
      shadowLayer = null;
      dustLayer = null;

      const burst = createLayerShell(width, height, renderScale, style);

      burstLayer = burst.layer;
      startTime = performance.now();

      if (reducedMotion) {
        const shells = [
          createLayerShell(width, height, renderScale, style),
          createLayerShell(width, height, renderScale, style),
          createLayerShell(width, height, renderScale, style),
          createLayerShell(width, height, renderScale, style),
        ];
        const sliceSets = [
          baseLayerSlices(),
          sweepLayerSlices(),
          shadowLayerSlices(),
          dustLayerSlices(shells[3].layer),
        ];

        if (burst.context && intro) {
          paintSlicesSync(burst.context, burst.layer, burstLayerSlices());
        }
        shells.forEach((shell, index) => {
          if (shell.context) {
            paintSlicesSync(shell.context, shell.layer, sliceSets[index]);
          }
        });
        [baseLayer, sweepLayer, shadowLayer, dustLayer] = shells.map(
          (shell) => shell.layer
        );
        drawLightfield(
          context,
          baseLayer,
          sweepLayer,
          shadowLayer,
          dustLayer,
          burst.layer,
          0,
          reducedMotion,
          options
        );
        return;
      }

      if (burst.context && intro) {
        const slices = burstLayerSlices();

        // Paint the bloom and first rays synchronously so the very first frame
        // glows; the rest fills in over idle time while the flash is still dim.
        paintSlicesSync(burst.context, burst.layer, slices.splice(0, 3));
        paintSlicesProgressively(burst.context, burst.layer, slices, isCurrent);
      }

      drawLightfield(context, null, null, null, null, burst.layer, 0, reducedMotion, options);

      const scheduleLayer = (
        delay: number,
        getSlices: (layer: LightfieldLayer) => LayerSlice[],
        assign: (layer: LightfieldLayer) => void
      ) =>
        window.setTimeout(() => {
          if (!isCurrent()) {
            return;
          }

          const shell = createLayerShell(width, height, renderScale, style);

          if (!shell.context) {
            return;
          }

          // Assign only once fully painted so a partially drawn layer never
          // pops into the composite.
          paintSlicesProgressively(
            shell.context,
            shell.layer,
            getSlices(shell.layer),
            isCurrent,
            () => assign(shell.layer)
          );
        }, delay);

      // The intro's delays keep detail layers out of the flash; without it
      // they only need to stay behind the page's own entrance.
      const delays = intro ? [220, 2400, 2600, 2800] : [60, 320, 420, 520];

      baseLayerTimeout = scheduleLayer(delays[0], baseLayerSlices, (layer) => {
        layer.shownAt = performance.now() - startTime;
        baseLayer = layer;
      });
      shadowLayerTimeout = scheduleLayer(delays[1], shadowLayerSlices, (layer) => {
        shadowLayer = layer;
      });
      sweepLayerTimeout = scheduleLayer(delays[2], sweepLayerSlices, (layer) => {
        sweepLayer = layer;
      });
      dustLayerTimeout = scheduleLayer(delays[3], dustLayerSlices, (layer) => {
        dustLayer = layer;
      });
    };

    const render = (time: number) => {
      if (burstLayer) {
        drawLightfield(
          context,
          baseLayer,
          sweepLayer,
          shadowLayer,
          dustLayer,
          burstLayer,
          time - startTime,
          reducedMotion,
          options
        );
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
      // Invalidate pending progressive paint steps along with the timeouts.
      layerGeneration += 1;
      window.removeEventListener("resize", resize);
      clearLayerTimeouts();
      window.cancelAnimationFrame(animationFrame);
    };
  }, [shouldReduceMotion, styleKey, intensity, drift, intro, introDelay]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
