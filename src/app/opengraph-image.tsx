import { ImageResponse } from "next/og";

export const alt = "Michael Grier software developer portfolio";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          backgroundColor: "#020617",
          color: "white",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(125, 211, 252, 0.36), rgba(2, 6, 23, 0) 54%)",
            height: 820,
            left: 260,
            position: "absolute",
            top: -40,
            width: 820,
          }}
        />
        <div
          style={{
            borderTop: "2px solid rgba(186, 230, 253, 0.22)",
            height: 1,
            left: 0,
            position: "absolute",
            top: 130,
            transform: "rotate(-8deg)",
            width: 1300,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
            padding: "72px",
            position: "relative",
            width: "100%",
          }}
        >
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.16)",
              borderRadius: 999,
              color: "rgba(186,230,253,0.86)",
              display: "flex",
              fontSize: 24,
              fontWeight: 600,
              padding: "12px 22px",
              alignSelf: "flex-start",
            }}
          >
            Software Developer
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 82,
              fontWeight: 700,
              letterSpacing: 0,
              lineHeight: 0.98,
              maxWidth: 880,
            }}
          >
            <span>Michael Grier</span>
            <span style={{ color: "rgba(255,255,255,0.72)" }}>
              Full-stack web products
            </span>
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.66)",
              display: "flex",
              fontSize: 32,
              lineHeight: 1.32,
              maxWidth: 820,
            }}
          >
            Sharp, resilient interfaces built with React, Next.js, TypeScript,
            and pragmatic delivery habits.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
