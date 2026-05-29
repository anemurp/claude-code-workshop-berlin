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
        // Original portfolio tokens
        ink: "#0f0f0f",
        paper: "#fafaf7",
        accent: "#3b82f6",
        // Case study design tokens
        warm: "#F5F0E8",
        navy: "#051225",
        primary: "#5B5BD6",
        coral: "#FF6B4A",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
