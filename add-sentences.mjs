// add-sentences.mjs — inject real Tatoeba example sentences into
// assets/japanese-content.db, linked to JLPT vocab. Run ONCE in the Codespace:
//
//   npm i -D better-sqlite3
//   node add-sentences.mjs
//   git add assets/japanese-content.db && git commit -m "example sentences" && git push
//
import Database from 'better-sqlite3';
import { execSync } from 'node:child_process';
import fs from 'node:fs';

const DB = './assets/japanese-content.db';
if (!fs.existsSync(DB)) { console.error('Run from the repo root.'); process.exit(1); }

// 1. find latest jmdict-simplified release and download the examples file
const tag = execSync('curl -sI https://github.com/scriptin/jmdict-simplified/releases/latest')
  .toString().match(/releases\/tag\/(.+)\r?\n/)[1].trim();
const file = `jmdict-examples-eng-${tag}.json`;
const tmp = `/tmp/${file}`;
if (!fs.existsSync(tmp)) {
  console.log('downloading examples (~30MB)…');
  execSync(`curl -sL -o ${tmp}.tgz "https://github.com/scriptin/jmdict-simplified/releases/download/${encodeURIComponent(tag)}/${file}.tgz"`);
  execSync(`tar xzf ${tmp}.tgz -C /tmp`);
}

console.log('parsing…');
const data = JSON.parse(fs.readFileSync(tmp, 'utf8'));
const db = new Database(DB);

const vocabLookup = new Map();
for (const r of db.prepare('SELECT id, expression, reading FROM vocab').all()) {
  vocabLookup.set(r.expression, r.id);
  if (!vocabLookup.has(r.reading)) vocabLookup.set(r.reading, r.id);
}

db.exec("DELETE FROM sentences WHERE source = 'tatoeba'");
const ins = db.prepare(`INSERT INTO sentences (group_id, register, ja, en, vocab_id, source)
                        VALUES (?, 'polite', ?, ?, ?, 'tatoeba')`);
const perVocab = new Map();
let gid = 100000, count = 0;

const tx = db.transaction(() => {
  for (const w of data.words) {
    const expr = w.kanji?.[0]?.text ?? w.kana?.[0]?.text;
    const vid = vocabLookup.get(expr);
    if (!vid) continue;
    for (const s of w.sense ?? []) {
      for (const e of s.examples ?? []) {
        if ((perVocab.get(vid) ?? 0) >= 3) break;   // max 3 per word
        const ja = e.sentences?.find(x => (x.land ?? x.lang) === 'jpn')?.text;
        const en = e.sentences?.find(x => (x.land ?? x.lang) === 'eng')?.text;
        if (ja && en && ja.length <= 60) {
          ins.run(++gid, ja, en, vid);
          perVocab.set(vid, (perVocab.get(vid) ?? 0) + 1);
          count++;
        }
      }
    }
  }
});
tx();
db.exec('VACUUM');

const covered = db.prepare(
  "SELECT COUNT(DISTINCT vocab_id) c FROM sentences WHERE source='tatoeba'").get().c;
console.log(`✔ ${count} sentences added, covering ${covered} vocab words`);
console.log('DB size now:', (fs.statSync(DB).size / 1e6).toFixed(1) + 'MB');
db.close();
