export type TimelineItem = {
  period: string;
  role: string;
  description: string;
  icon: { light: string; dark?: string; width: number; height: number };
};

export const educationItems: TimelineItem[] = [
  {
    period: "Apr 2026 – Present",
    role: "Web Developer at Aprazer Healthcare",
    description:
      "Sole developer for Aprazer and group companies, including Gandhi Medicos. Own digital platforms end to end: WordPress portals with custom themes, Next.js e-commerce with Payload CMS, React Native mobile app, and Frappe / ERPNext CRM integration. Python automation with ReportLab.",
    icon: { light: "/assets/images/brand/aprazer-logo-black.png", dark: "/assets/images/brand/aprazer-logo.png", width: 120, height: 32 },
  },
  {
    period: "Jun 2024 – Mar 2026",
    role: "Senior Visual Designer & Marketing Manager at Metropole Group",
    description:
      "Concurrently Marketing Manager at Collx Realty (Sep 2024 – Mar 2026). Developed WordPress portals with GSAP scroll animations, property search platform with Strapi CMS and REST APIs. Built WhatsApp Cloud API / Botpress chatbot flows and N8N workflows connected to Claude API.",
    icon: { light: "/assets/images/brand/metropole-logo-black.png", dark: "/assets/images/brand/metropole-logo.png", width: 120, height: 32 },
  },
  {
    period: "Nov 2022 – Jun 2024",
    role: "Graphic Designer & UI/UX Specialist at Dean Infotech",
    description:
      "Revamped corporate website UI/UX and built unified design guidelines. Designed wireframes and component-based UI patterns for international B2B client websites; created marketing graphics with Adobe Creative Suite.",
    icon: { light: "/assets/images/brand/dean-logo-black.png", dark: "/assets/images/brand/dean-logo.jpeg", width: 120, height: 32 },
  },
  {
    period: "Jan 2022 – Nov 2022",
    role: "Freelance Designer & Digital Marketer at Craftwrk",
    description:
      "Self-employed studio (craftwrk.online) serving international clients across 4 countries including UAE and Russia. Developed brand identities, built landing pages, ran paid ad campaigns on Meta/Google/LinkedIn, and delivered UI/UX prototypes.",
    icon: { light: "/assets/images/logo/logo-3.svg", dark: "/assets/images/logo/logo-4.svg", width: 32, height: 32 },
  },
  {
    period: "Jan 2021 – Dec 2021",
    role: "Junior Graphic Designer at Anons Media",
    description:
      "Produced digital marketing graphics, brand logos, and media layouts using Adobe Creative Suite for a Russian media production house across multiple client campaigns.",
    icon: { light: "/assets/images/logo/logo-3.svg", dark: "/assets/images/logo/logo-4.svg", width: 32, height: 32 },
  },
  {
    period: "2017 – 2021",
    role: "B.Tech in Computer & Information Sciences",
    description:
      "Adyghe State University, Maykop, Russia • 4-year undergraduate degree. Completed Preparatory Year in Russian Language and Literature (2016 – 2017).",
    icon: { light: "/assets/images/logo/logo-3.svg", dark: "/assets/images/logo/logo-4.svg", width: 32, height: 32 },
  },
];
