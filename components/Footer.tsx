import Image from "next/image";
import Link from "next/link";
import { getAreas, getSettings } from "@/lib/queries";

const cols: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Services",
    links: [
      { href: "/services/grey-structure", label: "Grey Structure" },
      { href: "/services/turnkey", label: "Turnkey Construction" },
      { href: "/services/semi-finished", label: "Semi-Finished" },
      { href: "/services/luxury-homes", label: "Luxury Homes" },
      { href: "/services/renovation", label: "Renovation" },
      { href: "/services/design-engineering", label: "Design & Drawings" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/resources", label: "All Resources" },
      { href: "/cost-calculator", label: "Cost Calculator" },
      { href: "/resources/construction-cost-guide-2026", label: "2026 Cost Guide" },
      { href: "/resources/grey-vs-semi-vs-turnkey", label: "Grey vs Semi vs Turnkey" },
      { href: "/resources/pre-build-checklist", label: "Pre-Build Checklist" },
      { href: "/resources/sample-boq-structure", label: "Sample BOQ" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/projects", label: "Projects" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Areas",
    links: [], // filled dynamically below
  },
];

export function Footer() {
  const s = getSettings();
  const areas = getAreas().slice(0, 6);

  return (
    <footer className="relative overflow-hidden bg-navy-deep text-white">
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-35" />

      <div className="site-container relative py-10">
        <div className="grid gap-8 border-b border-white/10 pb-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid shrink-0 place-items-center rounded-[10px] bg-white p-2">
                <Image
                  src="/logo-clean.png"
                  alt=""
                  width={257}
                  height={152}
                  className="h-9 w-auto"
                />
              </span>
              <span className="font-display text-2xl uppercase leading-none text-white">
                Expert Marketing
                <span className="mt-1 block font-label text-[9px] font-medium tracking-[0.24em] text-white/60">
                  &amp; DEVELOPERS
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/80">{s.tagline}</p>

            <div className="mt-5 grid gap-x-6 gap-y-2.5 text-[15px] text-white/85 sm:grid-cols-2">
              <p>
                <span className="mr-2 text-gold">📍</span>
                {s.address}
              </p>
              <p>
                <span className="mr-2 text-gold">🕒</span>
                {s.hours}
              </p>
              <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="hover:text-gold">
                <span className="mr-2 text-gold">📞</span>
                {s.phone}
              </a>
              <a href={`mailto:${s.email}`} className="hover:text-gold">
                <span className="mr-2 text-gold">✉️</span>
                {s.email}
              </a>
            </div>

            <div className="mt-5 flex gap-3">
              {[
                ["FB", "https://facebook.com"],
                ["IG", "https://instagram.com"],
                ["IN", "https://linkedin.com"],
                ["WA", `https://wa.me/${s.whatsapp}`],
              ].map(([abbr, href]) => (
                <a
                  key={abbr}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={abbr}
                  className="font-label grid h-9 w-9 place-items-center rounded-full border border-white/15 text-[11px] text-white/80 transition-colors hover:border-gold hover:text-gold"
                >
                  {abbr}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:col-span-7">
            {cols.map((c) => (
              <div key={c.title}>
                <h3 className="font-label flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-white/70">
                  <span className="h-2 w-2 rounded-full border-2 border-gold" />
                  {c.title}
                </h3>
                <ul className="mt-4 space-y-2.5 text-[15px]">
                  {c.title === "Areas"
                    ? areas.map((a) => (
                        <li key={a.slug}>
                          <Link
                            href={`/areas/${a.slug}`}
                            className="text-white/85 transition-colors hover:text-gold"
                          >
                            {a.name}
                          </Link>
                        </li>
                      ))
                    : c.links.map((l) => (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            className="text-white/85 transition-colors hover:text-gold"
                          >
                            {l.label}
                          </Link>
                        </li>
                      ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 pt-4 text-white/70 md:flex-row md:items-center md:justify-between">
          <p className="font-label text-[12px] uppercase tracking-[0.12em] text-white/65">
            © {new Date().getFullYear()} Expert Marketing &amp; Developers
          </p>
          <p className="text-[13px] text-white/60">
            Demo project — inspired-by clone built for learning purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
