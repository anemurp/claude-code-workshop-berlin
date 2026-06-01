"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, Menu, X, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { hero } from "../content";
import { Button } from "./ui/Button";

const navLinks = [
  { label: "Case Studies", href: "/case-studies" },
  { label: "AI Projects", href: "/projects" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText("anemurp@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  // Close on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav
        className="sticky top-0 z-50 backdrop-blur border-b"
        style={{ backgroundColor: "var(--nav-bg)", borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-5xl px-6 flex items-center justify-between h-14 gap-4">
          <Link
            href="/"
            className="font-semibold text-xl shrink-0 hover:opacity-70 transition-opacity"
            style={{ color: "var(--text)" }}
          >
            {hero.name}
          </Link>

          {/* Desktop: nav links + Resume button — lg and above */}
          <div className="hidden lg:flex items-center gap-4 text-sm">
            <ul className="flex items-center gap-5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="transition-opacity hover:opacity-70"
                    style={{
                      color: pathname === l.href ? "var(--accent)" : "var(--muted)",
                      fontWeight: pathname === l.href ? 500 : 400,
                    }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              onClick={copyEmail}
              aria-label="Copy email address"
              className="relative transition-opacity hover:opacity-70"
              style={{ color: "#1A2FD4", display: "flex", alignItems: "center", background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <Mail size={20} />
              {copied && (
                <span
                  className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs px-2 py-1 rounded whitespace-nowrap"
                  style={{ backgroundColor: "#1A2FD4", color: "#fff" }}
                >
                  Copied!
                </span>
              )}
            </button>
            <a
              href={hero.ctaPrimary.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-opacity hover:opacity-70"
              style={{ color: "#1A2FD4", display: "flex", alignItems: "center" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <Button href="/resume.pdf" variant="secondary" className="!h-auto py-1.5 px-4 text-sm shrink-0" target="_blank" rel="noopener noreferrer">
              <Download size={14} className="mr-1.5" />
              Resume
            </Button>
          </div>

          {/* Hamburger button — below lg only */}
          <button
            className="lg:hidden flex items-center justify-center rounded-lg transition-colors hover:bg-[#F0F0F0]"
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

      {/* Mobile drawer + backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15, ease: "easeIn" } }}
            className="lg:hidden"
          >
            {/* Tap-outside backdrop */}
            <div
              className="fixed inset-0 z-30"
              onClick={() => setOpen(false)}
            />
            {/* Drawer panel */}
            <div
              className="fixed left-0 right-0 z-40 bg-white border-b border-[#E8E8E8] px-6 py-6"
              style={{ top: 56, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
            >
              <ul>
                {navLinks.map((l, i) => (
                  <li
                    key={l.href}
                    style={{ borderBottom: i < navLinks.length ? "1px solid #F0F0F0" : undefined }}
                  >
                    <Link
                      href={l.href}
                      className="block"
                      style={{ fontSize: 18, fontWeight: 500, color: "#0F0F0F", padding: "14px 0" }}
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li style={{ borderBottom: "1px solid #F0F0F0" }}>
                  <button
                    onClick={() => { copyEmail(); setOpen(false); }}
                    className="flex items-center gap-2 w-full text-left"
                    style={{ fontSize: 18, fontWeight: 500, color: "#0F0F0F", padding: "14px 0", background: "none", border: "none", cursor: "pointer" }}
                  >
                    {copied ? "Copied!" : "Email"} <Mail size={18} color="#1A2FD4" />
                  </button>
                </li>
                <li style={{ borderBottom: "1px solid #F0F0F0" }}>
                  <a
                    href={hero.ctaPrimary.href}
                    className="flex items-center gap-2"
                    style={{ fontSize: 18, fontWeight: 500, color: "#0F0F0F", padding: "14px 0" }}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                  >
                    LinkedIn
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="/resume.pdf"
                    className="flex items-center gap-2"
                    style={{ fontSize: 18, fontWeight: 500, color: "#0F0F0F", padding: "14px 0" }}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                  >
                    Resume <Download size={16} />
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
