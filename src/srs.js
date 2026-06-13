// src/srs.js — FSRS scheduling on top of the user db.
import { fsrs, generatorParameters, createEmptyCard, Rating } from 'ts-fsrs';
import { getUserDb, getSetting, pickNewItems, fetchItem } from './db';

const f = fsrs(generatorParameters({ enable_fuzz: true }));

export { Rating };

function reviveCard(json) {
  const c = JSON.parse(json);
  c.due = new Date(c.due);
  if (c.last_review) c.last_review = new Date(c.last_review);
  return c;
}

function serializeCard(c) { return JSON.stringify(c); }

// Build today's queue: all due cards + up to N new ones.
export async function buildQueue(contentDb) {
  const udb = getUserDb();
  const nowIso = new Date().toISOString();

  const due = await udb.getAllAsync(
    'SELECT * FROM cards WHERE due <= ? ORDER BY due', nowIso);

  // How many new cards were introduced today?
  const today = nowIso.slice(0, 10);
  const introduced = (await udb.getFirstAsync(
    "SELECT COUNT(*) c FROM cards WHERE date(created_at) = ?", today)).c;
  const limit = parseInt(await getSetting('newPerDay'), 10) || 0;
  const newTypes = await getSetting('newTypes');
  const remaining = Math.max(0, limit - introduced);

  const fresh = [];
  if (remaining > 0) {
    const types = newTypes === 'both' ? ['vocab', 'kanji'] : [newTypes];
    const per = Math.ceil(remaining / types.length);
    for (const type of types) {
      const existing = await udb.getAllAsync(
        'SELECT ref_id FROM cards WHERE type = ?', type);
      const picks = await pickNewItems(
        contentDb, type, existing.map(r => r.ref_id), per);
      for (const p of picks) fresh.push({ type, ref_id: p.id, isNew: true });
    }
  }

  // Hydrate everything with content
  const queue = [];
  for (const row of due) {
    const item = await fetchItem(contentDb, row.type, row.ref_id);
    if (item) queue.push({ cardRow: row, type: row.type, item, isNew: false });
  }
  for (const n of fresh.slice(0, remaining)) {
    const item = await fetchItem(contentDb, n.type, n.ref_id);
    if (item) queue.push({ ...n, item });
  }
  return queue;
}

// Preview intervals for the four grade buttons.
export function previewIntervals(cardRow) {
  const card = cardRow ? reviveCard(cardRow.fsrs) : createEmptyCard(new Date());
  const now = new Date();
  const rec = f.repeat(card, now);
  const out = {};
  for (const r of [Rating.Again, Rating.Hard, Rating.Good, Rating.Easy]) {
    const ms = rec[r].card.due - now;
    out[r] = humanize(ms);
  }
  return out;
}

function humanize(ms) {
  const m = Math.round(ms / 60000);
  if (m < 60) return `${Math.max(1, m)}m`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.round(h / 24);
  if (d < 30) return `${d}d`;
  const mo = (d / 30).toFixed(1);
  return `${mo}mo`;
}

// Grade a queue entry; creates the card row for new items.
export async function grade(entry, rating) {
  const udb = getUserDb();
  const now = new Date();
  let card, cardId;

  if (entry.isNew && !entry.cardRow) {
    card = createEmptyCard(now);
    const res = await udb.runAsync(
      'INSERT INTO cards (type, ref_id, fsrs, due, created_at) VALUES (?,?,?,?,?)',
      entry.type, entry.item.id, serializeCard(card), now.toISOString(), now.toISOString());
    cardId = res.lastInsertRowId;
    entry.cardRow = { id: cardId };
  } else {
    card = reviveCard(entry.cardRow.fsrs);
    cardId = entry.cardRow.id;
  }

  const next = f.repeat(card, now)[rating].card;
  await udb.runAsync('UPDATE cards SET fsrs = ?, due = ? WHERE id = ?',
    serializeCard(next), next.due.toISOString(), cardId);
  await udb.runAsync(
    'INSERT INTO reviews (card_id, rating, reviewed_at) VALUES (?,?,?)',
    cardId, rating, now.toISOString());

  entry.cardRow = { ...entry.cardRow, fsrs: serializeCard(next), due: next.due.toISOString() };
  return next.due;
}

// Practice mode: re-review cards studied today (or the most recent ones)
// WITHOUT writing anything to the FSRS schedule.
export async function buildPracticeQueue(contentDb, limit = 20) {
  const udb = getUserDb();
  const today = new Date().toISOString().slice(0, 10);
  let rows = await udb.getAllAsync(
    `SELECT DISTINCT c.* FROM cards c JOIN reviews r ON r.card_id = c.id
     WHERE date(r.reviewed_at) = ? LIMIT ?`, today, limit);
  if (!rows.length) {
    rows = await udb.getAllAsync(
      'SELECT * FROM cards ORDER BY created_at DESC LIMIT ?', limit);
  }
  // shuffle so repeat runs aren't identical
  for (let i = rows.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rows[i], rows[j]] = [rows[j], rows[i]];
  }
  const queue = [];
  for (const row of rows) {
    const item = await fetchItem(contentDb, row.type, row.ref_id);
    if (item) queue.push({ cardRow: row, type: row.type, item, isNew: false, practice: true });
  }
  return queue;
}

export async function todayStats(contentDb) {
  const udb = getUserDb();
  const nowIso = new Date().toISOString();
  const today = nowIso.slice(0, 10);
  const due = (await udb.getFirstAsync(
    'SELECT COUNT(*) c FROM cards WHERE due <= ?', nowIso)).c;
  const reviewed = (await udb.getFirstAsync(
    "SELECT COUNT(*) c FROM reviews WHERE date(reviewed_at) = ?", today)).c;
  const introduced = (await udb.getFirstAsync(
    "SELECT COUNT(*) c FROM cards WHERE date(created_at) = ?", today)).c;
  const limit = parseInt(await getSetting('newPerDay'), 10) || 0;
  return { due, reviewed, newRemaining: Math.max(0, limit - introduced) };
}
