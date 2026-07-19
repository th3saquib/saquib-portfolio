import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const feedUrl = "https://www.behance.net/feeds/user?username=saquibali1";

  try {
    const res = await fetch(feedUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/xml, text/xml, */*",
      },
      next: { revalidate: 3600 }, // Cache feed for 1 hour
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch Behance feed: ${res.status} ${res.statusText}`);
    }

    const xmlText = await res.text();
    const projects = parseBehanceRss(xmlText);

    return NextResponse.json({ success: true, projects });
  } catch (error: any) {
    console.error("Behance RSS API route error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load Behance feed" },
      { status: 500 }
    );
  }
}

interface BehanceProject {
  id: string;
  title: string;
  link: string;
  publishedDate: string;
  thumbnail: string;
  image: string;
  category: string;
}

function parseBehanceRss(xmlText: string): BehanceProject[] {
  const items: BehanceProject[] = [];
  
  // Extract item tags
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;

  while ((match = itemRegex.exec(xmlText)) !== null) {
    const itemContent = match[1];

    // Helper functions to extract tags (handling CDATA and standard text)
    const extractTagContent = (tag: string): string => {
      const regex = new RegExp(`<${tag}>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([\\s\\S]*?))</${tag}>`, "i");
      const tagMatch = regex.exec(itemContent);
      if (tagMatch) {
        return (tagMatch[1] || tagMatch[2] || "").trim();
      }
      return "";
    };

    const title = extractTagContent("title");
    const link = extractTagContent("link");
    const pubDate = extractTagContent("pubDate");
    const description = extractTagContent("description");

    // Extract img src from description
    const imgRegex = /<img[^>]+src=['"]([^'"]+)['"]/i;
    const imgMatch = imgRegex.exec(description);
    const thumbnail = imgMatch ? imgMatch[1] : "";

    // Resolve high-resolution image URL from thumbnail
    // E.g., https://mir-s3-cdn-cf.behance.net/projects/404/a3ea6e230450479.6877300151ae3.png
    // to https://mir-s3-cdn-cf.behance.net/projects/original/a3ea6e230450479.6877300151ae3.png
    let image = thumbnail;
    if (thumbnail.includes("/projects/404/")) {
      image = thumbnail.replace("/projects/404/", "/projects/original/");
    }

    // Extract project ID from link
    // E.g., https://www.behance.net/gallery/230450479/Real-Estate-Stories
    const idRegex = /\/gallery\/(\d+)/;
    const idMatch = idRegex.exec(link);
    const id = idMatch ? idMatch[1] : Math.random().toString(36).substring(2, 9);

    // Try to guess a clean category based on the title or fallback
    let category = "Graphic Design";
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("logo") || lowerTitle.includes("brand") || lowerTitle.includes("identity")) {
      category = "Branding & Logo";
    } else if (lowerTitle.includes("ads") || lowerTitle.includes("advertising") || lowerTitle.includes("banner") || lowerTitle.includes("poster")) {
      category = "Social Media & Ads";
    } else if (lowerTitle.includes("brochure") || lowerTitle.includes("flyer") || lowerTitle.includes("print")) {
      category = "Print & Flyer";
    } else if (lowerTitle.includes("ui") || lowerTitle.includes("ux") || lowerTitle.includes("dashboard") || lowerTitle.includes("app")) {
      category = "UI/UX Design";
    } else if (lowerTitle.includes("carousel")) {
      category = "Social Carousel";
    }

    if (title && link) {
      items.push({
        id,
        title,
        link,
        publishedDate: pubDate,
        thumbnail,
        image,
        category,
      });
    }
  }

  return items;
}
