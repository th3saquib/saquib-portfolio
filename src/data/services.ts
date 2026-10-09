export type Service = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  images: string[];
  expanded: boolean,
};

export const services: Service[] = [
  {
    id: "service-1",
    title: "WordPress & PHP Development",
    description:
      "Building high-performance custom WordPress themes and PHP templates directly from Figma designs. Setting up distributor portals, custom database schemas, multilingual routing, and performance tuning.",
    tags: ["Custom Themes", "PHP Templates", "MySQL Integration", "LiteSpeed Cache"],
    images: ["/assets/images/section/service-1.jpg", "/assets/images/section/service-2.jpg"],
    expanded: true,
  },
  {
    id: "service-2",
    title: "Frappe & ERPNext Customization",
    description:
      "Developing and customizing ERPNext and Frappe applications. Building custom DocTypes, Server Scripts, Client Scripts, automated business workflows, custom print formats, and REST API integrations.",
    tags: ["Custom DocTypes", "Frappe Framework", "Python & JS Scripts", "ERP Workflows"],
    images: ["/assets/images/section/service-3.jpg", "/assets/images/section/service-5.jpg"],
    expanded: false,
  },
  {
    id: "service-3",
    title: "Web & UI/UX Development",
    description:
      "Translating complex wireframes and UI designs into pixel-accurate, responsive front-end pages. Proficient in HTML5, CSS3, ES6+ JavaScript, React.js, and implementing design systems.",
    tags: ["Figma to Code", "React Frontends", "Responsive Layouts", "Core Web Vitals"],
    images: ["/assets/images/section/service-3.jpg", "/assets/images/section/service-4.jpg"],
    expanded: false,
  },
  {
    id: "service-4",
    title: "AI & Workflow Automation",
    description:
      "Creating custom automated workflows with N8N, Claude API, Botpress, and WhatsApp Cloud API to speed up lead routing, automate client documentation, and generate marketing assets.",
    tags: ["N8N Workflows", "Claude API Agents", "Botpress Chatbots", "Python Automation"],
    images: ["/assets/images/section/service-5.jpg", "/assets/images/section/service-6.jpg"],
    expanded: false,
  },
];

