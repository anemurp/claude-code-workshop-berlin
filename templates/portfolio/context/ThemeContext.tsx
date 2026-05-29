"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Mode = "work" | "wild";

interface ThemeContextValue {
  mode: Mode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: "work",
  toggleMode: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>("work");

  useEffect(() => {
    const stored = localStorage.getItem("portfolio-mode") as Mode | null;
    if (stored === "work" || stored === "wild") {
      setMode(stored);
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (mode === "wild") {
      html.classList.add("wild");
    } else {
      html.classList.remove("wild");
    }
    localStorage.setItem("portfolio-mode", mode);
  }, [mode]);

  const toggleMode = () => setMode((m) => (m === "work" ? "wild" : "work"));

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
