// src/conversation/index.js — registry + progress for situational dialogue.
// Authored, offline content (like the grammar files). Progress lives in user.db
// (conversation_progress); we store the best first-try "natural" ratio per scenario.
import { CONBINI } from './conbini';
import { RESTO } from './resto';
import { KAIMONO } from './kaimono';
import { SHOKUBA } from './shokuba';
import { EKI } from './eki';
import { BYOUIN } from './byouin';
import { MICHI } from './michi';
import { HOTEL } from './hotel';
import { YUUBIN } from './yuubin';
import { DENWA } from './denwa';
import { KUUKOU } from './kuukou';
import { GINKOU } from './ginkou';
import { TANOMU } from './tanomu';
import { CAFE } from './cafe';
import { TAXI } from './taxi';
import { SALON } from './hairsalon';
import { KUYAKUSHO } from './kuyakusho';
import { getUserDb } from '../db';

export const SCENARIOS = [
  CONBINI, RESTO, CAFE, KAIMONO, SHOKUBA, EKI, TAXI, BYOUIN, SALON, MICHI,
  HOTEL, YUUBIN, DENWA, KUUKOU, GINKOU, KUYAKUSHO, TANOMU,
];
export const SCENARIO_BY_ID = Object.fromEntries(SCENARIOS.map(s => [s.id, s]));

// Count how many turns offer at least one natural reply (used for the summary).
export function scorableTurns(scenario) {
  return scenario.turns.filter(t => t.options.some(o => o.ok)).length;
}

export async function initConversationTable() {
  const db = getUserDb();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS conversation_progress (
      scenario_id TEXT PRIMARY KEY,
      best_ratio REAL NOT NULL DEFAULT 0,
      times_played INTEGER NOT NULL DEFAULT 0,
      last_played TEXT
    );
  `);
}

// Record a completed run: ratio = first-try natural replies / scorable turns, in [0,1].
// Keeps the best ratio and increments the play count.
export async function recordScenario(scenarioId, ratio) {
  const db = getUserDb();
  const now = new Date().toISOString();
  await db.runAsync(
    `INSERT INTO conversation_progress (scenario_id, best_ratio, times_played, last_played)
     VALUES (?,?,1,?)
     ON CONFLICT(scenario_id) DO UPDATE SET
       best_ratio=max(conversation_progress.best_ratio, excluded.best_ratio),
       times_played=conversation_progress.times_played+1,
       last_played=excluded.last_played`,
    scenarioId, ratio, now);
  return await getScenarioProgress(scenarioId);
}

export async function getScenarioProgress(scenarioId) {
  const db = getUserDb();
  return await db.getFirstAsync(
    'SELECT * FROM conversation_progress WHERE scenario_id = ?', scenarioId);
}

export async function allScenarioProgress() {
  const db = getUserDb();
  const rows = await db.getAllAsync('SELECT * FROM conversation_progress');
  return Object.fromEntries(rows.map(r => [r.scenario_id, r]));
}

// Home summary: how many scenarios practiced, how many "mastered" (a perfect run).
export async function conversationStats() {
  const db = getUserDb();
  const played = (await db.getFirstAsync(
    'SELECT COUNT(*) c FROM conversation_progress'))?.c || 0;
  const mastered = (await db.getFirstAsync(
    'SELECT COUNT(*) c FROM conversation_progress WHERE best_ratio >= 1'))?.c || 0;
  return { played, mastered, total: SCENARIOS.length };
}
