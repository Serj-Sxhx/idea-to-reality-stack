# Idea-to-Reality Stack — interactive landing page

A static, dependency-free landing page that is part blog, part live map. It
explains the goal of the **Creation Engine** project and lets visitors explore
output artifacts on an interactive **ease × completeness** map.

## Files

| File | Role |
|------|------|
| `index.html` | The long landing page: TLDR, blog sections, map container, architecture, goal. |
| `styles.css` | All styling (light theme, solarpunk-green accent, responsive). |
| `data.js` | The **stack ontology** seed: every artifact with its ease/completeness, production graph, and per-step tool + fulfillment %. This is the data layer — edit here to change the map. |
| `app.js` | Renders the interactive SVG scatter map + detail panel from `data.js`. Handles hover tooltips, click-to-expand, domain filters, and the frontier-year slider. |

There is **no build step** and **no dependencies** — just HTML, CSS, and vanilla JS.

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

Add or edit artifacts in `data.js` (`ARTIFACTS` array). Each entry needs:

- `completeness` (0–100) and `ease` (0–100) → its position on the map
- `humanTouchpoints` → dot size
- `aiReadyYear` → when it lights up as the frontier slider advances
- `steps[]` → the production graph; any step under 50% fulfillment is flagged as
  a human-in-the-loop gap in the detail panel.

`app.js` reads everything from that array, so no other file needs changing.
