import Link from "next/link";

export function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.019-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

export function MailIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
    </svg>
  );
}

export function Eyebrow({
  children,
  variant = "light",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "light" | "dark";
  className?: string;
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span className="h-[9px] w-[9px] shrink-0 rounded-full border-2 border-gold" />
      <span
        className={`font-label text-[11px] uppercase tracking-[0.18em] sm:text-[12px] ${
          variant === "dark" ? "text-white/80" : "text-steel"
        }`}
      >
        {children}
      </span>
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  desc,
  href,
  linkLabel,
  variant = "light",
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  href?: string;
  linkLabel?: string;
  variant?: "light" | "dark";
}) {
  return (
    <div className="flex flex-col items-start gap-3 text-left max-w-3xl">
      <Eyebrow variant={variant}>{eyebrow}</Eyebrow>
      <div className="flex w-full flex-wrap items-end justify-between gap-4">
        <h2
          className={`font-display text-[clamp(1.65rem,3.2vw,2.65rem)] uppercase leading-[1.08] tracking-[0.01em] text-pretty ${
            variant === "dark" ? "text-white" : "text-ink"
          }`}
        >
          {title}
        </h2>
        {href && linkLabel && (
          <Link
            href={href}
            className={`font-label text-[11px] uppercase tracking-[0.22em] transition-colors ${
              variant === "dark" ? "text-white hover:text-gold" : "text-ink hover:text-navy"
            }`}
          >
            {linkLabel} →
          </Link>
        )}
      </div>
      {desc && (
        <p
          className={`max-w-2xl text-[15px] leading-relaxed sm:text-base ${
            variant === "dark" ? "text-white/80" : "text-body"
          }`}
        >
          {desc}
        </p>
      )}
    </div>
  );
}
