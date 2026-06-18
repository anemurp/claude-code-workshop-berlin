"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PURPLE = "#6B5CE7"; // used for the callout card title

// --- Double Diamond diagram ------------------------------------------------
// Discover (red) and Define (pink) form the first diamond, Develop is the big
// layered-purple second diamond (AI-led light → human-led dark), and Deliver
// (blue) closes it. Click any phase to reveal the matching copy below.

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
  const calloutRef = useRef<HTMLDivElement>(null);

  const toggle = (id: string) => setActive(active === id ? null : id);

  // When a phase is clicked, smoothly scroll the surfaced text into view.
  useEffect(() => {
    if (active && calloutRef.current) {
      calloutRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [active]);

  return (
    <div>
      <svg
        width="100%"
        viewBox="0 0 820 460"
        preserveAspectRatio="xMidYMid meet"
        className="h-auto w-full"
        role="img"
      >
        <title>Double Diamond diagram showing Discover, Define, Develop, Deliver</title>
        <desc>Double Diamond structure with Discover in red, Define in pink, Develop as layered purple triangles, and Deliver in blue. Labels outside shapes along diagonal edges, Problem and Solution labels at the far ends.</desc>

        <g className="phase" id="ph-discover" onClick={() => toggle('discover')} style={{ cursor: 'pointer' }}>
          <polygon points="80,250 170,215 170,285" fill="#E63946" />
        </g>
        <g className="phase" id="ph-define" onClick={() => toggle('define')} style={{ cursor: 'pointer' }}>
          <polygon points="170,215 260,250 170,285" fill="#FF3D81" />
        </g>
        <polygon points="80,250 170,215 260,250 170,285" fill="none" stroke="#1a1a2e" strokeWidth="1.5" opacity="0.12" />

        <g className="phase" id="ph-develop" onClick={() => toggle('develop')} style={{ cursor: 'pointer' }}>
          <polygon points="260,250 650,60 650,440" fill="#CECBF6" />
          <polygon points="260,250 650,92 650,408" fill="#AFA9EC" />
          <polygon points="260,250 650,124 650,376" fill="#8B82E0" />
          <polygon points="260,250 650,156 650,344" fill="#534AB7" />
          <polygon points="260,250 650,188 650,312" fill="#3C3489" />
        </g>
        <g className="phase" id="ph-deliver" onClick={() => toggle('deliver')} style={{ cursor: 'pointer' }}>
          <polygon points="650,60 740,250 650,440" fill="#2D7FF9" />
        </g>
        <polygon points="260,250 650,60 740,250 650,440" fill="none" stroke="#1a1a2e" strokeWidth="1.5" opacity="0.12" />

        <text x="108" y="217" textAnchor="middle" fill="#E63946" style={{ fontWeight: 700, fontSize: 15 }} transform="rotate(-23, 108, 217)">Discover</text>
        <text x="218" y="217" textAnchor="middle" fill="#FF3D81" style={{ fontWeight: 700, fontSize: 15 }} transform="rotate(23, 218, 217)">Define</text>
        <text x="430" y="138" textAnchor="middle" fill="#3C3489" style={{ fontWeight: 700, fontSize: 16 }} transform="rotate(-28, 430, 138)">Develop</text>
        <text x="708" y="135" textAnchor="middle" fill="#2D7FF9" style={{ fontWeight: 700, fontSize: 15 }} transform="rotate(64, 708, 135)">Deliver</text>

        <circle cx="80" cy="250" r="7" fill="#1a1a2e" />
        <circle cx="740" cy="250" r="7" fill="#1a1a2e" />

        <text x="30" y="250" textAnchor="middle" dominantBaseline="central" fill="#1a1a2e" style={{ fontWeight: 700, fontSize: 14 }}>Problem</text>
        <text x="790" y="250" textAnchor="middle" dominantBaseline="central" fill="#1a1a2e" style={{ fontWeight: 700, fontSize: 14 }}>Solution</text>
      </svg>

      {/* Click callout — fades in below the diagram, swaps smoothly between phases */}
      <div ref={calloutRef} className="scroll-mt-24">
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
