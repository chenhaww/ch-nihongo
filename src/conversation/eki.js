// src/conversation/eki.js — Situational dialogue: train station.
// Authored offline content; shape mirrors conbini.js. Readings are pure kana.
export const EKI = {
  id: 'conv-eki-01',
  setting: '駅',
  settingEn: 'Train station',
  emoji: '🚉',
  level: 4,
  register: 'polite',
  goal: 'Ask the fare, buy a ticket, find the right line and platform, and confirm the train stops where you need.',
  intro:
    'You\'re at the ticket window / asking station staff. Keep questions polite (〜ですか) and ' +
    'use the right counters: tickets are 〜枚(まい), platforms are 〜番線(ばんせん).',
  turns: [
    {
      npc: ['はい、どうされましたか。', 'はい、どうされましたか。'],
      npcEn: '"Yes, how can I help?"',
      stage: 'You step up to the station attendant.',
      options: [
        { ja: 'すみません、新宿までいくらですか。', kana: 'すみません、しんじゅくまでいくらですか。', en: '"Excuse me, how much to Shinjuku?"', ok: true,
          note: 'Clear and polite — 〜まで (as far as) + いくらですか asks the fare.' },
        { ja: '新宿までいくら？', kana: 'しんじゅくまでいくら？', en: '"How much to Shinjuku?" (casual)', ok: false,
          why: 'Drops です — too casual to staff. Add it: 新宿までいくらですか。' },
        { ja: '新宿。', kana: 'しんじゅく。', en: '"Shinjuku."', ok: false,
          why: 'Just a place name isn\'t a question. Ask 新宿までいくらですか。' },
      ],
    },
    {
      npc: ['二百円です。', 'にひゃくえんです。'],
      npcEn: '"That\'s 200 yen."',
      stage: 'You want one ticket.',
      options: [
        { ja: 'じゃあ、一枚お願いします。', kana: 'じゃあ、いちまいおねがいします。', en: '"One, please, then."', ok: true,
          note: 'Tickets are counted with 〜枚(まい): 一枚 = one ticket.' },
        { ja: '一個ください。', kana: 'いっこください。', en: '"One (item), please."', ok: false,
          why: '〜個 counts small objects, not tickets. Use 〜枚 → 一枚ください/お願いします。' },
        { ja: '一枚。', kana: 'いちまい。', en: '"One."', ok: false,
          why: 'The counter is right, but finish the request: 一枚お願いします。' },
      ],
    },
    {
      npc: ['どちらまで行かれますか。', 'どちらまでいかれますか。'],
      npcEn: '"Where are you headed?" (行かれる = honorific "go")',
      stage: 'You want the Shibuya line.',
      options: [
        { ja: '渋谷へ行きたいんですが、何線ですか。', kana: 'しぶやへいきたいんですが、なにせんですか。', en: '"I want to go to Shibuya — which line?"', ok: true,
          note: '〜たいんですが softly sets up the question; 何線 asks which line.' },
        { ja: '渋谷どこ。', kana: 'しぶやどこ。', en: '"Where\'s Shibuya?" (casual)', ok: false,
          why: 'Casual and vague. Ask 渋谷へは何線ですか。' },
        { ja: '渋谷の電車。', kana: 'しぶやのでんしゃ。', en: '"Shibuya train."', ok: false,
          why: 'A noun phrase, not a question. Ask 渋谷へは何線ですか。' },
      ],
    },
    {
      npc: ['山手線にお乗りください。', 'やまのてせんにおのりください。'],
      npcEn: '"Please take the Yamanote line."',
      stage: 'You want to confirm this train stops at Shibuya.',
      options: [
        { ja: 'この電車は渋谷に止まりますか。', kana: 'このでんしゃはしぶやにとまりますか。', en: '"Does this train stop at Shibuya?"', ok: true,
          note: '〜に止まりますか is exactly how to check a stop — vital for express vs local.' },
        { ja: '渋谷止まる？', kana: 'しぶやとまる？', en: '"Stop at Shibuya?" (casual)', ok: false,
          why: 'Plain 止まる + rising tone is casual. Ask 渋谷に止まりますか。' },
        { ja: '渋谷行く電車？', kana: 'しぶやいくでんしゃ？', en: '"Train that goes to Shibuya?"', ok: false,
          why: 'Fragmented and casual. Ask この電車は渋谷に止まりますか。' },
      ],
    },
    {
      npc: ['はい、止まります。', 'はい、とまります。'],
      npcEn: '"Yes, it does."',
      stage: 'You need the platform number.',
      options: [
        { ja: '何番線ですか。', kana: 'なんばんせんですか。', en: '"Which platform?"', ok: true,
          note: 'Platforms use 〜番線(ばんせん): 何番線ですか asks the number.' },
        { ja: '何番線？', kana: 'なんばんせん？', en: '"Which platform?" (casual)', ok: false,
          why: 'Right counter, but drop-です is casual to staff. Add it: 何番線ですか。' },
        { ja: 'ホーム。', kana: 'ほーむ。', en: '"Platform."', ok: false,
          why: 'A single word isn\'t a question. Ask 何番線ですか。' },
      ],
    },
    {
      npc: ['三番線です。', 'さんばんせんです。'],
      npcEn: '"Platform 3."',
      stage: 'You\'ve got what you need.',
      options: [
        { ja: 'ありがとうございます。助かりました。', kana: 'ありがとうございます。たすかりました。', en: '"Thank you, that helped."', ok: true,
          note: '助かりました ("that saved me") is a warm, natural way to thank for help.' },
        { ja: 'どうも。', kana: 'どうも。', en: '"Thanks."', ok: true,
          note: 'Light but fine to close out.' },
        { ja: 'はい。', kana: 'はい。', en: '"Yes."', ok: false,
          why: '"はい" alone acknowledges but doesn\'t thank. Say ありがとうございます。' },
      ],
    },
  ],
  outro:
    'You navigated fares, the 〜枚 ticket counter, the right line, a stop check, and the 〜番線 ' +
    'platform — the exact moves that get you through any Japanese station.',
};
