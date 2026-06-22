"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { caseStudies } from "../data/case-studies";
import type { CaseStudy, Section } from "../data/case-studies";

// ─── Scroll animation variants ────────────────────────────────────────────────

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const VIEWPORT = { once: true, margin: "-80px" };

// ─── Device mockups ──────────────────────────────────────────────────────────

function PhoneMockup({ image, label }: { image?: string; label?: string }) {
  return (
    <div className="relative mx-auto w-44 md:w-52 rounded-[2.5rem] border-[6px] border-navy/20 bg-warm shadow-2xl overflow-hidden aspect-[9/19]">
      <div className="absolute top-0 inset-x-0 h-5 bg-navy/10 flex items-center justify-center z-10">
        <div className="w-16 h-3 bg-navy/25 rounded-full" />
      </div>
      {image ? (
        <img src={image} alt={label ?? ""} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-primary/10 to-warm pt-5 gap-2">
          <div className="w-8 h-8 rounded-xl bg-primary/20" />
          <span className="text-[10px] text-navy/30 text-center px-4 leading-snug">
            {label ?? "Add screenshot path in data/case-studies.ts"}
          </span>
        </div>
      )}
    </div>
  );
}

function BrowserMockup({ image, label }: { image?: string; label?: string }) {
  return (
    <div
      className="rounded-2xl border border-navy/15 overflow-hidden"
      style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}
    >
      <div className="bg-navy/5 px-4 py-2.5 flex items-center gap-3 border-b border-navy/10">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
        </div>
        <div className="flex-1 bg-white/50 rounded h-4" />
      </div>
      <div className="aspect-[16/10]">
        {image ? (
          <img src={image} alt={label ?? ""} className="w-full h-full object-cover" />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #1A2FD4 0%, #E8392A 100%)" }}
          >
            <span
              className="font-bold text-white text-center px-8"
              style={{ fontSize: "clamp(20px, 4vw, 40px)", opacity: 0.2 }}
            >
              {label ?? ""}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Table of contents ───────────────────────────────────────────────────────

type TOCItem = { id: string; label: string };

function DesktopTOC({
  items,
  activeId,
  onNavigate,
}: {
  items: TOCItem[];
  activeId: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <nav aria-label="Page sections" className="space-y-2">
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full text-left px-4 py-3 rounded-2xl text-[15px] font-medium transition-all duration-200 ${
              active
                ? "bg-[#6B5CE7] text-white font-semibold shadow-sm"
                : "text-navy/45 hover:text-cobalt hover:bg-cobalt/5"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}

function MobileTOC({
  items,
  activeId,
  onNavigate,
}: {
  items: TOCItem[];
  activeId: string;
  onNavigate: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const active = items.find((i) => i.id === activeId);

  return (
    <div className="lg:hidden sticky top-14 z-40 bg-warm/95 backdrop-blur-sm border-b border-navy/10 shadow-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full px-6 py-3.5 flex items-center justify-between text-sm font-medium text-navy"
        aria-expanded={open}
      >
        <span>{active?.label ?? "Contents"}</span>
        <svg
          className={`w-4 h-4 text-navy/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-1.5">
          {items.map((it) => {
            const isActive = it.id === activeId;
            return (
              <button
                key={it.id}
                onClick={() => {
                  onNavigate(it.id);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#6B5CE7] text-white font-semibold"
                    : "text-navy/55 hover:text-cobalt hover:bg-cobalt/5"
                }`}
              >
                {it.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Section blocks ──────────────────────────────────────────────────────────

function SectionBlock({ section }: { section: Section }) {
  if (section.layout === "dark") {
    return (
      <motion.div
        id={section.id}
        data-section=""
        className="bg-navy text-warm rounded-3xl px-8 py-14 md:px-14 scroll-mt-36"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        <motion.p variants={item} className="text-xs font-bold uppercase tracking-[0.15em] text-[#6B5CE7] mb-4">
          {section.label}
        </motion.p>
        <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold leading-tight max-w-2xl mb-5">
          {section.heading}
        </motion.h2>
        <motion.p variants={item} className="text-warm/70 text-lg leading-relaxed max-w-[60ch]">
          {section.body}
        </motion.p>
        {section.image && (
          <motion.div variants={item} className="mt-12">
            <BrowserMockup image={section.image} label={section.label} />
          </motion.div>
        )}
      </motion.div>
    );
  }

  if (section.layout === "full") {
    return (
      <motion.div
        id={section.id}
        data-section=""
        className="py-16 scroll-mt-36"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        <motion.p variants={item} className="text-xs font-bold uppercase tracking-[0.15em] text-[#6B5CE7] mb-4">
          {section.label}
        </motion.p>
        <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold text-navy leading-tight max-w-2xl mb-5">
          {section.heading}
        </motion.h2>
        <motion.p variants={item} className="text-navy/70 text-lg leading-relaxed max-w-[60ch]">
          {section.body}
        </motion.p>
        {section.image && (
          <motion.div variants={item} className="mt-12">
            <BrowserMockup image={section.image} label={section.label} />
          </motion.div>
        )}
      </motion.div>
    );
  }

  // 'right' = text left, image right | 'left' = image left, text right
  const imageOnLeft = section.layout === "left";

  return (
    <motion.div
      id={section.id}
      data-section=""
      className="py-16 scroll-mt-36"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        {imageOnLeft ? (
          <>
            <motion.div variants={item} className="flex items-center justify-center">
              <PhoneMockup image={section.image} label={section.label} />
            </motion.div>
            <div>
              <motion.p variants={item} className="text-xs font-bold uppercase tracking-[0.15em] text-[#6B5CE7] mb-4">
                {section.label}
              </motion.p>
              <motion.h2 variants={item} className="text-2xl md:text-3xl font-bold text-navy leading-tight mb-4">
                {section.heading}
              </motion.h2>
              <motion.p variants={item} className="text-navy/70 text-lg leading-relaxed">
                {section.body}
              </motion.p>
            </div>
          </>
        ) : (
          <>
            <div>
              <motion.p variants={item} className="text-xs font-bold uppercase tracking-[0.15em] text-[#6B5CE7] mb-4">
                {section.label}
              </motion.p>
              <motion.h2 variants={item} className="text-2xl md:text-3xl font-bold text-navy leading-tight mb-4">
                {section.heading}
              </motion.h2>
              <motion.p variants={item} className="text-navy/70 text-lg leading-relaxed">
                {section.body}
              </motion.p>
            </div>
            <motion.div variants={item} className="flex items-center justify-center">
              <PhoneMockup image={section.image} label={section.label} />
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function CaseStudyContent({ cs }: { cs: CaseStudy }) {
  const [activeId, setActiveId] = useState<string>(cs.sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0% -65% 0%", threshold: 0 }
    );
    document.querySelectorAll("[data-section]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const tocItems: TOCItem[] = cs.sections.map((s) => ({ id: s.id, label: s.label }));
  const nextCs = cs.nextProject
    ? caseStudies.find((s) => s.slug === cs.nextProject!.slug)
    : undefined;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 56 + 48 + 16;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="bg-warm text-navy min-h-screen">

      {/* ══ PRE-TOC: two-column hero ════════════════════════════ */}
      <motion.div
        className="mx-auto max-w-6xl px-6 lg:px-8 pt-16 lg:pt-20 pb-12"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Large hero image */}
        <motion.div variants={item} className="mb-10 rounded-2xl overflow-hidden" style={{ backgroundColor: cs.heroBackground }}>
          <BrowserMockup image={cs.heroImage} label={cs.title} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[55fr_45fr] gap-8 md:gap-12 items-start">

          {/* ── LEFT COLUMN: title + subtitle in white card ── */}
          <motion.div
            variants={item}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              padding: "28px",
              border: "1px solid #E8E8E8",
            }}
          >
            <span
              style={{
                display: "inline-block",
                backgroundColor: "#F0F0F0",
                color: "#666",
                fontSize: "13px",
                padding: "6px 12px",
                borderRadius: "9999px",
                marginBottom: "20px",
              }}
            >
              {cs.company}
            </span>

            <h1
              style={{
                fontSize: "clamp(36px, 5vw, 56px)",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#0F0F0F",
                display: "block",
              }}
            >
              {cs.title}
            </h1>

            <p style={{ fontSize: "17px", color: "#666", lineHeight: 1.6, marginTop: "20px" }}>
              {cs.subtitle}
            </p>
          </motion.div>

          {/* ── RIGHT COLUMN: two stacked cards ── */}
          <motion.div variants={container} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Top card — 2×2 metadata grid */}
            <motion.dl
              variants={item}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                padding: "28px",
                border: "1px solid #E8E8E8",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px",
              }}
            >
              {[
                { label: "Role", value: cs.role },
                { label: "Timeline", value: cs.timeline },
                { label: "Team", value: cs.team },
                { label: "Year", value: cs.year },
              ].map(({ label, value }) => (
                <div key={label}>
                  <dt style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", color: "#999", textTransform: "uppercase" as const }}>
                    {label}
                  </dt>
                  <dd style={{ fontSize: "16px", fontWeight: 500, color: "#0F0F0F", marginTop: "4px" }}>
                    {value}
                  </dd>
                </div>
              ))}
            </motion.dl>

            {/* Bottom card — Key Results */}
            <motion.div
              variants={item}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                padding: "28px",
                border: "1px solid #E8E8E8",
              }}
            >
              <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#999", textAlign: "center", marginBottom: "24px" }}>
                Key Results
              </p>
              <div style={{ display: "flex" }}>
                {cs.metrics.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      textAlign: "center",
                      borderLeft: i > 0 ? "1px solid #E8E8E8" : undefined,
                      padding: "0 8px",
                    }}
                  >
                    <p style={{ fontSize: "44px", fontWeight: 800, color: "#0F0F0F", lineHeight: 1 }}>{m.value}</p>
                    <p style={{ fontSize: "13px", color: "#999", textAlign: "center", lineHeight: 1.4, marginTop: "8px", maxWidth: "140px", margin: "8px auto 0" }}>{m.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </motion.div>
        </div>
      </motion.div>

      {/* MobileTOC appears after the statistics */}
      <MobileTOC items={tocItems} activeId={activeId} onNavigate={scrollTo} />

      {/* ══ TOC SIDEBAR LAYOUT ══════════════════════════════════ */}
      <div className="mx-auto max-w-6xl px-6 lg:px-8 lg:flex lg:gap-10 xl:gap-16">

        <aside className="hidden lg:block w-52 xl:w-56 shrink-0">
          <div className="sticky top-24 pt-16">
            <DesktopTOC items={tocItems} activeId={activeId} onNavigate={scrollTo} />
          </div>
        </aside>

        <main className="flex-1 min-w-0 max-w-3xl pt-16 lg:pt-20">

          {/* ── FULL-WIDTH IMAGE ─────────────────────────────── */}
          {cs.fullWidthImage !== undefined && (
            <motion.div
              className="mb-20"
              variants={item}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              <BrowserMockup image={cs.fullWidthImage} label={`${cs.title} — full view`} />
            </motion.div>
          )}

          {/* ── FRAMING ──────────────────────────────────────── */}
          <motion.div
            className="text-center border-y border-navy/10 py-16 mb-4"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold leading-tight max-w-xl mx-auto mb-5">
              {cs.framingHeading}
            </motion.h2>
            <motion.p variants={item} className="text-lg text-navy/65 leading-relaxed max-w-prose mx-auto">
              {cs.framingBody}
            </motion.p>
          </motion.div>

          {/* ── CONTENT SECTIONS ─────────────────────────────── */}
          <div className="divide-y divide-navy/10">
            {cs.sections.map((section) => (
              <SectionBlock key={section.id} section={section} />
            ))}
          </div>
        </main>
      </div>

      {/* ── NEXT PROJECT + FOOTER — outside the flex container so the
           aside ends with the content sections and the TOC stops sticking ── */}
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {cs.nextProject && (
          <motion.div
            className="pt-[120px] pb-[120px]"
            variants={item}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
<Link href={`/case-studies/${cs.nextProject.slug}`} className="group block max-w-3xl mx-auto">
              <div
                className="flex rounded-2xl border border-navy/10 overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)]"
                style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
              >
                {/* Thumbnail — left side, stretches to text height */}
                <div className="w-48 md:w-64 shrink-0 overflow-hidden">
                  {nextCs?.heroImage ? (
                    <img
                      src={nextCs.heroImage}
                      alt={cs.nextProject.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #1A2FD4 0%, #E8392A 100%)" }}
                    >
                      <span
                        className="font-bold text-white text-center px-4"
                        style={{ fontSize: "clamp(14px, 2vw, 22px)", opacity: 0.2 }}
                      >
                        {cs.nextProject.title}
                      </span>
                    </div>
                  )}
                </div>
                {/* Text — right side, determines card height */}
                <div className="flex flex-col justify-between p-6 lg:p-8 min-w-0">
                  <div>
                    {nextCs && (
                      <p className="text-xs text-navy/40 mb-2">{nextCs.company} · {nextCs.year}</p>
                    )}
                    <h3 style={{ fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 700, lineHeight: 1.2, color: "#051225" }}>
                      {cs.nextProject.title}
                    </h3>
                    {nextCs?.subtitle && (
                      <p className="text-navy/55 mt-2 leading-relaxed text-sm">{nextCs.subtitle}</p>
                    )}
                  </div>
                  <span
                    className="mt-5 inline-flex items-center gap-1 font-semibold text-[#6B5CE7]"
                    style={{ fontSize: 14 }}
                  >
                    Read case study
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
