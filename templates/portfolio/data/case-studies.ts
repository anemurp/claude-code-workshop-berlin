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
  metrics: Array<{ value: string; label: string }>;
  fullWidthImage?: string;
  framingHeading: string;
  framingBody: string;
  sections: Section[];
  nextProject?: { slug: string; title: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "tide-checkout",
    title: "Redesigning checkout for a million new business accounts",
    subtitle:
      "How reframing verification as a welcome — not a legal hurdle — improved signup completion by 34%.",
    company: "Tide",
    year: "2024",
    role: "Lead Product Designer",
    timeline: "6 months",
    team: "1 designer · 2 engineers · 1 PM",
    heroImage: "",
    metrics: [
      { value: "34%", label: "Improvement in signup completion" },
      { value: "61%", label: "Drop in verification support tickets" },
      { value: "3×", label: "Other flows adopted the new pattern" },
    ],
    fullWidthImage: "",
    framingHeading:
      "What if verification felt like a welcome, not an interrogation?",
    framingBody:
      "The product team had always treated identity verification as a compliance step to get through. We'd never asked whether users could understand it, trust it, or even find their way back after dropping off. This project started by reframing that assumption.",
    sections: [
      {
        id: "the-problem",
        label: "The Problem",
        heading: "42% of users abandoned at identity verification",
        body: "Tide's signup flow had a 42% drop-off rate at the identity verification step. Exit surveys pointed to three failure modes: users didn't know what documents they'd need, they couldn't tell how much of the form was left, and the interface felt written for lawyers rather than people opening their first business account.",
        image: "",
        layout: "right",
      },
      {
        id: "the-research",
        label: "The Research",
        heading: "Three rounds of testing, twelve participants each",
        body: "I ran moderated usability sessions with 12 participants in each of three rounds, targeting people who had recently opened a business account at any UK bank. The sessions surfaced a consistent pattern: confidence collapsed at the 'step 2 of unknown' moment. Users didn't know what was coming, and that uncertainty felt riskier than whatever they were actually signing up for.",
        image: "",
        layout: "left",
      },
      {
        id: "the-solution",
        label: "The Solution",
        heading: "A persistent step indicator and document checklist above the fold",
        body: "The winning prototype surfaced two things users said they needed before they'd proceed: how many steps remain, and what they'd need to have ready. We added a sticky progress bar that labelled every step and a pre-verification 'document prep' screen that set expectations before any form fields appeared. All form copy was rewritten from compliance language to plain English.",
        image: "",
        layout: "dark",
      },
      {
        id: "what-didnt-make-it",
        label: "What didn't make it and why",
        heading: "Three ideas that tested well but didn't ship",
        body: "A live document scan with instant feedback — users loved it, engineering said six months minimum to build to spec. A save-and-resume flow with a magic link — legal flagged the email interaction as a new consent surface requiring its own approval cycle. A condensed single-page form — it scored highest on initial satisfaction but lowest on actual completion, because removing the step breaks didn't reduce cognitive load, it just hid it.",
        layout: "full",
      },
      {
        id: "three-things",
        label: "Three things I'd carry into the next project",
        heading: "What I'd do differently",
        body: "First: run research sessions before writing a single wireframe. I spent two weeks on concepts that a two-hour session could have eliminated. Second: the legal review loop was painful because I brought design artefacts rather than questions — involving legal as observers during round three research changed the dynamic entirely. Third: the metric that mattered (completion rate) wasn't the one we were tracking (time on page). Aligning the success metric to the actual user goal before the project starts is the highest-leverage design decision I could have made.",
        layout: "full",
      },
    ],
    nextProject: {
      slug: "gitlab-inline-review",
      title: "GitLab Inline Code Review",
    },
  },
  {
    slug: "gitlab-inline-review",
    title: "Inline code review for 30 million developers",
    subtitle:
      "Designing the review pattern that became GitLab's flagship MR feature — starting from a hack-week prototype.",
    company: "GitLab",
    year: "2022",
    role: "Product Designer",
    timeline: "4 months (including hack week)",
    team: "1 designer · 3 engineers · 1 PM",
    heroImage: "",
    metrics: [
      { value: "30M+", label: "Developers using the pattern weekly" },
      { value: "22%", label: "Increase in review comment rate" },
      { value: "1", label: "Hack-week prototype to flagship feature" },
    ],
    fullWidthImage: "",
    framingHeading:
      "What if leaving a code comment felt as fast as thinking it?",
    framingBody:
      "The merge request review flow made commenting on code a three-step interruption: scroll to find the line, open the form, submit. We prototyped a world where the form was already there, inline, one click away from any line of code.",
    sections: [
      {
        id: "the-problem",
        label: "The Problem",
        heading: "Every comment required three context switches",
        body: "GitLab's existing comment system anchored to line numbers but didn't let reviewers stay in their reading flow. Adding a comment required scrolling to a comment form below the diff, filling it in, and submitting — three friction points where one would do. Reviewers were skipping uncertain sections rather than flagging them.",
        image: "",
        layout: "right",
      },
      {
        id: "the-research",
        label: "The Research",
        heading: "Six GitLab engineers in one afternoon",
        body: "I prototyped an inline hover-and-comment pattern during hack week and tested it with six GitLab engineers in a single afternoon session. Two problems surfaced immediately: accidental comment form triggers on hover, and no clear affordance that inline commenting was even possible. Most participants discovered the feature by accident.",
        image: "",
        layout: "left",
      },
      {
        id: "the-solution",
        label: "The Solution",
        heading: "Click-to-expand with a persistent gutter icon",
        body: "I moved from hover-trigger to click-to-expand: a small icon in the line gutter made the feature discoverable without being intrusive. Clicking it expanded a comment form inline, anchored to the exact line. A second round of testing with eight participants showed zero accidental triggers and near-100% feature discovery without prompting.",
        image: "",
        layout: "dark",
      },
      {
        id: "what-didnt-make-it",
        label: "What didn't make it and why",
        heading: "The multi-line selection we couldn't ship in time",
        body: "The original prototype supported selecting multiple lines and leaving a single comment across the range — which reviewers said was the interaction they'd actually been wanting. Engineering scoped it at 3× the work of single-line comments. We shipped single-line first with a plan to follow up, and that follow-up shipped six months later in GitLab 15.7.",
        layout: "full",
      },
      {
        id: "three-things",
        label: "Three things I'd carry into the next project",
        heading: "What I learned",
        body: "First: hack-week constraints are a gift — the time pressure forced a working prototype over a polished mockup, which made the research far more useful. Second: the gutter icon that made the feature discoverable was suggested by an engineer in a Slack thread, not designed by me — keeping a wide net for feedback matters. Third: shipping single-line first and following with multi-line was the right call, but the gap felt longer from the user's side than from ours. Setting a public timeline earlier would have managed expectations better.",
        layout: "full",
      },
    ],
  },
];
