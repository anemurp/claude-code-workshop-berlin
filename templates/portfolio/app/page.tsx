import { Hero } from "../components/Hero";
import { CaseStudyCards } from "../components/CaseStudyCards";
import { Testimonials } from "../components/Testimonials";
import { FloatingVideo } from "../components/FloatingVideo";
import { caseStudies } from "../case-studies";

export default function Home() {
  return (
    <>
      <main className="mx-auto max-w-3xl px-6">
        <Hero />

        <section id="work" style={{ paddingTop: 32 }}>
          <h2 style={{ marginBottom: 24 }}>
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
