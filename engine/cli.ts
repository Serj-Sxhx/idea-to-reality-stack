// engine/cli.ts
// ---------------------------------------------------------------------------
// Thin command-line front door over the pure estimator (engine/estimator.ts).
// Usage:
//   npm run make -- "blog post"        human-readable estimate
//   npm run make -- "blog post" --json machine-readable JSON (for agents)
//   npm run make -- --list             list every artifact you can ask for
//
// All the logic lives in estimator.ts; this file only parses args and prints.
// ---------------------------------------------------------------------------

import { make, listArtifacts, type Estimate } from "./estimator.js";

// Don't crash when output is piped to a command that closes early (e.g. `head`).
process.stdout.on("error", (e: NodeJS.ErrnoException) => {
  if (e.code === "EPIPE") process.exit(0);
  throw e;
});

const args = process.argv.slice(2);
const wantJson = args.includes("--json");
const wantList = args.includes("--list");
// The query is every non-flag argument joined back into one string.
const query = args.filter((a) => !a.startsWith("--")).join(" ").trim();

// --list: dump the catalogue and exit.
if (wantList) {
  const items = listArtifacts();
  if (wantJson) {
    console.log(JSON.stringify(items, null, 2));
  } else {
    console.log(`Artifacts you can "make" (${items.length}):\n`);
    for (const a of items) console.log(`  ${a.id.padEnd(18)} ${a.name}  [${a.domain}]`);
  }
  process.exit(0);
}

// No query: print usage.
if (!query) {
  console.log('Usage: npm run make -- "<artifact>"   (e.g. "blog post", "house built")');
  console.log("       npm run make -- --list         list all artifacts");
  console.log("       add --json for machine-readable output");
  process.exit(0);
}

const result = make(query);

// JSON mode: emit the raw result (success or miss) and exit with a status.
if (wantJson) {
  console.log(JSON.stringify(result, null, 2));
  process.exit(result.ok ? 0 : 1);
}

// --- Human-readable rendering ----------------------------------------------

if (!result.ok) {
  if (result.reason === "ambiguous") {
    console.error(`"${result.query}" is ambiguous. Did you mean one of:`);
    for (const c of result.candidates) console.error("  - " + c);
  } else {
    console.error(`No artifact matches "${result.query}".`);
    if (result.suggestions.length) {
      console.error("Closest:");
      for (const s of result.suggestions) console.error("  - " + s);
    }
    console.error('Run `npm run make -- --list` to see everything available.');
  }
  process.exit(1);
}

printEstimate(result.estimate);

function printEstimate(e: Estimate): void {
  const pct = (n: number) => `${n}%`;
  const stageLine = (Object.entries(e.rollup.byStage) as [string, number | null][])
    .filter(([, v]) => v !== null)
    .map(([k, v]) => `${k} ${pct(v as number)}`)
    .join(" \u00b7 ");

  console.log(`\nmake: "${e.name}"  [${e.domain}]`);
  console.log("=".repeat(56));

  console.log("\nMap coordinates (authored)");
  console.log(`  completeness ${pct(e.completeness)}   ease ${pct(e.ease)}`);
  console.log(`  human touchpoints ${e.humanTouchpoints}   AI-ready ~${e.aiReadyYear}`);

  console.log("\nComputed from the production graph");
  console.log(`  mean fulfillment   ${pct(e.rollup.meanFulfillment)}`);
  console.log(
    `  weakest link       ${e.rollup.weakestLink.name} (${e.rollup.weakestLink.stage}) \u2014 ${pct(e.rollup.weakestLink.fulfillment)}`,
  );
  console.log(`  by stage           ${stageLine}`);
  console.log(`  tool frontier      all required tools exist by ${e.rollup.toolFrontierYear}`);

  console.log("\nPlan (generate \u2192 validate \u2192 execute)");
  for (const s of e.plan) {
    const tag = `[${s.stage}]`.padEnd(11);
    console.log(`  ${tag} ${s.name.padEnd(30)} ${pct(s.fulfillment).padStart(4)}   ${s.tools.join(" + ")}`);
  }

  console.log(`\nStack (${e.stack.length} tools)`);
  console.log(
    "  " + e.stack.map((t) => `${t.name} (${t.kind}, ${t.maturityYear})`).join(" \u00b7 "),
  );

  console.log("\nHuman-in-the-loop gaps");
  if (e.gaps.length === 0) {
    console.log("  none \u2014 AI can take every step past 50% unaided");
  } else {
    for (const g of e.gaps) {
      console.log(`  [${g.stage}] ${g.name} \u2014 ${pct(g.fulfillment)} (${g.reason})`);
    }
  }
  console.log("");
}
