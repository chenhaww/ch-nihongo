# Task: Situational dialogue practice (会話)

**Goal:** Add register-aware, situational role-play so the learner practices *using* vocab and
grammar in real settings (convenience store, restaurant, workplace, …), not just recalling words.
Prototype shipped: the コンビニ (convenience store) scenario + a 会話 tab.

## Why authored, not a live chatbot

Non-negotiable rule #1 is **offline only — no runtime network calls.** A live LLM chat partner is
therefore out on-device. Instead, conversations are **authored content** (JS data files, like the
grammar lessons), which for a learner is *better*: every line is correct, graded, register-tuned,
and repeatable. The app's politeness-register system is the perfect hook — environment *is*
register (a clerk gets keigo + polite replies; a friend gets casual; a boss gets formal).

> **Dev-time authoring is allowed to use the network** (same as `build.mjs` / `add-sentences.mjs`).
> So Claude can *draft* many scenarios at authoring time; they ship as static offline data.

## Current shape (prototype)

```
src/conversation/conbini.js    一 scenario data module (コンビニ)
src/conversation/index.js      一 registry: SCENARIOS, SCENARIO_BY_ID, scorableTurns()
src/screens/ConversationScreen.js   一 list → start → turn-by-turn → summary
App.js                         一 5th tab: 会話 (💬)
```

**Scenario shape** (`src/conversation/conbini.js` is the reference):

```js
{
  id: 'conv-conbini-01', setting: 'コンビニ', settingEn: 'Convenience store',
  emoji: '🏪', level: 4, register: 'polite',
  speaker: '店員 · CLERK',                 // who the other party is (bubble label)
  goal: '…', intro: '…', outro: '…',
  turns: [
    {
      id: 'heat',                          // optional; required only for branch targets
      npc: ['お弁当は温めますか。', 'おべんとうはあたためますか。'],   // [ja, kana] — kana drives TTS
      npcEn: '"Shall I heat the bento?"',
      stage: 'optional scene-setting line shown above the bubble',
      options: [
        { ja:'はい、お願いします。', kana:'はい、おねがいします。', en:'"Yes, please."', ok:true, note:'why it works' },
        { ja:'温めない。', kana:'あたためない。', en:'"Won\'t heat it." (casual)', ok:false, why:'too casual for a clerk…' },
      ],
    },
  ],
}
```

Rules (mirror the grammar files):
- Every `kana` reading is **pure kana** (drives TTS). Non-verbal options use `kana: ''` (not spoken).
- Each turn has **≥1 `ok: true`** option (the natural reply). The first `ok` option is the *model*
  (spoken back when the learner picks an unnatural one).
- `ok` options carry a `note` (why it's natural); non-`ok` options carry a `why` (what's off —
  usually register, bluntness, or meaning). Genuinely instructive, no filler.
- `speaker` labels the bubble (友達 · FRIEND, 駅員 · STAFF…); defaults to 相手 if omitted.

**Branching (optional):** give turns an `id`, and options a `goto` (a turn `id`, or `'end'`).
The runner follows the chosen option's `goto`; an unnatural pick (no `goto`) falls back to the
first natural option's `goto`, else linear order. `cafe.js` is the reference (forks on
for-here / to-go). Scoring is over turns actually visited. Scenarios with no `goto` stay linear.

## Interaction (already built)

Clerk line auto-speaks each turn (tap to replay) → learner picks a reply → green = natural,
vermilion = off, with the note/why and a spoken model reply → Next → summary scores
*first-try natural replies* (`scorableTurns`). No DB writes yet (see backlog).

## Validation (required before done)

```bash
# Parse
for f in src/conversation/conbini.js src/conversation/index.js src/screens/ConversationScreen.js App.js; do
  esbuild "$f" --loader:.js=jsx --jsx=automatic --format=esm --outfile=/dev/null; done

# Integrity: kana-only readings, ≥1 natural option/turn, notes/whys present
node -e "const s=require('fs').readFileSync('src/conversation/conbini.js','utf8').replace('export const','const')+'\nmodule.exports={CONBINI};';require('fs').writeFileSync('/tmp/c.js',s);const {CONBINI}=require('/tmp/c.js');let bad=0;for(const t of CONBINI.turns){if(/[a-zA-Z]/.test(t.npc[1])){console.log('npc latin',t.npc[1]);bad++}if(!t.options.some(o=>o.ok)){console.log('no natural');bad++}for(const o of t.options){if(o.kana&&/[a-zA-Z]/.test(o.kana)){console.log('opt latin',o.kana);bad++}if(o.ok&&!o.note){bad++}if(!o.ok&&!o.why){bad++}}}console.log(bad?bad+' ISSUES':CONBINI.turns.length+' turns OK');"
```

## Next batches (after the prototype lands)

Author the high-frequency trio first, then expand — each a new `src/conversation/<setting>.js`
registered in `index.js`:

```
1  レストラン (restaurant)  — be seated, order, ask about a dish, ask for the check
2  職場 (workplace)         — greetings, asking a favor, reporting, leaving (keigo-heavy)
3  駅 / 電車 (station)       — buy a ticket, ask which line, ask if a train stops at X
4  病院 / 薬局 (clinic)      — describe a symptom, answer the receptionist
5  道を聞く (asking directions)
```

Each scenario: ~5–8 turns, 3 options/turn, the natural path matched to the setting's register.

## Backlog / next increments

- **Persist progress**: a `conversation_progress` table in `user.db` (id, best natural-ratio,
  times completed, last_played) + a "ready to replay" surface on Home. Keep the two DBs separate.
- **Typed replies**: reuse the typed-recall input so the learner *produces* the line, not just
  picks it (accept any `ok` reading/spelling). Bridges toward the speaking phase (Phase 6).
- **Branching**: let a choice change the next clerk line (visual-novel style) for replay value.
- **Register toggle**: same scenario, re-skinned casual/polite/formal to drill the contrast.
- **Authoring at scale**: a dev-time script that drafts scenario variants, hand-reviewed, baked
  into static data files (stays offline at runtime).

## Done means

Touched files parse ✓ · scenario integrity script prints "N turns OK" ✓ · kana readings clean ✓ ·
design tokens respected (no new colors) ✓ · runs in the 会話 tab ✓ · owner handed apply commands.
Pure code/data — hot-reloads; recommend `--clear` for the new files + new tab.
