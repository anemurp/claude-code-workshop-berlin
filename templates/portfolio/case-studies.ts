export type CaseStudy = {
  slug: string;
  title: string;
  company: string;
  date: string;
  description: string;
  mockupImage: string;
  cardBackground: string;
  tags: string[];
  metrics: Array<{ value: string; label: string }>;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "sra-reading-labs",
    title: "Redesigning reading for 1.5M+ students across 22 levels",
    company: "McGraw Hill",
    date: "2024",
    cardBackground: "#D4256B",
    mockupImage: "/case-studies/Reading%20Labs%20Thumbnail%20%281%29.png",
    tags: ["EdTech", "Gamification", "User Research", "K-8"],
    description:
      "SRA Reading Labs had delivered reading for 60 years as a physical product built around teacher motivation. I redesigned it for independent student learning — 16 prototypes, 7 stakeholder groups, and a research-grounded motivation system that increased engagement by 68%.",
    metrics: [
      { value: "1.5M+", label: "Students impacted" },
      { value: "68%",   label: "Engagement increase" },
      { value: "16",    label: "Prototypes tested" },
    ],
  },
  {
    slug: "new-lit",
    title: "Building a reading platform for the next generation of learners",
    company: "New Lit",
    date: "2023",
    cardBackground: "#4B6BF5",
    mockupImage: "/case-studies/New%20Lit%20Thumbnail.png",
    tags: ["EdTech", "Product Design", "User Research"],
    description:
      "Placeholder — update with real New Lit case study description.",
    metrics: [
      { value: "TBD", label: "Metric 1" },
      { value: "TBD", label: "Metric 2" },
      { value: "TBD", label: "Metric 3" },
    ],
  },
  {
    slug: "teacher-reports",
    title: "Redesigning teacher reports for clarity and actionability",
    company: "McGraw Hill",
    date: "2023",
    cardBackground: "#16A34A",
    mockupImage: "",
    tags: ["EdTech", "Data Visualization", "User Research"],
    description:
      "Placeholder — update with real Teacher Reports case study description.",
    metrics: [
      { value: "TBD", label: "Metric 1" },
      { value: "TBD", label: "Metric 2" },
      { value: "TBD", label: "Metric 3" },
    ],
  },
];
