import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjects, getService, getServices } from "@/lib/queries";
import { ContactForm } from "@/components/ContactForm";
import { Eyebrow } from "@/components/ui";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  return { title: service?.title ?? "Service", description: service?.short_desc };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = getProjects()
    .filter((p) =>
      service.slug === "grey-structure"
        ? p.scope === "Grey Structure"
        : service.slug === "turnkey"
          ? p.scope === "Turnkey"
          : service.slug === "semi-finished"
            ? p.scope === "Semi-Finished"
            : service.slug === "renovation"
              ? p.scope === "Renovation"
              : service.slug === "design-engineering"
                ? p.scope === "Design"
                : true
    )
    .slice(0, 3);

  const steps: [string, string][] = [
    ["Site visit & brief", "We walk the plot or structure, check paperwork and record your requirements."],
    ["Drawings & BOQ", "Approved drawings become a written bill of quantities with quantities, specs and exclusions."],
    ["Milestone schedule", "Payment stages are mapped to physical work before mobilisation."],
    ["Build & report", "Supervised execution with weekly dated photo reports shared with you."],
    ["Snag list & handover", "Joint walk-through, defects closed in writing, keys handed over."],
  ];

  return (
    <div className="border-t border-concrete bg-paper">
      <div className="site-container section-y">
        <nav className="font-label text-[11px] uppercase tracking-[0.18em] text-steel">
          <Link href="/services" className="hover:text-navy">
            Services
          </Link>{" "}
          / <span className="text-navy">{service.title}</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <Eyebrow>Service detail</Eyebrow>
            <h1 className="font-display mt-3 text-[clamp(1.75rem,4vw,3rem)] uppercase leading-[1.1] tracking-[0.01em] text-ink">
              {service.title}
            </h1>
            <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-body">
              {service.short_desc}
            </p>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-body">{service.body}</p>

            <h2 className="font-display mt-10 text-2xl uppercase text-navy">How it works</h2>
            <ol className="relative mt-5 sm:before:absolute sm:before:bottom-5 sm:before:left-[19px] sm:before:top-5 sm:before:w-px sm:before:bg-concrete sm:before:content-['']">
              {steps.map(([t, d], i) => (
                <li key={t} className="relative grid grid-cols-[auto_1fr] gap-4 pb-6">
                  <span className="font-label z-10 grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-navy text-sm text-gold shadow-sm">
                    {i + 1}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="font-display text-lg uppercase text-navy">{t}</h3>
                    <p className="mt-1 text-[15px] text-body">{d}</p>
                  </div>
                </li>
              ))}
            </ol>

            {related.length > 0 && (
              <>
                <h2 className="font-display mt-6 text-2xl uppercase text-navy">Related projects</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {related.map((p) => (
                    <Link key={p.slug} href={`/projects/${p.slug}`} className="card-light p-4 transition hover:border-navy/50">
                      <p className="font-label text-[10px] uppercase tracking-[0.2em] text-gold-dark">
                        {p.status}
                      </p>
                      <p className="font-display mt-1 text-lg uppercase leading-tight text-navy">
                        {p.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </>
            )}

            <div className="mt-10 rounded-[16px] border border-concrete bg-white p-6">
              <h2 className="font-display text-2xl uppercase text-navy">
                Get a written scope for this service
              </h2>
              <div className="mt-4">
                <ContactForm compact areas={[]} />
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="card-light p-6 lg:sticky lg:top-28">
              <h2 className="font-label text-[12px] uppercase tracking-[0.16em] text-steel">
                Other services
              </h2>
              <ul className="mt-4 space-y-3 text-[15px]">
                {getServices()
                  .filter((s) => s.slug !== service.slug)
                  .map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="text-body hover:text-gold-dark">
                        {s.title}
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
