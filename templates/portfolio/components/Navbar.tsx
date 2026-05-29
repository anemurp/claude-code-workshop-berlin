"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { hero } from "../content";

const navLinks = [
  { label: "Work", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-50 bg-paper/90 backdrop-blur border-b border-ink/10">
      <div className="mx-auto max-w-3xl px-6 flex items-center justify-between h-14">
        <Link
          href="/"
          className="font-semibold text-sm hover:text-accent transition"
        >
          {hero.name}
        </Link>
        <ul className="flex items-center gap-5 text-sm">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`hover:text-accent transition ${
                  pathname === l.href
                    ? "text-accent font-medium"
                    : "text-ink/70"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="/resume.pdf"
              className="px-4 py-1.5 border border-ink/20 rounded-full hover:bg-ink/5 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
