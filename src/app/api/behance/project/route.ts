import { NextRequest, NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export const dynamic = "force-dynamic";

// In-memory cache for project gallery images (24 hours)
const projectCache = new Map<string, { images: string[]; timestamp: number }>();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

// Preferred image sizes from highest quality to lowest
const SIZE_PREFERENCE = [
  "1400",
  "1400_opt_1",
  "max_1200",
  "hd",
  "source",
  "disp",
  "fs",
  "max_1200_webp",
  "hd_webp",
  "disp_webp",
];

async function fetchPageWithCurl(url: string, cookie?: string): Promise<string> {
  // ponytail: Behance blocks HTTP/1.1 from cloud VPS with 429; curl HTTP/2 succeeds.
  const curlBin = "curl";
  const args = [
    "-s",
    "-L",
    "-A",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "-H",
    "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "-H",
    "Accept-Language: en-US,en;q=0.9",
  ];
  if (cookie) {
    args.push("-b", cookie);
  }
  args.push(url);

  const { stdout } = await execFileAsync(curlBin, args, { maxBuffer: 10 * 1024 * 1024 });
  return stdout;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const projectUrl = searchParams.get("url");

  if (!projectUrl) {
    return NextResponse.json(
      { success: false, error: "Missing 'url' query parameter" },
      { status: 400 }
    );
  }

  // Validate the URL slightly to make sure it's a Behance gallery page
  if (!projectUrl.includes("behance.net/gallery/")) {
    return NextResponse.json(
      { success: false, error: "Invalid Behance gallery URL" },
      { status: 400 }
    );
  }

  if (projectCache.has(projectUrl)) {
    const cached = projectCache.get(projectUrl)!;
    if (Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return NextResponse.json({ success: true, images: cached.images });
    }
  }

  const userAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

  try {
    let html = "";
    try {
      html = await fetchPageWithCurl(projectUrl);
      if (html.includes("js_challenge_value")) {
        const cookieMatch = /js_challenge_value=([^;"]+)/.exec(html);
        if (cookieMatch) {
          html = await fetchPageWithCurl(projectUrl, `js_challenge_value=${cookieMatch[1]}`);
        }
      }
    } catch (curlErr) {
      console.warn("Curl failed for project detail, trying fetch fallback:", curlErr);
      let res = await fetch(projectUrl, {
        headers: {
          "User-Agent": userAgent,
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        },
      });
      html = await res.text();
      if (res.status === 403 && html.includes("js_challenge_value")) {
        const cookieMatch = /js_challenge_value=([^;]+)/.exec(html);
        if (cookieMatch) {
          res = await fetch(projectUrl, {
            headers: {
              "User-Agent": userAgent,
              Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
              Cookie: `js_challenge_value=${cookieMatch[1]}`,
            },
          });
          html = await res.text();
        }
      }
    }

    let images: string[] = [];

    // 3. Attempt parsing the window state modules JSON
    const modulesStartIdx = html.indexOf('"modules":[');
    if (modulesStartIdx !== -1) {
      try {
        let bracketCount = 1;
        let endIdx = modulesStartIdx + 11; // Length of '"modules":['
        
        while (bracketCount > 0 && endIdx < html.length) {
          if (html[endIdx] === "[") bracketCount++;
          else if (html[endIdx] === "]") bracketCount--;
          endIdx++;
        }
        
        const modulesString = html.substring(modulesStartIdx + 10, endIdx);
        const modules = JSON.parse(modulesString);
        
        if (Array.isArray(modules)) {
          // Extract URLs from ImageModule type modules
          for (const module of modules) {
            if (module.__typename === "ImageModule" || module.src) {
              let imgUrl = module.src;
              
              // If there are sizes, pick the best one
              if (module.imageSizes && typeof module.imageSizes === "object") {
                const available = module.imageSizes.allAvailable || [];
                if (Array.isArray(available) && available.length > 0) {
                  // Find the best quality JPG or fallback to any format sorted by preferred size
                  const sorted = available
                    .filter((item: any) => item && item.url)
                    .sort((a: any, b: any) => {
                      const sizeA = a.url.split("/").slice(-2, -1)[0];
                      const sizeB = b.url.split("/").slice(-2, -1)[0];
                      
                      const indexA = SIZE_PREFERENCE.indexOf(sizeA);
                      const indexB = SIZE_PREFERENCE.indexOf(sizeB);
                      
                      const rankA = indexA === -1 ? 999 : indexA;
                      const rankB = indexB === -1 ? 999 : indexB;
                      
                      return rankA - rankB;
                    });
                  
                  if (sorted[0]) {
                    imgUrl = sorted[0].url;
                  }
                } else {
                  // If allAvailable is not present, check individual properties
                  for (const prefSize of SIZE_PREFERENCE) {
                    const key = `size_${prefSize}`;
                    if (module.imageSizes[key] && module.imageSizes[key].url) {
                      imgUrl = module.imageSizes[key].url;
                      break;
                    }
                  }
                }
              }
              
              if (imgUrl) {
                images.push(imgUrl);
              }
            }
          }
        }
      } catch (parseError) {
        console.error("Behance JSON parsing error, falling back to regex:", parseError);
      }
    }

    // 4. Fallback: Parse using regex if JSON parse didn't find any images
    if (images.length === 0) {
      const imgRegex = /https:\/\/mir-s3-cdn-cf\.behance\.net\/project_modules\/[^\/]+\/[a-zA-Z0-9_\-\.]+/g;
      const matches = html.match(imgRegex);
      
      if (matches) {
        const uniqueMatches = Array.from(new Set(matches));
        
        // Group matches by the image base filename
        const groupedByFilename = new Map<string, string[]>();
        for (const matchUrl of uniqueMatches) {
          const parts = matchUrl.split("/");
          const filename = parts[parts.length - 1];
          if (filename) {
            const list = groupedByFilename.get(filename) || [];
            list.push(matchUrl);
            groupedByFilename.set(filename, list);
          }
        }
        
        // For each group, select the best URL according to quality preference
        for (const [filename, urls] of groupedByFilename.entries()) {
          const sorted = urls.sort((a, b) => {
            const sizeA = a.split("/").slice(-2, -1)[0];
            const sizeB = b.split("/").slice(-2, -1)[0];
            
            const indexA = SIZE_PREFERENCE.indexOf(sizeA);
            const indexB = SIZE_PREFERENCE.indexOf(sizeB);
            
            const rankA = indexA === -1 ? 999 : indexA;
            const rankB = indexB === -1 ? 999 : indexB;
            
            return rankA - rankB;
          });
          
          if (sorted[0]) {
            images.push(sorted[0]);
          }
        }
      }
    }

    if (images.length > 0) {
      projectCache.set(projectUrl, { images, timestamp: Date.now() });
    }

    return NextResponse.json({ success: true, images });
  } catch (error: any) {
    console.error("Error fetching Behance project detail:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load project details" },
      { status: 500 }
    );
  }
}
