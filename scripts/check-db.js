const db = require("better-sqlite3")("data/site.db");
const tables = db
  .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'")
  .all();
for (const t of tables) {
  const c = db.prepare("SELECT COUNT(*) c FROM " + t.name).get().c;
  console.log(t.name.padEnd(12), c + " rows");
}
console.log("--- leads ---");
console.log(db.prepare("SELECT id, name, phone, plan, created_at FROM leads").all());
db.prepare("DELETE FROM leads WHERE phone LIKE '+92 300 1112223'").run();
console.log("test lead removed");
