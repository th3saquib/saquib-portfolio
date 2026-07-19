export type TimelineItem = {
  period: string;
  role: string;
  description: string;
  icon: { light: string; dark?: string; width: number; height: number };
};

export const educationItems: TimelineItem[] = [
  {
    period: "Apr 2026 - Present",
    role: "Web Developer at Aprazer Healthcare",
    description:
      "Building custom WordPress themes and PHP template parts from Figma specifications. Developing specialized portals, managing database queries, and automating documentation with Python and ReportLab.",
    icon: { light: "/assets/images/brand/aprazer-logo-black.png", dark: "/assets/images/brand/aprazer-logo.png", width: 120, height: 32 },
  },
  {
    period: "Jun 2024 - May 2026",
    role: "Senior Visual Designer & Marketing Manager at Metropole Group",
    description:
      "Managed WordPress servers (Linux/CloudPanel), built N8N automation workflows with Claude API, deployed Botpress chatbots, and directed brand strategy for Collx Realty.",
    icon: { light: "/assets/images/brand/metropole-logo-black.png", dark: "/assets/images/brand/metropole-logo.png", width: 120, height: 32 },
  },
  {
    period: "Nov 2022 - Jun 2024",
    role: "Graphic Designer & UI/UX Specialist at Dean Infotech",
    description:
      "Revamped corporate website UI/UX, built unified design guidelines, and designed responsive wireframes and B2B client layouts.",
    icon: { light: "/assets/images/brand/dean-logo-black.png", dark: "/assets/images/brand/dean-logo.jpeg", width: 120, height: 32 },
  },
  {
    period: "Jan 2022 - Nov 2022",
    role: "Freelance Graphic Designer",
    description:
      "Designed UI/UX prototypes, social media assets, and video edits for international clients across multiple time zones.",
    icon: { light: "/assets/images/logo/logo-3.svg", dark: "/assets/images/logo/logo-4.svg", width: 32, height: 32 },
  },
  {
    period: "Jan 2021 - Dec 2021",
    role: "Junior Graphic Designer at Anons Media",
    description:
      "Produced digital marketing graphics, brand logos, and media layouts using Adobe Creative Suite for a production house in Russia.",
    icon: { light: "/assets/images/logo/logo-3.svg", dark: "/assets/images/logo/logo-4.svg", width: 32, height: 32 },
  },
  {
    period: "Education",
    role: "Adyghe State University",
    description:
      "Bachelor of Technology in Computer Science.\nRussian Language: Associate of Arts in Russian Language and Literature.",
    icon: { light: "/assets/images/logo/logo-3.svg", dark: "/assets/images/logo/logo-4.svg", width: 32, height: 32 },
  },
];

