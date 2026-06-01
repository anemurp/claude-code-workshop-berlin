import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        muted: "#666666",
        subtle: "#999999",
        paper: "#fafaf7",
        accent: "#3b82f6",
        warm: "#F5F0E8",
        navy: "#051225",
        primary: "#5B5BD6",
        coral: "#FF6B4A",
        // Footer palette
        cobalt: "#1A2FD4",
        "cobalt-light": "#2D3D7A",
        cream: "#F5EDD6",
        periwinkle: "#A8B8E8",
        terracotta: "#E8392A",
        teal: "#0D7A6B",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Inter Display", "Inter Display Placeholder", "var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(44px, 8vw, 96px)", {
          lineHeight: "0.95",
          letterSpacing: "-0.03em",
          fontWeight: "800",
        }],
        h2: ["40px", {
          lineHeight: "1.1",
          letterSpacing: "-0.02em",
          fontWeight: "700",
        }],
        body: ["16px", { lineHeight: "1.6" }],
        "sm-label": ["12px", {
          lineHeight: "1",
          letterSpacing: "0.08em",
          fontWeight: "500",
        }],
      },
      animation: {
        "ticker-left":  "ticker-left 35s linear infinite",
        "ticker-right": "ticker-right 42s linear infinite",
        "pulse-glow":   "pulse-glow 2s ease-in-out infinite",
      },
      keyframes: {
        "ticker-left": {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "ticker-right": {
          "0%":   { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 8px 3px rgba(74, 222, 128, 0.7)" },
          "50%":      { opacity: "0.4", boxShadow: "0 0 2px 0px rgba(74, 222, 128, 0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
