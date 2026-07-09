"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Link2, ImageDown, FileDown, Share2, Check, Info, PartyPopper, TrendingUp, Target, ChevronDown } from "lucide-react";
import { ProjectionChart } from "./chart";
import {
  CoastInputs,
  Region,
  DEFAULTS,
  computeCoast,
  fmtMoney,
  inputsToQuery,
  queryToInputs
} from "./coastfire";
import { buildShareCardSVG, svgToPngDataUrl, downloadDataUrl, pngToPdf } from "./share-card";

const UK_PENSION_AGE = 57;

function Field({
  label,
  hint,
  suffix,
  value,
  onChange,
  min,
  max,
  step = 1,
  slider = true,
  money = false,
  compact = false,
  region
}: {
  label: string;
  hint?: string;
  suffix?: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  slider?: boolean;
  money?: boolean;
  compact?: boolean;
  region: Region;
}) {
  const sym = money ? (region === "uk" ? "£" : "$") : null;
  return (
    <div className={compact ? "space-y-1.5" : "space-y-2"}>
      <div className="flex items-center justify-between gap-2">
        <Label className={compact ? "flex items-center gap-1 text-xs" : "flex items-center gap-1.5"}>
          {label}
          {hint && (
            <span
              tabIndex={0}
              title={hint}
              aria-label={hint}
              className="cursor-help text-muted-foreground/70 transition-colors hover:text-foreground"
            >
              <Info className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} />
            </span>
          )}
        </Label>
        <div className={compact ? "relative w-28" : "relative w-36"}>
          {sym && (
            <span className={compact ? "pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground" : "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"}>
              {sym}
            </span>
          )}
          <Input
            type="number"
            inputMode="decimal"
            className={
              compact
                ? sym
                  ? "h-8 pr-7 pl-7 text-right text-xs"
                  : "h-8 px-2.5 text-right text-xs"
                : sym
                  ? "pl-7 text-right"
                  : "text-right"
            }
            value={Number.isFinite(value) ? value : ""}
            min={min}
            max={max}
            step={step}
            onChange={(e) => onChange(e.target.value === "" ? min : Number(e.target.value))}
            aria-label={label}
          />
          {suffix && (
            <span className={compact ? "pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground" : "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"}>
              {suffix}
            </span>
          )}
        </div>
      </div>
      {slider && (
        <Slider
          value={[Number.isFinite(value) ? value : min]}
          min={min}
          max={max}
          step={step}
          onValueChange={(v) => onChange(v[0])}
          aria-label={label}
        />
      )}
    </div>
  );
}

function Stat({ label, value, sub, tone }: { label: string; value: string; sub?: string; tone?: "good" | "warn" }) {
  return (
    <div className="rounded-lg border border-border bg-muted/40 p-4">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div
        className={
          "mt-1 text-xl font-semibold " +
          (tone === "good"
            ? "text-green-600 dark:text-green-500"
            : tone === "warn"
              ? "text-amber-600 dark:text-amber-500"
              : "text-foreground")
        }
      >
        {value}
      </div>
      {sub && <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}

function CoastCalculator() {
  const [region, setRegion] = React.useState<Region>("us");
  const [inp, setInp] = React.useState<CoastInputs>(DEFAULTS.us);
  const [showTable, setShowTable] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [busy, setBusy] = React.useState<null | "img" | "pdf">(null);
  const [canNativeShare, setCanNativeShare] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // hydrate from share URL (client-only, avoids Suspense requirements)
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.location.search) {
      setInp((prev) => queryToInputs(window.location.search, prev));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // feature-detect the native share sheet (mobile) on the client
  React.useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  // close the share menu on outside click / Escape
  React.useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const set = (k: keyof CoastInputs) => (v: number) => setInp((p) => ({ ...p, [k]: v }));

  const switchRegion = (r: Region) => {
    setRegion(r);
    setInp(DEFAULTS[r]);
  };

  const safe: CoastInputs = {
    ...inp,
    retireAge: Math.max(inp.retireAge, inp.currentAge + 1),
    swr: Math.max(inp.swr, 0.5)
  };
  const res = computeCoast(safe);

  const shareUrl = () => `${window.location.origin}${window.location.pathname}?${inputsToQuery(inp)}`;
  const fileBase = () => `coast-fire-${region}-${new Date().toISOString().slice(0, 10)}`;

  const copyLink = async () => {
    const url = shareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy your share link:", url);
    }
    setMenuOpen(false);
  };

  const nativeShare = async () => {
    setMenuOpen(false);
    try {
      await navigator.share({
        title: "My Coast FIRE result",
        text: `My Coast FIRE number is ${fmtMoney(res.coastNumberToday, region)} — I'm ${Math.round(res.progress * 100)}% there.`,
        url: shareUrl()
      });
    } catch {
      /* user dismissed the share sheet — no-op */
    }
  };

  const downloadImage = async () => {
    setBusy("img");
    try {
      const png = await svgToPngDataUrl(buildShareCardSVG(safe, res, region), 2);
      downloadDataUrl(png, `${fileBase()}.png`);
    } catch {
      window.alert("Sorry — the image could not be generated.");
    } finally {
      setBusy(null);
      setMenuOpen(false);
    }
  };

  const downloadPdf = async () => {
    setBusy("pdf");
    try {
      const png = await svgToPngDataUrl(buildShareCardSVG(safe, res, region), 2);
      await pngToPdf(png, `${fileBase()}.pdf`);
    } catch {
      window.alert("Sorry — the PDF could not be generated.");
    } finally {
      setBusy(null);
      setMenuOpen(false);
    }
  };

  const progressPct = Math.min(res.progress * 100, 100);
  const ukBridge = region === "uk" && safe.retireAge < UK_PENSION_AGE;
  const pct = Math.round(res.progress * 100);

  // Plain-English verdict — the headline answer, in three states.
  const verdict = (() => {
    if (res.coastAchieved) {
      return {
        tone: "good" as const,
        Icon: PartyPopper,
        title: "You've reached Coast FIRE! 🎉",
        body: `Your ${fmtMoney(safe.currentInvested, region)} invested today should grow to your ${fmtMoney(
          res.fireNumber,
          region,
          true
        )} retirement target on its own by age ${safe.retireAge} — with no further saving. You only need to earn enough to cover today's living costs.`
      };
    }
    if (res.coastAge !== null) {
      const yrs = res.coastAge - safe.currentAge;
      return {
        tone: "progress" as const,
        Icon: TrendingUp,
        title: `On track — you'll coast at age ${res.coastAge}`,
        body: `Keep investing ${fmtMoney(safe.monthlyContribution, region)}/mo and in ${yrs} year${yrs === 1 ? "" : "s"
          } (age ${res.coastAge}) your portfolio can carry itself to retirement. You're ${pct}% of the way to coasting today.`
      };
    }
    return {
      tone: "warn" as const,
      Icon: Target,
      title: `Not coasting yet — you're ${pct}% of the way there`,
      body: `You'd need about ${fmtMoney(
        res.shortfallToday,
        region
      )} more invested today to coast. Or raise your monthly contribution, retire a little later, or trim retirement spending to close the gap.`
    };
  })();

  const verdictClass =
    verdict.tone === "good"
      ? "border-green-500/40 bg-green-500/10"
      : verdict.tone === "progress"
        ? "border-blue-500/40 bg-blue-500/10"
        : "border-amber-500/40 bg-amber-500/10";
  const verdictIconClass =
    verdict.tone === "good"
      ? "text-green-600 dark:text-green-500"
      : verdict.tone === "progress"
        ? "text-blue-600 dark:text-blue-500"
        : "text-amber-600 dark:text-amber-500";

  return (
    <Card id="calculator" className="scroll-mt-24 overflow-hidden border-2 shadow-lg shadow-primary/5">
      <CardHeader className="border-b border-border bg-muted/30">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle className="text-2xl">Coast FIRE Calculator</CardTitle>
            <CardDescription>
              All results are in today&apos;s money - inflation is already accounted for.
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-md border border-border p-0.5">
              <button
                type="button"
                onClick={() => switchRegion("us")}
                className={
                  "rounded px-3 py-1 text-sm font-medium transition-colors " +
                  (region === "us" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")
                }
                aria-pressed={region === "us"}
              >
                US $
              </button>
              <button
                type="button"
                onClick={() => switchRegion("uk")}
                className={
                  "rounded px-3 py-1 text-sm font-medium transition-colors " +
                  (region === "uk" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")
                }
                aria-pressed={region === "uk"}
              >
                UK £
              </button>
            </div>
            <Button variant="outline" size="sm" onClick={() => setInp(DEFAULTS[region])}>
              Reset
            </Button>
            <div className="relative" ref={menuRef}>
              <Button
                size="sm"
                onClick={() => setMenuOpen((o) => !o)}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
              >
                {copied ? (
                  <>
                    <Check className="mr-1.5 h-4 w-4" /> Link copied
                  </>
                ) : (
                  <>
                    <Share2 className="mr-1.5 h-3 w-3" /> Share
                    <span className="ml-1 opacity-70">▾</span>
                  </>
                )}
              </Button>
              {menuOpen && (
                <div
                  role="menu"
                  className="absolute left-0 -translate-x-1/2 md:translate-x-0 z-30 mt-2 w-60 max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg border border-border bg-card shadow-lg sm:left-auto sm:right-0"
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={copyLink}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-muted"
                  >
                    <Link2 className="h-4 w-4 text-muted-foreground" /> Copy shareable link
                  </button>
                  {canNativeShare && (
                    <button
                      type="button"
                      role="menuitem"
                      onClick={nativeShare}
                      className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-muted"
                    >
                      <Share2 className="h-4 w-4 text-muted-foreground" /> Share via…
                    </button>
                  )}
                  <button
                    type="button"
                    role="menuitem"
                    onClick={downloadImage}
                    disabled={busy !== null}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-muted disabled:opacity-60"
                  >
                    <ImageDown className="h-4 w-4 text-muted-foreground" />
                    {busy === "img" ? "Generating image…" : "Download as image (PNG)"}
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={downloadPdf}
                    disabled={busy !== null}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-muted disabled:opacity-60"
                  >
                    <FileDown className="h-4 w-4 text-muted-foreground" />
                    {busy === "pdf" ? "Generating PDF…" : "Download as PDF"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* inputs */}
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your details</p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Current age" hint="How old you are today." value={inp.currentAge} onChange={set("currentAge")} min={16} max={70} region={region} />
              <Field label="Retirement age" hint="The age you want to stop working and start living off your investments." value={inp.retireAge} onChange={set("retireAge")} min={40} max={75} region={region} />
            </div>
            <Field
              label="Invested so far"
              hint="Total you already have invested for retirement today — 401(k), IRA, ISA, index funds, etc. Leave out cash you'll spend soon."
              value={inp.currentInvested}
              onChange={set("currentInvested")}
              min={0}
              max={2000000}
              step={1000}
              money
              region={region}
            />
            <Field
              label="Monthly contribution"
              hint="How much you invest every month right now."
              value={inp.monthlyContribution}
              onChange={set("monthlyContribution")}
              min={0}
              max={10000}
              step={50}
              money
              region={region}
            />
            <Field
              label="Annual spending in retirement"
              hint="What you expect to spend per year once retired, in today's money."
              value={inp.annualSpending}
              onChange={set("annualSpending")}
              min={10000}
              max={300000}
              step={1000}
              money
              region={region}
            />

            {/* Advanced assumptions — collapsible, sensible defaults pre-filled */}
            <details open className="group rounded-lg border border-border bg-muted/30">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 [&::-webkit-details-marker]:hidden">
                <span className="text-sm font-semibold text-foreground">Advanced assumptions</span>
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="hidden sm:inline">
                    {inp.nominalReturn}% growth · {inp.inflation}% inflation · {safe.swr}% withdrawal
                  </span>
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden />
                </span>
              </summary>
              <div className="border-t border-border p-4">
                <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
                  Sensible defaults are pre-filled — only change these if you have a specific view. Every result stays
                  in today&apos;s money.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <Field label="Growth" hint="Expected average yearly investment return, before inflation. ~7% is a common long-run stock-market assumption." suffix="%" value={inp.nominalReturn} onChange={set("nominalReturn")} min={1} max={12} step={0.5} compact region={region} />
                  <Field label="Inflation" hint="Average yearly rise in prices. Used to keep every result comparable to today's money." suffix="%" value={inp.inflation} onChange={set("inflation")} min={0} max={8} step={0.5} compact region={region} />
                  <Field label="Withdrawal" hint="Safe withdrawal rate — the % of your portfolio you draw each year in retirement. 4% is the classic rule; 3–3.5% is more cautious." suffix="%" value={inp.swr} onChange={set("swr")} min={2} max={6} step={0.25} compact region={region} />
                </div>
              </div>
            </details>
          </div>

          {/* results */}
          <div className="space-y-4">
            <div className="rounded-xl border-2 border-green-500/30 bg-green-500/5 p-5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Your Coast FIRE number today
              </div>
              <div className="mt-1 text-4xl font-bold text-primary">
                {fmtMoney(res.coastNumberToday, region)}
              </div>
              <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-green-600 transition-all"
                  style={{ width: `${progressPct}%` }}
                  role="progressbar"
                  aria-valuenow={Math.round(progressPct)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                You&apos;re <strong className="text-foreground">{Math.round(res.progress * 100)}%</strong> of the way there
                {res.coastAchieved ? (
                  <span className="ml-2 rounded-full bg-green-600/15 px-2 py-0.5 text-xs font-semibold text-green-600 dark:text-green-500">
                    Coast FIRE reached 🎉
                  </span>
                ) : (
                  <span className="ml-1">— {fmtMoney(res.shortfallToday, region)} to go.</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Stat label="Full FIRE number" value={fmtMoney(res.fireNumber, region)} sub={`${safe.swr}% withdrawal rate`} />
              <Stat
                label="Coast age (if you keep contributing)"
                value={res.coastAge !== null ? `${res.coastAge}` : `> ${safe.retireAge}`}
                sub={
                  res.coastAge !== null
                    ? `in ${new Date().getFullYear() + (res.coastAge - safe.currentAge)}, with ${fmtMoney(res.coastAmount ?? 0, region, true)}`
                    : "raise contributions or spending assumptions"
                }
                tone={res.coastAge !== null ? "good" : "warn"}
              />
              <Stat
                label={`At ${safe.retireAge} if you stop saving today`}
                value={fmtMoney(res.valueAtRetirementCoastNow, region)}
                sub={res.coastAchieved ? "already enough — that's Coast FIRE" : "not enough yet on its own"}
                tone={res.coastAchieved ? "good" : undefined}
              />
              <Stat
                label={`At ${safe.retireAge} if you keep contributing`}
                value={fmtMoney(res.valueAtRetirementContrib, region)}
                sub={`vs ${fmtMoney(res.fireNumber, region, true)} needed`}
              />
            </div>

            {ukBridge && (
              <div className="rounded-lg border border-amber-500/60 bg-amber-500/10 p-4 text-sm leading-relaxed text-foreground">
                <strong>Pension bridge alert:</strong> you plan to retire at {safe.retireAge}, but UK pensions
                (workplace &amp; SIPP) can&apos;t be touched until ~{UK_PENSION_AGE}. You&apos;d need roughly{" "}
                <strong>{fmtMoney(safe.annualSpending * (UK_PENSION_AGE - safe.retireAge), region)}</strong> in ISAs or
                taxable accounts to bridge those {UK_PENSION_AGE - safe.retireAge} years.
              </div>
            )}

             {/* Plain-English verdict — the headline answer */}
          <div className={`mb-6 flex items-start gap-3 rounded-xl border-2 p-4 sm:p-5 ${verdictClass}`}>
            <verdict.Icon className={`mt-0.5 h-6 w-6 shrink-0 ${verdictIconClass}`} aria-hidden />
            <div>
              <div className="text-base font-bold text-foreground sm:text-lg">{verdict.title}</div>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{verdict.body}</p>
            </div>
          </div>
          </div>

         
        </div>

        {/* chart */}
        <div className="mt-8">
          <ProjectionChart
            series={res.series}
            region={region}
            coastAge={res.coastAge}
            pensionAge={region === "uk" ? UK_PENSION_AGE : undefined}
          />
        </div>

        {/* table view (accessibility relief + power users) */}
        <div className="mt-4">
          <Button variant="ghost" size="sm" onClick={() => setShowTable((s) => !s)}>
            {showTable ? "Hide year-by-year table" : "Show year-by-year table"}
          </Button>
          {showTable && (
            <div className="mt-3 max-h-80 overflow-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-muted">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold">Age</th>
                    <th className="px-3 py-2 text-right font-semibold">Keep contributing</th>
                    <th className="px-3 py-2 text-right font-semibold">Coast from today</th>
                    <th className="px-3 py-2 text-right font-semibold">Coast target</th>
                  </tr>
                </thead>
                <tbody>
                  {res.series.map((p) => (
                    <tr key={p.age} className="border-t border-border tabular-nums">
                      <td className="px-3 py-1.5">{p.age}</td>
                      <td className="px-3 py-1.5 text-right">{fmtMoney(p.withContrib, region)}</td>
                      <td className="px-3 py-1.5 text-right">{fmtMoney(p.coastNow, region)}</td>
                      <td className="px-3 py-1.5 text-right">{fmtMoney(p.target, region)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
          Assumes contributions and growth are steady, in today&apos;s money (real return ≈{" "}
          {(res.realReturn * 100).toFixed(1)}%/yr). This is an educational estimate, not financial advice — markets are
          not steady, and taxes{region === "uk" ? ", pension access rules" : " and retirement account rules"} affect
          real outcomes.
        </p>
      </CardContent>
    </Card>
  );
}

export default function CoastFireCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* Hero */}
      <div className="mb-6 sm:mb-8 text-center">

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Coast FIRE Calculator
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-5xl mx-auto">
          Find the number that makes saving for retirement <em>optional</em> — when compound growth alone will finish
          the job. Interactive chart, year-by-year table, today&apos;s-money math, and a shareable link for every
          scenario.
        </p>
      </div>

      <CoastCalculator />
    </div>
  );
}
