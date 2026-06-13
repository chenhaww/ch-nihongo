# Kado Nihongo 日本語

An **offline-first** Japanese learning app (iOS/Android, Expo / React Native) that takes a
kana-literate learner from **JLPT N5 → N1**. No internet required at runtime — a ~27MB SQLite
dictionary and all lessons ship inside the app.

## What it does

- **Spaced-repetition flashcards** (FSRS) for all JLPT vocab & kanji, with audio, romaji,
  emoji hints, example sentences, and EN→JP typed recall.
- **Guided grammar course** with quizzes and spaced review (N5 live; N4/N3 in progress).
- **References**: full hiragana/katakana charts, core particles, and a searchable dictionary.
- **Offline text-to-speech** using the device's Japanese voices (male/female, adjustable speed).

## Run it (development)

Built and tested in a **GitHub Codespace** + **Expo Go** on iPhone (Expo SDK 54).

```bash
npx expo install expo-sqlite expo-speech expo-asset expo-file-system
npm install ts-fsrs
node add-sentences.mjs          # one-time: adds example sentences to the bundled DB
npx expo start --tunnel --clear # scan the QR with the iPhone Camera → opens in Expo Go
```

First launch copies the dictionary onto the device (~30s), then runs fully offline.
See `docs/ARCHITECTURE.md` for the full setup, SDK constraints, and gotchas.

## Project status

| Phase | | |
|---|---|---|
| 1 Data pipeline | ✅ | `build.mjs` → bundled SQLite content DB |
| 2 Core app + FSRS | ✅ | flashcards, typed recall, kana/particle refs, practice mode |
| 3 Grammar course | 🟡 | N5 authored (15 lessons); **N4/N3 next** |
| 4 Kanji writing | ⬜ | KanjiVG stroke trace |
| 5 Listening | ⬜ | TTS quiz modes |
| 6 Speaking | ⬜ | on-device STT (needs EAS dev build) |
| 7 Immersion companion | ⬜ | sentence mining for N2–N1 |
| 8 Exam prep | ⬜ | timed mock sections |

## Docs (start here)

- **`docs/AGENT_BRIEF.md`** — how to work on this project (read first if you're a coding agent).
- **`docs/ROADMAP.md`** — every phase, current status, and detailed next steps.
- **`docs/ARCHITECTURE.md`** — stack, two-database model, file map, design tokens, conventions.
- **`docs/TASKS/`** — ready-to-pick-up task specs (start with `n4-grammar.md`).

## Data & licences

JMdict / KANJIDIC2 © EDRDG (CC BY-SA 4.0) · KanjiVG © Ulrich Apel (CC BY-SA 3.0) ·
JLPT lists via `elzup/jlpt-word-list` · kanji meta via `davidluzgouveia/kanji-data`.
Attribution is shown in the app's Settings screen — keep it there.
