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
  link?: string;
};

export const works: Work[] = [
  {
    title: "Indisky Herbs",
    description: "A premier Ayurvedic healthcare and herbal wellness portal featuring classical botanical remedies, interactive product catalogues, dosage enquiry workflows, and streamlined WhatsApp ordering.",
    year: "2026",
    role: "Full Stack Web Developer",
    tags: ["Vite", "JavaScript (ES6+)", "CSS3 Design System", "Schema.org SEO", "Herbal E-Commerce"],
    image: "/assets/images/screenshot/indiskyherbs.png",
    url: "https://indiskyherbs.com/",
    logo: "/assets/images/brand/indisky-logo.png",
  },
  {
    title: "Gandhi Medicos",
    description: "An international pharmaceutical exporter platform for global medicine inquiries, built as a modern web application with high performance, instant search, and responsive UX.",
    year: "2025",
    role: "Frontend Developer",
    tags: ["Next.js", "React.js", "Tailwind CSS", "React Query", "REST APIs"],
    image: "/assets/images/screenshot/gandhimedicos.png",
    url: "https://gandhimedicos.in/",
    logo: "/assets/images/brand/dean-logo.jpeg",
  },
  {
    title: "Aprazer Healthcare",
    description: "A custom pharmaceutical corporate portal and medicine verification registry, optimized for global regulatory standards, core speed performance, and responsive layout.",
    year: "2026",
    role: "Lead Web Developer",
    tags: ["WordPress", "PHP Templates", "WooCommerce", "WPBakery", "LiteSpeed Cache"],
    image: "/assets/images/screenshot/aprazer.png",
    url: "https://aprazerhealthcare.com/",
    logo: "/assets/images/brand/aprazer-logo.png",
  },
  {
    title: "Woodcell Interiors",
    description: "An enterprise commercial furniture manufacturer platform featuring bespoke modular workstations, interactive product catalogues, BIFMA-compliant architectural specs, and rapid inquiry routing.",
    year: "2026",
    role: "Full Stack Web Developer",
    tags: ["Next.js", "React.js", "Tailwind CSS", "TypeScript", "B2B E-Commerce"],
    image: "/assets/images/screenshot/woodcellinteriors.png",
    url: "https://woodcellinteriors.com/",
    logo: "/assets/images/brand/woodcell-logo.png",
  },
  {
    title: "The Metropole Group",
    description: "A premium hospitality and real estate portal displaying high-end properties, integrated booking inquiries, and smooth transitions.",
    year: "2025",
    role: "WordPress Developer",
    tags: ["WordPress", "PHP", "WPBakery", "Bootstrap", "Slider Revolution"],
    image: "/assets/images/screenshot/themetropolegroup.png",
    url: "https://themetropolegroup.com/",
    logo: "/assets/images/brand/metropole-logo.png",
  },
  {
    title: "Collx Realty",
    description: "A modern real estate search and broker listing platform utilizing Property Hive dynamic property indexing, custom Elementor styling, and interactive GSAP animations.",
    year: "2025",
    role: "WordPress & Frontend Developer",
    tags: ["WordPress", "Elementor", "Property Hive", "GSAP Animations", "Bootstrap"],
    image: "/assets/images/screenshot/collxrealty.png",
    url: "https://collxrealty.com/",
    logo: "/assets/images/brand/collx-logo.png",
  },
  {
    title: "Karma Foundation",
    description: "A modern NGO trust platform supporting donation channels, community charity drives, event registration, and social welfare initiatives.",
    year: "2025",
    role: "Full Stack Engineer",
    tags: ["React.js", "Vite", "Tailwind CSS", "Express.js", "Node.js"],
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
    role: "WordPress Developer",
    tags: ["WordPress", "Elementor", "Slider Revolution", "PHP", "Contact Form 7"],
    image: "/assets/images/screenshot/enlightenfy-workshop.png",
    url: "https://enlightenfy.com/workshop",
    logo: "/assets/images/brand/Enlightenfy-logo.png",
  },
  {
    title: "Enlightenfy Akanksha",
    description: "A premium interactive presentation page and personal branding site, utilizing high-quality assets, fluid page transitions, and responsive typography.",
    year: "2025",
    role: "WordPress Developer",
    tags: ["WordPress", "Bold Page Builder", "Cost Calculator", "PHP", "Slick Slider"],
    image: "/assets/images/screenshot/enlightenfy-akanksha.png",
    url: "https://enlightenfy.com/akanksha/",
    logo: "/assets/images/brand/Enlightenfy-logo.png",
  },
];

export const graphicDesigns: GraphicDesign[] = [
  {
    title: "Real Estate Stories",
    category: "Social Media & Ads",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/a3ea6e230450479.6877300151ae3.png",
    link: "https://www.behance.net/gallery/230450479/Real-Estate-Stories",
  },
  {
    title: "Seemless Carousel Post",
    category: "Social Carousel",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/a7de2c228284525.Y3JvcCwxNzI1LDEzNTAsMCww.jpg",
    link: "https://www.behance.net/gallery/228284525/Seemless-Carousel-Post",
  },
  {
    title: "Elite Company Ads",
    category: "Social Media & Ads",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/08fb1f228284107.Y3JvcCwxNzU1LDEzNzIsMCw1Mg.jpg",
    link: "https://www.behance.net/gallery/228284107/Elite-Company-Ads",
  },
  {
    title: "Real Estate Ads",
    category: "Social Media & Ads",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/d32425228283891.Y3JvcCwxMzUwLDEwNTUsMCwzNTQ.jpg",
    link: "https://www.behance.net/gallery/228283891/Real-Estate-Ads",
  },
  {
    title: "Social Media Design",
    category: "Social Media & Ads",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/8741a3228282541.Y3JvcCwxNDAwLDEwOTUsMCwyMTg.jpg",
    link: "https://www.behance.net/gallery/228282541/Social-Media-Design",
  },
  {
    title: "Real Estate Ads",
    category: "Social Media & Ads",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/be007c228282319.Y3JvcCwxMzUwLDEwNTUsMCww.jpg",
    link: "https://www.behance.net/gallery/228282319/Real-Estate-Ads",
  },
  {
    title: "Luxury Lifestyle",
    category: "Social Media & Ads",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/e51b1d228281987.Y3JvcCwxMzUwLDEwNTUsMCwyOTA.jpg",
    link: "https://www.behance.net/gallery/228281987/Luxury-Lifestyle",
  },
  {
    title: "Swiggy Digital Banner",
    category: "Social Media & Ads",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/d6424a201119003.Y3JvcCwxNTM0LDEyMDAsMTkzLDA.jpg",
    link: "https://www.behance.net/gallery/201119003/Swiggy-Digital-Banner",
  },
  {
    title: "Real Estate Brochure",
    category: "Print & Flyer",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/5c377a200498061.Y3JvcCwyNDc5LDE5MzksMCwyNDU.jpg",
    link: "https://www.behance.net/gallery/200498061/Real-Estate-Brochure",
  },
  {
    title: "Flyer Design",
    category: "Print & Flyer",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/5f9b86200250639.Y3JvcCwyNTUxLDE5OTUsMCw3ODk.jpg",
    link: "https://www.behance.net/gallery/200250639/Flyer-Design",
  },
  {
    title: "Concept Logo",
    category: "Branding & Logo",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/a173ea198186185.Y3JvcCwyNzEwLDIxMjAsMCww.jpg",
    link: "https://www.behance.net/gallery/198186185/Concept-Logo",
  },
];
