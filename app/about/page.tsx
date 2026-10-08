import type { Metadata } from "next";
import Link from "next/link";
import { getAreas, getSettings, getStats } from "@/lib/queries";
import { Eyebrow, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "A PEC-registered construction team in Islamabad and Rawalpindi building on written scope and engineering supervision.",
};

export const dynamic = "force-dynamic";

const aboutNav: [string, string][] = [
  ["Who We Are", "#who-we-are"],
  ["Our Mission", "#mission"],
  ["Our Vision", "#vision"],
  ["Our Values", "#values"],
  ["Our Team", "#team"],
  ["Our Market Expertise", "#market-expertise"],
  ["Our Partners", "#partners"],
  ["Our Office", "#office"],
  ["Our Achievements", "#achievements"],
];

export default function AboutPage() {
  const settings = getSettings();
  const stats = getStats();
  const areas = getAreas();

  const values: [string, string][] = [
    [
      "Written before built",
      "No work starts without drawings and a bill of quantities you have signed off. If it is not in the BOQ, it is not on the invoice.",
    ],
    [
      "One accountable team",
      "Design, structure, finishing and handover are managed together, so you never become the coordinator between contractors.",
    ],
    [
      "Reported every week",
      "Dated site photos and a short progress note go out weekly — built for owners who cannot stand on site themselves.",
    ],
    [
      "Payments follow progress",
      "Invoices are tied to physical milestones verified on site. You pay for work you can see, not for promises.",
    ],
  ];

  const mission: [string, string][] = [
    [
      "Verified options only",
      "Every property opportunity is checked for documentation, location and market reality before it reaches you.",
    ],
    [
      "Clear pricing",
      "Rates, charges and expected returns are shared upfront, so there are no hidden costs or inflated promises.",
    ],
    [
      "Guidance, not pressure",
      "We shortlist what fits your budget and goals, explain the trade-offs, and leave the decision with you.",
    ],
  ];

  const vision: [string, string][] = [
    [
      "One responsible team",
      "Research, marketing, paperwork and support stay with a single team you can reach at any time.",
    ],
    [
      "Informed investors",
      "Give families and investors the data they need to build wealth through well-planned property decisions.",
    ],
    [
      "Wider coverage",
      "Grow verified listings and property services across Islamabad, Rawalpindi and emerging societies.",
    ],
  ];

  const team: [string, string][] = [
    [
      "Property Consultants",
      "Understand your budget, location and goals, then shortlist options that genuinely fit.",
    ],
    [
      "Market Researchers",
      "Track demand, pricing and new developments so every recommendation is backed by data.",
    ],
    [
      "Legal & Documentation",
      "Handle verification, agreements, transfers and paperwork with complete accuracy.",
    ],
    [
      "Marketing & Media",
      "Present each project through digital campaigns, social media and branded content.",
    ],
  ];

  const partners: [string, string][] = [
    [
      "Verified Developers",
      "Direct access to trusted housing schemes, societies and new project launches.",
    ],
    [
      "Legal Consultants",
      "Property lawyers and documentation experts for verification, transfer and agreements.",
    ],
    [
      "Design & Architecture Studios",
      "Architects and structural teams for drawings, approvals and layout planning.",
    ],
    [
      "Finance & Mortgage Advisors",
      "Guidance on payment plans, bank financing and investment structures.",
    ],
  ];

  const achievements: [string, string][] = [
    [
      "Verified track record",
      `${stats.completed} completed projects delivered on documented scope and agreed timelines.`,
    ],
    [
      "Rated by real clients",
      `${stats.avgRating} average rating across ${stats.reviewCount} published client reviews.`,
    ],
    [
      "Trusted by overseas owners",
      "Weekly photo reports keep clients abroad updated from first site visit to handover.",
    ],
    [
      "Wide area coverage",
      `${stats.areas} areas and societies covered with active listings and projects.`,
    ],
  ];

  return (
    <>
      <div
        id="who-we-are"
        className="noise relative overflow-hidden border-t border-concrete bg-navy-deep text-white"
      >
        <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-25" />
        <div className="site-container relative section-y">
          <Eyebrow variant="dark">Who we are</Eyebrow>
          <h1 className="font-display mt-3 max-w-3xl text-[clamp(1.75rem,4vw,3.05rem)] uppercase leading-[1.12] tracking-[0.01em]">
            Building Homes Across Islamabad &amp; Rawalpindi
          </h1>
          <p className="mt-5 max-w-3xl text-[clamp(0.95rem,1.6vw,1.0625rem)] leading-[1.65] text-white/85">
            Expert Marketing &amp; Developers is a construction company delivering grey structure
            to turnkey homes with BOQ-based planning, engineering supervision, milestone payments
            and weekly progress reporting.
          </p>

          <div className="mt-8 grid max-w-[456px] grid-cols-2 gap-3">
            {[
              ["Projects", `${stats.projects}`],
              ["Completed", `${stats.completed}`],
              ["Areas", `${stats.areas}`],
              ["Avg. rating", `${stats.avgRating}`],
            ].map(([k, v]) => (
              <div key={k} className="aspect-square rounded-[16px] border border-white/15 bg-white/[0.06] p-5 text-center">
                <p className="font-display text-5xl leading-none text-gold tabular-nums">{v}</p>
                <p className="font-label mt-3 text-[11px] uppercase tracking-[0.16em] text-white/70">
                  {k}
                </p>
              </div>
            ))}
          </div>
        </div>

        <nav aria-label="About sections" className="relative border-t border-white/15">
          <div className="site-container">
            <ul className="no-scrollbar -mx-4 flex items-center gap-6 overflow-x-auto px-4 py-3.5 sm:mx-0 sm:flex-wrap sm:px-0">
              {aboutNav.map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="font-label whitespace-nowrap text-[11px] uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-gold"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      {/* Our Mission */}
      <section id="mission" className="section-anchor section-y border-t border-concrete bg-paper">
        <div className="site-container">
          <SectionHead
            eyebrow="Our mission"
            title="Make Every Property Decision Simple"
            desc="We help buyers, sellers and investors move with confidence by keeping information, pricing and the process transparent from day one."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {mission.map(([title, body], i) => (
              <div key={title} className="card-light p-7">
                <span className="font-label text-[11px] uppercase tracking-[0.18em] text-steel">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-2 text-2xl uppercase leading-tight text-navy">
                  {title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-body">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section id="vision" className="section-anchor section-y border-t border-concrete bg-white">
        <div className="site-container">
          <SectionHead
            eyebrow="Our vision"
            title="The Most Trusted Name In Property"
            desc="One place where clients can find, compare and close the right property without guesswork or surprises."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {vision.map(([title, body], i) => (
              <div key={title} className="card-light p-7">
                <span className="font-label text-[11px] uppercase tracking-[0.18em] text-steel">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-2 text-2xl uppercase leading-tight text-navy">
                  {title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-body">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        id="values"
        className="section-anchor section-y border-t border-concrete bg-paper"
      >
        <div className="site-container">
          <SectionHead
            eyebrow="Our values"
            title="Four Rules We Don't Bend"
            desc="The same discipline applies whether the plot is 5 Marla or 2 Kanal."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {values.map(([title, body], i) => (
              <div key={title} className="card-light p-7">
                <span className="font-label text-[11px] uppercase tracking-[0.18em] text-steel">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display mt-2 text-2xl uppercase leading-tight text-navy">
                  {title}
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-body">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section id="team" className="section-anchor section-y border-t border-concrete bg-white">
        <div className="site-container">
          <SectionHead
            eyebrow="Our team"
            title="People Behind Every Decision"
            desc="Specialists who research, verify, market and manage every requirement from first call to final transfer."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map(([title, body], i) => (
              <div key={title} className="card-light p-7">
                <span className="font-label text-[11px] uppercase tracking-[0.18em] text-steel">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-2 text-2xl uppercase leading-tight text-navy">
                  {title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-body">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Market Expertise */}
      <section
        id="market-expertise"
        className="section-anchor section-y border-t border-gold/35 bg-navy text-white"
      >
        <div className="site-container">
          <SectionHead
            eyebrow="Our market expertise"
            title="Local Markets We Know Well"
            desc="Demand, pricing and rental trends tracked across the cities and societies we actively work in."
            variant="dark"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {areas.map((a) => (
              <Link
                key={a.slug}
                href={`/areas/${a.slug}`}
                className="card-dark group p-5 transition-colors hover:border-gold/50"
              >
                <h3 className="font-display text-xl uppercase text-white transition-colors group-hover:text-gold">
                  {a.name}
                </h3>
                <p className="mt-1 text-[13px] text-white/70">{a.city}</p>
                <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-white/60">
                  {a.blurb}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Our Partners */}
      <section id="partners" className="section-anchor section-y border-t border-concrete bg-paper">
        <div className="site-container">
          <SectionHead
            eyebrow="Our partners"
            title="People We Work With"
            desc="A trusted network that keeps every transaction documented, lawful and on schedule."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map(([title, body], i) => (
              <div key={title} className="card-light p-7">
                <span className="font-label text-[11px] uppercase tracking-[0.18em] text-steel">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-2 text-2xl uppercase leading-tight text-navy">
                  {title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-body">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office */}
      <section
        id="office"
        className="section-anchor section-y border-t border-concrete bg-white"
      >
        <div className="site-container grid gap-8 rounded-[16px] border border-concrete bg-paper p-8 lg:grid-cols-2">
          <div>
            <Eyebrow>Office</Eyebrow>
            <ul className="mt-4 grid gap-2.5 text-[15px] text-body">
              <li>
                <span className="mr-2 text-gold">📍</span>
                {settings.address}
              </li>
              <li>
                <span className="mr-2 text-gold">🕒</span>
                {settings.hours}
              </li>
              <li>
                <span className="mr-2 text-gold">📞</span>
                {settings.phone}
              </li>
              <li>
                <span className="mr-2 text-gold">✉️</span>
                {settings.email}
              </li>
            </ul>
          </div>
          <div>
            <Eyebrow>Next step</Eyebrow>
            <p className="mt-4 text-[15px] text-body">
              Use the cost calculator for an indicative range, then request a consultation for a
              written bill of quantities.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/cost-calculator"
                className="gold-glow inline-flex min-h-[48px] items-center rounded-[12px] bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition-colors hover:bg-gold-soft"
              >
                Cost Calculator
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-[48px] items-center rounded-[12px] border border-concrete bg-white px-6 py-3 text-sm font-semibold text-ink transition-all hover:border-navy/45 hover:bg-[#F8F7F4]"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Achievements */}
      <section
        id="achievements"
        className="section-anchor section-y border-t border-gold/35 bg-navy-deep text-white"
      >
        <div className="site-container">
          <SectionHead
            eyebrow="Our achievements"
            title="Numbers We Work For"
            desc="Results measured in delivered projects, client reviews and the areas we actively serve."
            variant="dark"
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map(([title, body], i) => (
              <div key={title} className="card-dark p-7">
                <span className="font-label text-[11px] uppercase tracking-[0.18em] text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-2 text-2xl uppercase leading-tight text-white">
                  {title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/75">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              "PEC Registered",
              "Verified Documents",
              "Weekly Reporting",
              "Overseas Friendly",
            ].map((tag) => (
              <span
                key={tag}
                className="font-label rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-gold"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
