// engine/estimator.ts
// ---------------------------------------------------------------------------
// Phase 2 — the headless estimator (Layer 2). Given a target ("make X"), it
// resolves the artifact in the ontology and returns a structured estimate:
// the ordered plan, the tool stack, completeness/ease, rollups computed from
// the production graph, the human-in-the-loop gaps, and the tool frontier year.
//
// This file is PURE (no console, no process, no fs) so it can back the CLI
// (engine/cli.ts), the website, and future agent skills identically. It reads
// the ontology through the validated accessors in ontology/index.ts.
// ---------------------------------------------------------------------------

import {
  getArtifacts,
  getTools,
  type Artifact,
  type Tool,
  type Stage,
} from "../ontology/index.js";

// Load + validate the ontology once at module init.
const ARTS: Artifact[] = getArtifacts();
const TOOL_BY_ID: Map<string, Tool> = new Map(getTools().map((t) => [t.id, t]));

// Stages always roll up in this order regardless of authoring order.
const STAGE_ORDER: Stage[] = ["generate", "validate", "execute"];

// A step where AI can't carry most of the load unaided is a human gap. Matches
// the threshold used by ontology/validate.ts so the two never disagree.
const GAP_THRESHOLD = 50;

// --- Output shapes ---------------------------------------------------------

export interface PlanStep {
  stage: Stage;
  name: string;
  fulfillment: number;
  tools: string[]; // resolved tool display names
}

export interface Gap {
  stage: Stage;
  name: string;
  fulfillment: number;
  tools: string[];
  // Why it's a gap: the lowest-maturity / human tool that bottlenecks the step.
  reason: string;
}

export interface Estimate {
  id: string;
  name: string;
  domain: string;
  // Authored map coordinates (where the dot sits today).
  completeness: number;
  ease: number;
  humanTouchpoints: number;
  aiReadyYear: number;
  // Rollups computed from the production graph (the "estimate" itself).
  rollup: {
    meanFulfillment: number; // average automatable share across steps
    weakestLink: { stage: Stage; name: string; fulfillment: number };
    byStage: Record<Stage, number | null>; // mean per stage, null if no steps
    toolFrontierYear: number; // year the LAST required tool matured
  };
  plan: PlanStep[];
  stack: Tool[]; // unique tools used, with kind + maturity
  gaps: Gap[]; // steps below the gap threshold, weakest first
}

export type MakeResult =
  | { ok: true; estimate: Estimate }
  | { ok: false; reason: "not_found"; query: string; suggestions: string[] }
  | { ok: false; reason: "ambiguous"; query: string; candidates: string[] };

// --- Resolution ------------------------------------------------------------

// Turn a free-text target into a specific artifact. Tries exact id, then exact
// name, then a substring match. Returns the (possibly empty/multiple)
// candidate set so make() can report ambiguity or suggestions.
export function resolveArtifact(query: string): {
  match: Artifact | null;
  candidates: Artifact[];
} {
  const q = query.trim().toLowerCase();
  if (!q) return { match: null, candidates: [] };

  const byId = ARTS.find((a) => a.id.toLowerCase() === q);
  if (byId) return { match: byId, candidates: [byId] };

  const byName = ARTS.find((a) => a.name.toLowerCase() === q);
  if (byName) return { match: byName, candidates: [byName] };

  // Searchable text for an artifact = its name + id, lowercased.
  const hay = (a: Artifact) => `${a.name} ${a.id}`.toLowerCase();

  // 1) Substring of the whole query (handles "blog", "saas").
  const subs = ARTS.filter((a) => hay(a).includes(q));
  if (subs.length === 1) return { match: subs[0], candidates: subs };
  if (subs.length > 1) return { match: null, candidates: subs };

  // 2) All-tokens match (handles "house built", "indie game" where the literal
  //    phrase never appears because of punctuation like "House (built)").
  const tokens = q.split(/\s+/).filter(Boolean);
  if (tokens.length) {
    const tok = ARTS.filter((a) => tokens.every((t) => hay(a).includes(t)));
    if (tok.length === 1) return { match: tok[0], candidates: tok };
    if (tok.length > 1) return { match: null, candidates: tok };
  }

  return { match: null, candidates: [] };
}

// --- Estimation ------------------------------------------------------------

const round = (n: number) => Math.round(n);

// Resolve a step's tool ids to display names (ids are validated to exist).
function toolNames(toolIds: string[]): string[] {
  return toolIds.map((id) => TOOL_BY_ID.get(id)?.name ?? id);
}

// The bottleneck tool of a step = the one that gates it. We pick the tool with
// the latest maturity (a not-yet-mature capability) or, failing that, a human.
function gapReason(toolIds: string[]): string {
  const tools = toolIds
    .map((id) => TOOL_BY_ID.get(id))
    .filter((t): t is Tool => Boolean(t));
  if (tools.length === 0) return "no tool available";
  const human = tools.find((t) => t.kind === "human" || t.kind === "robotics");
  if (human) return `bottlenecked by ${human.name.toLowerCase()}`;
  const latest = tools.reduce((a, b) => (b.maturityYear > a.maturityYear ? b : a));
  return `limited by ${latest.name} (matured ${latest.maturityYear})`;
}

// Core: compute a full estimate for a resolved artifact.
export function estimate(a: Artifact): Estimate {
  // Order the steps by stage so the plan always reads generate -> validate ->
  // execute, preserving authoring order within each stage (stable sort).
  const plan: PlanStep[] = [...a.steps]
    .sort((x, y) => STAGE_ORDER.indexOf(x.stage) - STAGE_ORDER.indexOf(y.stage))
    .map((s) => ({
      stage: s.stage,
      name: s.name,
      fulfillment: s.fulfillment,
      tools: toolNames(s.toolIds),
    }));

  // Mean automatable share across all steps.
  const meanFulfillment = round(
    a.steps.reduce((sum, s) => sum + s.fulfillment, 0) / a.steps.length,
  );

  // The single step that most gates end-to-end completion.
  const weakest = a.steps.reduce((lo, s) => (s.fulfillment < lo.fulfillment ? s : lo));

  // Mean fulfillment per stage (null when a stage has no steps).
  const byStage = STAGE_ORDER.reduce((acc, stage) => {
    const inStage = a.steps.filter((s) => s.stage === stage);
    acc[stage] = inStage.length
      ? round(inStage.reduce((sum, s) => sum + s.fulfillment, 0) / inStage.length)
      : null;
    return acc;
  }, {} as Record<Stage, number | null>);

  // The unique tool stack across every step.
  const stackIds = new Set<string>();
  for (const s of a.steps) for (const id of s.toolIds) stackIds.add(id);
  const stack: Tool[] = [...stackIds]
    .map((id) => TOOL_BY_ID.get(id))
    .filter((t): t is Tool => Boolean(t));

  // The frontier year for this artifact's stack = the latest tool maturity.
  // i.e. the earliest point at which every required capability exists at all.
  const toolFrontierYear = stack.reduce((max, t) => Math.max(max, t.maturityYear), 0);

  // Human-in-the-loop gaps: steps below the threshold, weakest first.
  const gaps: Gap[] = a.steps
    .filter((s) => s.fulfillment < GAP_THRESHOLD)
    .sort((x, y) => x.fulfillment - y.fulfillment)
    .map((s) => ({
      stage: s.stage,
      name: s.name,
      fulfillment: s.fulfillment,
      tools: toolNames(s.toolIds),
      reason: gapReason(s.toolIds),
    }));

  return {
    id: a.id,
    name: a.name,
    domain: a.domain,
    completeness: a.completeness,
    ease: a.ease,
    humanTouchpoints: a.humanTouchpoints,
    aiReadyYear: a.aiReadyYear,
    rollup: {
      meanFulfillment,
      weakestLink: { stage: weakest.stage, name: weakest.name, fulfillment: weakest.fulfillment },
      byStage,
      toolFrontierYear,
    },
    plan,
    stack,
    gaps,
  };
}

// --- Public entry point ----------------------------------------------------

// make("blog post") -> a resolved estimate, or a structured miss with help.
export function make(query: string): MakeResult {
  const { match, candidates } = resolveArtifact(query);
  if (match) return { ok: true, estimate: estimate(match) };

  if (candidates.length > 1) {
    return { ok: false, reason: "ambiguous", query, candidates: candidates.map((c) => c.name) };
  }

  // No match: suggest artifacts that share any word with the query.
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const suggestions = ARTS.filter((a) =>
    tokens.some((t) => a.name.toLowerCase().includes(t)),
  )
    .map((a) => a.name)
    .slice(0, 5);

  return { ok: false, reason: "not_found", query, suggestions };
}

// Helper for the CLI's --list flag and any catalogue UI.
export function listArtifacts(): { id: string; name: string; domain: string }[] {
  return ARTS.map((a) => ({ id: a.id, name: a.name, domain: a.domain }));
}
