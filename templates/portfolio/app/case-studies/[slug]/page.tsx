import { notFound } from "next/navigation";
import { caseStudies } from "../../../data/case-studies";
import { CaseStudyContent } from "../../../components/CaseStudyContent";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const cs = caseStudies.find((c) => c.slug === params.slug);
  if (!cs) notFound();
  return <CaseStudyContent cs={cs} />;
}
