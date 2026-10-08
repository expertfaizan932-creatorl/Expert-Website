import type { Metadata } from "next";
import { Suspense } from "react";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Cost Calculator",
  description:
    "Indicative PKR construction cost range for grey structure, semi-finished and turnkey builds.",
};

export default function CostCalculatorPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-14 text-sm text-neutral-500">Loading…</div>
      }
    >
      <Calculator />
    </Suspense>
  );
}
