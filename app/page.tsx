import Link from "next/link";
import {
  getAreas,
  getFaqs,
  getProjects,
  getServices,
  getSettings,
} from "@/lib/queries";
import { ContactForm } from "@/components/ContactForm";
import { Eyebrow, SectionHead } from "@/components/ui";

export const dynamic = "force-dynamic";

const iconMap: Record<string, string> = {
  layers: "◫",
  key: "🔑",
  sliders: "⚙",
  gem: "◆",
  hammer: "🔨",
  compass: "⌖",
  sun: "☀",
  shield: "⛨",
};

const showcaseColumns: { title: string; items: string[]; note?: string }[] = [
  {
    title: "All Our Pakistan",
    items: [
      "300+ plot has been sale in pakistan",
      "B17 30+ plot hass been sale",
      "2to3 House has been sale",
      "1to2 apartment has been sale",
      "CDA sector ITEL 9to10 plot has been sale",
      "G13 ma 2to3 House has been sale",
    ],
  },
  {
    title: "Personal Project",
    items: [
      "Chakri Road",
      "Dhamial",
      "Fatima Jinnah University",
      "Khan Village",
      "Faisal Town Phase 2",
      "Capital Smart City",
      "200+ House + Plot has been sale",
    ],
    note: "We Also Provide Plots And We Construct Houses Ourselves As Well",
  },
  {
    title: "Agriculture Land",
    items: [
      "We offer spacious and beautifully designed farm houses in sizes ranging from 5, 10, and up to 20 kanal, providing the perfect blend of luxury, comfort, privacy, and a peaceful natural environment. Whether you are looking for a private family retreat, a weekend getaway, or a spacious farm house for investment, we have options to suit your needs",
    ],
  },
];

export default function HomePage() {
  const services = getServices();
  const areas = getAreas();
  const projects = getProjects(6);
  const faqs = getFaqs();
  const settings = getSettings();

  return (
    <>
      {/* Hero */}
      <section className="noise relative overflow-hidden bg-navy-deep text-white">
        <div className="hero-radial pointer-events-none absolute inset-0 opacity-35" />
        <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-[0.28]" />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] md:block"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 38%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 38%)",
          }}
        >
          <div className="h-full w-full bg-gradient-to-br from-navy-mid via-navy to-navy-deep opacity-70" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy-deep from-[28%] via-navy-deep/70 via-[46%] to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-transparent to-navy-deep/30" />

        <div className="site-container relative flex flex-col justify-center pb-24 pt-20 md:min-h-[min(88vh,760px)] md:pb-24 md:pt-24">
          <div className="max-w-[34rem]">
            <Eyebrow variant="dark">Islamabad · Rawalpindi · Bahria Enclave</Eyebrow>

            <h1 className="font-display mt-4 text-[clamp(1.75rem,4.2vw,3.05rem)] uppercase leading-[1.14] tracking-[0.01em] text-white">
              Expert Marketing &amp; Developers
            </h1>

            <p className="mt-5 max-w-[32rem] text-[clamp(0.95rem,1.6vw,1.0625rem)] leading-[1.65] text-white/85">
              Expert Marketing &amp; Developers helps buyers, sellers and investors make confident
              property decisions through professional real estate marketing, project sales,
              investment consultancy and development solutions.
            </p>

            <p className="mt-6 font-label text-[11px] uppercase tracking-[0.22em] text-white/60 sm:text-[12px]">
              Property Marketing, Investment Consultancy &amp; Development Solutions
            </p>

            <p className="mt-3 font-label text-[11px] uppercase tracking-[0.22em] text-gold sm:text-[12px]">
              Your Trusted Real Estate Marketing &amp; Development Partner
            </p>

            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/contact"
                className="gold-glow inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[12px] bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition-colors hover:bg-gold-soft"
              >
                Start Your Project →
              </Link>
              <Link
                href="/cost-calculator"
                className="gold-glow inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[12px] bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition-colors hover:bg-gold-soft"
              >
                Get Free Consultation
              </Link>
            </div>

            <ul className="mt-4 flex max-w-xl flex-wrap gap-x-3 gap-y-2 text-[12px] font-medium text-white/80">
              {["SECP Registered", "CDA Support", "Weekly Photo Reports"].map((t, i) => (
                <li key={t} className="flex items-center gap-3">
                  {i > 0 && <span className="text-white/30">|</span>}
                  <span className="transition-colors hover:text-gold">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Navy delivery band */}
      <section className="border-t border-gold/35 bg-navy text-white">
        <div className="site-container py-1.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Transparent BOQ", "Scope in writing", "/services"],
              ["Engineering Supervision", "Stage reviews", "/about"],
              ["Milestone Payments", "Pay per stage", "/cost-calculator"],
              ["Weekly Updates", "Photo reports", "/projects"],
            ].map(([title, note, href], i) => (
              <Link
                key={title}
                href={href}
                className={`group flex items-center gap-3 border-white/10 py-3 sm:px-4 ${
                  i < 3 ? "border-b sm:border-r lg:border-b-0" : ""
                } ${i === 0 ? "sm:border-l-0 sm:pl-0 lg:pl-0" : ""} ${i === 3 ? "sm:border-b-0 lg:border-r-0" : ""}`}
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold text-sm text-navy-deep">
                  ✓
                </span>
                <span className="min-w-0">
                  <span className="font-display block truncate text-[15px] uppercase sm:text-base">
                    {title}
                  </span>
                  <span className="block truncate text-[13px] text-white/80">{note}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Journey selector */}
      <section className="section-y border-t border-concrete bg-paper">
        <div className="site-container">
          <SectionHead
            eyebrow="Start here"
            title="What Are You Looking For?"
            desc="Tell us your property goal and we will guide you toward the right opportunity."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["I Own a Plot", "Get an indicative construction cost for your plot size.", "/cost-calculator"],
              ["Explore residential", "Compare grey, semi-finished and turnkey delivery.", "/services"],
              ["Commercial properties", "Finish an existing shell with a remaining-scope BOQ.", "/services/renovation"],
              ["Based On Your Location", "Build from abroad with documented weekly reporting.", "/about"],
              ["Budget And Requirements", "Architectural, structural and MEP plans for approval.", "/services/design-engineering"],
              ["I Want to Buy Property", "Talk to us about plots and homes in your area.", "/contact"],
            ].map(([title, desc, href]) => (
              <Link key={title} href={href} className="card-light group p-6">
                <h3 className="font-display text-xl uppercase text-navy transition-colors group-hover:text-gold-dark sm:text-2xl">
                  {title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-body">{desc}</p>
                <span className="font-label mt-4 inline-block text-[11px] uppercase tracking-[0.22em] text-ink transition-colors group-hover:text-navy">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="section-y border-t border-concrete bg-white">
        <div className="site-container">
          <SectionHead
            eyebrow="Why choose us"
            title="Documented Scope. Visible Progress."
            desc="Before concrete is poured: scope in writing, supervision on site and payments tied to stages you can inspect."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["01", "Transparent Guidance", "We provide clear property information, pricing and investment guidance so clients can make informed decisions."],
              ["02", "Strong Market Knowledge", "Our team understands local property markets, locations and investment trends."],
              ["03", "Verified Opportunities", "We focus on relevant and carefully reviewed property opportunities."],
              ["04", "Professional Marketing", "We use digital marketing, social media, project branding and lead-generation strategies to reach serious buyers and investor."],
              ["05", "Investment-Focused Approach", "We help clients compare property opportunities according to location, budget, demand and long-term potential."],
              ["06", "Complete Property Support", "From initial consultation to property selection, negotiation and transaction support, our team stays involved throughout the process."],
            ].map(([num, title, desc]) => (
              <div key={num} className="card-light p-6">
                <span className="font-label text-[11px] uppercase tracking-[0.18em] text-steel">
                  {num}
                </span>
                <h3 className="font-display mt-2 text-2xl uppercase leading-tight text-navy">
                  {title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-body">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee ticker */}
      <section className="overflow-hidden border-y border-concrete bg-paper">
        <div className="flex w-max animate-marquee whitespace-nowrap py-3 will-change-transform hover:[animation-play-state:paused]">
          {[0, 1].map((dup) => (
            <ul key={dup} className="flex shrink-0 items-center gap-8 px-6 sm:gap-10">
              {[
                "PEC Registered",
                "Engineering Supervision",
                "BOQ-Based Scope",
                "Milestone Payments",
                "Weekly Progress Reporting",
                "Islamabad & Rawalpindi",
                "Overseas-Friendly Builds",
              ].map((t) => (
                <li
                  key={t}
                  className="font-label inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-navy sm:text-[12px]"
                >
                  <span className="text-gold">◆</span> {t}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="section-y border-t border-concrete bg-white">
        <div className="site-container">
          <SectionHead
            eyebrow="Construction services"
            title="What We Build"
            desc="Grey structure to turnkey homes, luxury finishes, renovation and architectural design — under one accountable team."
            href="/services"
            linkLabel="All services"
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 8).map((s, i) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="card-light group p-6">
                <div className="flex items-start justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-navy/10 bg-navy text-lg text-gold">
                    {iconMap[s.icon] ?? "▣"}
                  </span>
                  <span className="font-label text-[10px] uppercase tracking-[0.24em] text-steel">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display mt-4 text-xl uppercase leading-tight text-navy transition-colors group-hover:text-gold-dark sm:text-2xl">
                  {s.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-body">{s.short_desc}</p>
                <span className="font-label mt-4 inline-block text-[11px] uppercase tracking-[0.22em] text-ink transition-colors group-hover:text-navy">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="section-y border-t border-concrete bg-paper">
        <div className="site-container">
          <SectionHead
            eyebrow="Areas we serve"
            title="Construction Across Islamabad & Rawalpindi"
            desc="City hubs and society guides for the plots we actually build on."
            href="/areas"
            linkLabel="Explore all areas"
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {showcaseColumns.map((col, i) => (
              <article
                key={col.title}
                className="card-light group flex h-full flex-col p-5"
              >
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-gold-dark">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-1 text-xl uppercase leading-tight text-navy transition-colors group-hover:text-gold-dark">
                  {col.title}
                </h3>
                <ul className="mt-4 flex-1 border-t border-concrete">
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 border-b border-concrete/70 py-2.5 text-[15px] leading-relaxed text-body last:border-b-0"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {col.note && (
                  <p className="mt-4 rounded-[10px] border border-concrete bg-paper px-3.5 py-2.5 text-[14px] leading-relaxed text-steel">
                    {col.note}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Projects — dark gallery */}
      <section className="noise relative section-y overflow-hidden bg-navy-deep">
        <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-25" />
        <div className="site-container relative">
          <div className="flex flex-col items-start gap-3 max-w-3xl">
            <Eyebrow variant="dark">Featured projects</Eyebrow>
            <h2 className="font-display text-[clamp(1.65rem,3.2vw,2.65rem)] uppercase leading-[1.08] tracking-[0.01em] text-white">
              See What We&apos;ve Built
            </h2>
            <p className="max-w-2xl text-[15px] leading-relaxed text-white/80">
              Completed and ongoing projects across Islamabad and Rawalpindi — every entry is a
              real address.
            </p>
          </div>

          <div className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2">
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group w-[min(85vw,340px)] shrink-0 snap-start overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.03] transition-colors hover:border-gold/50"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-navy-mid to-navy-deep">
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/75 via-transparent to-transparent" />
                  <span
                    className={`absolute left-3 top-3 rounded-full px-2.5 py-1 font-label text-[11px] uppercase tracking-[0.14em] ${
                      p.status === "Completed"
                        ? "border border-emerald-400/40 bg-emerald-500/25 text-emerald-200"
                        : p.status === "Ongoing"
                          ? "border border-gold/50 bg-gold/20 text-gold-soft"
                          : "border border-white/25 bg-white/10 text-white"
                    }`}
                  >
                    {p.status}
                  </span>
                  <span className="absolute bottom-3 right-3 font-label text-[11px] uppercase tracking-[0.14em] text-white/70">
                    {p.plot_size}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl uppercase leading-tight text-white transition-colors group-hover:text-gold">
                    {p.title}
                  </h3>
                  <p className="mt-2 font-label text-[11px] uppercase tracking-[0.14em] text-white/55">
                    {p.area_name} · {p.scope} · {p.year}
                  </p>
                  <p className="mt-3 line-clamp-2 text-[15px] leading-relaxed text-white/75">
                    {p.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/projects"
            className="font-label mt-6 inline-block text-[11px] uppercase tracking-[0.22em] text-white transition-colors hover:text-gold"
          >
            Full portfolio →
          </Link>
        </div>
      </section>

      {/* Reviews */}
      <section className="section-y border-t border-concrete bg-paper">
        <div className="site-container">
          <SectionHead eyebrow="Client reviews" title="What Clients Say" />
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y border-t border-concrete bg-white">
        <div className="site-container">
          <SectionHead
            eyebrow="FAQs"
            title="Construction Questions"
            desc="Direct answers on cost, timelines, scopes and how we work."
          />
          <div className="mt-8 overflow-hidden rounded-[16px] border border-concrete bg-paper/40">
            {faqs.map((f, i) => (
              <details
                key={f.id}
                className="group border-b border-concrete last:border-b-0 open:bg-white"
                open={i === 0}
              >
                <summary className="group relative flex min-h-[56px] cursor-pointer list-none items-start justify-between gap-4 py-5 pl-4 pr-3 text-left sm:py-6 sm:pl-5 sm:pr-4">
                  <span className="absolute bottom-0 left-0 top-0 hidden w-[3px] bg-gold group-open:block" />
                  <span className="flex items-start gap-4">
                    <span className="font-label mt-1.5 text-[11px] uppercase tracking-[0.18em] text-gold-dark">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[1.05rem] uppercase leading-snug text-navy sm:text-xl">
                      {f.question}
                    </span>
                  </span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold bg-gold/15 text-navy transition-transform group-open:rotate-180">
                    ▾
                  </span>
                </summary>
                <p className="pb-5 pl-11 pr-6 text-[15px] leading-relaxed text-body sm:pb-6 sm:pl-14 sm:pr-16 sm:text-base">
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / form */}
      <section className="section-y border-t border-concrete bg-paper">
        <div className="site-container grid gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>Free consultation</Eyebrow>
            <h2 className="font-display mt-3 text-[clamp(1.65rem,3.2vw,2.65rem)] uppercase leading-[1.08] text-ink">
              Start Your Construction Project
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-body">
              Share your name, phone, location, plot size and construction type. An engineer
              replies during business hours.
            </p>
            <ul className="mt-6 grid gap-2.5 text-[15px] text-body">
              <li>
                <span className="mr-2 text-gold">🕒</span>
                {settings.hours}
              </li>
              <li>
                <span className="mr-2 text-gold">📍</span>
                {settings.address}
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
          <ContactForm areas={areas} />
        </div>
      </section>
    </>
  );
}
