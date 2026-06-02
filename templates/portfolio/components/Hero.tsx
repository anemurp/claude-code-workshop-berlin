"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { hero } from "../content";

const ease = [0.4, 0, 0.2, 1] as [number, number, number, number];

function line(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease, delay },
  };
}

const TEXT: React.CSSProperties = {
  fontSize: "clamp(28px, 4.5vw, 64px)",
  fontWeight: 800,
  letterSpacing: "-0.03em",
  lineHeight: 1.05,
  fontFamily: '"Inter Display", Inter, sans-serif',
};

const PHOTO_SIZE: React.CSSProperties = {
  width: "clamp(100px, 12vw, 200px)",
  height: "clamp(100px, 12vw, 200px)",
  borderRadius: "50%",
  border: "3px solid white",
  boxShadow: "0 2px 16px rgba(0,0,0,0.12)",
  display: "inline-block",
  verticalAlign: "middle",
};

// State 2 — unlocked (after initial confetti)
const UNLOCKED_GRADIENTS = [
  "linear-gradient(90deg, #8B5CE8, #C044F0, #F04498)",
  "linear-gradient(90deg, #9B44F0, #D840C4, #F04888)",
  "linear-gradient(90deg, #A838F5, #E038A8, #F55078)",
];

// State 3 — cycling palettes (each hover advances the index)
const GRADIENT_CYCLES: string[][] = [
  [ // 0 — Warm
    "linear-gradient(90deg, #E8392A, #F5820A, #E8C020)",
    "linear-gradient(90deg, #F5820A, #E8C020, #E8392A)",
    "linear-gradient(90deg, #E8C020, #E8392A, #F5820A)",
  ],
  [ // 1 — Cool
    "linear-gradient(90deg, #1A2FD4, #0D7A6B, #6B5FE8)",
    "linear-gradient(90deg, #0D7A6B, #6B5FE8, #1A2FD4)",
    "linear-gradient(90deg, #6B5FE8, #1A2FD4, #0D7A6B)",
  ],
  [ // 2 — Nature
    "linear-gradient(90deg, #2A7A1A, #0D7A6B, #6B5FE8)",
    "linear-gradient(90deg, #0D7A6B, #2A7A1A, #1A2FD4)",
    "linear-gradient(90deg, #6B5FE8, #2A7A1A, #0D7A6B)",
  ],
  [ // 3 — Sunset
    "linear-gradient(90deg, #F0A8C0, #E8392A, #6B5FE8)",
    "linear-gradient(90deg, #E8392A, #6B5FE8, #F0A8C0)",
    "linear-gradient(90deg, #6B5FE8, #F0A8C0, #E8392A)",
  ],
];

// Pastel palette matching the unlock gradient
const CONFETTI_COLORS = ["#B8A8E8", "#C8A8F0", "#F0A8C0", "#E8A8D8", "#D4A8F8", "#F5B0B0"];

function spawnConfettiAt(centerX: number, centerY: number) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const count = Math.floor(Math.random() * 5) + 20; // 20–24
  const shapes = ["circle", "rect", "square"];

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const size = Math.random() * 6 + 4; // 4–10px

    particle.style.cssText = `
      position: fixed;
      left: ${centerX}px;
      top: ${centerY}px;
      width: ${shape === "rect" ? size / 2 : size}px;
      height: ${size}px;
      background: ${color};
      border-radius: ${shape === "circle" ? "50%" : "1px"};
      pointer-events: none;
      z-index: 9999;
      transform-origin: center;
    `;
    document.body.appendChild(particle);

    // 40% travel downward (over the text), 60% go in all directions
    // 0–180° produces positive CSS-y (downward on screen)
    const isDownward = Math.random() < 0.4;
    const angleDeg = isDownward
      ? Math.random() * 180          // 0–180° → falls down
      : Math.random() * 360;         // full circle
    const angleRad = (angleDeg * Math.PI) / 180;
    const distance = Math.random() * 120 + 80; // 80–200px

    const x = Math.cos(angleRad) * distance;
    let y = Math.sin(angleRad) * distance;
    if (isDownward) y += Math.random() * 20 + 20; // gravity nudge 20–40px

    const rot = Math.random() * 360 - 180;
    const duration = Math.random() * 600 + 800; // 800–1400ms

    const anim = particle.animate(
      [
        { transform: "translate(-50%,-50%) rotate(0deg) scale(1)", opacity: "1" },
        { transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rot}deg) scale(0.3)`, opacity: "0" },
      ],
      { duration, easing: "ease-out", fill: "forwards" }
    );

    anim.onfinish = () => particle.remove();
  }
}

function spawnConfetti(e: React.MouseEvent<HTMLSpanElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  spawnConfettiAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
}

export function Hero() {
  const [photoError, setPhotoError] = useState(false);
  const [gradientPhase, setGradientPhase] = useState<"initial" | "unlocked" | "cycling">("initial");
  const [isRevealed, setIsRevealed] = useState(false);
  const [cycleIndex, setCycleIndex] = useState(0);
  const photoRef = useRef<HTMLSpanElement>(null);
  const cycleRef = useRef(0);
  // Tracks whether the NEXT gradient fade-in is the first reveal (0.8s) or a hover cycle (0.35s)
  const isFirstReveal = useRef(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsRevealed(true);
      setGradientPhase("unlocked");
      isFirstReveal.current = false;
      return;
    }

    const confettiTimer = setTimeout(() => {
      if (photoRef.current) {
        const rect = photoRef.current.getBoundingClientRect();
        spawnConfettiAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    }, 800);

    // Text starts transitioning while confetti is mid-air
    const revealTimer = setTimeout(() => setIsRevealed(true), 1000);

    // Mark first reveal done once the 0.8s transition has finished
    const revealDoneTimer = setTimeout(() => { isFirstReveal.current = false; }, 1800);

    // Phase unlocks (enables hover interaction) once confetti has settled
    const unlockTimer = setTimeout(() => setGradientPhase("unlocked"), 1800);

    return () => {
      clearTimeout(confettiTimer);
      clearTimeout(revealTimer);
      clearTimeout(revealDoneTimer);
      clearTimeout(unlockTimer);
    };
  }, []);

  function handlePhotoHover(e: React.MouseEvent<HTMLSpanElement>) {
    spawnConfetti(e);
    if (gradientPhase === "unlocked") {
      cycleRef.current = 0;
      setCycleIndex(0);
      setGradientPhase("cycling");
    } else if (gradientPhase === "cycling") {
      const next = (cycleRef.current + 1) % GRADIENT_CYCLES.length;
      cycleRef.current = next;
      setCycleIndex(next);
    }
  }

  const activeGradients = gradientPhase === "cycling" ? GRADIENT_CYCLES[cycleIndex] : UNLOCKED_GRADIENTS;

  // Each text line has two layers: gray (fades out) and gradient (fades in).
  // The key only changes when cycling so hover-triggered palette swaps get a quick fade.
  function gradientLine(id: string, text: string, gradient: string) {
    const cycleKey = gradientPhase === "cycling" ? `c${cycleIndex}` : "base";
    const fadeDuration = isFirstReveal.current ? 0.8 : 0.35;

    return (
      // CSS grid stack: both children sit in cell 1/1, overlapping without absolute positioning.
      // This guarantees text-align:center is inherited correctly by both layers.
      <span style={{ display: "grid", width: "100%", textAlign: "center", overflow: "visible" }}>

        {/* Layer 1 — gray: visible on load, fades out as confetti paints the gradient */}
        <span
          style={{
            gridArea: "1/1",
            textAlign: "center",
            color: "#CCCCCC",
            WebkitTextFillColor: "#CCCCCC",
            opacity: isRevealed ? 0 : 1,
            transition: "opacity 0.8s ease-out",
            pointerEvents: "none",
          }}
        >
          {text}
        </span>

        {/* Layer 2 — gradient: invisible on load (holds grid dimensions), fades in during confetti flight */}
        <motion.span
          key={`${id}-${cycleKey}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isRevealed ? 1 : 0 }}
          transition={{ duration: fadeDuration, ease: "easeIn" }}
          style={{
            gridArea: "1/1",
            textAlign: "center",
            background: gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text" as const,
            overflow: "visible",
          }}
        >
          {text}
        </motion.span>

      </span>
    );
  }

  return (
    <section
      className="pt-[48px] pb-[80px] relative overflow-visible"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="text-center px-6 relative z-10">

        {/* Headline */}
        <h1 style={{ margin: "0 auto", maxWidth: 960, width: "100%", textAlign: "center", overflow: "visible", ...TEXT }}>

          {/* Line 1: I'm [photo] Anna */}
          <motion.span {...line(0)} style={{ display: "block", width: "100%", textAlign: "center", ...TEXT, color: "var(--text)" }}>
            I&apos;m
            <motion.span
              initial={{ scale: 1, opacity: 1 }}
              ref={photoRef}
              onMouseEnter={handlePhotoHover}
              onClick={spawnConfetti}
              style={{ display: "inline-block", verticalAlign: "middle", margin: "0 10px", cursor: "pointer" }}
            >
              {photoError ? (
                <span style={{
                  ...PHOTO_SIZE,
                  backgroundColor: "#E8392A",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: 22,
                  fontWeight: 700,
                }}>
                  AM
                </span>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/images/photo.png"
                  alt="Anna Murphy"
                  onError={() => setPhotoError(true)}
                  style={{
                    ...PHOTO_SIZE,
                    objectFit: "cover",
                    objectPosition: "center top",
                  }}
                />
              )}
            </motion.span>
            Anna
          </motion.span>

          {/* Line 2: Senior Product Designer */}
          <motion.span {...line(0.5)} style={{ display: "block", width: "100%", textAlign: "center", overflow: "visible", ...TEXT, fontSize: "clamp(44px, 6.5vw, 88px)", whiteSpace: "nowrap" }}>
            {gradientLine("role", hero.role, activeGradients[0])}
          </motion.span>

          {/* Lines 3–4: bridging people, + research & AI */}
          <motion.span {...line(0.8)} style={{ display: "block", width: "100%", textAlign: "center", overflow: "visible", ...TEXT, fontSize: "clamp(44px, 6.5vw, 88px)" }}>
            {gradientLine("line2", hero.line2, activeGradients[1])}
            {gradientLine("line3", hero.line3, activeGradients[2])}
          </motion.span>

        </h1>

      </div>
    </section>
  );
}
