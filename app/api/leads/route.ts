import { NextResponse } from "next/server";
import { createLead } from "@/lib/queries";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const plan = String(body.plan ?? "").trim();

  if (!name || !phone || !plan) {
    return NextResponse.json(
      { error: "name, phone and plan are required" },
      { status: 400 }
    );
  }
  if (name.length > 120 || phone.length > 40 || plan.length > 80) {
    return NextResponse.json({ error: "Field too long" }, { status: 400 });
  }

  const id = createLead({
    name,
    phone,
    email: String(body.email ?? "").trim() || undefined,
    area_slug: String(body.area_slug ?? "").trim() || undefined,
    plot_size: String(body.plot_size ?? "").trim() || undefined,
    plan,
    message: String(body.message ?? "").trim() || undefined,
  });

  return NextResponse.json({ ok: true, id }, { status: 201 });
}
