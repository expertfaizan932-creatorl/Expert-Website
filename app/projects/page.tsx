import type { Metadata } from "next";
import Link from "next/link";
import { getProjects } from "@/lib/queries";
import { Eyebrow, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Projects",
  description: "Completed and ongoing construction projects across Islamabad and Rawalpindi.",
};

export const dynamic = "force-dynamic";

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <>
      <div className="section-y border-t border-concrete bg-paper">
        <div className="site-container">
          <SectionHead
            eyebrow="Portfolio"
            title="Our Projects"
            desc="Real builds, completed and ongoing — grey structures, turnkey homes, renovations and drawing sets across Islamabad and Rawalpindi."
          />
        </div>
      </div>

      <div className="section-y border-t border-concrete bg-white">
        <div className="site-container">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <Link key={p.slug} href={`/projects/${p.slug}`} className="card-light group overflow-hidden">
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
                    {p.year}
                  </span>
                </div>
                <div className="p-5">
                  <h2 className="font-display text-xl uppercase leading-tight text-navy transition-colors group-hover:text-gold-dark">
                    {p.title}
                  </h2>
                  <p className="font-label mt-2 text-[11px] uppercase tracking-[0.14em] text-steel">
                    {p.area_name} · {p.plot_size} · {p.scope}
                  </p>
                  <p className="mt-3 line-clamp-2 text-[15px] leading-relaxed text-body">
                    {p.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <Eyebrow>Every entry is a real Tryino-style address — completed or in progress</Eyebrow>
          </div>
        </div>
      </div>
    </>
  );
}
