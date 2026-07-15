// Coast FIRE math engine - all values in today's (real) money.

export type Region = "us" | "uk";

export interface CoastInputs {
  currentAge: number;
  retireAge: number;
  currentInvested: number;
  monthlyContribution: number;
  annualSpending: number; // desired retirement spending, today's money
  nominalReturn: number;  // % e.g. 7
  inflation: number;      // % e.g. 3
  swr: number;            // % e.g. 4
}

export interface YearPoint {
  age: number;
  withContrib: number; // balance if you keep contributing
  coastNow: number;    // balance if you stop contributing today
  target: number;      // coast number required at this age
}

export interface CoastResult {
  fireNumber: number;        // full FIRE number at retirement (today's money)
  coastNumberToday: number;  // required today to coast
  progress: number;          // currentInvested / coastNumberToday (0..1+)
  coastAchieved: boolean;
  coastAge: number | null;   // age when contributions path crosses target
  coastAmount: number | null;// balance at that age
  valueAtRetirementCoastNow: number; // if you stop contributing today
  valueAtRetirementContrib: number;  // if you keep contributing
  shortfallToday: number;    // coastNumberToday - currentInvested (>=0)
  realReturn: number;        // decimal
  series: YearPoint[];
}

export function realRate(nominalPct: number, inflationPct: number): number {
  return (1 + nominalPct / 100) / (1 + inflationPct / 100) - 1;
}

function growYear(balance: number, monthly: number, annualRate: number): number {
  const m = Math.pow(1 + annualRate, 1 / 12) - 1;
  let b = balance;
  for (let i = 0; i < 12; i++) b = b * (1 + m) + monthly;
  return b;
}

export function computeCoast(inp: CoastInputs): CoastResult {
  const r = realRate(inp.nominalReturn, inp.inflation);
  const years = Math.max(0, inp.retireAge - inp.currentAge);
  const fireNumber = inp.annualSpending / (inp.swr / 100);
  const coastNumberToday = fireNumber / Math.pow(1 + r, years);

  const series: YearPoint[] = [];
  let withContrib = inp.currentInvested;
  let coastNow = inp.currentInvested;
  let coastAge: number | null = null;
  let coastAmount: number | null = null;

  for (let age = inp.currentAge; age <= inp.retireAge; age++) {
    const target = fireNumber / Math.pow(1 + r, inp.retireAge - age);
    series.push({ age, withContrib, coastNow, target });
    if (coastAge === null && withContrib >= target) {
      coastAge = age;
      coastAmount = withContrib;
    }
    if (age < inp.retireAge) {
      withContrib = growYear(withContrib, inp.monthlyContribution, r);
      coastNow = coastNow * Math.pow(1 + r, 1);
    }
  }

  const last = series[series.length - 1];
  return {
    fireNumber,
    coastNumberToday,
    progress: coastNumberToday > 0 ? inp.currentInvested / coastNumberToday : 0,
    coastAchieved: inp.currentInvested >= coastNumberToday,
    coastAge,
    coastAmount,
    valueAtRetirementCoastNow: last ? last.coastNow : inp.currentInvested,
    valueAtRetirementContrib: last ? last.withContrib : inp.currentInvested,
    shortfallToday: Math.max(0, coastNumberToday - inp.currentInvested),
    realReturn: r,
    series
  };
}

export const DEFAULTS: Record<Region, CoastInputs> = {
  us: {
    currentAge: 30,
    retireAge: 65,
    currentInvested: 120000,
    monthlyContribution: 1000,
    annualSpending: 60000,
    nominalReturn: 7,
    inflation: 3,
    swr: 4
  },
  uk: {
    currentAge: 30,
    retireAge: 65,
    currentInvested: 80000,
    monthlyContribution: 600,
    annualSpending: 35000,
    nominalReturn: 7,
    inflation: 2.5,
    swr: 3.5
  }
};

export function fmtMoney(v: number, region: Region, compact = false): string {
  const locale = region === "uk" ? "en-GB" : "en-US";
  const currency = region === "uk" ? "GBP" : "USD";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
    notation: compact ? "compact" : "standard"
  }).format(Math.round(v));
}

// --- share-url helpers (client only) ---
const KEYS: [keyof CoastInputs, string][] = [
  ["currentAge", "a"],
  ["retireAge", "r"],
  ["currentInvested", "i"],
  ["monthlyContribution", "m"],
  ["annualSpending", "s"],
  ["nominalReturn", "g"],
  ["inflation", "inf"],
  ["swr", "w"]
];

export function inputsToQuery(inp: CoastInputs): string {
  const p = new URLSearchParams();
  for (const [k, q] of KEYS) p.set(q, String(inp[k]));
  return p.toString();
}

export function queryToInputs(search: string, base: CoastInputs): CoastInputs {
  const p = new URLSearchParams(search);
  const out = { ...base };
  for (const [k, q] of KEYS) {
    const v = p.get(q);
    if (v !== null && v !== "" && !Number.isNaN(Number(v))) {
      out[k] = Number(v);
    }
  }
  return out;
}
