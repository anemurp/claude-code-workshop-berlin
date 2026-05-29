import { contact, hero } from "../content";

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function DotCluster({ className }: { className?: string }) {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="20" cy="18" r="2.5" fill="#E8612A" />
      <circle cx="30" cy="12" r="1.5" fill="#E8612A" />
      <circle cx="38" cy="20" r="2" fill="#E8612A" />
      <circle cx="14" cy="28" r="1.5" fill="#E8612A" />
      <circle cx="26" cy="32" r="2" fill="#E8612A" />
      <circle cx="42" cy="15" r="1.5" fill="#E8612A" />
      <circle cx="10" cy="20" r="2" fill="#E8612A" />
      <circle cx="32" cy="26" r="1.5" fill="#E8612A" />
      <circle cx="46" cy="28" r="2" fill="#E8612A" />
      <circle cx="22" cy="40" r="1.5" fill="#E8612A" />
      <circle cx="50" cy="38" r="2" fill="#E8612A" />
      <circle cx="12" cy="38" r="1.5" fill="#E8612A" />
      <circle cx="18" cy="10" r="1.5" fill="#E8612A" />
      <circle cx="44" cy="10" r="2" fill="#E8612A" />
      <circle cx="36" cy="36" r="1.5" fill="#E8612A" />
    </svg>
  );
}

function OrganicIllustration() {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M100 12 C138 14 172 42 178 82 C184 122 162 162 124 180 C86 198 44 182 24 152 C4 122 8 76 28 50 C48 24 62 10 100 12Z"
        stroke="#E8612A"
        strokeWidth="1.5"
      />
      <path
        d="M100 30 C130 32 156 54 162 84 C168 114 150 144 124 156 C98 168 66 156 50 134 C34 112 38 82 52 60 C66 38 70 28 100 30Z"
        stroke="#F5EDD6"
        strokeWidth="1.5"
      />
      <path
        d="M100 48 C122 50 142 68 146 88 C150 108 138 130 118 140 C98 150 76 140 64 122 C52 104 56 80 68 64 C80 48 78 46 100 48Z"
        stroke="#E8612A"
        strokeWidth="1.5"
      />
      <path
        d="M100 66 C115 68 128 80 131 95 C134 110 124 124 110 128 C96 132 80 124 72 110 C64 96 68 78 78 68 C88 58 85 64 100 66Z"
        stroke="#F5EDD6"
        strokeWidth="1.5"
      />
      <path
        d="M100 82 C110 83 118 92 120 100 C122 108 116 118 106 120 C96 122 86 116 82 106 C78 96 82 86 90 82 C94 80 96 81 100 82Z"
        stroke="#E8612A"
        strokeWidth="1.5"
      />
      {/* Center dot cluster — cream */}
      <circle cx="97" cy="97" r="2" fill="#F5EDD6" />
      <circle cx="103" cy="94" r="1.5" fill="#F5EDD6" />
      <circle cx="105" cy="101" r="2" fill="#F5EDD6" />
      <circle cx="98" cy="104" r="1.5" fill="#F5EDD6" />
      <circle cx="92" cy="100" r="1.5" fill="#F5EDD6" />
      <circle cx="100" cy="99" r="1" fill="#F5EDD6" />
      {/* Scattered orbital dots */}
      <circle cx="32" cy="58" r="2" fill="#E8612A" />
      <circle cx="38" cy="52" r="1.5" fill="#E8612A" />
      <circle cx="26" cy="64" r="1.5" fill="#E8612A" />
      <circle cx="162" cy="138" r="2" fill="#E8612A" />
      <circle cx="168" cy="132" r="1.5" fill="#E8612A" />
      <circle cx="158" cy="145" r="1.5" fill="#E8612A" />
      <circle cx="155" cy="48" r="2" fill="#F5EDD6" />
      <circle cx="160" cy="42" r="1.5" fill="#F5EDD6" />
      <circle cx="148" cy="54" r="1.5" fill="#F5EDD6" />
      <circle cx="44" cy="156" r="2" fill="#F5EDD6" />
      <circle cx="50" cy="162" r="1.5" fill="#F5EDD6" />
      <circle cx="38" cy="162" r="1.5" fill="#F5EDD6" />
    </svg>
  );
}

function PatternBand() {
  return (
    <svg
      width="100%"
      height="100"
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0,38 C180,22 360,52 540,35 C720,18 900,48 1080,32 C1260,16 1360,42 1440,38"
        stroke="#E8612A"
        strokeWidth="1.5"
        opacity="0.7"
      />
      <path
        d="M0,58 C200,44 380,68 560,54 C740,40 920,64 1100,50 C1280,38 1370,58 1440,55"
        stroke="#E8612A"
        strokeWidth="1.5"
        opacity="0.45"
      />
      <path
        d="M0,22 C160,10 340,38 520,22 C700,6 880,35 1060,20 C1240,6 1360,24 1440,20"
        stroke="#1B6B6B"
        strokeWidth="1.5"
        opacity="0.7"
      />
      <path
        d="M0,75 C220,62 420,82 620,70 C820,58 1020,78 1220,65 C1340,56 1400,72 1440,70"
        stroke="#1B6B6B"
        strokeWidth="1.5"
        opacity="0.4"
      />
      <circle cx="180" cy="28" r="2" fill="#E8612A" opacity="0.6" />
      <circle cx="188" cy="22" r="1.5" fill="#E8612A" opacity="0.5" />
      <circle cx="174" cy="35" r="1.5" fill="#E8612A" opacity="0.4" />
      <circle cx="520" cy="50" r="2" fill="#1B6B6B" opacity="0.7" />
      <circle cx="528" cy="44" r="1.5" fill="#1B6B6B" opacity="0.5" />
      <circle cx="514" cy="57" r="1.5" fill="#1B6B6B" opacity="0.4" />
      <circle cx="860" cy="30" r="2" fill="#E8612A" opacity="0.6" />
      <circle cx="868" cy="24" r="1.5" fill="#E8612A" opacity="0.5" />
      <circle cx="854" cy="37" r="1.5" fill="#E8612A" opacity="0.4" />
      <circle cx="1200" cy="55" r="2" fill="#1B6B6B" opacity="0.7" />
      <circle cx="1208" cy="49" r="1.5" fill="#1B6B6B" opacity="0.5" />
      <circle cx="1194" cy="62" r="1.5" fill="#1B6B6B" opacity="0.4" />
      <circle cx="350" cy="16" r="1.5" fill="#E8612A" opacity="0.5" />
      <circle cx="700" cy="70" r="1.5" fill="#1B6B6B" opacity="0.5" />
      <circle cx="1050" cy="18" r="2" fill="#E8612A" opacity="0.55" />
    </svg>
  );
}

export function Footer() {
  const linkedInHref =
    contact.socials.find((s) => s.label === "LinkedIn")?.href ?? "#";

  return (
    <footer className="bg-cobalt relative overflow-hidden">
      {/* Subtle background dot motifs */}
      <DotCluster className="absolute top-24 left-[6%] opacity-[0.15] pointer-events-none" />
      <DotCluster className="absolute top-44 left-[52%] opacity-[0.12] pointer-events-none" />
      <DotCluster className="absolute bottom-24 left-[28%] opacity-[0.14] pointer-events-none" />
      <DotCluster className="absolute top-36 right-[10%] opacity-[0.13] pointer-events-none" />

      {/* Organic pattern band */}
      <PatternBand />

      {/* Main two-column layout */}
      <div className="relative z-10 mx-auto max-w-5xl px-8 pt-10 pb-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* LEFT — email + micro-copy + links */}
          <div>
            <a
              href={`mailto:${contact.email}`}
              className="block font-display text-cream underline underline-offset-4 decoration-1 hover:text-terracotta transition-colors"
              style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: "1.15" }}
            >
              {contact.email}
            </a>

            <p className="mt-4 text-sm leading-relaxed text-periwinkle">
              I design for the people who were never considered in the first draft.
            </p>

            <div className="mt-5 flex items-center gap-5">
              <a
                href={linkedInHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-cream hover:text-terracotta transition-colors"
              >
                <LinkedInIcon />
                LinkedIn
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium uppercase tracking-widest text-cream hover:text-terracotta transition-colors"
              >
                Resume ↗
              </a>
            </div>
          </div>

          {/* RIGHT — nav links + illustration */}
          <div className="flex flex-col md:items-end">
            <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm">
              <div className="flex flex-col gap-3">
                {[
                  { label: "Home", href: "/" },
                  { label: "Work", href: "/#work" },
                  { label: "About", href: "/about" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-periwinkle hover:text-cream transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href={linkedInHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-periwinkle hover:text-cream transition-colors"
                >
                  LinkedIn ↗
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-periwinkle hover:text-cream transition-colors"
                >
                  Resume ↗
                </a>
              </div>
            </div>

            <div className="mt-6">
              <OrganicIllustration />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 mx-auto max-w-5xl px-8 py-5 border-t border-cobalt-light">
        <span className="text-sm text-periwinkle">
          {hero.name} © 2026
        </span>
      </div>
    </footer>
  );
}
