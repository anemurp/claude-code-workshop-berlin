"use client";

import Link from "next/link";

// Each card shares the same DNA as the case studies (image, title, description,
// tags, links) but is intentionally lighter and more experimental: a neutral,
// static card on a subtle border, rather than the bold full-bleed colour of
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
    thumbnail: "/assets/ai%20projects/Berghain.png",
    title: "Berghain Simulator",
    description:
      "A Berlin survival game built at an AI hackathon in 2 days — get past the bouncer using cultural fluency and restraint.",
    tags: ["Game Design", "Prompt Engineering", "Hackathon", "2026"],
    links: [
      { label: "Play the game", href: "https://stellar-pastelito-b88917.netlify.app/", external: true },
      {
        label: "Read case study",
        href: "https://www.linkedin.com/pulse/ai-hackathon-most-berlin-game-ever-anna-murphy-6kenf/",
        external: true,
      },
    ],
  },
  {
    // SCREENSHOT: vaulty.png
    thumbnail: "/assets/ai%20projects/vaulty.png",
    title: "Vaulty",
    description:
      "A children's budgeting and allowance tracking app — built with Lovable and Claude Code in 2 hours.",
    tags: ["Product Design", "Lovable", "Claude Code", "FinTech"],
    links: [{ label: "View live", href: "#", external: true }],
  },
  {
    // SCREENSHOT: common-ground.png
    thumbnail: "/assets/ai projects/CommonGround.png",
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
    <div className="grid grid-cols-1 sm:grid-cols-2 items-stretch gap-6">
      {PROJECTS.map((p) => (
        <div
          key={p.title}
          className="flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-[#FAFAFA]"
        >
          {/* Thumbnail — slightly taller on desktop, a touch shorter on mobile */}
          <div className="aspect-[16/9] sm:aspect-[16/10] w-full overflow-hidden bg-ink/5">
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

          {/* Body — tighter padding on mobile, a little roomier on desktop */}
          <div className="flex flex-1 flex-col px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
            {/* Tag pills */}
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#F0F0F0] px-2 py-0.5 text-[11px] text-ink/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title + description (shown in full) */}
            <h2 className="mt-3 text-[22px] font-bold leading-tight text-ink">{p.title}</h2>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink/70">
              {p.description}
            </p>

            {/* Links — first link is the primary solid button, any further link
                is a secondary text link. They stack full-width on mobile. */}
            <div className="mt-auto flex flex-col gap-2 pt-4 sm:flex-row sm:gap-3">
              {p.links.map((link, i) => {
                const classes =
                  i === 0
                    ? "inline-flex h-11 w-full items-center justify-center rounded-full bg-[#6B5CE7] px-4 text-sm font-medium text-white transition-colors hover:bg-[#5849d6] sm:h-9 sm:w-auto"
                    : "inline-flex h-11 w-full items-center justify-center rounded-full border border-[#6B5CE7] px-4 text-sm font-medium text-[#6B5CE7] transition-colors hover:bg-[#6B5CE7] hover:text-white sm:h-9 sm:w-auto";
                return link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.note}
                    className={classes}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.label} href={link.href} className={classes}>
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
