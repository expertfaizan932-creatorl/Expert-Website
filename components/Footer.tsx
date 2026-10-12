import Image from "next/image";
import Link from "next/link";
import { getAreas, getSettings } from "@/lib/queries";
import { WhatsAppIcon, MailIcon } from "./ui";

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

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[18px] w-[18px]">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-[18px] w-[18px]"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[18px] w-[18px]">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[18px] w-[18px]">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1 0-5.18c.27 0 .53.04.77.12v-3.2a5.8 5.8 0 0 0-.77-.05A5.79 5.79 0 0 0 4.07 15.4a5.79 5.79 0 0 0 5.79 5.79 5.79 5.79 0 0 0 5.79-5.79V8.72a7.36 7.36 0 0 0 4.3 1.38V6.99a4.28 4.28 0 0 1-3.35-1.17Z" />
    </svg>
  );
}

const socials: { label: string; href: string; icon: React.ReactNode }[] = [
  {
    label: "Facebook",
    href: "https://facebook.com/expertmarketingdev",
    icon: <FacebookIcon />,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/Expertmarketingdev",
    icon: <InstagramIcon />,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@Expertmarketingdev",
    icon: <YouTubeIcon />,
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@Expertmarketingdev",
    icon: <TikTokIcon />,
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
              <span className="font-sans text-2xl font-bold uppercase leading-none text-white">
                Expert Marketing
                <span className="mt-1 block font-label text-[11px] font-medium tracking-[0.24em] text-white/60">
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
              <a href={`mailto:${s.email}`} className="flex items-center gap-2 hover:text-gold">
                <MailIcon className="h-[18px] w-[18px] text-gold" />
                {s.email}
              </a>
              <span className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${s.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  className="text-wa transition-colors hover:text-wa/80"
                >
                  <WhatsAppIcon className="h-[18px] w-[18px]" />
                </a>
                <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="hover:text-gold">
                  {s.phone}
                </a>
              </span>
            </div>

            <div className="mt-5 flex gap-3">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-gold hover:text-gold"
                >
                  {item.icon}
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
