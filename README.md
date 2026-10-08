# Novastructure Homes — Construction Website (Next.js + SQLite)

tryinohomes.com jaisa construction company website — original copy ke saath, full database ke
saath. Structure inspired hai (services, projects, areas, calculator, leads), lekin branding,
text aur design khud ke hain.

## Stack

- Next.js 16 (App Router, TypeScript, Tailwind CSS v4)
- SQLite via `better-sqlite3` (file: `data/site.db`)
- No external DB server — `npm run dev` se hi chal jata hai

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

Production build:

```bash
npm run build
npm start
```

## Database

- Schema + seed data ek hi jagah: `lib/db.ts` — pehli request par `data/site.db` khud banti hai
  aur saari sample content automatically seed ho jati hai.
- Reference DDL: `database/schema.sql`
- Query helpers: `lib/queries.ts`

### Tables

| Table      | Rows | Purpose                                          |
|------------|------|--------------------------------------------------|
| services   | 8    | Construction/design services (detail pages)      |
| areas      | 8    | Cities & societies with JSON society list        |
| projects   | 6    | Portfolio entries, FK -> areas.slug              |
| reviews    | 6    | Client reviews with ratings                      |
| faqs       | 6    | Home page FAQ                                    |
| leads      | 0    | Contact form submissions (POST /api/leads)       |
| settings   | 7    | Site-wide values (phone, email, address, hours)  |

### Inspect data

```bash
node scripts/check-db.js          # table row counts + leads
npx sqlite3 data/site.db          # interactive (if sqlite3 CLI installed)
```

## Pages

| Route                | Description                                    |
|----------------------|------------------------------------------------|
| `/`                  | Hero, journey selector, why-us, services, projects, reviews, FAQ, lead form |
| `/services`          | All services                                   |
| `/services/[slug]`   | Service detail (DB-driven)                     |
| `/projects`          | Portfolio list                                 |
| `/projects/[slug]`   | Project detail + facts sidebar + estimate link  |
| `/areas`             | Coverage areas                                 |
| `/areas/[slug]`      | Area detail + projects there                   |
| `/cost-calculator`   | PKR range + milestone plan (URL params supported: `?size=5 Marla&scope=grey`) |
| `/about`             | Team, values, stats                            |
| `/contact`           | Consultation form -> `leads` table             |
| `/api/leads`         | POST endpoint for lead capture                 |

## Notes

- Site content, name ("Novastructure Homes") aur data demo/learning purposes ke liye hai —
  original site ka text ya branding copy nahi kiya gaya.
- Lead form validated hai (length checks + required fields) before DB insert.
- `lib/db.ts` par `import "server-only"` hai taaki SQLite kabhi client bundle me na jaaye.
