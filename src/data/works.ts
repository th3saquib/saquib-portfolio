export type Work = {
  title: string;
  description: string;
  year: string;
  role: string;
  tags: string[];
  image: string;
  url: string;
  logo: string;
};

export type GraphicDesign = {
  title: string;
  category: string;
  image: string;
};

export const works: Work[] = [
  {
    title: "Aprazer Healthcare",
    description: "A custom pharmaceutical corporate portal and medicine verification registry, optimized for global regulatory standards, core speed performance, and responsive layout.",
    year: "2026",
    role: "Lead Web Developer",
    tags: ["WordPress", "PHP Templates", "LiteSpeed Cache", "MySQL", "Bootstrap"],
    image: "/assets/images/screenshot/aprazer.png",
    url: "https://aprazerhealthcare.com/",
    logo: "/assets/images/brand/aprazer-logo.png",
  },
  {
    title: "Gandhi Medicos",
    description: "An international e-commerce exporter platform for global medicine inquiries, with customized secure checkout, multi-currency support, and optimized search performance.",
    year: "2025",
    role: "WooCommerce Developer",
    tags: ["WooCommerce", "PHP", "MySQL", "jQuery", "Technical SEO"],
    image: "/assets/images/screenshot/gandhimedicos.png",
    url: "https://gandhimedicos.in/",
    logo: "/assets/images/brand/dean-logo.jpeg",
  },
  {
    title: "The Metropole Group",
    description: "A premium hospitality and real estate portal displaying high-end properties, integrated booking inquiries, and smooth scroll transitions.",
    year: "2025",
    role: "Frontend Developer",
    tags: ["HTML5", "CSS3", "JavaScript (ES6)", "WordPress Theme", "GSAP"],
    image: "/assets/images/screenshot/themetropolegroup.png",
    url: "https://themetropolegroup.com/",
    logo: "/assets/images/brand/metropole-logo.png",
  },
  {
    title: "Collx Realty",
    description: "A modern real estate search and broker listing platform utilizing geolocation, dynamic maps, and lightning-fast search indexing.",
    year: "2025",
    role: "Full Stack Engineer",
    tags: ["React.js", "Next.js", "Node.js", "Tailwind CSS", "REST APIs"],
    image: "/assets/images/screenshot/collxrealty.png",
    url: "https://collxrealty.com/",
    logo: "/assets/images/brand/collx-logo.png",
  },
  {
    title: "Karma Foundation",
    description: "A custom NGO trust website supporting donation channels, charity drives, event registration registries, and dynamic custom post types.",
    year: "2025",
    role: "WordPress Developer",
    tags: ["WordPress", "PHP Templates", "Razorpay API", "MySQL", "CSS Grid"],
    image: "/assets/images/screenshot/karmafoundation.png",
    url: "https://karmafoundation.in/",
    logo: "/assets/images/brand/karma-logo.png",
  },
  {
    title: "Vikas Mehta Brand Portal",
    description: "A state-of-the-art interactive branding website featuring heavy animations, typography layouts, and fluid user interaction components.",
    year: "2025",
    role: "Creative Frontend Developer",
    tags: ["Next.js", "React.js", "TypeScript", "GSAP", "Tailwind CSS"],
    image: "/assets/images/screenshot/vikasmehta.png",
    url: "https://vikasmehta.collxdev.cloud/",
    logo: "/assets/images/brand/collx-logo.png",
  },
  {
    title: "Enlightenfy Workshop",
    description: "A high-conversion landing page and interactive registration portal for corporate and personal development training sessions.",
    year: "2025",
    role: "Frontend Developer",
    tags: ["React.js", "CSS3", "JavaScript", "Tailwind CSS", "REST APIs"],
    image: "/assets/images/screenshot/enlightenfy-workshop.png",
    url: "https://enlightenfy.com/workshop",
    logo: "/assets/images/brand/Enlightenfy-logo.png",
  },
  {
    title: "Enlightenfy Akanksha",
    description: "A premium interactive presentation page and personal branding site, utilizing high-quality assets, fluid page transitions, and responsive typography.",
    year: "2025",
    role: "Frontend Developer",
    tags: ["React.js", "CSS3", "JavaScript", "GSAP Animations", "Responsive Design"],
    image: "/assets/images/screenshot/enlightenfy-akanksha.png",
    url: "https://enlightenfy.com/akanksha/",
    logo: "/assets/images/brand/Enlightenfy-logo.png",
  },
];

export const graphicDesigns: GraphicDesign[] = [
  {
    title: "Vibrant Brand Identity Suite",
    category: "Branding",
    image: "/assets/images/design/design-1.jpg",
  },
  {
    title: "Corporate Marketing Banners",
    category: "Social Media Banners",
    image: "/assets/images/design/design-2.jpg",
  },
  {
    title: "Interactive UI Dashboard Concept",
    category: "UI/UX Design",
    image: "/assets/images/design/design-3.jpg",
  },
  {
    title: "Promotional Banner Ads",
    category: "Advertising Ads",
    image: "/assets/images/design/design-4.jpg",
  },
  {
    title: "Minimalist Business Card Sets",
    category: "Print Design",
    image: "/assets/images/design/design-5.jpg",
  },
  {
    title: "Product Package Wrapping",
    category: "Packaging Design",
    image: "/assets/images/design/design-6.jpg",
  },
];
