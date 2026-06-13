// src/conversation/ginkou.js — Situational dialogue: bank (opening an account).
// Authored offline content; shape mirrors conbini.js. Readings are pure kana.
export const GINKOU = {
  id: 'conv-ginkou-01',
  setting: '銀行',
  settingEn: 'Bank',
  emoji: '🏦',
  level: 3,
  register: 'polite',
  speaker: '行員 · TELLER',
  goal: 'Open a bank account: state your purpose, show ID, ask what to fill in, and confirm kanji is okay.',
  intro:
    'You\'re opening an account. Open a request with 〜たいんですが, ask "what should I…" with the ' +
    '〜ばいい conditional, and check permission with 〜てもいいですか.',
  turns: [
    {
      npc: ['いらっしゃいませ。本日はどのようなご用件でしょうか。', 'いらっしゃいませ。ほんじつはどのようなごようけんでしょうか。'],
      npcEn: '"Welcome. What can I help you with today?"',
      stage: 'You step up to the teller window.',
      options: [
        { ja: '口座を開きたいんですが。', kana: 'こうざをひらきたいんですが。', en: '"I\'d like to open an account."', ok: true,
          note: '〜たいんですが softly states your purpose and invites guidance.' },
        { ja: '口座作る。', kana: 'こうざつくる。', en: '"Make an account." (casual)', ok: false,
          why: 'Plain 作る is casual. Say 口座を開きたいんですが。' },
        { ja: '口座。', kana: 'こうざ。', en: '"Account."', ok: false,
          why: 'A bare noun. Say 口座を開きたいんですが。' },
      ],
    },
    {
      npc: ['身分証明書はお持ちですか。', 'みぶんしょうめいしょはおもちですか。'],
      npcEn: '"Do you have photo ID?"',
      stage: 'You have your residence card.',
      options: [
        { ja: 'はい、在留カードがあります。', kana: 'はい、ざいりゅうかーどがあります。', en: '"Yes, I have my residence card."', ok: true,
          note: 'Name the document you have — clear and helpful.' },
        { ja: 'はい、持っています。', kana: 'はい、もっています。', en: '"Yes, I have it."', ok: true,
          note: 'Also fine — 持っています is the "have it on me" state.' },
        { ja: 'ない。', kana: 'ない。', en: '"Don\'t have it." (casual)', ok: false,
          why: 'Plain ない is casual; if you lack it say 持っていません, else name your ID.' },
      ],
    },
    {
      npc: ['こちらの用紙にご記入ください。', 'こちらのようしにごきにゅうください。'],
      npcEn: '"Please fill out this form."',
      stage: 'You\'re unsure what goes in a field.',
      options: [
        { ja: 'すみません、ここに何を書けばいいですか。', kana: 'すみません、ここになにをかけばいいですか。', en: '"What should I write here?"', ok: true,
          note: '〜ばいいですか ("what should I…?") is the natural way to ask for instructions.' },
        { ja: 'ここ何？', kana: 'ここなに？', en: '"What\'s this?" (casual)', ok: false,
          why: 'Casual fragment. Ask ここに何を書けばいいですか。' },
        { ja: 'わからない。', kana: 'わからない。', en: '"I don\'t get it." (casual)', ok: false,
          why: 'Plain and vague. Ask specifically: ここに何を書けばいいですか。' },
      ],
    },
    {
      npc: ['お名前とご住所をお願いします。', 'おなまえとごじゅうしょをおねがいします。'],
      npcEn: '"Your name and address, please."',
      stage: 'You want to check whether kanji is acceptable.',
      options: [
        { ja: '漢字でもいいですか。', kana: 'かんじでもいいですか。', en: '"Is kanji okay?"', ok: true,
          note: '〜でもいいですか checks permission for a format — polite and to the point.' },
        { ja: 'ローマ字で書く。', kana: 'ろーまじでかく。', en: '"I\'ll write in romaji." (casual)', ok: false,
          why: 'Plain 書く is casual, and better to ask first. Say ローマ字でもいいですか。' },
        { ja: '英語？', kana: 'えいご？', en: '"English?"', ok: false,
          why: 'A bare word isn\'t a question. Ask 英語でもいいですか。' },
      ],
    },
    {
      npc: ['はい、結構です。キャッシュカードは一週間後に届きます。', 'はい、けっこうです。きゃっしゅかーどはいっしゅうかんごにとどきます。'],
      npcEn: '"That\'s fine. Your cash card will arrive in a week."',
      stage: 'The account is set up.',
      options: [
        { ja: 'わかりました。ありがとうございます。', kana: 'わかりました。ありがとうございます。', en: '"Understood. Thank you."', ok: true,
          note: 'Confirm and thank — a clean close.' },
        { ja: 'どうも。', kana: 'どうも。', en: '"Thanks."', ok: true,
          note: 'Lighter but acceptable.' },
        { ja: 'うん。', kana: 'うん。', en: '"Yeah." (casual)', ok: false,
          why: 'うん is a casual grunt; say わかりました。ありがとうございます。' },
      ],
    },
  ],
  outro:
    'Account opened: 開きたいんですが to state your aim, 何を書けばいいですか to ask for help, and ' +
    '漢字でもいいですか to check format. The 〜ばいい and 〜てもいい patterns carry a lot of real errands.',
};
