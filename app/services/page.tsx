import type { Metadata } from "next";
import Link from "next/link";
import { getServices } from "@/lib/queries";
import { Eyebrow, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Construction Services",
  description:
    "Grey structure, turnkey, semi-finished, luxury, renovation, design drawings and property services.",
};

export const dynamic = "force-dynamic";

export default function ServicesPage() {
  const services = getServices();

  return (
    <div className="section-y border-t border-concrete bg-paper">
      <div className="site-container">
        <SectionHead
          eyebrow="What we do"
          title="Construction Services"
          desc="One accountable team for drawings, structure, finishing and handover — scoped in a written BOQ and delivered on milestone payments."
        />

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {services.map((s, i) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="card-light group p-7">
              <div className="flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-navy/10 bg-navy text-lg text-gold">
                  ◫
                </span>
                <span className="font-label text-[10px] uppercase tracking-[0.24em] text-steel">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h2 className="font-display mt-4 text-2xl uppercase leading-tight text-navy transition-colors group-hover:text-gold-dark">
                {s.title}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-body">{s.short_desc}</p>
              <span className="font-label mt-4 inline-block text-[11px] uppercase tracking-[0.22em] text-ink transition-colors group-hover:text-navy">
                Learn more →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-2.5">
          <Eyebrow>Not sure which scope fits?</Eyebrow>
          <Link href="/contact" className="font-label text-[11px] uppercase tracking-[0.22em] text-navy hover:text-gold-dark">
            Ask an engineer →
          </Link>
        </div>
      </div>
    </div>
  );
}
