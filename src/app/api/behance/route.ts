import { NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export const dynamic = "force-dynamic";

let cachedProjects: BehanceProject[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

async function fetchRssXml(url: string): Promise<string> {
  // ponytail: Behance blocks Node HTTP/1.1 fetch with 429 on datacenter IPs;
  // curl negotiates HTTP/2 with real TLS ALPN which Behance accepts.
  try {
    const curlBin = "curl";
    const { stdout } = await execFileAsync(curlBin, [
      "-s",
      "-L",
      "-A",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "-H",
      "Accept: application/xml, text/xml, */*",
      url,
    ], { maxBuffer: 10 * 1024 * 1024 });

    if (stdout && stdout.includes("<rss")) {
      return stdout;
    }
  } catch (err) {
    console.warn("Curl fetch failed, falling back to standard fetch:", err);
  }

  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      Accept: "application/xml, text/xml, */*",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch Behance feed: ${res.status} ${res.statusText}`);
  }

  return res.text();
}

export async function GET() {
  const feedUrl = "https://www.behance.net/feeds/user?username=saquibali1";

  const now = Date.now();
  if (cachedProjects && now - lastFetchTime < CACHE_TTL_MS) {
    return NextResponse.json({ success: true, projects: cachedProjects });
  }

  try {
    const xmlText = await fetchRssXml(feedUrl);
    const projects = parseBehanceRss(xmlText);

    if (projects.length > 0) {
      cachedProjects = projects;
      lastFetchTime = now;
    }

    return NextResponse.json({ success: true, projects });
  } catch (error: unknown) {
    console.error("Behance RSS API route error:", error);
    if (cachedProjects && cachedProjects.length > 0) {
      return NextResponse.json({ success: true, projects: cachedProjects });
    }
    const message = error instanceof Error ? error.message : "Failed to load Behance feed";
    return NextResponse.json(
      { success: false, error: message },
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
