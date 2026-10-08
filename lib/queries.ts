import { getDb } from "./db";

export type Service = {
  id: number;
  slug: string;
  title: string;
  short_desc: string;
  body: string;
  icon: string;
  sort_order: number;
};

export type Area = {
  id: number;
  slug: string;
  name: string;
  city: string;
  blurb: string;
  societies: string;
  sort_order: number;
};

export type Project = {
  id: number;
  slug: string;
  title: string;
  area_slug: string;
  plot_size: string;
  property_type: string;
  covered_area: string | null;
  scope: string;
  status: "Completed" | "Ongoing" | "Planning";
  year: number;
  summary: string;
  description: string;
  features: string;
  image: string | null;
};

export type Review = {
  id: number;
  author: string;
  rating: number;
  text: string;
  project_slug: string | null;
  published: number;
};

export type Faq = { id: number; question: string; answer: string; sort_order: number };

export type Resource = {
  id: number;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  body: string;
  sort_order: number;
};

export type Lead = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  area_slug: string | null;
  plot_size: string | null;
  plan: string;
  message: string | null;
  status: string;
  created_at: string;
};

export function getServices(): Service[] {
  return getDb().prepare("SELECT * FROM services ORDER BY sort_order").all() as Service[];
}

export function getService(slug: string): Service | undefined {
  return getDb().prepare("SELECT * FROM services WHERE slug = ?").get(slug) as Service | undefined;
}

export function getAreas(): Area[] {
  return getDb().prepare("SELECT * FROM areas ORDER BY sort_order").all() as Area[];
}

export function getArea(slug: string): Area | undefined {
  return getDb().prepare("SELECT * FROM areas WHERE slug = ?").get(slug) as Area | undefined;
}

export function getProjects(limit?: number): (Project & { area_name: string })[] {
  const sql = `SELECT p.*, a.name AS area_name FROM projects p JOIN areas a ON a.slug = p.area_slug ORDER BY p.year DESC, p.id DESC`;
  const stmt = getDb().prepare(limit ? sql + " LIMIT ?" : sql);
  return (limit ? stmt.all(limit) : stmt.all()) as (Project & { area_name: string })[];
}

export function getProject(slug: string): (Project & { area_name: string }) | undefined {
  return getDb()
    .prepare(
      `SELECT p.*, a.name AS area_name FROM projects p JOIN areas a ON a.slug = p.area_slug WHERE p.slug = ?`
    )
    .get(slug) as (Project & { area_name: string }) | undefined;
}

export function getProjectsByArea(slug: string): (Project & { area_name: string })[] {
  return getDb()
    .prepare(
      `SELECT p.*, a.name AS area_name FROM projects p JOIN areas a ON a.slug = p.area_slug WHERE p.area_slug = ? ORDER BY p.year DESC`
    )
    .all(slug) as (Project & { area_name: string })[];
}

export function getReviews(): Review[] {
  return getDb()
    .prepare("SELECT * FROM reviews WHERE published = 1 ORDER BY id")
    .all() as Review[];
}

export function getFaqs(): Faq[] {
  return getDb().prepare("SELECT * FROM faqs ORDER BY sort_order").all() as Faq[];
}

export function getResources(): Resource[] {
  return getDb().prepare("SELECT * FROM resources ORDER BY sort_order").all() as Resource[];
}

export function getResource(slug: string): Resource | undefined {
  return getDb().prepare("SELECT * FROM resources WHERE slug = ?").get(slug) as
    | Resource
    | undefined;
}

export function getSettings(): Record<string, string> {
  const rows = getDb().prepare("SELECT key, value FROM settings").all() as {
    key: string;
    value: string;
  }[];
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

export function createLead(input: {
  name: string;
  phone: string;
  email?: string;
  area_slug?: string;
  plot_size?: string;
  plan: string;
  message?: string;
}): number {
  const res = getDb()
    .prepare(
      `INSERT INTO leads (name, phone, email, area_slug, plot_size, plan, message)
       VALUES (@name, @phone, @email, @area_slug, @plot_size, @plan, @message)`
    )
    .run({
      name: input.name,
      phone: input.phone,
      email: input.email ?? null,
      area_slug: input.area_slug ?? null,
      plot_size: input.plot_size ?? null,
      plan: input.plan,
      message: input.message ?? null,
    });
  return Number(res.lastInsertRowid);
}

export function getLeads(): Lead[] {
  return getDb().prepare("SELECT * FROM leads ORDER BY created_at DESC").all() as Lead[];
}

export function getStats() {
  const db = getDb();
  const projects = (db.prepare("SELECT COUNT(*) c FROM projects").get() as { c: number }).c;
  const completed = (
    db.prepare("SELECT COUNT(*) c FROM projects WHERE status = 'Completed'").get() as { c: number }
  ).c;
  const areas = (db.prepare("SELECT COUNT(*) c FROM areas").get() as { c: number }).c;
  const services = (db.prepare("SELECT COUNT(*) c FROM services").get() as { c: number }).c;
  const avg = (
    db.prepare("SELECT ROUND(AVG(rating),1) a FROM reviews WHERE published = 1").get() as {
      a: number | null;
    }
  ).a;
  const reviewCount = (
    db.prepare("SELECT COUNT(*) c FROM reviews WHERE published = 1").get() as { c: number }
  ).c;
  return { projects, completed, areas, services, avgRating: avg ?? 0, reviewCount };
}
