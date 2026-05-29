import Link from "next/link";
import { Hero } from "../components/Hero";
import { Contact } from "../components/Contact";
import { caseStudies } from "../case-studies";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6">
      <Hero />

      <section id="work" className="py-16 border-t border-ink/10">
        <h2 className="text-3xl font-semibold mb-10">Selected work</h2>
        <ul className="space-y-14">
          {caseStudies.map((cs) => (
            <li key={cs.slug}>
              <Link href={`/case-studies/${cs.slug}`} className="group block">
                <div className="w-full aspect-video bg-ink/5 rounded-xl mb-5 overflow-hidden">
                  {cs.thumbnail ? (
                    <img
                      src={cs.thumbnail}
                      alt={cs.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-ink/25">
                      {cs.title}
                    </div>
                  )}
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-xl font-semibold group-hover:text-accent transition">
                    {cs.title}
                  </h3>
                  <span className="text-sm text-ink/50 shrink-0">{cs.year}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {cs.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs rounded-full border border-ink/15 text-ink/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-ink/75 leading-relaxed">{cs.description}</p>
                <span className="mt-4 inline-block text-sm font-medium text-accent">
                  Read case study →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Contact />

      <footer className="py-10 border-t border-ink/10 text-sm text-ink/50">
        Made with Claude Code · Berlin · 2026
      </footer>
    </main>
  );
}
