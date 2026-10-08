import "server-only";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DB_PATH = path.join(process.cwd(), "data", "site.db");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  migrate(db);
  return db;
}

function migrate(db: Database.Database) {
  db.exec(`
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
      societies TEXT NOT NULL DEFAULT '[]',
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
      scope TEXT NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('Completed','Ongoing','Planning')),
      year INTEGER NOT NULL,
      summary TEXT NOT NULL,
      description TEXT NOT NULL,
      features TEXT NOT NULL DEFAULT '[]',
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

    CREATE TABLE IF NOT EXISTS resources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      body TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      area_slug TEXT,
      plot_size TEXT,
      plan TEXT NOT NULL,
      message TEXT,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_projects_area ON projects(area_slug);
    CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at);
  `);

  const count = db.prepare("SELECT COUNT(*) AS c FROM services").get() as { c: number };
  if (count.c === 0) seed(db);

  const resCount = db.prepare("SELECT COUNT(*) AS c FROM resources").get() as { c: number };
  if (resCount.c === 0) seedResources(db);
}

function seedResources(db: Database.Database) {
  const insert = db.prepare(
    `INSERT INTO resources (slug, title, category, excerpt, body, sort_order) VALUES (?, ?, ?, ?, ?, ?)`
  );
  const rows: [string, string, string, string, string, number][] = [
    [
      "construction-cost-guide-2026",
      "2026 Construction Cost Guide",
      "Planning",
      "What actually drives cost per square foot — categories, exclusions and planning extras.",
      "Construction cost is driven by three things: the structural system, the finish grade and the site conditions.\n\nStart with the structure. Foundations on soft fill, seismic detailing and higher floor-to-ceiling heights all push the base rate up before a single tile is chosen. Get the soil report first — it is the cheapest decision you will ever make on the project.\n\nThen the finishes. Floor tiles, sanitary ware, kitchen type and ceiling work can easily move the total by 30–40 percent. Decide finish grades in writing before the BOQ is finalised; changing them mid-build is the most expensive way to make decisions.\n\nFinally, budget the extras people forget: approvals, utility connections, boundary wall, landscaping, water tank and pumps, and a 5–10 percent contingency for surprises found once demolition or excavation starts.\n\nUse the cost calculator for a range, then treat any quoted per-square-foot number without a written scope as a marketing figure, not a price.",
      1,
    ],
    [
      "grey-vs-semi-vs-turnkey",
      "Grey vs Semi vs Turnkey",
      "Planning",
      "Three delivery scopes compared — what is included, what you control, and who carries risk.",
      "Grey structure is the shell: foundations, RCC frame, masonry, slabs and MEP rough-ins. Nothing decorative. You take over from there and coordinate every finishing trade yourself. Lowest contract price, highest owner time.\n\nSemi-finished sits in the middle. The shell plus plaster, flooring base, basic electrical and plumbing points are done by the builder; you keep control of tiles, paint, kitchen and sanitary ware. Good balance when you want cost control on taste-driven items.\n\nTurnkey means handover-ready. One contract covers everything through fixtures, painting, final clean-up and snag closure. Highest contract price, but one accountable team and one programme — no coordinating five contractors.\n\nRule of thumb: if you are overseas or short on time, go turnkey. If you live nearby and enjoy managing trades, grey or semi saves money. Whatever you pick, make sure the BOQ lists exclusions clearly — that sentence matters more than the rate.",
      2,
    ],
    [
      "pre-build-checklist",
      "Pre-Build Checklist",
      "Planning",
      "What to have in place before the excavator arrives on your plot.",
      "Paperwork first: approved architectural drawings, structural design, society or authority NOC, and utility connection applications. Building without approvals invites stop-work notices that cost more than the approvals did.\n\nSite readiness: boundary wall or fencing, gate access for trucks, temporary power and water, and a soil test if the society has not provided one. Confirm material delivery routes — narrow lanes and overhead wires limit crane and mixer access.\n\nCommercial clarity: signed BOQ with quantities and exclusions, milestone schedule tied to physical stages, defect liability period in writing, and a named site engineer with contact details.\n\nFinally, agree the reporting rhythm before work starts — weekly dated photos, who signs off variations, and how changes are priced. Projects drift on undocumented changes, not on concrete.",
      3,
    ],
    [
      "sample-boq-structure",
      "Sample BOQ Structure",
      "Templates",
      "How a bill of quantities should be organised so comparisons are actually fair.",
      "A usable BOQ is organised by trade, not by room. Earthwork, concrete, masonry, plaster, waterproofing, finishes, doors and windows, plumbing, electrical, and external works — each with item description, unit, quantity, material specification and rate.\n\nSpecifications matter more than rates. \"Tiles\" is not a specification; brand, series, size, grade and laying pattern are. The same applies to paint systems, pipe brands, wire gauge and window profiles.\n\nEvery BOQ needs an exclusions section. List what is deliberately not included — landscaping, boundary wall, furniture, appliances, utility fees — so nobody discovers it later as a dispute.\n\nCompare quotes line by line against the same BOQ. A cheaper total with missing lines is not cheaper; it is a future variation.",
      4,
    ],
    [
      "contractor-scorecard",
      "Contractor Scorecard",
      "Templates",
      "Questions to ask every builder before you sign — and how to score the answers.",
      "Documentation: do they provide a written BOQ before work, a milestone schedule, and a sample weekly report? Ask to see real examples from a live project, not brochures.\n\nSupervision: who is on site daily, what are their qualifications, and who performs stage reviews? A company selling supervision without a named engineer is selling a promise.\n\nFinancial structure: how many stages, what percentage upfront, and are invoices tied to completed work? Avoid any contract demanding large payment before mobilisation.\n\nEvidence: visit a completed project and, if possible, a site under construction. Talk to the owner if they allow it. Finished homes and tidy sites tell you more than any portfolio page.\n\nScore each area out of 5, weight documentation and supervision highest, and compare builders on the same sheet.",
      5,
    ],
    [
      "overseas-construction-toolkit",
      "Overseas Construction Toolkit",
      "Overseas",
      "Running a build in Pakistan from the UAE, UK or Saudi — the communication setup that works.",
      "Time zones are the first problem. Agree a fixed weekly reporting slot — most owners find a Friday photo report plus one scheduled call works better than constant messaging.\n\nOne channel for decisions. Use a single WhatsApp thread or project group for approvals, with a rule that verbal approvals are confirmed in writing the same day. Loose instructions across three apps become disputes at handover.\n\nMilestone verification. Before each invoice, ask for dated photos of the specific stage plus the previous stage's signed sheet. Video walkthroughs take two minutes and prevent most arguments.\n\nPower of attorney and banking: give a named relative or your lawyer authority for society paperwork, and keep payment receipts documented with the project reference on every transfer.\n\nFinally, plan one physical visit per major stage if you can — foundation, slab and handover. Owners who visit three times have noticeably fewer surprises than those who visit zero.",
      6,
    ],
    [
      "material-estimator-guide",
      "Material Estimator Guide",
      "Tools",
      "How to sanity-check steel and cement quantities before ordering.",
      "Estimators exist to catch ordering mistakes, not to replace the BOQ. For a typical RCC frame house, cement consumption per square foot of covered area sits in a predictable band — wide variations usually mean a mix-up in scope or a wastage allowance that is too high.\n\nSteel follows structural design. Heavier seismic detailing, longer spans or commercial loading increase the tonnage; a residential home quoted far below the usual band is either under-designed or the figure excludes something.\n\nOrder in stages tied to the programme. Cement has a shelf life and steel takes storage space — both are cheaper to hold for a week than to buy twice.\n\nAlways cross-check the estimator output against the structural drawings and the BOQ quantities. When they disagree, the drawings win, and somebody should explain why before money moves.",
      7,
    ],
    [
      "payment-plan-milestones",
      "Milestone Payment Plans",
      "Tools",
      "How a fair stage-payment schedule is structured and why percentages matter.",
      "A fair schedule keeps cash flow aligned with physical progress. A common structure: mobilisation and foundation at roughly 15 percent, structure completion around 35, brickwork and plaster near 55, finishing and fixtures around 85, and the final release at handover after snag closure.\n\nPercentage ceilings matter more than the split. Holding a meaningful final retention until snag list completion is the owner's main leverage — once the last payment clears, response times on defects slow down everywhere.\n\nTie every stage to a written description of what \"complete\" means: which tests, which sheets, which signed checklists. \"Slab complete\" should say whether cube tests are included and whether the previous stage is signed off.\n\nAvoid schedules that front-load heavily. If more than 20–25 percent is due before real work is visible, the risk balance has shifted away from the builder who controls the site.",
      8,
    ],
  ];
  const run = db.transaction(() => {
    rows.forEach((r) => insert.run(...r));
  });
  run();
}

function seed(db: Database.Database) {
  const insertService = db.prepare(
    `INSERT INTO services (slug, title, short_desc, body, icon, sort_order) VALUES (?, ?, ?, ?, ?, ?)`
  );
  const insertArea = db.prepare(
    `INSERT INTO areas (slug, name, city, blurb, societies, sort_order) VALUES (?, ?, ?, ?, ?, ?)`
  );
  const insertProject = db.prepare(
    `INSERT INTO projects (slug, title, area_slug, plot_size, property_type, covered_area, scope, status, year, summary, description, features, image)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  const insertReview = db.prepare(
    `INSERT INTO reviews (author, rating, text, project_slug) VALUES (?, ?, ?, ?)`
  );
  const insertFaq = db.prepare(`INSERT INTO faqs (question, answer, sort_order) VALUES (?, ?, ?)`);
  const insertSetting = db.prepare(`INSERT INTO settings (key, value) VALUES (?, ?)`);

  const run = db.transaction(() => {
    const services: [string, string, string, string, string, number][] = [
      [
        "grey-structure",
        "Grey Structure Construction",
        "Foundations, RCC frame, masonry, slabs and MEP rough-ins built against a written bill of quantities — the structural shell before any finishing begins.",
        "Our grey structure package covers excavation, PCC/RCC foundations, columns, beams, slabs, brick masonry, plaster and first-coat waterproofing, plus electrical and plumbing conduits laid before finishing. Every package starts with a written BOQ that lists quantities, specifications and exclusions, so you know exactly what is being built before the first truck arrives on site. Structural supervision and concrete cube testing are included at every RCC stage.",
        "layers",
        1,
      ],
      [
        "turnkey",
        "Turnkey House Construction",
        "One accountable team from structure through finishing, handover and defect liability — keys in your hand, not a list of pending jobs.",
        "Turnkey delivery means a single point of responsibility for the entire build: grey structure, finishing, tiling, joinery, plumbing fixtures, electrical fittings, painting and final clean-up. We run it on a milestone payment schedule tied to physical progress you can inspect, with weekly photo reports so you can follow the build from anywhere. Handover includes a snag list walk-through and a written defect liability period.",
        "key",
        2,
      ],
      [
        "semi-finished",
        "Semi-Finished Construction",
        "Structure plus essential finishing, ready for you to personalise the interiors, fixtures and final touches to your own taste.",
        "Semi-finished is the middle path: complete grey structure with plastered walls, flooring base, basic electrical points and plumbing rough-in done, while you keep control of tiles, paint shades, kitchen, wardrobes and sanitary ware. It gives you cost control on the finishes that change most with taste, while the expensive structural work stays professionally supervised and documented.",
        "sliders",
        3,
      ],
      [
        "luxury-homes",
        "Luxury Home Construction",
        "Premium-grade finishes with specified materials, detailed joinery and engineering supervision at every stage.",
        "Luxury builds demand tighter tolerances — imported fittings, statement staircases, double-height spaces, detailed ceiling work and material schedules signed off before ordering. We document finish grades in writing, hold sample-board approvals before installation and run stage inspections with your architect or our site engineer, so the finished home matches what was promised on paper.",
        "gem",
        4,
      ],
      [
        "renovation",
        "Renovation & Remodeling",
        "Planned upgrades to existing homes and grey structures — scoped in writing, priced in milestones, never an open-ended site.",
        "Whether you have an unfinished shell or a lived-in home needing new kitchens, added floors, waterproofing or a full interior refresh, we start with a site assessment and a remaining-scope BOQ. Work is split into stages with defined start and finish, so you can live in part of the house while we transform the rest. Dem dust control and daily site clean-up are standard.",
        "hammer",
        5,
      ],
      [
        "design-engineering",
        "Design & Engineering Drawings",
        "Architectural, structural, MEP and interior drawings prepared for society and authority submission.",
        "Before construction starts, drawings need to satisfy both your brief and the approving authority. Our design desk produces architectural plans, structural layouts, electrical and plumbing schematics and 3D views, formatted for society and CDA/RDA submission. Structural design includes RCC calculations so the drawings you build from are the drawings that were engineered.",
        "compass",
        6,
      ],
      [
        "smart-sustainable",
        "Smart & Sustainable Solutions",
        "Solar arrays, smart-home wiring and thermal envelopes designed around Pakistan's summers.",
        "We size solar systems against your actual load chart, pre-wire for smart lighting and security, and specify insulation, glazing and shading that cut cooling bills. These are decisions best made before the slab is cast, which is why we fold them into the structural package rather than bolting them on later.",
        "sun",
        7,
      ],
      [
        "property-management",
        "Property Management",
        "Tenant handling, maintenance and reporting for owners who live in another city or country.",
        "We inspect before tenant move-in, document condition with photos, collect rent, coordinate repairs with approved vendors and send a monthly statement. Overseas owners get a single WhatsApp thread with site photos instead of a chain of contractors.",
        "shield",
        8,
      ],
    ];
    services.forEach((s) => insertService.run(...s));

    const areas: [string, string, string, string, string, number][] = [
      ["islamabad", "Islamabad", "Islamabad", "Pakistan's capital, from sector homes to modern societies on the Margalla fringe.", JSON.stringify(["G-6 to G-11", "E-11", "F-10 / F-11", "Bahria Enclave", "Park View City", "B-17"]), 1],
      ["rawalpindi", "Rawalpindi", "Rawalpindi", "Twin-city builder with deep experience across older cantonment areas and new societies.", JSON.stringify(["Bahria Town Phase 1-8", "DHA Rawalpindi", "Gulrez", "Adyala Road"]), 2],
      ["bahria-enclave", "Bahria Enclave", "Islamabad", "Plotted sectors with fast approvals and a strong resale market for family homes.", JSON.stringify(["Sector A-D", "Sector J-K", "Maraka Sector"]), 3],
      ["park-view-city", "Park View City", "Islamabad", "Modern society with underground utilities and consistent grey structure demand.", JSON.stringify(["Overseas Block", "Commercial Block", "C Block"]), 4],
      ["dha", "DHA Islamabad/Rawalpindi", "Islamabad / Rawalpindi", "Premium phases with strict bylaws — documentation and supervision matter most here.", JSON.stringify(["DHA Phase 1-6", "DHA Margalla Enclave"]), 5],
      ["b-17", "B-17 Multi Gardens", "Islamabad", "Established blocks on GT Road with large plots popular for custom homes.", JSON.stringify(["Block A-B", "Block C-D", "Block E-F"]), 6],
      ["faisal-town", "Faisal Town", "Islamabad", "Affordable entry point near the airport with steady construction activity.", JSON.stringify(["Block A", "Block B", "Phase 2"]), 7],
      ["capital-smart-city", "Capital Smart City", "Islamabad", "Smart-city planning with themed districts and ready-built infrastructure.", JSON.stringify(["Overseas East", "Harmony Park", "Executive Block"]), 8],
    ];
    areas.forEach((a) => insertArea.run(...a));

    const projects: unknown[][] = [
      [
        "1-kanal-turnkey-house-bahria-enclave",
        "1 Kanal Turnkey House in Bahria Enclave",
        "bahria-enclave",
        "1 Kanal",
        "Residential",
        "6,500 sq ft",
        "Turnkey",
        "Completed",
        2026,
        "Full turnkey build delivered with imported fittings and a landscaped lawn.",
        "A four-bedroom family home built end to end under a fixed BOQ: RCC frame with seismic detailing, double-height entrance, Italian marble flooring in public areas, modular kitchen with imported fittings, concealed ducted AC and a rooftop solar array sized to the family's load chart. Weekly photo reports kept the overseas owner updated from Dubai throughout the eleven-month programme.",
        JSON.stringify(["4 bedrooms with ensuite baths", "Double-height entrance lobby", "Modular imported kitchen", "Rooftop solar array", "Landscaped lawn with irrigation"]),
        "/images/project-1.jpg",
      ],
      [
        "5-marla-grey-structure-park-view-b468",
        "5 Marla A+ Grey Structure with Piles — Plot B-468",
        "park-view-city",
        "5 Marla",
        "Residential",
        "2,350 sq ft",
        "Grey Structure",
        "Completed",
        2026,
        "Grey structure on soft soil with pile foundations and full MEP rough-ins.",
        "Site soil reports showed soft fill, so the structural engineer specified piles before the raft. The completed shell includes RCC columns and beams, 9-inch external masonry, slate-grey plaster, kitchen and bath conduits, and a tested drainage line. Delivered in four documented milestones with concrete cube test reports shared after each pour.",
        JSON.stringify(["Pile foundations per soil report", "RCC frame with cube testing", "MEP rough-ins complete", "4-milestone payment plan"]),
        "/images/project-2.jpg",
      ],
      [
        "10-marla-semi-finished-faisal-town",
        "10 Marla Semi-Finished Home in Faisal Town",
        "faisal-town",
        "10 Marla",
        "Residential",
        "4,100 sq ft",
        "Semi-Finished",
        "Ongoing",
        2026,
        "Structure and essential finishing complete; owner selecting final interiors.",
        "Roofing, plaster and flooring base are done, with the owner now choosing tiles, paint and kitchen cabinetry through our finish-schedule sessions. The remaining-scope BOQ was written at handover of the shell so the second phase priced cleanly with no re-measurement arguments.",
        JSON.stringify(["Roofing and plaster complete", "Flooring base laid", "Electrical points live", "Owner-controlled finish phase"]),
        "/images/project-3.jpg",
      ],
      [
        "2-kanal-luxury-villa-dha-phase-2",
        "2 Kanal Luxury Villa in DHA Phase 2",
        "dha",
        "2 Kanal",
        "Residential",
        "9,800 sq ft",
        "Luxury",
        "Ongoing",
        2026,
        "Premium villa with basement, home theatre and statement staircase.",
        "A flagship build with a basement home theatre, indoor plunge pool, cantilevered staircase in travertine and a facade of granite and WPC cladding. Material sample boards were approved before each trade started, and a site engineer is full-time on this project.",
        JSON.stringify(["Basement home theatre", "Indoor plunge pool", "Travertine staircase", "Full-time site engineer", "Sample-board approvals"]),
        "/images/project-4.jpg",
      ],
      [
        "5-marla-renovation-e11",
        "5 Marla Full Renovation in E-11",
        "islamabad",
        "5 Marla",
        "Residential",
        "2,400 sq ft",
        "Renovation",
        "Completed",
        2025,
        "1990s house stripped back to structure and rebuilt inside a live-in schedule.",
        "The family stayed in one portion while we replaced wiring, plumbing, kitchens and baths, added exterior insulation and reclad the facade. Work was sequenced room by room with dust partitions so daily life continued around the site.",
        JSON.stringify(["Full rewiring and replumbing", "New kitchen and two baths", "Exterior insulation and reclad", "Phased live-in schedule"]),
        "/images/project-5.jpg",
      ],
      [
        "8-marla-design-drawings-bahria-town",
        "8 Marla Architectural & Structural Drawings — Bahria Town",
        "rawalpindi",
        "8 Marla",
        "Residential",
        "3,200 sq ft",
        "Design",
        "Completed",
        2025,
        "Complete drawing set approved by the society and ready for construction.",
        "Concept plans, 3D elevations, structural RCC drawings and MEP layouts prepared as one coordinated set, submitted and approved by the society. The same set was then used for our turnkey BOQ, eliminating drawing-versus-BOQ mismatch.",
        JSON.stringify(["Architectural and 3D views", "Structural RCC drawings", "MEP schematics", "Society-approved submission"]),
        "/images/project-6.jpg",
      ],
    ];
    projects.forEach((p) => insertProject.run(...(p as never[])));

    const reviews: [string, number, string, string | null][] = [
      ["Khizar M.", 5, "Boht clean documentation tha — BOQ pehle mila, payment sirf usi kaam ke liye jo site par nazar aa raha tha. Weekly photos overseas se follow karna aasan tha.", "1-kanal-turnkey-house-bahria-enclave"],
      ["Sufian A.", 5, "Grey structure on time diya, concrete test reports bhi share kiye. Site engineer har visit par hota tha.", "5-marla-grey-structure-park-view-b468"],
      ["Atta ur R.", 4, "Semi-finished handover clean hua. Kuch finishing choices late hui lekin team responsive rahi.", "10-marla-semi-finished-faisal-town"],
      ["Mirza A.", 5, "Renovation ke doran ghar me rehna possible tha — dust control aur daily clean-up ka khayal rakha gaya.", "5-marla-renovation-e11"],
      ["Faisal K.", 4, "Drawings approval me thora time laga but final set complete aur coordinated tha.", "8-marla-design-drawings-bahria-town"],
      ["Usman T.", 5, "Turnkey project handover par snag list bani aur do hafte me saari items clear ho gayin.", null],
    ];
    reviews.forEach((r) => insertReview.run(...r));

    const faqs: [string, string, number][] = [
      [
        "How much does house construction cost in Islamabad in 2026?",
        "Indicative PKR ranges depend on plot size and finish level: grey structure typically runs lower per sq ft than semi-finished, and turnkey with premium finishes costs the most. Use the cost calculator for a ballpark, then book a site visit — final pricing comes from a written BOQ after drawings are finalised.",
        1,
      ],
      [
        "What is the difference between grey structure and turnkey?",
        "Grey structure is the building shell: foundations, RCC frame, masonry, slabs and MEP rough-ins — no finishes. Turnkey covers everything from excavation to handover, including flooring, painting, joinery, fixtures and final clean-up, under one contract and one accountable team.",
        2,
      ],
      [
        "How long does it take to build a house?",
        "A 5–10 Marla grey structure usually takes around 4–6 months depending on design and season. A full turnkey build of the same size typically runs 10–14 months. Larger plots and luxury finishes add time for material approvals and specialist trades.",
        3,
      ],
      [
        "Can I build while living overseas?",
        "Yes. Overseas owners get a written weekly report with dated site photos, milestone invoices matched to visible work, and a single WhatsApp contact. Many of our current projects are run this way for clients in the UAE, UK and Saudi Arabia.",
        4,
      ],
      [
        "How do milestone payments work?",
        "The contract ties payments to defined physical stages — foundation, slab, brickwork, plaster, finishing — each verified on site before its invoice. No large upfront amount, and no payment for work you cannot inspect.",
        5,
      ],
      [
        "Do you handle society and authority approvals?",
        "Yes. We prepare or coordinate architectural, structural and MEP drawings for society and CDA/RDA submission, and manage the approval process as part of the design package.",
        6,
      ],
    ];
    faqs.forEach((f) => insertFaq.run(...f));

    const settings: [string, string][] = [
      ["company_name", "Expert Marketing & Developers"],
      ["tagline", "Build with documentation, supervision and milestones you can inspect."],
      ["phone", "03345555372"],
      ["email", "ruamna38@gmail.com"],
      ["address", "Office 21, Main Boulevard, Sector G-11, Islamabad"],
      ["hours", "09:00 AM - 07:00 PM (Monday To Sunday On Only Friday OFF)"],
      ["whatsapp", "923345555372"],
    ];
    settings.forEach((s) => insertSetting.run(...s));
  });

  run();
}
