"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type Scope = "grey" | "semi" | "turnkey";

const SIZES: { label: string; marla: number }[] = [
  { label: "3 Marla", marla: 3 },
  { label: "5 Marla", marla: 5 },
  { label: "7 Marla", marla: 7 },
  { label: "8 Marla", marla: 8 },
  { label: "10 Marla", marla: 10 },
  { label: "1 Kanal", marla: 20 },
  { label: "2 Kanal", marla: 40 },
];

// Indicative PKR per sq ft ranges (2026 planning bands)
const RATES: Record<Scope, [number, number]> = {
  grey: [4800, 6200],
  semi: [7200, 9000],
  turnkey: [10500, 14500],
};

const SCOPE_LABEL: Record<Scope, string> = {
  grey: "Grey Structure",
  semi: "Semi-Finished",
  turnkey: "Turnkey Construction",
};

const COVERED_PER_MARLA = 460; // sq ft per marla built-up (ground + first floor typical)

function fmt(n: number) {
  return new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 }).format(n);
}

function milestonePlan(low: number, high: number) {
  const mid = (low + high) / 2;
  const stages: [string, number][] = [
    ["Mobilisation & foundation", 0.15],
    ["Slab / structure complete", 0.35],
    ["Brickwork & plaster", 0.55],
    ["Finishing & fixtures", 0.85],
    ["Handover & snag closure", 1.0],
  ];
  let prev = 0;
  return stages.map(([name, cum]) => {
    const share = cum - prev;
    prev = cum;
    return { name, pct: Math.round(share * 100), amount: Math.round(mid * share) };
  });
}

export default function CostCalculatorPage() {
  const params = useSearchParams();
  const initialSize = params.get("size");
  const initialScope = params.get("scope");
  const [size, setSize] = useState(
    () => (initialSize && SIZES.some((s) => s.label === initialSize) ? initialSize : "5 Marla")
  );
  const [scope, setScope] = useState<Scope>(
    () =>
      initialScope === "grey" || initialScope === "semi" || initialScope === "turnkey"
        ? initialScope
        : "turnkey"
  );
  const [floors, setFloors] = useState<1 | 2>(2);

  const result = useMemo(() => {
    const marla = SIZES.find((s) => s.label === size)?.marla ?? 5;
    const builtUp = marla * COVERED_PER_MARLA * (floors === 2 ? 1.75 : 1);
    const [lo, hi] = RATES[scope];
    return {
      builtUp: Math.round(builtUp),
      low: Math.round((builtUp * lo) / 100000) * 100000,
      high: Math.round((builtUp * hi) / 100000) * 100000,
      milestones: milestonePlan(builtUp * lo, builtUp * hi),
    };
  }, [size, scope, floors]);

  const chipCls = (active: boolean) =>
    `min-h-[44px] rounded-[10px] border px-4 py-2.5 font-label text-[11px] uppercase tracking-[0.12em] transition-all ${
      active
        ? "border-navy bg-navy text-white"
        : "border-concrete bg-white text-navy hover:border-gold hover:text-gold-dark"
    }`;

  return (
    <div className="section-y border-t border-concrete bg-paper">
      <div className="site-container">
        <div className="flex flex-col items-start gap-3 max-w-3xl">
          <span className="flex items-center gap-2.5">
            <span className="h-[9px] w-[9px] shrink-0 rounded-full border-2 border-gold" />
            <span className="font-label text-[11px] uppercase tracking-[0.18em] text-steel sm:text-[12px]">
              Free tool
            </span>
          </span>
          <h1 className="font-display text-[clamp(1.75rem,4vw,3.05rem)] uppercase leading-[1.12] tracking-[0.01em] text-ink">
            Construction Cost Calculator
          </h1>
          <p className="max-w-2xl text-[15px] leading-relaxed text-body sm:text-base">
            Indicative PKR range for planning only — final pricing comes from a written BOQ after
            drawings and a site visit.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="card-light p-6">
              <h2 className="font-label text-[12px] uppercase tracking-[0.16em] text-steel">
                Your inputs
              </h2>

              <fieldset className="mt-5">
                <legend className="font-label mb-2 text-[11px] uppercase tracking-[0.16em] text-steel">
                  Plot size
                </legend>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => setSize(s.label)}
                      className={chipCls(size === s.label)}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="mt-6">
                <legend className="font-label mb-2 text-[11px] uppercase tracking-[0.16em] text-steel">
                  Construction scope
                </legend>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(SCOPE_LABEL) as Scope[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setScope(s)}
                      className={chipCls(scope === s)}
                    >
                      {SCOPE_LABEL[s]}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="mt-6">
                <legend className="font-label mb-2 text-[11px] uppercase tracking-[0.16em] text-steel">
                  Floors
                </legend>
                <div className="flex gap-2">
                  {([1, 2] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFloors(f)}
                      className={chipCls(floors === f)}
                    >
                      {f === 1 ? "Ground only" : "Ground + 1st"}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-[16px] border border-white/12 bg-navy p-7 text-white shadow-[0_12px_40px_rgba(7,26,61,0.35)]">
              <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-25" />
              <p className="font-label relative text-[11px] uppercase tracking-[0.16em] text-white/70">
                Estimated range · {SCOPE_LABEL[scope]} · {size} ·{" "}
                {floors === 1 ? "Ground" : "Ground + 1st"}
              </p>
              <p className="font-display relative mt-3 text-[clamp(1.9rem,4vw,2.75rem)] uppercase leading-none tabular-nums text-gold">
                PKR {fmt(result.low)} <span className="text-white/50">–</span> {fmt(result.high)}
              </p>
              <p className="relative mt-2 text-[15px] text-white/75">
                Approx. {fmt(result.builtUp)} sq ft built-up · {SCOPE_LABEL[scope]} rates in
                Islamabad / Rawalpindi (2026 band)
              </p>
            </div>

            <div className="card-light mt-5 p-6">
              <h2 className="font-label text-[12px] uppercase tracking-[0.16em] text-steel">
                Illustrative milestone plan (mid-range)
              </h2>
              <ul className="mt-4 space-y-3">
                {result.milestones.map((m) => (
                  <li
                    key={m.name}
                    className="flex items-center justify-between gap-4 border-b border-concrete pb-2.5 text-[15px] last:border-b-0"
                  >
                    <span className="text-body">
                      {m.name}
                      <span className="font-label ml-2 text-[11px] uppercase tracking-[0.14em] text-steel">
                        {m.pct}%
                      </span>
                    </span>
                    <span className="font-semibold tabular-nums text-navy">PKR {fmt(m.amount)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[13px] leading-relaxed text-steel">
                Ranges exclude land, approval fees, utility connections and furniture. Soil
                conditions, design complexity and material choices move the number — a site visit
                gives you a firm figure.
              </p>
            </div>

            <a
              href="/contact"
              className="gold-glow mt-5 inline-flex min-h-[48px] items-center gap-2 rounded-[12px] bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition-colors hover:bg-gold-soft"
            >
              Get this in writing (BOQ) →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
