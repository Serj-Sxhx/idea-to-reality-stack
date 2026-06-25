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

  // --- Text ---------------------------------------------------------------
  {
    id: "newsletter",
    name: "Newsletter issue",
    domain: "text",
    completeness: 96,
    ease: 94,
    humanTouchpoints: 1,
    aiReadyYear: 2023,
    steps: [
      { stage: "generate", name: "Curate + draft", tool: "LLM + RSS/search", fulfillment: 92 },
      { stage: "validate", name: "Tone + link check", tool: "LLM + human skim", fulfillment: 80 },
      { stage: "execute", name: "Send to list", tool: "Resend / Substack API", fulfillment: 97 },
    ],
  },
  {
    id: "research-report",
    name: "Research report",
    domain: "text",
    completeness: 85,
    ease: 87,
    humanTouchpoints: 2,
    aiReadyYear: 2024,
    steps: [
      { stage: "generate", name: "Source gathering", tool: "Deep research agent", fulfillment: 82 },
      { stage: "generate", name: "Synthesis + draft", tool: "LLM long-context", fulfillment: 80 },
      { stage: "validate", name: "Fact + citation audit", tool: "Human + LLM", fulfillment: 60 },
      { stage: "execute", name: "Format + publish", tool: "Templated docs", fulfillment: 95 },
    ],
  },
  {
    id: "novel",
    name: "Novel (full-length)",
    domain: "text",
    completeness: 76,
    ease: 80,
    humanTouchpoints: 3,
    aiReadyYear: 2025,
    steps: [
      { stage: "generate", name: "Plot + character bible", tool: "LLM", fulfillment: 85 },
      { stage: "generate", name: "Draft chapters", tool: "LLM long-context", fulfillment: 72 },
      { stage: "validate", name: "Coherence + voice edit", tool: "Human", fulfillment: 45 },
      { stage: "execute", name: "Publish (KDP/EPUB)", tool: "Pandoc / KDP API", fulfillment: 95 },
    ],
  },
  {
    id: "resume",
    name: "Resume / CV",
    domain: "text",
    completeness: 97,
    ease: 97,
    humanTouchpoints: 1,
    aiReadyYear: 2023,
    steps: [
      { stage: "generate", name: "Draft from history", tool: "LLM", fulfillment: 95 },
      { stage: "validate", name: "Truth + tailoring", tool: "Human", fulfillment: 75 },
      { stage: "execute", name: "Export PDF", tool: "Templated docs", fulfillment: 99 },
    ],
  },

  // --- Visual -------------------------------------------------------------
  {
    id: "social-pack",
    name: "Social content pack",
    domain: "visual",
    completeness: 92,
    ease: 90,
    humanTouchpoints: 1,
    aiReadyYear: 2024,
    steps: [
      { stage: "generate", name: "Copy + captions", tool: "LLM", fulfillment: 93 },
      { stage: "generate", name: "Graphics + thumbnails", tool: "T2I + templates", fulfillment: 85 },
      { stage: "execute", name: "Schedule + post", tool: "Buffer / API", fulfillment: 92 },
    ],
  },
  {
    id: "infographic",
    name: "Infographic / data viz",
    domain: "visual",
    completeness: 88,
    ease: 86,
    humanTouchpoints: 2,
    aiReadyYear: 2024,
    steps: [
      { stage: "generate", name: "Data + narrative", tool: "LLM + code", fulfillment: 85 },
      { stage: "generate", name: "Layout + charts", tool: "Charting libs + T2I", fulfillment: 82 },
      { stage: "validate", name: "Accuracy check", tool: "Human", fulfillment: 60 },
      { stage: "execute", name: "Export asset", tool: "SVG/PNG render", fulfillment: 95 },
    ],
  },
  {
    id: "3d-asset",
    name: "3D model / game asset",
    domain: "visual",
    completeness: 68,
    ease: 66,
    humanTouchpoints: 3,
    aiReadyYear: 2026,
    steps: [
      { stage: "generate", name: "Concept", tool: "LLM + T2I", fulfillment: 85 },
      { stage: "generate", name: "Mesh + texture", tool: "Text-to-3D (early)", fulfillment: 58 },
      { stage: "validate", name: "Topology cleanup", tool: "Human + DCC tools", fulfillment: 45 },
      { stage: "execute", name: "Export rig-ready", tool: "Blender script", fulfillment: 70 },
    ],
  },
  {
    id: "explainer-video",
    name: "Animated explainer",
    domain: "visual",
    completeness: 73,
    ease: 68,
    humanTouchpoints: 3,
    aiReadyYear: 2026,
    steps: [
      { stage: "generate", name: "Script + storyboard", tool: "LLM", fulfillment: 90 },
      { stage: "generate", name: "Animation + VO", tool: "T2V + TTS", fulfillment: 68 },
      { stage: "validate", name: "Timing + polish", tool: "Human + NLE", fulfillment: 50 },
      { stage: "execute", name: "Render + upload", tool: "Render + YouTube API", fulfillment: 85 },
    ],
  },
  {
    id: "feature-film",
    name: "Feature film",
    domain: "visual",
    completeness: 42,
    ease: 38,
    humanTouchpoints: 7,
    aiReadyYear: 2030,
    steps: [
      { stage: "generate", name: "Screenplay", tool: "LLM", fulfillment: 80 },
      { stage: "generate", name: "Shots + VFX", tool: "Text-to-video", fulfillment: 45 },
      { stage: "validate", name: "Direction + edit", tool: "Human director", fulfillment: 25 },
      { stage: "execute", name: "Score + distribution", tool: "Gen audio + distributor", fulfillment: 40 },
    ],
  },

  // --- Audio --------------------------------------------------------------
  {
    id: "podcast",
    name: "Podcast episode",
    domain: "audio",
    completeness: 85,
    ease: 83,
    humanTouchpoints: 2,
    aiReadyYear: 2024,
    steps: [
      { stage: "generate", name: "Research + script", tool: "LLM", fulfillment: 90 },
      { stage: "generate", name: "Voices", tool: "TTS (multi-speaker)", fulfillment: 82 },
      { stage: "validate", name: "Edit + taste", tool: "Human + auto-edit", fulfillment: 60 },
      { stage: "execute", name: "Publish to feeds", tool: "RSS / hosting API", fulfillment: 95 },
    ],
  },
  {
    id: "audiobook",
    name: "Audiobook",
    domain: "audio",
    completeness: 88,
    ease: 85,
    humanTouchpoints: 1,
    aiReadyYear: 2024,
    steps: [
      { stage: "generate", name: "Narration", tool: "TTS (cloned voice)", fulfillment: 88 },
      { stage: "validate", name: "Pronunciation pass", tool: "Human + LLM", fulfillment: 65 },
      { stage: "execute", name: "Master + distribute", tool: "ACX / API", fulfillment: 90 },
    ],
  },
  {
    id: "music-album",
    name: "Music album",
    domain: "audio",
    completeness: 80,
    ease: 76,
    humanTouchpoints: 3,
    aiReadyYear: 2025,
    steps: [
      { stage: "generate", name: "Composition + lyrics", tool: "LLM + Suno/Udio", fulfillment: 85 },
      { stage: "generate", name: "Production (12 tracks)", tool: "Generative audio", fulfillment: 80 },
      { stage: "validate", name: "Mix/master + curation", tool: "Human + AI master", fulfillment: 55 },
      { stage: "execute", name: "Release to DSPs", tool: "DistroKid API", fulfillment: 95 },
    ],
  },

  // --- Software -----------------------------------------------------------
  {
    id: "chatbot-agent",
    name: "AI agent / chatbot",
    domain: "software",
    completeness: 84,
    ease: 80,
    humanTouchpoints: 2,
    aiReadyYear: 2025,
    steps: [
      { stage: "generate", name: "Prompt + tool design", tool: "LLM", fulfillment: 88 },
      { stage: "generate", name: "Build + integrate", tool: "Agentic coding", fulfillment: 82 },
      { stage: "validate", name: "Eval + guardrails", tool: "Auto-evals + human", fulfillment: 65 },
      { stage: "execute", name: "Deploy", tool: "Serverless / API", fulfillment: 90 },
    ],
  },
  {
    id: "mobile-app",
    name: "Mobile app",
    domain: "software",
    completeness: 70,
    ease: 62,
    humanTouchpoints: 4,
    aiReadyYear: 2026,
    steps: [
      { stage: "generate", name: "Spec + UX", tool: "LLM + design tools", fulfillment: 82 },
      { stage: "generate", name: "Build (iOS/Android)", tool: "Agentic coding", fulfillment: 72 },
      { stage: "validate", name: "Device QA", tool: "Human + emulators", fulfillment: 55 },
      { stage: "execute", name: "App store submit", tool: "Store APIs (review gate)", fulfillment: 60 },
    ],
  },
  {
    id: "indie-game",
    name: "Indie game (2D)",
    domain: "software",
    completeness: 60,
    ease: 56,
    humanTouchpoints: 5,
    aiReadyYear: 2027,
    steps: [
      { stage: "generate", name: "Design + art + audio", tool: "LLM + T2I + gen audio", fulfillment: 70 },
      { stage: "generate", name: "Engine implementation", tool: "Agentic coding", fulfillment: 65 },
      { stage: "validate", name: "Playtest + balance", tool: "Human", fulfillment: 35 },
      { stage: "execute", name: "Ship to Steam/itch", tool: "Store APIs", fulfillment: 70 },
    ],
  },

  // --- Physical -----------------------------------------------------------
  {
    id: "merch",
    name: "T-shirt / merch (POD)",
    domain: "physical",
    completeness: 80,
    ease: 70,
    humanTouchpoints: 2,
    aiReadyYear: 2025,
    steps: [
      { stage: "generate", name: "Design", tool: "T2I + vectorize", fulfillment: 88 },
      { stage: "validate", name: "Mockup approval", tool: "Human", fulfillment: 65 },
      { stage: "execute", name: "Print-on-demand fulfil", tool: "Printful API", fulfillment: 78 },
    ],
  },
  {
    id: "3d-print",
    name: "3D-printed object",
    domain: "physical",
    completeness: 58,
    ease: 50,
    humanTouchpoints: 4,
    aiReadyYear: 2027,
    steps: [
      { stage: "generate", name: "Parametric model", tool: "LLM + CAD / text-to-3D", fulfillment: 70 },
      { stage: "validate", name: "Printability check", tool: "Slicer + human", fulfillment: 55 },
      { stage: "execute", name: "Print", tool: "3D printer (semi-auto)", fulfillment: 55 },
      { stage: "execute", name: "Post-process", tool: "Human (manual)", fulfillment: 30 },
    ],
  },
  {
    id: "board-game",
    name: "Board game (physical)",
    domain: "physical",
    completeness: 56,
    ease: 52,
    humanTouchpoints: 4,
    aiReadyYear: 2027,
    steps: [
      { stage: "generate", name: "Rules + art", tool: "LLM + T2I", fulfillment: 78 },
      { stage: "validate", name: "Playtest balance", tool: "Human", fulfillment: 35 },
      { stage: "execute", name: "Manufacture + ship", tool: "Print-run vendor API", fulfillment: 60 },
    ],
  },
  {
    id: "gadget",
    name: "Electronic gadget",
    domain: "physical",
    completeness: 38,
    ease: 30,
    humanTouchpoints: 6,
    aiReadyYear: 2030,
    steps: [
      { stage: "generate", name: "Schematic + firmware", tool: "LLM + EDA tools", fulfillment: 65 },
      { stage: "validate", name: "Prototype + test", tool: "Human + bench", fulfillment: 35 },
      { stage: "execute", name: "PCB fab + assembly", tool: "PCB service (partial)", fulfillment: 40 },
      { stage: "execute", name: "Enclosure + QA", tool: "Human", fulfillment: 20 },
    ],
  },
  {
    id: "restaurant-meal",
    name: "Restaurant meal",
    domain: "physical",
    completeness: 30,
    ease: 34,
    humanTouchpoints: 6,
    aiReadyYear: 2032,
    steps: [
      { stage: "generate", name: "Recipe + plating", tool: "LLM", fulfillment: 85 },
      { stage: "validate", name: "Taste + iterate", tool: "Human chef", fulfillment: 20 },
      { stage: "execute", name: "Cook", tool: "Kitchen robotics (early)", fulfillment: 25 },
      { stage: "execute", name: "Serve", tool: "Human (real world)", fulfillment: 15 },
    ],
  },
  {
    id: "car",
    name: "Car",
    domain: "physical",
    completeness: 18,
    ease: 10,
    humanTouchpoints: 11,
    aiReadyYear: 2045,
    steps: [
      { stage: "generate", name: "Design + engineering", tool: "AI-assisted CAD/CAE", fulfillment: 60 },
      { stage: "validate", name: "Crash + regulatory", tool: "Human + regulators", fulfillment: 12 },
      { stage: "execute", name: "Tooling + assembly line", tool: "Heavy industry", fulfillment: 8 },
    ],
  },
  {
    id: "skyscraper",
    name: "Skyscraper",
    domain: "physical",
    completeness: 12,
    ease: 6,
    humanTouchpoints: 12,
    aiReadyYear: 2050,
    steps: [
      { stage: "generate", name: "Design + structure", tool: "AI + BIM", fulfillment: 55 },
      { stage: "validate", name: "Permits + engineering sign-off", tool: "Human + regulators", fulfillment: 12 },
      { stage: "execute", name: "Construction", tool: "Human + heavy machinery", fulfillment: 6 },
    ],
  },
];

// Exposed on window so app.js (loaded after this file in index.html) can read
// the dataset without a module bundler — keeps GitHub Pages hosting build-free.
window.IRS_DATA = { DOMAINS, STAGES, ARTIFACTS };
