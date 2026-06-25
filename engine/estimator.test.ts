// engine/estimator.test.ts
// ---------------------------------------------------------------------------
// Tests for the pure estimator. Run with `npm test` (node:test via tsx).
// These lock in the behaviour the CLI, website, and agent skills depend on.
// ---------------------------------------------------------------------------

import { test } from "node:test";
import assert from "node:assert/strict";
import { make, resolveArtifact, estimate } from "./estimator.js";
import { getArtifacts } from "../ontology/index.js";

test("make() resolves a known artifact by name", () => {
  const r = make("blog post");
  assert.equal(r.ok, true);
  if (r.ok) assert.equal(r.estimate.id, "blog-post");
});

test("make() resolves by exact id too", () => {
  const r = make("house-built");
  assert.equal(r.ok, true);
  if (r.ok) assert.equal(r.estimate.name, "House (built)");
});

test('"house" is ambiguous (design vs built)', () => {
  const r = make("house");
  assert.equal(r.ok, false);
  if (!r.ok) {
    assert.equal(r.reason, "ambiguous");
    assert.ok(r.candidates.length >= 2);
  }
});

test("unknown query returns not_found with suggestions", () => {
  const r = make("zxqw nonsense");
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.reason, "not_found");
});

test("blog-post has no human gaps; house-built has many", () => {
  const blog = make("blog-post");
  const house = make("house-built");
  assert.ok(blog.ok && house.ok);
  if (blog.ok) assert.equal(blog.estimate.gaps.length, 0);
  if (house.ok) assert.ok(house.estimate.gaps.length >= 2);
});

test("gaps are sorted weakest-first", () => {
  const r = make("house-built");
  assert.ok(r.ok);
  if (r.ok) {
    const f = r.estimate.gaps.map((g) => g.fulfillment);
    const sorted = [...f].sort((a, b) => a - b);
    assert.deepEqual(f, sorted);
  }
});

test("blog-post tool frontier is the latest tool maturity (LLM, 2022)", () => {
  const r = make("blog-post");
  assert.ok(r.ok);
  if (r.ok) assert.equal(r.estimate.rollup.toolFrontierYear, 2022);
});

test("plan is ordered generate -> validate -> execute", () => {
  const r = make("ebook");
  assert.ok(r.ok);
  if (r.ok) {
    const order = ["generate", "validate", "execute"];
    const idx = r.estimate.plan.map((s) => order.indexOf(s.stage));
    const sorted = [...idx].sort((a, b) => a - b);
    assert.deepEqual(idx, sorted);
  }
});

test("every artifact in the ontology produces a valid estimate", () => {
  for (const a of getArtifacts()) {
    const e = estimate(a);
    assert.ok(e.stack.length >= 1, `${a.id} should have a non-empty stack`);
    assert.ok(e.plan.length === a.steps.length, `${a.id} plan length mismatch`);
    assert.ok(
      e.rollup.meanFulfillment >= 0 && e.rollup.meanFulfillment <= 100,
      `${a.id} mean fulfillment out of range`,
    );
  }
});

test("resolveArtifact trims and lowercases the query", () => {
  const { match } = resolveArtifact("  Blog Post  ");
  assert.ok(match);
  assert.equal(match?.id, "blog-post");
});
