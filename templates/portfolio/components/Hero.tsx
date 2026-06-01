"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { hero } from "../content";

const ease = [0.4, 0, 0.2, 1] as [number, number, number, number];
const spring = [0.34, 1.56, 0.64, 1] as [number, number, number, number];

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

function spawnConfettiAt(centerX: number, centerY: number) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const count = Math.floor(Math.random() * 5) + 12;
  const colors = ["#E8392A", "#1A2FD4", "#0D7A6B", "#6B5FE8", "#F5820A", "#2A7A1A"];
  const shapes = ["circle", "rect", "square"];

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const size = Math.random() * 4 + 5;

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

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 80 + 60;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    const rot = Math.random() * 360 - 180;
    const duration = Math.random() * 800 + 1400;

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
  const [cycleIndex, setCycleIndex] = useState(0);
  const photoRef = useRef<HTMLSpanElement>(null);
  const cycleRef = useRef(0);

  useEffect(() => {
    let unlockTimer: ReturnType<typeof setTimeout>;
    const timer = setTimeout(() => {
      if (photoRef.current) {
        const rect = photoRef.current.getBoundingClientRect();
        spawnConfettiAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
      // Unlock gradients shortly after confetti fires
      unlockTimer = setTimeout(() => setGradientPhase("unlocked"), 600);
    }, 1500);
    return () => {
      clearTimeout(timer);
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

  const isInitial = gradientPhase === "initial";
  const activeGradients = gradientPhase === "cycling" ? GRADIENT_CYCLES[cycleIndex] : UNLOCKED_GRADIENTS;

  // Re-mounts with a fade whenever phase or cycleIndex changes.
  // display:block fills the full line width so background-clip:text never clips edge glyphs.
  function gradientLine(id: string, text: string, gradient: string) {
    const textStyle: React.CSSProperties = isInitial
      ? { color: "#AAAAAA", WebkitTextFillColor: "#AAAAAA" }
      : {
          background: gradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text" as const,
        };
    return (
      <motion.span
        key={`${id}-${gradientPhase}-${cycleIndex}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        style={{ display: "block", overflow: "visible", paddingBottom: "0.1em", ...textStyle }}
      >
        {text}
      </motion.span>
    );
  }

  return (
    <section
      className="pt-[48px] pb-[80px] relative overflow-visible"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="text-center px-6 relative z-10">

        {/* Headline */}
        <h1 style={{ margin: "0 auto", maxWidth: "100%", width: "100%", overflow: "visible", ...TEXT }}>

          {/* Line 1: I'm [photo] Anna */}
          <motion.span {...line(0)} style={{ display: "block", ...TEXT, color: "var(--text)" }}>
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
                <Image
                  src="/images/photo.png"
                  alt="Anna Murphy"
                  width={200}
                  height={200}
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
          <motion.span {...line(0.5)} style={{ display: "block", ...TEXT, whiteSpace: "nowrap" }}>
            {gradientLine("role", hero.role, activeGradients[0])}
          </motion.span>

          {/* Lines 3–4: bridging people, + research & AI */}
          <motion.span {...line(0.8)} style={{ display: "block", ...TEXT }}>
            {gradientLine("line2", hero.line2, activeGradients[1])}
            {gradientLine("line3", hero.line3, activeGradients[2])}
          </motion.span>

        </h1>

      </div>
    </section>
  );
}
