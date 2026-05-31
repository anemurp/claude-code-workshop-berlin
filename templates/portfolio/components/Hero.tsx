"use client";

import { motion, type Variants } from "framer-motion";
import {
  Users, PenTool, Layout, Monitor, Search, Layers,
  Smartphone, Eye, Asterisk, BarChart2, Cpu, Globe,
  type LucideIcon,
} from "lucide-react";
import { hero, tickerRow1, tickerRow2 } from "../content";
import { Button } from "./ui/Button";
import { InteractiveHeadline } from "./InteractiveHeadline";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const ICONS: Record<string, LucideIcon> = {
  Users, PenTool, Layout, Monitor, Search, Layers,
  Smartphone, Eye, Asterisk, BarChart2, Cpu, Globe,
};

type TickerItem = { icon: string; label: string };

function TickerRow({ items, direction }: { items: TickerItem[]; direction: "left" | "right" }) {
  const doubled = [...items, ...items];
  const animClass = direction === "left" ? "animate-ticker-left" : "animate-ticker-right";

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
      <div className={`flex gap-12 ${animClass}`} style={{ width: "max-content" }}>
        {doubled.map((item, i) => {
          const Icon = ICONS[item.icon];
          return (
            <div key={i} className="flex items-center gap-2 shrink-0">
              {Icon && <Icon size={16} style={{ color: "#999" }} />}
              <span className="text-[15px] whitespace-nowrap" style={{ color: "#999" }}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <motion.section
      className="pt-[120px] relative overflow-hidden"
      style={{ backgroundColor: "var(--bg)" }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <div className="text-center px-6 relative z-10">
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-8">
          <span
            className="w-2 h-2 rounded-full shrink-0 animate-pulse-glow"
            style={{ backgroundColor: "#4ade80" }}
          />
          <span className="text-[14px]" style={{ color: "var(--muted)" }}>
            {hero.availability}
          </span>
        </motion.div>

        <motion.div variants={fadeUp} className="max-w-[900px] mx-auto">
          <InteractiveHeadline />
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-6 text-[18px] max-w-[480px] mx-auto leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          {hero.headline}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex items-center justify-center gap-3 flex-wrap"
        >
          <Button href={hero.ctaPrimary.href} variant="primary" target="_blank" rel="noopener noreferrer">
            <svg className="mr-2" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            {hero.ctaPrimary.label}
          </Button>
          <Button href={hero.ctaSecondary.href} variant="secondary">
            {hero.ctaSecondary.label}
          </Button>
        </motion.div>
      </div>

      <motion.div
        variants={fadeUp}
        className="mt-16 pb-[80px] space-y-4 overflow-hidden relative z-10"
      >
        <TickerRow items={tickerRow1} direction="left" />
        <TickerRow items={tickerRow2} direction="right" />
      </motion.div>
    </motion.section>
  );
}
