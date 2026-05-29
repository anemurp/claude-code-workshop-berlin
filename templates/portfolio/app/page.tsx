import { Hero } from "../components/Hero";
import { Contact } from "../components/Contact";
import { CaseStudyCards } from "../components/CaseStudyCards";
import { caseStudies } from "../case-studies";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6">
      <Hero />

      <section id="work" className="py-16">
        <h2 className="mb-2">Bridging product, engineering, and research</h2>
        <h3 className="text-lg text-ink/50 mb-10">Selected work</h3>
        <CaseStudyCards studies={caseStudies} />
      </section>

      <Contact />
    </main>
  );
}
