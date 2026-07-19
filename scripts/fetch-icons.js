const fs = require('fs');
const path = require('path');

const iconsToFetch = [
  // Contact & Socials
  { name: 'linkedin', query: 'linkedin' },
  { name: 'github', query: 'github' },
  { name: 'whatsapp', query: 'whatsapp' },
  { name: 'gmail', query: 'gmail' },
  { name: 'google', query: 'google' },

  // Tech Stack - Frontend
  { name: 'react', query: 'react' },
  { name: 'nextjs', query: 'nextjs' },
  { name: 'javascript', query: 'javascript' },
  { name: 'typescript', query: 'typescript' },
  { name: 'tailwindcss', query: 'tailwind' },
  { name: 'bootstrap', query: 'bootstrap' },

  // Tech Stack - Backend
  { name: 'wordpress', query: 'wordpress' },
  { name: 'php', query: 'php' },
  { name: 'mysql', query: 'mysql' },

  // Tech Stack - Automation
  { name: 'n8n', query: 'n8n' },
  { name: 'claude', query: 'anthropic' },
  { name: 'openai', query: 'openai' },

  // Tech Stack - DevOps & Servers
  { name: 'google-cloud', query: 'google cloud' },
  { name: 'newrelic', query: 'new relic' },
  { name: 'linux', query: 'linux' },
  { name: 'cloudpanel', query: 'cloud' }, // Search generic cloud or panel if specific not found
  { name: 'git', query: 'git' },

  // Tech Stack - Tools
  { name: 'figma', query: 'figma' },
  { name: 'adobe', query: 'adobe' },
  { name: 'gsap', query: 'gsap' }
];

const outputDir = path.join(__dirname, '../public/assets/images/icons');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function fetchIcon(icon) {
  try {
    console.log(`Searching SVGL for ${icon.query}...`);
    const searchRes = await fetch(`https://api.svgl.app?search=${encodeURIComponent(icon.query)}`);
    const data = await searchRes.json();
    
    if (!Array.isArray(data) || data.length === 0) {
      console.warn(`No icon found for query: ${icon.query}`);
      return;
    }
    
    // Pick the best match (exact name match, query match, or first match)
    const match = data.find(item => 
      item.title.toLowerCase() === icon.name.toLowerCase() || 
      item.title.toLowerCase() === icon.query.toLowerCase()
    ) || data[0];
    
    let svgUrl = '';
    if (typeof match.route === 'string') {
      svgUrl = match.route;
    } else if (match.route && typeof match.route.light === 'string') {
      svgUrl = match.route.light;
    } else if (match.route && typeof match.route.dark === 'string') {
      svgUrl = match.route.dark;
    }
    
    if (!svgUrl) {
      throw new Error(`No SVG route found for match: ${JSON.stringify(match)}`);
    }
    
    // Change to API SVG URL to get optimized and direct SVG
    const filename = path.basename(svgUrl);
    const apiSvgUrl = `https://api.svgl.app/svg/${filename}`;
    
    console.log(`Fetching SVG from ${apiSvgUrl}...`);
    let svgRes = await fetch(apiSvgUrl);
    let svgText = '';
    
    if (!svgRes.ok) {
      console.warn(`Failed to fetch from ${apiSvgUrl}, trying direct route ${svgUrl}...`);
      const directRes = await fetch(svgUrl);
      if (!directRes.ok) {
        throw new Error(`Failed to fetch SVG from both ${apiSvgUrl} and ${svgUrl}`);
      }
      svgText = await directRes.text();
    } else {
      svgText = await svgRes.text();
    }
    
    // Ensure xmlns namespace is present so browsers parse correctly as an image resource
    if (!svgText.includes('xmlns="') && !svgText.includes("xmlns='")) {
      svgText = svgText.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    
    const destPath = path.join(outputDir, `${icon.name}.svg`);
    fs.writeFileSync(destPath, svgText);
    console.log(`Successfully saved ${icon.name}.svg`);
  } catch (error) {
    console.error(`Error fetching icon ${icon.name}:`, error.message);
  }
}

async function run() {
  for (const icon of iconsToFetch) {
    await fetchIcon(icon);
  }
  console.log('All icon fetches complete.');
}

run();
