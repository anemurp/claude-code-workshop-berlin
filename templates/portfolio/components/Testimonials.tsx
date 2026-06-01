"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "../content";

const GAP = 16;

function getInitials(name: string) {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function renderQuote(quote: string, highlight: string) {
  const parts = quote.split(highlight);
  return parts.map((part, i) => (
    <React.Fragment key={i}>
      {part}
      {i < parts.length - 1 && (
        <strong style={{ fontWeight: 700, fontStyle: "italic" }}>{highlight}</strong>
      )}
    </React.Fragment>
  ));
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  }),
};

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  function updateArrows() {
    const el = scrollRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 0);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    return () => el.removeEventListener("scroll", updateArrows);
  }, []);

  function scroll(dir: "prev" | "next") {
    const el = scrollRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement;
    const cardWidth = firstCard?.offsetWidth ?? 280;
    el.scrollBy({ left: dir === "next" ? cardWidth + GAP : -(cardWidth + GAP), behavior: "smooth" });
  }

  return (
    <section id="testimonials" className="py-16">
      {/* Heading row — constrained to match page content width */}
      <div className="mx-auto max-w-3xl px-6" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2
          style={{
            display: "inline-block",
          }}
        >
          {testimonials.heading}
        </h2>
        <div style={{ display: "flex", gap: 20 }}>
          <button
            onClick={() => scroll("prev")}
            aria-label="Previous testimonial"
            style={{
              color: "#0A0A2E",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              opacity: canPrev ? 1 : 0.3,
              display: "flex",
              alignItems: "center",
              transition: "opacity 0.2s",
            }}
          >
            <ChevronLeft size={26} />
          </button>
          <button
            onClick={() => scroll("next")}
            aria-label="Next testimonial"
            style={{
              color: "#0A0A2E",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              opacity: canNext ? 1 : 0.3,
              display: "flex",
              alignItems: "center",
              transition: "opacity 0.2s",
            }}
          >
            <ChevronRight size={26} />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="hide-scrollbar"
        style={{
          display: "flex",
          gap: GAP,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          padding: "24px 24px 32px",
          scrollbarWidth: "none",
          width: "100%",
        }}
      >
        {testimonials.quotes.map((t, i) => {
          const tilt = i % 2 === 0 ? -2 : 1.5;
          return (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{
                y: -6,
                rotate: tilt,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              className="testimonial-card"
              style={{
                minHeight: 300,
                borderRadius: 18,
                padding: 28,
                scrollSnapAlign: "start",
                backgroundColor: t.cardColor,
                rotate: tilt,
              }}
            >
              {/* Avatar + name */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: "50%",
                    backgroundColor: t.avatarColor,
                    color: "white",
                    fontSize: 15,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {getInitials(t.name)}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#0A0A2E",
                      lineHeight: 1.2,
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#6B6B8A",
                      fontWeight: 400,
                      marginTop: 2,
                    }}
                  >
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>

              {/* Quote */}
              <p
                style={{
                  marginTop: 20,
                  fontSize: 18,
                  fontWeight: 500,
                  color: "#1B1B4B",
                  lineHeight: 1.55,
                }}
              >
                {renderQuote(t.quote, t.highlight)}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
