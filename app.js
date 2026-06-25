// app.js
// ---------------------------------------------------------------------------
// Renders the interactive ease x completeness map from the ontology defined in
// data.js (window.IRS_DATA). No framework, no build step — plain DOM + inline
// SVG so GitHub Pages can serve it as static files.
//
// Reads:   window.IRS_DATA  (set at the bottom of data.js)
// Targets: #chart, #detail, #legend, #yearSlider, #yearLabel in index.html
// ---------------------------------------------------------------------------

(function () {
  "use strict";

  // Pull the dataset that data.js attached to window (load order is set in
  // index.html: data.js before app.js).
  const { DOMAINS, STAGES, ARTIFACTS } = window.IRS_DATA;

  // Colour per domain. Keys match the `domain` field on each artifact in data.js.
  const DOMAIN_COLORS = {
    text: "#1f7a4d",     // green
    visual: "#9b5de5",   // purple
    audio: "#f15bb5",    // pink
    software: "#2d7ff9", // blue
    physical: "#e07a1f", // orange
  };

  // SVG drawing geometry. The viewBox is fixed; CSS scales the SVG to fit.
  const VIEW = { w: 640, h: 460, pad: 56 };

  // Mutable UI state:
  //  - activeDomains: which domain filters are on (legend chips)
  //  - frontierYear:  the slider value; dots with aiReadyYear <= this are "ready"
  //  - selectedId:    the artifact whose detail panel is open
  const state = {
    activeDomains: new Set(Object.keys(DOMAINS)),
    frontierYear: 2026,
    selectedId: null,
  };

  // Cache DOM references once.
  const els = {
    chart: document.getElementById("chart"),
    detail: document.getElementById("detail"),
    legend: document.getElementById("legend"),
    slider: document.getElementById("yearSlider"),
    yearLabel: document.getElementById("yearLabel"),
  };

  // A single reusable tooltip element appended to <body>.
  const tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  document.body.appendChild(tooltip);

  // --- coordinate helpers -------------------------------------------------
  // Map a data value (0-100) onto SVG pixel space, respecting padding.
  // ease grows left->right (x); completeness grows bottom->top (y, so we invert).
  function xFor(ease) {
    return VIEW.pad + (ease / 100) * (VIEW.w - VIEW.pad * 2);
  }
  function yFor(completeness) {
    return VIEW.h - VIEW.pad - (completeness / 100) * (VIEW.h - VIEW.pad * 2);
  }
  // Dot radius scales with remaining human touchpoints (bigger = more human work).
  function rFor(touchpoints) {
    return 6 + touchpoints * 1.6;
  }

  // Small helper to create SVG elements with attributes (keeps draw code terse).
  function svgEl(tag, attrs) {
    const e = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  // -----------------------------------------------------------------------
  // buildControls: render the legend chips and wire the frontier-year slider.
  // Called once on init. Legend clicks toggle a domain in state.activeDomains
  // and re-draw the chart.
  // -----------------------------------------------------------------------
  function buildControls() {
    // Legend chips, one per domain.
    Object.keys(DOMAINS).forEach((key) => {
      const chip = document.createElement("button");
      chip.className = "chip";
      chip.type = "button";
      chip.innerHTML =
        '<span class="swatch" style="background:' + DOMAIN_COLORS[key] + '"></span>' +
        DOMAINS[key];
      chip.addEventListener("click", () => {
        // Toggle this domain on/off, then redraw.
        if (state.activeDomains.has(key)) {
          state.activeDomains.delete(key);
          chip.classList.add("off");
        } else {
          state.activeDomains.add(key);
          chip.classList.remove("off");
        }
        draw();
      });
      els.legend.appendChild(chip);
    });

    // Frontier-year slider: updates the label + state, then redraws so dots
    // re-evaluate their ready/future styling.
    els.slider.addEventListener("input", () => {
      state.frontierYear = parseInt(els.slider.value, 10);
      els.yearLabel.textContent = state.frontierYear;
      draw();
    });
  }

  // -----------------------------------------------------------------------
  // draw: (re)render the whole SVG scatter plot from current state.
  // Clears and rebuilds — simplest correct approach for a dataset this small.
  // -----------------------------------------------------------------------
  function draw() {
    els.chart.innerHTML = "";
    const svg = svgEl("svg", { viewBox: "0 0 " + VIEW.w + " " + VIEW.h });

    drawGridAndAxes(svg);
    drawFrontierLine(svg);
    drawDots(svg);

    els.chart.appendChild(svg);
  }

  // Grid lines + axis labels + 0/50/100 ticks for both axes.
  function drawGridAndAxes(svg) {
    [0, 25, 50, 75, 100].forEach((v) => {
      // vertical grid (ease)
      svg.appendChild(svgEl("line", {
        class: "grid-line", x1: xFor(v), y1: yFor(0), x2: xFor(v), y2: yFor(100),
      }));
      // horizontal grid (completeness)
      svg.appendChild(svgEl("line", {
        class: "grid-line", x1: xFor(0), y1: yFor(v), x2: xFor(100), y2: yFor(v),
      }));
    });

    // X axis title (ease) and Y axis title (completeness).
    const xt = svgEl("text", { class: "axis-label", x: VIEW.w / 2, y: VIEW.h - 12, "text-anchor": "middle" });
    xt.textContent = "EASE  →  (less real-world friction)";
    svg.appendChild(xt);

    const yt = svgEl("text", {
      class: "axis-label", x: 16, y: VIEW.h / 2, "text-anchor": "middle",
      transform: "rotate(-90 16 " + VIEW.h / 2 + ")",
    });
    yt.textContent = "COMPLETENESS  →  (AI can finish it)";
    svg.appendChild(yt);
  }

  // The diagonal "frontier": artifacts up-and-right of it are the easy, AI-
  // completable wins; down-and-left is the hard frontier. Purely a visual guide.
  function drawFrontierLine(svg) {
    svg.appendChild(svgEl("line", {
      class: "frontier-line",
      x1: xFor(20), y1: yFor(0), x2: xFor(100), y2: yFor(80),
    }));
  }

  // Plot one dot per artifact that passes the active-domain filter.
  function drawDots(svg) {
    ARTIFACTS.forEach((a) => {
      if (!state.activeDomains.has(a.domain)) return; // hidden by legend filter

      const cx = xFor(a.ease);
      const cy = yFor(a.completeness);

      // Ready vs future styling is driven by the frontier-year slider.
      // Ready  = solid filled dot (CSS adds a dark stroke via .frontier-ready).
      // Future = hollow ring in the domain colour so it stays clearly visible
      //          (the old near-invisible faded fill made these look missing).
      const ready = a.aiReadyYear <= state.frontierYear;
      const cls = "dot " + (ready ? "frontier-ready" : "frontier-future");

      const attrs = {
        class: cls, cx: cx, cy: cy, r: rFor(a.humanTouchpoints),
        fill: DOMAIN_COLORS[a.domain],
        "fill-opacity": ready ? 0.85 : 0.18,
      };
      if (!ready) {
        // Visible coloured outline marks a "not yet on the frontier" artifact.
        attrs.stroke = DOMAIN_COLORS[a.domain];
        attrs["stroke-width"] = 2;
      }
      const circle = svgEl("circle", attrs);

      // Hover -> floating tooltip with the headline numbers.
      circle.addEventListener("mousemove", (ev) => {
        tooltip.style.opacity = "1";
        tooltip.style.left = ev.clientX + 14 + "px";
        tooltip.style.top = ev.clientY + 14 + "px";
        tooltip.textContent =
          a.name + " — " + a.completeness + "% complete · ease " + a.ease;
      });
      circle.addEventListener("mouseleave", () => { tooltip.style.opacity = "0"; });

      // Click -> open the detail panel for this artifact.
      circle.addEventListener("click", () => {
        state.selectedId = a.id;
        renderDetail(a);
      });

      svg.appendChild(circle);

      // Label only the "ready" dots to avoid clutter now that there are many
      // artifacts. Future (hollow) dots reveal their name on hover via the
      // tooltip, and gain a permanent label once the slider passes their year.
      if (ready) {
        const label = svgEl("text", { class: "dot-label", x: cx + rFor(a.humanTouchpoints) + 4, y: cy + 4 });
        label.textContent = a.name;
        svg.appendChild(label);
      }
    });
  }

  // -----------------------------------------------------------------------
  // renderDetail: fill the #detail panel with the artifact's production graph.
  // Groups steps by stage (generate/validate/execute) and draws a fulfillment
  // bar per step. Steps under 50% fulfillment are flagged as human gaps (the
  // .gap class is styled in styles.css).
  // -----------------------------------------------------------------------
  function renderDetail(a) {
    let html = "";
    html += '<span class="domain-tag">' + DOMAINS[a.domain] + "</span>";
    html += "<h3>" + a.name + "</h3>";

    // Headline scores.
    html += '<div class="scores">';
    html += '<div class="score"><div class="num">' + a.completeness + '%</div><div class="lbl">Completeness</div></div>';
    html += '<div class="score"><div class="num">' + a.ease + '</div><div class="lbl">Ease</div></div>';
    html += '<div class="score"><div class="num">' + a.humanTouchpoints + '</div><div class="lbl">Human steps</div></div>';
    html += "</div>";

    // Steps grouped by stage, in canonical order.
    Object.keys(STAGES).forEach((stageKey) => {
      const stageSteps = a.steps.filter((s) => s.stage === stageKey);
      if (stageSteps.length === 0) return;

      html += '<div class="stage-group">';
      html += '<div class="stage-name">' + STAGES[stageKey] + "</div>";
      stageSteps.forEach((s) => {
        const isGap = s.fulfillment < 50; // low AI fulfillment => human needed
        html += '<div class="step-row' + (isGap ? " gap" : "") + '">';
        html += '<div class="step-top"><span class="step-name">' + s.name + "</span>";
        html += "<span>" + s.fulfillment + "%</span></div>";
        html += '<div class="step-tool">' + s.tool + "</div>";
        html += '<div class="bar"><span style="width:' + s.fulfillment + '%"></span></div>';
        html += "</div>";
      });
      html += "</div>";
    });

    els.detail.innerHTML = html;
  }

  // --- init ---------------------------------------------------------------
  buildControls();
  draw();
})();
