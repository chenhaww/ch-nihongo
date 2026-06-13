# AGENTS.md

Operating instructions for AI coding agents working in this repo. Read this fully before
making changes. Deeper detail lives in `docs/` — `docs/AGENT_BRIEF.md`, `docs/ROADMAP.md`,
`docs/ARCHITECTURE.md`.

## What this project is

**Kado Nihongo** — an offline-first Expo / React Native app for learning Japanese (JLPT N5→N1).
A ~27MB SQLite dictionary and all lessons ship inside the app; nothing may require network at
runtime. Current status and next work: see `docs/ROADMAP.md` (Phase 3 — author N4/N3 grammar —
is the immediate priority; see `docs/TASKS/n4-grammar.md`).

## Non-negotiable rules

1. **Offline only.** No runtime network calls. Content lives in the bundled DB or JS data files.
   The only networked code is dev-machine build scripts (`build.mjs`, `add-sentences.mjs`).
2. **Two databases, kept separate.** `assets/japanese-content.db` = read-only content.
   `user.db` = all user state (cards, reviews, settings, grammar progress). Never let one
   clobber the other. Content updates must preserve user progress.
3. **Validate before declaring done** (there is no device in CI):
   - Parse every touched file:
     `esbuild FILE --loader:.js=jsx --jsx=automatic --format=esm --outfile=/dev/null`
   - Prove data/logic with a Node script against the real DB
     (`node --experimental-sqlite … node:sqlite`) or by requiring the data file.
   - Check authored Japanese for stray latin characters in any string passed to `speak()`.
4. **Don't bump the Expo SDK** above what Expo Go supports (currently SDK 54).
5. **Use the design tokens** in `src/theme.js` (`C`, `F`, `LEVEL_COLORS`). No new accent colors
   or ad-hoc styling. Vermilion = primary/destructive/"new"; green = success/progress/grammar.
6. **TTS-safe Japanese.** Readings used for audio must be pure kana. Natural JP only to `speak()`.
7. **Keep the repo runnable** on every commit. Whole-file writes or surgical edits; no broken
   intermediate states. The owner edits `main` directly and applies changes in a Codespace.
8. **Author content accurately.** Grammar/particle/example content is studied by a real learner.
   Correct register (casual/polite/formal), genuinely instructive "why wrong" notes, no filler.

## Repo layout (essentials)

```
App.js                 root; 4 tabs (今日/文法/辞書/設定)
assets/japanese-content.db   bundled content DB
build.mjs / add-sentences.mjs   dev-machine build pipeline
src/theme.js           design tokens
src/db.js src/srs.js   user DB + FSRS engine
src/tts.js src/romaji.js src/emoji.js src/particles.js
src/grammar/n5.js src/grammar/index.js   grammar content + Leitner progress
src/screens/*.js       Home, Review, Grammar, Reference, Kana, Particles, Library, Settings
docs/                  AGENT_BRIEF, ROADMAP, ARCHITECTURE, TASKS/
```

Full map, schemas, and engine behavior: `docs/ARCHITECTURE.md`.

## Definition of done for a change

Touched files parse ✓ · data/logic proven by a script ✓ · design tokens respected ✓ ·
JP audio strings are clean kana/kanji ✓ · owner handed a short summary + exact apply commands
(`unzip`/`git`/`expo`), noting if `--clear` or a build step is needed.
