"use client";

import { useRef, useEffect, useState } from "react";

// ── Bubble data ───────────────────────────────────────────────────────────────
type BubbleConfig = { text: string; bg: string; fg: string };

const BUBBLES: Record<string, BubbleConfig> = {
  "/about_pictures/Design.png": {
    text: "Facilitating workshops and design sprints",
    bg: "#FFD600",
    fg: "#1a1a1a",
  },
  "/about_pictures/salt.jpeg": {
    text: "I've lived in 5 countries: US, Mexico, Argentina, Spain, and Germany",
    bg: "#2D7FF9",
    fg: "#ffffff",
  },
  "/about_pictures/Teaching.png": {
    text: "5 years as a middle and high school Spanish teacher",
    bg: "#00C853",
    fg: "#ffffff",
  },
  "/about_pictures/denmark.jpeg": {
    text: "30 countries before turning 30",
    bg: "#FF3D81",
    fg: "#ffffff",
  },
  "/about_pictures/climbing.jpeg": {
    text: "Outdoor time keeps me sane",
    bg: "#FF6B35",
    fg: "#ffffff",
  },
  "/about_pictures/Italy.jpeg": {
    text: "Find me near water whenever possible",
    bg: "#00B4D8",
    fg: "#ffffff",
  },
};

// ── Column data ───────────────────────────────────────────────────────────────
const COLUMNS = [
  [
    { src: "/about_pictures/Design.png",    height: 280 },
    { src: "/about_pictures/denmark.jpeg",  height: 220 },
    { src: "/about_pictures/mountain.jpeg", height: 240 },
    { src: "/about_pictures/Design.png",    height: 280 },
  ],
  [
    { src: "/about_pictures/salt.jpeg",     height: 240 },
    { src: "/about_pictures/climbing.jpeg", height: 220 },
    { src: "/about_pictures/salt.jpeg",     height: 240 },
    { src: "/about_pictures/climbing.jpeg", height: 220 },
  ],
  [
    { src: "/about_pictures/Teaching.png",  height: 280 },
    { src: "/about_pictures/Italy.jpeg",    height: 260 },
    { src: "/about_pictures/Teaching.png",  height: 280 },
    { src: "/about_pictures/Italy.jpeg",    height: 260 },
  ],
];

// ── Parallax config ───────────────────────────────────────────────────────────
const SPEEDS = [-80, 60, -100];
const INITIAL_Y = SPEEDS.map((s) => (s > 0 ? -s : 0));
const CONTAINER_H = 540;
const GAP = 12;
const DESKTOP_BUBBLE_W = 240;
const MOBILE_BUBBLE_W = 180;

// ── ImageTile ─────────────────────────────────────────────────────────────────
function ImageTile({
  src,
  height,
  bubble,
  tileId,
  activeTouchId,
  onTap,
  isTouch,
}: {
  src: string;
  height: number;
  bubble?: BubbleConfig;
  tileId: string;
  activeTouchId: string | null;
  onTap: (id: string | null) => void;
  isTouch: boolean;
}) {
  const tileRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const visible = bubble
    ? isTouch
      ? activeTouchId === tileId
      : hovered
    : false;

  // Bubble position
  const tileW = tileRef.current?.offsetWidth ?? 180;
  let bx: number, by: number, bubbleMaxW: string;

  if (isTouch) {
    bx = 10;
    by = 10;
    bubbleMaxW = `min(${MOBILE_BUBBLE_W}px, calc(100% - 20px))`;
  } else {
    const EST_H = 80;
    bx = cursor.x + 14;
    by = Math.max(8, cursor.y - EST_H - 8);
    bubbleMaxW = `${DESKTOP_BUBBLE_W}px`;

    if (bx + DESKTOP_BUBBLE_W > tileW - 8) {
      bx = Math.max(8, tileW - DESKTOP_BUBBLE_W - 8);
    }
    bx = Math.max(8, bx);
  }

  return (
    <div
      ref={tileRef}
      style={{ position: "relative", flexShrink: 0 }}
      onMouseEnter={() => { if (!isTouch && bubble) setHovered(true); }}
      onMouseLeave={() => { if (!isTouch) setHovered(false); }}
      onMouseMove={(e) => {
        if (isTouch || !bubble) return;
        const rect = tileRef.current!.getBoundingClientRect();
        setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onClick={(e) => {
        if (!isTouch || !bubble) return;
        e.stopPropagation();
        onTap(activeTouchId === tileId ? null : tileId);
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        style={{
          width: "100%",
          height,
          objectFit: "cover",
          borderRadius: 10,
          display: "block",
        }}
      />

      {bubble && (
        <div
          aria-hidden
          className={`mosaic-bubble${visible ? " mosaic-bubble--visible" : ""}`}
          style={{
            "--bubble-bg": bubble.bg,
            position: "absolute",
            left: bx,
            top: by,
            maxWidth: bubbleMaxW,
            background: bubble.bg,
            color: bubble.fg,
            borderRadius: 20,
            padding: "12px 18px",
            fontSize: 13,
            fontWeight: 500,
            lineHeight: 1.45,
            fontFamily: "Inter, sans-serif",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            opacity: visible ? undefined : 0,
            pointerEvents: "none",
            zIndex: 20,
          } as React.CSSProperties}
        >
          {bubble.text}
        </div>
      )}
    </div>
  );
}

// ── Parallax helper ───────────────────────────────────────────────────────────
function getProgress(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const total = window.innerHeight + rect.height;
  return Math.max(0, Math.min(1, (window.innerHeight - rect.top) / total));
}

// ── MosaicGrid ────────────────────────────────────────────────────────────────
export function MosaicGrid() {
  const outerRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const rafRef = useRef<number | null>(null);
  const activeRef = useRef(false);
  const [activeTouchId, setActiveTouchId] = useState<string | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  // Detect touch-only device (no hover capability)
  useEffect(() => {
    setIsTouch(!window.matchMedia("(hover: hover)").matches);
  }, []);

  // Parallax scroll
  useEffect(() => {
    function tick() {
      if (!outerRef.current) return;
      const p = getProgress(outerRef.current);
      colRefs.current.forEach((col, i) => {
        if (col) col.style.transform = `translateY(${INITIAL_Y[i] + p * SPEEDS[i]}px)`;
      });
    }

    tick();

    const io = new IntersectionObserver(
      ([entry]) => { activeRef.current = entry.isIntersecting; },
      { rootMargin: "300px" }
    );
    if (outerRef.current) io.observe(outerRef.current);

    function onScroll() {
      if (!activeRef.current) return;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(tick);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Dismiss tap bubble when clicking outside the mosaic
  useEffect(() => {
    if (!isTouch) return;
    function dismiss() { setActiveTouchId(null); }
    document.addEventListener("click", dismiss);
    return () => document.removeEventListener("click", dismiss);
  }, [isTouch]);

  return (
    <div
      ref={outerRef}
      style={{
        height: CONTAINER_H,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        gap: GAP,
        padding: "0 16px",
        boxSizing: "border-box",
        // Fade the bottom ~72px of the mosaic to transparent so the images
        // dissolve into the page background and blend into the About section.
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black calc(100% - 72px), transparent 100%)",
        maskImage:
          "linear-gradient(to bottom, black 0%, black calc(100% - 72px), transparent 100%)",
      }}
    >
      {COLUMNS.map((images, ci) => (
        <div key={ci} style={{ flex: 1, minWidth: 0 }}>
          <div
            ref={(el) => { colRefs.current[ci] = el; }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: GAP,
              willChange: "transform",
              transform: `translateY(${INITIAL_Y[ci]}px)`,
            }}
          >
            {images.map((img, ii) => (
              <ImageTile
                key={`${ci}-${ii}`}
                src={img.src}
                height={img.height}
                bubble={BUBBLES[img.src]}
                tileId={`${ci}-${ii}`}
                activeTouchId={activeTouchId}
                onTap={setActiveTouchId}
                isTouch={isTouch}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
