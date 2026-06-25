# Idea-to-Reality Stack — interactive landing page

A static, dependency-free landing page that is part blog, part live map. It
explains the goal of the **Creation Engine** project and lets visitors explore
output artifacts on an interactive **ease × completeness** map.

## Architecture

The project is one portable knowledge layer with thin clients over it:

- **Layer 1 — Ontology** (`ontology/`): the typed, Zod-validated source of truth (artifacts, a tool registry, and production graphs). See [Ontology](#layer-1--the-ontology).
- **Layer 2 — Estimator** (`engine/`): a headless `make(X)` planner that turns a target into a plan, stack, rollups, and human-in-the-loop gaps. See [Engine](#layer-2--the-engine).
- **Layer 3 — Clients**: this static site (the live map + blog). `data.js` is **generated** from the ontology, so the site stays dependency-free.

## Files

| File / dir | Role |
|------|------|
| `ontology/` | **Source of truth** (TypeScript + Zod): `schema.ts`, `tools.ts` (tool registry), `artifacts.ts` (catalogue), `validate.ts`, `generate.ts`. |
| `engine/` | **The estimator**: `estimator.ts` (pure logic), `cli.ts` (`make` command), `estimator.test.ts`. |
| `data.js` | **GENERATED** from the ontology by `npm run build:data`. Do not edit by hand. |
| `index.html` | The landing page: TLDR, blog sections, map container, ontology section, architecture, goal. Stat numbers are auto-synced by the generator. |
| `styles.css` | All styling (light theme, solarpunk-green accent, responsive). |
| `app.js` | Renders the interactive SVG scatter map + detail panel from `data.js`. |

The **website** has no build step and no runtime dependencies. The **ontology + engine** use TypeScript/Zod and run via `tsx` (dev-only).

## Layer 1 — the ontology

```bash
npm install          # one-time: installs zod + dev tooling (tsx, typescript)
npm run validate     # Zod-validate the ontology + check tool-id integrity
npm run build:data   # validate, then regenerate data.js AND sync website stats
```

The honesty rule is mechanical: every step must cite at least one tool, and
`validate` fails if a step references a tool id that isn't in the registry, so
`build:data` refuses to publish bad data. Edit artifacts/tools in `ontology/`,
never `data.js`.

## Layer 2 — the engine

```bash
npm run make -- "blog post"          # human-readable estimate
npm run make -- "house built" --json # machine-readable (for agents)
npm run make -- --list               # list every artifact you can ask for
npm test                             # run the estimator test suite
```

`make(X)` returns: the ordered plan (generate → validate → execute), the unique
tool stack, the authored map coordinates, rollups computed from the graph (mean
fulfillment, weakest link, per-stage, tool-frontier year), and the
human-in-the-loop gaps (steps under 50% fulfillment, weakest first).

## Run locally

Because the page loads `data.js` and `app.js` as separate scripts, open it
through a tiny local server (opening the file directly also works in most
browsers, but a server avoids any `file://` quirks):

```bash
cd 01_projects/idea-to-reality-stack
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages

Two common options:

### Option A — dedicated repo (simplest for a custom domain)

1. Create a new GitHub repo (e.g. `idea-to-reality-stack`).
2. Copy the four files (`index.html`, `styles.css`, `data.js`, `app.js`) into the repo root.
3. Push to `main`.
4. Repo **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, Folder = `/ (root)`.
5. Your site goes live at `https://<user>.github.io/<repo>/`.

### Option B — serve this subfolder from an existing repo

If you publish this folder from within a larger repo, point GitHub Pages at the
folder (e.g. move/copy these files to a `/docs` folder and set Pages to serve
from `/docs`). All asset paths are **relative**, so the site works at any base
path.

> Tip: no Jekyll processing is needed. If you ever see asset issues from Jekyll,
> add an empty `.nojekyll` file next to `index.html`.

## Extending the map

Edit the **ontology**, not `data.js`. Add or edit entries in
`ontology/artifacts.ts`. Each artifact needs:

- `completeness` (0–100) and `ease` (0–100) → its position on the map
- `humanTouchpoints` → dot size
- `aiReadyYear` → when it lights up as the frontier slider advances
- `steps[]` → the production graph; each step cites `toolIds` (must exist in
  `ontology/tools.ts`) and a `fulfillment` %. Any step under 50% is flagged as a
  human-in-the-loop gap.

Then run `npm run build:data` to re-validate and regenerate `data.js` (and the
website stats). `app.js` reads everything from `data.js`, so no other file needs
changing.
