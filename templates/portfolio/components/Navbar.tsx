"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download } from "lucide-react";
import { hero } from "../content";
import { Button } from "./ui/Button";

const navLinks = [
  { label: "Case Studies", href: "/case-studies" },
  { label: "AI Projects", href: "/projects" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
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

        <div className="flex items-center gap-4 text-sm">
          <ul className="hidden sm:flex items-center gap-5">
            
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
      </div>
    </nav>
  );
}
