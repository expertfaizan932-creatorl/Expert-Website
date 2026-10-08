import type { Metadata } from "next";
import Link from "next/link";
import { getResources } from "@/lib/queries";
import { SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Cost guides, checklists, templates and tools for planning a construction project in Pakistan.",
};

export const dynamic = "force-dynamic";

const ORDER = ["Tools", "Planning", "Templates", "Overseas"];

export default function ResourcesPage() {
  const resources = getResources();
  const categories = [
    ...ORDER.filter((c) => resources.some((r) => r.category === c)),
    ...Array.from(new Set(resources.map((r) => r.category))).filter((c) => !ORDER.includes(c)),
  ];

  return (
    <>
      <div className="section-y border-t border-concrete bg-paper">
        <div className="site-container">
          <SectionHead
            eyebrow="Planning library"
            title="Resources"
            desc="Guides, checklists and templates we use on live projects — read them before your first site visit."
          />
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/cost-calculator"
              className="gold-glow inline-flex min-h-[44px] items-center gap-2 rounded-[12px] bg-gold px-5 py-2.5 text-sm font-semibold text-navy-deep transition-colors hover:bg-gold-soft"
            >
              Cost Calculator →
            </Link>
          </div>
        </div>
      </div>

      {categories.map((cat, ci) => {
        const items = resources.filter((r) => r.category === cat);
        if (items.length === 0) return null;
        return (
          <section
            key={cat}
            className={`section-y border-t border-concrete ${ci % 2 === 0 ? "bg-white" : "bg-paper"}`}
          >
            <div className="site-container">
              <div className="flex items-center gap-2.5">
                <span className="h-[9px] w-[9px] shrink-0 rounded-full border-2 border-gold" />
                <h2 className="font-label text-[11px] uppercase tracking-[0.18em] text-steel sm:text-[12px]">
                  {cat}
                </h2>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((r, i) => (
                  <Link key={r.slug} href={`/resources/${r.slug}`} className="card-light group p-6">
                    <span className="font-label text-[10px] uppercase tracking-[0.24em] text-steel">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display mt-2 text-xl uppercase leading-tight text-navy transition-colors group-hover:text-gold-dark sm:text-2xl">
                      {r.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-body">{r.excerpt}</p>
                    <span className="font-label mt-4 inline-block text-[11px] uppercase tracking-[0.22em] text-ink transition-colors group-hover:text-navy">
                      Read guide →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
