// ────────────────────────────────────────────────────────────────
// CASE STUDY DATA
// Add your case studies here. Each one becomes a page at
// /case-studies/[slug]. Set thumbnail to a path inside /public,
// e.g. "/case-studies/tide-thumb.jpg", or leave it "" for a
// placeholder until you have an image.
// ────────────────────────────────────────────────────────────────

export type CaseStudy = {
  slug: string;
  title: string;
  company: string;
  year: string;
  description: string;
  thumbnail: string;
  tags: string[];
  keyMetric?: string;
  overview: string;
  problem: string;
  process: string;
  outcome: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "reading-labs",
    title: "Redesigning reading for 1.5M+ students across 22 levels",
    company: "McGraw Hill",
    year: "2024",
    description:
      "SRA Reading Labs had delivered reading for 60 years as a physical product built around teacher motivation. I redesigned it for independent student learning — 16 prototypes, 7 stakeholder groups, and a research-grounded motivation system that increased engagement by 68%.",
    thumbnail: "/case-studies/reading-labs.png",
    tags: ["EdTech", "Gamification", "User Research", "K–8"],
    keyMetric: "1.5M+ students impacted",
    overview:
      "Tide's checkout flow had a 42% drop-off rate at the point of identity verification. Users were confused by the step count, unclear about what documents they'd need, and frustrated by a UI that felt like it was designed for compliance rather than people.",
    problem:
      "The core issue wasn't technical — it was that the flow treated verification as a legal hurdle rather than a trust-building moment. We needed to redesign it around clarity: tell people what's coming, why it matters, and what to expect next.",
    process:
      "I ran two rounds of moderated usability tests with 12 participants each, mapping exactly where confidence dropped. From there I built six lo-fi prototypes testing different step-disclosure patterns. The winning pattern showed a persistent 'You're on step 2 of 4' indicator with a one-line preview of the next step.",
    outcome:
      "After launch, signup completion improved 34% in the first quarter. Support tickets related to verification confusion dropped 61%. The pattern was later adopted by three other flows in the app.",
  },
  {
    slug: "gitlab-inline-review",
    title: "GitLab Inline Code Review",
    company: "GitLab",
    year: "2022",
    description:
      "Designed the inline review pattern now used by 30+ million developers. Started as a hack-week prototype, became a flagship feature.",
    thumbnail: "/case-studies/New-lit.png",
    tags: ["Product Design", "Developer Tools", "Interaction Design"],
    overview:
      "GitLab's merge request review flow required users to leave context to add comments — a constant interruption to the reading flow. The 30+ million developers using GitLab each week were losing time to a UI pattern that made review feel harder than it needed to be.",
    problem:
      "The existing comment system anchored to line numbers but didn't let reviewers stay in their reading flow. Every comment required a scroll jump, a form, and a submit — three friction points where one would do.",
    process:
      "I prototyped an inline hover-and-comment pattern during hack week and tested it with six GitLab engineers. Feedback surfaced two problems: accidental triggers on hover, and no clear affordance that comments were possible. I iterated to a click-to-expand model with a persistent gutter icon, then ran a second round of testing before handing off to engineering.",
    outcome:
      "Shipped in GitLab 15.1. Became the primary review interface for the platform. Internal metrics showed a 22% increase in review comment rates on MRs, suggesting reviewers were engaging more deeply with code.",
  },
];
