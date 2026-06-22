"use client";
import { Mail } from "lucide-react";
import { ButterflyAnimation } from "./ButterflyAnimation";

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#1a1a2e",
        borderRadius: "16px 16px 0 0",
        position: "relative",
        overflow: "hidden",
        padding: "72px 24px 56px",
        textAlign: "center",
      }}
    >
      {/* Main content */}
      <div style={{ maxWidth: 580, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <h2
          style={{
            color: "white",
            fontSize: "clamp(22px, 3.5vw, 36px)",
            fontWeight: 800,
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
            marginBottom: 20,
          }}
        >
          If you&rsquo;ve made it this far,<br />I think we&rsquo;d work well together.
        </h2>

        {/* Purple divider */}
        <div style={{ width: 32, height: 2, backgroundColor: "#6B5CE7", margin: "0 auto 20px" }} />

        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, marginBottom: 36, lineHeight: 1.6 }}>
          Let&rsquo;s build something worth building.
        </p>

        {/* Email CTA pill */}
        <a
          href="mailto:anemurp@gmail.com"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "#6B5CE7",
            color: "white",
            borderRadius: 999,
            padding: "12px 24px",
            fontSize: 14,
            fontWeight: 500,
            textDecoration: "none",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          <Mail size={15} />
          anemurp@gmail.com
        </a>
      </div>

      {/* Copyright */}
      <p style={{ color: "rgba(255,255,255,0.18)", fontSize: 11, marginTop: 52, position: "relative", zIndex: 1 }}>
        Made with Claude Code · Berlin · 2026
      </p>

      {/* Butterfly — bottom right corner */}
      <div style={{ position: "absolute", bottom: 20, right: 28, zIndex: 2 }}>
        <ButterflyAnimation />
      </div>
    </footer>
  );
}
