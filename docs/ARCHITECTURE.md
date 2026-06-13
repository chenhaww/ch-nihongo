# Kado Nihongo — Architecture

## Stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | **Expo (React Native)**, SDK **54** | Do NOT exceed the SDK that Expo Go supports |
| Language | JavaScript (no TypeScript in app code) | Build scripts are `.mjs` |
| Storage | `expo-sqlite` | Content DB via `SQLiteProvider`; `user.db` opened at runtime |
| SRS | `ts-fsrs` | FSRS scheduling for vocab/kanji cards |
| Audio | `expo-speech` | OS offline Japanese voices; no bundled audio |
| Assets | `expo-asset`, `expo-file-system` | Bundles the `.db` (see `metro.config.js`) |
| Build pipeline | Node 22 built-in SQLite (`build.mjs`), `better-sqlite3` (`add-sentences.mjs`) | Dev-machine only |

Repo: `github.com/chenhaww/ch-nihongo`. Dev via **GitHub Codespaces** + `npx expo start --tunnel`,
tested on iPhone through Expo Go. Owner prefers direct `main` edits + iterative file replacement.

## Install & run (Codespace)

```bash
npx create-expo-app . --template blank          # once, if scaffolding missing
npx expo install expo-sqlite expo-speech expo-asset expo-file-system
npm install ts-fsrs
# pin to the SDK Expo Go supports if needed:
npm install expo@^54.0.0 && npx expo install --fix
npx expo start --tunnel --clear                 # --clear after structural changes
```

`metro.config.js` must include `config.resolver.assetExts.push('db')` so the database bundles.

## Two-database model

**`assets/japanese-content.db`** — bundled, read-only, accessed via `useSQLiteContext()`.

| Table | Key columns |
|---|---|
| `kanji` | id, literal, jlpt, grade, strokes, freq, meanings(JSON), on_yomi(JSON), kun_yomi(JSON), svg |
| `vocab` | id, expression, reading, meaning, jlpt |
| `vocab_fts` | FTS5 over expression/reading/meaning |
| `sentences` | id, group_id, register(casual/polite/formal), ja, reading, en, grammar_id, vocab_id, source |
| `grammar` | id, jlpt, ord, title, structure, explanation *(seed only; live lessons are in JS — see below)* |
| `meta` | key/value (stats, attribution) |

**`user.db`** — created at runtime in `src/db.js` (`initUserDb`) and `src/grammar/index.js`
(`initGrammarTable`). Holds ALL user state:

| Table | Purpose |
|---|---|
| `cards` | id, type(vocab/kanji), ref_id→content, fsrs(JSON), due, created_at |
| `reviews` | id, card_id, rating(1–4), reviewed_at |
| `settings` | key/value (see below) |
| `grammar_progress` | lesson_id, box, best_score, last_studied, due |

Settings keys & defaults: `newPerDay=10`, `newTypes=both`, `voiceId=''`, `speechRate=0.9`,
`register=polite`, `typedPct=30`.

## Content authored in JS (not the DB)

Grammar lessons and particles live in JS data files so they version cleanly and need no 27MB
DB rebuild to update:

- `src/grammar/n5.js` → `export const N5 = [ lesson, … ]`
- `src/grammar/index.js` → registry (`LESSONS`, `LESSON_BY_ID`, `lessonsByLevel`) + Leitner
  progress API (`initGrammarTable`, `recordQuiz`, `dueCount`, `studiedCount`, `allProgress`).
- `src/particles.js` → `export const PARTICLES = [ … ]`
- `src/emoji.js` → `export const EMOJI = { '犬':'🐶', … }` (231 verified entries)

**Grammar lesson shape (match exactly when adding N4/N3):**
```js
{
  id: 'n4-01', level: 4,
  title: '〜ことができる',
  structure: 'Dictionary verb + ことができる',
  explanation: '…',                         // plain prose
  registers: [                              // [ja, kana-reading, register]
    ['…', '…', 'casual'],
    ['…', '…', 'polite'],
    ['…', '…', 'formal'],                   // include where meaningful
  ],
  mistake: '…',                             // common error, one box
  quiz: [
    { q: '…＿…', options: ['A','B','C','D'], answer: 1,
      explain: 'why the answer is right',
      why: { 0: 'why A is wrong', 2: 'why C is wrong' } },  // distractor notes
  ],
}
```
Rules: readings in `registers` must be **pure kana** (drive TTS). `answer` is a valid index.
`why` keys must be wrong-option indices only (never the answer). The quiz auto-derives a
speakable sentence by filling the `＿` blank with the correct option; add an optional
`say: '…'` to override.

## File map

```
App.js                      root; 4 tabs (home/grammar/reference/settings); DB providers init
metro.config.js             bundles .db as asset
build.mjs                   Phase 1 pipeline (run on dev machine)
add-sentences.mjs           Tatoeba example injection (run once in Codespace)
assets/japanese-content.db  bundled content DB (~27MB; ~33MB after sentences)
src/
  theme.js                  design tokens: C (colors), F (fonts), LEVEL_COLORS
  db.js                     user DB init, settings, content queries, streak, progress
  srs.js                    FSRS: buildQueue, buildPracticeQueue, grade, previewIntervals, todayStats
  tts.js                    speak(text, {slow}); listJapaneseVoices()
  romaji.js                 toRomaji() (Hepburn-ish), normalizeKana() (answer checking)
  emoji.js                  EMOJI map
  particles.js              PARTICLES data
  grammar/
    n5.js                   N5 lessons (extend with n4.js, n3.js)
    index.js                registry + Leitner grammar progress
  screens/
    HomeScreen.js           dashboard, review CTA, practice, grammar prompt
    ReviewScreen.js         flashcards: flip, typed recall, audio, emoji, sentences, grading
    GrammarScreen.js        lesson browser + lesson view + quiz runner
    ReferenceScreen.js      wraps Kana/Particles/Library under one tab with sub-toggle
    KanaScreen.js           gojūon charts + words-per-kana
    ParticlesScreen.js      particle reference
    LibraryScreen.js        vocab/kanji browse + search
    SettingsScreen.js       voice, speech rate, new/day, typed %, register, reset
```

## Design system (Kado)

Tokens in `src/theme.js` — use these, don't hardcode colors.

```
C.washi  #FAF7F0  background (washi paper)
C.card   #FFFFFF  surfaces
C.ink    #1C1B18  primary text       C.inkSoft #6B675E  secondary
C.line   #E5E0D5  hairline borders
C.shu    #D9381E  vermilion — primary actions / grading / "new"
C.green  #1F4D34  Kado forest green — progress / success / grammar
C.gold   #B8860B  streaks / "learning"
LEVEL_COLORS: N5 #7BA05B · N4 #4E8D7C · N3 #2F6B8E · N2 #6A4C93 · N1 #9E2B25
```

Conventions: rounded cards (radius 12–22) with 1px `C.line` borders on `C.washi`; section
labels are small uppercase letter-spaced; vermilion is reserved for primary/destructive and
"new", green for success/progress/grammar. Japanese display text is large; romaji is small and
`C.inkSoft`. The app currently uses **system fonts**; Kado brand fonts (Fraunces / Manrope /
JetBrains Mono) are a backlog enhancement via `expo-font`.

## Engines & key behaviors

- **FSRS (vocab/kanji)** — `src/srs.js`. `createEmptyCard` → `f.repeat(card, now)[rating].card`.
  Cards serialize to JSON (`due`/`last_review` revived as Date on load). `buildQueue` = due
  cards + up to `newPerDay` new (N5→N1; kanji by frequency). A deterministic hash assigns a
  fraction (`typedPct`) of non-new vocab cards to typed (EN→JP) recall, stable per card per day.
  "Forgot" requeues the card later in the same session.
- **Grammar (Leitner)** — `src/grammar/index.js`. Separate from FSRS by design (zero risk to card
  history, cleaner pedagogically). Ladder `[0,1,3,7,16,35,90]` days; pass ≥ 0.8 promotes, fail
  → box 1; `best_score` retained. Due lessons surface on Home.
- **TTS** — `speak(text,{slow})`; `slow` caps rate ~0.5. Voice + rate from settings. Kanji cards
  speak a cleaned reading (strip okurigana dots), not the bare character.
- **Romaji / answer checking** — `toRomaji` handles っ doubling, ん splitting (n'), long vowels,
  yōon. `normalizeKana` (katakana→hiragana, strip punctuation) makes typed-answer matching
  script-insensitive.

## Validation workflow (no device in CI)

1. Parse every touched file: `esbuild file.js --loader:.js=jsx --jsx=automatic --format=esm --outfile=/dev/null`
2. Prove data/logic with a Node script against `assets/japanese-content.db` (Node 22:
   `--experimental-sqlite`, `node:sqlite`) or by requiring the data file with the export stripped.
3. Check authored Japanese for stray latin chars in TTS strings.
4. Hand the owner a summary + exact `unzip`/`git`/`expo` commands; note if `--clear` or a build
   step is required.
