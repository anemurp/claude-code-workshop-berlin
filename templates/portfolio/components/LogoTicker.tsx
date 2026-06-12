"use client";

import { useState } from "react";

const LOGOS = [
  { name: "Figma",      slug: "figma"      },
  { name: "Notion",     slug: "notion"     },
  { name: "Grammarly",  slug: "grammarly"  },
  { name: "Confluence", slug: "confluence" },
  { name: "Jira",       slug: "jira"       },
  { name: "Slack",      slug: "slack"      },
  { name: "Spotify",    slug: "spotify"    },
  { name: "Claude",     slug: "claude"     },
  { name: "ChatGPT",    slug: "openai"     },
  { name: "Lovable",    slug: "lovable"    },
  { name: "V0",         slug: "v0"         },
  { name: "Bolt",       slug: "bolt"       },
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
                src={`https://cdn.simpleicons.org/${logo.slug}`}
                alt={logo.name}
                width={36}
                height={36}
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
