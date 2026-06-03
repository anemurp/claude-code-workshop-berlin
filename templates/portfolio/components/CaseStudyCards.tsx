"use client";

import { useState } from "react";
import Link from "next/link";

type CardStudy = {
  slug: string;
  title: string;
  company: string;
  date: string;
  cardBackground: string;
  mockupImage: string;
  tags: string[];
  metrics: Array<{ value: string; label: string }>;
};

const TRANSITION = "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease";

export function CaseStudyCards({ studies }: { studies: CardStudy[] }) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <ul className="space-y-6">
      {studies.map((cs, i) => {
        const tilt = i % 2 === 0 ? 1.5 : -1.5;
        const isHovered = hoveredCard === cs.slug;
        return (
        <li key={cs.slug} style={{ background: "transparent" }}>
          {/*
            Outer wrapper: py-10 on desktop gives 40px above/below for the
            image to overflow into. overflow-hidden on mobile keeps it tidy.
          */}
          <div
            className="relative overflow-hidden md:overflow-visible py-0 md:py-10"
            style={{
              background: "transparent",
              transform: isHovered ? `translateY(-8px) rotate(${tilt}deg)` : "translateY(0) rotate(0deg)",
              transition: TRANSITION,
              transformOrigin: "center bottom",
              cursor: "pointer",
            }}
            onMouseEnter={() => setHoveredCard(cs.slug)}
            onMouseLeave={() => setHoveredCard(null)}
          >

            {/*
              Background layer — strictly clipped to the card shape.
              Shadow lives here so it's cast from the coloured card, not
              the transparent outer wrapper.
            */}
            <div
              className="absolute inset-x-0 top-0 bottom-0 md:top-10 md:bottom-10 rounded-2xl"
              style={{
                backgroundColor: cs.cardBackground,
                boxShadow: isHovered ? "0 24px 64px rgba(0,0,0,0.2)" : "0 8px 32px rgba(0,0,0,0.1)",
                transition: "box-shadow 0.35s ease",
                zIndex: 0,
              }}
            />

            {/* Content layer — sits above background, free to overflow */}
            <Link href={`/case-studies/${cs.slug}`} className="block relative" style={{ zIndex: 1 }}>
              <div className="grid grid-cols-1 md:grid-cols-2">

                {/* Left: text */}
                <div style={{ padding: "40px 24px 40px 48px" }}>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>
                    {cs.company}
                  </p>
                  <h3 style={{ color: "white", fontSize: "clamp(20px, 2.2vw, 30px)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: 88 }}>
                    {cs.title}
                  </h3>
                  <div className="flex gap-8">
                    {cs.metrics.map((m) => (
                      <div key={m.label}>
                        <div style={{ color: "white", fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 800, lineHeight: 1 }}>
                          {m.value}
                        </div>
                        <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, marginTop: 5, lineHeight: 1.3 }}>
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: image column */}
                <div className="relative" style={{ minHeight: 260 }}>
                  {cs.mockupImage ? (
                    <>
                      {/*
                        Desktop: absolute div extends 40px above and below
                        the grid row, popping out of the card boundary.
                      */}
                      {cs.slug === "teacher-reports" ? (
                        <div
                          className="hidden md:flex absolute items-center justify-center"
                          style={{ top: -110, bottom: -110, left: 0, right: 0, paddingLeft: 20, paddingRight: 20 }}
                        >
                          <div style={{ width: "100%", height: "100%", borderRadius: 80, overflow: "hidden" }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={cs.mockupImage}
                              alt={cs.title}
                              style={{ width: "100%", height: "100%", objectFit: "contain" }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div
                          className="hidden md:block absolute"
                          style={{ top: -110, bottom: -110, left: -30, right: -80 }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={cs.mockupImage}
                            alt={cs.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                              objectPosition: "center",
                              filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.3))",
                            }}
                          />
                        </div>
                      )}

                      {/* Mobile: normal flow, contained within card */}
                      <div className="md:hidden" style={{ padding: "0 24px 32px" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={cs.mockupImage}
                          alt={cs.title}
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "contain",
                            filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.2))",
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <div style={{ margin: 24, height: 200, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.08)" }} />
                  )}
                </div>

              </div>
            </Link>
          </div>
        </li>
        );
      })}
    </ul>
  );
}
