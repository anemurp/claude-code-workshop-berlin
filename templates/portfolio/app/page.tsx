import { Hero } from "../components/Hero";
import { SkillsTicker } from "../components/SkillsTicker";
import { CaseStudyCards } from "../components/CaseStudyCards";
import { Testimonials } from "../components/Testimonials";
import { FloatingVideo } from "../components/FloatingVideo";
import { caseStudies } from "../case-studies";

export default function Home() {
  return (
    <>
      <Hero />
      <SkillsTicker />

      <main className="mx-auto max-w-3xl px-6">
        <section id="work" style={{ paddingTop: 72 }}>
          <h2 style={{ marginBottom: 24, fontSize: 20, fontWeight: 600 }}>
            Selected Work
          </h2>
          <CaseStudyCards studies={caseStudies} />
        </section>
      </main>

      <Testimonials />
      <FloatingVideo />
    </>
  );
}
