// Self-contained share-card generator for Coast FIRE results.
// Builds a standalone SVG (no external CSS/fonts), rasterizes it to PNG via
// <canvas>, and can wrap that PNG into a PDF using jsPDF (already a dependency).
// The card is always light-themed — that's the expected look for a shared image.

import type { CoastInputs, CoastResult, Region } from "./coastfire";
import { fmtMoney } from "./coastfire";

export const CARD_W = 1200;
export const CARD_H = 675;

const BLUE = "#2563eb";
const GREEN = "#16a34a";
const GRAY = "#94a3b8";
const INK = "#0f172a";
const SUB = "#64748b";
const BORDER = "#e2e8f0";
const PANEL = "#f8fafc";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function statTile(x: number, y: number, w: number, label: string, value: string, color = INK): string {
  const h = 92;
  return `
    <g>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${PANEL}" stroke="${BORDER}" />
      <text x="${x + 16}" y="${y + 30}" font-size="15" font-weight="600" fill="${SUB}" letter-spacing="0.5">${esc(label)}</text>
      <text x="${x + 16}" y="${y + 66}" font-size="26" font-weight="700" fill="${color}">${esc(value)}</text>
    </g>`;
}

function miniChart(res: CoastResult, region: Region): string {
  const series = res.series;
  if (series.length < 2) return "";

  const box = { x: 632, y: 214, w: 512, h: 300 };
  const minAge = series[0].age;
  const maxAge = series[series.length - 1].age;
  const maxVal = Math.max(...series.map((p) => Math.max(p.withContrib, p.coastNow, p.target))) * 1.06;

  const X = (age: number) => box.x + ((age - minAge) / (maxAge - minAge)) * box.w;
  const Y = (v: number) => box.y + box.h - (v / maxVal) * box.h;

  const path = (key: "withContrib" | "coastNow" | "target") =>
    series.map((p, i) => `${i === 0 ? "M" : "L"}${X(p.age).toFixed(1)},${Y(p[key]).toFixed(1)}`).join(" ");

  // horizontal gridlines with y labels
  const gridCount = 4;
  let grid = "";
  for (let i = 0; i <= gridCount; i++) {
    const v = (maxVal / gridCount) * i;
    const y = Y(v);
    grid += `<line x1="${box.x}" y1="${y.toFixed(1)}" x2="${box.x + box.w}" y2="${y.toFixed(1)}" stroke="${BORDER}" stroke-width="1" />
      <text x="${box.x - 8}" y="${(y + 4).toFixed(1)}" text-anchor="end" font-size="13" fill="${SUB}">${esc(fmtMoney(v, region, true))}</text>`;
  }

  // x labels (start + end age)
  const xLabels = `
    <text x="${X(minAge).toFixed(1)}" y="${box.y + box.h + 24}" text-anchor="middle" font-size="13" fill="${SUB}">Age ${minAge}</text>
    <text x="${X(maxAge).toFixed(1)}" y="${box.y + box.h + 24}" text-anchor="middle" font-size="13" fill="${SUB}">${maxAge}</text>`;

  // legend
  const legend = `
    <g transform="translate(${box.x}, ${box.y - 26})">
      <rect x="0" y="-11" width="20" height="4" rx="2" fill="${BLUE}" />
      <text x="26" y="-4" font-size="14" fill="${INK}">Keep contributing</text>
      <rect x="180" y="-11" width="20" height="4" rx="2" fill="${GREEN}" />
      <text x="206" y="-4" font-size="14" fill="${INK}">Coast from today</text>
      <line x1="352" y1="-9" x2="372" y2="-9" stroke="${GRAY}" stroke-width="3" stroke-dasharray="5 4" />
      <text x="378" y="-4" font-size="14" fill="${INK}">Target</text>
    </g>`;

  return `
    ${legend}
    ${grid}
    <path d="${path("target")}" fill="none" stroke="${GRAY}" stroke-width="2.5" stroke-dasharray="6 5" />
    <path d="${path("coastNow")}" fill="none" stroke="${GREEN}" stroke-width="3" stroke-linecap="round" />
    <path d="${path("withContrib")}" fill="none" stroke="${BLUE}" stroke-width="3.25" stroke-linecap="round" />
    ${xLabels}`;
}

export function buildShareCardSVG(inp: CoastInputs, res: CoastResult, region: Region): string {
  const pct = Math.round(res.progress * 100);
  const progressPct = Math.min(pct, 100);
  const barW = 512;
  const coastAgeVal = res.coastAge !== null ? String(res.coastAge) : `> ${inp.retireAge}`;
  const cur = region === "uk" ? "UK · £" : "US · $";
  const dateStr = new Date().toLocaleDateString(region === "uk" ? "en-GB" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${CARD_W}" height="${CARD_H}" viewBox="0 0 ${CARD_W} ${CARD_H}" font-family="Arial, Helvetica, sans-serif">
  <rect width="${CARD_W}" height="${CARD_H}" fill="#ffffff" />
  <rect x="0" y="0" width="${CARD_W}" height="8" fill="${GREEN}" />

  <!-- header -->
  <text x="56" y="70" font-size="30" font-weight="800" fill="${INK}">Coast FIRE Calculator</text>
  <text x="56" y="98" font-size="16" fill="${SUB}">Results in today's money — inflation already accounted for.</text>
  <g transform="translate(${CARD_W - 56}, 56)">
    <rect x="-118" y="-24" width="118" height="34" rx="17" fill="${PANEL}" stroke="${BORDER}" />
    <text x="-59" y="-2" text-anchor="middle" font-size="16" font-weight="700" fill="${INK}">${esc(cur)}</text>
  </g>

  <!-- headline number -->
  <text x="56" y="168" font-size="15" font-weight="700" fill="${SUB}" letter-spacing="1">YOUR COAST FIRE NUMBER TODAY</text>
  <text x="56" y="224" font-size="58" font-weight="800" fill="${INK}">${esc(fmtMoney(res.coastNumberToday, region))}</text>

  <!-- progress -->
  <rect x="56" y="250" width="${barW}" height="14" rx="7" fill="${PANEL}" stroke="${BORDER}" />
  <rect x="56" y="250" width="${((barW * progressPct) / 100).toFixed(1)}" height="14" rx="7" fill="${GREEN}" />
  <text x="56" y="292" font-size="17" fill="${SUB}">You're <tspan font-weight="700" fill="${INK}">${pct}%</tspan> of the way there${
    res.coastAchieved ? " — Coast FIRE reached." : ` — ${esc(fmtMoney(res.shortfallToday, region))} to go.`
  }</text>

  <!-- stat tiles (left column) -->
  ${statTile(56, 320, 248, "Full FIRE number", fmtMoney(res.fireNumber, region, true))}
  ${statTile(320, 320, 248, "Coast age", coastAgeVal, res.coastAge !== null ? GREEN : "#d97706")}
  ${statTile(56, 424, 248, `At ${inp.retireAge} if you stop now`, fmtMoney(res.valueAtRetirementCoastNow, region, true), res.coastAchieved ? GREEN : INK)}
  ${statTile(320, 424, 248, `At ${inp.retireAge} if you keep saving`, fmtMoney(res.valueAtRetirementContrib, region, true))}

  <!-- projection chart (right column) -->
  <rect x="600" y="130" width="${CARD_W - 656}" height="410" rx="16" fill="#ffffff" stroke="${BORDER}" />
  ${miniChart(res, region)}

  <!-- footer -->
  <line x1="56" y1="600" x2="${CARD_W - 56}" y2="600" stroke="${BORDER}" stroke-width="1" />
  <text x="56" y="636" font-size="16" font-weight="700" fill="${INK}">toolspy.net/coast-fire-calculator</text>
  <text x="${CARD_W - 56}" y="636" text-anchor="end" font-size="15" fill="${SUB}">Generated ${esc(dateStr)} · educational estimate, not financial advice</text>
</svg>`;
}

/** Rasterize an SVG string to a PNG data URL using an offscreen canvas. */
export function svgToPngDataUrl(svg: string, scale = 2): Promise<string> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = CARD_W * scale;
        canvas.height = CARD_H * scale;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas 2D context unavailable");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/png"));
      } catch (e) {
        reject(e);
      } finally {
        URL.revokeObjectURL(url);
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to render share image"));
    };
    img.src = url;
  });
}

/** Trigger a browser download for a data URL. */
export function downloadDataUrl(dataUrl: string, filename: string): void {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/** Build a single-page PDF (landscape, card-sized) from a PNG data URL via jsPDF. */
export async function pngToPdf(pngDataUrl: string, filename: string): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "landscape", unit: "px", format: [CARD_W, CARD_H] });
  doc.addImage(pngDataUrl, "PNG", 0, 0, CARD_W, CARD_H);
  doc.save(filename);
}
