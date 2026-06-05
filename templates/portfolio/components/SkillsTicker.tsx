"use client";

import { useState, useEffect } from "react";
import {
  Search, Layout, Cpu, Layers, Users,
  PenTool, BookOpen, Activity, Globe, Accessibility,
} from "lucide-react";

const SKILLS = [
  { label: "User Research",          Icon: Search },
  { label: "Product Design",         Icon: Layout },
  { label: "AI Products",            Icon: Cpu },
  { label: "Design Systems",         Icon: Layers },
  { label: "Stakeholder Alignment",  Icon: Users },
  { label: "Prototyping",            Icon: PenTool },
  { label: "EdTech",                 Icon: BookOpen },
  { label: "Usability Testing",      Icon: Activity },
  { label: "Cross-functional Teams", Icon: Globe },
  { label: "Accessibility",          Icon: Accessibility },
];

// Duplicate list once for a seamless infinite loop (translateX(-50%) lands back at start)
const ITEMS = [...SKILLS, ...SKILLS];

export function SkillsTicker() {
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const paused = isHovered || reducedMotion;

  return (
    <>
      <style>{`
        @keyframes skills-scroll-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      <div
        aria-hidden="true"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          backgroundColor: "#F0EEF8",
          padding: "20px 0",
          marginTop: 20,
          width: "100%",
          overflow: "hidden",
          position: "relative",
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "max-content",
            animation: "skills-scroll-left 45s linear infinite",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {ITEMS.map((skill, i) => (
            <span
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "0 28px",
                fontSize: 16,
                fontWeight: 500,
                letterSpacing: "0.03em",
                whiteSpace: "nowrap",
                color: "#888888",
                cursor: "default",
              }}
            >
              <skill.Icon
                size={18}
                strokeWidth={2}
                style={{ stroke: "#888888", fill: "none", flexShrink: 0 }}
              />
              {skill.label}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
