"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const PALETTE = ["#1B2A6B", "#E8612A", "#1B6B6B", "#7F77DD", "#3D6B35", "#C4521A", "#2B4A8C"];
const SPRING = "cubic-bezier(0.34,1.56,0.64,1)";
const LETTERS = "complexity".split("");

type LetterState = { tx: number; ty: number; r: number; s: number; c: string };

function randomLetter(): LetterState {
  return {
    tx: Math.random() * 52 - 26,
    ty: Math.random() * 40 - 20,
    r: Math.random() * 76 - 38,
    s: 0.72 + Math.random() * 0.65,
    c: PALETTE[Math.floor(Math.random() * PALETTE.length)],
  };
}

const resetLetter = (): LetterState => ({ tx: 0, ty: 0, r: 0, s: 1, c: "" });

type WordProps = {
  isTouch: boolean;
  onFirstHover: () => void;
  isActive: boolean;
  onActivate: () => void;
};

// Ghost/real technique: ghost holds layout width, real word sits absolutely on top
function DesignWord({ isTouch, onFirstHover, isActive, onActivate }: WordProps) {
  const [hovered, setHovered] = useState(false);
  const active = isTouch ? isActive : hovered;

  return (
    <span
      style={{ display: "inline-block", position: "relative", cursor: "default" }}
      onMouseEnter={isTouch ? undefined : () => { setHovered(true); onFirstHover(); }}
      onMouseLeave={isTouch ? undefined : () => setHovered(false)}
      onClick={isTouch ? () => { onFirstHover(); onActivate(); } : undefined}
    >
      {/* Ghost — invisible, holds Inter weight-500 width permanently */}
      <span aria-hidden="true" style={{ visibility: "hidden", fontFamily: "Inter, ui-sans-serif, sans-serif", fontWeight: 500, userSelect: "none" }}>
        Design
      </span>
      {/* Real — transitions to Caveat on activate */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          textAlign: "center",
          userSelect: "none",
          fontFamily: active ? "var(--font-caveat), cursive" : "Inter, ui-sans-serif, sans-serif",
          fontWeight: active ? 700 : 500,
          color: active ? "#E8612A" : "inherit",
          transform: active ? "rotate(-2deg) scale(1.08)" : "rotate(0deg) scale(1)",
          letterSpacing: active ? "0.02em" : "inherit",
          transition: `color 0.25s ease, transform 0.35s ${SPRING}`,
        }}
      >
        Design
      </span>
    </span>
  );
}

function SimpleWord({
  children,
  hoverColor,
  hoverTransform,
  isTouch,
  onFirstHover,
  isActive,
  onActivate,
}: WordProps & { children: string; hoverColor: string; hoverTransform: string }) {
  const [hovered, setHovered] = useState(false);
  const active = isTouch ? isActive : hovered;

  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        cursor: "default",
        userSelect: "none",
        color: active ? hoverColor : "inherit",
        transform: active ? hoverTransform : "scale(1) rotate(0deg)",
        transition: `transform 0.35s ${SPRING}, color 0.25s ease`,
      }}
      onMouseEnter={isTouch ? undefined : () => { setHovered(true); onFirstHover(); }}
      onMouseLeave={isTouch ? undefined : () => setHovered(false)}
      onClick={isTouch ? () => { onFirstHover(); onActivate(); } : undefined}
    >
      {children}
    </span>
  );
}

function ComplexityWord({ isTouch, onFirstHover, isActive, onActivate }: WordProps) {
  const [states, setStates] = useState<LetterState[]>(() => LETTERS.map(resetLetter));
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchReshuffleRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const jumble = useCallback(() => {
    setStates(LETTERS.map(() => randomLetter()));
  }, []);

  // Desktop: continuous interval while hovered
  const handleDesktopEnter = () => {
    onFirstHover();
    jumble();
    intervalRef.current = setInterval(jumble, 600);
  };
  const handleDesktopLeave = () => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    setStates(LETTERS.map(resetLetter));
  };

  // Touch: jumble on tap, reshuffle once at 600ms, parent resets at 1500ms
  const handleTouchTap = () => {
    onFirstHover();
    onActivate();
    jumble();
    touchReshuffleRef.current = setTimeout(jumble, 600);
  };

  // When parent resets activeWord (isActive goes false), clear timer and snap back
  useEffect(() => {
    if (isTouch && !isActive) {
      if (touchReshuffleRef.current) { clearTimeout(touchReshuffleRef.current); touchReshuffleRef.current = null; }
      setStates(LETTERS.map(resetLetter));
    }
  }, [isActive, isTouch]);

  useEffect(() => () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (touchReshuffleRef.current) clearTimeout(touchReshuffleRef.current);
  }, []);

  return (
    <span
      aria-label="complexity"
      style={{ display: "inline-block", cursor: "default", userSelect: "none" }}
      onMouseEnter={isTouch ? undefined : handleDesktopEnter}
      onMouseLeave={isTouch ? undefined : handleDesktopLeave}
      onClick={isTouch ? handleTouchTap : undefined}
    >
      {LETTERS.map((letter, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: "inline-block",
            transition: `transform ${0.3 + i * 0.02}s ${SPRING}, color 0.25s ease`,
            transform: `translate(${states[i].tx}px, ${states[i].ty}px) rotate(${states[i].r}deg) scale(${states[i].s})`,
            color: states[i].c || "inherit",
          }}
        >
          {letter}
        </span>
      ))}
    </span>
  );
}

function ClarityWord({ isTouch, onFirstHover, isActive, onActivate }: WordProps) {
  const [hovered, setHovered] = useState(false);
  const active = isTouch ? isActive : hovered;

  return (
    <span
      style={{ display: "inline-block", position: "relative", cursor: "default" }}
      onMouseEnter={isTouch ? undefined : () => { setHovered(true); onFirstHover(); }}
      onMouseLeave={isTouch ? undefined : () => setHovered(false)}
      onClick={isTouch ? () => { onFirstHover(); onActivate(); } : undefined}
    >
      {/* Ghost — always holds the expanded letter-spacing width, preventing reflow */}
      <span aria-hidden="true" style={{ visibility: "hidden", letterSpacing: "0.06em", userSelect: "none" }}>
        clarity
      </span>
      {/* Real — sits on top */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          textAlign: "center",
          userSelect: "none",
          color: active ? "#1B6B6B" : "inherit",
          transform: active ? "scale(1.16)" : "scale(1)",
          letterSpacing: active ? "0.06em" : "inherit",
          transition: `transform 0.35s ${SPRING}, color 0.25s ease, letter-spacing 0.25s ease`,
        }}
      >
        clarity
      </span>
    </span>
  );
}

export function InteractiveHeadline() {
  const [hintVisible, setHintVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("hero-hint-seen")) setHintVisible(true);
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  const hideHint = useCallback(() => {
    setHintVisible(false);
    localStorage.setItem("hero-hint-seen", "1");
  }, []);

  const activateWord = useCallback((name: string) => {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    setActiveWord(name);
    resetTimerRef.current = setTimeout(() => setActiveWord(null), 1500);
  }, []);

  useEffect(() => () => { if (resetTimerRef.current) clearTimeout(resetTimerRef.current); }, []);

  const wp = (name: string): WordProps => ({
    isTouch,
    onFirstHover: hideHint,
    isActive: activeWord === name,
    onActivate: () => activateWord(name),
  });

  return (
    <div>
      <h1
        aria-label="Design that turns complexity into clarity"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "baseline",
          gap: "0.2em",
          fontSize: "clamp(36px, 6vw, 72px)",
          fontWeight: 500,
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          margin: 0,
        }}
      >
        <DesignWord {...wp("design")} />
        <SimpleWord {...wp("that")} hoverColor="#B4B2A9" hoverTransform="scale(0.88) rotate(4deg)">that</SimpleWord>
        <SimpleWord {...wp("turns")} hoverColor="#1B2A6B" hoverTransform="rotate(-180deg) scale(1.05)">turns</SimpleWord>
        <ComplexityWord {...wp("complexity")} />
        <SimpleWord {...wp("into")} hoverColor="#B4B2A9" hoverTransform="scale(0.82) rotate(-3deg)">into</SimpleWord>
        <ClarityWord {...wp("clarity")} />
      </h1>

      <p
        aria-hidden="true"
        style={{
          fontSize: "13px",
          fontStyle: "italic",
          color: "var(--muted)",
          textAlign: "center",
          marginTop: "8px",
          opacity: hintVisible ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {isTouch ? "tap the words ↑" : "hover over the words ↑"}
      </p>
    </div>
  );
}
