export type Testimonial = {
  text: string;
  authorName: string;
  authorRole: string;
  image: string;
};

export const testimonials: Testimonial[] = [
  {
    text: "Working with Saquib was seamless. The custom WordPress website came out fast, secure, and easily handles our high traffic export requirements.",
    authorName: "Daniel Ruiz",
    authorRole: "Director of Product, PharmaLogics",
    image: "/assets/images/section/tes-1.jpg",
  },
  {
    text: "Saquib translated our Figma designs into pixel-perfect pages. The chatbot flows and lead triage automations he built saved our sales team hours of daily triage.",
    authorName: "Sophia Lee",
    authorRole: "Marketing Director, Collx Realty",
    image: "/assets/images/section/tes-2.jpg",
  },
  {
    text: "Despite a tight release timeline, Saquib delivered our registration portal on schedule. The LiteSpeed caching and server setup kept our Core Web Vitals healthy.",
    authorName: "Michael Anders",
    authorRole: "IT Manager, Aprazer Export",
    image: "/assets/images/section/tes-3.jpg",
  },
];

