// src/grammar/index.js — registry + lightweight spaced review for grammar.
// Grammar progress lives in user.db (grammar_progress table); a simple Leitner
// ladder schedules lesson reviews and surfaces them on Home.
import { N5 } from './n5';
import { getUserDb } from '../db';

export const LESSONS = [...N5];                       // future: ...N4, ...N3
export const LESSON_BY_ID = Object.fromEntries(LESSONS.map(l => [l.id, l]));

export function lessonsByLevel(level) {
  return LESSONS.filter(l => l.level === level);
}

// Leitner intervals (days) by box. Passing a quiz promotes; failing resets.
const LADDER = [0, 1, 3, 7, 16, 35, 90];

export async function initGrammarTable() {
  const db = getUserDb();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS grammar_progress (
      lesson_id TEXT PRIMARY KEY,
      box INTEGER NOT NULL DEFAULT 0,
      best_score REAL NOT NULL DEFAULT 0,
      last_studied TEXT,
      due TEXT
    );
  `);
}

export async function getProgress(lessonId) {
  const db = getUserDb();
  return await db.getFirstAsync(
    'SELECT * FROM grammar_progress WHERE lesson_id = ?', lessonId);
}

export async function allProgress() {
  const db = getUserDb();
  const rows = await db.getAllAsync('SELECT * FROM grammar_progress');
  return Object.fromEntries(rows.map(r => [r.lesson_id, r]));
}

// Record a quiz attempt: score in [0,1]. Promote on >=0.8, else reset to box 1.
export async function recordQuiz(lessonId, score) {
  const db = getUserDb();
  const now = new Date();
  const prev = await getProgress(lessonId);
  const prevBox = prev ? prev.box : 0;
  const passed = score >= 0.8;
  const box = passed ? Math.min(prevBox + 1, LADDER.length - 1) : 1;
  const due = new Date(now);
  due.setDate(now.getDate() + LADDER[box]);
  const best = Math.max(score, prev ? prev.best_score : 0);
  await db.runAsync(
    `INSERT INTO grammar_progress (lesson_id, box, best_score, last_studied, due)
     VALUES (?,?,?,?,?)
     ON CONFLICT(lesson_id) DO UPDATE SET
       box=excluded.box, best_score=max(grammar_progress.best_score, excluded.best_score),
       last_studied=excluded.last_studied, due=excluded.due`,
    lessonId, box, best, now.toISOString(), due.toISOString());
  return { box, passed, due };
}

export async function dueCount() {
  const db = getUserDb();
  const nowIso = new Date().toISOString();
  const row = await db.getFirstAsync(
    'SELECT COUNT(*) c FROM grammar_progress WHERE due <= ?', nowIso);
  return row ? row.c : 0;
}

export async function studiedCount() {
  const db = getUserDb();
  const row = await db.getFirstAsync('SELECT COUNT(*) c FROM grammar_progress');
  return row ? row.c : 0;
}
