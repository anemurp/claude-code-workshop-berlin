"use client";

import { useState, useEffect, useRef } from "react";
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

const COLORS = ["#C8B40A", "#FFD700", "#FFF176", "#F5C518", "#E8D44D", "#ffffff"];

type Sparkle = { id: number; x: number; y: number; size: number; rotate: number; dx: number; dy: number; color: string; duration: number };

function makeSparkle(id: number, x: number, y: number): Sparkle {
  const angle = Math.random() * Math.PI * 2;
  const dist = 20 + Math.random() * 40;
  return {
    id,
    x: x + (Math.random() - 0.5) * 16,
    y: y + (Math.random() - 0.5) * 16,
    size: 5 + Math.random() * 13,
    rotate: Math.random() * 360,
    dx: Math.cos(angle) * dist,
    dy: Math.sin(angle) * dist - 10,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    duration: 0.5 + Math.random() * 0.4,
  };
}

export function CaseStudyCards({ studies }: { studies: CardStudy[] }) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hoveredArrow, setHoveredArrow] = useState<string | null>(null);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const cursorRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  const hoveredCardRef = useRef<string | null>(null);
  const sparkleCounter = useRef(0);
  const lastSparkle = useRef(0);

  useEffect(() => { hoveredCardRef.current = hoveredCard; }, [hoveredCard]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      const now = Date.now();
      if (hoveredCardRef.current && now - lastSparkle.current > 20) {
        lastSparkle.current = now;
        const batch = Array.from({ length: 3 }, () => makeSparkle(sparkleCounter.current++, e.clientX, e.clientY));
        setSparkles(prev => [...prev, ...batch]);
        const maxDuration = Math.max(...batch.map(s => s.duration)) * 1000 + 100;
        const ids = batch.map(s => s.id);
        setTimeout(() => setSparkles(prev => prev.filter(s => !ids.includes(s.id))), maxDuration);
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const tick = () => {
      current.current.x = lerp(current.current.x, target.current.x, LERP);
      current.current.y = lerp(current.current.y, target.current.y, LERP);
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${current.current.x - 65}px, ${current.current.y - 65}px)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  return (
    <>
      {/* Custom circle cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-50 pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <AnimatePresence>
          {hoveredCard && (
            <motion.div
              key="cursor-label"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <svg width="130" height="130" viewBox="0 0 130 130" style={{ display: "block" }}>
                <motion.g
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "65px 65px" }}
                >
                  <polygon
                    points="65,5 75.7,39.1 109.5,20.5 90.9,54.3 125,65 90.9,75.7 109.5,109.5 75.7,90.9 65,125 54.3,90.9 20.5,109.5 39.1,75.7 5,65 39.1,54.3 20.5,20.5 54.3,39.1"
                    fill="#FFE600"
                  />
                </motion.g>
                <text x="65" y="61" textAnchor="middle" fill="black" fontSize="11" fontWeight="500" fontFamily="Inter, sans-serif">Read case</text>
                <text x="65" y="75" textAnchor="middle" fill="black" fontSize="11" fontWeight="500" fontFamily="Inter, sans-serif">study</text>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sparkle trail */}
      {sparkles.map(s => (
        <motion.div
          key={s.id}
          initial={{ opacity: 1, scale: 0, x: 0, y: 0, rotate: s.rotate }}
          animate={{
            opacity: [1, 1, 0],
            scale: [0, 1.4, 0],
            x: s.dx,
            y: s.dy,
            rotate: s.rotate + (s.id % 2 === 0 ? 180 : -180),
          }}
          transition={{ duration: s.duration, ease: "easeOut" }}
          style={{
            position: "fixed",
            left: s.x - s.size / 2,
            top: s.y - s.size / 2,
            pointerEvents: "none",
            zIndex: 48,
          }}
        >
          <svg width={s.size} height={s.size} viewBox="0 0 10 10">
            <polygon points="5,0 5.9,3.8 10,5 5.9,6.2 5,10 4.1,6.2 0,5 4.1,3.8" fill={s.color} />
          </svg>
        </motion.div>
      ))}

      {/* Card list */}
      <ul className="space-y-24">
        {studies.map((cs) => (
          <li
            key={cs.slug}
            className="case-study-card"
            onMouseEnter={() => {
              current.current = { ...target.current };
              setHoveredCard(cs.slug);
            }}
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
                      background: "linear-gradient(135deg, #1A2FD4 0%, #E8392A 100%)",
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
                    className="text-xl font-semibold"
                    style={{ color: "var(--text)" }}
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
