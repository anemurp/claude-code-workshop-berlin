"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
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
    <div className="rounded-2xl border border-navy/15 overflow-hidden shadow-xl">
      <div className="bg-navy/5 px-4 py-2.5 flex items-center gap-3 border-b border-navy/10">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
        </div>
        <div className="flex-1 bg-white/50 rounded h-4" />
      </div>
      <div className="aspect-[16/10] bg-warm">
        {image ? (
          <img src={image} alt={label ?? ""} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-sm text-navy/25">
              {label ?? "Add screenshot path in data/case-studies.ts"}
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
                ? "bg-primary text-white font-semibold shadow-sm"
                : "text-navy/45 hover:text-navy hover:bg-navy/5"
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
                    ? "bg-primary text-white font-semibold"
                    : "text-navy/55 hover:text-navy hover:bg-navy/5"
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
        <motion.p variants={item} className="text-xs font-bold uppercase tracking-[0.15em] text-primary mb-4">
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
        <motion.p variants={item} className="text-xs font-bold uppercase tracking-[0.15em] text-primary mb-4">
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
              <motion.p variants={item} className="text-xs font-bold uppercase tracking-[0.15em] text-primary mb-4">
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
              <motion.p variants={item} className="text-xs font-bold uppercase tracking-[0.15em] text-primary mb-4">
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

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 56 + 48 + 16;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="bg-warm text-navy min-h-screen">
      <MobileTOC items={tocItems} activeId={activeId} onNavigate={scrollTo} />

      <div className="mx-auto max-w-6xl px-6 lg:px-8 lg:flex lg:gap-10 xl:gap-16">

        <aside className="hidden lg:block w-52 xl:w-56 shrink-0">
          <div className="sticky top-24 pt-16">
            <DesktopTOC items={tocItems} activeId={activeId} onNavigate={scrollTo} />
          </div>
        </aside>

        <main className="flex-1 min-w-0 max-w-3xl py-16 lg:py-20">

          {/* ── HERO ─────────────────────────────────────────── */}
          <motion.section
            className="grid md:grid-cols-2 gap-10 items-start mb-20"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <div>
              <motion.span
                variants={item}
                className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full bg-navy/[0.08] text-navy/55 mb-5"
              >
                {cs.company} · {cs.year}
              </motion.span>
              <motion.h1 variants={item} className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-5">
                {cs.title}
              </motion.h1>
              <motion.p variants={item} className="text-lg text-navy/65 leading-relaxed mb-8">
                {cs.subtitle}
              </motion.p>
              <motion.dl variants={item} className="flex flex-col gap-3 text-sm">
                {[
                  { label: "Role", value: cs.role },
                  { label: "Timeline", value: cs.timeline },
                  { label: "Team", value: cs.team },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-4">
                    <dt className="text-navy/40 w-20 shrink-0">{label}</dt>
                    <dd className="font-medium">{value}</dd>
                  </div>
                ))}
              </motion.dl>
            </div>
            <motion.div variants={item}>
              <BrowserMockup image={cs.heroImage} label={cs.title} />
            </motion.div>
          </motion.section>

          {/* ── METRICS BAR ──────────────────────────────────── */}
          <motion.div
            className="flex border border-navy/15 rounded-2xl mb-20 overflow-hidden"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {cs.metrics.map((m, i) => (
              <motion.div
                key={i}
                variants={item}
                className={`flex-1 px-5 py-7 text-center ${i > 0 ? "border-l border-navy/15" : ""}`}
              >
                <p className="text-3xl md:text-4xl font-bold text-navy">{m.value}</p>
                <p className="mt-1.5 text-xs text-navy/50 leading-snug">{m.label}</p>
              </motion.div>
            ))}
          </motion.div>

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

          {/* ── CTA ──────────────────────────────────────────── */}
          <motion.div
            className="mt-20 bg-navy rounded-3xl px-8 py-16 text-center"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold text-warm mb-8 leading-tight">
              Interested in working together?
            </motion.h2>
            <motion.div variants={item}>
              <a
                href="/#contact"
                className="inline-block px-8 py-4 bg-coral text-white font-semibold rounded-full text-lg hover:opacity-90 active:scale-95 transition-all"
              >
                Get in touch
              </a>
            </motion.div>
            {cs.nextProject && (
              <motion.div variants={item} className="mt-12 pt-12 border-t border-warm/10">
                <p className="text-warm/40 text-xs uppercase tracking-widest mb-3">
                  Next project
                </p>
                <Link
                  href={`/case-studies/${cs.nextProject.slug}`}
                  className="text-warm text-xl font-semibold hover:text-primary transition-colors"
                >
                  {cs.nextProject.title} →
                </Link>
              </motion.div>
            )}
          </motion.div>

          {/* ── FOOTER ───────────────────────────────────────── */}
          <footer className="mt-12 py-8 border-t border-navy/10 flex items-center justify-between text-sm text-navy/35">
            <Link href="/" className="hover:text-navy transition-colors">
              ← All work
            </Link>
            <span>Made with Claude Code · Berlin · 2026</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
