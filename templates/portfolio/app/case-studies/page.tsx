import { CaseStudyCards } from "../../components/CaseStudyCards";
import { caseStudies } from "../../case-studies";

export default function CaseStudiesPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h2 className="mb-2">Case Studies</h2>
      <h3 className="text-lg mb-10" style={{ color: "var(--muted)" }}>Selected work</h3>
      <CaseStudyCards studies={caseStudies} />
    </main>
  );
}
