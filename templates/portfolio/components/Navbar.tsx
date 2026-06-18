"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { hero } from "../content";

const navLinks = [
  { label: "Case Studies", href: "/case-studies" },
  { label: "AI Projects", href: "/projects" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<"email" | "linkedin" | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function copyEmail() {
    const email = "anemurp@gmail.com";
    const finish = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(finish).catch(() => fallbackCopy(email, finish));
    } else {
      fallbackCopy(email, finish);
    }
  }

  function fallbackCopy(text: string, onDone: () => void) {
    const el = document.createElement("textarea");
    el.value = text;
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.focus();
    el.select();
    try { document.execCommand("copy"); onDone(); } catch (_) {}
    document.body.removeChild(el);
  }

  const iconStyle = {
    color: "#0F0F0F",
    display: "flex",
    alignItems: "center",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "6px 8px",
    borderRadius: 999,
    transition: "background 0.2s ease",
  } as React.CSSProperties;

  return (
    <>
      <nav
        className="sticky top-0 z-50"
        style={{
          backgroundColor: scrolled ? "rgba(240, 238, 248, 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "0.5px solid rgba(0,0,0,0.08)" : "none",
          transition: "background-color 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease",
        }}
      >
        <div className="mx-auto max-w-5xl px-6 flex items-center justify-between h-14 gap-4">

          {/* Logo */}
          <Link
            href="/"
            className="font-semibold text-xl shrink-0"
            style={{ color: "#0F0F0F", fontWeight: 600, transition: "opacity 0.2s ease" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            {hero.name}
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-5 text-sm">
            <ul className="flex items-center gap-1">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    style={{
                      display: "inline-block",
                      padding: "6px 14px",
                      borderRadius: 999,
                      background: pathname === l.href ? "rgba(180, 170, 220, 0.35)" : "transparent",
                      color: "#0F0F0F",
                      fontWeight: pathname === l.href ? 500 : 400,
                      textDecoration: "none",
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={e => { if (pathname !== l.href) e.currentTarget.style.background = "rgba(180, 170, 220, 0.25)"; }}
                    onMouseLeave={e => { if (pathname !== l.href) e.currentTarget.style.background = "transparent"; }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Email icon */}
            <button
              onClick={copyEmail}
              aria-label="Copy email address"
              className="relative"
              style={iconStyle}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(180, 170, 220, 0.25)"; setHovered("email"); }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; setHovered(null); }}
            >
              <Mail size={20} />
              {(copied || hovered === "email") && (
                <span
                  className="absolute top-9 left-1/2 -translate-x-1/2 text-xs px-2 py-1 rounded whitespace-nowrap"
                  style={{ backgroundColor: "#6B5CE7", color: "#fff" }}
                >
                  {copied ? "Copied!" : "copy email"}
                </span>
              )}
            </button>

            {/* LinkedIn icon */}
            <a
              href={hero.ctaPrimary.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="relative"
              style={iconStyle}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(180, 170, 220, 0.25)"; setHovered("linkedin"); }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; setHovered(null); }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              {hovered === "linkedin" && (
                <span
                  className="absolute top-9 left-1/2 -translate-x-1/2 text-xs px-2 py-1 rounded whitespace-nowrap"
                  style={{ backgroundColor: "#6B5CE7", color: "#fff" }}
                >
                  go to linkedin
                </span>
              )}
            </a>

          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden flex items-center justify-center rounded-lg transition-colors"
            style={{ width: 44, height: 44 }}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <motion.span
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              style={{ display: "flex" }}
            >
              {open ? <X size={24} color="#0F0F0F" /> : <Menu size={24} color="#0F0F0F" />}
            </motion.span>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15, ease: "easeIn" } }}
            className="lg:hidden"
          >
            <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
            <div
              className="fixed left-0 right-0 z-40 border-b border-[#E8E8E8] px-6 py-6"
              style={{
                top: 56,
                backgroundColor: "rgba(240, 238, 248, 0.96)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              }}
            >
              {/* Nav links — tighter spacing, no individual dividers */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {navLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    style={{ fontSize: 18, fontWeight: 500, color: pathname === l.href ? "#E8392A" : "#0F0F0F", padding: "16px 0", textDecoration: "none" }}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div style={{ height: 1, backgroundColor: "#E0E0E0", margin: "4px 0 16px" }} />

              {/* Contact pills — side by side */}
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => { copyEmail(); setOpen(false); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "8px 16px", borderRadius: 999,
                    border: "1px solid rgba(0,0,0,0.15)", background: "transparent",
                    cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#0F0F0F",
                  }}
                >
                  <Mail size={14} />
                  {copied ? "Copied!" : "Email"}
                </button>
                <a
                  href={hero.ctaPrimary.href}
                  target="_blank" rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "8px 16px", borderRadius: 999,
                    border: "1px solid rgba(0,0,0,0.15)", background: "transparent",
                    textDecoration: "none", fontSize: 14, fontWeight: 500, color: "#0F0F0F",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
