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
    title: "From physical to digital: gamifying independent learning",
    company: "SRA Reading Labs",
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
    title: "Annotate, listen, respond, unlock: designing reading that moves students forward",
    company: "Summit! & Soar!",
    date: "2023",
    cardBackground: "#4B6BF5",
    mockupImage: "/case-studies/New%20Lit%20Thumbnail.png",
    tags: ["EdTech", "Product Design", "User Research"],
    description:
      "Placeholder — update with real Summit! & Soar! case study description.",
    metrics: [
      { value: "100%", label: "Validation in user testing" },
      { value: "7", label: "Stakeholder groups aligned" },
      { value: "10", label: "Interactive layered features" },
    ],
  },
  {
    slug: "teacher-reports",
    title: "Giving teachers a window into every moment of learning",
    company: "McGraw Hill",
    date: "2023",
    cardBackground: "#16A34A",
    mockupImage: "",
    tags: ["EdTech", "Data Visualization", "User Research"],
    description:
      "Placeholder — update with real Teacher Reports case study description.",
    metrics: [
      { value: "0→1", label: "Discovery to dev handoff in one month" },
      { value: "100%",  label: "WCAG AA accessible" },
      { value: "6",     label: "Student statuses designed" },
    ],
  },
];
