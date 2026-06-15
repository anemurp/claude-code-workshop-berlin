import { Hero } from "../components/Hero";
import { SkillsTicker } from "../components/SkillsTicker";
import { CaseStudyCards } from "../components/CaseStudyCards";
import { HowIWork } from "../components/HowIWork";
import { Testimonials } from "../components/Testimonials";
import { FloatingVideo } from "../components/FloatingVideo";
import { caseStudies } from "../case-studies";

export default function Home() {
  return (
    <>
      <Hero />
      <SkillsTicker />

      <main className="mx-auto max-w-3xl px-6">
        <section id="work" style={{ paddingTop: 144 }}>
          <h2 style={{ marginBottom: 24, fontSize: 28, fontWeight: 600 }}>
            Selected Work
          </h2>
          <CaseStudyCards studies={caseStudies} />
        </section>
      </main>

      <HowIWork />

      <div style={{ paddingTop: 64 }} />
      <Testimonials />
      <div style={{ paddingBottom: 96 }} />
      <FloatingVideo />
    </>
  );
}
