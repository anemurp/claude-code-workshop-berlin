"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PURPLE = "#6B5CE7"; // used for the callout card title

// --- The modified Double Diamond diagram -----------------------------------
// Discover / Define / Deliver are small solid triangles (half-height 35 from
// the centre line at y=250). Develop is a tall triangle (half-height 150)
// rendered as five nested layers going light → dark to show the AI-led → Human-led
// gradient. Click a phase to reveal the matching copy.

type SimplePhase = {
  id: string;
  name: string;
  fill: string;
  points: string;
  labelX: number;
  labelY: number;
  angle: number;
};

// Discover, Define, Deliver — solid fills, white labels.
const SIMPLE_PHASES: SimplePhase[] = [
  { id: "discover", name: "Discover", fill: "#FF6B35", points: "40,250 130,215 220,250 130,285", labelX: 130, labelY: 250, angle: -15 },
  { id: "define", name: "Define", fill: "#FF3D81", points: "220,250 265,215 300,250 265,285", labelX: 252, labelY: 250, angle: 15 },
  { id: "deliver", name: "Deliver", fill: "#00C853", points: "430,250 495,215 560,250 495,285", labelX: 495, labelY: 250, angle: 15 },
];

// Develop — five nested triangles, same left tip (300,250) and right edge at
// x=430, with evenly stepped half-heights from 150 (outer) to 30 (inner).
const DEVELOP_LAYERS = [
  { half: 150, color: "#CECBF6" },
  { half: 118, color: "#AFA9EC" },
  { half: 86, color: "#7F77DD" },
  { half: 54, color: "#534AB7" },
  { half: 22, color: "#3C3489" },
];

const CALLOUTS: Record<string, { name: string; callout: string }> = {
  discover: {
    name: "Discover",
    callout:
      "AI synthesizes market research, competitive analysis, and user transcripts faster than manual synthesis ever could. Discovery is now faster and more thorough — not a trade-off between speed and depth.",
  },
  define: {
    name: "Define",
    callout:
      "AI helps organize themes, surface patterns, and build user profiles in a fraction of the time. The framing still comes from me — but I get there faster.",
  },
  develop: {
    name: "Develop",
    callout:
      "This is where AI changes everything. More directions, more iterations, more prototypes than time would previously allow. AI didn't just speed this phase up — it expanded what's possible inside it.",
  },
  deliver: {
    name: "Deliver",
    callout:
      "Tools like Claude Code, Cursor, Lovable, and Antigravity have collapsed the build time. What used to take weeks of engineering handoff now ships in hours or days.",
  },
};

function DoubleDiamond() {
  const [active, setActive] = useState<string | null>(null);
  const current = active ? CALLOUTS[active] : null;

  return (
    <div>
      <p className="mb-2 text-xs text-ink/45">Click a phase to learn more</p>

      <svg
        viewBox="0 80 600 380"
        width="100%"
        className="h-auto w-full"
        role="img"
        aria-label="A modified double diamond diagram: Discover, Define and Deliver are small equal phases, Develop is a much larger, layered phase."
      >
        {/* Discover, Define, Deliver — solid triangles */}
        {SIMPLE_PHASES.map((ph) => (
          <polygon
            key={ph.id}
            points={ph.points}
            fill={ph.fill}
            className="cursor-pointer transition-opacity duration-200 hover:opacity-[0.85]"
            onClick={() => setActive(active === ph.id ? null : ph.id)}
          />
        ))}

        {/* Develop — five nested triangles, outer (light) to inner (dark) */}
        <g
          className="cursor-pointer transition-opacity duration-200 hover:opacity-[0.85]"
          onClick={() => setActive(active === "develop" ? null : "develop")}
        >
          {DEVELOP_LAYERS.map((ly) => (
            <polygon key={ly.half} points={`300,250 430,${250 - ly.half} 430,${250 + ly.half}`} fill={ly.color} />
          ))}
        </g>

        {/* Phase name labels — white, rotated to sit on the diagonal edges */}
        {SIMPLE_PHASES.map((ph) => (
          <text
            key={`${ph.id}-label`}
            x={ph.labelX}
            y={ph.labelY}
            transform={`rotate(${ph.angle} ${ph.labelX} ${ph.labelY})`}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="13"
            fontWeight="600"
            fill="#FFFFFF"
            className="pointer-events-none select-none"
          >
            {ph.name}
          </text>
        ))}
        <text
          x="354"
          y="163"
          transform="rotate(-49 354 163)"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="13"
          fontWeight="600"
          fill="#3C3489"
          className="pointer-events-none select-none"
        >
          Develop
        </text>

        {/* Endpoint dots at the far-left and far-right tips */}
        <circle cx="40" cy="250" r="5" fill="#0F0F0F" />
        <circle cx="560" cy="250" r="5" fill="#0F0F0F" />

        {/* Problem Definition node at the centre join */}
        <circle cx="300" cy="250" r="28" fill="#FFFFFF" stroke="#0F0F0F" strokeWidth="1.5" />
        <text x="300" y="247" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0F0F0F" className="pointer-events-none select-none">
          Problem
        </text>
        <text x="300" y="259" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0F0F0F" className="pointer-events-none select-none">
          Definition
        </text>

        {/* Develop legend: AI-led (light) → Human-led (dark) */}
        <rect x="302" y="416" width="14" height="14" fill="#CECBF6" />
        <text x="321" y="426" fontSize="11" fill="#888888" className="pointer-events-none select-none">
          AI-led
        </text>
        <text x="352" y="426" fontSize="11" fill="#888888" className="pointer-events-none select-none">
          →
        </text>
        <rect x="366" y="416" width="14" height="14" fill="#3C3489" />
        <text x="385" y="426" fontSize="11" fill="#888888" className="pointer-events-none select-none">
          Human-led
        </text>
      </svg>

      {/* Click callout — fades in below the diagram, swaps smoothly between phases */}
      <AnimatePresence mode="wait">
        {current && (
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="mt-4 rounded-xl border border-ink/10 bg-white p-4"
          >
            <p className="text-sm font-semibold" style={{ color: PURPLE }}>
              {current.name}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "#444444" }}>
              {current.callout}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function AIProcess() {
  return (
    <section id="ai-philosophy" className="mt-32 scroll-mt-24">
      <h2 style={{ fontSize: 28, fontWeight: 600 }}>How AI fits into my design process</h2>

      <p className="mt-4 text-sm leading-relaxed" style={{ color: "#666666" }}>
        AI compressed the timeline at every phase — faster research synthesis, faster definition,
        faster delivery. But in Develop, something different happened: AI didn&apos;t just speed
        things up, it expanded what&apos;s possible. More directions, more iterations, more
        prototypes than time would ever have allowed before.
      </p>

      <div className="mt-6">
        <DoubleDiamond />
      </div>
    </section>
  );
}
