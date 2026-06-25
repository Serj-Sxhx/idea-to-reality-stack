// ontology/validate.ts
// ---------------------------------------------------------------------------
// CLI gate: `npm run validate`. Runs validateOntology() (see index.ts) and
// prints a human-readable report. Exits non-zero on any error so it can be
// wired into CI / a pre-commit hook later.
// ---------------------------------------------------------------------------

import { validateOntology } from "./index.js";

const result = validateOntology();

console.log("Idea-to-Reality Stack — ontology validation");
console.log("--------------------------------------------");
console.log(`Tools:      ${result.stats.tools}`);
console.log(`Artifacts:  ${result.stats.artifacts}`);
console.log(`Steps:      ${result.stats.steps}`);
console.log(`Human gaps: ${result.stats.humanGaps} (steps where AI fulfillment < 50)`);
console.log("--------------------------------------------");

if (!result.ok) {
  console.error(`\nFAILED with ${result.errors.length} error(s):`);
  for (const e of result.errors) console.error("  - " + e);
  process.exit(1);
}

console.log("\nOK — ontology is valid.");
