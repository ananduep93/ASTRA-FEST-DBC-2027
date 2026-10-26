const fs = require('fs');
const path = require('path');

const escapeXml = (str) =>
  String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const programs = [
  {
    id: "prog-01",
    number: "01",
    name: "SCAVENGER HUNT",
    subtitle: "CAMPUS MYSTERY & CLUE RUN",
    category: "MANAGEMENT",
    fee: "₹200",
    prize: "₹5,000",
    type: "TEAM // 4 SQUAD",
    glyph: `<circle cx="400" cy="180" r="42" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="6 4" opacity="0.4"/>
            <path d="M400 150 L400 210 M370 180 L430 180" stroke="#0055FF" stroke-width="2.5" />
            <circle cx="400" cy="180" r="12" fill="#0055FF" fill-opacity="0.2" stroke="#FFFFFF" stroke-width="2" />`
  },
  {
    id: "prog-02",
    number: "02",
    name: "CORPORATE WALK",
    subtitle: "EXECUTIVE POISE & RUNWAY",
    category: "STAGE & RUNWAY",
    fee: "₹150",
    prize: "₹6,000",
    type: "SOLO PARTICIPANT",
    glyph: `<path d="M370 210 L400 150 L430 210 Z" fill="none" stroke="#FFFFFF" stroke-width="2" />
            <line x1="400" y1="165" x2="400" y2="200" stroke="#0055FF" stroke-width="2" />
            <circle cx="400" cy="140" r="8" fill="#FFFFFF" />`
  },
  {
    id: "prog-03",
    number: "03",
    name: "PHOTOGRAPHY",
    subtitle: "SPOT DOCUMENTARY & STORY",
    category: "MEDIA & ARTS",
    fee: "₹100",
    prize: "₹4,000",
    type: "SOLO // SHUTTER",
    glyph: `<rect x="365" y="155" width="70" height="50" rx="8" fill="none" stroke="#FFFFFF" stroke-width="2" />
            <circle cx="400" cy="180" r="16" fill="none" stroke="#0055FF" stroke-width="2.5" />
            <circle cx="400" cy="180" r="6" fill="#FFFFFF" />
            <rect x="415" y="148" width="14" height="7" rx="2" fill="#0055FF" />`
  },
  {
    id: "prog-04",
    number: "04",
    name: "RJ HUNT",
    subtitle: "VOICE, CHARISMA & ON-AIR",
    category: "MEDIA & ARTS",
    fee: "₹100",
    prize: "₹3,500",
    type: "SOLO BROADCAST",
    glyph: `<rect x="388" y="152" width="24" height="40" rx="12" fill="none" stroke="#FFFFFF" stroke-width="2" />
            <line x1="388" y1="172" x2="412" y2="172" stroke="#FFFFFF" stroke-width="1.5" />
            <path d="M378 175 C378 198 422 198 422 175" fill="none" stroke="#0055FF" stroke-width="2" />
            <line x1="400" y1="198" x2="400" y2="212" stroke="#FFFFFF" stroke-width="2" />
            <line x1="385" y1="212" x2="415" y2="212" stroke="#0055FF" stroke-width="2" />`
  },
  {
    id: "prog-05",
    number: "05",
    name: "E-SPORTS",
    subtitle: "BGMI / VALORANT CLASH",
    category: "TECH & GAMING",
    fee: "₹300",
    prize: "₹8,000",
    type: "SQUAD BATTLE",
    glyph: `<path d="M365 170 C365 160 375 155 385 155 L415 155 C425 155 435 160 435 170 L430 205 C428 212 418 212 414 205 L405 192 L395 192 L386 205 C382 212 372 212 370 205 Z" fill="none" stroke="#FFFFFF" stroke-width="2" />
            <line x1="382" y1="170" x2="382" y2="182" stroke="#0055FF" stroke-width="2" />
            <line x1="376" y1="176" x2="388" y2="176" stroke="#0055FF" stroke-width="2" />
            <circle cx="415" cy="172" r="3" fill="#FFFFFF" />
            <circle cx="423" cy="180" r="3" fill="#0055FF" />`
  },
  {
    id: "prog-06",
    number: "06",
    name: "FASHION SHOW",
    subtitle: "HAUTE COUTURE GROUP BATTLE",
    category: "STAGE & RUNWAY",
    fee: "₹800",
    prize: "₹15,000",
    type: "COLLEGE TROUPE",
    glyph: `<path d="M375 210 L385 160 L400 175 L415 160 L425 210 Z" fill="none" stroke="#FFFFFF" stroke-width="2" />
            <circle cx="400" cy="148" r="9" fill="none" stroke="#0055FF" stroke-width="2" />
            <line x1="365" y1="210" x2="435" y2="210" stroke="#0055FF" stroke-width="2" />`
  },
  {
    id: "prog-07",
    number: "07",
    name: "THEME DANCE",
    subtitle: "RHYTHMIC NARRATIVE SHOWCASE",
    category: "STAGE & RUNWAY",
    fee: "₹600",
    prize: "₹12,000",
    type: "MEGA TROUPE",
    glyph: `<circle cx="400" cy="145" r="9" fill="#FFFFFF" />
            <path d="M380 170 Q400 160 420 170 Q410 190 395 200 L405 220" fill="none" stroke="#0055FF" stroke-width="2.5" />
            <path d="M370 185 Q395 180 430 175" fill="none" stroke="#FFFFFF" stroke-width="2" />`
  },
  {
    id: "prog-08",
    number: "08",
    name: "FACE PAINTING",
    subtitle: "LIVING CANVAS METAMORPHOSIS",
    category: "MEDIA & ARTS",
    fee: "₹150",
    prize: "₹3,000",
    type: "DUO PAIR",
    glyph: `<ellipse cx="400" cy="180" rx="30" ry="38" fill="none" stroke="#FFFFFF" stroke-width="2" />
            <path d="M380 185 C390 195 410 195 420 185" fill="none" stroke="#0055FF" stroke-width="2" />
            <circle cx="390" cy="172" r="3.5" fill="#FFFFFF" />
            <circle cx="410" cy="172" r="3.5" fill="#0055FF" />
            <path d="M400 160 L400 180" stroke="#0055FF" stroke-width="1.5" />`
  },
  {
    id: "prog-09",
    number: "09",
    name: "FASHION SOLO",
    subtitle: "SOLO SPOTLIGHT & GRACE",
    category: "STAGE & RUNWAY",
    fee: "₹150",
    prize: "₹5,000",
    type: "SOLO STAGE",
    glyph: `<path d="M390 155 L400 140 L410 155 L425 150 L415 168 L400 215 L385 168 L375 150 Z" fill="none" stroke="#FFFFFF" stroke-width="2" />
            <circle cx="400" cy="178" r="5" fill="#0055FF" />`
  },
  {
    id: "prog-10",
    number: "10",
    name: "BEST MANAGER",
    subtitle: "STRESS, CRISIS & STRATEGY",
    category: "MANAGEMENT",
    fee: "₹250",
    prize: "₹10,000",
    type: "TITAN CLASH",
    glyph: `<path d="M375 170 L400 150 L425 170 L425 210 L375 210 Z" fill="none" stroke="#FFFFFF" stroke-width="2" />
            <line x1="400" y1="150" x2="400" y2="210" stroke="#0055FF" stroke-width="2" />
            <rect x="388" y="180" width="24" height="18" fill="none" stroke="#FFFFFF" stroke-width="1.5" />
            <circle cx="400" cy="138" r="8" fill="#0055FF" />`
  },
  {
    id: "prog-11",
    number: "11",
    name: "LOGO DESIGN",
    subtitle: "BRAND IDENTITY SPRINT",
    category: "MEDIA & ARTS",
    fee: "₹100",
    prize: "₹3,000",
    type: "CREATIVE SOLO",
    glyph: `<rect x="370" y="150" width="60" height="60" rx="8" fill="none" stroke="#FFFFFF" stroke-width="2" />
            <path d="M380 195 L395 165 L410 195 M388 185 L402 185" stroke="#0055FF" stroke-width="2" stroke-linecap="round" />
            <circle cx="418" cy="162" r="4" fill="#FFFFFF" />`
  },
  {
    id: "prog-12",
    number: "12",
    name: "CODING COMPETITION",
    subtitle: "ALGORITHMIC SPEED RUN",
    category: "TECH & GAMING",
    fee: "₹150",
    prize: "₹6,000",
    type: "SOLO HACKER",
    glyph: `<path d="M380 165 L365 180 L380 195" fill="none" stroke="#0055FF" stroke-width="2.5" stroke-linecap="round" />
            <path d="M420 165 L435 180 L420 195" fill="none" stroke="#0055FF" stroke-width="2.5" stroke-linecap="round" />
            <line x1="406" y1="162" x2="394" y2="198" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />`
  },
  {
    id: "prog-13",
    number: "13",
    name: "BUSINESS QUIZ",
    subtitle: "CORPORATE TRIVIA MASTERY",
    category: "MANAGEMENT",
    fee: "₹150",
    prize: "₹4,500",
    type: "DUO SQUAD",
    glyph: `<circle cx="400" cy="180" r="32" fill="none" stroke="#FFFFFF" stroke-width="2" />
            <path d="M392 170 Q400 162 408 170 Q408 178 400 183 L400 190" fill="none" stroke="#0055FF" stroke-width="2.5" />
            <circle cx="400" cy="198" r="2.5" fill="#FFFFFF" />`
  },
  {
    id: "prog-14",
    number: "14",
    name: "REEL MAKING",
    subtitle: "SPOT CINEMATIC SHORT",
    category: "MEDIA & ARTS",
    fee: "₹100",
    prize: "₹4,000",
    type: "MEDIA CREATOR",
    glyph: `<rect x="375" y="148" width="50" height="64" rx="10" fill="none" stroke="#FFFFFF" stroke-width="2" />
            <polygon points="395,172 395,188 410,180" fill="#0055FF" />
            <circle cx="400" cy="204" r="2.5" fill="#FFFFFF" />`
  },
  {
    id: "prog-15",
    number: "15",
    name: "MINI MILITIA",
    subtitle: "2D MOBILE SHOOTER MAYHEM",
    category: "TECH & GAMING",
    fee: "₹200",
    prize: "₹4,000",
    type: "TACTICAL SQUAD",
    glyph: `<circle cx="400" cy="180" r="28" fill="none" stroke="#FFFFFF" stroke-width="2" />
            <circle cx="400" cy="180" r="14" fill="none" stroke="#0055FF" stroke-width="2" />
            <line x1="362" y1="180" x2="370" y2="180" stroke="#FFFFFF" stroke-width="2" />
            <line x1="430" y1="180" x2="438" y2="180" stroke="#FFFFFF" stroke-width="2" />
            <line x1="400" y1="142" x2="400" y2="150" stroke="#FFFFFF" stroke-width="2" />
            <line x1="400" y1="210" x2="400" y2="218" stroke="#FFFFFF" stroke-width="2" />
            <circle cx="400" cy="180" r="3" fill="#0055FF" />`
  }
];

function generateSVG(p) {
  const safeName = escapeXml(p.name);
  const safeSubtitle = escapeXml(p.subtitle);
  const safeCategory = escapeXml(p.category);
  const safeType = escapeXml(p.type);
  const safeFee = escapeXml(p.fee);
  const safePrize = escapeXml(p.prize);
  const safeNumber = escapeXml(p.number);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="800" height="480">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#09090B"/>
      <stop offset="50%" stop-color="#000000"/>
      <stop offset="100%" stop-color="#0B0D13"/>
    </linearGradient>
    <radialGradient id="centerGlow" cx="50%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#0055FF" stop-opacity="0.18"/>
      <stop offset="60%" stop-color="#002266" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dotGrid" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="#FFFFFF" fill-opacity="0.07"/>
    </pattern>
  </defs>

  <!-- Deep Obsidian Black Background -->
  <rect width="800" height="480" fill="url(#bgGrad)"/>
  
  <!-- Subtle Blueprint Dot Grid -->
  <rect width="800" height="480" fill="url(#dotGrid)"/>

  <!-- Center Ambient Radial Glow -->
  <rect width="800" height="480" fill="url(#centerGlow)"/>

  <!-- High-Tech Border Outline with Accent Corners -->
  <rect x="20" y="20" width="760" height="440" rx="16" fill="none" stroke="#27272A" stroke-width="1.5"/>

  <!-- Cyber Corner Brackets -->
  <path d="M 20 50 L 20 20 L 50 20" stroke="#FFFFFF" stroke-width="3" fill="none"/>
  <path d="M 780 50 L 780 20 L 750 20" stroke="#FFFFFF" stroke-width="3" fill="none"/>
  <path d="M 20 430 L 20 460 L 50 460" stroke="#FFFFFF" stroke-width="3" fill="none"/>
  <path d="M 780 430 L 780 460 L 750 460" stroke="#FFFFFF" stroke-width="3" fill="none"/>

  <!-- Top Metadata Header -->
  <g transform="translate(45, 52)">
    <!-- Arena Number Badge -->
    <rect x="0" y="0" width="134" height="32" rx="7" fill="#18181B" stroke="#27272A" stroke-width="1"/>
    <circle cx="18" cy="16" r="4.5" fill="#0055FF"/>
    <text x="32" y="21" fill="#FFFFFF" font-family="'Space Grotesk', -apple-system, monospace" font-size="13" font-weight="700" letter-spacing="2">ARENA // ${safeNumber}</text>

    <!-- Category Pill -->
    <rect x="560" y="0" width="150" height="32" rx="7" fill="#09090B" stroke="#27272A" stroke-width="1"/>
    <text x="635" y="21" text-anchor="middle" fill="#D4D4D8" font-family="'Space Grotesk', monospace" font-size="12" font-weight="700" letter-spacing="1.5">${safeCategory}</text>
  </g>

  <!-- Central Visual Glyph -->
  <g id="icon">
    ${p.glyph}
  </g>

  <!-- Central Title and Subtitle (High-Contrast White Typography) -->
  <g transform="translate(400, 275)">
    <text x="0" y="0" text-anchor="middle" fill="#FFFFFF" font-family="'Space Grotesk', system-ui, sans-serif" font-size="38" font-weight="900" letter-spacing="1">${safeName}</text>
    <text x="0" y="34" text-anchor="middle" fill="#A1A1AA" font-family="'Space Grotesk', monospace" font-size="14" font-weight="600" letter-spacing="3">${safeSubtitle}</text>
    
    <!-- Accent Line -->
    <line x1="-120" y1="56" x2="120" y2="56" stroke="#27272A" stroke-width="1.5"/>
    <rect x="-18" y="54" width="36" height="5" rx="2.5" fill="#0055FF"/>
  </g>

  <!-- Bottom Details Bar -->
  <g transform="translate(45, 410)">
    <!-- Format Tag -->
    <text x="0" y="12" fill="#71717A" font-family="monospace" font-size="12" font-weight="600" letter-spacing="1">EVENT FORMAT</text>
    <text x="0" y="34" fill="#FFFFFF" font-family="'Space Grotesk', monospace" font-size="16" font-weight="700" letter-spacing="1">${safeType}</text>

    <!-- Entry Fee -->
    <text x="355" y="12" text-anchor="middle" fill="#71717A" font-family="monospace" font-size="12" font-weight="600" letter-spacing="1">ENTRY PASS</text>
    <text x="355" y="34" text-anchor="middle" fill="#FFFFFF" font-family="'Space Grotesk', monospace" font-size="20" font-weight="800">${safeFee}</text>

    <!-- Prize Pool -->
    <text x="710" y="12" text-anchor="end" fill="#71717A" font-family="monospace" font-size="12" font-weight="600" letter-spacing="1">PRIZE POOL</text>
    <text x="710" y="34" text-anchor="end" fill="#0055FF" font-family="'Space Grotesk', monospace" font-size="20" font-weight="800">${safePrize}</text>
  </g>
</svg>`;
}

const outDir = path.join(__dirname, '..', 'public', 'images', 'programs-generated');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

programs.forEach(p => {
  const filePath = path.join(outDir, `${p.id}.svg`);
  fs.writeFileSync(filePath, generateSVG(p), 'utf-8');
});
console.log('All 15 program SVGs regenerated with escapeXml!');
