// data.js
// ---------------------------------------------------------------------------
// THE STACK ONTOLOGY (seed dataset / "moat" layer).
// This file is the portable knowledge layer for the Idea-to-Reality engine.
// Everything visual in app.js is just a renderer over this data, so adding or
// editing an artifact here is all you need to do to update the live map.
//
// Each artifact answers two questions for the ease x completeness map:
//   - completeness (0-100): how much of this artifact can an AI + human
//                           pipeline take end-to-end today?
//   - ease (0-100):         how little real-world friction (cost, robotics,
//                           regulation, physical coupling) stands in the way?
//
// Each artifact also carries its production graph (`steps`), where every step
// names the stage, the best current tool/agent, and a fulfillment % for how
// much of that step AI can do unaided. app.js rolls these up in the detail
// panel and uses them to show the human-in-the-loop gaps.
// ---------------------------------------------------------------------------

// Domains are used for colour-coding and legend filtering in app.js (see
// app.js -> DOMAIN_COLORS and the legend toggle logic).
const DOMAINS = {
  text: "Text",
  visual: "Visual",
  audio: "Audio",
  software: "Software",
  physical: "Physical",
};

// Stage labels reuse the original 2020 canvas spine: generate -> validate ->
// execute. app.js groups a detail panel's steps by these keys.
const STAGES = {
  generate: "Generate",
  validate: "Validate",
  execute: "Execute",
};

// The seed artifacts. `aiReadyYear` is the (estimated) year an artifact crosses
// the "AI can complete it end-to-end" frontier; app.js uses it to drive the
// frontier-year slider that lights dots up over time.
const ARTIFACTS = [
  {
    id: "blog-post",
    name: "Blog post / essay",
    domain: "text",
    completeness: 97,
    ease: 95,
    humanTouchpoints: 1,
    aiReadyYear: 2023,
    steps: [
      { stage: "generate", name: "Outline + angle", tool: "LLM (Claude/GPT)", fulfillment: 95 },
      { stage: "validate", name: "Fact-check + edit", tool: "LLM + human review", fulfillment: 85 },
      { stage: "execute", name: "Publish to web", tool: "Static site / CMS API", fulfillment: 98 },
    ],
  },
  {
    id: "ebook",
    name: "eBook",
    domain: "text",
    completeness: 95,
    ease: 88,
    humanTouchpoints: 2,
    aiReadyYear: 2024,
    steps: [
      { stage: "generate", name: "Chapter drafting", tool: "LLM long-context", fulfillment: 90 },
      { stage: "generate", name: "Cover art", tool: "Text-to-image", fulfillment: 92 },
      { stage: "validate", name: "Developmental edit", tool: "Human + LLM", fulfillment: 70 },
      { stage: "execute", name: "EPUB build + distribute", tool: "Pandoc / KDP API", fulfillment: 95 },
    ],
  },
  {
    id: "illustrated-book",
    name: "Illustrated book",
    domain: "visual",
    completeness: 90,
    ease: 76,
    humanTouchpoints: 3,
    aiReadyYear: 2025,
    steps: [
      { stage: "generate", name: "Story + script", tool: "LLM", fulfillment: 90 },
      { stage: "generate", name: "Consistent illustrations", tool: "T2I + character refs", fulfillment: 78 },
      { stage: "validate", name: "Art direction pass", tool: "Human", fulfillment: 55 },
      { stage: "execute", name: "Layout + print-ready PDF", tool: "InDesign script / API", fulfillment: 88 },
    ],
  },
  {
    id: "physical-book",
    name: "Physical print book",
    domain: "physical",
    completeness: 90,
    ease: 55,
    humanTouchpoints: 3,
    aiReadyYear: 2025,
    steps: [
      { stage: "generate", name: "Manuscript + cover", tool: "LLM + T2I", fulfillment: 90 },
      { stage: "validate", name: "Proof copy review", tool: "Human", fulfillment: 60 },
      { stage: "execute", name: "Print-on-demand order", tool: "Lulu / KDP print API", fulfillment: 80 },
      { stage: "execute", name: "Ship to reader", tool: "Logistics (real world)", fulfillment: 70 },
    ],
  },
  {
    id: "song",
    name: "Song (recorded)",
    domain: "audio",
    completeness: 88,
    ease: 82,
    humanTouchpoints: 2,
    aiReadyYear: 2024,
    steps: [
      { stage: "generate", name: "Lyrics + melody", tool: "LLM + Suno/Udio", fulfillment: 88 },
      { stage: "generate", name: "Full production", tool: "Generative audio", fulfillment: 85 },
      { stage: "validate", name: "Taste / mix pass", tool: "Human + AI master", fulfillment: 65 },
      { stage: "execute", name: "Distribute (DSPs)", tool: "DistroKid API", fulfillment: 95 },
    ],
  },
  {
    id: "trailer",
    name: "Short film / trailer",
    domain: "visual",
    completeness: 70,
    ease: 58,
    humanTouchpoints: 4,
    aiReadyYear: 2026,
    steps: [
      { stage: "generate", name: "Script + storyboard", tool: "LLM", fulfillment: 90 },
      { stage: "generate", name: "Shots", tool: "Text-to-video (Veo/Sora)", fulfillment: 65 },
      { stage: "validate", name: "Continuity + edit", tool: "Human + NLE", fulfillment: 45 },
      { stage: "execute", name: "Sound + final render", tool: "Generative audio + render", fulfillment: 70 },
    ],
  },
  {
    id: "brand-identity",
    name: "Brand identity",
    domain: "visual",
    completeness: 85,
    ease: 80,
    humanTouchpoints: 2,
    aiReadyYear: 2025,
    steps: [
      { stage: "generate", name: "Naming + positioning", tool: "LLM", fulfillment: 88 },
      { stage: "generate", name: "Logo + system", tool: "T2I + vector tools", fulfillment: 75 },
      { stage: "validate", name: "Stakeholder sign-off", tool: "Human", fulfillment: 50 },
      { stage: "execute", name: "Brand guide export", tool: "Templated docs", fulfillment: 90 },
    ],
  },
  {
    id: "online-course",
    name: "Online course",
    domain: "text",
    completeness: 88,
    ease: 74,
    humanTouchpoints: 3,
    aiReadyYear: 2025,
    steps: [
      { stage: "generate", name: "Curriculum + scripts", tool: "LLM", fulfillment: 90 },
      { stage: "generate", name: "Video / avatar lessons", tool: "HeyGen / TTS", fulfillment: 72 },
      { stage: "validate", name: "Pedagogy review", tool: "Human", fulfillment: 55 },
      { stage: "execute", name: "Publish to LMS", tool: "Teachable API", fulfillment: 92 },
    ],
  },
  {
    id: "saas-app",
    name: "SaaS web app",
    domain: "software",
    completeness: 80,
    ease: 70,
    humanTouchpoints: 4,
    aiReadyYear: 2026,
    steps: [
      { stage: "generate", name: "Spec + UX", tool: "LLM + design tools", fulfillment: 85 },
      { stage: "generate", name: "Implementation", tool: "Codex / agentic coding", fulfillment: 78 },
      { stage: "validate", name: "Tests + review", tool: "AI tests + human QA", fulfillment: 70 },
      { stage: "execute", name: "Deploy + monitor", tool: "Vercel / CI", fulfillment: 88 },
    ],
  },
  {
    id: "furniture",
    name: "Furniture (CNC)",
    domain: "physical",
    completeness: 55,
    ease: 45,
    humanTouchpoints: 5,
    aiReadyYear: 2028,
    steps: [
      { stage: "generate", name: "Parametric design", tool: "LLM + CAD", fulfillment: 75 },
      { stage: "validate", name: "Structural check", tool: "Simulation + human", fulfillment: 55 },
      { stage: "execute", name: "CNC / fabrication", tool: "CNC (semi-auto)", fulfillment: 50 },
      { stage: "execute", name: "Assembly + finish", tool: "Human (manual)", fulfillment: 25 },
    ],
  },
  {
    id: "live-event",
    name: "Live event",
    domain: "physical",
    completeness: 45,
    ease: 40,
    humanTouchpoints: 6,
    aiReadyYear: 2030,
    steps: [
      { stage: "generate", name: "Concept + run-of-show", tool: "LLM", fulfillment: 85 },
      { stage: "validate", name: "Venue + logistics", tool: "Human + agents", fulfillment: 40 },
      { stage: "execute", name: "Physical production", tool: "Human teams", fulfillment: 20 },
      { stage: "execute", name: "Run the event", tool: "Human (real world)", fulfillment: 10 },
    ],
  },
  {
    id: "house-design",
    name: "House (design)",
    domain: "physical",
    completeness: 65,
    ease: 35,
    humanTouchpoints: 5,
    aiReadyYear: 2029,
    steps: [
      { stage: "generate", name: "Concept + renders", tool: "LLM + T2I + CAD", fulfillment: 80 },
      { stage: "validate", name: "Code / permit compliance", tool: "Human architect", fulfillment: 45 },
      { stage: "execute", name: "Construction docs", tool: "BIM (semi-auto)", fulfillment: 55 },
    ],
  },
  {
    id: "house-built",
    name: "House (built)",
    domain: "physical",
    completeness: 25,
    ease: 15,
    humanTouchpoints: 9,
    aiReadyYear: 2040,
    steps: [
      { stage: "generate", name: "Design package", tool: "AI design (see House design)", fulfillment: 70 },
      { stage: "validate", name: "Permits + inspections", tool: "Human + regulators", fulfillment: 20 },
      { stage: "execute", name: "Site build", tool: "Construction robotics (early)", fulfillment: 15 },
      { stage: "execute", name: "Trades + finishing", tool: "Human labour", fulfillment: 10 },
    ],
  },
  {
    id: "new-drug",
    name: "New drug",
    domain: "physical",
    completeness: 20,
    ease: 8,
    humanTouchpoints: 10,
    aiReadyYear: 2045,
    steps: [
      { stage: "generate", name: "Candidate discovery", tool: "AI (AlphaFold-class)", fulfillment: 70 },
      { stage: "validate", name: "Clinical trials", tool: "Human + regulated", fulfillment: 10 },
      { stage: "execute", name: "Manufacture + approval", tool: "Human + FDA", fulfillment: 8 },
    ],
  },
  {
    id: "spacecraft",
    name: "Spacecraft",
    domain: "physical",
    completeness: 15,
    ease: 5,
    humanTouchpoints: 12,
    aiReadyYear: 2050,
    steps: [
      { stage: "generate", name: "Mission + design", tool: "AI-assisted engineering", fulfillment: 60 },
      { stage: "validate", name: "Qualification testing", tool: "Human + facilities", fulfillment: 12 },
      { stage: "execute", name: "Fabricate + launch", tool: "Human + heavy industry", fulfillment: 5 },
    ],
  },
];

// Exposed on window so app.js (loaded after this file in index.html) can read
// the dataset without a module bundler — keeps GitHub Pages hosting build-free.
window.IRS_DATA = { DOMAINS, STAGES, ARTIFACTS };
