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

export function toRomaji(kana) {
  if (!kana) return '';
  const s = kataToHira(kana);
  let out = '';
  let i = 0;
  while (i < s.length) {
    const ch = s[i];
    // sokuon: double the next consonant
    if (ch === 'っ') {
      const rest = toRomaji(s.slice(i + 1));
      const c = rest[0];
      out += (c && !VOWELS.includes(c)) ? (c === 'c' ? 't' : c) : '';
      return out + rest;
    }
    const two = s.slice(i, i + 2);
    if (DIGRAPHS[two]) { out += DIGRAPHS[two]; i += 2; continue; }
    if (ch === 'ん') {
      const nxt = toRomaji(s.slice(i + 1));
      const c = nxt[0];
      out += (c && (VOWELS.includes(c) || c === 'y')) ? "n'" : 'n';
      return out + nxt;
    }
    if (ch === 'ー') {
      const last = out.match(/[aiueo](?=[^aiueo]*$)/);
      out += last ? last[0] : '-';
      i++; continue;
    }
    if (MONO[ch] !== undefined) { out += MONO[ch]; i++; continue; }
    out += ch; i++;  // pass through kanji/latin unchanged
  }
  return out;
}
