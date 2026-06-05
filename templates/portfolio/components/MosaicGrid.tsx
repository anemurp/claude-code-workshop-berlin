"use client";

import { useRef, useEffect } from "react";

const SPEEDS = [-80, 60, -100];
// Columns with positive speed drift DOWN, so start them shifted up by that amount
// so there's visible content above the container edge to travel through.
const INITIAL_Y = SPEEDS.map(s => (s > 0 ? -s : 0));

const COLUMNS = [
  [
    { src: "/images/photo.png",                height: 300 },
    { src: "/case-studies/TeacherReports.png", height: 200 },
    { src: "/images/Rudy.png",                 height: 220 },
    { src: "/case-studies/reading-labs.png",   height: 200 },
  ],
  [
    { src: "/case-studies/New-lit.png",              height: 200 },
    { src: "/images/Eden.png",                       height: 220 },
    { src: "/case-studies/teacher-reports-crop.png", height: 180 },
    { src: "/images/Sandy.png",                      height: 220 },
  ],
  [
    { src: "/images/Karlina.png",              height: 220 },
    { src: "/images/MaryBeth.png",             height: 220 },
    { src: "/case-studies/TeacherReports.png", height: 200 },
    { src: "/images/Zoe.png",                  height: 220 },
  ],
];

const CONTAINER_H = 540;
const GAP = 12;

function getProgress(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const total = window.innerHeight + rect.height;
  return Math.max(0, Math.min(1, (window.innerHeight - rect.top) / total));
}

export function MosaicGrid() {
  const outerRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const rafRef = useRef<number | null>(null);
  const activeRef = useRef(false);

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
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={ii}
                src={img.src}
                alt=""
                style={{
                  width: "100%",
                  height: img.height,
                  objectFit: "cover",
                  borderRadius: 10,
                  display: "block",
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
