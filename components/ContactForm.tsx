"use client";

import { useState } from "react";

export type FormArea = { slug: string; name: string };

const inputCls =
  "w-full min-h-[48px] rounded-[12px] border border-concrete bg-white px-4 py-3.5 text-[15px] text-ink outline-none transition-all placeholder:text-steel/70 focus:border-navy/45 focus:ring-2 focus:ring-gold/60";

const labelCls = "font-label mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-steel";

export function ContactForm({ areas = [] }: { areas?: FormArea[]; compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("ok");
      setMsg("Thank you — a site engineer will contact you within one working day.");
      form.reset();
    } catch {
      setStatus("error");
      setMsg("Something went wrong. Please try again or call us directly.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="card-light p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Full name *</span>
          <input name="name" required className={inputCls} placeholder="Your name" />
        </label>
        <label className="block">
          <span className={labelCls}>Phone *</span>
          <input name="phone" required className={inputCls} placeholder="+92 3xx xxxxxxx" />
        </label>
        <label className="block">
          <span className={labelCls}>Email</span>
          <input name="email" type="email" className={inputCls} placeholder="you@email.com" />
        </label>
        <label className="block">
          <span className={labelCls}>Area / Society</span>
          <select name="area_slug" className={inputCls}>
            <option value="">Select area</option>
            {areas.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={labelCls}>Plot size</span>
          <select name="plot_size" className={inputCls}>
            <option value="">Select size</option>
            {["3 Marla", "5 Marla", "7 Marla", "8 Marla", "10 Marla", "1 Kanal", "2 Kanal"].map(
              (s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              )
            )}
          </select>
        </label>
        <label className="block">
          <span className={labelCls}>What do you need? *</span>
          <select name="plan" required className={inputCls}>
            <option value="">Select option</option>
            {[
              "Grey Structure",
              "Semi-Finished",
              "Turnkey Construction",
              "Design & Drawings",
              "Renovation",
              "Not Sure Yet",
            ].map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-4 block">
        <span className={labelCls}>Project details</span>
        <textarea
          name="message"
          rows={3}
          className={`${inputCls} min-h-[96px] resize-y`}
          placeholder="Location, timeline, anything we should know..."
        />
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="gold-glow mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[12px] bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition-colors hover:bg-gold-soft disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Sending..." : "Request Free Consultation →"}
      </button>

      {msg && (
        <p
          className={`mt-3 text-sm ${status === "ok" ? "text-emerald-600" : "text-red-600"}`}
          role="status"
        >
          {msg}
        </p>
      )}
    </form>
  );
}
