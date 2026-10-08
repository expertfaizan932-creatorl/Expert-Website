import Link from "next/link";

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
