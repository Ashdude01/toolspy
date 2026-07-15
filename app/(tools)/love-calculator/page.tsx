"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import {
  Heart,
  Sparkles,
  Shield,
  Calculator,
  RefreshCw,
  Cake,
  ChevronDown,
  Users,
  Star,
  Hash,
} from "lucide-react";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";
import { ShareMenu } from "@/components/tools/shared/share-menu";
import {
  computeLove,
  inputsToQuery,
  queryToInputs,
  type LoveResult,
} from "./love";
import { buildShareCardSVG, CARD_W, CARD_H } from "./share-card";

function LoveCalculatorContent() {
  const { showToast } = useToast();
  const [firstName, setFirstName] = React.useState("");
  const [secondName, setSecondName] = React.useState("");
  const [dob1, setDob1] = React.useState("");
  const [dob2, setDob2] = React.useState("");
  const [showDates, setShowDates] = React.useState(false);
  const [result, setResult] = React.useState<LoveResult | null>(null);
  const resultRef = React.useRef<HTMLDivElement>(null);

  // Hydrate from a shared URL on first load.
  React.useEffect(() => {
    if (typeof window === "undefined" || !window.location.search) return;
    const parsed = queryToInputs(window.location.search);
    if (!parsed) return;
    setFirstName(parsed.name1);
    setSecondName(parsed.name2);
    if (parsed.dob1) {
      setDob1(parsed.dob1);
      setShowDates(true);
    }
    if (parsed.dob2) {
      setDob2(parsed.dob2);
      setShowDates(true);
    }
    setResult(
      computeLove({
        name1: parsed.name1,
        name2: parsed.name2,
        dob1: parsed.dob1,
        dob2: parsed.dob2,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculate = () => {
    if (!firstName.trim() || !secondName.trim()) {
      showToast("Please enter both names", "error");
      return;
    }
    const r = computeLove({
      name1: firstName,
      name2: secondName,
      dob1: dob1 || undefined,
      dob2: dob2 || undefined,
    });
    setResult(r);
    showToast("Love compatibility calculated! 💘", "success");
    setTimeout(
      () => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      120
    );
  };

  const reset = () => {
    setFirstName("");
    setSecondName("");
    setDob1("");
    setDob2("");
    setResult(null);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  const shareUrl = () => {
    const q = inputsToQuery({
      name1: firstName,
      name2: secondName,
      dob1: dob1 || undefined,
      dob2: dob2 || undefined,
    });
    return `${window.location.origin}${window.location.pathname}?${q}`;
  };

  const fileBase = () =>
    `love-${(firstName || "a").toLowerCase().replace(/[^a-z0-9]/g, "")}-${(secondName || "b")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")}`;

  const canCalc = firstName.trim().length > 0 && secondName.trim().length > 0;
  const hue = result?.tier.hue ?? 340;

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
      {/* CSS-only result animations - always rest on the correct value, with
          no dependence on JS timers or rAF paint. */}
      <style>{`
        @keyframes love-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes love-pop { 0% { transform: scale(.82); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes love-rise { 0% { transform: translateY(8px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        .love-grow { transform-origin: left center; animation: love-grow .8s cubic-bezier(.22,1,.36,1) both; }
        .love-pop { animation: love-pop .55s cubic-bezier(.34,1.56,.64,1) both; }
        .love-rise { animation: love-rise .5s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .love-grow, .love-pop, .love-rise { animation: none !important; }
        }
      `}</style>
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <Badge
          variant="outline"
          className="font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900"
        >
          <Shield className="w-4 h-4 mr-2" />
          Privacy-First • No Data Collection
        </Badge>

        <h2 className="bg-gradient-to-r from-red-500 dark:from-red-600 to-pink-600 dark:to-pink-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 mt-3">
          Love Calculator
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Enter two names to reveal a love-compatibility score, a full
          breakdown, the classic FLAMES result, and - with birthdays - zodiac
          &amp; numerology insights. Then share it as a link, image, or PDF.
        </p>
      </div>

      {/* Calculator Input */}
      <Card className="mb-6 sm:mb-8 border-2 shadow-lg shadow-pink-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500 fill-red-500" />
            Love Compatibility Calculator
          </CardTitle>
          <CardDescription>
            Enter two names - add birthdays for extra zodiac &amp; numerology
            insights.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Person&apos;s Name</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="e.g. Alex"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && canCalc && calculate()}
                maxLength={50}
              />
            </div>
            <div className="hidden sm:flex items-center justify-center pb-2">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-red-500 to-pink-500 text-white shadow-md">
                <Heart className="h-5 w-5 fill-white" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondName">Second Person&apos;s Name</Label>
              <Input
                id="secondName"
                type="text"
                placeholder="e.g. Sam"
                value={secondName}
                onChange={(e) => setSecondName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && canCalc && calculate()}
                maxLength={50}
              />
            </div>
          </div>

          {/* Optional birthdays */}
          <details
            open={showDates}
            onToggle={(e) => setShowDates((e.target as HTMLDetailsElement).open)}
            className="group rounded-lg border border-border bg-muted/30"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 [&::-webkit-details-marker]:hidden">
              <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Cake className="h-4 w-4 text-pink-500" />
                Add birthdays for zodiac &amp; numerology
                <span className="text-xs font-normal text-muted-foreground">
                  (optional)
                </span>
              </span>
              <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180 text-muted-foreground" />
            </summary>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border p-4">
              <div className="space-y-2">
                <Label htmlFor="dob1">{firstName || "First person"}&apos;s birthday</Label>
                <Input
                  id="dob1"
                  type="date"
                  value={dob1}
                  max="2020-12-31"
                  onChange={(e) => setDob1(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob2">{secondName || "Second person"}&apos;s birthday</Label>
                <Input
                  id="dob2"
                  type="date"
                  value={dob2}
                  max="2020-12-31"
                  onChange={(e) => setDob2(e.target.value)}
                />
              </div>
            </div>
          </details>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={calculate}
              className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
              disabled={!canCalc}
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Love Compatibility
            </Button>
            <Button
              variant="outline"
              onClick={reset}
              className="flex-1 sm:flex-initial"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <div ref={resultRef} className="scroll-mt-24">
          <Card className="mb-6 sm:mb-8 overflow-hidden border-2 bg-gradient-to-br from-pink-50 to-red-50 dark:from-pink-950/30 dark:to-red-950/30">
            <CardHeader className="border-b border-border/60">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-yellow-500" />
                    Results for {result.name1} &amp; {result.name2}
                  </CardTitle>
                  <CardDescription>
                    A fun, name-based compatibility reading.
                  </CardDescription>
                </div>

                {/* Share dropdown (shared, reusable component) */}
                <ShareMenu
                  getShareUrl={shareUrl}
                  buildSvg={() => buildShareCardSVG(result)}
                  size={{ width: CARD_W, height: CARD_H }}
                  fileBase={fileBase}
                  shareTitle="Our Love Compatibility 💘"
                  shareText={() =>
                    `${result.name1} + ${result.name2} = ${result.percentage}% - ${result.tier.message}`
                  }
                  buttonClassName="bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600"
                />
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              {/* Love meter */}
              <div className="flex flex-col items-center text-center mb-8">
                <div
                  className="love-pop relative grid h-40 w-40 sm:h-48 sm:w-48 place-items-center rounded-full"
                  style={{
                    background: `conic-gradient(hsl(${hue} 85% 60%) ${result.percentage * 3.6}deg, hsl(${hue} 60% 90% / 0.35) 0deg)`,
                  }}
                >
                  <div className="grid h-[86%] w-[86%] place-items-center rounded-full bg-background shadow-inner">
                    <Heart
                      className="absolute h-16 w-16 sm:h-20 sm:w-20 opacity-10"
                      style={{ color: `hsl(${hue} 85% 55%)` }}
                      aria-hidden
                    />
                    <span
                      className="relative text-4xl sm:text-5xl font-extrabold tabular-nums"
                      style={{ color: `hsl(${hue} 85% 45%)` }}
                    >
                      {result.percentage}%
                    </span>
                  </div>
                </div>

                <div className="mt-5 text-2xl font-bold flex items-center gap-2">
                  <span>{result.tier.message}</span>
                  <span className="text-3xl">{result.tier.emoji}</span>
                </div>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mt-2">
                  {result.tier.description}
                </p>

                {/* FLAMES badge */}
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-pink-300 dark:border-pink-800 bg-white/70 dark:bg-white/5 px-4 py-1.5 text-sm">
                  <span className="text-lg">{result.flames.emoji}</span>
                  <span className="font-semibold">
                    FLAMES: {result.flames.label}
                  </span>
                </div>
              </div>

              {/* Compatibility breakdown */}
              <div className="rounded-xl border border-border bg-card/60 p-5 mb-6">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  <Sparkles className="h-4 w-4" /> Compatibility breakdown
                </div>
                <div className="space-y-4">
                  {result.metrics.map((m) => (
                    <div key={m.key}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 font-medium">
                          <span>{m.emoji}</span>
                          {m.label}
                        </span>
                        <span className="font-bold tabular-nums" style={{ color: `hsl(${hue} 80% 45%)` }}>
                          {m.score}%
                        </span>
                      </div>
                      <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="love-grow h-full rounded-full"
                          style={{
                            width: `${m.score}%`,
                            background: `linear-gradient(90deg, hsl(${hue} 85% 62%), hsl(${hue} 85% 48%))`,
                          }}
                        />
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{m.blurb}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Zodiac + Numerology (only when birthdays given) */}
              {(result.zodiac || result.numerology) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {result.zodiac && (
                    <div className="rounded-xl border border-border bg-card/60 p-5">
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                        <Star className="h-4 w-4 text-amber-500" /> Zodiac match
                        <span className="ml-auto font-bold" style={{ color: `hsl(${hue} 80% 45%)` }}>
                          {result.zodiac.score}%
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-lg font-semibold mb-2">
                        <span>
                          {result.zodiac.sign1.emoji} {result.zodiac.sign1.name}
                        </span>
                        <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                        <span>
                          {result.zodiac.sign2.emoji} {result.zodiac.sign2.name}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {result.zodiac.summary}
                      </p>
                    </div>
                  )}
                  {result.numerology && (
                    <div className="rounded-xl border border-border bg-card/60 p-5">
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                        <Hash className="h-4 w-4 text-indigo-500" /> Numerology
                        <span className="ml-auto font-bold" style={{ color: `hsl(${hue} 80% 45%)` }}>
                          {result.numerology.score}%
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-lg font-semibold mb-2">
                        <span>Life Path {result.numerology.path1}</span>
                        <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                        <span>Life Path {result.numerology.path2}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {result.numerology.summary}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="h-5 w-5" />
                    Relationship Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {result.tier.tips.map((tip, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <p className="text-sm">{tip}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <p className="mt-5 text-center text-xs text-muted-foreground">
                Just for fun 💘 - this is an entertainment tool, not a scientific
                measure of any relationship.
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Fun Facts */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>Fun Love Facts</CardTitle>
          <CardDescription>
            Interesting facts about love and relationships
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-bold text-primary">Chemical Love</div>
              <div className="text-muted-foreground">
                Love triggers release of dopamine, oxytocin, and norepinephrine
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-bold text-primary">Heart Sync</div>
              <div className="text-muted-foreground">
                Couples&apos; heartbeats can synchronize when they gaze into each
                other&apos;s eyes
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-bold text-primary">Love at First Sight</div>
              <div className="text-muted-foreground">
                It takes only 0.2 seconds to fall in love according to scientists
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-bold text-primary">Butterfly Effect</div>
              <div className="text-muted-foreground">
                &quot;Butterflies in stomach&quot; are caused by adrenaline when
                nervous
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function LoveCalculatorPage() {
  return (
    <ToolPageWrapper toolSlug="love-calculator">
      <ToastProvider>
        <LoveCalculatorContent />
      </ToastProvider>
    </ToolPageWrapper>
  );
}
