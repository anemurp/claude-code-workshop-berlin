"use client";

import { useState } from "react";

// Each logo points at a verified full-colour SVG. Most come from Simple Icons'
// CDN (brand-coloured by default); a few that Simple Icons doesn't carry are
// sourced from svgl.app instead.
const LOGOS = [
  { name: "Notion",  src: "https://svgl.app/library/notion.svg" },
  { name: "Figma",   src: "https://svgl.app/library/figma.svg"  },
  { name: "ChatGPT", src: "https://svgl.app/library/openai.svg" },
  { name: "Slack",   src: "https://svgl.app/library/slack.svg"  },
  { name: "V0",      src: "https://svgl.app/library/v0_dark.svg" },
  { name: "Spotify", src: "https://svgl.app/library/spotify.svg" },
  { name: "Bolt",    src: "https://svgl.app/library/bolt-new.svg" },
  { name: "Claude",  src: "https://svgl.app/library/claude-ai-icon.svg" },
  { name: "Granola", src: "https://svgl.app/library/granola-light.svg" },
  { name: "Lovable", src: "https://svgl.app/library/lovable.svg" },
  { name: "Framer",  src: "https://svgl.app/library/framer.svg" },
];

const ITEMS = [...LOGOS, ...LOGOS];

export function LogoTicker() {
  const [paused, setPaused] = useState(false);

  return (
    <>
      <style>{`
        @keyframes logo-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          overflow: "hidden",
          maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "max-content",
            animation: "logo-scroll 32s linear infinite",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {ITEMS.map((logo, i) => (
            <div
              key={i}
              style={{
                width: 80,
                height: 80,
                borderRadius: 14,
                backgroundColor: "#f2f2f2",
                boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 8px",
                flexShrink: 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.name}
                width={36}
                height={36}
                style={{ objectFit: "contain", maxWidth: 36, maxHeight: 36 }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
