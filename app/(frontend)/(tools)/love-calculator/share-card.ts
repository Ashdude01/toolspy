// Builds the Love Calculator "share card" as a standalone SVG (no external
// CSS/fonts) - always light-themed, the expected look for a shared image.
// Rasterizing to PNG / PDF and downloading is handled generically by the
// shared <ShareMenu> component and lib/share-export.

import type { LoveResult } from "./love";

export const CARD_W = 1200;
export const CARD_H = 675;

const INK = "#3f1020";
const SUB = "#9d5b73";
const BORDER = "#f4d3df";
const PANEL = "#fff5f8";
const PINK = "#ec4899";
const RED = "#ef4444";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function truncate(s: string, max: number): string {
  return s.length > max ? s.slice(0, max - 1) + "…" : s;
}

// ---- layout constants -------------------------------------------------------
const M = 56; // outer margin
const PANEL_PAD = 32; // inner padding used consistently on every panel

// right-hand breakdown panel
const PX = 616;
const PY = 150;
const PW = CARD_W - M - PX; // right edge lands on the outer margin
const PH = 420;

// left-hand score column
const LEFT_CX = Math.round((M + PX) / 2); // centre of the left region

function metricBar(
  x: number,
  y: number,
  w: number,
  emoji: string,
  label: string,
  score: number
): string {
  const fill = (w * score) / 100;
  return `
    <g>
      <text x="${x}" y="${y}" font-size="16" font-weight="600" fill="${INK}">${esc(emoji)} ${esc(label)}</text>
      <text x="${x + w}" y="${y}" text-anchor="end" font-size="16" font-weight="700" fill="${PINK}">${score}%</text>
      <rect x="${x}" y="${y + 12}" width="${w}" height="10" rx="5" fill="${PANEL}" stroke="${BORDER}" />
      <rect x="${x}" y="${y + 12}" width="${fill.toFixed(1)}" height="10" rx="5" fill="url(#loveg)" />
    </g>`;
}

// A round, symmetric heart centred at (cx, cy). `w` is its width; the text
// anchor point (16,13.6 in the path's own 32×29.6 space) is its optical centre,
// so a number placed at (cx, cy) sits dead-centre inside it.
function heart(cx: number, cy: number, w: number, fill: string): string {
  const s = w / 32;
  const tx = (cx - 16 * s).toFixed(2);
  const ty = (cy - 13.6 * s).toFixed(2);
  const d =
    "M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4" +
    "c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z";
  return `<path transform="translate(${tx},${ty}) scale(${s.toFixed(4)})" d="${d}" fill="${fill}" />`;
}

export function buildShareCardSVG(res: LoveResult): string {
  const names = `${truncate(res.name1 || "Someone", 16)}  +  ${truncate(res.name2 || "Someone", 16)}`;
  const dateStr = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // heart geometry - big and round, percentage centred inside
  const heartCx = LEFT_CX;
  const heartCy = 372;
  const heartW = 250;
  const pctFont = res.percentage >= 100 ? 58 : 68;

  // breakdown bars - evenly spaced, full inner width, equal padding all round
  const barX = PX + PANEL_PAD;
  const barW = PW - PANEL_PAD * 2; // right padding == left padding
  const barTop = PY + 108;
  const barGap = 62;
  const bars = res.metrics
    .map((m, i) => metricBar(barX, barTop + i * barGap, barW, m.emoji, m.label, m.score))
    .join("");

  const zodiacLine = res.zodiac
    ? `${res.zodiac.sign1.emoji} ${res.zodiac.sign1.name}  ·  ${res.zodiac.sign2.emoji} ${res.zodiac.sign2.name}`
    : "";
  const flamesLine = `${esc(res.flames.emoji)} FLAMES: ${esc(res.flames.label)}${
    zodiacLine ? "   ·   " + esc(zodiacLine) : ""
  }`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${CARD_W}" height="${CARD_H}" viewBox="0 0 ${CARD_W} ${CARD_H}" font-family="Arial, Helvetica, sans-serif">
  <defs>
    <linearGradient id="loveg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${RED}" />
      <stop offset="1" stop-color="${PINK}" />
    </linearGradient>
  </defs>
  <rect width="${CARD_W}" height="${CARD_H}" fill="#ffffff" />
  <rect x="0" y="0" width="${CARD_W}" height="8" fill="url(#loveg)" />

  <!-- header -->
  <text x="${M}" y="66" font-size="32" font-weight="800" fill="${INK}">Love Calculator</text>
  <text x="${M}" y="95" font-size="16" fill="${SUB}">A fun compatibility check - just for smiles.</text>
  <line x1="${M}" y1="122" x2="${CARD_W - M}" y2="122" stroke="${BORDER}" stroke-width="1" />

  <!-- left column: names + score -->
  <text x="${LEFT_CX}" y="172" text-anchor="middle" font-size="14" font-weight="700" fill="${SUB}" letter-spacing="1.5">COMPATIBILITY BETWEEN</text>
  <text x="${LEFT_CX}" y="208" text-anchor="middle" font-size="26" font-weight="800" fill="${INK}">${esc(names)}</text>

  ${heart(heartCx, heartCy, heartW, "url(#loveg)")}
  <text x="${heartCx}" y="${heartCy + pctFont * 0.47}" text-anchor="middle" font-size="${pctFont}" font-weight="800" fill="#ffffff">${res.percentage}%</text>

  <text x="${LEFT_CX}" y="544" text-anchor="middle" font-size="27" font-weight="700" fill="${INK}">${esc(res.tier.message)} ${esc(res.tier.emoji)}</text>
  <text x="${LEFT_CX}" y="578" text-anchor="middle" font-size="17" fill="${SUB}">${flamesLine}</text>

  <!-- right column: breakdown panel (equal 32px padding on all sides) -->
  <rect x="${PX}" y="${PY}" width="${PW}" height="${PH}" rx="16" fill="#ffffff" stroke="${BORDER}" />
  <text x="${barX}" y="${PY + 46}" font-size="16" font-weight="700" fill="${INK}" letter-spacing="0.5">COMPATIBILITY BREAKDOWN</text>
  <line x1="${barX}" y1="${PY + 62}" x2="${PX + PW - PANEL_PAD}" y2="${PY + 62}" stroke="${BORDER}" stroke-width="1" />
  ${bars}

  <!-- footer -->
  <line x1="${M}" y1="602" x2="${CARD_W - M}" y2="602" stroke="${BORDER}" stroke-width="1" />
  <text x="${M}" y="638" font-size="16" font-weight="700" fill="${PINK}">toolspy.net/love-calculator</text>
  <text x="${CARD_W - M}" y="638" text-anchor="end" font-size="15" fill="${SUB}">Generated ${esc(dateStr)} · just for fun 💘</text>
</svg>`;
}
