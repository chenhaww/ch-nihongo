// src/db.js — user database (SRS state) + content queries.
// Content DB (japanese-content.db) is read-only and provided via SQLiteProvider.
// User DB (user.db) holds cards, review log, and settings — never overwritten
// by content updates.
import * as SQLite from 'expo-sqlite';

let userDb = null;

export async function initUserDb() {
  if (userDb) return userDb;
  userDb = await SQLite.openDatabaseAsync('user.db');
  await userDb.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS cards (
      id INTEGER PRIMARY KEY,
      type TEXT NOT NULL,            -- 'vocab' | 'kanji'
      ref_id INTEGER NOT NULL,       -- id in content db
      fsrs TEXT NOT NULL,            -- serialized FSRS card (JSON)
      due TEXT NOT NULL,             -- ISO date, mirrored for fast queries
      created_at TEXT NOT NULL,
      UNIQUE(type, ref_id)
    );
    CREATE INDEX IF NOT EXISTS idx_cards_due ON cards(due);
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY,
      card_id INTEGER NOT NULL,
      rating INTEGER NOT NULL,       -- 1 Again, 2 Hard, 3 Good, 4 Easy
      reviewed_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT);
  `);
  return userDb;
}

export function getUserDb() { return userDb; }

const DEFAULTS = {
  newPerDay: '10',
  newTypes: 'both',        // 'vocab' | 'kanji' | 'both'
  voiceId: '',
  speechRate: '0.9',
  register: 'polite',      // casual | polite | formal — used by grammar (Phase 3)
  typedPct: '30',          // % of vocab reviews shown English-first for typing
};

export async function getSetting(key) {
  const row = await userDb.getFirstAsync('SELECT value FROM settings WHERE key = ?', key);
  return row ? row.value : (DEFAULTS[key] ?? null);
}

export async function setSetting(key, value) {
  await userDb.runAsync(
    'INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value',
    key, String(value));
}

// ---------------- content queries (pass the content db from useSQLiteContext)

export async function fetchItem(contentDb, type, refId) {
  if (type === 'vocab') {
    return await contentDb.getFirstAsync('SELECT * FROM vocab WHERE id = ?', refId);
  }
  return await contentDb.getFirstAsync(
    'SELECT id, literal, jlpt, strokes, freq, meanings, on_yomi, kun_yomi FROM kanji WHERE id = ?', refId);
}

// Next unseen items, easiest level first, frequency-ordered for kanji.
export async function pickNewItems(contentDb, type, excludeIds, limit) {
  const ex = excludeIds.length ? `AND id NOT IN (${excludeIds.join(',')})` : '';
  if (type === 'vocab') {
    return await contentDb.getAllAsync(
      `SELECT id FROM vocab WHERE jlpt IS NOT NULL ${ex}
       ORDER BY jlpt DESC, id LIMIT ?`, limit);
  }
  return await contentDb.getAllAsync(
    `SELECT id FROM kanji WHERE jlpt IS NOT NULL ${ex}
     ORDER BY jlpt DESC, COALESCE(freq, 99999), id LIMIT ?`, limit);
}

export async function fetchSentences(contentDb, vocabId, limit = 2) {
  return await contentDb.getAllAsync(
    `SELECT ja, en FROM sentences WHERE vocab_id = ?
     ORDER BY length(ja) LIMIT ?`, vocabId, limit);
}

export async function levelProgress(contentDb) {
  const totals = { vocab: {}, kanji: {} };
  for (const lvl of [5, 4, 3, 2, 1]) {
    totals.vocab[lvl] = (await contentDb.getFirstAsync(
      'SELECT COUNT(*) c FROM vocab WHERE jlpt = ?', lvl)).c;
    totals.kanji[lvl] = (await contentDb.getFirstAsync(
      'SELECT COUNT(*) c FROM kanji WHERE jlpt = ?', lvl)).c;
  }
  const learned = { vocab: {}, kanji: {} };
  for (const type of ['vocab', 'kanji']) {
    const rows = await userDb.getAllAsync(
      'SELECT ref_id FROM cards WHERE type = ?', type);
    if (!rows.length) { for (const l of [5,4,3,2,1]) learned[type][l] = 0; continue; }
    const ids = rows.map(r => r.ref_id).join(',');
    for (const lvl of [5, 4, 3, 2, 1]) {
      learned[type][lvl] = (await contentDb.getFirstAsync(
        `SELECT COUNT(*) c FROM ${type} WHERE jlpt = ? AND id IN (${ids})`, lvl)).c;
    }
  }
  return { totals, learned };
}

export async function searchVocab(contentDb, query, limit = 30) {
  const q = query.trim();
  if (!q) return [];
  // Try FTS for romaji/english; fall back to LIKE for Japanese input.
  try {
    const rows = await contentDb.getAllAsync(
      `SELECT v.* FROM vocab_fts f JOIN vocab v ON v.id = f.rowid
       WHERE vocab_fts MATCH ? LIMIT ?`, `"${q.replaceAll('"', '')}"*`, limit);
    if (rows.length) return rows;
  } catch (e) { /* fall through */ }
  return await contentDb.getAllAsync(
    `SELECT * FROM vocab WHERE expression LIKE ? OR reading LIKE ? LIMIT ?`,
    `%${q}%`, `%${q}%`, limit);
}

export async function streakDays() {
  const rows = await userDb.getAllAsync(
    `SELECT DISTINCT date(reviewed_at) d FROM reviews ORDER BY d DESC LIMIT 400`);
  if (!rows.length) return 0;
  let streak = 0;
  const today = new Date();
  for (let i = 0; ; i++) {
    const d = new Date(today); d.setDate(today.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    if (rows.some(r => r.d === iso)) streak++;
    else if (i === 0) continue;   // today not studied yet — streak still alive
    else break;
  }
  return streak;
}
