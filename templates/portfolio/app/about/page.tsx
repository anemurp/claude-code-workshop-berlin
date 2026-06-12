import { about, skills } from "../../content";
import { MosaicGrid } from "../../components/MosaicGrid";
import { ProductGrid } from "../../components/ProductGrid";

export default function AboutPage() {
  return (
    <>
      <MosaicGrid />
      <main className="mx-auto max-w-3xl px-6 pb-16 pt-[180px]">
      <h1 className="text-4xl font-bold">{about.heading}</h1>
      <div className="mt-8 space-y-4 text-lg text-ink/80 leading-relaxed">
        {about.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div className="mt-8">
        <a
          href="/resume.pdf"
          className="inline-flex items-center gap-1.5 px-6 py-3 bg-[#6B5CE7] text-white rounded-full text-sm font-medium hover:opacity-85 transition-opacity"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download resume ↓
        </a>
      </div>

      <div className="mt-[180px]">
        <ProductGrid />
      </div>

      <section className="mt-[180px] border-t border-ink/10 pt-10">
        <h2 className="text-2xl font-semibold mb-6">{skills.heading}</h2>
        <div className="space-y-5">
          {skills.groups.map((group, i) => (
            <div key={i} className="grid md:grid-cols-[120px_1fr] gap-3 md:gap-6">
              <p className="text-sm font-medium text-ink/60 pt-1">{group.label}</p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item, j) => (
                  <span
                    key={j}
                    className="px-3 py-1 text-sm rounded-full border border-ink/15 bg-ink/5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
    </>
  );
}
