import {
  HeroLightfieldCanvas,
  type LightfieldPalette,
} from "@/components/site/hero-lightfield-canvas";
import { cn } from "@/lib/utils";

// The lightfield as a two-colour risograph print: the same rays printed once
// in pink and once in blue, a hair out of register, the inks multiplying on
// the paper. Solid ink per plate; alpha alone carries the tint. The blue
// plate's flash lags the pink one, as a second pass through the machine, and
// its drift runs a beat behind so the registration wobbles a pixel or two.
const PINK: LightfieldPalette = {
  core: "255, 72, 176",
  near: "255, 72, 176",
  mid: "255, 72, 176",
  far: "255, 72, 176",
};
const BLUE: LightfieldPalette = {
  core: "0, 120, 191",
  near: "0, 120, 191",
  mid: "0, 120, 191",
  far: "0, 120, 191",
};

type RisoLightfieldProps = {
  className?: string;
  focal: { x: number; y: number };
  intro: boolean;
  intensity: number;
  spread: number;
  drift: number;
};

// Both plates overhang the container so the nudged, rotated blue plate still
// covers every edge; otherwise the pink plate shows alone in thin slivers.
const plateClassName = "inset-[-3%] h-[106%] w-[106%] mix-blend-multiply";
const BLUE_PLATE_LAG_MS = 100;
const BLUE_PLATE_DRIFT_PHASE_MS = 1200;

export function RisoLightfield({ className, ...plate }: RisoLightfieldProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none overflow-hidden", className)}
    >
      <HeroLightfieldCanvas
        palette={PINK}
        blend="source-over"
        className={plateClassName}
        {...plate}
      />
      <HeroLightfieldCanvas
        palette={BLUE}
        blend="source-over"
        className={cn(
          plateClassName,
          "translate-x-[4px] -translate-y-[3px] rotate-[0.25deg]"
        )}
        introDelay={BLUE_PLATE_LAG_MS}
        driftPhase={BLUE_PLATE_DRIFT_PHASE_MS}
        {...plate}
      />
    </div>
  );
}

/* The ambient version every inner page shares, no flash. The source sits just
   above the top right corner: close enough that the rays anchor to the header,
   high enough that the ink core never lands on the nav links. */
export function PageLightfield() {
  return (
    <RisoLightfield
      className="fixed inset-0"
      focal={{ x: 0.94, y: -0.04 }}
      intro={false}
      intensity={0.8}
      spread={1.5}
      drift={0.4}
    />
  );
}
