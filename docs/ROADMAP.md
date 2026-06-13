# Kado Nihongo — Roadmap

Status legend: ✅ done · 🟡 partial / first batch · ⬜ not started

## Vision

Take a kana-literate learner from N5 to N1, fully offline, on iOS/Android. Cover the
proven pillars: spaced repetition (vocab/kanji + grammar), comprehensible input
(example sentences, immersion), explicit grammar instruction, and — in later phases —
output practice (typing now, speaking later). Guided content is authored through N3;
N2–N1 is supported as a sentence-mining + reference "immersion companion."

---

## Phase 1 — Data pipeline ✅

Build script (`build.mjs`, Node 22 built-in SQLite, zero deps) compiles open data into
one bundled `assets/japanese-content.db`:
- 13,108 kanji (JLPT level, jōyō grade, strokes, frequency, meanings, on/kun readings)
- KanjiVG stroke-order SVGs — 100% coverage of every JLPT kanji
- ~8,000 JLPT-tagged vocab (N5–N1) + FTS index
- grammar/sentences schema with casual/polite/formal register variants
- `meta` table (stats + CC BY-SA attribution)

Optional enrichment: `add-sentences.mjs` (uses `better-sqlite3`) downloads JMdict-simplified
Tatoeba examples and injects up to 3 example sentences per vocab word. **Must be run once in
the Codespace** (the CDN is blocked in some sandboxes). This powers example sentences on cards
and the future immersion phase.

Sources & licences: JMdict/KANJIDIC2 © EDRDG (CC BY-SA 4.0); KanjiVG © Ulrich Apel (CC BY-SA 3.0);
JLPT lists via `elzup/jlpt-word-list`; kanji meta via `davidluzgouveia/kanji-data`. Keep
attribution in Settings.

## Phase 2 — Core study app ✅

- **FSRS engine** (`ts-fsrs`) over `user.db`; cards typed `vocab`/`kanji`, ordered N5→N1
  (kanji by frequency). Grade buttons relabeled **Forgot / Struggled / Remembered / Too easy**
  with predicted intervals and an in-app explainer.
- **Flashcards** with flip, auto-speak on reveal, 🔊 repeat + 🐢 slow repeat, romaji under
  readings, emoji hints (231 curated, concrete N5/N4 words), and up to 2 example sentences
  (tap to hear).
- **Typed recall** (EN→JP): a configurable % of vocab reviews ask the learner to type the
  Japanese (kana or kanji accepted; katakana/hiragana normalized). Requires JP keyboard.
- **Practice mode**: re-review today's cards without affecting the FSRS schedule.
- **Kana reference**: full hiragana/katakana gojūon + dakuten + yōon charts, tap-to-speak,
  and "words starting with this kana" (searches both scripts). 
- **Particle reference**: 15 core particles with function, examples (audio), and
  common-confusion notes.
- **Dictionary/library**: browse vocab/kanji by level, search JP or English.
- **Home dashboard**: due/new counts, streak, per-level progress bars.
- **Settings**: voice picker (male/female per device), speech rate incl. "very slow",
  new cards/day, card types, typed-review %, politeness register, reset.

## Phase 3 — Guided grammar course 🟡 (N5 batch 1 of ~13)

- Grammar lessons live in JS data files (`src/grammar/n5.js`) — easy to extend, no DB rebuild.
- **15 foundational N5 lessons** authored: copula, は, ます, を, に/へ, で, い/な-adjectives,
  negation, past, て-form, たい, ましょう/ませんか, から, ある/います. Each has structure,
  explanation, casual/polite/formal examples (audio + romaji), and a common-mistake note.
- **Quizzes** (27 questions): multiple-choice with manual Next, correct-answer audio + replay,
  and per-distractor "why this is wrong" explanations (21/27 questions).
- **Leitner spaced review** for grammar (`grammar_progress` in user.db; ladder 1/3/7/16/35/90
  days; pass ≥ 0.8 promotes, fail resets). Surfaced on Home as "N lessons ready to review."
- Tabs consolidated to 4: 今日 (home) · 文法 (grammar) · 辞書 (reference: kana/particles/dict) · 設定.

**Remaining for Phase 3:**
- Author **N4 grammar** (~80 points) and **N3 grammar** (~80 points) as `src/grammar/n4.js`,
  `src/grammar/n3.js`, registered in `src/grammar/index.js`. Match the existing lesson shape
  exactly (id, level, title, structure, explanation, registers[], mistake, quiz[] with `why`).
- Each level unlocks automatically once its file is added (the GrammarScreen already shows
  "coming soon" for empty levels).
- Consider: mark grammar lessons gated by prerequisite (don't surface N3 before N4 basics),
  and optionally fold grammar example sentences into the SRS sentence pool.

---

## Phase 3.5 — Situational dialogue (会話) 🟡 (prototype: convenience store)

Register-aware role-play so the learner *uses* vocab/grammar in real settings, not just recalls
words. **Authored, offline** content (no live chatbot — rule #1) in JS data files, like the grammar
course; the politeness-register system is the hook (a clerk gets keigo + polite replies, a friend
casual, a boss formal). See `docs/TASKS/conversation-practice.md`.

- **Shipped (10 scenarios)**: コンビニ · レストラン · 買い物 · 職場 (keigo) · 駅 · 病院・薬局 ·
  道を聞く · ホテル · 郵便局 · 電話 (business keigo) — each a `src/conversation/<setting>.js` in the
  registry, with a 会話 tab and a turn-by-turn runner (`ConversationScreen`): clerk line auto-speaks,
  learner picks the most natural reply, gets a "why this is off" note + spoken model reply, and a
  first-try-natural score.
- **Progress persisted**: `conversation_progress` in user.db keeps the best first-try-natural ratio
  per scenario; surfaced on each card ("best 80% natural" / "★ mastered") and on Home (会話 card:
  "N/M practiced · K mastered").
- Romaji under sentences is spaced per-kana (`toRomaji(x, { spaced: true })`).
- **Next**: more settings (airport, bank, asking a favor); optional typed/spoken replies, branching.
- **Later**: persist progress (`conversation_progress` in user.db), typed/spoken replies,
  branching dialogue, and a register toggle. Dev-time authoring may draft variants (baked to
  static data — stays offline at runtime).

## Phase 4 — Kanji writing practice ⬜

Use the KanjiVG SVGs already in the DB (`kanji.svg` column). Progression per kanji:
show stroke order animated → trace over guide → blind draw with stroke scoring.
- Render strokes from the SVG path data; animate in stroke order (paths are ordered).
- Capture user strokes on a canvas (`react-native-svg` + gesture handler / or a drawing lib),
  compare stroke count/direction/rough shape. Start with lenient scoring (count + start/end
  proximity) before attempting true shape matching.
- Unlock writing for a kanji as it enters the SRS queue; track per-kanji writing mastery in
  user.db.
- Offline only; no extra assets needed (SVGs already bundled).

## Phase 5 — Listening practice ⬜

TTS-powered (no bundled audio):
- Sentence audio already on cards. Add dedicated modes: **hear → pick the meaning**, and
  **dictation** (hear → type in kana). Pull items from vocab + example sentences.
- Add a listening-focused review that prioritizes audio comprehension over reading.

## Phase 6 — Speaking drills ⬜

On-device speech recognition (iOS on-device dictation / Android offline pack) via a community
Expo speech-to-text module. **Requires an EAS dev build (not Expo Go).**
- Drill: show EN or play prompt → user says the Japanese → transcribe → match.
- Caveats to surface: offline STT is tuned for native speakers (strict but fair); it checks
  *what* was said, not pitch accent or fine pronunciation. True pronunciation scoring (bundled
  Whisper-class model) is a stretch goal, not core.

## Phase 7 — Immersion companion (the N2–N1 path) ⬜

Sentence mining for real-world text. Requires the `--full` JMdict dictionary (`dict` table;
run `build.mjs --full` or extend `add-sentences.mjs`).
- Paste any Japanese text → tokenize offline (e.g. a JS tokenizer; budget bundle size) →
  dictionary lookup every word → one-tap unknown words into the SRS deck.
- Show comprehension coverage vs each JLPT level ("you know 91% of N2 vocab; here are the gaps").
- N2–N1 grammar ships as a searchable reference (like particles) rather than a linear course.

## Phase 8 — Exam prep layer ⬜

- Timed mock-question modes per JLPT section (vocab, grammar, reading, listening).
- Weak-area drilling driven by FSRS + grammar stats.

---

## Cross-cutting backlog / nice-to-haves

- **Standalone install**: move from Expo Go to **TestFlight** (Apple Developer US$99/yr) or
  EAS Update for true daily offline use; Expo Go needs network to load and can't do Phase 6.
- **Custom fonts**: the Kado brand uses Fraunces / Manrope / JetBrains Mono; the app currently
  uses system fonts. Loading brand fonts (`expo-font`) would align it with Kado's identity.
- **Backup/export** of user.db (study history) to a file, for safety and device migration.
- **Notifications** for daily review reminders (local only, offline-friendly).
- **More emoji / pictogram coverage** for N4 concrete vocab (optional; abstract words don't
  benefit — known SRS failure mode where the learner recalls the picture, not the word).
- **Grammar ↔ SRS unification**: optionally feed grammar items into the main FSRS queue instead
  of the separate Leitner ladder, if a single unified review feels better in practice.
