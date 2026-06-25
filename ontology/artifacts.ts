// ontology/artifacts.ts
// ---------------------------------------------------------------------------
// The artifact catalogue: every output the map can plot, with its coordinates
// (completeness x ease) and its production graph. Each step cites one or more
// tools by id from ontology/tools.ts; validate.ts checks those ids resolve.
//
// `satisfies readonly Artifact[]` gives shape-level type-checking; referential
// integrity of toolIds is enforced at runtime by validate.ts.
// ---------------------------------------------------------------------------

import type { Artifact } from "./schema.js";

export const ARTIFACTS = [
  // --- Text ---------------------------------------------------------------
  {
    id: "blog-post", name: "Blog post / essay", domain: "text",
    completeness: 97, ease: 95, humanTouchpoints: 1, aiReadyYear: 2023,
    steps: [
      { stage: "generate", name: "Outline + angle", toolIds: ["llm"], fulfillment: 95 },
      { stage: "validate", name: "Fact-check + edit", toolIds: ["llm", "human"], fulfillment: 85 },
      { stage: "execute", name: "Publish to web", toolIds: ["cms-api"], fulfillment: 98 },
    ],
  },
  {
    id: "ebook", name: "eBook", domain: "text",
    completeness: 95, ease: 88, humanTouchpoints: 2, aiReadyYear: 2024,
    steps: [
      { stage: "generate", name: "Chapter drafting", toolIds: ["llm-long"], fulfillment: 90 },
      { stage: "generate", name: "Cover art", toolIds: ["t2i"], fulfillment: 92 },
      { stage: "validate", name: "Developmental edit", toolIds: ["human", "llm"], fulfillment: 70 },
      { stage: "execute", name: "EPUB build + distribute", toolIds: ["pandoc", "kdp-api"], fulfillment: 95 },
    ],
  },
  {
    id: "newsletter", name: "Newsletter issue", domain: "text",
    completeness: 96, ease: 94, humanTouchpoints: 1, aiReadyYear: 2023,
    steps: [
      { stage: "generate", name: "Curate + draft", toolIds: ["llm", "search"], fulfillment: 92 },
      { stage: "validate", name: "Tone + link check", toolIds: ["llm", "human"], fulfillment: 80 },
      { stage: "execute", name: "Send to list", toolIds: ["email-api"], fulfillment: 97 },
    ],
  },
  {
    id: "research-report", name: "Research report", domain: "text",
    completeness: 85, ease: 87, humanTouchpoints: 2, aiReadyYear: 2024,
    steps: [
      { stage: "generate", name: "Source gathering", toolIds: ["deep-research"], fulfillment: 82 },
      { stage: "generate", name: "Synthesis + draft", toolIds: ["llm-long"], fulfillment: 80 },
      { stage: "validate", name: "Fact + citation audit", toolIds: ["human", "llm"], fulfillment: 60 },
      { stage: "execute", name: "Format + publish", toolIds: ["templated-docs"], fulfillment: 95 },
    ],
  },
  {
    id: "novel", name: "Novel (full-length)", domain: "text",
    completeness: 76, ease: 80, humanTouchpoints: 3, aiReadyYear: 2025,
    steps: [
      { stage: "generate", name: "Plot + character bible", toolIds: ["llm"], fulfillment: 85 },
      { stage: "generate", name: "Draft chapters", toolIds: ["llm-long"], fulfillment: 72 },
      { stage: "validate", name: "Coherence + voice edit", toolIds: ["human"], fulfillment: 45 },
      { stage: "execute", name: "Publish (KDP/EPUB)", toolIds: ["pandoc", "kdp-api"], fulfillment: 95 },
    ],
  },
  {
    id: "resume", name: "Resume / CV", domain: "text",
    completeness: 97, ease: 97, humanTouchpoints: 1, aiReadyYear: 2023,
    steps: [
      { stage: "generate", name: "Draft from history", toolIds: ["llm"], fulfillment: 95 },
      { stage: "validate", name: "Truth + tailoring", toolIds: ["human"], fulfillment: 75 },
      { stage: "execute", name: "Export PDF", toolIds: ["templated-docs"], fulfillment: 99 },
    ],
  },
  {
    id: "online-course", name: "Online course", domain: "text",
    completeness: 88, ease: 74, humanTouchpoints: 3, aiReadyYear: 2025,
    steps: [
      { stage: "generate", name: "Curriculum + scripts", toolIds: ["llm"], fulfillment: 90 },
      { stage: "generate", name: "Video / avatar lessons", toolIds: ["avatar-video", "tts"], fulfillment: 72 },
      { stage: "validate", name: "Pedagogy review", toolIds: ["human"], fulfillment: 55 },
      { stage: "execute", name: "Publish to LMS", toolIds: ["lms-api"], fulfillment: 92 },
    ],
  },

  // --- Visual -------------------------------------------------------------
  {
    id: "social-pack", name: "Social content pack", domain: "visual",
    completeness: 92, ease: 90, humanTouchpoints: 1, aiReadyYear: 2024,
    steps: [
      { stage: "generate", name: "Copy + captions", toolIds: ["llm"], fulfillment: 93 },
      { stage: "generate", name: "Graphics + thumbnails", toolIds: ["t2i", "templated-docs"], fulfillment: 85 },
      { stage: "execute", name: "Schedule + post", toolIds: ["social-api"], fulfillment: 92 },
    ],
  },
  {
    id: "infographic", name: "Infographic / data viz", domain: "visual",
    completeness: 88, ease: 86, humanTouchpoints: 2, aiReadyYear: 2024,
    steps: [
      { stage: "generate", name: "Data + narrative", toolIds: ["llm", "code-agent"], fulfillment: 85 },
      { stage: "generate", name: "Layout + charts", toolIds: ["charts", "t2i"], fulfillment: 82 },
      { stage: "validate", name: "Accuracy check", toolIds: ["human"], fulfillment: 60 },
      { stage: "execute", name: "Export asset", toolIds: ["render"], fulfillment: 95 },
    ],
  },
  {
    id: "brand-identity", name: "Brand identity", domain: "visual",
    completeness: 85, ease: 80, humanTouchpoints: 2, aiReadyYear: 2025,
    steps: [
      { stage: "generate", name: "Naming + positioning", toolIds: ["llm"], fulfillment: 88 },
      { stage: "generate", name: "Logo + system", toolIds: ["t2i", "vector"], fulfillment: 75 },
      { stage: "validate", name: "Stakeholder sign-off", toolIds: ["human"], fulfillment: 50 },
      { stage: "execute", name: "Brand guide export", toolIds: ["templated-docs"], fulfillment: 90 },
    ],
  },
  {
    id: "illustrated-book", name: "Illustrated book", domain: "visual",
    completeness: 90, ease: 76, humanTouchpoints: 3, aiReadyYear: 2025,
    steps: [
      { stage: "generate", name: "Story + script", toolIds: ["llm"], fulfillment: 90 },
      { stage: "generate", name: "Consistent illustrations", toolIds: ["t2i"], fulfillment: 78 },
      { stage: "validate", name: "Art direction pass", toolIds: ["human"], fulfillment: 55 },
      { stage: "execute", name: "Layout + print-ready PDF", toolIds: ["layout-api"], fulfillment: 88 },
    ],
  },
  {
    id: "3d-asset", name: "3D model / game asset", domain: "visual",
    completeness: 68, ease: 66, humanTouchpoints: 3, aiReadyYear: 2026,
    steps: [
      { stage: "generate", name: "Concept", toolIds: ["llm", "t2i"], fulfillment: 85 },
      { stage: "generate", name: "Mesh + texture", toolIds: ["t23d"], fulfillment: 58 },
      { stage: "validate", name: "Topology cleanup", toolIds: ["human", "dcc"], fulfillment: 45 },
      { stage: "execute", name: "Export rig-ready", toolIds: ["dcc"], fulfillment: 70 },
    ],
  },
  {
    id: "explainer-video", name: "Animated explainer", domain: "visual",
    completeness: 73, ease: 68, humanTouchpoints: 3, aiReadyYear: 2026,
    steps: [
      { stage: "generate", name: "Script + storyboard", toolIds: ["llm"], fulfillment: 90 },
      { stage: "generate", name: "Animation + VO", toolIds: ["t2v", "tts"], fulfillment: 68 },
      { stage: "validate", name: "Timing + polish", toolIds: ["human", "nle"], fulfillment: 50 },
      { stage: "execute", name: "Render + upload", toolIds: ["render", "video-host-api"], fulfillment: 85 },
    ],
  },
  {
    id: "trailer", name: "Short film / trailer", domain: "visual",
    completeness: 70, ease: 58, humanTouchpoints: 4, aiReadyYear: 2026,
    steps: [
      { stage: "generate", name: "Script + storyboard", toolIds: ["llm"], fulfillment: 90 },
      { stage: "generate", name: "Shots", toolIds: ["t2v"], fulfillment: 65 },
      { stage: "validate", name: "Continuity + edit", toolIds: ["human", "nle"], fulfillment: 45 },
      { stage: "execute", name: "Sound + final render", toolIds: ["gen-audio", "render"], fulfillment: 70 },
    ],
  },
  {
    id: "feature-film", name: "Feature film", domain: "visual",
    completeness: 42, ease: 38, humanTouchpoints: 7, aiReadyYear: 2030,
    steps: [
      { stage: "generate", name: "Screenplay", toolIds: ["llm"], fulfillment: 80 },
      { stage: "generate", name: "Shots + VFX", toolIds: ["t2v"], fulfillment: 45 },
      { stage: "validate", name: "Direction + edit", toolIds: ["human"], fulfillment: 25 },
      { stage: "execute", name: "Score + distribution", toolIds: ["gen-audio", "distro-api"], fulfillment: 40 },
    ],
  },

  // --- Audio --------------------------------------------------------------
  {
    id: "song", name: "Song (recorded)", domain: "audio",
    completeness: 88, ease: 82, humanTouchpoints: 2, aiReadyYear: 2024,
    steps: [
      { stage: "generate", name: "Lyrics + melody", toolIds: ["llm", "gen-audio"], fulfillment: 88 },
      { stage: "generate", name: "Full production", toolIds: ["gen-audio"], fulfillment: 85 },
      { stage: "validate", name: "Taste / mix pass", toolIds: ["human", "audio-master"], fulfillment: 65 },
      { stage: "execute", name: "Distribute (DSPs)", toolIds: ["distro-api"], fulfillment: 95 },
    ],
  },
  {
    id: "podcast", name: "Podcast episode", domain: "audio",
    completeness: 85, ease: 83, humanTouchpoints: 2, aiReadyYear: 2024,
    steps: [
      { stage: "generate", name: "Research + script", toolIds: ["llm"], fulfillment: 90 },
      { stage: "generate", name: "Voices", toolIds: ["tts"], fulfillment: 82 },
      { stage: "validate", name: "Edit + taste", toolIds: ["human", "auto-edit"], fulfillment: 60 },
      { stage: "execute", name: "Publish to feeds", toolIds: ["rss-api"], fulfillment: 95 },
    ],
  },
  {
    id: "audiobook", name: "Audiobook", domain: "audio",
    completeness: 88, ease: 85, humanTouchpoints: 1, aiReadyYear: 2024,
    steps: [
      { stage: "generate", name: "Narration", toolIds: ["tts"], fulfillment: 88 },
      { stage: "validate", name: "Pronunciation pass", toolIds: ["human", "llm"], fulfillment: 65 },
      { stage: "execute", name: "Master + distribute", toolIds: ["audiobook-api"], fulfillment: 90 },
    ],
  },
  {
    id: "music-album", name: "Music album", domain: "audio",
    completeness: 80, ease: 76, humanTouchpoints: 3, aiReadyYear: 2025,
    steps: [
      { stage: "generate", name: "Composition + lyrics", toolIds: ["llm", "gen-audio"], fulfillment: 85 },
      { stage: "generate", name: "Production (12 tracks)", toolIds: ["gen-audio"], fulfillment: 80 },
      { stage: "validate", name: "Mix/master + curation", toolIds: ["human", "audio-master"], fulfillment: 55 },
      { stage: "execute", name: "Release to DSPs", toolIds: ["distro-api"], fulfillment: 95 },
    ],
  },

  // --- Software -----------------------------------------------------------
  {
    id: "chatbot-agent", name: "AI agent / chatbot", domain: "software",
    completeness: 84, ease: 80, humanTouchpoints: 2, aiReadyYear: 2025,
    steps: [
      { stage: "generate", name: "Prompt + tool design", toolIds: ["llm"], fulfillment: 88 },
      { stage: "generate", name: "Build + integrate", toolIds: ["code-agent"], fulfillment: 82 },
      { stage: "validate", name: "Eval + guardrails", toolIds: ["auto-evals", "human"], fulfillment: 65 },
      { stage: "execute", name: "Deploy", toolIds: ["serverless"], fulfillment: 90 },
    ],
  },
  {
    id: "saas-app", name: "SaaS web app", domain: "software",
    completeness: 80, ease: 70, humanTouchpoints: 4, aiReadyYear: 2026,
    steps: [
      { stage: "generate", name: "Spec + UX", toolIds: ["llm", "design-tools"], fulfillment: 85 },
      { stage: "generate", name: "Implementation", toolIds: ["code-agent"], fulfillment: 78 },
      { stage: "validate", name: "Tests + review", toolIds: ["auto-evals", "human"], fulfillment: 70 },
      { stage: "execute", name: "Deploy + monitor", toolIds: ["web-deploy"], fulfillment: 88 },
    ],
  },
  {
    id: "mobile-app", name: "Mobile app", domain: "software",
    completeness: 70, ease: 62, humanTouchpoints: 4, aiReadyYear: 2026,
    steps: [
      { stage: "generate", name: "Spec + UX", toolIds: ["llm", "design-tools"], fulfillment: 82 },
      { stage: "generate", name: "Build (iOS/Android)", toolIds: ["code-agent"], fulfillment: 72 },
      { stage: "validate", name: "Device QA", toolIds: ["human", "emulators"], fulfillment: 55 },
      { stage: "execute", name: "App store submit", toolIds: ["store-api"], fulfillment: 60 },
    ],
  },
  {
    id: "indie-game", name: "Indie game (2D)", domain: "software",
    completeness: 60, ease: 56, humanTouchpoints: 5, aiReadyYear: 2027,
    steps: [
      { stage: "generate", name: "Design + art + audio", toolIds: ["llm", "t2i", "gen-audio"], fulfillment: 70 },
      { stage: "generate", name: "Engine implementation", toolIds: ["code-agent"], fulfillment: 65 },
      { stage: "validate", name: "Playtest + balance", toolIds: ["human"], fulfillment: 35 },
      { stage: "execute", name: "Ship to Steam/itch", toolIds: ["store-api"], fulfillment: 70 },
    ],
  },

  // --- Physical -----------------------------------------------------------
  {
    id: "merch", name: "T-shirt / merch (POD)", domain: "physical",
    completeness: 80, ease: 70, humanTouchpoints: 2, aiReadyYear: 2025,
    steps: [
      { stage: "generate", name: "Design", toolIds: ["t2i", "vector"], fulfillment: 88 },
      { stage: "validate", name: "Mockup approval", toolIds: ["human"], fulfillment: 65 },
      { stage: "execute", name: "Print-on-demand fulfil", toolIds: ["pod-api"], fulfillment: 78 },
    ],
  },
  {
    id: "physical-book", name: "Physical print book", domain: "physical",
    completeness: 90, ease: 55, humanTouchpoints: 3, aiReadyYear: 2025,
    steps: [
      { stage: "generate", name: "Manuscript + cover", toolIds: ["llm", "t2i"], fulfillment: 90 },
      { stage: "validate", name: "Proof copy review", toolIds: ["human"], fulfillment: 60 },
      { stage: "execute", name: "Print-on-demand order", toolIds: ["print-api"], fulfillment: 80 },
      { stage: "execute", name: "Ship to reader", toolIds: ["logistics"], fulfillment: 70 },
    ],
  },
  {
    id: "3d-print", name: "3D-printed object", domain: "physical",
    completeness: 58, ease: 50, humanTouchpoints: 4, aiReadyYear: 2027,
    steps: [
      { stage: "generate", name: "Parametric model", toolIds: ["llm", "cad", "t23d"], fulfillment: 70 },
      { stage: "validate", name: "Printability check", toolIds: ["slicer", "human"], fulfillment: 55 },
      { stage: "execute", name: "Print", toolIds: ["printer-3d"], fulfillment: 55 },
      { stage: "execute", name: "Post-process", toolIds: ["human"], fulfillment: 30 },
    ],
  },
  {
    id: "board-game", name: "Board game (physical)", domain: "physical",
    completeness: 56, ease: 52, humanTouchpoints: 4, aiReadyYear: 2027,
    steps: [
      { stage: "generate", name: "Rules + art", toolIds: ["llm", "t2i"], fulfillment: 78 },
      { stage: "validate", name: "Playtest balance", toolIds: ["human"], fulfillment: 35 },
      { stage: "execute", name: "Manufacture + ship", toolIds: ["print-run-api"], fulfillment: 60 },
    ],
  },
  {
    id: "furniture", name: "Furniture (CNC)", domain: "physical",
    completeness: 55, ease: 45, humanTouchpoints: 5, aiReadyYear: 2028,
    steps: [
      { stage: "generate", name: "Parametric design", toolIds: ["llm", "cad"], fulfillment: 75 },
      { stage: "validate", name: "Structural check", toolIds: ["cae", "human"], fulfillment: 55 },
      { stage: "execute", name: "CNC / fabrication", toolIds: ["cnc"], fulfillment: 50 },
      { stage: "execute", name: "Assembly + finish", toolIds: ["human"], fulfillment: 25 },
    ],
  },
  {
    id: "house-design", name: "House (design)", domain: "physical",
    completeness: 65, ease: 35, humanTouchpoints: 5, aiReadyYear: 2029,
    steps: [
      { stage: "generate", name: "Concept + renders", toolIds: ["llm", "t2i", "cad"], fulfillment: 80 },
      { stage: "validate", name: "Code / permit compliance", toolIds: ["human"], fulfillment: 45 },
      { stage: "execute", name: "Construction docs", toolIds: ["bim"], fulfillment: 55 },
    ],
  },
  {
    id: "live-event", name: "Live event", domain: "physical",
    completeness: 45, ease: 40, humanTouchpoints: 6, aiReadyYear: 2030,
    steps: [
      { stage: "generate", name: "Concept + run-of-show", toolIds: ["llm"], fulfillment: 85 },
      { stage: "validate", name: "Venue + logistics", toolIds: ["human", "ai-agent"], fulfillment: 40 },
      { stage: "execute", name: "Physical production", toolIds: ["human"], fulfillment: 20 },
      { stage: "execute", name: "Run the event", toolIds: ["human"], fulfillment: 10 },
    ],
  },
  {
    id: "gadget", name: "Electronic gadget", domain: "physical",
    completeness: 38, ease: 30, humanTouchpoints: 6, aiReadyYear: 2030,
    steps: [
      { stage: "generate", name: "Schematic + firmware", toolIds: ["llm", "eda"], fulfillment: 65 },
      { stage: "validate", name: "Prototype + test", toolIds: ["human"], fulfillment: 35 },
      { stage: "execute", name: "PCB fab + assembly", toolIds: ["pcb-fab"], fulfillment: 40 },
      { stage: "execute", name: "Enclosure + QA", toolIds: ["human"], fulfillment: 20 },
    ],
  },
  {
    id: "restaurant-meal", name: "Restaurant meal", domain: "physical",
    completeness: 30, ease: 34, humanTouchpoints: 6, aiReadyYear: 2032,
    steps: [
      { stage: "generate", name: "Recipe + plating", toolIds: ["llm"], fulfillment: 85 },
      { stage: "validate", name: "Taste + iterate", toolIds: ["human"], fulfillment: 20 },
      { stage: "execute", name: "Cook", toolIds: ["kitchen-robotics"], fulfillment: 25 },
      { stage: "execute", name: "Serve", toolIds: ["human"], fulfillment: 15 },
    ],
  },
  {
    id: "house-built", name: "House (built)", domain: "physical",
    completeness: 25, ease: 15, humanTouchpoints: 9, aiReadyYear: 2040,
    steps: [
      { stage: "generate", name: "Design package", toolIds: ["llm", "cad"], fulfillment: 70 },
      { stage: "validate", name: "Permits + inspections", toolIds: ["human", "regulators"], fulfillment: 20 },
      { stage: "execute", name: "Site build", toolIds: ["construction-robotics"], fulfillment: 15 },
      { stage: "execute", name: "Trades + finishing", toolIds: ["human"], fulfillment: 10 },
    ],
  },
  {
    id: "new-drug", name: "New drug", domain: "physical",
    completeness: 20, ease: 8, humanTouchpoints: 10, aiReadyYear: 2045,
    steps: [
      { stage: "generate", name: "Candidate discovery", toolIds: ["alphafold"], fulfillment: 70 },
      { stage: "validate", name: "Clinical trials", toolIds: ["human", "regulators"], fulfillment: 10 },
      { stage: "execute", name: "Manufacture + approval", toolIds: ["human", "regulators"], fulfillment: 8 },
    ],
  },
  {
    id: "car", name: "Car", domain: "physical",
    completeness: 18, ease: 10, humanTouchpoints: 11, aiReadyYear: 2045,
    steps: [
      { stage: "generate", name: "Design + engineering", toolIds: ["cad", "cae"], fulfillment: 60 },
      { stage: "validate", name: "Crash + regulatory", toolIds: ["human", "regulators"], fulfillment: 12 },
      { stage: "execute", name: "Tooling + assembly line", toolIds: ["heavy-industry"], fulfillment: 8 },
    ],
  },
  {
    id: "spacecraft", name: "Spacecraft", domain: "physical",
    completeness: 15, ease: 5, humanTouchpoints: 12, aiReadyYear: 2050,
    steps: [
      { stage: "generate", name: "Mission + design", toolIds: ["ai-engineering"], fulfillment: 60 },
      { stage: "validate", name: "Qualification testing", toolIds: ["human"], fulfillment: 12 },
      { stage: "execute", name: "Fabricate + launch", toolIds: ["human", "heavy-industry"], fulfillment: 5 },
    ],
  },
  {
    id: "skyscraper", name: "Skyscraper", domain: "physical",
    completeness: 12, ease: 6, humanTouchpoints: 12, aiReadyYear: 2050,
    steps: [
      { stage: "generate", name: "Design + structure", toolIds: ["llm", "bim"], fulfillment: 55 },
      { stage: "validate", name: "Permits + engineering sign-off", toolIds: ["human", "regulators"], fulfillment: 12 },
      { stage: "execute", name: "Construction", toolIds: ["human", "heavy-industry"], fulfillment: 6 },
    ],
  },
] as const satisfies readonly Artifact[];
