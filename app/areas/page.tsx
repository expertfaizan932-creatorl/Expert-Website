import type { Metadata } from "next";
import Link from "next/link";
import { getAreas } from "@/lib/queries";
import { Eyebrow, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Areas We Serve",
  description: "Construction services across Islamabad, Rawalpindi and surrounding societies.",
};

export const dynamic = "force-dynamic";

export default function AreasPage() {
  const areas = getAreas();

  return (
    <div className="section-y border-t border-concrete bg-paper">
      <div className="site-container">
        <SectionHead
          eyebrow="Coverage"
          title="Areas We Serve"
          desc="City hubs and society guides for the plots we actually build on — approvals, soil conditions and bylaws vary by society, so local experience matters."
        />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((a) => {
            const societies = JSON.parse(a.societies) as string[];
            return (
              <Link key={a.slug} href={`/areas/${a.slug}`} className="card-light group p-6">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-gold-dark">
                  {a.city}
                </p>
                <h2 className="font-display mt-1 text-2xl uppercase text-navy transition-colors group-hover:text-gold-dark">
                  {a.name}
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-body">{a.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {societies.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="rounded-[10px] border border-concrete bg-paper px-2.5 py-1 font-label text-[10px] uppercase tracking-[0.1em] text-steel"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8">
          <Eyebrow>Priority societies listed first</Eyebrow>
        </div>
      </div>
    </div>
  );
}
