import 'dotenv/config';
import { connectStore, loadSite, recordAudit } from './database.mjs';
import { environmentContacts } from './environment.mjs';
import { validateSite } from './validation.mjs';
const db = await connectStore();
try {
  const current = await loadSite(db);
  const contacts = environmentContacts(current.contacts);
  if (JSON.stringify(contacts) === JSON.stringify(current.contacts)) {
    console.log('Contact settings already match .env. Nothing changed.');
  } else {
    const next = validateSite({ ...current, contacts });
    const saved = await db.prepare('UPDATE site SET body=?,revision=revision+1 WHERE id=1 AND revision=?').run(JSON.stringify(next), current.revision);
    if (!saved.changes) throw new Error('Content changed while syncing. Run the command again.');
    await recordAudit(db, 'server console', 'contact settings synced from environment');
    console.log('Contact settings updated from .env. Public pages will refresh automatically.');
  }
} finally { db.close(); }
