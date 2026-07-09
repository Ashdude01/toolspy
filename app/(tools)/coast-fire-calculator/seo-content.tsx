/**
 * Server-only SEO content for this tool page.
 * No "use client" - all markup is server-rendered so view-source and crawlers see full HTML.
 *
 * Layout mirrors the original Coast FIRE tool: a sticky table of contents on the
 * left and long-form article content on the right, with Related Tools rendered
 * just above the whole section.
 */
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { Toc, type TocItem } from "./toc";

const TOC: TocItem[] = [
  { id: "calculator", label: "Calculator" },
  { id: "what-is-coast-fire", label: "What is Coast FIRE?" },
  { id: "how-it-works", label: "How this calculator works" },
  { id: "formula", label: "The Coast FIRE formula" },
  { id: "by-age", label: "Coast FIRE numbers by age" },
  { id: "fire-types", label: "Coast vs Barista vs Lean FIRE" },
  { id: "accounts", label: "401(k), IRA or taxable?" },
  { id: "assumptions", label: "Choosing your assumptions" },
  { id: "speed-up", label: "Reach coast faster" },
  { id: "faq", label: "FAQ" },
];

export function CoastFireCalculatorSEOContent() {
  return (
    <>
      {/* Related tools — rendered just above the SEO content */}
      <nav aria-label="Similar tools" className="mb-12">
        <RelatedTools
          currentToolSlug="coast-fire-calculator"
          title="Similar Tools You Might Like"
          description="Other calculators that pair well with retirement planning."
        />
      </nav>

      {/* content grid with sticky ToC */}
      <div className="grid lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside>
          <Toc items={TOC} />
        </aside>

        <div className="max-w-3xl">
          <article className="article">
            <h2 id="what-is-coast-fire">What is Coast FIRE?</h2>
            <p>
              <strong>Coast FIRE</strong> (Financial Independence, Retire Early) is the point where your existing
              investments are large enough that <strong>compound growth alone</strong> will carry them to a full
              retirement pot by your target retirement age — with zero further contributions. Once you cross it, saving
              for retirement becomes optional. You still work to pay the bills, but every dollar of pressure to
              &ldquo;save more&rdquo; disappears: the portfolio finishes the job by itself.
            </p>
            <p>
              That makes Coast FIRE the most achievable milestone on the FIRE spectrum. You don&apos;t need the $1.5m+
              pot that full early retirement demands — you need a much smaller amount, <strong>early</strong>. Time does
              the heavy lifting: money invested at 30 has 35 years to compound before a typical retirement at 65.
            </p>

            <h2 id="how-it-works">How this calculator works</h2>
            <p>Enter six things and the calculator answers three questions instantly, right in your browser:</p>
            <ul>
              <li>
                <strong>Your Coast FIRE number today</strong> — the pot that, growing untouched at your assumed real
                return, becomes your full FIRE number by retirement age.
              </li>
              <li>
                <strong>Whether you&apos;ve already coasted</strong> — a progress bar shows how far along you are, and
                the shortfall if you haven&apos;t.
              </li>
              <li>
                <strong>Your coast age</strong> — if you keep contributing at your current rate, the age at which you
                cross the coast line. The chart marks the exact crossing point, and the shareable link preserves your
                whole scenario.
              </li>
            </ul>
            <p>
              Everything is computed in <strong>today&apos;s money</strong>: the growth rate you enter is deflated by
              your inflation assumption, so results are directly comparable to today&apos;s prices. Nothing you type is
              sent to a server — the math runs entirely on your device.
            </p>

            <h2 id="formula">The Coast FIRE formula</h2>
            <p>Two steps. First, the classic FIRE number from your desired spending and a safe withdrawal rate (SWR):</p>
            <code className="formula">FIRE number = annual spending ÷ withdrawal rate</code>
            <p>Then discount it back from retirement age to your age today using the real (after-inflation) return:</p>
            <code className="formula">
              Coast FIRE number = FIRE number ÷ (1 + real return)^(retirement age − current age)
            </code>
            <p>
              <strong>Worked example:</strong> spending of $60,000 a year at a 4% withdrawal rate needs a FIRE number of
              $1,500,000. With 7% nominal growth and 3% inflation (≈3.9% real), a 30-year-old retiring at 65 needs only
              about <strong>$395,000 today</strong> to coast. The other $1.1m? Compounding builds it.
            </p>

            <h2 id="by-age">Coast FIRE numbers by age</h2>
            <p>
              Using the same defaults ($60,000 spending, 4% SWR, 7% growth, 3% inflation, retire at 65), here&apos;s
              roughly what you&apos;d need invested at each age to be coasting already:
            </p>
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Age today</th>
                    <th>Coast FIRE number</th>
                    <th>% of full FIRE number</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [25, "$327,000", "22%"],
                    [30, "$395,000", "26%"],
                    [35, "$478,000", "32%"],
                    [40, "$579,000", "39%"],
                    [45, "$700,000", "47%"],
                    [50, "$847,000", "56%"],
                  ].map(([age, num, pct]) => (
                    <tr key={String(age)}>
                      <td>{age}</td>
                      <td>{num}</td>
                      <td>{pct}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              Notice the pattern: every five years you wait, the bar rises by roughly a quarter. That&apos;s the whole
              argument for front-loading retirement savings in your 20s and 30s.
            </p>

            <h2 id="fire-types">Coast FIRE vs Barista, Lean &amp; Fat FIRE</h2>
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Variant</th>
                    <th>What it means</th>
                    <th>Do you still work?</th>
                    <th>Do you touch the portfolio?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Coast FIRE</strong>
                    </td>
                    <td>Investments will reach full FIRE by themselves</td>
                    <td>Yes — to cover living costs</td>
                    <td>No</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Barista FIRE</strong>
                    </td>
                    <td>Part-time work plus partial withdrawals</td>
                    <td>Yes — part-time</td>
                    <td>Yes, partially</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Lean FIRE</strong>
                    </td>
                    <td>Fully retired on a frugal budget</td>
                    <td>No</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Fat FIRE</strong>
                    </td>
                    <td>Fully retired on a generous budget</td>
                    <td>No</td>
                    <td>Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="accounts">401(k), IRA or taxable — where should coast money live?</h2>
            <p>Coast FIRE doesn&apos;t care which account your money sits in, but taxes do:</p>
            <ul>
              <li>
                <strong>401(k) with employer match:</strong> take the full match before anything else — it&apos;s an
                instant 50–100% return. Penalty-free access normally begins at 59½.
              </li>
              <li>
                <strong>Roth IRA:</strong> contributions (not earnings) can be withdrawn any time, making Roth money a
                flexible piece of an early-retirement plan; qualified growth is tax-free.
              </li>
              <li>
                <strong>Taxable brokerage:</strong> no limits and no lock-ins — long-term capital gains rates apply.
                This is what funds the years before 59½ if you retire very early.
              </li>
            </ul>
            <p>
              A common Coast FIRE pattern: max the match, fill the Roth, then let the whole pot coast while you
              downshift careers.
            </p>

            <h2 id="assumptions">Choosing your assumptions (the honest version)</h2>
            <p>Your coast number is only as good as three inputs:</p>
            <ul>
              <li>
                <strong>Real return:</strong> global equities have historically returned roughly 5% after inflation over
                long horizons; 7% nominal with 3% inflation (≈4–4.5% real) is a reasonable planning default, and dropping
                to 3.5–4% real gives you margin for bad decades.
              </li>
              <li>
                <strong>Withdrawal rate:</strong> 4% is the classic US rule of thumb; longer retirements and cautious
                planners favour 3–3.5%. Small changes move the answer a lot — that&apos;s why the slider exists.
              </li>
              <li>
                <strong>Spending:</strong> the single most powerful lever. Every $1,000 of annual retirement spending you
                trim removes roughly $25,000 (at 4%) from your FIRE number — and shrinks your coast number with it.
              </li>
            </ul>

            <h2 id="speed-up">Five ways to reach your coast number faster</h2>
            <ol>
              <li>
                <strong>Front-load ruthlessly.</strong> Money invested this year compounds for every remaining year —
                the table above shows the bar rising ~25% for every five years of delay.
              </li>
              <li>
                <strong>Capture every match.</strong> Employer contributions are part of your coast pot too, and
                they&apos;re free.
              </li>
              <li>
                <strong>Cut investment fees.</strong> A 1% platform-plus-fund fee is a ~20% lifetime haircut on a coast
                portfolio. Broad index funds under 0.2% keep compounding for you, not your platform.
              </li>
              <li>
                <strong>Bank your raises.</strong> Direct half of every pay rise to investments before lifestyle absorbs
                it — your savings rate climbs without feeling poorer.
              </li>
              <li>
                <strong>Re-test yearly, not daily.</strong> Coast status wobbles with markets. Check once a year with
                fresh numbers; act on trends, not headlines.
              </li>
            </ol>

            <h2 id="faq">Frequently asked questions</h2>
            <FAQ variant="default" faqs={getCoastFireCalculatorFAQs()} />

            <p className="mt-8 rounded-lg border border-border bg-muted/50 p-4 text-xs leading-relaxed">
              <strong>Disclaimer:</strong> This page is educational content, not personalised financial advice.
              Projections use constant returns and ignore taxes, fees and sequence-of-returns risk unless stated.
              Consider speaking to a regulated financial adviser before making retirement decisions.
            </p>
          </article>
        </div>
      </div>
    </>
  );
}

// Export FAQ data for schema generation
export function getCoastFireCalculatorFAQs() {
  return [
    {
      question: "What is a Coast FIRE number?",
      answer:
        "Your Coast FIRE number is the amount you need invested today so that compound growth alone — with zero further contributions — grows it into your full retirement nest egg by your target retirement age. Once you hit it, you only need to earn enough to cover your living costs until retirement.",
    },
    {
      question: "Is Coast FIRE realistic with market volatility?",
      answer:
        "Coast FIRE math assumes a steady average return, but real markets move in cycles. Most planners handle this by using a conservative real return (4–5% after inflation), keeping a cash buffer, and re-checking their coast status yearly. Hitting your coast number doesn't mean you must stop contributing — it means you no longer have to.",
    },
    {
      question: "Does this calculator account for inflation?",
      answer:
        "Yes. It works in today's money: your growth rate is converted to a real (after-inflation) return, so the Coast FIRE number you see is directly comparable to today's prices and salaries.",
    },
    {
      question: "What withdrawal rate should I use?",
      answer:
        "The classic rule of thumb is 4%, based on the Trinity study of US market history. Many people planning longer retirements use 3.25–3.75% to be safer. A lower withdrawal rate raises your FIRE number and therefore your coast number.",
    },
    {
      question: "Does Coast FIRE include Social Security?",
      answer:
        "This calculator is conservative and ignores Social Security. Any benefits you receive later reduce the portfolio you actually need, so treat the result as a cautious upper bound — or lower your annual spending input by the benefit you expect.",
    },
    {
      question: "What's the difference between Coast FIRE and Barista FIRE?",
      answer:
        "Coast FIRE means your investments will grow to full retirement size on their own while you still cover your living costs with normal work. Barista FIRE means you also partially draw on investments while working part-time. Coast keeps the portfolio untouched; Barista taps it early.",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("coast-fire-calculator", getCoastFireCalculatorFAQs);
