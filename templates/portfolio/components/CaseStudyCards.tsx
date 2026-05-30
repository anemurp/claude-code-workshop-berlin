"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type CardStudy = {
  slug: string;
  title: string;
  year: string;
  description: string;
  thumbnail: string;
  tags: string[];
};

const LERP = 0.12;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function CaseStudyCards({ studies }: { studies: CardStudy[] }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const positionRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const tick = () => {
      current.current.x = lerp(current.current.x, target.current.x, LERP);
      current.current.y = lerp(current.current.y, target.current.y, LERP);
      if (positionRef.current) {
        positionRef.current.style.transform = `translate(
          calc(${current.current.x}px + 20px),
          calc(${current.current.y}px - 55%)
        )`;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  const handleEnter = useCallback((slug: string) => {
    current.current = { ...target.current };
    setActiveSlug(slug);
  }, []);

  const handleLeave = useCallback(() => setActiveSlug(null), []);

  const active = studies.find((s) => s.slug === activeSlug);

  return (
    <>
      {/* Cursor preview */}
      <div
        ref={positionRef}
        className="fixed top-0 left-0 z-50 pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <AnimatePresence>
          {active && (
            <motion.div
              key={active.slug}
              className="w-72 rounded-2xl overflow-hidden shadow-2xl"
              style={{ aspectRatio: "16/10" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              {active.thumbnail ? (
                <img
                  src={active.thumbnail}
                  alt={active.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-accent/20 to-ink/10 flex items-end p-4">
                  <span className="text-sm font-semibold text-ink/60 leading-snug">
                    {active.title}
                  </span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card list */}
      <ul className="space-y-14">
        {studies.map((cs) => (
          <li key={cs.slug}>
            <Link href={`/case-studies/${cs.slug}`} className="group block">
              {/* Thumbnail */}
              <div className="w-full aspect-video bg-ink/5 rounded-xl mb-5 overflow-hidden">
                {cs.thumbnail ? (
                  <img
                    src={cs.thumbnail}
                    alt={cs.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm text-ink/25">
                    {cs.title}
                  </div>
                )}
              </div>

              {/* Title row */}
              <div className="flex items-baseline justify-between gap-4">
                <h3
                  className="text-xl font-semibold transition"
                  style={{ color: "var(--text)" }}
                  onMouseEnter={() => handleEnter(cs.slug)}
                  onMouseLeave={handleLeave}
                >
                  {cs.title}
                </h3>
                <span className="text-sm shrink-0" style={{ color: "var(--muted)" }}>
                  {cs.year}
                </span>
              </div>

              {/* Tags */}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {cs.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs rounded-full border border-ink/15 text-ink/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-3 leading-relaxed" style={{ color: "var(--muted)" }}>
                {cs.description}
              </p>

              <span
                className="mt-4 inline-block text-sm font-medium"
                style={{ color: "var(--accent)" }}
              >
                Read case study →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
