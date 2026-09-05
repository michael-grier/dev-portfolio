import { ImageResponse } from "next/og";

import { siteConfig } from "@/content/site";

export const alt = "Michael Grier software developer portfolio";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Static stand-in for the riso lightfield: two fans of hairline rays through
// the same source, a degree out of register. Satori has no conic gradients,
// blend modes, or transform-origin, so each ray is a long bar centred on the
// source and rotated about its middle.
const RAY_ANGLES = Array.from({ length: 40 }, (_, index) => 96 + index * 4.2);
const SOURCE = { x: 1000, y: 120 };
const RAY_LENGTH = 3000;

function InkFan({ color, offset }: { color: string; offset: number }) {
  return (
    <div style={{ display: "flex" }}>
      {RAY_ANGLES.map((angle, index) => {
        const height = index % 3 === 0 ? 5 : 2;

        return (
          <div
            key={angle}
            style={{
              backgroundColor: color,
              height,
              left: SOURCE.x - RAY_LENGTH / 2,
              opacity: 0.5,
              position: "absolute",
              top: SOURCE.y - height / 2,
              transform: `rotate(${angle + offset}deg)`,
              width: RAY_LENGTH,
            }}
          />
        );
      })}
    </div>
  );
}

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "#f1eee8",
          color: "#1c1c1c",
          display: "flex",
          height: "100%",
          overflow: "hidden",
          position: "relative",
          width: "100%",
        }}
      >
        <InkFan color="#ff48b0" offset={0} />
        <InkFan color="#0078bf" offset={1.4} />
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(241,238,232,1) 30%, rgba(241,238,232,0.4) 70%, rgba(241,238,232,0))",
            height: "100%",
            left: 0,
            position: "absolute",
            top: 0,
            width: "100%",
          }}
        />
        <div
          style={{
            bottom: 72,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            left: 72,
            position: "absolute",
            width: 900,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 84,
              fontWeight: 500,
              letterSpacing: -1,
              lineHeight: 0.98,
            }}
          >
            <span>{siteConfig.hero.greeting}</span>
            <span style={{ color: "rgba(28,28,28,0.5)" }}>{siteConfig.hero.subtitle}</span>
          </div>
          <div
            style={{
              color: "rgba(28,28,28,0.72)",
              display: "flex",
              fontSize: 28,
              lineHeight: 1.35,
              maxWidth: 760,
            }}
          >
            {siteConfig.hero.intro}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
