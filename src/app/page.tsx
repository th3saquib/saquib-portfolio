import { HomeShell } from "@/components/HomeShell";
import { profile } from "@/data/profile";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": "https://craftwrk.online/#profilepage",
        "url": "https://craftwrk.online",
        "mainEntity": {
          "@id": "https://craftwrk.online/#person"
        }
      },
      {
        "@type": "Person",
        "@id": "https://craftwrk.online/#person",
        "name": profile.fullName,
        "jobTitle": profile.duty,
        "description": profile.introBio,
        "image": "https://craftwrk.online/assets/images/logo/favicon.svg",
        "url": "https://craftwrk.online",
        "sameAs": profile.socials.map((s) => s.href),
        "knowsAbout": [
          "Web Development",
          "ERPNext & Frappe Development",
          "Automation Engineering",
          "WordPress Theme Development",
          "React",
          "Next.js",
          "PHP",
          "n8n Workflow Automation",
          "Claude API",
          "API Integration"
        ],
        "worksFor": {
          "@type": "Organization",
          "name": "Freelance"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeShell variant="v1" defaultMode="dark" bodyClass="counter-scroll" />
    </>
  );
}
