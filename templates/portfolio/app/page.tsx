import { Hero } from "../components/Hero";
import { CaseStudyCards } from "../components/CaseStudyCards";
import { caseStudies } from "../case-studies";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6">
      <Hero />

      <section id="work" className="py-16">
        <h2 className="mb-2">Bridging product, engineering, and research</h2>
        <h3 className="text-lg mb-10" style={{ color: "var(--muted)" }}>Selected work</h3>
        <CaseStudyCards studies={caseStudies} />
      </section>
    </main>
  );
}
