"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// Each card shares the same DNA as the case studies (image, title, description,
// tags, links) but is intentionally lighter and more experimental: a neutral
// card on a subtle border + shadow, rather than the bold full-bleed colour of
// the case study cards.
//
// To add a real thumbnail, drop the file into /public and set `thumbnail` to
// its path (e.g. "/ai-projects/berghain-simulator.png"). Until then the card
// shows a neutral placeholder.

type ProjectLink = {
  label: string;
  href: string;
  external: boolean;
  note?: string;
};

type AiProject = {
  thumbnail: string;
  title: string;
  description: string;
  tags: string[];
  links: ProjectLink[];
};

const PROJECTS: AiProject[] = [
  {
    // SCREENSHOT: berghain-simulator.png
    thumbnail: "",
    title: "Berghain Simulator",
    description:
      "A Berlin survival game built at an AI hackathon in 2 days — get past the bouncer using cultural fluency and restraint.",
    tags: ["Game Design", "Prompt Engineering", "Hackathon", "2026"],
    links: [
      { label: "Play the game", href: "#", external: true },
      {
        label: "Read case study",
        href: "/ai-projects/berghain-simulator",
        external: false,
      },
    ],
  },
  {
    // SCREENSHOT: vaulty.png
    thumbnail: "",
    title: "Vaulty",
    description:
      "A children's budgeting and allowance tracking app — built with Lovable and Claude Code in 2 hours.",
    tags: ["Product Design", "Lovable", "Claude Code", "FinTech"],
    links: [{ label: "View live", href: "#", external: true }],
  },
  {
    // SCREENSHOT: common-ground.png
    thumbnail: "",
    title: "Common Ground",
    description:
      "A Berlin events app where you can see which mutuals are going, connect beforehand, and build a group — pitched in 2 minutes at a Lovable hackathon.",
    tags: ["Community", "Lovable", "Hackathon", "Prototype"],
    links: [
      {
        label: "View prototype",
        href: "#",
        external: true,
        note: "uses placeholder data",
      },
    ],
  },
];

export function AiProjectCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {PROJECTS.map((p) => (
        <motion.div
          key={p.title}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm hover:shadow-md"
        >
          {/* Thumbnail (16:9) */}
          <div className="aspect-[16/9] w-full overflow-hidden bg-ink/5">
            {p.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.thumbnail}
                alt={p.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs font-medium text-ink/30">
                Add screenshot
              </div>
            )}
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col p-5">
            {/* Tag pills */}
            <div className="flex flex-wrap gap-2">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-ink/15 bg-ink/5 px-2.5 py-1 text-xs text-ink/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title + description */}
            <h2 className="mt-4 text-lg font-semibold text-ink">{p.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">
              {p.description}
            </p>

            {/* Links (pinned to the bottom so cards stay equal height) */}
            <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-5">
              {p.links.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-accent hover:underline"
                    title={link.note}
                  >
                    {link.label} →
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm font-medium text-accent hover:underline"
                  >
                    {link.label} →
                  </Link>
                )
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
