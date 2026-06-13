// src/conversation/yuubin.js — Situational dialogue: post office.
// Authored offline content; shape mirrors conbini.js. Readings are pure kana.
export const YUUBIN = {
  id: 'conv-yuubin-01',
  setting: '郵便局',
  settingEn: 'Post office',
  emoji: '📮',
  speaker: '局員 · CLERK',
  level: 4,
  register: 'polite',
  goal: 'Send a package abroad, choose airmail, ask how long it takes, and buy stamps — politely.',
  intro:
    'You\'re sending a parcel overseas. Use 〜たいんですが to open a request, the right mail terms ' +
    '(航空便 = airmail), and the 〜枚 counter for stamps.',
  turns: [
    {
      npc: ['いらっしゃいませ。本日はどのようなご用件でしょうか。', 'いらっしゃいませ。ほんじつはどのようなごようけんでしょうか。'],
      npcEn: '"Welcome. What can I help you with today?"',
      stage: 'You reach the counter with a parcel.',
      options: [
        { ja: 'この荷物を送りたいんですが。', kana: 'このにもつをおくりたいんですが。', en: '"I\'d like to send this package."', ok: true,
          note: '〜たいんですが is the soft, polite way to open a request — trails off, inviting help.' },
        { ja: 'これ送る。', kana: 'これおくる。', en: '"Send this." (plain)', ok: false,
          why: 'Plain 送る is casual self-talk. Say 送りたいんですが。' },
        { ja: '荷物。', kana: 'にもつ。', en: '"Package."', ok: false,
          why: 'A bare noun. Say この荷物を送りたいんですが。' },
      ],
    },
    {
      npc: ['どちらまでお送りしますか。', 'どちらまでおおくりしますか。'],
      npcEn: '"Where are you sending it?"',
      stage: 'It\'s going overseas.',
      options: [
        { ja: 'アメリカまでお願いします。', kana: 'あめりかまでおねがいします。', en: '"To America, please."', ok: true,
          note: '〜まで (as far as) + お願いします states the destination politely.' },
        { ja: 'アメリカに送って。', kana: 'あめりかにおくって。', en: '"Send it to America." (casual)', ok: false,
          why: '送って is a casual command to staff. Say アメリカまでお願いします。' },
        { ja: '海外。', kana: 'かいがい。', en: '"Overseas."', ok: false,
          why: 'Too vague and bare. Name the place: アメリカまでお願いします。' },
      ],
    },
    {
      npc: ['航空便と船便、どちらになさいますか。', 'こうくうびんとふなびん、どちらになさいますか。'],
      npcEn: '"Airmail or sea mail — which would you like?"',
      stage: 'You want it to arrive fast.',
      options: [
        { ja: '航空便でお願いします。', kana: 'こうくうびんでおねがいします。', en: '"Airmail, please."', ok: true,
          note: '航空便 is the term for airmail; 〜でお願いします picks it.' },
        { ja: '早いほうでお願いします。', kana: 'はやいほうでおねがいします。', en: '"The faster one, please."', ok: true,
          note: 'Natural too — 早いほうで lets the clerk pick whichever is quicker.' },
        { ja: '飛行機で。', kana: 'ひこうきで。', en: '"By airplane."', ok: false,
          why: '飛行機 is the plane itself; the mail service is 航空便. Say 航空便でお願いします。' },
      ],
    },
    {
      npc: ['少々日数がかかりますが、よろしいですか。', 'しょうしょうにっすうがかかりますが、よろしいですか。'],
      npcEn: '"It will take a number of days — is that all right?"',
      stage: 'You want to know how many days.',
      options: [
        { ja: '何日ぐらいかかりますか。', kana: 'なんにちぐらいかかりますか。', en: '"About how many days?"', ok: true,
          note: '何日ぐらい + かかりますか asks the rough duration politely.' },
        { ja: '何日？', kana: 'なんにち？', en: '"How many days?" (casual)', ok: false,
          why: 'A bare 何日？ is casual. Ask 何日ぐらいかかりますか。' },
        { ja: 'いつ着く？', kana: 'いつつく？', en: '"When does it arrive?" (casual)', ok: false,
          why: 'Plain 着く + casual tone. Ask 何日ぐらいかかりますか。' },
      ],
    },
    {
      npc: ['一週間ほどです。切手も必要ですか。', 'いっしゅうかんほどです。きってもひつようですか。'],
      npcEn: '"About a week. Do you need stamps too?"',
      stage: 'You also want some stamps.',
      options: [
        { ja: 'はい、八十円切手を三枚ください。', kana: 'はい、はちじゅうえんきってをさんまいください。', en: '"Yes, three 80-yen stamps, please."', ok: true,
          note: 'Stamps use the 〜枚 counter: 三枚 = three. Specify value + count + ください。' },
        { ja: '三個ください。', kana: 'さんこください。', en: '"Three (items), please."', ok: false,
          why: '〜個 is for objects; stamps take 〜枚 → 三枚ください。' },
        { ja: '切手ちょうだい。', kana: 'きってちょうだい。', en: '"Gimme stamps." (casual)', ok: false,
          why: 'ちょうだい is casual. Say 切手を〜枚ください。' },
      ],
    },
    {
      npc: ['ありがとうございました。', 'ありがとうございました。'],
      npcEn: '"Thank you very much."',
      stage: 'The transaction is complete.',
      options: [
        { ja: 'ありがとうございました。', kana: 'ありがとうございました。', en: '"Thank you."', ok: true,
          note: 'Echoing thanks at the end of a transaction is natural and polite.' },
        { ja: 'どうも。', kana: 'どうも。', en: '"Thanks."', ok: true,
          note: 'A lighter but fine close.' },
        { ja: 'うん。', kana: 'うん。', en: '"Yeah." (casual)', ok: false,
          why: 'うん is a casual grunt; say ありがとうございました。' },
      ],
    },
  ],
  outro:
    'You shipped abroad: 送りたいんですが to open, 航空便 for airmail, 何日ぐらいかかりますか for ' +
    'timing, and 〜枚 for stamps. The counter and the mail terms are the parts learners usually miss.',
};
