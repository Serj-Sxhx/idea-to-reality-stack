// ontology/schema.ts
// ---------------------------------------------------------------------------
// The canonical schema for the Idea-to-Reality Stack ontology, defined with Zod.
// Zod gives us BOTH runtime validation (used by validate.ts) and static
// TypeScript types (inferred below), so the data files, the validator, and the
// data.js generator all agree on exactly what an artifact, step, and tool are.
//
// This is the "honesty layer": a step cannot exist without citing at least one
// tool (toolIds is non-empty), and validate.ts checks every cited tool id
// actually resolves to a real entry in the tool registry (ontology/tools.ts).
// ---------------------------------------------------------------------------

import { z } from "zod";

// --- Enums + human-readable labels -----------------------------------------

// Domains drive the map's colour-coding and legend filters (see app.js).
export const DomainEnum = z.enum(["text", "visual", "audio", "software", "physical"]);
export type Domain = z.infer<typeof DomainEnum>;

// The three-stage spine inherited from the original 2020 canvas.
export const StageEnum = z.enum(["generate", "validate", "execute"]);
export type Stage = z.infer<typeof StageEnum>;

// What kind of thing a tool is (used for grouping / future estimator logic).
export const ToolKindEnum = z.enum([
  "llm", "image", "video", "audio", "code", "cad", "api", "human", "robotics", "other",
]);
export type ToolKind = z.infer<typeof ToolKindEnum>;

// Labels rendered in the UI. Kept here so the generator can emit them to data.js.
export const DOMAIN_LABELS: Record<Domain, string> = {
  text: "Text",
  visual: "Visual",
  audio: "Audio",
  software: "Software",
  physical: "Physical",
};

export const STAGE_LABELS: Record<Stage, string> = {
  generate: "Generate",
  validate: "Validate",
  execute: "Execute",
};

// --- Core records ----------------------------------------------------------

// A tool/agent/capability in the registry. `maturityYear` is the year this
// capability became viable; the estimator and the map's frontier-over-time
// view can use it to compute when an artifact becomes AI-completable.
export const ToolSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  kind: ToolKindEnum,
  maturityYear: z.number().int(),
  notes: z.string().optional(),
});
export type Tool = z.infer<typeof ToolSchema>;

// One step in an artifact's production graph. `toolIds` must reference ids in
// the tool registry (checked in validate.ts). `fulfillment` is how much of this
// step AI can do unaided (0-100); sub-50 marks a human-in-the-loop gap.
export const StepSchema = z.object({
  stage: StageEnum,
  name: z.string().min(1),
  toolIds: z.array(z.string().min(1)).min(1),
  fulfillment: z.number().int().min(0).max(100),
});
export type Step = z.infer<typeof StepSchema>;

// An output artifact and its coordinates on the ease x completeness map.
export const ArtifactSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  domain: DomainEnum,
  completeness: z.number().int().min(0).max(100),
  ease: z.number().int().min(0).max(100),
  humanTouchpoints: z.number().int().min(0),
  aiReadyYear: z.number().int(),
  steps: z.array(StepSchema).min(1),
});
export type Artifact = z.infer<typeof ArtifactSchema>;
