// ontology/generate.ts
// ---------------------------------------------------------------------------
// CLI generator: `npm run generate`. Validates first (refusing to emit broken
// data), then writes the website's data.js from the canonical TS ontology.
//
// The website (app.js) is build-free and reads `window.IRS_DATA` with steps
// shaped as { stage, name, tool, fulfillment }. So here we RESOLVE each step's
// toolIds back into a single human-readable `tool` string (tool names joined
// by " + "), keeping app.js unchanged while the source of truth stays typed.
// ---------------------------------------------------------------------------

import { writeFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { validateOntology, ARTIFACTS, TOOLS, getArtifacts } from "./index.js";
import { DOMAIN_LABELS, STAGE_LABELS } from "./schema.js";
// Layer 2 reused at build time: precompute each artifact's estimate so the
// build-free website can show the engine's output without shipping the TS.
import { estimate } from "../engine/estimator.js";

// Refuse to generate from an invalid ontology.
const result = validateOntology();
if (!result.ok) {
  console.error("Refusing to generate data.js — ontology validation failed:");
  for (const e of result.errors) console.error("  - " + e);
  process.exit(1);
}

// Repo root is one level up from this ontology/ folder.
const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

// id -> display name, used to turn toolIds into the legacy `tool` string.
const toolName = new Map(TOOLS.map((t) => [t.id, t.name]));

// Reshape artifacts into the exact structure app.js expects.
const renderedArtifacts = ARTIFACTS.map((a) => ({
  id: a.id,
  name: a.name,
  domain: a.domain,
  completeness: a.completeness,
  ease: a.ease,
  humanTouchpoints: a.humanTouchpoints,
  aiReadyYear: a.aiReadyYear,
  steps: a.steps.map((s) => ({
    stage: s.stage,
    name: s.name,
    tool: s.toolIds.map((id) => toolName.get(id) ?? id).join(" + "),
    fulfillment: s.fulfillment,
  })),
}));

// Precompute a compact estimate per artifact using the real estimator, so the
// detail panel (app.js) renders the SAME numbers the CLI produces. We trim the
// full estimate to what the panel needs (the step graph is already in ARTIFACTS).
const estimatesById: Record<string, unknown> = {};
for (const a of getArtifacts()) {
  const e = estimate(a);
  estimatesById[a.id] = {
    meanFulfillment: e.rollup.meanFulfillment,
    weakestLink: e.rollup.weakestLink,
    byStage: e.rollup.byStage,
    toolFrontierYear: e.rollup.toolFrontierYear,
    stackSize: e.stack.length,
    gaps: e.gaps.map((g) => ({
      stage: g.stage,
      name: g.name,
      fulfillment: g.fulfillment,
      reason: g.reason,
    })),
  };
}

const banner =
  "// data.js — GENERATED FILE. Do not edit by hand.\n" +
  "// Source of truth: ontology/*.ts (TypeScript + Zod). Regenerate with:\n" +
  "//   npm run build:data   (validates the ontology, then rewrites this file)\n" +
  "// app.js reads window.IRS_DATA below; keeping this build-free means GitHub\n" +
  "// Pages can host the site with no bundler.\n";

const body =
  `const DOMAINS = ${JSON.stringify(DOMAIN_LABELS, null, 2)};\n\n` +
  `const STAGES = ${JSON.stringify(STAGE_LABELS, null, 2)};\n\n` +
  `const ARTIFACTS = ${JSON.stringify(renderedArtifacts, null, 2)};\n\n` +
  // ESTIMATES is keyed by artifact id; app.js reads it for the detail panel.
  `const ESTIMATES = ${JSON.stringify(estimatesById, null, 2)};\n\n` +
  `window.IRS_DATA = { DOMAINS, STAGES, ARTIFACTS, ESTIMATES };\n`;

// Write data.js to the repo root.
const outPath = join(repoRoot, "data.js");
writeFileSync(outPath, banner + "\n" + body, "utf8");

console.log(`Wrote ${outPath}`);
console.log(`  ${renderedArtifacts.length} artifacts, ${TOOLS.length} tools.`);

// --- Keep the website's Ontology stats row in sync -------------------------
// The numbers in index.html's <span class="onto-num" data-stat="..."> markers
// are rewritten here from the live ontology, so a background agent editing the
// dataset never leaves stale figures on the page. Each entry maps a data-stat
// key to its current value.
const websiteStats: Record<string, number> = {
  artifacts: result.stats.artifacts,
  tools: result.stats.tools,
  steps: result.stats.steps,
  domains: Object.keys(DOMAIN_LABELS).length,
};

const htmlPath = join(repoRoot, "index.html");
let html = readFileSync(htmlPath, "utf8");
let updated = 0;
for (const [key, value] of Object.entries(websiteStats)) {
  // Match the specific marker span for this stat and swap only its number.
  const re = new RegExp(
    `(<span class="onto-num" data-stat="${key}">)\\d+(</span>)`,
  );
  if (!re.test(html)) {
    console.warn(`  ! No marker found for data-stat="${key}" in index.html`);
    continue;
  }
  html = html.replace(re, `$1${value}$2`);
  updated++;
}
writeFileSync(htmlPath, html, "utf8");
console.log(`Synced ${updated} stat(s) into ${htmlPath}`);
