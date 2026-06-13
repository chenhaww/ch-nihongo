# Task: Author N4 grammar (`src/grammar/n4.js`)

**Goal:** Extend the guided grammar course with N4 lessons, matching the existing N5 system
exactly. This is the immediate next increment of Phase 3.

## Context

- N5 lessons live in `src/grammar/n5.js` as `export const N5 = [ … ]`.
- The registry `src/grammar/index.js` currently does `export const LESSONS = [...N5];`.
- `GrammarScreen.js` already renders any level with lessons and shows "coming soon" for empty
  levels — so adding N4 content + registering it is all that's needed; no screen changes.
- The Leitner progress engine, quiz runner, audio, and "why-wrong" notes all work generically.

## What to do

1. Create `src/grammar/n4.js` exporting `export const N4 = [ … ]` using the **exact lesson
   shape** documented in `docs/ARCHITECTURE.md` → "Grammar lesson shape". Every lesson needs:
   `id` (`'n4-01'`, `'n4-02'`, …), `level: 4`, `title`, `structure`, `explanation`,
   `registers` (≥1 example as `[ja, kanaReading, register]`; include casual/polite/formal where
   the point actually varies), `mistake`, and `quiz` (2–3 multiple-choice questions, each with
   `options`, `answer` index, `explain`, and a `why` map for the instructive distractors).
2. Register it: in `src/grammar/index.js`, `import { N4 } from './n4'` and change
   `export const LESSONS = [...N5, ...N4];`.
3. Validate (see below) and hand the owner the apply commands.

## Scope & ordering

Author in batches of ~15 (the owner reviews as they learn). Priority order for the first N4
batch — these are the highest-frequency, most foundational points:

```
1  〜ている (progressive / resulting state)
2  potential form (〜られる / 〜える: can do)
3  〜たことがある (have done before)
4  〜ことができる (be able to)
5  〜なければならない / 〜なきゃ (must)
6  〜なくてもいい (don't have to)
7  〜てもいい (may / permission)
8  〜てはいけない (must not)
9  〜たほうがいい (had better)
10 〜つもり (intend to)
11 〜ながら (while doing)
12 〜たり〜たり (do things like X and Y)
13 giving/receiving: 〜てあげる・〜てくれる・〜てもらう
14 〜てみる (try doing)
15 〜ておく (do in advance)
```

Subsequent batches (author after the first lands): 〜てしまう · 〜そうだ (looks/hearsay) ·
〜ようだ/みたい · 〜らしい · 〜はず · 〜かもしれない · 〜でしょう/だろう · 〜と思う ·
quotation 〜と言っていた · conditionals 〜と/〜ば/〜たら/〜なら · 〜のに · 〜ので · passive 〜られる ·
causative 〜させる · 〜より〜のほうが/〜ほど · volitional 〜よう/おう · 〜ところ · 〜すぎる ·
〜やすい/〜にくい · 〜し · keigo basics. Target ~80 total for full N4.

## Validation (required before done)

```bash
# 1. Parse
esbuild src/grammar/n4.js --loader:.js=jsx --jsx=automatic --format=esm --outfile=/dev/null
esbuild src/grammar/index.js --loader:.js=jsx --jsx=automatic --format=esm --outfile=/dev/null

# 2. Integrity: require the file, assert each lesson well-formed
node -e "const s=require('fs').readFileSync('src/grammar/n4.js','utf8').replace('export const','const')+'\nmodule.exports={N4};';require('fs').writeFileSync('/tmp/n4.js',s);const {N4}=require('/tmp/n4.js');let bad=0;const ids=new Set();for(const l of N4){if(ids.has(l.id)){console.log('dup',l.id);bad++}ids.add(l.id);if(!l.title||!l.structure||!l.explanation||!l.mistake||!l.registers?.length||!l.quiz?.length){console.log('missing field',l.id);bad++}for(const r of l.registers)if(/[a-zA-Z]/.test(r[1])){console.log('non-kana reading',l.id,r[1]);bad++}for(const q of l.quiz){if(typeof q.answer!=='number'||q.answer<0||q.answer>=q.options.length){console.log('bad answer',l.id);bad++}if(q.why)for(const k of Object.keys(q.why))if(+k===q.answer){console.log('why on correct answer',l.id);bad++}}}console.log(bad?bad+' ISSUES':N4.length+' lessons OK');"
```

Every `registers` reading must be pure kana (drives TTS). `answer` must be a valid index. `why`
keys must be wrong-option indices only.

## Done means

`n4.js` parses, integrity script prints "N lessons OK", `index.js` registers N4, and the owner
has the apply commands. Pure code — hot-reloads; recommend `--clear` since a new file was added.
