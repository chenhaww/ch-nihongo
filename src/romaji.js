// src/romaji.js — kana → romaji (wapuro-style Hepburn: しょう → shou)
const DIGRAPHS = {
  'きゃ':'kya','きゅ':'kyu','きょ':'kyo','しゃ':'sha','しゅ':'shu','しょ':'sho',
  'ちゃ':'cha','ちゅ':'chu','ちょ':'cho','にゃ':'nya','にゅ':'nyu','にょ':'nyo',
  'ひゃ':'hya','ひゅ':'hyu','ひょ':'hyo','みゃ':'mya','みゅ':'myu','みょ':'myo',
  'りゃ':'rya','りゅ':'ryu','りょ':'ryo','ぎゃ':'gya','ぎゅ':'gyu','ぎょ':'gyo',
  'じゃ':'ja','じゅ':'ju','じょ':'jo','ぢゃ':'ja','ぢゅ':'ju','ぢょ':'jo',
  'びゃ':'bya','びゅ':'byu','びょ':'byo','ぴゃ':'pya','ぴゅ':'pyu','ぴょ':'pyo',
  'ふぁ':'fa','ふぃ':'fi','ふぇ':'fe','ふぉ':'fo','うぃ':'wi','うぇ':'we',
  'てぃ':'ti','でぃ':'di','ヴぁ':'va','ヴぃ':'vi','ヴぇ':'ve','ヴぉ':'vo',
};
const MONO = {
  'あ':'a','い':'i','う':'u','え':'e','お':'o',
  'か':'ka','き':'ki','く':'ku','け':'ke','こ':'ko',
  'さ':'sa','し':'shi','す':'su','せ':'se','そ':'so',
  'た':'ta','ち':'chi','つ':'tsu','て':'te','と':'to',
  'な':'na','に':'ni','ぬ':'nu','ね':'ne','の':'no',
  'は':'ha','ひ':'hi','ふ':'fu','へ':'he','ほ':'ho',
  'ま':'ma','み':'mi','む':'mu','め':'me','も':'mo',
  'や':'ya','ゆ':'yu','よ':'yo',
  'ら':'ra','り':'ri','る':'ru','れ':'re','ろ':'ro',
  'わ':'wa','ゐ':'wi','ゑ':'we','を':'o','ん':'n',
  'が':'ga','ぎ':'gi','ぐ':'gu','げ':'ge','ご':'go',
  'ざ':'za','じ':'ji','ず':'zu','ぜ':'ze','ぞ':'zo',
  'だ':'da','ぢ':'ji','づ':'zu','で':'de','ど':'do',
  'ば':'ba','び':'bi','ぶ':'bu','べ':'be','ぼ':'bo',
  'ぱ':'pa','ぴ':'pi','ぷ':'pu','ぺ':'pe','ぽ':'po',
  'ぁ':'a','ぃ':'i','ぅ':'u','ぇ':'e','ぉ':'o','ヴ':'vu',
  'ー':'-', '、':', ', '。':'. ', '・':' ',
};
const VOWELS = 'aiueo';

function kataToHira(s) {
  return s.replace(/[\u30A1-\u30F6]/g, ch =>
    String.fromCharCode(ch.charCodeAt(0) - 0x60));
}

// Normalize for answer checking: katakana→hiragana, strip spaces/punctuation
export function normalizeKana(s) {
  return kataToHira((s || '').trim())
    .replace(/[\s。、．，.,!?！？〜~ー]/g, m => (m === 'ー' ? 'ー' : ''));
}

// Tokenize kana into per-mora romaji units. Each token { t, p } where `p` marks
// punctuation. Joining tokens plainly reproduces run-on Hepburn; joining with a
// space between mora gives a reading "spaced according to the kana".
function romajiTokens(kana) {
  const s = kataToHira(kana);
  const toks = [];
  let i = 0;
  // romaji + advance for a single plain mora starting at j (digraph or mono)
  const moraAt = (j) => {
    if (j >= s.length) return ['', 1];
    const two = s.slice(j, j + 2);
    if (DIGRAPHS[two]) return [DIGRAPHS[two], 2];
    const c = s[j];
    return [MONO[c] !== undefined ? MONO[c] : c, 1];
  };
  while (i < s.length) {
    const ch = s[i];
    if (ch === 'っ') {                       // sokuon: double the next consonant
      const [r, adv] = moraAt(i + 1);
      const c = r[0];
      const dbl = (c && !VOWELS.includes(c)) ? (c === 'c' ? 't' : c) : '';
      toks.push({ t: dbl + r, p: false });
      i += 1 + adv; continue;
    }
    const two = s.slice(i, i + 2);
    if (DIGRAPHS[two]) { toks.push({ t: DIGRAPHS[two], p: false }); i += 2; continue; }
    if (ch === 'ん') {                        // n, or n' before a vowel / y
      const [r] = moraAt(i + 1);
      const c = r[0];
      toks.push({ t: (c && (VOWELS.includes(c) || c === 'y')) ? "n'" : 'n', p: false });
      i++; continue;
    }
    if (ch === 'ー') {                        // long mark: extend previous vowel
      if (toks.length) {
        const prev = toks[toks.length - 1];
        const m = prev.t.match(/[aiueo](?=[^aiueo]*$)/);
        prev.t += m ? m[0] : '-';
      } else toks.push({ t: '-', p: false });
      i++; continue;
    }
    if (MONO[ch] !== undefined) {
      toks.push({ t: MONO[ch], p: (ch === '、' || ch === '。' || ch === '・') });
      i++; continue;
    }
    toks.push({ t: ch, p: false });          // pass through kanji/latin unchanged
    i++;
  }
  return toks;
}

// kana → romaji. `spaced: true` separates each mora (e.g. こんにちは → "ko n ni chi wa")
// so the romaji lines up with the kana; default stays run-on Hepburn.
export function toRomaji(kana, { spaced = false } = {}) {
  if (!kana) return '';
  const toks = romajiTokens(kana);
  if (!spaced) return toks.map(o => o.t).join('');
  let out = '';
  for (const o of toks) {
    const t = o.p ? o.t : o.t.replace(/'/g, '');   // apostrophe redundant when spaced
    if (!t) continue;
    if (o.p) out = out.replace(/\s+$/, '') + t;     // punctuation hugs the previous mora
    else out += (out === '' || out.endsWith(' ')) ? t : ' ' + t;
  }
  return out.replace(/\s+$/, '');
}
