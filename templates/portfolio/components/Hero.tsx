"use client";

import { motion } from "framer-motion";
import {
  Users, PenTool, Layout, Monitor, Search, Layers,
  Smartphone, Eye, Asterisk, BarChart2, Cpu, Globe,
  type LucideIcon,
} from "lucide-react";
import { hero, tickerRow1, tickerRow2 } from "../content";
import { Button } from "./ui/Button";

// ─── Animation variants ───────────────────────────────────────────────────────

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

// ─── Icon registry ────────────────────────────────────────────────────────────

const ICONS: Record<string, LucideIcon> = {
  Users, PenTool, Layout, Monitor, Search, Layers,
  Smartphone, Eye, Asterisk, BarChart2, Cpu, Globe,
};

// ─── Skills ticker ────────────────────────────────────────────────────────────

type TickerItem = { icon: string; label: string };

function TickerRow({
  items,
  direction,
}: {
  items: TickerItem[];
  direction: "left" | "right";
}) {
  const doubled = [...items, ...items];
  return (
    <div
      className="overflow-hidden"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <div
        className={`flex gap-12 ${
          direction === "left" ? "animate-ticker-left" : "animate-ticker-right"
        }`}
        style={{ width: "max-content" }}
      >
        {doubled.map((item, i) => {
          const Icon = ICONS[item.icon];
          return (
            <div key={i} className="flex items-center gap-2 shrink-0">
              {Icon && <Icon size={16} className="text-[#999]" />}
              <span className="text-[15px] text-[#999] whitespace-nowrap">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  return (
    <motion.section
      className="bg-paper pt-[120px]"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {/* Centered content */}
      <div className="text-center px-6">
        {/* Availability badge */}
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-glow shrink-0" />
          <span className="text-[14px] text-ink/60">{hero.availability}</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="max-w-[900px] mx-auto"
        >
          {hero.tagline}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="mt-6 text-[18px] text-[#666] max-w-[480px] mx-auto leading-relaxed"
        >
          {hero.headline}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          className="mt-8 flex items-center justify-center gap-3 flex-wrap"
        >
          <Button href={hero.ctaPrimary.href} variant="primary">
            {hero.ctaPrimary.label}
          </Button>
          <Button href={hero.ctaSecondary.href} variant="secondary">
            {hero.ctaSecondary.label}
          </Button>
        </motion.div>
      </div>

      {/* Skills ticker */}
      <motion.div
        variants={fadeUp}
        className="mt-16 pb-[80px] space-y-4 overflow-hidden"
      >
        <TickerRow items={tickerRow1} direction="left" />
        <TickerRow items={tickerRow2} direction="right" />
      </motion.div>
    </motion.section>
  );
}
