const fs = require("fs");
const path = require("path");

// Load dotenv manually
function loadEnv() {
  const paths = [".env.local", ".env"];
  for (const p of paths) {
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, "utf8");
      content.split("\n").forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#")) {
          const parts = trimmed.split("=");
          if (parts.length >= 2) {
            const key = parts[0].trim();
            const value = parts.slice(1).join("=").trim().replace(/^['"]|['"]$/g, "");
            process.env[key] = value;
          }
        }
      });
    }
  }
}

loadEnv();

const apiKey = process.env.SNAPRENDER_API_KEY || "YOUR_API_KEY";

const sites = [
  { url: "https://aprazerhealthcare.com/", file: "aprazer.png" },
  { url: "https://gandhimedicos.in/", file: "gandhimedicos.png" },
  { url: "https://themetropolegroup.com/", file: "themetropolegroup.png" },
  { url: "https://collxrealty.com/", file: "collxrealty.png" },
  { url: "https://karmafoundation.in/", file: "karmafoundation.png" },
  { url: "https://vikasmehta.collxdev.cloud/", file: "vikasmehta.png" },
  { url: "https://enlightenfy.com/workshop", file: "enlightenfy-workshop.png" },
  { url: "https://enlightenfy.com/akanksha/", file: "enlightenfy-akanksha.png" }
];

const outputDir = path.join(__dirname, "../public/assets/images/screenshot");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
  console.log("Starting SnapRender screenshot generation...");

  let SnapRenderClass;
  try {
    const mod = await import("snaprender");
    SnapRenderClass = mod.SnapRender;
  } catch (err) {
    console.warn("Failed to dynamically import snaprender. Trying require fallback...", err.message);
    try {
      const mod = require("snaprender");
      SnapRenderClass = mod.SnapRender;
    } catch (reqErr) {
      console.error("Critical error loading snaprender package:", reqErr.message);
      process.exit(1);
    }
  }

  if (apiKey === "YOUR_API_KEY") {
    console.warn("WARNING: SNAPRENDER_API_KEY environment variable is not set. Keeping existing screenshots or writing fallbacks.");
    for (const site of sites) {
      const filePath = path.join(outputDir, site.file);
      if (fs.existsSync(filePath)) {
        console.log(`File ${site.file} already exists, skipping placeholder.`);
        continue;
      }
      const fallbackSvg = `<svg width="1280" height="800" viewBox="0 0 1280 800" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1280" height="800" fill="#121212"/>
  <rect x="20" y="20" width="1240" height="760" rx="16" fill="#181818" stroke="rgba(255,255,255,0.06)" stroke-width="2"/>
  <text x="640" y="380" fill="rgba(255,255,255,0.8)" font-family="system-ui, sans-serif" font-size="28" font-weight="600" text-anchor="middle">${site.url.replace("https://", "").replace("http://", "")}</text>
  <text x="640" y="420" fill="rgba(255,255,255,0.4)" font-family="system-ui, sans-serif" font-size="16" text-anchor="middle">Live Preview Currently Offline</text>
  <circle cx="640" cy="280" r="40" fill="rgba(255, 46, 46, 0.1)" stroke="#FF2E2E" stroke-width="2"/>
  <path d="M632 272L648 288M648 272L632 288" stroke="#FF2E2E" stroke-width="3" stroke-linecap="round"/>
</svg>`;
      fs.writeFileSync(filePath, fallbackSvg);
      console.log(`Saved SVG fallback placeholder for ${site.url}`);
    }
    process.exit(0);
  }

  const snap = new SnapRenderClass({ apiKey });

  for (const site of sites) {
    try {
      console.log(`Capturing ${site.url} using SnapRender...`);
      const buffer = await snap.capture({
        url: site.url,
        format: "png",
        blockAds: true,
        blockCookieBanners: true,
      });
      const filePath = path.join(outputDir, site.file);
      fs.writeFileSync(filePath, buffer);
      console.log(`Successfully saved screenshot to ${site.file}`);
    } catch (e) {
      console.error(`Failed to capture ${site.url} using SnapRender:`, e.message);
    }
  }

  console.log("SnapRender screenshot generation completed.");
  process.exit(0);
}

run();
