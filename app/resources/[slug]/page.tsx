import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getResource, getResources } from "@/lib/queries";
import { ContactForm } from "@/components/ContactForm";
import { Eyebrow } from "@/components/ui";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return getResources().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResource(slug);
  return { title: resource?.title ?? "Resource", description: resource?.excerpt };
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) notFound();

  const others = getResources().filter((r) => r.slug !== resource.slug).slice(0, 4);
  const paragraphs = resource.body.split("\n\n");

  return (
    <div className="border-t border-concrete bg-paper">
      <div className="site-container section-y">
        <nav className="font-label text-[11px] uppercase tracking-[0.18em] text-steel">
          <Link href="/resources" className="hover:text-navy">
            Resources
          </Link>{" "}
          / <span className="text-navy">{resource.category}</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <article className="lg:col-span-8">
            <Eyebrow>{resource.category}</Eyebrow>
            <h1 className="font-display mt-3 text-[clamp(1.75rem,4vw,3rem)] uppercase leading-[1.1] tracking-[0.01em] text-ink">
              {resource.title}
            </h1>
            <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-body">
              {resource.excerpt}
            </p>

            <div className="mt-8 max-w-2xl space-y-5 border-t border-concrete pt-8">
              {paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="text-[15px] leading-relaxed text-body sm:text-base">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-10 rounded-[16px] border border-concrete bg-white p-6">
              <h2 className="font-display text-2xl uppercase text-navy">
                Want this applied to your plot?
              </h2>
              <p className="mt-2 text-[15px] text-body">
                Share your details — an engineer will walk your site and put the numbers in
                writing.
              </p>
              <div className="mt-5">
                <ContactForm compact areas={[]} />
              </div>
            </div>
          </article>

          <aside className="lg:col-span-4">
            <div className="card-light p-6 lg:sticky lg:top-28">
              <h2 className="font-label text-[12px] uppercase tracking-[0.16em] text-steel">
                More resources
              </h2>
              <ul className="mt-4 space-y-3 text-[15px]">
                {others.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/resources/${r.slug}`} className="text-body hover:text-gold-dark">
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/cost-calculator"
                className="gold-glow mt-6 inline-flex min-h-[48px] w-full items-center justify-center rounded-[12px] bg-gold px-5 py-3 text-sm font-semibold text-navy-deep transition-colors hover:bg-gold-soft"
              >
                Open Cost Calculator →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
