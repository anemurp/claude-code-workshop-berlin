"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { hero } from "../content";
import { ModeToggle } from "./ui/ModeToggle";

const navLinks = [
  { label: "Work", href: "/" },
  { label: "Projects", href: "/projects" },
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
          className="font-semibold text-sm shrink-0 hover:opacity-70 transition-opacity"
          style={{ color: "var(--text)" }}
        >
          {hero.name}
        </Link>

        <div className="flex items-center gap-5 text-sm flex-wrap justify-end">
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

          <ModeToggle />

          <a
            href="/resume.pdf"
            className="px-4 py-1.5 rounded-full transition-opacity hover:opacity-70 shrink-0 text-sm"
            style={{
              border: "1.5px solid var(--border)",
              color: "var(--text)",
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </div>
      </div>

      {/* Mobile: mode toggle in a thin bar below the nav */}
      <div
        className="sm:hidden flex justify-center py-1.5 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <ModeToggle mobile />
      </div>
    </nav>
  );
}
