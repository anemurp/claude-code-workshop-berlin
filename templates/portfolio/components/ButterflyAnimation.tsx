"use client";
import { useState, useEffect, useRef } from "react";

type Phase = "idle" | "flapping" | "flying" | "settling";

const PURPLE = "#6B5CE7";

export function ButterflyAnimation() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [isAnimating, setIsAnimating] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("butterfly-clicked")) setShowHint(false);
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mq.matches);
    }
    return () => timeoutsRef.current.forEach(clearTimeout);
  }, []);

  function handleClick() {
    if (isAnimating || reducedMotion) return;
    setIsAnimating(true);
    setShowHint(false);
    if (typeof window !== "undefined") localStorage.setItem("butterfly-clicked", "1");

    setPhase("flapping");
    const t1 = setTimeout(() => setPhase("flying"),   400);
    const t2 = setTimeout(() => setPhase("settling"), 2600);
    const t3 = setTimeout(() => { setPhase("idle"); setIsAnimating(false); }, 3600);
    timeoutsRef.current = [t1, t2, t3];
  }

  const wingR: React.CSSProperties = {
    transformOrigin: "102px 90px",
    animation: reducedMotion ? "none"
      : phase === "flapping" || phase === "flying" ? "flapRight 0.35s ease-in-out infinite"
      : phase === "settling" ? "flapRightSlow 1.5s ease-in-out infinite"
      : "none",
  };

  const wingL: React.CSSProperties = {
    transformOrigin: "98px 90px",
    animation: reducedMotion ? "none"
      : phase === "flapping" || phase === "flying" ? "flapLeft 0.35s ease-in-out infinite"
      : phase === "settling" ? "flapLeftSlow 1.5s ease-in-out infinite"
      : "none",
  };

  const wrapperStyle: React.CSSProperties = {
    cursor: "pointer",
    minWidth: 44,
    minHeight: 44,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    animation: reducedMotion ? "none"
      : phase === "flying" ? "flyAround 2s ease-in-out"
      : phase === "idle"   ? "butterfly-float 3s ease-in-out infinite"
      : "none",
  };

  return (
    <div className="flex flex-col items-center">
      <div onClick={handleClick} style={wrapperStyle}>
        <svg
          role="img"
          viewBox="0 0 200 180"
          className="butterfly-svg w-[100px] md:w-[130px] h-auto"
          aria-labelledby="butterfly-title butterfly-desc"
        >
          <title id="butterfly-title">Purple butterfly</title>
          <desc id="butterfly-desc">An interactive purple butterfly illustration. Click to watch it flutter.</desc>

          <defs>
            <filter id="linocut" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves={3} result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale={2} xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>

          <g filter="url(#linocut)">
            {/* Right wings */}
            <g id="rw" className="butterfly-wing" style={wingR}>
              <path d="M102,85 Q128,50 158,44 Q174,50 172,70 Q166,90 148,104 Q128,116 102,108 Z" fill="#2a1a5e" />
              <path d="M102,88 Q124,58 150,54 Q162,62 160,76 Q154,92 136,104 Q118,112 102,106 Z" fill={PURPLE} />
              <path d="M102,90 Q124,66 152,62" stroke="#c4b8f0" strokeWidth={1.8} strokeLinecap="round" fill="none" />
              <path d="M102,96 Q126,76 156,74" stroke="#c4b8f0" strokeWidth={1.8} strokeLinecap="round" fill="none" />
              <path d="M102,102 Q124,88 152,86" stroke="#c4b8f0" strokeWidth={1.8} strokeLinecap="round" fill="none" />
              <circle cx={160} cy={50} r={2} fill="#c4b8f0" />
              <circle cx={168} cy={62} r={2} fill="#c4b8f0" />
              <circle cx={170} cy={74} r={2} fill="#c4b8f0" />
              <circle cx={166} cy={86} r={2} fill="#c4b8f0" />
              <circle cx={158} cy={96} r={2} fill="#c4b8f0" />
              <circle cx={148} cy={106} r={2} fill="#c4b8f0" />
              <path d="M102,108 Q128,112 146,128 Q154,142 148,154 Q136,160 120,158 Q108,152 102,136 Z" fill="#2a1a5e" />
              <path d="M102,112 Q124,116 140,130 Q146,142 140,152 Q130,156 116,154 Q106,148 102,134 Z" fill={PURPLE} />
              <path d="M102,114 Q124,120 140,134" stroke="#c4b8f0" strokeWidth={1.8} strokeLinecap="round" fill="none" />
              <path d="M102,122 Q120,128 134,142" stroke="#c4b8f0" strokeWidth={1.8} strokeLinecap="round" fill="none" />
              <circle cx={146} cy={132} r={2} fill="#c4b8f0" />
              <circle cx={150} cy={144} r={2} fill="#c4b8f0" />
              <circle cx={144} cy={154} r={2} fill="#c4b8f0" />
              <circle cx={132} cy={160} r={2} fill="#c4b8f0" />
              <circle cx={118} cy={160} r={2} fill="#c4b8f0" />
            </g>

            {/* Left wings */}
            <g id="lw" className="butterfly-wing" style={wingL}>
              <path d="M98,85 Q72,50 42,44 Q26,50 28,70 Q34,90 52,104 Q72,116 98,108 Z" fill="#2a1a5e" />
              <path d="M98,88 Q76,58 50,54 Q38,62 40,76 Q46,92 64,104 Q82,112 98,106 Z" fill={PURPLE} />
              <path d="M98,90 Q76,66 48,62" stroke="#c4b8f0" strokeWidth={1.8} strokeLinecap="round" fill="none" />
              <path d="M98,96 Q74,76 44,74" stroke="#c4b8f0" strokeWidth={1.8} strokeLinecap="round" fill="none" />
              <path d="M98,102 Q76,88 48,86" stroke="#c4b8f0" strokeWidth={1.8} strokeLinecap="round" fill="none" />
              <circle cx={40} cy={50} r={2} fill="#c4b8f0" />
              <circle cx={32} cy={62} r={2} fill="#c4b8f0" />
              <circle cx={30} cy={74} r={2} fill="#c4b8f0" />
              <circle cx={34} cy={86} r={2} fill="#c4b8f0" />
              <circle cx={42} cy={96} r={2} fill="#c4b8f0" />
              <circle cx={52} cy={106} r={2} fill="#c4b8f0" />
              <path d="M98,108 Q72,112 54,128 Q46,142 52,154 Q64,160 80,158 Q92,152 98,136 Z" fill="#2a1a5e" />
              <path d="M98,112 Q76,116 60,130 Q54,142 60,152 Q70,156 84,154 Q94,148 98,134 Z" fill={PURPLE} />
              <path d="M98,114 Q76,120 60,134" stroke="#c4b8f0" strokeWidth={1.8} strokeLinecap="round" fill="none" />
              <path d="M98,122 Q80,128 66,142" stroke="#c4b8f0" strokeWidth={1.8} strokeLinecap="round" fill="none" />
              <circle cx={54} cy={132} r={2} fill="#c4b8f0" />
              <circle cx={50} cy={144} r={2} fill="#c4b8f0" />
              <circle cx={56} cy={154} r={2} fill="#c4b8f0" />
              <circle cx={68} cy={160} r={2} fill="#c4b8f0" />
              <circle cx={82} cy={160} r={2} fill="#c4b8f0" />
            </g>

            {/* Body */}
            <rect x={96} y={82} width={8} height={56} rx={4} fill="#1C1C1C" />
            <line x1={96} y1={94}  x2={104} y2={94}  stroke="#c4b8f0" strokeWidth={1} />
            <line x1={96} y1={104} x2={104} y2={104} stroke="#c4b8f0" strokeWidth={1} />
            <line x1={96} y1={114} x2={104} y2={114} stroke="#c4b8f0" strokeWidth={1} />
            <line x1={96} y1={124} x2={104} y2={124} stroke="#c4b8f0" strokeWidth={1} />
            <path d="M100,82 Q112,66 118,54" stroke="#1C1C1C" strokeWidth={1.8} fill="none" strokeLinecap="round" />
            <circle cx={119} cy={52} r={3} fill="#1C1C1C" />
            <path d="M100,82 Q88,66 82,54" stroke="#1C1C1C" strokeWidth={1.8} fill="none" strokeLinecap="round" />
            <circle cx={81} cy={52} r={3} fill="#1C1C1C" />
          </g>
        </svg>
      </div>

      {showHint && (
        <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 4, textAlign: "center", letterSpacing: "0.04em" }}>
          click me
        </p>
      )}
    </div>
  );
}
