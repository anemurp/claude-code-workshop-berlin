// ────────────────────────────────────────────────────────────────
// CASE STUDY DATA
// Each entry becomes a page at /case-studies/[slug].
//
// layout options:
//   'right' — text left, phone mockup right
//   'left'  — phone mockup left, text right
//   'full'  — full-width text block, optional browser mockup below
//   'dark'  — full-width dark panel with light text
//
// Set image to a path in /public (e.g. "/cs/tide-step2.png") or
// leave as "" to show a labelled placeholder.
// ────────────────────────────────────────────────────────────────

export type Section = {
  id: string;
  label: string;
  heading: string;
  body: string;
  image?: string;
  layout: "left" | "right" | "full" | "dark";
};

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  company: string;
  year: string;
  role: string;
  timeline: string;
  team: string;
  heroImage: string;
  heroBackground: string;
  metrics: Array<{ value: string; label: string }>;
  fullWidthImage?: string;
  framingHeading: string;
  framingBody: string;
  sections: Section[];
  nextProject?: { slug: string; title: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "sra-reading-labs",
    title: "From physical to digital: gamifying independent learning",
    subtitle:
      "SRA Reading Labs had delivered reading for 60 years as a physical product. I redesigned it for independent student learning — a research-grounded motivation system that increased engagement by 68%.",
    company: "McGraw Hill",
    year: "2024",
    role: "Senior UX Designer",
    timeline: "14 months",
    team: "1 designer · 4 engineers · 2 PMs · 7 stakeholder groups",
    heroImage: "/case-studies/Reading%20Labs%20Thumbnail%20%281%29.png",
    heroBackground: "#D4256B",
    metrics: [
      { value: "1.5M+", label: "Students impacted across 22 levels" },
      { value: "68%", label: "Increase in student engagement" },
      { value: "16", label: "Prototypes tested across K–8" },
    ],
    fullWidthImage: "",
    framingHeading:
      "What does motivation look like when the teacher isn't in the room?",
    framingBody:
      "SRA Reading Labs had worked for 60 years because teachers orchestrated the experience — handing out cards, tracking progress, celebrating wins. Moving to a digital product meant that scaffolding disappeared overnight. Students were left with a task, no context, and no reason to care. This project started by asking what intrinsic motivation actually looks like for a 9-year-old.",
    sections: [
      {
        id: "the-problem",
        label: "The Problem",
        heading: "A 60-year-old product built around teacher motivation",
        body: "The original Reading Labs system relied on teachers to assign work, track progress, and provide encouragement. The digital version inherited that structure wholesale — students logged in, got assigned a passage, and submitted answers with no feedback beyond a score. Engagement data showed most students completed one or two sessions and stopped. The product wasn't failing technically; it was failing motivationally.",
        image: "",
        layout: "right",
      },
      {
        id: "the-research",
        label: "The Research",
        heading: "Seven stakeholder groups, twelve schools, one insight",
        body: "I ran research across 7 stakeholder groups: students (grades 2–8), classroom teachers, curriculum directors, parents, reading specialists, school admins, and the content team. Across 40+ sessions one theme emerged: students who persisted shared a specific experience — they could see where they were going. Progress wasn't just a score; it was a visible path with a clear next step. Students without that visibility gave up faster, regardless of reading level.",
        image: "",
        layout: "left",
      },
      {
        id: "the-solution",
        label: "The Solution",
        heading: "A motivation system grounded in self-determination theory",
        body: "I designed a three-layer motivation system: a visible reading path showing 22 levelled stages, a personal record log so students could see their own growth over time, and a light gamification layer (reading streaks, level-up moments) that rewarded consistency rather than just correctness. I tested 16 prototypes across 8 classrooms, iterating on the balance between challenge and progress visibility. The final system increased session completion by 68% and average reading time per session by 4.2 minutes.",
        image: "",
        layout: "dark",
      },
      {
        id: "what-didnt-make-it",
        label: "What didn't make it and why",
        heading: "The social features we chose not to build",
        body: "Early prototypes included peer comparison features — leaderboards, shared achievements, class challenges. They tested well with competitive students and poorly with everyone else. Students who were already behind found them demoralising; teachers worried about the classroom dynamics. We replaced them with personal-record comparisons: you versus your past self, not you versus the class. It was a harder design problem and a more defensible product decision.",
        layout: "full",
      },
      {
        id: "three-things",
        label: "Three things I'd carry into the next project",
        heading: "What I'd do differently",
        body: "First: involve the content team from the beginning. The reading passages themselves were a design surface I initially treated as fixed — involving the content team earlier opened up interventions I hadn't considered. Second: the 22-level structure was inherited from the physical product. Questioning it in week two instead of week ten would have saved a full sprint. Third: testing with struggling readers specifically, not just average-level students, revealed failure modes that never appeared in mainstream testing. Building that into the research protocol from the start would have surfaced the most important insights earlier.",
        layout: "full",
      },
    ],
    nextProject: {
      slug: "new-lit",
      title: "Annotate, listen, respond, unlock: designing reading that moves students forward",
    },
  },
  {
    slug: "new-lit",
    title: "Annotate, listen, respond, unlock: designing reading that moves students forward",
    subtitle: "Placeholder — update with real New Lit case study description.",
    company: "New Lit",
    year: "2023",
    role: "Senior UX Designer",
    timeline: "TBD",
    team: "TBD",
    heroImage: "/case-studies/New%20Lit%20Thumbnail.png",
    heroBackground: "#4B6BF5",
    metrics: [
      { value: "TBD", label: "Metric 1" },
      { value: "TBD", label: "Metric 2" },
      { value: "TBD", label: "Metric 3" },
    ],
    fullWidthImage: "",
    framingHeading: "Placeholder heading",
    framingBody: "Placeholder framing body — update with real content.",
    sections: [],
    nextProject: {
      slug: "teacher-reports",
      title: "Giving teachers a window into every moment of learning",
    },
  },
  {
    slug: "teacher-reports",
    title: "Giving teachers a window into every moment of learning",
    subtitle: "Placeholder — update with real Teacher Reports case study description.",
    company: "McGraw Hill",
    year: "2023",
    role: "Senior UX Designer",
    timeline: "TBD",
    team: "TBD",
    heroImage: "",
    heroBackground: "#16A34A",
    metrics: [
      { value: "0 → 1", label: "Discovery to dev handoff in one month" },
      { value: "100%", label: "WCAG AA accessible" },
      { value: "6", label: "Student statuses designed" },
    ],
    fullWidthImage: "",
    framingHeading: "Placeholder heading",
    framingBody: "Placeholder framing body — update with real content.",
    sections: [],
    nextProject: {
      slug: "sra-reading-labs",
      title: "From physical to digital: gamifying independent learning",
    },
  },
];
