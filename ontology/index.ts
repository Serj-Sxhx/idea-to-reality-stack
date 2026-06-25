// ontology/index.ts
// ---------------------------------------------------------------------------
// Single entry point that assembles the ontology and runs every integrity
// check in one place. Both validate.ts (CLI gate) and generate.ts (data.js
// emitter) import validateOntology() from here so they share identical rules.
// ---------------------------------------------------------------------------

import { z } from "zod";
import { ArtifactSchema, ToolSchema, type Artifact, type Tool } from "./schema.js";
import { ARTIFACTS } from "./artifacts.js";
import { TOOLS } from "./tools.js";

export interface ValidationResult {
  ok: boolean;
  errors: string[];
  stats: {
    tools: number;
    artifacts: number;
    steps: number;
    humanGaps: number; // steps where AI fulfillment < 50 (human-in-the-loop)
  };
}

// Runs Zod schema validation on tools + artifacts, then the cross-file checks
// Zod alone can't do: unique ids and referential integrity of step.toolIds.
export function validateOntology(): ValidationResult {
  const errors: string[] = [];

  // 1) Schema-validate every tool and artifact via Zod.
  const tools = z.array(ToolSchema).safeParse(TOOLS);
  if (!tools.success) errors.push("Tool schema errors: " + tools.error.message);

  const artifacts = z.array(ArtifactSchema).safeParse(ARTIFACTS);
  if (!artifacts.success) errors.push("Artifact schema errors: " + artifacts.error.message);

  const toolList: Tool[] = tools.success ? tools.data : [];
  const artifactList: Artifact[] = artifacts.success ? artifacts.data : [];

  // 2) Unique ids (a duplicate id would silently shadow another entry).
  const toolIdSet = new Set<string>();
  for (const t of toolList) {
    if (toolIdSet.has(t.id)) errors.push(`Duplicate tool id: ${t.id}`);
    toolIdSet.add(t.id);
  }
  const artifactIdSet = new Set<string>();
  for (const a of artifactList) {
    if (artifactIdSet.has(a.id)) errors.push(`Duplicate artifact id: ${a.id}`);
    artifactIdSet.add(a.id);
  }

  // 3) Referential integrity: every cited tool id must exist in the registry.
  //    This is the ontology's "honesty rule" — no step can claim a capability
  //    that isn't a real, registered tool.
  let stepCount = 0;
  let humanGaps = 0;
  for (const a of artifactList) {
    for (const step of a.steps) {
      stepCount++;
      if (step.fulfillment < 50) humanGaps++;
      for (const toolId of step.toolIds) {
        if (!toolIdSet.has(toolId)) {
          errors.push(`Artifact "${a.id}" step "${step.name}" cites unknown tool id: ${toolId}`);
        }
      }
    }
  }

  return {
    ok: errors.length === 0,
    errors,
    stats: { tools: toolList.length, artifacts: artifactList.length, steps: stepCount, humanGaps },
  };
}

// Validated accessors for downstream consumers (e.g. the engine in Phase 2).
// These Zod-parse the source-of-truth consts, so callers get plain mutable
// arrays AND a runtime guarantee the data is well-formed before use.
export function getArtifacts(): Artifact[] {
  return z.array(ArtifactSchema).parse(ARTIFACTS);
}
export function getTools(): Tool[] {
  return z.array(ToolSchema).parse(TOOLS);
}

export { ARTIFACTS, TOOLS };
export * from "./schema.js";
