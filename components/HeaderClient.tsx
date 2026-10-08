"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export type NavService = { slug: string; title: string; group: string };
export type NavArea = { slug: string; name: string; city: string };
export type NavResource = { slug: string; title: string; category: string };

const topNav = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
];

const aboutLinks: { href: string; label: string }[] = [
  { href: "/about#who-we-are", label: "Who We Are" },
  { href: "/about#mission", label: "Our Mission" },
  { href: "/about#vision", label: "Our Vision" },
  { href: "/about#values", label: "Our Values" },
  { href: "/about#team", label: "Our Team" },
  { href: "/about#market-expertise", label: "Our Market Expertise" },
  { href: "/about#partners", label: "Our Partners" },
  { href: "/about#office", label: "Our Office" },
  { href: "/about#achievements", label: "Our Achievements" },
];

function Chevron() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 transition-transform group-hover/trigger:rotate-180 group-focus-within/trigger:rotate-180"
    >
      <path d="M3 4.5L6 7.5L9 4.5" />
    </svg>
  );
}

const dropdownPanel =
  "invisible absolute left-0 top-full z-50 mt-2 min-w-[280px] max-w-[340px] rounded-md border border-concrete bg-white p-2 opacity-0 shadow-xl shadow-black/5 transition-all group-hover/trigger:visible group-hover/trigger:opacity-100 group-focus-within/trigger:visible group-focus-within/trigger:opacity-100";

const groupLabel =
  "font-label block px-3 pb-1 pt-2 text-[10px] uppercase tracking-[0.2em] text-ink/50";

const menuItem =
  "block rounded-sm px-3 py-2.5 text-[14px] text-ink/85 transition-colors hover:bg-ink/[0.05] hover:text-ink";

export function HeaderClient({
  services,
  areas,
  resources,
}: {
  services: NavService[];
  areas: NavArea[];
  resources: NavResource[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const resourceGroups = ["Tools", "Planning", "Templates", "Overseas"] as const;
  const serviceGroups = ["Construction", "Design & Engineering", "Property Support"] as const;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-concrete bg-white/95 backdrop-blur">
      <div className="site-container">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="Expert Marketing & Developers — Home"
            className="flex shrink-0 items-center gap-2.5"
          >
            <Image
              src="/logo-clean.png"
              alt=""
              width={257}
              height={152}
              priority
              className="h-10 w-auto sm:h-11"
            />
            <span className="hidden font-display text-lg uppercase leading-none text-navy md:block xl:text-xl">
              Expert Marketing
              <span className="mt-0.5 block font-label text-[8px] font-medium tracking-[0.24em] text-navy/60 xl:text-[9px]">
                &amp; DEVELOPERS
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-4 lg:flex xl:gap-5">
            {/* Home / Projects / Calculator */}
            {topNav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                data-active={pathname === n.href}
                className={`nav-link font-label text-[12px] font-medium uppercase tracking-[0.14em] transition-colors xl:text-[13px] ${
                  pathname === n.href ? "text-gold" : "text-ink hover:text-gold"
                }`}
              >
                {n.label}
              </Link>
            ))}

            {/* Properties dropdown */}
            <div className="group/trigger relative">
              <button
                type="button"
                data-active={pathname.startsWith("/projects") || pathname.startsWith("/areas")}
                className={`nav-link flex items-center gap-1.5 font-label text-[12px] font-medium uppercase tracking-[0.14em] transition-colors xl:text-[13px] ${
                  pathname.startsWith("/projects") || pathname.startsWith("/areas")
                    ? "text-gold"
                    : "text-ink hover:text-gold"
                }`}
              >
                Properties <Chevron />
              </button>
              <div className={dropdownPanel}>
                <span className={groupLabel}>Properties</span>
                <Link href="/projects" className={menuItem} onClick={() => setOpen(false)}>
                  View All Projects
                </Link>
                <Link href="/areas" className={menuItem} onClick={() => setOpen(false)}>
                  Browse by Area
                </Link>
                <Link href="/resources" className={menuItem} onClick={() => setOpen(false)}>
                  Investment Opportunities
                </Link>
              </div>
            </div>

            {/* Areas dropdown */}
            <div className="group/trigger relative">
              <button
                type="button"
                data-active={pathname.startsWith("/areas")}
                className={`nav-link flex items-center gap-1.5 font-label text-[12px] font-medium uppercase tracking-[0.14em] transition-colors xl:text-[13px] ${
                  pathname.startsWith("/areas") ? "text-gold" : "text-ink hover:text-gold"
                }`}
              >
                Areas <Chevron />
              </button>
              <div className={`${dropdownPanel} max-h-[70vh] overflow-y-auto`}>
                <span className={groupLabel}>Cities &amp; societies</span>
                {areas.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/areas/${a.slug}`}
                    className={menuItem}
                    onClick={() => setOpen(false)}
                  >
                    {a.name}
                    <span className="ml-2 text-[11px] text-ink/45">{a.city}</span>
                  </Link>
                ))}
                <div className="mt-1 border-t border-concrete pt-1">
                  <Link
                    href="/areas"
                    className="font-label block px-3 py-2.5 text-[11px] uppercase tracking-[0.18em] text-gold hover:text-navy"
                    onClick={() => setOpen(false)}
                  >
                    All areas →
                  </Link>
                </div>
              </div>
            </div>

            {/* Investment dropdown */}
            <div className="group/trigger relative">
              <button
                type="button"
                data-active={pathname.startsWith("/resources")}
                className={`nav-link flex items-center gap-1.5 font-label text-[12px] font-medium uppercase tracking-[0.14em] transition-colors xl:text-[13px] ${
                  pathname.startsWith("/resources")
                    ? "text-gold"
                    : "text-ink hover:text-gold"
                }`}
              >
                Investment <Chevron />
              </button>
              <div className={`${dropdownPanel} min-w-[300px]`}>
                <span className={groupLabel}>Tools</span>
                <Link
                  href="/projects"
                  className={menuItem}
                  onClick={() => setOpen(false)}
                >
                  Properties
                </Link>
                {resources
                  .filter((r) => r.category === "Tools")
                  .map((r) => (
                    <Link
                      key={r.slug}
                      href={`/resources/${r.slug}`}
                      className={menuItem}
                      onClick={() => setOpen(false)}
                    >
                      {r.title}
                    </Link>
                  ))}

                {resourceGroups
                  .filter((g) => g !== "Tools")
                  .map((g) => {
                    const items = resources.filter((r) => r.category === g);
                    if (items.length === 0) return null;
                    return (
                      <div key={g} className="border-t border-concrete">
                        <span className={groupLabel}>{g}</span>
                        {items.map((r) => (
                          <Link
                            key={r.slug}
                            href={`/resources/${r.slug}`}
                            className={menuItem}
                            onClick={() => setOpen(false)}
                          >
                            {r.title}
                          </Link>
                        ))}
                      </div>
                    );
                  })}

                <div className="mt-1 border-t border-concrete pt-1">
                  <Link
                    href="/resources"
                    className="font-label block px-3 py-2.5 text-[11px] uppercase tracking-[0.18em] text-gold hover:text-navy"
                    onClick={() => setOpen(false)}
                  >
                    All investment →
                  </Link>
                </div>
              </div>
            </div>

            {/* Services dropdown */}
            <div className="group/trigger relative">
              <button
                type="button"
                data-active={pathname.startsWith("/services")}
                className={`nav-link flex items-center gap-1.5 font-label text-[12px] font-medium uppercase tracking-[0.14em] transition-colors xl:text-[13px] ${
                  pathname.startsWith("/services")
                    ? "text-gold"
                    : "text-ink hover:text-gold"
                }`}
              >
                Services <Chevron />
              </button>
              <div className={`${dropdownPanel} min-w-[320px]`}>
                <div className="grid grid-cols-2 gap-x-2">
                  {serviceGroups.map((g) => {
                    const items = services.filter((s) => s.group === g);
                    if (items.length === 0) return null;
                    return (
                      <div key={g} className={g === "Construction" ? "" : "col-span-1"}>
                        <span className={groupLabel}>{g}</span>
                        {items.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            className={menuItem}
                            onClick={() => setOpen(false)}
                          >
                            {s.title}
                          </Link>
                        ))}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-1 border-t border-concrete pt-1">
                  <Link
                    href="/services"
                    className="font-label block px-3 py-2.5 text-[11px] uppercase tracking-[0.18em] text-gold hover:text-navy"
                    onClick={() => setOpen(false)}
                  >
                    All services →
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact */}
            <Link
              href="/contact"
              data-active={pathname === "/contact"}
              className={`nav-link font-label text-[12px] font-medium uppercase tracking-[0.14em] transition-colors xl:text-[13px] ${
                pathname === "/contact" ? "text-gold" : "text-ink hover:text-gold"
              }`}
            >
              Contact
            </Link>

            {/* About dropdown */}
            <div className="group/trigger relative">
              <button
                type="button"
                data-active={pathname.startsWith("/about") || pathname.startsWith("/contact")}
                className={`nav-link flex items-center gap-1.5 font-label text-[12px] font-medium uppercase tracking-[0.14em] transition-colors xl:text-[13px] ${
                  pathname.startsWith("/about") || pathname.startsWith("/contact")
                    ? "text-gold"
                    : "text-ink hover:text-gold"
                }`}
              >
                About <Chevron />
              </button>
              <div className={`${dropdownPanel} max-h-[75vh] overflow-y-auto`}>
                <span className={groupLabel}>Company</span>
                {aboutLinks.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    className={menuItem}
                    onClick={() => setOpen(false)}
                  >
                    {n.label}
                  </Link>
                ))}
                <div className="mt-1 border-t border-concrete pt-1">
                  <Link
                    href="/about"
                    className="font-label block px-3 py-2.5 text-[11px] uppercase tracking-[0.18em] text-gold hover:text-navy"
                    onClick={() => setOpen(false)}
                  >
                    About overview →
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:03345555372"
              className="hidden border-l border-ink/15 pl-5 font-label text-[13px] tracking-[0.1em] whitespace-nowrap text-ink/80 transition-colors hover:text-gold 2xl:block"
            >
              03345555372
            </a>
            <Link
              href="/cost-calculator"
              className="gold-glow inline-flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-[12px] bg-gold px-4 py-2.5 text-sm font-semibold text-navy-deep transition-colors hover:bg-gold-soft"
            >
              Get Free Consultation
            </Link>
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="grid min-h-[44px] min-w-[44px] place-items-center rounded-md text-ink transition-colors hover:bg-ink/10 lg:hidden"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav className="max-h-[75vh] overflow-y-auto border-t border-concrete pb-4 pt-2 lg:hidden">
            {[...topNav.map((n) => ({ href: n.href, label: n.label, external: false }))].map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
className={`font-label block rounded-md px-3 py-2.5 text-[13px] uppercase tracking-[0.14em] ${
                  pathname === n.href ? "bg-ink/[0.06] text-gold" : "text-ink/85"
                }`}
              >
                {n.label}
              </Link>
            ))}

            <span className={groupLabel}>Properties</span>
            <Link
              href="/projects"
              onClick={() => setOpen(false)}
              className="block px-5 py-2 text-[14px] text-ink/85"
            >
              View All Projects
            </Link>
            <Link
              href="/areas"
              onClick={() => setOpen(false)}
              className="block px-5 py-2 text-[14px] text-ink/85"
            >
              Browse by Area
            </Link>
            <Link
              href="/resources"
              onClick={() => setOpen(false)}
              className="block px-5 py-2 text-[14px] text-ink/85"
            >
              Investment Opportunities
            </Link>

            <span className={`${groupLabel} border-t border-concrete mt-1`}>Services</span>
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                onClick={() => setOpen(false)}
                className="block px-5 py-2 text-[14px] text-ink/85"
              >
                {s.title}
              </Link>
            ))}
            <Link
              href="/services"
              onClick={() => setOpen(false)}
              className="font-label block px-5 py-2 text-[11px] uppercase tracking-[0.18em] text-gold"
            >
              All services →
            </Link>

            <span className={`${groupLabel} border-t border-concrete mt-1`}>Areas</span>
            {areas.map((a) => (
              <Link
                key={a.slug}
                href={`/areas/${a.slug}`}
                onClick={() => setOpen(false)}
                className="block px-5 py-2 text-[14px] text-ink/85"
              >
                {a.name}
              </Link>
            ))}

            <span className={`${groupLabel} border-t border-concrete mt-1`}>Investment</span>
            <Link
              href="/resources"
              onClick={() => setOpen(false)}
              className="block px-5 py-2 text-[14px] text-ink/85"
            >
              All Investment
            </Link>
            {resources.slice(0, 4).map((r) => (
              <Link
                key={r.slug}
                href={`/resources/${r.slug}`}
                onClick={() => setOpen(false)}
                className="block px-5 py-2 text-[14px] text-ink/85"
              >
                {r.title}
              </Link>
            ))}

            <span className={`${groupLabel} border-t border-concrete mt-1`}>About</span>
            {aboutLinks.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="block px-5 py-2 text-[14px] text-ink/85"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="block px-5 py-2 text-[14px] text-ink/85"
            >
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
