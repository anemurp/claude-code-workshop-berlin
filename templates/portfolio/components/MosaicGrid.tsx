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
  "/about_pictures/mountain.jpeg": {
    text: "I am Mexican-American and grew up speaking Spanish and English",
    bg: "#6B5CE7",
    fg: "#ffffff",
  },
  "/about_pictures/arifana.jpg": {
    text: "Catch me taking pictures with my film camera everywhere I go!",
    bg: "#00C853",
    fg: "#ffffff",
  },
  "/about_pictures/denmark.jpeg": {
    text: "I traveled to 30 countries before turning 30",
    bg: "#FF3D81",
    fg: "#ffffff",
  },
  "/about_pictures/climbing.jpeg": {
    text: "I love to spend time outdoors to recharge",
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
    { src: "/about_pictures/mountain.jpeg", height: 300, position: "center 78%" },
    { src: "/about_pictures/denmark.jpeg",  height: 240 },
    { src: "/about_pictures/sunset Small.jpeg", height: 260 },
    { src: "/about_pictures/mountain.jpeg", height: 300, position: "center 78%" },
  ],
  [
    { src: "/about_pictures/salt.jpeg",     height: 260 },
    { src: "/about_pictures/climbing.jpeg", height: 240 },
    { src: "/about_pictures/salt.jpeg",     height: 260 },
    { src: "/about_pictures/climbing.jpeg", height: 240 },
  ],
  [
    { src: "/about_pictures/arifana.jpg",  height: 300 },
    { src: "/about_pictures/Italy.jpeg",    height: 280 },
    { src: "/about_pictures/arifana.jpg",  height: 300 },
    { src: "/about_pictures/Italy.jpeg",    height: 280 },
  ],
];

// ── Parallax config ───────────────────────────────────────────────────────────
// How far (in px) each column slides upward over the pinned scroll. Tuned per
// column so that when the pin ends, the third image in each column is fully
// revealed. (All negative = all columns slide up to uncover lower rows.)
const SPEEDS = [-350, -310, -430];
// Nudge every column down a little so the top of the first images isn't clipped.
const TOP_OFFSET = 24;
const INITIAL_Y = SPEEDS.map((s) => (s > 0 ? -s : 0) + TOP_OFFSET);
// How many pixels of scrolling the mosaic stays pinned for while it reveals the
// next level of images. Bigger = the mosaic stays sticky longer.
const PIN_SCROLL = 600;
// Height of the sticky navbar above the mosaic (Tailwind h-14 = 56px). The
// mosaic pins right below it so it sticks from the very first scroll.
const NAV_OFFSET = 56;
const GAP = 12;
const DESKTOP_BUBBLE_W = 240;
const MOBILE_BUBBLE_W = 180;

// ── ImageTile ─────────────────────────────────────────────────────────────────
function ImageTile({
  src,
  height,
  position,
  bubble,
  tileId,
  activeTouchId,
  onTap,
  isTouch,
}: {
  src: string;
  height: number;
  position?: string;
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
          objectPosition: position ?? "center",
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
// The mosaic pins at NAV_OFFSET. As you scroll, the wrapper's top edge moves
// from NAV_OFFSET up to NAV_OFFSET - PIN_SCROLL. We turn that into a 0 → 1
// progress value that drives the reveal.
function getProgress(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return Math.max(0, Math.min(1, (NAV_OFFSET - rect.top) / PIN_SCROLL));
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
        // Tall "scroll track" — gives the page extra scroll distance to spend
        // while the mosaic below stays pinned and reveals more images.
        position: "relative",
        // Inner sticky height (100vh - 56px nav) + PIN_SCROLL (600px reveal),
        // so the mosaic unpins exactly when the third row finishes revealing.
        height: "calc(100vh + 544px)",
      }}
    >
    <div
      style={{
        // The actual mosaic: sticks just below the navbar while you scroll
        // through the track above, so it's pinned from the very first scroll.
        position: "sticky",
        top: NAV_OFFSET,
        height: "calc(100vh - 56px)",
        overflow: "hidden",
        display: "flex",
        gap: GAP,
        padding: "0 16px",
        boxSizing: "border-box",
        // Fade just the bottom ~24px of the mosaic to transparent so the images
        // dissolve subtly into the page background.
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black calc(100% - 24px), transparent 100%)",
        maskImage:
          "linear-gradient(to bottom, black 0%, black calc(100% - 24px), transparent 100%)",
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
                position={img.position}
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
    </div>
  );
}
