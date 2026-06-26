import type { Category, House } from "./types";

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const CATEGORIES: Category[] = [
  {
    slug: "modern",
    name: "Modern Homes",
    tagline: "Clean lines, honest materials",
    description:
      "Architect-led modern homes with restrained palettes, large glazing and a strong indoor-outdoor dialogue.",
    icon: "Square",
    cover: img("1600596542815-ffad4c1539a9", 1200),
  },
  {
    slug: "luxury",
    name: "Luxury Villas",
    tagline: "Statement residences",
    description:
      "Sprawling villas designed for entertaining — with double-height volumes, pools and resort-grade amenities.",
    icon: "Gem",
    cover: img("1613490493576-7fde63acd811", 1200),
  },
  {
    slug: "bungalows",
    name: "Bungalows",
    tagline: "Single-storey serenity",
    description:
      "Ground-hugging bungalows that prioritise accessibility, privacy and a calm relationship to the garden.",
    icon: "Home",
    cover: img("1512917774080-9991f1c4c750", 1200),
  },
  {
    slug: "maisonettes",
    name: "Maisonettes",
    tagline: "Stacked elegance",
    description:
      "Two-storey residences that separate sleeping and living, ideal for narrow plots and urban infill.",
    icon: "Building2",
    cover: img("1600585154340-be6161a56a0c", 1200),
  },
  {
    slug: "villas",
    name: "Villas",
    tagline: "Mediterranean composure",
    description:
      "Timeless villas with courtyards, terraces and shaded loggias — designed for warm climates and long views.",
    icon: "Palmtree",
    cover: img("1600607687939-ce8a6c25118c", 1200),
  },
  {
    slug: "small-homes",
    name: "Small Homes",
    tagline: "Considered, compact",
    description:
      "Footprint-conscious homes where every square metre is earned through intelligent, flexible planning.",
    icon: "Layers",
    cover: img("1600566753086-00f18fb6b3ea", 1200),
  },
];

/* ------------------------------------------------------------------ */
/* Floor plan SVGs — abstract architectural diagrams                  */
/* ------------------------------------------------------------------ */

const floorPlanGround = (label: string) => `
<svg viewBox="0 0 800 540" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
  <rect width="800" height="540" fill="#FAF8F5"/>
  <rect x="20" y="20" width="760" height="500" fill="none" stroke="#1A1A1A" stroke-width="3"/>
  <!-- Porch -->
  <rect x="20" y="20" width="180" height="90" fill="none" stroke="#8B8680" stroke-width="1.5" stroke-dasharray="6 4"/>
  <text x="110" y="70" font-family="Inter, sans-serif" font-size="11" fill="#8B8680" text-anchor="middle" letter-spacing="2">PORCH</text>
  <!-- Living -->
  <rect x="200" y="20" width="320" height="240" fill="none" stroke="#1A1A1A" stroke-width="2"/>
  <text x="360" y="135" font-family="Playfair Display, serif" font-size="18" fill="#1A1A1A" text-anchor="middle">Living Room</text>
  <text x="360" y="158" font-family="Inter, sans-serif" font-size="10" fill="#8B8680" text-anchor="middle" letter-spacing="2">48 SQM</text>
  <!-- Kitchen -->
  <rect x="520" y="20" width="260" height="180" fill="none" stroke="#1A1A1A" stroke-width="2"/>
  <text x="650" y="105" font-family="Playfair Display, serif" font-size="16" fill="#1A1A1A" text-anchor="middle">Kitchen</text>
  <text x="650" y="125" font-family="Inter, sans-serif" font-size="10" fill="#8B8680" text-anchor="middle" letter-spacing="2">22 SQM</text>
  <!-- Dining -->
  <rect x="520" y="200" width="260" height="120" fill="none" stroke="#1A1A1A" stroke-width="2"/>
  <text x="650" y="255" font-family="Playfair Display, serif" font-size="14" fill="#1A1A1A" text-anchor="middle">Dining</text>
  <text x="650" y="273" font-family="Inter, sans-serif" font-size="10" fill="#8B8680" text-anchor="middle" letter-spacing="2">16 SQM</text>
  <!-- Foyer -->
  <rect x="200" y="260" width="160" height="100" fill="none" stroke="#1A1A1A" stroke-width="2"/>
  <text x="280" y="312" font-family="Inter, sans-serif" font-size="11" fill="#1A1A1A" text-anchor="middle" letter-spacing="2">FOYER</text>
  <!-- Bath -->
  <rect x="360" y="260" width="160" height="100" fill="none" stroke="#1A1A1A" stroke-width="2"/>
  <text x="440" y="312" font-family="Inter, sans-serif" font-size="11" fill="#1A1A1A" text-anchor="middle" letter-spacing="2">BATH</text>
  <!-- Bedroom 2 -->
  <rect x="20" y="260" width="180" height="260" fill="none" stroke="#1A1A1A" stroke-width="2"/>
  <text x="110" y="385" font-family="Playfair Display, serif" font-size="14" fill="#1A1A1A" text-anchor="middle">Bedroom 02</text>
  <text x="110" y="403" font-family="Inter, sans-serif" font-size="10" fill="#8B8680" text-anchor="middle" letter-spacing="2">18 SQM</text>
  <!-- Master -->
  <rect x="200" y="360" width="320" height="160" fill="none" stroke="#1A1A1A" stroke-width="2"/>
  <text x="360" y="435" font-family="Playfair Display, serif" font-size="18" fill="#1A1A1A" text-anchor="middle">Master Suite</text>
  <text x="360" y="458" font-family="Inter, sans-serif" font-size="10" fill="#8B8680" text-anchor="middle" letter-spacing="2">32 SQM · WALK-IN · ENSUITE</text>
  <!-- Garage -->
  <rect x="520" y="320" width="260" height="200" fill="none" stroke="#8B8680" stroke-width="2"/>
  <text x="650" y="415" font-family="Playfair Display, serif" font-size="14" fill="#1A1A1A" text-anchor="middle">Garage</text>
  <text x="650" y="435" font-family="Inter, sans-serif" font-size="10" fill="#8B8680" text-anchor="middle" letter-spacing="2">2 CARS</text>
  <!-- Doors -->
  <line x1="200" y1="110" x2="200" y2="130" stroke="#FAF8F5" stroke-width="6"/>
  <line x1="360" y1="360" x2="380" y2="360" stroke="#FAF8F5" stroke-width="6"/>
  <line x1="520" y1="200" x2="520" y2="220" stroke="#FAF8F5" stroke-width="6"/>
  <!-- North arrow -->
  <g transform="translate(740, 470)">
    <circle cx="0" cy="0" r="18" fill="none" stroke="#8B8680" stroke-width="1"/>
    <polygon points="0,-12 5,4 0,0 -5,4" fill="#1A1A1A"/>
    <text x="0" y="-22" font-family="Inter, sans-serif" font-size="9" fill="#8B8680" text-anchor="middle">N</text>
  </g>
  <text x="40" y="510" font-family="Inter, sans-serif" font-size="10" fill="#8B8680" letter-spacing="3">${label.toUpperCase()}</text>
</svg>`;

const floorPlanUpper = (label: string) => `
<svg viewBox="0 0 800 540" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
  <rect width="800" height="540" fill="#FAF8F5"/>
  <rect x="20" y="20" width="760" height="500" fill="none" stroke="#1A1A1A" stroke-width="3"/>
  <!-- Lounge -->
  <rect x="20" y="20" width="380" height="220" fill="none" stroke="#1A1A1A" stroke-width="2"/>
  <text x="210" y="125" font-family="Playfair Display, serif" font-size="18" fill="#1A1A1A" text-anchor="middle">Family Lounge</text>
  <text x="210" y="148" font-family="Inter, sans-serif" font-size="10" fill="#8B8680" text-anchor="middle" letter-spacing="2">36 SQM</text>
  <!-- Bedroom 3 -->
  <rect x="400" y="20" width="380" height="220" fill="none" stroke="#1A1A1A" stroke-width="2"/>
  <text x="590" y="115" font-family="Playfair Display, serif" font-size="16" fill="#1A1A1A" text-anchor="middle">Bedroom 03</text>
  <text x="590" y="135" font-family="Inter, sans-serif" font-size="10" fill="#8B8680" text-anchor="middle" letter-spacing="2">22 SQM · ENSUITE</text>
  <!-- Study -->
  <rect x="20" y="240" width="240" height="280" fill="none" stroke="#1A1A1A" stroke-width="2"/>
  <text x="140" y="375" font-family="Playfair Display, serif" font-size="16" fill="#1A1A1A" text-anchor="middle">Study</text>
  <text x="140" y="395" font-family="Inter, sans-serif" font-size="10" fill="#8B8680" text-anchor="middle" letter-spacing="2">14 SQM</text>
  <!-- Laundry -->
  <rect x="260" y="240" width="160" height="140" fill="none" stroke="#1A1A1A" stroke-width="2"/>
  <text x="340" y="312" font-family="Inter, sans-serif" font-size="11" fill="#1A1A1A" text-anchor="middle" letter-spacing="2">LAUNDRY</text>
  <!-- Bath -->
  <rect x="420" y="240" width="160" height="140" fill="none" stroke="#1A1A1A" stroke-width="2"/>
  <text x="500" y="312" font-family="Inter, sans-serif" font-size="11" fill="#1A1A1A" text-anchor="middle" letter-spacing="2">BATH 02</text>
  <!-- Bedroom 4 -->
  <rect x="260" y="380" width="320" height="140" fill="none" stroke="#1A1A1A" stroke-width="2"/>
  <text x="420" y="448" font-family="Playfair Display, serif" font-size="16" fill="#1A1A1A" text-anchor="middle">Bedroom 04</text>
  <text x="420" y="468" font-family="Inter, sans-serif" font-size="10" fill="#8B8680" text-anchor="middle" letter-spacing="2">20 SQM</text>
  <!-- Terrace -->
  <rect x="580" y="240" width="200" height="280" fill="none" stroke="#8B8680" stroke-width="2" stroke-dasharray="6 4"/>
  <text x="680" y="375" font-family="Inter, sans-serif" font-size="11" fill="#8B8680" text-anchor="middle" letter-spacing="2">TERRACE</text>
  <text x="680" y="395" font-family="Inter, sans-serif" font-size="10" fill="#8B8680" text-anchor="middle" letter-spacing="2">28 SQM</text>
  <!-- Doors -->
  <line x1="400" y1="120" x2="400" y2="140" stroke="#FAF8F5" stroke-width="6"/>
  <line x1="260" y1="340" x2="280" y2="340" stroke="#FAF8F5" stroke-width="6"/>
  <g transform="translate(740, 470)">
    <circle cx="0" cy="0" r="18" fill="none" stroke="#8B8680" stroke-width="1"/>
    <polygon points="0,-12 5,4 0,0 -5,4" fill="#1A1A1A"/>
    <text x="0" y="-22" font-family="Inter, sans-serif" font-size="9" fill="#8B8680" text-anchor="middle">N</text>
  </g>
  <text x="40" y="510" font-family="Inter, sans-serif" font-size="10" fill="#8B8680" letter-spacing="3">${label.toUpperCase()}</text>
</svg>`;

const floorPlanSingle = (label: string) => `
<svg viewBox="0 0 800 540" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
  <rect width="800" height="540" fill="#FAF8F5"/>
  <rect x="20" y="20" width="760" height="500" fill="none" stroke="#1A1A1A" stroke-width="3"/>
  <rect x="20" y="20" width="760" height="500" fill="none" stroke="#8B8680" stroke-width="1.5" stroke-dasharray="6 4"/>
  <rect x="20" y="20" width="240" height="280" fill="none" stroke="#1A1A1A" stroke-width="2"/>
  <text x="140" y="155" font-family="Playfair Display, serif" font-size="18" fill="#1A1A1A" text-anchor="middle">Living</text>
  <text x="140" y="178" font-family="Inter, sans-serif" font-size="10" fill="#8B8680" text-anchor="middle" letter-spacing="2">42 SQM</text>
  <rect x="260" y="20" width="280" height="180" fill="none" stroke="#1A1A1A" stroke-width="2"/>
  <text x="400" y="105" font-family="Playfair Display, serif" font-size="16" fill="#1A1A1A" text-anchor="middle">Kitchen + Dining</text>
  <text x="400" y="125" font-family="Inter, sans-serif" font-size="10" fill="#8B8680" text-anchor="middle" letter-spacing="2">30 SQM</text>
  <rect x="540" y="20" width="240" height="180" fill="none" stroke="#1A1A1A" stroke-width="2"/>
  <text x="660" y="105" font-family="Playfair Display, serif" font-size="16" fill="#1A1A1A" text-anchor="middle">Master Suite</text>
  <text x="660" y="125" font-family="Inter, sans-serif" font-size="10" fill="#8B8680" text-anchor="middle" letter-spacing="2">26 SQM</text>
  <rect x="260" y="200" width="280" height="160" fill="none" stroke="#1A1A1A" stroke-width="2"/>
  <text x="400" y="278" font-family="Playfair Display, serif" font-size="14" fill="#1A1A1A" text-anchor="middle">Bedroom 02</text>
  <text x="400" y="296" font-family="Inter, sans-serif" font-size="10" fill="#8B8680" text-anchor="middle" letter-spacing="2">18 SQM</text>
  <rect x="540" y="200" width="240" height="160" fill="none" stroke="#1A1A1A" stroke-width="2"/>
  <text x="660" y="278" font-family="Inter, sans-serif" font-size="11" fill="#1A1A1A" text-anchor="middle" letter-spacing="2">BATH · WALK-IN</text>
  <rect x="20" y="300" width="240" height="220" fill="none" stroke="#8B8680" stroke-width="2"/>
  <text x="140" y="408" font-family="Inter, sans-serif" font-size="11" fill="#8B8680" text-anchor="middle" letter-spacing="2">TERRACE</text>
  <text x="140" y="426" font-family="Inter, sans-serif" font-size="10" fill="#8B8680" text-anchor="middle" letter-spacing="2">22 SQM</text>
  <rect x="260" y="360" width="520" height="160" fill="none" stroke="#8B8680" stroke-width="2"/>
  <text x="520" y="438" font-family="Inter, sans-serif" font-size="11" fill="#8B8680" text-anchor="middle" letter-spacing="2">GARDEN · DECK</text>
  <g transform="translate(740, 470)">
    <circle cx="0" cy="0" r="18" fill="none" stroke="#8B8680" stroke-width="1"/>
    <polygon points="0,-12 5,4 0,0 -5,4" fill="#1A1A1A"/>
    <text x="0" y="-22" font-family="Inter, sans-serif" font-size="9" fill="#8B8680" text-anchor="middle">N</text>
  </g>
  <text x="40" y="510" font-family="Inter, sans-serif" font-size="10" fill="#8B8680" letter-spacing="3">${label.toUpperCase()}</text>
</svg>`;

/* ------------------------------------------------------------------ */
/* House catalog                                                      */
/* ------------------------------------------------------------------ */

export const HOUSES: House[] = [
  {
    id: "1",
    slug: "aurora-residence",
    name: "The Aurora Residence",
    tagline: "Modern Luxury Villa",
    category: "luxury",
    style: "Modern Luxury",
    bedrooms: 4,
    bathrooms: 4,
    stories: 2,
    garage: 2,
    area: 320,
    price: 245000,
    rating: 4.9,
    reviews: 38,
    featured: true,
    hero: img("1613490493576-7fde63acd811", 2400),
    thumbnail: img("1613490493576-7fde63acd811", 900),
    description:
      "A statement residence composed of cantilevered volumes, floor-to-ceiling glass and a 25-metre infinity pool that melts into the horizon.",
    story: [
      "Designed for a young family who entertain frequently, the Aurora Residence dissolves the line between interior and landscape. A double-height entry hall draws the eye toward a fully glazed rear elevation, where the living room spills onto a covered terrace and pool deck.",
      "The ground floor is given over to communal life — kitchen, dining and living flow as one continuous volume, anchored by a cast-concrete fireplace. A discreet wing tucks the master suite, study and guest bedroom behind the garage, keeping the public and private realms apart.",
      "Upstairs, two ensuite bedrooms share a family lounge that opens onto a private terrace. Materials throughout — limed oak, brushed limestone, blackened steel — were chosen to age gracefully rather than impress on day one.",
      "The Aurora is not a house that shouts. It is a house that, on the right evening, makes you forget there is a building at all.",
    ],
    gallery: [
      { id: "g1", type: "image", src: img("1613490493576-7fde63acd811", 2000), span: "full", caption: "Rear elevation at dusk" },
      { id: "g2", type: "image", src: img("1600585154340-be6161a56a0c", 1200), span: "tall", caption: "Pool terrace" },
      { id: "g3", type: "image", src: img("1480074568708-e7b720bb3f09", 1200), span: "small", caption: "Living volume" },
      { id: "g4", type: "panoramic", src: img("1600607687939-ce8a6c25118c", 2400), span: "wide", caption: "Aerial approach" },
      { id: "g5", type: "video", src: "LXb3EKWsInQ", poster: img("1600607687644-c7171b42498f", 1600), span: "wide", caption: "Walkthrough film" },
      { id: "g6", type: "image", src: img("1600210492486-724fe5c67fb0", 1200), span: "small", caption: "Master suite" },
      { id: "g7", type: "image", src: img("1600585154526-990dced4db0d", 1200), span: "tall", caption: "Kitchen" },
    ],
    videoTour: {
      src: "LXb3EKWsInQ",
      poster: img("1600607687644-c7171b42498f", 2000),
      title: "Aurora Residence — Walkthrough",
    },
    floorPlans: [
      { label: "Ground Floor", svg: floorPlanGround("Ground Floor") },
      { label: "Upper Floor", svg: floorPlanUpper("Upper Floor") },
    ],
    specifications: [
      { label: "Bedrooms", value: "4" },
      { label: "Bathrooms", value: "4" },
      { label: "Garage", value: "2 Cars" },
      { label: "Total Area", value: "320 sqm" },
      { label: "Kitchen", value: "Open Plan · 22 sqm" },
      { label: "Dining", value: "Formal · 16 sqm" },
      { label: "Study", value: "Upper Floor · 14 sqm" },
      { label: "Laundry", value: "Upper Floor · 8 sqm" },
    ],
    exterior: [
      img("1613490493576-7fde63acd811", 1600),
      img("1600585154340-be6161a56a0c", 1600),
      img("1600607687939-ce8a6c25118c", 1600),
      img("1600607687644-c7171b42498f", 1600),
    ],
    interiors: {
      kitchen: img("1600585154526-990dced4db0d", 1400),
      livingRoom: img("1480074568708-e7b720bb3f09", 1400),
      bedroom: img("1600210492486-724fe5c67fb0", 1400),
      bathroom: img("1600121848594-d8644e57abab", 1400),
      outdoor: img("1600585154340-be6161a56a0c", 1400),
    },
    highlights: [
      "25m infinity pool",
      "Double-height living volume",
      "Floor-to-ceiling glazing",
      "Cast-concrete fireplace",
      "Walk-in master dressing room",
    ],
  },
  {
    id: "2",
    slug: "serene-pavilion",
    name: "The Serene Pavilion",
    tagline: "Modern Single-Storey",
    category: "modern",
    style: "Modern Minimalist",
    bedrooms: 3,
    bathrooms: 2,
    stories: 1,
    garage: 2,
    area: 210,
    price: 168000,
    rating: 4.8,
    reviews: 24,
    featured: true,
    hero: img("1600596542815-ffad4c1539a9", 2400),
    thumbnail: img("1600596542815-ffad4c1539a9", 900),
    description:
      "A single-storey pavilion composed around a central courtyard — calm, restrained, and almost monastic in its handling of light.",
    story: [
      "The Serene Pavilion was conceived as a retreat from urban density. A continuous roof floats above a perimeter of glass, with a single internal courtyard that brings morning light and a tree into the heart of the plan.",
      "Three bedrooms occupy the south wing, separated from the open living volume by a discreet gallery. The kitchen is the home's quiet heart — a long island in honed marble, with full-height cabinetry concealed behind panels of pale ash.",
      "There are no corridors. Every space flows into the next, and the perimeter garden is visible from every room. The architecture does not perform; it simply gets out of the way.",
    ],
    gallery: [
      { id: "g1", type: "image", src: img("1600596542815-ffad4c1539a9", 2000), span: "full", caption: "Approach at golden hour" },
      { id: "g2", type: "image", src: img("1512917774080-9991f1c4c750", 1200), span: "tall", caption: "Courtyard elevation" },
      { id: "g3", type: "image", src: img("1505691938895-1758d7feb511", 1200), span: "small", caption: "Living volume" },
      { id: "g4", type: "panoramic", src: img("1567767292278-a4f21aa2d36e", 2400), span: "wide", caption: "Dusk elevation" },
      { id: "g5", type: "video", src: "LXb3EKWsInQ", poster: img("1600596542815-ffad4c1539a9", 1600), span: "wide", caption: "Walkthrough film" },
      { id: "g6", type: "image", src: img("1556909114-f6e7ad7d3136", 1200), span: "small", caption: "Kitchen island" },
      { id: "g7", type: "image", src: img("1502672260266-1c1ef2d93688", 1200), span: "tall", caption: "Bedroom" },
    ],
    videoTour: {
      src: "LXb3EKWsInQ",
      poster: img("1600596542815-ffad4c1539a9", 2000),
      title: "Serene Pavilion — Walkthrough",
    },
    floorPlans: [{ label: "Ground Floor", svg: floorPlanSingle("Ground Floor") }],
    specifications: [
      { label: "Bedrooms", value: "3" },
      { label: "Bathrooms", value: "2" },
      { label: "Garage", value: "2 Cars" },
      { label: "Total Area", value: "210 sqm" },
      { label: "Kitchen", value: "Island · 24 sqm" },
      { label: "Dining", value: "Open · 14 sqm" },
      { label: "Study", value: "Optional nook" },
      { label: "Laundry", value: "Utility · 6 sqm" },
    ],
    exterior: [
      img("1600596542815-ffad4c1539a9", 1600),
      img("1512917774080-9991f1c4c750", 1600),
      img("1567767292278-a4f21aa2d36e", 1600),
      img("1564013799919-ab600027ffc6", 1600),
    ],
    interiors: {
      kitchen: img("1556909114-f6e7ad7d3136", 1400),
      livingRoom: img("1505691938895-1758d7feb511", 1400),
      bedroom: img("1502672260266-1c1ef2d93688", 1400),
      bathroom: img("1554995207-c18c203602cb", 1400),
      outdoor: img("1512917774080-9991f1c4c750", 1400),
    },
    highlights: [
      "Central landscaped courtyard",
      "Floating roof with clerestory light",
      "Honed marble kitchen island",
      "Full-height perimeter glazing",
      "No corridors — open flow",
    ],
  },
  {
    id: "3",
    slug: "coastal-maisonette",
    name: "The Coastal Maisonette",
    tagline: "Two-Storey Townhouse",
    category: "maisonettes",
    style: "Contemporary Coastal",
    bedrooms: 3,
    bathrooms: 3,
    stories: 2,
    garage: 1,
    area: 180,
    price: 132000,
    rating: 4.7,
    reviews: 19,
    featured: true,
    hero: img("1600585154340-be6161a56a0c", 2400),
    thumbnail: img("1600585154340-be6161a56a0c", 900),
    description:
      "A vertical townhouse designed for a narrow coastal plot — sleeping above, living below, with a rooftop terrace that captures the sea.",
    story: [
      "Maisonettes make sense where land is scarce. The Coastal Maisonette stacks its program vertically: living, dining and kitchen occupy the ground floor and open onto a walled garden; bedrooms sit one floor above; and a private roof terrace caps the whole.",
      "A central stair in white oak is the home's spine, drawing light from a rooflight down through every level. Materials are marine-grade and honest — bleached oak, white render, and brass fittings that will patinate with the salt air.",
    ],
    gallery: [
      { id: "g1", type: "image", src: img("1600585154340-be6161a56a0c", 2000), span: "full", caption: "Street elevation" },
      { id: "g2", type: "image", src: img("1600566753086-00f18fb6b3ea", 1200), span: "tall", caption: "Stair volume" },
      { id: "g3", type: "image", src: img("1493809842364-78817add7ffb", 1200), span: "small", caption: "Living level" },
      { id: "g4", type: "panoramic", src: img("1600607687939-ce8a6c25118c", 2400), span: "wide", caption: "Roof terrace view" },
      { id: "g5", type: "video", src: "LXb3EKWsInQ", poster: img("1600585154340-be6161a56a0c", 1600), span: "wide", caption: "Walkthrough film" },
      { id: "g6", type: "image", src: img("1517823382935-51bfcb0ec6bc", 1200), span: "small", caption: "Bedroom" },
      { id: "g7", type: "image", src: img("1552321554-5fefe8c9ef14", 1200), span: "tall", caption: "Bathroom" },
    ],
    videoTour: {
      src: "LXb3EKWsInQ",
      poster: img("1600585154340-be6161a56a0c", 2000),
      title: "Coastal Maisonette — Walkthrough",
    },
    floorPlans: [
      { label: "Ground Floor", svg: floorPlanGround("Ground Floor") },
      { label: "Upper Floor", svg: floorPlanUpper("Upper Floor") },
    ],
    specifications: [
      { label: "Bedrooms", value: "3" },
      { label: "Bathrooms", value: "3" },
      { label: "Garage", value: "1 Car" },
      { label: "Total Area", value: "180 sqm" },
      { label: "Kitchen", value: "Galley · 16 sqm" },
      { label: "Dining", value: "Open · 12 sqm" },
      { label: "Study", value: "Roof level nook" },
      { label: "Laundry", value: "Utility · 5 sqm" },
    ],
    exterior: [
      img("1600585154340-be6161a56a0c", 1600),
      img("1600566753086-00f18fb6b3ea", 1600),
      img("1600607687939-ce8a6c25118c", 1600),
      img("1564013799919-ab600027ffc6", 1600),
    ],
    interiors: {
      kitchen: img("1600585154526-990dced4db0d", 1400),
      livingRoom: img("1493809842364-78817add7ffb", 1400),
      bedroom: img("1517823382935-51bfcb0ec6bc", 1400),
      bathroom: img("1552321554-5fefe8c9ef14", 1400),
      outdoor: img("1600607687939-ce8a6c25118c", 1400),
    },
    highlights: [
      "Roof terrace with sea view",
      "Central oak stair with rooflight",
      "Marine-grade materials",
      "Walled ground-floor garden",
      "Brass fittings that patinate",
    ],
  },
  {
    id: "4",
    slug: "garden-bungalow",
    name: "The Garden Bungalow",
    tagline: "Single-Storey Family Home",
    category: "bungalows",
    style: "Garden Bungalow",
    bedrooms: 3,
    bathrooms: 2,
    stories: 1,
    garage: 1,
    area: 165,
    price: 118000,
    rating: 4.8,
    reviews: 31,
    featured: true,
    hero: img("1512917774080-9991f1c4c750", 2400),
    thumbnail: img("1512917774080-9991f1c4c750", 900),
    description:
      "A ground-hugging bungalow that wraps around a south-facing garden — designed for ageing in place and indoor-outdoor living.",
    story: [
      "The Garden Bungalow is, above all, a long-term home. Single-storey planning means no stairs to navigate in later life; wide doorways and a level threshold to the terrace make the plan genuinely accessible.",
      "A continuous verandah runs along the south façade, deep enough to sit out on at any time of day. Inside, three bedrooms sit quietly off a central hallway; the living and dining rooms face the garden.",
      "The plan is deliberately ordinary — and that is its quiet virtue. There are no gimmicks, only generous rooms, good light, and a direct relationship to the garden.",
    ],
    gallery: [
      { id: "g1", type: "image", src: img("1512917774080-9991f1c4c750", 2000), span: "full", caption: "Garden elevation" },
      { id: "g2", type: "image", src: img("1564013799919-ab600027ffc6", 1200), span: "tall", caption: "Verandah" },
      { id: "g3", type: "image", src: img("1493809842364-78817add7ffb", 1200), span: "small", caption: "Living" },
      { id: "g4", type: "panoramic", src: img("1600596542815-ffad4c1539a9", 2400), span: "wide", caption: "Site plan" },
      { id: "g5", type: "video", src: "LXb3EKWsInQ", poster: img("1512917774080-9991f1c4c750", 1600), span: "wide", caption: "Walkthrough film" },
      { id: "g6", type: "image", src: img("1556909114-f6e7ad7d3136", 1200), span: "small", caption: "Kitchen" },
      { id: "g7", type: "image", src: img("1505873242700-f289a29e1e0f", 1200), span: "tall", caption: "Bedroom" },
    ],
    videoTour: {
      src: "LXb3EKWsInQ",
      poster: img("1512917774080-9991f1c4c750", 2000),
      title: "Garden Bungalow — Walkthrough",
    },
    floorPlans: [{ label: "Ground Floor", svg: floorPlanSingle("Ground Floor") }],
    specifications: [
      { label: "Bedrooms", value: "3" },
      { label: "Bathrooms", value: "2" },
      { label: "Garage", value: "1 Car" },
      { label: "Total Area", value: "165 sqm" },
      { label: "Kitchen", value: "Open · 18 sqm" },
      { label: "Dining", value: "Open · 12 sqm" },
      { label: "Study", value: "Optional alcove" },
      { label: "Laundry", value: "Utility · 6 sqm" },
    ],
    exterior: [
      img("1512917774080-9991f1c4c750", 1600),
      img("1564013799919-ab600027ffc6", 1600),
      img("1600596542815-ffad4c1539a9", 1600),
      img("1567767292278-a4f21aa2d36e", 1600),
    ],
    interiors: {
      kitchen: img("1556909114-f6e7ad7d3136", 1400),
      livingRoom: img("1493809842364-78817add7ffb", 1400),
      bedroom: img("1505873242700-f289a29e1e0f", 1400),
      bathroom: img("1554995207-c18c203602cb", 1400),
      outdoor: img("1564013799919-ab600027ffc6", 1400),
    },
    highlights: [
      "Fully accessible single-storey plan",
      "South-facing verandah",
      "Level threshold to garden",
      "Wide doorways throughout",
      "Low-maintenance materials",
    ],
  },
  {
    id: "5",
    slug: "courtyard-villa",
    name: "The Courtyard Villa",
    tagline: "Mediterranean Villa",
    category: "villas",
    style: "Mediterranean Villa",
    bedrooms: 5,
    bathrooms: 5,
    stories: 2,
    garage: 3,
    area: 420,
    price: 385000,
    rating: 4.9,
    reviews: 42,
    featured: true,
    hero: img("1600607687939-ce8a6c25118c", 2400),
    thumbnail: img("1600607687939-ce8a6c25118c", 900),
    description:
      "A villa organised around a central courtyard and loggia — shaded, calm, and built for long lunches that drift into the evening.",
    story: [
      "The Courtyard Villa draws on a Mediterranean typology that is several thousand years old: rooms arranged around a shaded central court, with a loggia that mediates between house and garden. Cross-ventilation, deep eaves and a thermal mass wall keep the interior cool without mechanical air-conditioning.",
      "Five bedrooms are split across both floors; the master occupies its own wing with a private terrace. The kitchen, pantry and service spaces are discreetly tucked behind the dining room so that the household can function without disturbing the formal rooms.",
    ],
    gallery: [
      { id: "g1", type: "image", src: img("1600607687939-ce8a6c25118c", 2000), span: "full", caption: "Loggia at dusk" },
      { id: "g2", type: "image", src: img("1600585154340-be6161a56a0c", 1200), span: "tall", caption: "Pool" },
      { id: "g3", type: "image", src: img("1480074568708-e7b720bb3f09", 1200), span: "small", caption: "Living hall" },
      { id: "g4", type: "panoramic", src: img("1613490493576-7fde63acd811", 2400), span: "wide", caption: "Aerial" },
      { id: "g5", type: "video", src: "LXb3EKWsInQ", poster: img("1600607687939-ce8a6c25118c", 1600), span: "wide", caption: "Walkthrough film" },
      { id: "g6", type: "image", src: img("1600210492486-724fe5c67fb0", 1200), span: "small", caption: "Master suite" },
      { id: "g7", type: "image", src: img("1600585154526-990dced4db0d", 1200), span: "tall", caption: "Kitchen" },
    ],
    videoTour: {
      src: "LXb3EKWsInQ",
      poster: img("1600607687939-ce8a6c25118c", 2000),
      title: "Courtyard Villa — Walkthrough",
    },
    floorPlans: [
      { label: "Ground Floor", svg: floorPlanGround("Ground Floor") },
      { label: "Upper Floor", svg: floorPlanUpper("Upper Floor") },
    ],
    specifications: [
      { label: "Bedrooms", value: "5" },
      { label: "Bathrooms", value: "5" },
      { label: "Garage", value: "3 Cars" },
      { label: "Total Area", value: "420 sqm" },
      { label: "Kitchen", value: "Plus Pantry · 28 sqm" },
      { label: "Dining", value: "Formal · 24 sqm" },
      { label: "Study", value: "Library · 18 sqm" },
      { label: "Laundry", value: "Service · 12 sqm" },
    ],
    exterior: [
      img("1600607687939-ce8a6c25118c", 1600),
      img("1600585154340-be6161a56a0c", 1600),
      img("1613490493576-7fde63acd811", 1600),
      img("1600607687644-c7171b42498f", 1600),
    ],
    interiors: {
      kitchen: img("1600585154526-990dced4db0d", 1400),
      livingRoom: img("1480074568708-e7b720bb3f09", 1400),
      bedroom: img("1600210492486-724fe5c67fb0", 1400),
      bathroom: img("1600121848594-d8644e57abab", 1400),
      outdoor: img("1600585154340-be6161a56a0c", 1400),
    },
    highlights: [
      "Central shaded courtyard",
      "Deep loggia with summer kitchen",
      "Cross-ventilation, no AC required",
      "Three-car garage plus service",
      "Master wing with private terrace",
    ],
  },
  {
    id: "6",
    slug: "ashlar-house",
    name: "Ashlar House",
    tagline: "Compact Modern Home",
    category: "small-homes",
    style: "Modern Compact",
    bedrooms: 2,
    bathrooms: 1,
    stories: 1,
    garage: 1,
    area: 96,
    price: 72000,
    rating: 4.6,
    reviews: 27,
    featured: true,
    hero: img("1600566753086-00f18fb6b3ea", 2400),
    thumbnail: img("1600566753086-00f18fb6b3ea", 900),
    description:
      "A 96-square-metre home that proves small does not have to mean cramped — generous ceilings, one big room, two quiet bedrooms.",
    story: [
      "Ashlar House was designed for first-time buyers who refuse to compromise on quality. Every square metre has been earned: the kitchen, dining and living rooms share one generous volume with a 3.6-metre ceiling; the two bedrooms sit behind a single wall of sliding ash doors.",
      "Storage is built in everywhere — there are no wardrobes that eat floor area, only walls that do double duty. The bathroom is generous; the utility is compact. A small deck extends the living room into the garden on summer evenings.",
    ],
    gallery: [
      { id: "g1", type: "image", src: img("1600566753086-00f18fb6b3ea", 2000), span: "full", caption: "Front elevation" },
      { id: "g2", type: "image", src: img("1505691938895-1758d7feb511", 1200), span: "tall", caption: "Living volume" },
      { id: "g3", type: "image", src: img("1556909114-f6e7ad7d3136", 1200), span: "small", caption: "Kitchen" },
      { id: "g4", type: "panoramic", src: img("1512917774080-9991f1c4c750", 2400), span: "wide", caption: "Garden side" },
      { id: "g5", type: "video", src: "LXb3EKWsInQ", poster: img("1600566753086-00f18fb6b3ea", 1600), span: "wide", caption: "Walkthrough film" },
      { id: "g6", type: "image", src: img("1502672260266-1c1ef2d93688", 1200), span: "small", caption: "Bedroom" },
    ],
    videoTour: {
      src: "LXb3EKWsInQ",
      poster: img("1600566753086-00f18fb6b3ea", 2000),
      title: "Ashlar House — Walkthrough",
    },
    floorPlans: [{ label: "Ground Floor", svg: floorPlanSingle("Ground Floor") }],
    specifications: [
      { label: "Bedrooms", value: "2" },
      { label: "Bathrooms", value: "1" },
      { label: "Garage", value: "1 Car" },
      { label: "Total Area", value: "96 sqm" },
      { label: "Kitchen", value: "Open · 14 sqm" },
      { label: "Dining", value: "Open · 10 sqm" },
      { label: "Study", value: "Fold-down desk" },
      { label: "Laundry", value: "Closet · 3 sqm" },
    ],
    exterior: [
      img("1600566753086-00f18fb6b3ea", 1600),
      img("1512917774080-9991f1c4c750", 1600),
      img("1600596542815-ffad4c1539a9", 1600),
      img("1567767292278-a4f21aa2d36e", 1600),
    ],
    interiors: {
      kitchen: img("1556909114-f6e7ad7d3136", 1400),
      livingRoom: img("1505691938895-1758d7feb511", 1400),
      bedroom: img("1502672260266-1c1ef2d93688", 1400),
      bathroom: img("1554995207-c18c203602cb", 1400),
      outdoor: img("1512917774080-9991f1c4c750", 1400),
    },
    highlights: [
      "3.6m ceiling in living volume",
      "Built-in storage throughout",
      "Compact 96 sqm footprint",
      "Garden deck extension",
      "Passive solar orientation",
    ],
  },
  {
    id: "7",
    slug: "linden-mews",
    name: "Linden Mews",
    tagline: "Modern Townhouse",
    category: "maisonettes",
    style: "Urban Modern",
    bedrooms: 3,
    bathrooms: 2,
    stories: 2,
    garage: 1,
    area: 150,
    price: 110000,
    rating: 4.7,
    reviews: 22,
    featured: false,
    hero: img("1564013799919-ab600027ffc6", 2400),
    thumbnail: img("1564013799919-ab600027ffc6", 900),
    description:
      "A narrow-frontage townhouse that turns a tight urban plot into a quiet, light-filled family home.",
    story: [
      "Linden Mews is built to the edge of its boundary on three sides. Where most townhouses would feel dark, a triple-height stairwell with a rooflight pulls daylight deep into the plan.",
      "Living rooms face the street; bedrooms face a private rear courtyard. The ground floor is concrete for thermal mass; the upper floors are timber for warmth and speed of construction.",
    ],
    gallery: [
      { id: "g1", type: "image", src: img("1564013799919-ab600027ffc6", 2000), span: "full", caption: "Street frontage" },
      { id: "g2", type: "image", src: img("1600566753086-00f18fb6b3ea", 1200), span: "tall", caption: "Stair volume" },
      { id: "g3", type: "image", src: img("1493809842364-78817add7ffb", 1200), span: "small", caption: "Living" },
      { id: "g4", type: "video", src: "LXb3EKWsInQ", poster: img("1564013799919-ab600027ffc6", 1600), span: "wide", caption: "Walkthrough film" },
      { id: "g5", type: "image", src: img("1517823382935-51bfcb0ec6bc", 1200), span: "small", caption: "Bedroom" },
    ],
    videoTour: {
      src: "LXb3EKWsInQ",
      poster: img("1564013799919-ab600027ffc6", 2000),
      title: "Linden Mews — Walkthrough",
    },
    floorPlans: [
      { label: "Ground Floor", svg: floorPlanGround("Ground Floor") },
      { label: "Upper Floor", svg: floorPlanUpper("Upper Floor") },
    ],
    specifications: [
      { label: "Bedrooms", value: "3" },
      { label: "Bathrooms", value: "2" },
      { label: "Garage", value: "1 Car" },
      { label: "Total Area", value: "150 sqm" },
      { label: "Kitchen", value: "Galley · 14 sqm" },
      { label: "Dining", value: "Open · 11 sqm" },
      { label: "Study", value: "Mezzanine desk" },
      { label: "Laundry", value: "Closet · 4 sqm" },
    ],
    exterior: [
      img("1564013799919-ab600027ffc6", 1600),
      img("1600566753086-00f18fb6b3ea", 1600),
      img("1600596542815-ffad4c1539a9", 1600),
      img("1567767292278-a4f21aa2d36e", 1600),
    ],
    interiors: {
      kitchen: img("1600585154526-990dced4db0d", 1400),
      livingRoom: img("1493809842364-78817add7ffb", 1400),
      bedroom: img("1517823382935-51bfcb0ec6bc", 1400),
      bathroom: img("1552321554-5fefe8c9ef14", 1400),
      outdoor: img("1564013799919-ab600027ffc6", 1400),
    },
    highlights: [
      "Triple-height stairwell",
      "Thermal mass ground floor",
      "Private rear courtyard",
      "Narrow 6m frontage",
      "Timber upper structure",
    ],
  },
  {
    id: "8",
    slug: "monolith-studio",
    name: "Monolith Studio",
    tagline: "Single-Bedroom Retreat",
    category: "small-homes",
    style: "Modern Minimalist",
    bedrooms: 1,
    bathrooms: 1,
    stories: 1,
    garage: 0,
    area: 62,
    price: 54000,
    rating: 4.5,
    reviews: 17,
    featured: false,
    hero: img("1567767292278-a4f21aa2d36e", 2400),
    thumbnail: img("1567767292278-a4f21aa2d36e", 900),
    description:
      "A 62-square-metre studio retreat designed for a writer — one big room, one quiet bedroom, one long view.",
    story: [
      "Monolith Studio is the smallest house in the catalog and arguably the most rigorous. A single volume contains kitchen, living and workspace; a sleeping alcove sits behind a pivoting oak panel; the bathroom is the only fully enclosed room.",
      "The north wall is a floor-to-ceiling window that frames a single view — chosen on site, not in plan. There is nowhere to hide clutter, which is the point.",
    ],
    gallery: [
      { id: "g1", type: "image", src: img("1567767292278-a4f21aa2d36e", 2000), span: "full", caption: "Front elevation" },
      { id: "g2", type: "image", src: img("1505691938895-1758d7feb511", 1200), span: "tall", caption: "Main volume" },
      { id: "g3", type: "image", src: img("1556909114-f6e7ad7d3136", 1200), span: "small", caption: "Kitchen" },
      { id: "g4", type: "video", src: "LXb3EKWsInQ", poster: img("1567767292278-a4f21aa2d36e", 1600), span: "wide", caption: "Walkthrough film" },
    ],
    videoTour: {
      src: "LXb3EKWsInQ",
      poster: img("1567767292278-a4f21aa2d36e", 2000),
      title: "Monolith Studio — Walkthrough",
    },
    floorPlans: [{ label: "Ground Floor", svg: floorPlanSingle("Ground Floor") }],
    specifications: [
      { label: "Bedrooms", value: "1" },
      { label: "Bathrooms", value: "1" },
      { label: "Garage", value: "Carport" },
      { label: "Total Area", value: "62 sqm" },
      { label: "Kitchen", value: "Open · 10 sqm" },
      { label: "Dining", value: "Open · 8 sqm" },
      { label: "Study", value: "Workspace nook" },
      { label: "Laundry", value: "Closet · 2 sqm" },
    ],
    exterior: [
      img("1567767292278-a4f21aa2d36e", 1600),
      img("1600566753086-00f18fb6b3ea", 1600),
      img("1512917774080-9991f1c4c750", 1600),
      img("1600596542815-ffad4c1539a9", 1600),
    ],
    interiors: {
      kitchen: img("1556909114-f6e7ad7d3136", 1400),
      livingRoom: img("1505691938895-1758d7feb511", 1400),
      bedroom: img("1502672260266-1c1ef2d93688", 1400),
      bathroom: img("1554995207-c18c203602cb", 1400),
      outdoor: img("1567767292278-a4f21aa2d36e", 1400),
    },
    highlights: [
      "Floor-to-ceiling view window",
      "Pivoting oak sleeping panel",
      "62 sqm rigorous footprint",
      "Workspace integrated",
      "No internal corridors",
    ],
  },
  {
    id: "9",
    slug: "verdant-modern",
    name: "Verdant Modern",
    tagline: "Modern Family Home",
    category: "modern",
    style: "Modern Family",
    bedrooms: 4,
    bathrooms: 3,
    stories: 2,
    garage: 2,
    area: 245,
    price: 192000,
    rating: 4.8,
    reviews: 29,
    featured: false,
    hero: img("1600596542815-ffad4c1539a9", 2400),
    thumbnail: img("1600596542815-ffad4c1539a9", 900),
    description:
      "A modern family home wrapped around a protected garden — designed for teenagers, dogs, and a long view of the sky.",
    story: [
      "Verdant Modern splits the typical family home into two wings — sleeping and living — connected by a glazed bridge that hovers above the garden. The split keeps teenage bedrooms away from the living-room noise without putting them on a separate floor.",
      "A flat roof with a deep overhang shades the south-facing glass; a green roof on the garage softens the building's profile from upper-floor windows.",
    ],
    gallery: [
      { id: "g1", type: "image", src: img("1600596542815-ffad4c1539a9", 2000), span: "full", caption: "Garden wing" },
      { id: "g2", type: "image", src: img("1480074568708-e7b720bb3f09", 1200), span: "tall", caption: "Living" },
      { id: "g3", type: "image", src: img("1556909114-f6e7ad7d3136", 1200), span: "small", caption: "Kitchen" },
      { id: "g4", type: "panoramic", src: img("1600585154340-be6161a56a0c", 2400), span: "wide", caption: "Site" },
      { id: "g5", type: "video", src: "LXb3EKWsInQ", poster: img("1600596542815-ffad4c1539a9", 1600), span: "wide", caption: "Walkthrough film" },
      { id: "g6", type: "image", src: img("1600210492486-724fe5c67fb0", 1200), span: "small", caption: "Master" },
    ],
    videoTour: {
      src: "LXb3EKWsInQ",
      poster: img("1600596542815-ffad4c1539a9", 2000),
      title: "Verdant Modern — Walkthrough",
    },
    floorPlans: [
      { label: "Ground Floor", svg: floorPlanGround("Ground Floor") },
      { label: "Upper Floor", svg: floorPlanUpper("Upper Floor") },
    ],
    specifications: [
      { label: "Bedrooms", value: "4" },
      { label: "Bathrooms", value: "3" },
      { label: "Garage", value: "2 Cars" },
      { label: "Total Area", value: "245 sqm" },
      { label: "Kitchen", value: "Island · 20 sqm" },
      { label: "Dining", value: "Open · 14 sqm" },
      { label: "Study", value: "Bridge office" },
      { label: "Laundry", value: "Utility · 6 sqm" },
    ],
    exterior: [
      img("1600596542815-ffad4c1539a9", 1600),
      img("1600585154340-be6161a56a0c", 1600),
      img("1480074568708-e7b720bb3f09", 1600),
      img("1512917774080-9991f1c4c750", 1600),
    ],
    interiors: {
      kitchen: img("1556909114-f6e7ad7d3136", 1400),
      livingRoom: img("1480074568708-e7b720bb3f09", 1400),
      bedroom: img("1600210492486-724fe5c67fb0", 1400),
      bathroom: img("1600121848594-d8644e57abab", 1400),
      outdoor: img("1600585154340-be6161a56a0c", 1400),
    },
    highlights: [
      "Glazed bridge connector",
      "Deep south overhang",
      "Green roof on garage",
      "Two-wing split plan",
      "Teenage wing acoustics",
    ],
  },
  {
    id: "10",
    slug: "marlowe-bungalow",
    name: "Marlowe Bungalow",
    tagline: "Single-Storey Garden Home",
    category: "bungalows",
    style: "Modern Bungalow",
    bedrooms: 2,
    bathrooms: 2,
    stories: 1,
    garage: 1,
    area: 140,
    price: 102000,
    rating: 4.7,
    reviews: 18,
    featured: false,
    hero: img("1512917774080-9991f1c4c750", 2400),
    thumbnail: img("1512917774080-9991f1c4c750", 900),
    description:
      "A two-bedroom bungalow with an L-shaped plan that cradles a private garden — perfect as a starter home or downsizer.",
    story: [
      "The Marlowe Bungalow's L-shape creates a sheltered garden court on the south-east corner, protected from prevailing winds and overlooked only by the living room and master bedroom.",
      "Two bedrooms and two bathrooms make it flexible — a guest suite doubles as a home office; the laundry is full-height and could become a third bedroom should the family grow.",
    ],
    gallery: [
      { id: "g1", type: "image", src: img("1512917774080-9991f1c4c750", 2000), span: "full", caption: "L-shaped elevation" },
      { id: "g2", type: "image", src: img("1564013799919-ab600027ffc6", 1200), span: "tall", caption: "Garden court" },
      { id: "g3", type: "image", src: img("1493809842364-78817add7ffb", 1200), span: "small", caption: "Living" },
      { id: "g4", type: "video", src: "LXb3EKWsInQ", poster: img("1512917774080-9991f1c4c750", 1600), span: "wide", caption: "Walkthrough film" },
    ],
    videoTour: {
      src: "LXb3EKWsInQ",
      poster: img("1512917774080-9991f1c4c750", 2000),
      title: "Marlowe Bungalow — Walkthrough",
    },
    floorPlans: [{ label: "Ground Floor", svg: floorPlanSingle("Ground Floor") }],
    specifications: [
      { label: "Bedrooms", value: "2" },
      { label: "Bathrooms", value: "2" },
      { label: "Garage", value: "1 Car" },
      { label: "Total Area", value: "140 sqm" },
      { label: "Kitchen", value: "Open · 16 sqm" },
      { label: "Dining", value: "Open · 11 sqm" },
      { label: "Study", value: "Guest suite flex" },
      { label: "Laundry", value: "Full · 7 sqm" },
    ],
    exterior: [
      img("1512917774080-9991f1c4c750", 1600),
      img("1564013799919-ab600027ffc6", 1600),
      img("1600596542815-ffad4c1539a9", 1600),
      img("1567767292278-a4f21aa2d36e", 1600),
    ],
    interiors: {
      kitchen: img("1600585154526-990dced4db0d", 1400),
      livingRoom: img("1493809842364-78817add7ffb", 1400),
      bedroom: img("1505873242700-f289a29e1e0f", 1400),
      bathroom: img("1552321554-5fefe8c9ef14", 1400),
      outdoor: img("1564013799919-ab600027ffc6", 1400),
    },
    highlights: [
      "L-shaped protected garden",
      "Flexible guest suite",
      "Single-storey accessibility",
      "Full-height laundry",
      "South-east orientation",
    ],
  },
  {
    id: "11",
    slug: "petra-villa",
    name: "Petra Villa",
    tagline: "Hillside Luxury Villa",
    category: "luxury",
    style: "Hillside Luxury",
    bedrooms: 5,
    bathrooms: 6,
    stories: 3,
    garage: 3,
    area: 510,
    price: 510000,
    rating: 5.0,
    reviews: 14,
    featured: false,
    hero: img("1600585154340-be6161a56a0c", 2400),
    thumbnail: img("1600585154340-be6161a56a0c", 900),
    description:
      "A three-storey hillside villa cut into the slope — every level has a 270° view, the lowest hosts a spa and wine cellar.",
    story: [
      "Petra Villa is the catalog's most ambitious residence. Built into a 30-degree slope, the home steps down the hillside in three concrete platforms — each one opening onto a terrace that becomes the roof of the level below.",
      "The top floor is given over to living and entertaining; the middle floor to bedrooms; the lowest floor, half-buried in the hillside, houses the spa, gym, wine cellar and cinema. A glass elevator threads all three.",
    ],
    gallery: [
      { id: "g1", type: "image", src: img("1600585154340-be6161a56a0c", 2000), span: "full", caption: "Hillside elevation" },
      { id: "g2", type: "image", src: img("1613490493576-7fde63acd811", 1200), span: "tall", caption: "Pool terrace" },
      { id: "g3", type: "image", src: img("1480074568708-e7b720bb3f09", 1200), span: "small", caption: "Living hall" },
      { id: "g4", type: "panoramic", src: img("1600607687939-ce8a6c25118c", 2400), span: "wide", caption: "Site panorama" },
      { id: "g5", type: "video", src: "LXb3EKWsInQ", poster: img("1600585154340-be6161a56a0c", 1600), span: "wide", caption: "Walkthrough film" },
      { id: "g6", type: "image", src: img("1600210492486-724fe5c67fb0", 1200), span: "small", caption: "Master" },
      { id: "g7", type: "image", src: img("1600121848594-d8644e57abab", 1200), span: "tall", caption: "Spa" },
    ],
    videoTour: {
      src: "LXb3EKWsInQ",
      poster: img("1600585154340-be6161a56a0c", 2000),
      title: "Petra Villa — Walkthrough",
    },
    floorPlans: [
      { label: "Ground Floor", svg: floorPlanGround("Ground Floor") },
      { label: "Upper Floor", svg: floorPlanUpper("Upper Floor") },
    ],
    specifications: [
      { label: "Bedrooms", value: "5" },
      { label: "Bathrooms", value: "6" },
      { label: "Garage", value: "3 Cars" },
      { label: "Total Area", value: "510 sqm" },
      { label: "Kitchen", value: "Plus Pantry · 30 sqm" },
      { label: "Dining", value: "Formal · 26 sqm" },
      { label: "Study", value: "Library · 20 sqm" },
      { label: "Laundry", value: "Service · 14 sqm" },
    ],
    exterior: [
      img("1600585154340-be6161a56a0c", 1600),
      img("1613490493576-7fde63acd811", 1600),
      img("1600607687939-ce8a6c25118c", 1600),
      img("1600607687644-c7171b42498f", 1600),
    ],
    interiors: {
      kitchen: img("1600585154526-990dced4db0d", 1400),
      livingRoom: img("1480074568708-e7b720bb3f09", 1400),
      bedroom: img("1600210492486-724fe5c67fb0", 1400),
      bathroom: img("1600121848594-d8644e57abab", 1400),
      outdoor: img("1613490493576-7fde63acd811", 1400),
    },
    highlights: [
      "Three stepped concrete platforms",
      "Glass elevator between floors",
      "Spa, gym, wine cellar, cinema",
      "270° view from every level",
      "Buried lower floor for thermal mass",
    ],
  },
  {
    id: "12",
    slug: "olive-courtyard",
    name: "Olive Courtyard",
    tagline: "Mediterranean Family Villa",
    category: "villas",
    style: "Mediterranean Villa",
    bedrooms: 4,
    bathrooms: 4,
    stories: 1,
    garage: 2,
    area: 280,
    price: 225000,
    rating: 4.8,
    reviews: 26,
    featured: false,
    hero: img("1600607687939-ce8a6c25118c", 2400),
    thumbnail: img("1600607687939-ce8a6c25118c", 900),
    description:
      "A single-storey villa organised around an existing olive tree — the courtyard is the house, the rooms are its edges.",
    story: [
      "Olive Courtyard was designed around a 200-year-old olive tree on the site. The house forms a U around the tree, with every principal room opening onto a shaded loggia that faces the courtyard.",
      "The plan is single-storey for accessibility and thermal stability — thick lime-rendered walls keep the interior cool in summer, warm in winter. A separate studio above the garage provides a guest suite or home office.",
    ],
    gallery: [
      { id: "g1", type: "image", src: img("1600607687939-ce8a6c25118c", 2000), span: "full", caption: "Loggia" },
      { id: "g2", type: "image", src: img("1600585154340-be6161a56a0c", 1200), span: "tall", caption: "Courtyard" },
      { id: "g3", type: "image", src: img("1480074568708-e7b720bb3f09", 1200), span: "small", caption: "Living" },
      { id: "g4", type: "panoramic", src: img("1613490493576-7fde63acd811", 2400), span: "wide", caption: "Aerial" },
      { id: "g5", type: "video", src: "LXb3EKWsInQ", poster: img("1600607687939-ce8a6c25118c", 1600), span: "wide", caption: "Walkthrough film" },
      { id: "g6", type: "image", src: img("1600210492486-724fe5c67fb0", 1200), span: "small", caption: "Master" },
    ],
    videoTour: {
      src: "LXb3EKWsInQ",
      poster: img("1600607687939-ce8a6c25118c", 2000),
      title: "Olive Courtyard — Walkthrough",
    },
    floorPlans: [{ label: "Ground Floor", svg: floorPlanSingle("Ground Floor") }],
    specifications: [
      { label: "Bedrooms", value: "4" },
      { label: "Bathrooms", value: "4" },
      { label: "Garage", value: "2 Cars + Studio" },
      { label: "Total Area", value: "280 sqm" },
      { label: "Kitchen", value: "Plus Pantry · 24 sqm" },
      { label: "Dining", value: "Open · 18 sqm" },
      { label: "Study", value: "Garage studio" },
      { label: "Laundry", value: "Utility · 8 sqm" },
    ],
    exterior: [
      img("1600607687939-ce8a6c25118c", 1600),
      img("1600585154340-be6161a56a0c", 1600),
      img("1613490493576-7fde63acd811", 1600),
      img("1600607687644-c7171b42498f", 1600),
    ],
    interiors: {
      kitchen: img("1600585154526-990dced4db0d", 1400),
      livingRoom: img("1480074568708-e7b720bb3f09", 1400),
      bedroom: img("1600210492486-724fe5c67fb0", 1400),
      bathroom: img("1600121848594-d8644e57abab", 1400),
      outdoor: img("1600585154340-be6161a56a0c", 1400),
    },
    highlights: [
      "Designed around 200-year olive",
      "U-plan with central courtyard",
      "Lime-render thermal walls",
      "Guest studio above garage",
      "Single-storey accessibility",
    ],
  },
];

export const getFeaturedHouses = () => HOUSES.filter((h) => h.featured);
export const getHouseBySlug = (slug?: string) =>
  HOUSES.find((h) => h.slug === slug);
export const getHousesByCategory = (cat: string) =>
  HOUSES.filter((h) => h.category === cat);
export const getSimilarHouses = (house: House, count = 4) =>
  HOUSES.filter(
    (h) => h.id !== house.id && (h.category === house.category || h.style === house.style)
  ).slice(0, count);
