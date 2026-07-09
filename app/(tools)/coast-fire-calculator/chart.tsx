"use client";

import * as React from "react";
import type { Region, YearPoint } from "./coastfire";
import { fmtMoney } from "./coastfire";

// dataviz palette — saturated line colors that read on both light and dark themes.
const C = {
  contrib: "#2563eb", // blue-600
  coast: "#16a34a",   // green-600
  target: "#94a3b8"   // slate-400
};

// theme-aware tokens (Toolspy HSL CSS vars)
const INK = "hsl(var(--muted-foreground))";
const GRID = "hsl(var(--border))";
const SURFACE = "hsl(var(--background))";
const FG = "hsl(var(--foreground))";

const W = 760;
const H = 380;
const PAD = { top: 24, right: 118, bottom: 34, left: 64 };

function niceTicks(max: number, count = 4): number[] {
  if (max <= 0) return [0];
  const raw = max / count;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  const step = (norm >= 5 ? 10 : norm >= 2.5 ? 5 : norm >= 1.5 ? 2.5 : norm >= 1 ? 2 : 1) * mag;
  const ticks: number[] = [];
  for (let v = 0; v <= max + step * 0.01; v += step) ticks.push(v);
  return ticks;
}

interface Props {
  series: YearPoint[];
  region: Region;
  coastAge: number | null;
  pensionAge?: number; // UK marker
}

export function ProjectionChart({ series, region, coastAge, pensionAge }: Props) {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const [hover, setHover] = React.useState<number | null>(null);

  if (series.length < 2) return null;

  const minAge = series[0].age;
  const maxAge = series[series.length - 1].age;
  const maxVal = Math.max(...series.map((p) => Math.max(p.withContrib, p.coastNow, p.target))) * 1.06;

  const x = (age: number) => PAD.left + ((age - minAge) / (maxAge - minAge)) * (W - PAD.left - PAD.right);
  const y = (v: number) => H - PAD.bottom - (v / maxVal) * (H - PAD.top - PAD.bottom);

  const path = (key: keyof YearPoint) =>
    series.map((p, i) => `${i === 0 ? "M" : "L"}${x(p.age).toFixed(1)},${y(p[key] as number).toFixed(1)}`).join(" ");

  const yTicks = niceTicks(maxVal);
  const ageStep = Math.max(1, Math.ceil((maxAge - minAge) / 7));
  const xTicks: number[] = [];
  for (let a = minAge; a <= maxAge; a += ageStep) xTicks.push(a);
  if (xTicks[xTicks.length - 1] !== maxAge) xTicks.push(maxAge);

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const age = Math.round(minAge + ((px - PAD.left) / (W - PAD.left - PAD.right)) * (maxAge - minAge));
    if (age >= minAge && age <= maxAge) setHover(age);
    else setHover(null);
  };

  const hp = hover !== null ? series.find((p) => p.age === hover) : undefined;
  const coastPoint = coastAge !== null ? series.find((p) => p.age === coastAge) : undefined;

  const tooltipX = hp ? Math.min(x(hp.age) + 12, W - PAD.right - 158) : 0;
  const tooltipY = hp ? Math.max(PAD.top, Math.min(y(Math.max(hp.withContrib, hp.target)) - 10, H - 130)) : 0;

  return (
    <div className="w-full">
      {/* legend (identity never color-alone: labels + swatches) */}
      <div className="mb-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><span className="h-[3px] w-5 rounded-full" style={{ background: C.contrib }} /> Keep contributing</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-[3px] w-5 rounded-full" style={{ background: C.coast }} /> Coast from today</span>
        <span className="inline-flex items-center gap-1.5">
          <svg width="20" height="4" aria-hidden><line x1="0" y1="2" x2="20" y2="2" stroke={C.target} strokeWidth="2" strokeDasharray="4 3" /></svg>
          Coast target
        </span>
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full rounded-lg border border-border bg-card"
        role="img"
        aria-label="Projection of portfolio value versus the coast target from your current age to retirement"
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
      >
        {/* grid + y axis */}
        {yTicks.map((t) => (
          <g key={t}>
            <line x1={PAD.left} y1={y(t)} x2={W - PAD.right} y2={y(t)} stroke={GRID} strokeWidth="1" />
            <text x={PAD.left - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill={INK} opacity="0.85">
              {fmtMoney(t, region, true)}
            </text>
          </g>
        ))}
        {/* x axis */}
        {xTicks.map((a) => (
          <text key={a} x={x(a)} y={H - PAD.bottom + 18} textAnchor="middle" fontSize="11" fill={INK} opacity="0.85">
            {a}
          </text>
        ))}
        <text x={(PAD.left + W - PAD.right) / 2} y={H - 4} textAnchor="middle" fontSize="11" fill={INK} opacity="0.65">
          Age
        </text>

        {/* UK pension access marker */}
        {pensionAge && pensionAge > minAge && pensionAge < maxAge && (
          <g>
            <line x1={x(pensionAge)} y1={PAD.top} x2={x(pensionAge)} y2={H - PAD.bottom} stroke={C.target} strokeWidth="1" strokeDasharray="2 4" />
            <text x={x(pensionAge)} y={PAD.top - 8} textAnchor="middle" fontSize="10" fill={INK} opacity="0.8">
              pension access {pensionAge}
            </text>
          </g>
        )}

        {/* series */}
        <path d={path("target")} fill="none" stroke={C.target} strokeWidth="1.75" strokeDasharray="5 4" />
        <path d={path("coastNow")} fill="none" stroke={C.coast} strokeWidth="2" strokeLinecap="round" />
        <path d={path("withContrib")} fill="none" stroke={C.contrib} strokeWidth="2.25" strokeLinecap="round" />

        {/* direct labels at line ends */}
        {(
          [
            ["withContrib", "Keep contributing", C.contrib],
            ["coastNow", "Coast from today", C.coast],
            ["target", "Coast target", C.target]
          ] as [keyof YearPoint, string, string][]
        ).map(([k, label, color]) => {
          const last = series[series.length - 1];
          return (
            <text key={k} x={W - PAD.right + 8} y={y(last[k] as number) + 4} fontSize="11" fontWeight="600" fill={color}>
              {label}
            </text>
          );
        })}

        {/* coast point marker */}
        {coastPoint && (
          <g>
            <circle cx={x(coastPoint.age)} cy={y(coastPoint.withContrib)} r="6" fill={C.contrib} stroke={SURFACE} strokeWidth="2" />
            <text x={x(coastPoint.age)} y={y(coastPoint.withContrib) - 12} textAnchor="middle" fontSize="11" fontWeight="700" fill={FG}>
              Coast point · {coastPoint.age}
            </text>
          </g>
        )}

        {/* crosshair + tooltip */}
        {hp && (
          <g pointerEvents="none">
            <line x1={x(hp.age)} y1={PAD.top} x2={x(hp.age)} y2={H - PAD.bottom} stroke={INK} strokeWidth="1" opacity="0.4" />
            <circle cx={x(hp.age)} cy={y(hp.withContrib)} r="4.5" fill={C.contrib} stroke={SURFACE} strokeWidth="1.5" />
            <circle cx={x(hp.age)} cy={y(hp.coastNow)} r="4.5" fill={C.coast} stroke={SURFACE} strokeWidth="1.5" />
            <circle cx={x(hp.age)} cy={y(hp.target)} r="4" fill={C.target} stroke={SURFACE} strokeWidth="1.5" />
            <g transform={`translate(${tooltipX},${tooltipY})`}>
              <rect width="150" height="86" rx="8" fill={SURFACE} stroke={GRID} />
              <text x="10" y="18" fontSize="11" fontWeight="700" fill={FG}>Age {hp.age}</text>
              <text x="10" y="36" fontSize="11" fill={C.contrib}>Contributing: {fmtMoney(hp.withContrib, region, true)}</text>
              <text x="10" y="54" fontSize="11" fill={C.coast}>Coasting: {fmtMoney(hp.coastNow, region, true)}</text>
              <text x="10" y="72" fontSize="11" fill={C.target}>Target: {fmtMoney(hp.target, region, true)}</text>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
}
