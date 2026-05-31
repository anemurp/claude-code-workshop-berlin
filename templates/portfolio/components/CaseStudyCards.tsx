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
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hoveredArrow, setHoveredArrow] = useState<string | null>(null);

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
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #1B2A6B 0%, #E8612A 100%)",
                  }}
                >
                  <span className="text-sm font-semibold text-center px-4" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {active.title}
                  </span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card list */}
      <ul className="space-y-6">
        {studies.map((cs) => (
          <li
            key={cs.slug}
            onMouseEnter={() => setHoveredCard(cs.slug)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              backgroundColor: "var(--card-bg)",
              border: hoveredCard === cs.slug
                ? "1px solid rgba(0,0,0,0.08)"
                : "1px solid #E8E8E8",
              transform: hoveredCard === cs.slug ? "translateY(-6px)" : "translateY(0)",
              boxShadow: hoveredCard === cs.slug
                ? "0 12px 40px rgba(0,0,0,0.12)"
                : "none",
              transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
            }}
          >
            <Link href={`/case-studies/${cs.slug}`} className="block">
              {/* Thumbnail — 16:9 */}
              <div className="w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
                {cs.thumbnail ? (
                  <img
                    src={cs.thumbnail}
                    alt={cs.title}
                    className="w-full h-full object-cover"
                    style={{
                      transform: hoveredCard === cs.slug ? "scale(1.04)" : "scale(1)",
                      transition: "transform 0.4s ease",
                    }}
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #1B2A6B 0%, #E8612A 100%)",
                    }}
                  >
                    <span
                      className="font-bold text-white text-center px-8"
                      style={{ fontSize: "clamp(20px, 4vw, 36px)", opacity: 0.3 }}
                    >
                      {cs.title}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
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
                      style={{
                        fontSize: "11px",
                        padding: "4px 10px",
                        borderRadius: "9999px",
                        backgroundColor: "#F0F0F0",
                        color: "#444444",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mt-3 leading-relaxed" style={{ color: "var(--muted)" }}>
                  {cs.description}
                </p>

                {/* CTA */}
                <span
                  className="mt-4 inline-flex items-center gap-0.5"
                  onMouseEnter={() => setHoveredArrow(cs.slug)}
                  onMouseLeave={() => setHoveredArrow(null)}
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#0F0F0F",
                  }}
                >
                  Read case study
                  <span
                    style={{
                      display: "inline-block",
                      transform: hoveredArrow === cs.slug ? "translateX(4px)" : "translateX(0)",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    &nbsp;→
                  </span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
