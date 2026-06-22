"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * HealingSeal
 * ───────────
 * A precise, concentric medallion built from true circular geometry
 * (24 evenly-spaced spokes + 48 rim ticks, computed analytically —
 * not hand-drawn ellipses pretending to be petals).
 *
 * Visual reference: the Ashoka Chakra rendered as a brass/gold seal,
 * tying into the clinic's AYUSH-certification narrative ("an official
 * mark of trust") rather than a decorative spinning flower.
 *
 * Motion: a single slow ambient rotation (90s, linear) on the outer
 * ring only — the hub and label stay still so the numbers remain
 * legible at all times. Fully disabled under prefers-reduced-motion.
 */

const SPOKE_COUNT = 24;
const TICK_COUNT = 48;
const CENTER = 210;

function polar(radius: number, index: number, count: number) {
  const angle = (index * 360) / count - 90;
  const rad = (angle * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

function useGeometry() {
  return useMemo(() => {
    const spokes = Array.from({ length: SPOKE_COUNT }, (_, i) => {
      const inner = polar(64, i, SPOKE_COUNT);
      const outer = polar(162, i, SPOKE_COUNT);
      return { x1: inner.x, y1: inner.y, x2: outer.x, y2: outer.y };
    });

    const ticks = Array.from({ length: TICK_COUNT }, (_, i) => {
      const inner = polar(172, i, TICK_COUNT);
      const outer = polar(188, i, TICK_COUNT);
      return { x1: inner.x, y1: inner.y, x2: outer.x, y2: outer.y };
    });

    return { spokes, ticks };
  }, []);
}

interface HealingSealProps {
  yearsLabel?: string;
  size?: number;
  className?: string;
}

export default function HealingSeal({
  yearsLabel = "15+",
  size = 360,
  className = "",
}: HealingSealProps) {
  const { spokes, ticks } = useGeometry();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={className}
      style={{ width: size, height: size, position: "relative" }}
      role="img"
      aria-label={`Ceremonial seal marking ${yearsLabel} years of Ayurvedic practice`}
    >
      <motion.svg
        viewBox="0 0 420 420"
        width="100%"
        height="100%"
        aria-hidden="true"
        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 90, repeat: Infinity, ease: "linear" }
        }
        style={{ display: "block" }}
      >
        <defs>
          <linearGradient id="seal-brass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F4D98C" />
            <stop offset="50%" stopColor="#C9A84C" />
            <stop offset="100%" stopColor="#9C7E33" />
          </linearGradient>
        </defs>

        {/* outermost faint boundary */}
        <circle
          cx="210"
          cy="210"
          r="196"
          fill="none"
          stroke="url(#seal-brass)"
          strokeWidth="0.75"
          opacity="0.28"
        />

        {/* rim ticks — 48, evenly spaced */}
        <g stroke="url(#seal-brass)" strokeWidth="1.4" opacity="0.6" strokeLinecap="round">
          {ticks.map((t, i) => (
            <line key={`tick-${i}`} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />
          ))}
        </g>

        {/* spoke ring boundary */}
        <circle
          cx="210"
          cy="210"
          r="168"
          fill="none"
          stroke="url(#seal-brass)"
          strokeWidth="1.5"
          opacity="0.5"
        />

        {/* 24 spokes — true Dharmachakra count */}
        <g stroke="url(#seal-brass)" strokeWidth="1.2" opacity="0.6" strokeLinecap="round">
          {spokes.map((s, i) => (
            <line key={`spoke-${i}`} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} />
          ))}
        </g>

        {/* hub */}
        <circle
          cx="210"
          cy="210"
          r="64"
          fill="none"
          stroke="url(#seal-brass)"
          strokeWidth="2"
          opacity="0.85"
        />
        <circle cx="210" cy="210" r="46" fill="rgba(255,255,255,0.05)" />
      </motion.svg>

      {/* Static label — counter-rotation-free, always upright and legible */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <span
          className="font-cormorant font-700"
          style={{ color: "#F4D98C", fontSize: "2.4rem", lineHeight: 1 }}
        >
          {yearsLabel}
        </span>
        <span
          className="font-raleway"
          style={{
            color: "#E8DCC0",
            fontSize: "0.7rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            opacity: 0.85,
            marginTop: 4,
          }}
        >
          Years of Healing
        </span>
      </div>
    </div>
  );
}