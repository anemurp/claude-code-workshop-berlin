"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { contact, hero } from "../content";
import { ButterflyAnimation } from "./ButterflyAnimation";

const CONFETTI = [
  { x: -220, y: -140, rotate: 45,   color: "#E8612A", delay: 0.00, w: 14, h: 9  },
  { x:  230, y: -160, rotate: -30,  color: "#1B2A6B", delay: 0.02, w: 10, h: 14 },
  { x: -140, y: -220, rotate: 20,   color: "#F5EDD6", delay: 0.01, w: 12, h: 8  },
  { x:  260, y: -100, rotate: 60,   color: "#E8612A", delay: 0.03, w: 9,  h: 13 },
  { x: -270, y: -90,  rotate: -60,  color: "#1B6B6B", delay: 0.01, w: 13, h: 8  },
  { x:  160, y: -250, rotate: 15,   color: "#1B2A6B", delay: 0.04, w: 10, h: 11 },
  { x:   20, y: -280, rotate: -45,  color: "#E8612A", delay: 0.00, w: 15, h: 10 },
  { x: -100, y: -200, rotate: 90,   color: "#1B6B6B", delay: 0.05, w: 9,  h: 14 },
  { x:   90, y: -240, rotate: -20,  color: "#F5EDD6", delay: 0.02, w: 12, h: 10 },
  { x: -190, y: -130, rotate: 130,  color: "#E8612A", delay: 0.03, w: 11, h: 13 },
  { x:  200, y: -120, rotate: -90,  color: "#1B2A6B", delay: 0.01, w: 13, h: 9  },
  { x:  -50, y: -300, rotate: 30,   color: "#1B6B6B", delay: 0.04, w: 9,  h: 12 },
  { x:  300, y: -50,  rotate: 75,   color: "#E8612A", delay: 0.02, w: 11, h: 8  },
  { x: -300, y: -60,  rotate: -75,  color: "#F5EDD6", delay: 0.03, w: 8,  h: 11 },
  { x:  120, y: -280, rotate: 110,  color: "#1B2A6B", delay: 0.01, w: 14, h: 9  },
  { x: -160, y: -260, rotate: -110, color: "#E8612A", delay: 0.05, w: 10, h: 13 },
];

function CopiedAnimation() {
  return (
    <motion.div
      className="absolute bottom-full left-0 mb-4 z-50 pointer-events-none flex items-start justify-start"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative flex items-center justify-center">
        {CONFETTI.map((c, i) => (
          <motion.div
            key={i}
            className="absolute rounded-sm"
            style={{ width: c.w, height: c.h, backgroundColor: c.color }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
            animate={{ x: c.x, y: c.y, opacity: 0, rotate: c.rotate + 720, scale: 0.5 }}
            transition={{ duration: 0.7, delay: c.delay, ease: [0.2, 0, 0.8, 1] }}
          />
        ))}

        <motion.div
          className="relative"
          style={{ width: 100, height: 72 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <svg width="100" height="72" viewBox="0 0 100 72" fill="none">
            <rect x="0" y="24" width="100" height="48" rx="3" fill="#F5EDD6" stroke="#E8612A" strokeWidth="2" />
            <path d="M0 24 L50 52 L100 24" stroke="#E8612A" strokeWidth="1.2" opacity="0.35" />
            <motion.path
              d="M2 24 L50 2 L98 24 Z"
              fill="#EDE4CC"
              stroke="#E8612A"
              strokeWidth="2"
              strokeLinejoin="round"
              style={{ transformOrigin: "50px 24px" }}
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{ duration: 0.25, delay: 0.15, ease: "easeIn" }}
            />
          </svg>

          <motion.div
            className="absolute left-1/2 -translate-x-1/2"
            style={{ bottom: 32 }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -52, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div
              className="bg-white rounded-sm shadow-lg px-4 py-2 text-center whitespace-nowrap"
              style={{ border: "1.5px solid #e5e5e5", minWidth: 80 }}
            >
              <span className="text-xs font-bold" style={{ color: "#1B2A6B" }}>Copied!</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function DotCluster({ className }: { className?: string }) {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
      <circle cx="20" cy="18" r="2.5" fill="#E8612A" style={{ animation: "twinkle 2.1s ease-in-out infinite", animationDelay: "0.0s" }} />
      <circle cx="30" cy="12" r="1.5" fill="#E8612A" style={{ animation: "twinkle 3.4s ease-in-out infinite", animationDelay: "0.5s" }} />
      <circle cx="38" cy="20" r="2"   fill="#E8612A" style={{ animation: "twinkle 2.7s ease-in-out infinite", animationDelay: "1.1s" }} />
      <circle cx="14" cy="28" r="1.5" fill="#E8612A" style={{ animation: "twinkle 3.9s ease-in-out infinite", animationDelay: "0.3s" }} />
      <circle cx="26" cy="32" r="2"   fill="#E8612A" style={{ animation: "twinkle 2.4s ease-in-out infinite", animationDelay: "1.8s" }} />
      <circle cx="42" cy="15" r="1.5" fill="#E8612A" style={{ animation: "twinkle 3.1s ease-in-out infinite", animationDelay: "0.7s" }} />
      <circle cx="10" cy="20" r="2"   fill="#E8612A" style={{ animation: "twinkle 2.8s ease-in-out infinite", animationDelay: "2.2s" }} />
      <circle cx="32" cy="26" r="1.5" fill="#E8612A" style={{ animation: "twinkle 4.2s ease-in-out infinite", animationDelay: "0.2s" }} />
      <circle cx="46" cy="28" r="2"   fill="#E8612A" style={{ animation: "twinkle 2.5s ease-in-out infinite", animationDelay: "1.4s" }} />
      <circle cx="22" cy="40" r="1.5" fill="#E8612A" style={{ animation: "twinkle 3.6s ease-in-out infinite", animationDelay: "0.9s" }} />
      <circle cx="50" cy="38" r="2"   fill="#E8612A" style={{ animation: "twinkle 2.2s ease-in-out infinite", animationDelay: "2.6s" }} />
      <circle cx="12" cy="38" r="1.5" fill="#E8612A" style={{ animation: "twinkle 3.3s ease-in-out infinite", animationDelay: "0.4s" }} />
      <circle cx="18" cy="10" r="1.5" fill="#E8612A" style={{ animation: "twinkle 4.0s ease-in-out infinite", animationDelay: "1.6s" }} />
      <circle cx="44" cy="10" r="2"   fill="#E8612A" style={{ animation: "twinkle 2.9s ease-in-out infinite", animationDelay: "0.1s" }} />
      <circle cx="36" cy="36" r="1.5" fill="#E8612A" style={{ animation: "twinkle 3.7s ease-in-out infinite", animationDelay: "2.0s" }} />
    </svg>
  );
}

function PatternBand() {
  return (
    <svg
      width="100%"
      height="100"
      style={{ opacity: 0.3 }}
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0,38 C180,22 360,52 540,35 C720,18 900,48 1080,32 C1260,16 1360,42 1440,38"
        stroke="#E8612A"
        strokeWidth="1.5"
        opacity="0.7"
        style={{ animation: "wave-bob 4s ease-in-out infinite", animationDelay: "0s" }}
      />
      <path
        d="M0,58 C200,44 380,68 560,54 C740,40 920,64 1100,50 C1280,38 1370,58 1440,55"
        stroke="#E8612A"
        strokeWidth="1.5"
        opacity="0.45"
        style={{ animation: "wave-bob 5s ease-in-out infinite", animationDelay: "0.8s" }}
      />
      <path
        d="M0,22 C160,10 340,38 520,22 C700,6 880,35 1060,20 C1240,6 1360,24 1440,20"
        stroke="#1B6B6B"
        strokeWidth="1.5"
        opacity="0.7"
        style={{ animation: "wave-bob 6s ease-in-out infinite", animationDelay: "0.4s" }}
      />
      <path
        d="M0,75 C220,62 420,82 620,70 C820,58 1020,78 1220,65 C1340,56 1400,72 1440,70"
        stroke="#1B6B6B"
        strokeWidth="1.5"
        opacity="0.4"
        style={{ animation: "wave-bob 4.5s ease-in-out infinite", animationDelay: "1.2s" }}
      />
      <circle cx="180" cy="28" r="2"   fill="#E8612A" opacity="0.6" />
      <circle cx="188" cy="22" r="1.5" fill="#E8612A" opacity="0.5" />
      <circle cx="174" cy="35" r="1.5" fill="#E8612A" opacity="0.4" />
      <circle cx="520" cy="50" r="2"   fill="#1B6B6B" opacity="0.7" />
      <circle cx="528" cy="44" r="1.5" fill="#1B6B6B" opacity="0.5" />
      <circle cx="514" cy="57" r="1.5" fill="#1B6B6B" opacity="0.4" />
      <circle cx="860" cy="30" r="2"   fill="#E8612A" opacity="0.6" />
      <circle cx="868" cy="24" r="1.5" fill="#E8612A" opacity="0.5" />
      <circle cx="854" cy="37" r="1.5" fill="#E8612A" opacity="0.4" />
      <circle cx="1200" cy="55" r="2"  fill="#1B6B6B" opacity="0.7" />
      <circle cx="1208" cy="49" r="1.5" fill="#1B6B6B" opacity="0.5" />
      <circle cx="1194" cy="62" r="1.5" fill="#1B6B6B" opacity="0.4" />
      <circle cx="350" cy="16" r="1.5" fill="#E8612A" opacity="0.5" />
      <circle cx="700" cy="70" r="1.5" fill="#1B6B6B" opacity="0.5" />
      <circle cx="1050" cy="18" r="2"  fill="#E8612A" opacity="0.55" />
    </svg>
  );
}

export function Footer() {
  const linkedInHref = contact.socials.find((s) => s.label === "LinkedIn")?.href ?? "#";
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    const el = document.createElement("textarea");
    el.value = contact.email;
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <footer className="bg-cobalt relative overflow-hidden">
        <DotCluster className="absolute top-24 left-[6%] opacity-[0.15] pointer-events-none" />
        <DotCluster className="absolute top-44 left-[52%] opacity-[0.12] pointer-events-none" />
        <DotCluster className="absolute bottom-24 left-[28%] opacity-[0.14] pointer-events-none" />
        <DotCluster className="absolute top-36 right-[10%] opacity-[0.13] pointer-events-none" />

        <PatternBand />

        <div className="relative z-10 mx-auto max-w-5xl px-8 pt-10 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">

            {/* Left column */}
            <div className="flex-1 w-full">
              <div className="relative inline-block">
                <AnimatePresence>{copied && <CopiedAnimation />}</AnimatePresence>
                <button
                  onClick={copyEmail}
                  className="block font-display text-cream hover:text-terracotta transition-colors cursor-pointer text-left"
                  style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: "1.15" }}
                >
                  {contact.email}
                </button>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-periwinkle">
                I design for the people who were never considered in the first draft.
              </p>

              <div className="mt-5 flex items-center gap-5">
                <a
                  href={linkedInHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-cream hover:text-terracotta transition-colors"
                >
                  <LinkedInIcon />
                  LinkedIn
                </a>
              </div>

              <p className="mt-8 text-sm text-periwinkle">{hero.name} &copy; 2026</p>
            </div>

            {/* Right column — butterfly */}
            <div className="md:w-[40%] flex justify-center md:justify-end">
              <ButterflyAnimation />
            </div>

          </div>
        </div>
      </footer>
  );
}
