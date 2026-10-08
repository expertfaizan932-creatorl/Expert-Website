-- Novastructure Homes — SQLite schema (source of truth: lib/db.ts, applied automatically on first run)
-- Kept here for review, backups and future migration to MySQL/PostgreSQL.

CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  short_desc TEXT NOT NULL,
  body TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'home',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS areas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  blurb TEXT NOT NULL,
  societies TEXT NOT NULL DEFAULT '[]', -- JSON array of society/sector names
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  area_slug TEXT NOT NULL,
  plot_size TEXT NOT NULL,
  property_type TEXT NOT NULL DEFAULT 'Residential',
  covered_area TEXT,
  scope TEXT NOT NULL,               -- Grey Structure | Semi-Finished | Turnkey | Luxury | Renovation | Design
  status TEXT NOT NULL CHECK (status IN ('Completed','Ongoing','Planning')),
  year INTEGER NOT NULL,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  features TEXT NOT NULL DEFAULT '[]', -- JSON array
  image TEXT,
  FOREIGN KEY (area_slug) REFERENCES areas(slug)
);

CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  text TEXT NOT NULL,
  project_slug TEXT,
  published INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS faqs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- Captured by the contact/consultation forms via POST /api/leads
CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  area_slug TEXT,
  plot_size TEXT,
  plan TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',  -- new | contacted | quoted | won | lost
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_projects_area ON projects(area_slug);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at);
