export type TechItem = {
  name: string;
  duty: string;
  image: { light: string; dark?: string; width: number; height: number };
  progress: number;
};

export const techStack: TechItem[] = [
  {
    name: "WordPress & PHP",
    duty: "Theme & Custom Template Dev",
    image: { light: "/assets/images/section/tech-wp.svg", width: 28, height: 28 },
    progress: 95,
  },
  {
    name: "JavaScript & React",
    duty: "Modern Frontend Web Apps",
    image: { light: "/assets/images/section/tech-js.svg", width: 28, height: 28 },
    progress: 80,
  },
  {
    name: "N8N & AI Automation",
    duty: "Workflows, Claude API & Chatbots",
    image: { light: "/assets/images/section/tech-n8n.svg", width: 28, height: 28 },
    progress: 85,
  },
  {
    name: "Figma & UI/UX Design",
    duty: "Wireframing & Visual Systems",
    image: { light: "/assets/images/section/tech-figma.svg", width: 28, height: 28 },
    progress: 85,
  },
  {
    name: "Linux & Cloud Hosting",
    duty: "Servers, CloudPanel, Security",
    image: { light: "/assets/images/section/tech-linux.svg", width: 28, height: 28 },
    progress: 80,
  },
];

