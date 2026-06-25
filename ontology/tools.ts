// ontology/tools.ts
// ---------------------------------------------------------------------------
// The TOOL REGISTRY: every capability an artifact step can cite, defined once
// and referenced by id from ontology/artifacts.ts. Defining tools centrally
// (instead of inline strings) means a capability like "text-to-video" has a
// single maturity year, so the map's frontier can move over time as tools
// mature. validate.ts enforces that every step's toolIds exist here.
// ---------------------------------------------------------------------------

import { ToolSchema, type Tool } from "./schema.js";

// `satisfies` keeps full type-checking while letting us derive a union of ids.
export const TOOLS = [
  // --- Language / reasoning ---
  { id: "llm", name: "LLM", kind: "llm", maturityYear: 2022 },
  { id: "llm-long", name: "LLM (long-context)", kind: "llm", maturityYear: 2024 },
  { id: "deep-research", name: "Deep research agent", kind: "llm", maturityYear: 2025 },
  { id: "ai-agent", name: "AI agent", kind: "llm", maturityYear: 2024 },
  { id: "code-agent", name: "Agentic coding", kind: "code", maturityYear: 2024 },
  { id: "auto-evals", name: "Automated evals/tests", kind: "code", maturityYear: 2024 },
  { id: "auto-edit", name: "Automated edit", kind: "code", maturityYear: 2023 },
  { id: "search", name: "Web search / RSS", kind: "other", maturityYear: 2000 },
  { id: "ai-engineering", name: "AI-assisted engineering", kind: "other", maturityYear: 2026 },
  { id: "alphafold", name: "AI structure prediction (AlphaFold-class)", kind: "other", maturityYear: 2021 },

  // --- Visual ---
  { id: "t2i", name: "Text-to-image", kind: "image", maturityYear: 2022 },
  { id: "t2v", name: "Text-to-video", kind: "video", maturityYear: 2025 },
  { id: "t23d", name: "Text-to-3D", kind: "other", maturityYear: 2026 },
  { id: "vector", name: "Vector tools", kind: "image", maturityYear: 2010 },
  { id: "render", name: "Render engine", kind: "image", maturityYear: 2005 },
  { id: "charts", name: "Charting libraries", kind: "code", maturityYear: 2010 },
  { id: "dcc", name: "3D DCC tools (Blender)", kind: "other", maturityYear: 2005 },
  { id: "design-tools", name: "Design / UX tools", kind: "other", maturityYear: 2013 },
  { id: "nle", name: "Video editor (NLE)", kind: "video", maturityYear: 2010 },

  // --- Audio ---
  { id: "tts", name: "Text-to-speech", kind: "audio", maturityYear: 2023 },
  { id: "gen-audio", name: "Generative audio (Suno/Udio)", kind: "audio", maturityYear: 2024 },
  { id: "audio-master", name: "AI mastering", kind: "audio", maturityYear: 2020 },
  { id: "avatar-video", name: "Avatar video (HeyGen)", kind: "video", maturityYear: 2024 },

  // --- Engineering / CAD ---
  { id: "cad", name: "CAD / parametric modelling", kind: "cad", maturityYear: 2000 },
  { id: "cae", name: "Simulation / CAE", kind: "cad", maturityYear: 2005 },
  { id: "bim", name: "BIM", kind: "cad", maturityYear: 2010 },
  { id: "eda", name: "EDA / circuit tools", kind: "cad", maturityYear: 2005 },
  { id: "slicer", name: "3D print slicer", kind: "code", maturityYear: 2014 },

  // --- Physical / robotics / real-world ---
  { id: "cnc", name: "CNC machine", kind: "robotics", maturityYear: 2005 },
  { id: "printer-3d", name: "3D printer", kind: "robotics", maturityYear: 2014 },
  { id: "pcb-fab", name: "PCB fab service", kind: "robotics", maturityYear: 2008 },
  { id: "kitchen-robotics", name: "Kitchen robotics (early)", kind: "robotics", maturityYear: 2030 },
  { id: "construction-robotics", name: "Construction robotics (early)", kind: "robotics", maturityYear: 2035 },
  { id: "heavy-industry", name: "Heavy industry / manufacturing", kind: "robotics", maturityYear: 1950 },
  { id: "emulators", name: "Device emulators / QA rigs", kind: "code", maturityYear: 2008 },
  { id: "logistics", name: "Logistics / shipping", kind: "human", maturityYear: 1950 },
  { id: "human", name: "Human", kind: "human", maturityYear: 0 },
  { id: "regulators", name: "Regulators / approval bodies", kind: "human", maturityYear: 1950 },

  // --- Publish / distribute APIs ---
  { id: "cms-api", name: "Static site / CMS API", kind: "api", maturityYear: 2010 },
  { id: "pandoc", name: "Pandoc / EPUB build", kind: "code", maturityYear: 2006 },
  { id: "kdp-api", name: "KDP publishing API", kind: "api", maturityYear: 2010 },
  { id: "print-api", name: "Print-on-demand book API (Lulu/KDP)", kind: "api", maturityYear: 2010 },
  { id: "layout-api", name: "Layout / typesetting API", kind: "api", maturityYear: 2012 },
  { id: "distro-api", name: "Music distribution API (DistroKid)", kind: "api", maturityYear: 2014 },
  { id: "email-api", name: "Email / newsletter API (Resend/Substack)", kind: "api", maturityYear: 2016 },
  { id: "social-api", name: "Social scheduling API", kind: "api", maturityYear: 2014 },
  { id: "video-host-api", name: "Video hosting API (YouTube)", kind: "api", maturityYear: 2008 },
  { id: "rss-api", name: "RSS / podcast hosting API", kind: "api", maturityYear: 2005 },
  { id: "audiobook-api", name: "Audiobook distribution API (ACX)", kind: "api", maturityYear: 2013 },
  { id: "lms-api", name: "LMS API (Teachable)", kind: "api", maturityYear: 2014 },
  { id: "serverless", name: "Serverless / API host", kind: "api", maturityYear: 2016 },
  { id: "web-deploy", name: "Web deploy (Vercel/CI)", kind: "api", maturityYear: 2016 },
  { id: "store-api", name: "App store API", kind: "api", maturityYear: 2010 },
  { id: "pod-api", name: "Merch print-on-demand API (Printful)", kind: "api", maturityYear: 2014 },
  { id: "print-run-api", name: "Print-run manufacturing API", kind: "api", maturityYear: 2010 },
  { id: "templated-docs", name: "Templated documents", kind: "code", maturityYear: 2012 },
] as const satisfies readonly Tool[];

// Runtime-validate the registry at import time so a malformed entry fails fast.
TOOLS.forEach((t) => ToolSchema.parse(t));

// A union type of all valid tool ids — lets artifacts.ts get autocomplete and
// compile-time errors on typo'd tool references.
export type ToolId = (typeof TOOLS)[number]["id"];

// Convenience lookup used by the generator + validator.
export const TOOL_BY_ID: Record<string, Tool> = Object.fromEntries(
  TOOLS.map((t) => [t.id, t]),
);
