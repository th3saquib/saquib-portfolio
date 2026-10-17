import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: "https://craftwrk.online",
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://craftwrk.online/assets/resume/Saquib_Ali_Resume.pdf",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
