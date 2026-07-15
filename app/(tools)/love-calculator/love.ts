// Love Calculator engine - fully deterministic so a shared URL always
// reproduces the exact same result (no Math.random anywhere). Results are
// order-independent: "Alex + Sam" scores the same as "Sam + Alex".
//
// This is a fun / entertainment tool, not science. Everything below is a
// stable, symmetric mapping from the two names (and optional birthdays) to a
// set of playful scores.

export interface LoveInputs {
  name1: string;
  name2: string;
  dob1?: string; // ISO YYYY-MM-DD (optional - unlocks zodiac + numerology)
  dob2?: string;
}

export interface Metric {
  key: string;
  label: string;
  emoji: string;
  score: number; // 0..100
  blurb: string;
}

export interface FlamesResult {
  letter: "F" | "L" | "A" | "M" | "E" | "S";
  label: string;
  emoji: string;
  description: string;
}

export interface ZodiacSign {
  name: string;
  emoji: string;
  element: "Fire" | "Earth" | "Air" | "Water";
}

export interface ZodiacResult {
  sign1: ZodiacSign;
  sign2: ZodiacSign;
  score: number; // 0..100
  summary: string;
}

export interface NumerologyResult {
  path1: number;
  path2: number;
  score: number; // 0..100
  summary: string;
}

export interface LoveResult {
  name1: string;
  name2: string;
  percentage: number;
  tier: LoveTier;
  metrics: Metric[];
  flames: FlamesResult;
  zodiac: ZodiacResult | null;
  numerology: NumerologyResult | null;
}

export interface LoveTier {
  message: string;
  emoji: string;
  description: string;
  tips: string[];
  hue: number; // css hue for the meter (0 red .. 330 pink)
}

/* ------------------------------------------------------------------ */
/* deterministic helpers                                               */
/* ------------------------------------------------------------------ */

const cleanName = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip accents
    .replace(/[^a-z]/g, "");

// djb2 string hash → unsigned 32-bit
function hash(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = (((h << 5) + h) ^ s.charCodeAt(i)) >>> 0;
  }
  return h >>> 0;
}

// order-independent seed for a pair of names + a per-metric salt
function pairSeed(a: string, b: string, salt: string): number {
  const pair = a < b ? `${a}~${b}` : `${b}~${a}`;
  return hash(`${pair}::${salt}`);
}

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

function countVowels(s: string): number {
  return (s.match(/[aeiou]/g) || []).length;
}

// how many letters the two names share (by occurrence)
function sharedLetters(a: string, b: string): number {
  const pool = b.split("");
  let shared = 0;
  for (const ch of a) {
    const idx = pool.indexOf(ch);
    if (idx !== -1) {
      shared++;
      pool.splice(idx, 1);
    }
  }
  return shared;
}

/* ------------------------------------------------------------------ */
/* the five compatibility metrics                                      */
/* ------------------------------------------------------------------ */

function buildMetrics(a: string, b: string): Metric[] {
  const maxLen = Math.max(a.length, b.length) || 1;
  const shared = sharedLetters(a, b);
  const sharedRatio = shared / maxLen; // 0..1
  const vowelBalance =
    1 - Math.abs(countVowels(a) / (a.length || 1) - countVowels(b) / (b.length || 1)); // ~0..1
  const lenBalance = 1 - Math.abs(a.length - b.length) / (a.length + b.length || 1);

  // Each metric blends a "real" signal with a stable hash jitter so results
  // feel varied but never change for the same pair of names.
  const mk = (
    key: string,
    label: string,
    emoji: string,
    base: number,
    salt: string,
    blurbs: [string, string, string]
  ): Metric => {
    const jitter = (pairSeed(a, b, salt) % 27) - 8; // -8..+18 (gentle upward bias)
    const score = clamp(Math.round(base + jitter), 12, 100);
    const blurb = score >= 75 ? blurbs[0] : score >= 50 ? blurbs[1] : blurbs[2];
    return { key, label, emoji, score, blurb };
  };

  return [
    mk("chemistry", "Chemistry", "🔥", 48 + sharedRatio * 55, "chem", [
      "Instant spark - the attraction is undeniable.",
      "A warm, steady pull toward each other.",
      "Slow-burn chemistry that grows with time.",
    ]),
    mk("communication", "Communication", "💬", 46 + vowelBalance * 52, "comm", [
      "You just get each other - conversation flows.",
      "Good back-and-forth with room to deepen.",
      "Talk it out often; understanding takes effort.",
    ]),
    mk("trust", "Trust", "🤝", 50 + lenBalance * 46, "trust", [
      "Rock-solid - you can lean on each other fully.",
      "Trust is there and strengthening.",
      "Build trust slowly through small promises kept.",
    ]),
    mk("passion", "Passion", "💖", 44 + sharedRatio * 40, "pass", [
      "Fireworks - this bond runs hot and deep.",
      "A romantic connection worth nurturing.",
      "Keep the romance alive with little gestures.",
    ]),
    mk("harmony", "Long-term harmony", "🕊️", 52, "harm", [
      "Beautifully in sync for the long haul.",
      "A balanced match with real staying power.",
      "Different rhythms - patience makes it work.",
    ]),
  ];
}

/* ------------------------------------------------------------------ */
/* FLAMES game                                                         */
/* ------------------------------------------------------------------ */

const FLAMES_MAP: Record<FlamesResult["letter"], Omit<FlamesResult, "letter">> = {
  F: { label: "Friends", emoji: "🫂", description: "A genuine, easy friendship is written in your names - the kind that lasts." },
  L: { label: "Love", emoji: "❤️", description: "Romance is in the air - your names point straight to love." },
  A: { label: "Affection", emoji: "🥰", description: "Warmth and tenderness define you two - sweet, caring affection." },
  M: { label: "Marriage", emoji: "💍", description: "Wedding bells! Your names hint at a lifelong commitment." },
  E: { label: "Enemy", emoji: "⚔️", description: "Sparks fly - but the fiery kind. Opposites that keep it interesting!" },
  S: { label: "Siblings", emoji: "👫", description: "A playful, sibling-like bond - comfortable, loyal and fun." },
};

export function computeFlames(name1: string, name2: string): FlamesResult {
  const a = cleanName(name1).split("");
  const b = cleanName(name2).split("");

  // remove letters common to both (one occurrence at a time)
  for (let i = a.length - 1; i >= 0; i--) {
    const idx = b.indexOf(a[i]);
    if (idx !== -1) {
      b.splice(idx, 1);
      a.splice(i, 1);
    }
  }

  let count = a.length + b.length;
  const letters: FlamesResult["letter"][] = ["F", "L", "A", "M", "E", "S"];
  const pool = [...letters];

  if (count === 0) {
    // identical names - default to Love
    const meaning = FLAMES_MAP.L;
    return { letter: "L", ...meaning };
  }

  let start = 0;
  while (pool.length > 1) {
    const removeIdx = (start + count - 1) % pool.length;
    pool.splice(removeIdx, 1);
    start = removeIdx % pool.length;
  }

  const letter = pool[0];
  return { letter, ...FLAMES_MAP[letter] };
}

/* ------------------------------------------------------------------ */
/* zodiac + numerology (only when both birthdays are provided)         */
/* ------------------------------------------------------------------ */

const ZODIAC: { name: string; emoji: string; element: ZodiacSign["element"]; from: [number, number] }[] = [
  { name: "Capricorn", emoji: "♑", element: "Earth", from: [12, 22] },
  { name: "Aquarius", emoji: "♒", element: "Air", from: [1, 20] },
  { name: "Pisces", emoji: "♓", element: "Water", from: [2, 19] },
  { name: "Aries", emoji: "♈", element: "Fire", from: [3, 21] },
  { name: "Taurus", emoji: "♉", element: "Earth", from: [4, 20] },
  { name: "Gemini", emoji: "♊", element: "Air", from: [5, 21] },
  { name: "Cancer", emoji: "♋", element: "Water", from: [6, 21] },
  { name: "Leo", emoji: "♌", element: "Fire", from: [7, 23] },
  { name: "Virgo", emoji: "♍", element: "Earth", from: [8, 23] },
  { name: "Libra", emoji: "♎", element: "Air", from: [9, 23] },
  { name: "Scorpio", emoji: "♏", element: "Water", from: [10, 23] },
  { name: "Sagittarius", emoji: "♐", element: "Fire", from: [11, 22] },
];

function signFor(dob: string): ZodiacSign | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dob);
  if (!m) return null;
  const month = Number(m[2]);
  const day = Number(m[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  // find the last sign whose start date is on/before this date
  let chosen = ZODIAC[0]; // Capricorn wraps the year
  for (const z of ZODIAC) {
    const [zm, zd] = z.from;
    if (month > zm || (month === zm && day >= zd)) chosen = z;
  }
  // handle late-December Capricorn (already default) and the year wrap
  if (month === 12 && day >= 22) chosen = ZODIAC[0];
  return { name: chosen.name, emoji: chosen.emoji, element: chosen.element };
}

function elementScore(e1: ZodiacSign["element"], e2: ZodiacSign["element"]): number {
  if (e1 === e2) return 88;
  const complementary =
    (e1 === "Fire" && e2 === "Air") ||
    (e1 === "Air" && e2 === "Fire") ||
    (e1 === "Earth" && e2 === "Water") ||
    (e1 === "Water" && e2 === "Earth");
  if (complementary) return 82;
  const tense =
    (e1 === "Fire" && e2 === "Water") ||
    (e1 === "Water" && e2 === "Fire") ||
    (e1 === "Earth" && e2 === "Air") ||
    (e1 === "Air" && e2 === "Earth");
  return tense ? 58 : 70;
}

function computeZodiac(dob1?: string, dob2?: string): ZodiacResult | null {
  if (!dob1 || !dob2) return null;
  const s1 = signFor(dob1);
  const s2 = signFor(dob2);
  if (!s1 || !s2) return null;
  const score = elementScore(s1.element, s2.element);
  const sameEl = s1.element === s2.element;
  const summary = sameEl
    ? `Two ${s1.element} signs - you share the same emotional wavelength and instinctively understand each other.`
    : score >= 80
      ? `${s1.element} and ${s2.element} complement beautifully - one lights the spark, the other keeps it grounded.`
      : score >= 65
        ? `${s1.element} meets ${s2.element} - a balanced pairing that thrives on curiosity and give-and-take.`
        : `${s1.element} and ${s2.element} pull in different directions - exciting, but it rewards patience and compromise.`;
  return { sign1: s1, sign2: s2, score, summary };
}

// numerology life-path: reduce all digits of the birthdate to a single digit
function lifePath(dob: string): number | null {
  const digits = dob.replace(/\D/g, "");
  if (digits.length < 8) return null;
  let sum = digits.split("").reduce((a, d) => a + Number(d), 0);
  while (sum > 9) sum = String(sum).split("").reduce((a, d) => a + Number(d), 0);
  return sum;
}

function computeNumerology(dob1?: string, dob2?: string): NumerologyResult | null {
  if (!dob1 || !dob2) return null;
  const p1 = lifePath(dob1);
  const p2 = lifePath(dob2);
  if (p1 === null || p2 === null) return null;
  const diff = Math.abs(p1 - p2);
  const score = p1 === p2 ? 90 : diff <= 2 ? 80 : diff <= 4 ? 68 : 60;
  const summary =
    p1 === p2
      ? `You share Life Path ${p1} - a rare mirror match; you move through life to the same beat.`
      : diff <= 2
        ? `Life Paths ${p1} and ${p2} sit close together - naturally harmonious and easy to align.`
        : `Life Paths ${p1} and ${p2} are different - you each bring what the other lacks, a growth-minded pairing.`;
  return { path1: p1, path2: p2, score, summary };
}

/* ------------------------------------------------------------------ */
/* tiers (the headline verdict + tips)                                 */
/* ------------------------------------------------------------------ */

function tierFor(pct: number): LoveTier {
  if (pct >= 90)
    return {
      message: "Perfect Match!",
      emoji: "❤️‍🔥",
      hue: 348,
      description: "Your souls are deeply in sync - this is the rare, once-in-a-lifetime kind of connection.",
      tips: [
        "Treasure this rare bond and never take it for granted",
        "Keep supporting each other's biggest dreams",
        "Celebrate your milestones, big and small",
        "Build your future together with confidence",
      ],
    };
  if (pct >= 75)
    return {
      message: "Amazing Compatibility!",
      emoji: "💕",
      hue: 336,
      description: "You complement each other wonderfully - this relationship has serious lasting potential.",
      tips: [
        "Communicate openly and honestly, always",
        "Turn your differences into strengths",
        "Make time for shared adventures",
        "Show appreciation for each other daily",
      ],
    };
  if (pct >= 60)
    return {
      message: "Great Connection!",
      emoji: "💖",
      hue: 322,
      description: "There's a strong bond here - with care and understanding it can truly flourish.",
      tips: [
        "Invest in getting to know each other deeply",
        "Find hobbies and interests you both enjoy",
        "Plan thoughtful, romantic dates",
        "Work through obstacles as a team",
      ],
    };
  if (pct >= 45)
    return {
      message: "Good Potential",
      emoji: "💝",
      hue: 292,
      description: "The foundations are solid - every great relationship grows from exactly here with the right effort.",
      tips: [
        "Be patient and give the bond time to grow",
        "Communicate your needs clearly and kindly",
        "Discover what makes each other laugh",
        "Celebrate the small wins together",
      ],
    };
  if (pct >= 30)
    return {
      message: "Worth Exploring",
      emoji: "💜",
      hue: 258,
      description: "You're different in meaningful ways - but with openness, opposites can create something exciting.",
      tips: [
        "Build a strong friendship as your base",
        "Practice empathy and active listening",
        "Respect and celebrate your differences",
        "Take things slow - there's no rush",
      ],
    };
  return {
    message: "Different Paths",
    emoji: "💛",
    hue: 210,
    description: "Very different energies here - sometimes that contrast sparks a uniquely interesting dynamic.",
    tips: [
      "Focus on mutual respect and friendship first",
      "Stay curious about each other's world",
      "Look for the small things you do share",
      "Remember love comes in many forms",
    ],
  };
}

/* ------------------------------------------------------------------ */
/* main entry                                                          */
/* ------------------------------------------------------------------ */

export function computeLove(inp: LoveInputs): LoveResult {
  const a = cleanName(inp.name1);
  const b = cleanName(inp.name2);

  const metrics = buildMetrics(a || "x", b || "y");
  const zodiac = computeZodiac(inp.dob1, inp.dob2);
  const numerology = computeNumerology(inp.dob1, inp.dob2);

  // Overall = weighted blend of the metrics, nudged by zodiac/numerology when
  // available, plus a small stable hash so it never lands on a boring round-0.
  const metricAvg = metrics.reduce((s, m) => s + m.score, 0) / metrics.length;
  let percentage = metricAvg;
  if (zodiac) percentage = percentage * 0.82 + zodiac.score * 0.18;
  if (numerology) percentage = percentage * 0.9 + numerology.score * 0.1;
  const nudge = (pairSeed(a, b, "overall") % 7) - 3; // -3..+3
  percentage = clamp(Math.round(percentage + nudge), 12, 100);

  return {
    name1: inp.name1.trim(),
    name2: inp.name2.trim(),
    percentage,
    tier: tierFor(percentage),
    metrics,
    flames: computeFlames(inp.name1, inp.name2),
    zodiac,
    numerology,
  };
}

/* ------------------------------------------------------------------ */
/* URL share encoding                                                  */
/* ------------------------------------------------------------------ */

export function inputsToQuery(inp: LoveInputs): string {
  const p = new URLSearchParams();
  p.set("a", inp.name1.trim());
  p.set("b", inp.name2.trim());
  if (inp.dob1) p.set("d1", inp.dob1);
  if (inp.dob2) p.set("d2", inp.dob2);
  return p.toString();
}

export function queryToInputs(search: string): LoveInputs | null {
  const p = new URLSearchParams(search);
  const a = p.get("a");
  const b = p.get("b");
  if (!a || !b) return null;
  const iso = /^\d{4}-\d{2}-\d{2}$/;
  const d1 = p.get("d1");
  const d2 = p.get("d2");
  return {
    name1: a.slice(0, 50),
    name2: b.slice(0, 50),
    dob1: d1 && iso.test(d1) ? d1 : undefined,
    dob2: d2 && iso.test(d2) ? d2 : undefined,
  };
}
