"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "../content";

const PURPLE = "#6B5FE8";
const ADVANCE_MS = 5000;

function renderQuote(quote: string, highlight: string) {
  const parts = quote.split(highlight);
  return parts.map((part, i) => (
    <React.Fragment key={i}>
      {part}
      {i < parts.length - 1 && (
        <span style={{ background: "#EEEDFE", borderRadius: 3, padding: "0 3px" }}>
          {highlight}
        </span>
      )}
    </React.Fragment>
  ));
}

const fadeVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit:  { opacity: 0 },
};

export function Testimonials() {
  const quotes = testimonials.quotes;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // progressKey increments to restart the fill animation and 5 s timer
  const [progressKey, setProgressKey] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Auto-advance — restarts whenever progressKey changes or paused toggles
  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => {
      setIndex(i => (i + 1) % quotes.length);
      setProgressKey(k => k + 1);
    }, ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [progressKey, paused, quotes.length]);

  function go(next: number) {
    setIndex((next + quotes.length) % quotes.length);
    setProgressKey(k => k + 1);
  }

  function handleMouseEnter() { setPaused(true); }
  function handleMouseLeave() { setPaused(false); setProgressKey(k => k + 1); }

  function handleTouchStart(e: React.TouchEvent) {
    setTouchStart(e.touches[0].clientX);
  }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 48) go(diff > 0 ? index + 1 : index - 1);
    setTouchStart(null);
  }

  const t = quotes[index];

  const arrowStyle: React.CSSProperties = {
    width: 36, height: 36, borderRadius: "50%",
    border: "1px solid #e0e0e0", background: "white",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", flexShrink: 0, color: "#444",
    transition: "border-color 0.2s, color 0.2s",
  };

  return (
    <section id="testimonials" className="py-16">
      <div className="mx-auto max-w-3xl px-6">
        <h2 style={{ fontSize: 28, marginBottom: 32 }}>
          {testimonials.heading}
        </h2>
      </div>

      {/* Carousel row — pause on hover over entire row (card + arrows) */}
      <div
        className="mx-auto px-4 md:px-6"
        style={{ maxWidth: 800, display: "flex", alignItems: "center", gap: 12 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Left arrow — desktop only */}
        <button
          className="hidden md:flex"
          onClick={() => go(index - 1)}
          aria-label="Previous testimonial"
          style={arrowStyle}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = PURPLE; (e.currentTarget as HTMLElement).style.color = PURPLE; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#e0e0e0"; (e.currentTarget as HTMLElement).style.color = "#444"; }}
        >
          <ChevronLeft size={18} />
        </button>

        {/* Card */}
        <div
          style={{ flex: 1, overflow: "hidden" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              variants={fadeVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{
                backgroundColor: "white",
                borderRadius: 16,
                border: "1px solid #ebebeb",
                padding: "32px 36px 28px",
                maxWidth: 680,
                margin: "0 auto",
                minHeight: 300,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Decorative quote mark */}
              <div style={{
                fontSize: 48, lineHeight: 0.8, color: PURPLE,
                fontFamily: "Georgia, 'Times New Roman', serif",
                marginBottom: 8, userSelect: "none",
              }}>
                &ldquo;
              </div>

              {/* Quote text */}
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "#1B1B4B", flexGrow: 1 }}>
                {renderQuote(t.quote, t.highlight)}
              </p>

              {/* Avatar row — avatar pops in on each card change */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 24 }}>
                <motion.div
                  key={`avatar-${index}`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  style={{
                    width: 68, height: 68, borderRadius: "50%",
                    backgroundColor: "#EAE7FC",
                    flexShrink: 0, overflow: "hidden",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.avatarImage}
                    alt={t.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </motion.div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#0F0F0F", lineHeight: 1.2 }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>{t.role} · {t.company}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right arrow — desktop only */}
        <button
          className="hidden md:flex"
          onClick={() => go(index + 1)}
          aria-label="Next testimonial"
          style={arrowStyle}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = PURPLE; (e.currentTarget as HTMLElement).style.color = PURPLE; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#e0e0e0"; (e.currentTarget as HTMLElement).style.color = "#444"; }}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Dot indicators */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 20 }}>
        {quotes.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            style={{
              width: i === index ? 20 : 8,
              height: 8,
              borderRadius: 4,
              padding: 0,
              border: "none",
              backgroundColor: "#D0CCF5",
              cursor: "pointer",
              overflow: "hidden",
              position: "relative",
              transition: "width 0.3s ease",
            }}
          >
            {i === index && (
              <div
                key={progressKey}
                style={{
                  position: "absolute",
                  top: 0, left: 0,
                  height: "100%",
                  width: "0%",
                  backgroundColor: PURPLE,
                  borderRadius: 4,
                  animation: `progress-fill ${ADVANCE_MS}ms linear forwards`,
                  animationPlayState: paused ? "paused" : "running",
                }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
