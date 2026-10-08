import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjects, getSettings } from "@/lib/queries";
import { ContactForm } from "@/components/ContactForm";
import { Eyebrow } from "@/components/ui";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project?.title ?? "Project", description: project?.summary };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const settings = getSettings();
  const features = JSON.parse(project.features) as string[];

  return (
    <div className="border-t border-concrete bg-paper">
      <div className="site-container section-y">
        <nav className="font-label text-[11px] uppercase tracking-[0.18em] text-steel">
          <Link href="/projects" className="hover:text-navy">
            Projects
          </Link>{" "}
          / <span className="text-navy">{project.plot_size}</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <span
              className={`font-label inline-block rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.14em] ${
                project.status === "Completed"
                  ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-700"
                  : "border border-gold/50 bg-gold/15 text-gold-dark"
              }`}
            >
              {project.status}
            </span>
            <h1 className="font-display mt-4 text-[clamp(1.75rem,4vw,3rem)] uppercase leading-[1.1] tracking-[0.01em] text-ink">
              {project.title}
            </h1>

            <div className="relative mt-6 overflow-hidden rounded-[16px] border border-concrete bg-gradient-to-br from-navy-mid to-navy-deep p-10 text-center">
              <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-30" />
              <p className="font-label relative text-[12px] uppercase tracking-[0.18em] text-white/70">
                {project.image ? project.image : "Project photograph"} — {project.area_name}
              </p>
            </div>

            <h2 className="font-display mt-8 text-2xl uppercase text-navy">Project Overview</h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-body">
              {project.description}
            </p>

            <h2 className="font-display mt-8 text-2xl uppercase text-navy">Key Features</h2>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 rounded-[12px] border border-concrete bg-white p-3.5 text-[15px] text-body"
                >
                  <span className="mt-0.5 text-gold">✓</span> {f}
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-[16px] border border-concrete bg-white p-6">
              <Eyebrow>Next step</Eyebrow>
              <h2 className="font-display mt-3 text-2xl uppercase text-navy">
                Want something similar?
              </h2>
              <p className="mt-2 text-[15px] text-body">
                Tell us your plot size and we&apos;ll send an indicative range, then a written BOQ
                after the site visit. Call {settings.phone} or leave your details.
              </p>
              <div className="mt-5">
                <ContactForm compact areas={[{ slug: project.area_slug, name: project.area_name }]} />
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="card-light p-6 lg:sticky lg:top-28">
              <h2 className="font-label text-[12px] uppercase tracking-[0.16em] text-steel">
                Project facts
              </h2>
              <dl className="mt-4 space-y-3 text-[15px]">
                {[
                  ["Location", project.area_name],
                  ["Plot size", project.plot_size],
                  ["Property type", project.property_type],
                  ["Covered area", project.covered_area ?? "—"],
                  ["Scope", project.scope],
                  ["Status", project.status],
                  ["Year", String(project.year)],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-concrete pb-2">
                    <dt className="text-steel">{k}</dt>
                    <dd className="text-right font-medium text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <Link
                href={`/cost-calculator?size=${encodeURIComponent(project.plot_size)}&scope=${project.scope.toLowerCase().includes("grey") ? "grey" : project.scope.toLowerCase().includes("semi") ? "semi" : "turnkey"}`}
                className="gold-glow mt-6 inline-flex min-h-[48px] w-full items-center justify-center rounded-[12px] bg-gold px-5 py-3 text-sm font-semibold text-navy-deep transition-colors hover:bg-gold-soft"
              >
                Estimate a similar build →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
