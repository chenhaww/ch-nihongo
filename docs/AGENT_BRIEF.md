# Kado Nihongo — Coding Agent Brief

You are continuing development of **Kado Nihongo** (repo: `chenhaww/ch-nihongo`), an
offline-first Japanese learning app for JLPT N5→N1. Phases 1–3 are built and working.
Read `ROADMAP.md` for what's done and what's next, and `ARCHITECTURE.md` for the stack,
data model, and conventions. This file tells you *how to work* on the project.

## The product in one paragraph

A React Native (Expo) app that runs fully offline. It bundles a ~27MB SQLite dictionary
(all JLPT kanji + vocab + stroke data) and teaches through FSRS-scheduled flashcards,
a guided grammar course, kana/particle references, and offline text-to-speech. The
learner (the repo owner) knows kana, is starting around N5, and is targeting N3→N1.
Pedagogy is grounded in spaced repetition + comprehensible input + explicit grammar;
production/conversation practice comes in later phases.

## Golden rules

1. **Offline is non-negotiable.** No feature may require network access at runtime.
   All content ships in the bundled DB or in JS data files. The only network steps are
   build-time scripts (`build.mjs`, `add-sentences.mjs`) run on the developer's machine.
2. **Two databases, never mixed.** `japanese-content.db` (bundled asset, read-only) holds
   content. `user.db` (created at runtime) holds all user state — cards, reviews, settings,
   grammar progress. Content updates must never touch user state, and vice versa.
3. **Validate before shipping.** There is no device in CI. Before declaring any change done,
   parse every touched file with esbuild (see below) and, for any data/logic change, write a
   tiny Node script that exercises it against the real DB or real data file. Don't guess that
   FSRS/SQL/regex works — prove it.
4. **Iterative file replacement, not branches.** The owner works on `main` directly and
   applies changes by dropping files into a GitHub Codespace. Keep changes as clean
   whole-file writes or surgical edits; always leave the repo in a runnable state.
5. **Respect the design system.** Use the tokens in `src/theme.js` (`C`, `F`, `LEVEL_COLORS`).
   Don't introduce new accent colors or ad-hoc styling. See ARCHITECTURE.md → Design.
6. **TTS-safe Japanese.** Any string sent to `speak()` must be natural Japanese (kana/kanji).
   Readings used for audio must be pure kana — romaji or symbols break the voice. Test new
   content for stray latin characters.
7. **Child-of-content authoring quality.** Grammar/particle/example content is studied by a
   real learner. Author it accurately, with correct register (casual/polite/formal) and
   genuinely instructive "why this is wrong" notes. No filler.

## How to validate (no device needed)

```bash
# Parse-check any JS/JSX file (catches syntax + JSX errors):
esbuild path/to/file.js --loader:.js=jsx --jsx=automatic --format=esm --outfile=/dev/null

# Run logic against the real content DB (Node 22 has built-in SQLite):
node --experimental-sqlite -e "const {DatabaseSync}=require('node:sqlite'); \
  const db=new DatabaseSync('assets/japanese-content.db'); /* ...query... */"

# Validate a data file's integrity by requiring it (strip the export):
# replace 'export const X' -> 'const X' + module.exports, then require and assert.
```

A change is "done" only when: every touched file parses, data/logic changes are proven by a
script, and the change is described to the owner with the exact Codespace apply commands.

## How the owner applies your changes

The owner runs a GitHub Codespace (cloud VS Code) with `npx expo start --tunnel` and tests on
an iPhone via Expo Go (SDK 54 — do not bump the Expo SDK above what Expo Go supports). Typical
loop:

```bash
unzip -o <your-update>.zip      # or files are edited directly in the Codespace
git add -A && git commit -m "…" && git push
```

When you deliver, give a short summary + the precise commands. Pure-code changes hot-reload;
note when a change needs `--clear` (structural/new files) or a rebuild step.

## Tone for the owner-facing notes

Concise, honest about trade-offs and limitations, no overclaiming. Flag when something is a
first batch vs complete, when a feature has caveats (e.g. on-device STT strictness), and when
a "works" depends on a manual step (installing a voice, enabling the JP keyboard, running a
build script).
