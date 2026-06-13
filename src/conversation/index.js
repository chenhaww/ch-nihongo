// src/conversation/index.js — registry for situational dialogue scenarios.
// Authored, offline content (like the grammar files). Add new settings here:
// restaurant, workplace, station, clinic… Each scenario is a JS data module.
import { CONBINI } from './conbini';
import { RESTO } from './resto';
import { SHOKUBA } from './shokuba';
import { EKI } from './eki';
import { BYOUIN } from './byouin';
import { MICHI } from './michi';
import { KAIMONO } from './kaimono';

export const SCENARIOS = [CONBINI, RESTO, KAIMONO, SHOKUBA, EKI, BYOUIN, MICHI];
export const SCENARIO_BY_ID = Object.fromEntries(SCENARIOS.map(s => [s.id, s]));

// Count how many turns offer at least one natural reply (used for the summary).
export function scorableTurns(scenario) {
  return scenario.turns.filter(t => t.options.some(o => o.ok)).length;
}
