"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, Menu, X } from "lucide-react";
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
