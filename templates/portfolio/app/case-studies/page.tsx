import { CaseStudyCards } from "../../components/CaseStudyCards";
import { caseStudies } from "../../case-studies";

export default function CaseStudiesPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold leading-[1.25] text-center">
        <span className="block text-ink">Case Studies</span>
        <span className="block text-[color:var(--accent-purple)]">
          End-to-end, from ambiguity to shipped.
        </span>
      </h1>
      <div className="mt-10">
        <CaseStudyCards studies={caseStudies} />
      </div>
    </main>
  );
}
