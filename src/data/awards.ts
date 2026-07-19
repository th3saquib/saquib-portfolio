export type Award = {
  name: string;
  publisher: string;
  year: number;
  image: string;
  url: string;
};

export const awards: Award[] = [
  // 1st: Claude (Anthropic)
  {
    name: "Claude Code in Action",
    publisher: "Anthropic",
    year: 2026,
    image: "/assets/images/cert/cert-claude-code.jpg",
    url: "https://verify.skilljar.com/c/3eny2qtnt7g9",
  },
  {
    name: "Building with the Claude API",
    publisher: "Anthropic",
    year: 2026,
    image: "/assets/images/cert/cert-claude-api.jpg",
    url: "https://verify.skilljar.com/c/uq4hy3wbxtie",
  },
  {
    name: "Certificate of completion: Claude 101",
    publisher: "Anthropic",
    year: 2026,
    image: "/assets/images/cert/cert-claude-101.jpg",
    url: "https://verify.skilljar.com/c/drandfcdawd8",
  },
  // Then: Google
  {
    name: "Google AI Essentials",
    publisher: "Google",
    year: 2025,
    image: "/assets/images/cert/cert-google.jpg",
    url: "https://coursera.org/verify/specialization/B69T90ALB1X2",
  },
  // Then: Meta
  {
    name: "Social Media Management",
    publisher: "Meta",
    year: 2025,
    image: "/assets/images/cert/cert-meta.jpg",
    url: "https://coursera.org/verify/GZJAI8JLBHCC",
  },
  // Then: Adobe
  {
    name: "Graphic Design",
    publisher: "Adobe",
    year: 2025,
    image: "/assets/images/cert/cert-adobe.jpg",
    url: "https://www.coursera.org/account/accomplishments/verify/94USSOM0EK24",
  },
  // Then: Rest (Canva)
  {
    name: "The Field Guide to Human-Centered Design",
    publisher: "Canva",
    year: 2025,
    image: "/assets/images/cert/cert-canva.jpg",
    url: "https://www.canva.com/design-school/certification-award/65bcdabb-fcd6-40f8-ae3b-1ed580e3eb33",
  },
];
