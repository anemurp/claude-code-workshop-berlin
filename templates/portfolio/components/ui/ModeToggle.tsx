"use client";

import { useTheme } from "../../context/ThemeContext";

export function ModeToggle({ mobile }: { mobile?: boolean }) {
  const { mode, toggleMode } = useTheme();
  const isWild = mode === "wild";

  const height = mobile ? 30 : 36;
  const fontSize = mobile ? 12 : 13;
  const labelPadding = mobile ? "0 12px" : "0 16px";

  return (
    <button
      onClick={toggleMode}
      aria-label={`Switch to ${isWild ? "Work" : "Wild"} mode`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: `${height}px`,
        padding: "4px",
        borderRadius: "9999px",
        border: `1.5px solid ${isWild ? "#1B2A6B" : "#0F0F0F"}`,
        background: "transparent",
        cursor: "pointer",
        transition: "border-color 0.3s ease",
        fontSize: `${fontSize}px`,
        fontWeight: 500,
      }}
    >
      <span
        style={{
          padding: labelPadding,
          borderRadius: "9999px",
          lineHeight: `${height - 8}px`,
          whiteSpace: "nowrap",
          transition: "background 0.3s ease, color 0.3s ease",
          background: !isWild ? "#0F0F0F" : "transparent",
          color: !isWild ? "#F5EDD6" : "#999999",
        }}
      >
        Work
      </span>
      <span
        style={{
          padding: labelPadding,
          borderRadius: "9999px",
          lineHeight: `${height - 8}px`,
          whiteSpace: "nowrap",
          transition: "background 0.3s ease, color 0.3s ease",
          background: isWild ? "#1B2A6B" : "transparent",
          color: isWild ? "#F5EDD6" : "#999999",
        }}
      >
        Wild
      </span>
    </button>
  );
}
