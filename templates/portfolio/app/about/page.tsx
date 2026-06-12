import { about, toolsDaily } from "../../content";
import { MosaicGrid } from "../../components/MosaicGrid";
import { ProductGrid } from "../../components/ProductGrid";
import { LogoTicker } from "../../components/LogoTicker";

export default function AboutPage() {
  return (
    <>
      <MosaicGrid />
      <main className="mx-auto max-w-3xl px-6 pb-32 pt-6 mt-6">
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

      <section className="relative mt-16 overflow-hidden rounded-3xl">
        <div
          aria-hidden="true"
          className="absolute inset-x-[-15%] inset-y-2 -skew-y-2 bg-[#6B5CE7]/[0.06]"
        />
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 px-4 py-12">
          {about.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#6B5CE7]">
                {stat.value}
              </div>
              <p className="mt-2 text-sm text-ink/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-16">
        <ProductGrid />
      </div>

      <section className="mt-[135px]">
        <h2 className="text-2xl font-bold mb-4">{toolsDaily.heading}</h2>
        <p className="text-lg text-ink/80 leading-relaxed mb-8">
          {toolsDaily.body}
        </p>
        <LogoTicker />
      </section>

    </main>
    </>
  );
}
