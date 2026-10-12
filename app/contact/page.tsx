import type { Metadata } from "next";
import { getAreas, getSettings } from "@/lib/queries";
import { ContactForm } from "@/components/ContactForm";
import { Eyebrow, SectionHead, WhatsAppIcon, MailIcon } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request a consultation for construction, design or property services.",
};

export const dynamic = "force-dynamic";

export default function ContactPage() {
  const s = getSettings();
  const areas = getAreas();

  return (
    <div className="section-y border-t border-concrete bg-paper">
      <div className="site-container">
        <SectionHead
          eyebrow="Get in touch"
          title="Start Your Construction Project"
          desc="Share your details and a senior engineer replies within one working day — phone or WhatsApp."
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <ContactForm areas={areas} />
          </div>

          <aside className="space-y-4 lg:col-span-5">
            {[
              ["Office hours", s.hours],
              ["Email", s.email],
              ["Address", s.address],
              ["Phone", s.phone],
            ].map(([k, v]) => (
              <div key={k} className="card-light p-5">
                <h2 className="font-label text-[11px] uppercase tracking-[0.16em] text-steel">
                  {k}
                </h2>
                <p className="mt-2 flex items-center gap-2 text-[15px] text-ink">
                  {k === "Email" && <MailIcon className="h-[18px] w-[18px] text-gold" />}
                  {k === "Phone" && (
                    <a
                      href={`https://wa.me/${s.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Chat on WhatsApp"
                      className="text-wa transition-colors hover:text-wa/80"
                    >
                      <WhatsAppIcon className="h-[18px] w-[18px]" />
                    </a>
                  )}
                  {v}
                </p>
              </div>
            ))}
            <a
              href={`https://wa.me/${s.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-[16px] bg-wa p-5 text-white shadow-[0_10px_28px_rgba(37,211,102,0.35)] transition-transform hover:-translate-y-0.5"
            >
              <h2 className="font-label text-[11px] uppercase tracking-[0.16em] opacity-90">
                WhatsApp
              </h2>
              <p className="font-display mt-2 text-2xl uppercase">Chat with us →</p>
            </a>
            <div className="card-light flex items-center gap-4 p-5">
              <span className="font-display text-5xl leading-none text-navy tabular-nums">
                4.7
              </span>
              <span>
                <span className="block text-lg text-gold">★★★★★</span>
                <span className="font-label block text-[11px] uppercase tracking-[0.14em] text-steel">
                  Verified reviews
                </span>
              </span>
            </div>
          </aside>
        </div>

        <div className="mt-10">
          <Eyebrow>{s.hours}</Eyebrow>
        </div>
      </div>
    </div>
  );
}
