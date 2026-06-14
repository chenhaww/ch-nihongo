// src/conversation/conbini.js — Situational dialogue: convenience store checkout.
// Authored, offline content (no runtime network). Shape mirrors the grammar files:
// turns of an NPC line + learner reply options, register-aware, with instructive
// "why this is off" notes. Every `kana` reading is pure kana (drives TTS).
//
// Turn shape:
//   { npc: [ja, kana], npcEn, stage?,            // the clerk's line (+ English gloss)
//     options: [ { ja, kana, en, ok, note?, why? } ] }
// One or more options may be `ok: true` (natural here). `why` explains an unnatural
// pick; `note` adds colour to an acceptable one. The first `ok` option is treated as
// the model reply (spoken back when the learner picks an unnatural one).

export const CONBINI = {
  id: 'conv-conbini-01',
  setting: 'コンビニ',
  settingEn: 'Convenience store',
  emoji: '🏪',
  speaker: '店員 · CLERK',
  level: 4,
  register: 'polite',
  goal: 'Buy a hot bento, decline a bag, pay by card — all in natural clerk-register Japanese.',
  intro:
    'You take a bento to the register. The clerk (店員) speaks in keigo; you answer in plain ' +
    'polite Japanese (です/ます). Pick the most natural reply each turn.',
  turns: [
    {
      npc: ['いらっしゃいませ。', 'いらっしゃいませ。'],
      npcEn: '"Welcome." — the standard greeting to any customer.',
      stage: 'The clerk greets you as you reach the counter.',
      options: [
        { ja: '（会釈して、お弁当を置く）', kana: '', en: 'Nod slightly and set the bento down', ok: true,
          note: 'Just right. いらっしゃいませ is a one-way greeting to customers — no spoken reply is expected; a small nod is normal.' },
        { ja: 'こんにちは。', kana: 'こんにちは。', en: '"Hello."', ok: true,
          note: 'Harmless and friendly, though most customers simply nod rather than greet back.' },
        { ja: 'いらっしゃいませ。', kana: 'いらっしゃいませ。', en: '"Welcome." (said back)', ok: false,
          why: 'いらっしゃいませ is what staff say TO customers — saying it back sounds like a joke.' },
      ],
    },
    {
      npc: ['お弁当は温めますか。', 'おべんとうはあたためますか。'],
      npcEn: '"Shall I heat the bento?"',
      stage: 'The clerk scans the bento and asks about heating it.',
      options: [
        { ja: 'はい、お願いします。', kana: 'はい、おねがいします。', en: '"Yes, please."', ok: true,
          note: 'The natural way to accept a service — はい + お願いします.' },
        { ja: 'いいえ、けっこうです。', kana: 'いいえ、けっこうです。', en: '"No, thank you."', ok: true,
          note: 'Also fine — けっこうです is the polite way to decline (you just won\'t get it heated).' },
        { ja: '温めない。', kana: 'あたためない。', en: '"Won\'t heat it." (plain/casual)', ok: false,
          why: 'Right meaning, wrong register: plain-form 温めない is too casual for a clerk. Decline with いいえ、けっこうです。' },
      ],
    },
    {
      npc: ['袋はご利用ですか。', 'ふくろはごりようですか。'],
      npcEn: '"Will you be using a bag?"',
      stage: 'You want to decline the bag (you brought your own).',
      options: [
        { ja: 'いえ、大丈夫です。', kana: 'いえ、だいじょうぶです。', en: '"No, I\'m fine."', ok: true,
          note: 'The go-to polite decline. 大丈夫です softly means "no need".' },
        { ja: 'いえ、けっこうです。', kana: 'いえ、けっこうです。', en: '"No, thank you."', ok: true,
          note: 'Also natural and a touch more formal than 大丈夫です。' },
        { ja: 'いらない。', kana: 'いらない。', en: '"Don\'t need it." (blunt)', ok: false,
          why: 'Correct meaning but blunt and casual — to a clerk use 大丈夫です or けっこうです。' },
      ],
    },
    {
      npc: ['お支払いはどうなさいますか。', 'おしはらいはどうなさいますか。'],
      npcEn: '"How would you like to pay?" (なさる = honorific "do").',
      stage: 'You want to pay by card.',
      options: [
        { ja: 'カードでお願いします。', kana: 'かーどでおねがいします。', en: '"By card, please."', ok: true,
          note: 'Means + で + お願いします is the clean pattern: 現金で…, カードで…, ＩＣで….' },
        { ja: '現金でお願いします。', kana: 'げんきんでおねがいします。', en: '"By cash, please."', ok: true,
          note: 'Perfectly natural too — just means you\'re paying cash instead.' },
        { ja: 'お金。', kana: 'おかね。', en: '"Money."', ok: false,
          why: 'A bare noun isn\'t an answer here. State the method + で + お願いします: 現金でお願いします。' },
      ],
    },
    {
      npc: ['ポイントカードはお持ちですか。', 'ぽいんとかーどはおもちですか。'],
      npcEn: '"Do you have a point card?"',
      stage: 'You don\'t have one and want to decline politely.',
      options: [
        { ja: 'いえ、持っていません。', kana: 'いえ、もっていません。', en: '"No, I don\'t have one."', ok: true,
          note: 'Direct and polite. 持っています/持っていません is the natural have/haven\'t pattern.' },
        { ja: 'いえ、大丈夫です。', kana: 'いえ、だいじょうぶです。', en: '"No, I\'m fine."', ok: true,
          note: 'Also common — a soft decline without spelling out that you lack one.' },
        { ja: 'ない。', kana: 'ない。', en: '"Don\'t have." (plain)', ok: false,
          why: 'Plain ない is too casual to a clerk. Use 持っていません or 大丈夫です。' },
      ],
    },
    {
      npc: ['ありがとうございました。', 'ありがとうございました。'],
      npcEn: '"Thank you very much." — said as your receipt and change are handed over.',
      stage: 'The transaction is done; you take your bag and leave.',
      options: [
        { ja: 'どうも。', kana: 'どうも。', en: '"Thanks."', ok: true,
          note: 'A light, natural customer sign-off. どうも works on its own here.' },
        { ja: 'ありがとうございます。', kana: 'ありがとうございます。', en: '"Thank you."', ok: true,
          note: 'Also perfectly polite — slightly warmer than どうも.' },
        { ja: 'さようなら。', kana: 'さようなら。', en: '"Goodbye."', ok: false,
          why: 'さようなら sounds like a long farewell — odd for a quick shop. どうも or a nod fits better.' },
      ],
    },
  ],
  outro:
    'Done! Card payment needs no signature for a small amount. You handled greeting, heating, ' +
    'bag, payment, point card, and farewell — a full コンビニ run in polite register.',
};
