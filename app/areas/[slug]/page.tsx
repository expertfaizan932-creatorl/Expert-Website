import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArea, getAreas, getProjectsByArea } from "@/lib/queries";
import { ContactForm } from "@/components/ContactForm";
import { Eyebrow } from "@/components/ui";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return getAreas().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getArea(slug);
  return {
    title: area ? `Construction in ${area.name}` : "Area",
    description: area?.blurb,
  };
}

export default async function AreaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const projects = getProjectsByArea(slug);
  const societies = JSON.parse(area.societies) as string[];

  return (
    <div className="border-t border-concrete bg-paper">
      <div className="site-container section-y">
        <nav className="font-label text-[11px] uppercase tracking-[0.18em] text-steel">
          <Link href="/areas" className="hover:text-navy">
            Areas
          </Link>{" "}
          / <span className="text-navy">{area.name}</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <Eyebrow>{area.city}</Eyebrow>
            <h1 className="font-display mt-3 text-[clamp(1.75rem,4vw,3rem)] uppercase leading-[1.1] tracking-[0.01em] text-ink">
              Construction in {area.name}
            </h1>
            <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-body">{area.blurb}</p>

            <h2 className="font-display mt-8 text-2xl uppercase text-navy">
              Societies &amp; sectors
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {societies.map((s) => (
                <span
                  key={s}
                  className="rounded-[10px] border border-concrete bg-white px-4 py-2.5 font-label text-[11px] uppercase tracking-[0.12em] text-navy"
                >
                  {s}
                </span>
              ))}
            </div>

            <h2 className="font-display mt-8 text-2xl uppercase text-navy">
              Projects in {area.name}
            </h2>
            {projects.length === 0 ? (
              <p className="mt-3 text-[15px] text-body">
                No published projects here yet — ask us about ongoing work in this society.
              </p>
            ) : (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {projects.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="card-light p-5 transition hover:border-navy/50"
                  >
                    <span className="font-label text-[10px] uppercase tracking-[0.2em] text-gold-dark">
                      {p.status}
                    </span>
                    <h3 className="font-display mt-1 text-xl uppercase leading-tight text-navy">
                      {p.title}
                    </h3>
                    <p className="font-label mt-1 text-[11px] uppercase tracking-[0.14em] text-steel">
                      {p.plot_size} · {p.scope} · {p.year}
                    </p>
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-10 rounded-[16px] border border-concrete bg-white p-6">
              <h2 className="font-display text-2xl uppercase text-navy">
                Planning a build in {area.name}?
              </h2>
              <div className="mt-4">
                <ContactForm compact areas={[{ slug: area.slug, name: area.name }]} />
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="card-light p-6 lg:sticky lg:top-28">
              <h2 className="font-label text-[12px] uppercase tracking-[0.16em] text-steel">
                Other areas
              </h2>
              <ul className="mt-4 space-y-3 text-[15px]">
                {getAreas()
                  .filter((a) => a.slug !== area.slug)
                  .slice(0, 8)
                  .map((a) => (
                    <li key={a.slug}>
                      <Link href={`/areas/${a.slug}`} className="text-body hover:text-gold-dark">
                        {a.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
