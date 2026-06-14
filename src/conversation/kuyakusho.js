// src/conversation/kuyakusho.js — Situational dialogue: city/ward office (区役所).
// Authored offline content; shape mirrors conbini.js. Readings are pure kana.
export const KUYAKUSHO = {
  id: 'conv-kuyakusho-01',
  setting: '区役所',
  settingEn: 'Ward office',
  emoji: '🏛️',
  level: 3,
  register: 'polite',
  speaker: '職員 · CLERK',
  goal: 'File a moving-in notification: state your business, show ID, ask what to fill in, and finish up.',
  intro:
    'You\'re at the ward office to register a new address. Open with 〜たいんですが, ask "what should ' +
    'I write?" with 〜ばいい, and keep replies polite throughout.',
  turns: [
    {
      npc: ['次の方どうぞ。本日はどのようなご用件ですか。', 'つぎのかたどうぞ。ほんじつはどのようなごようけんですか。'],
      npcEn: '"Next, please. What can I help you with today?"',
      stage: 'Your number is called.',
      options: [
        { ja: '転入届を出したいんですが。', kana: 'てんにゅうとどけをだしたいんですが。', en: '"I\'d like to file a moving-in notification."', ok: true,
          note: '〜たいんですが states your errand and invites guidance.' },
        { ja: '引っ越してきた。', kana: 'ひっこしてきた。', en: '"I moved here." (casual)', ok: false,
          why: 'Casual and vague about the paperwork. Say 転入届を出したいんですが。' },
        { ja: '転入届。', kana: 'てんにゅうとどけ。', en: '"Moving-in form."', ok: false,
          why: 'A bare noun. Say 転入届を出したいんですが。' },
      ],
    },
    {
      npc: ['本人確認書類はお持ちですか。', 'ほんにんかくにんしょるいはおもちですか。'],
      npcEn: '"Do you have identity documents?"',
      stage: 'They need to verify who you are.',
      options: [
        { ja: 'はい、在留カードがあります。', kana: 'はい、ざいりゅうかーどがあります。', en: '"Yes, I have my residence card."', ok: true,
          note: 'Name the document — clear and helpful.' },
        { ja: 'はい、持っています。', kana: 'はい、もっています。', en: '"Yes, I have it."', ok: true,
          note: 'Also fine — the "have it on me" state.' },
        { ja: 'ない。', kana: 'ない。', en: '"Don\'t have it." (casual)', ok: false,
          why: 'Plain ない is casual; say 持っていません, or name what you do have.' },
      ],
    },
    {
      npc: ['こちらに前の住所をご記入ください。', 'こちらにまえのじゅうしょをごきにゅうください。'],
      npcEn: '"Please write your previous address here."',
      stage: 'You\'re unsure what one field wants.',
      options: [
        { ja: 'すみません、ここには何を書けばいいですか。', kana: 'すみません、ここにはなにをかけばいいですか。', en: '"What should I write here?"', ok: true,
          note: '〜ばいいですか asks for instructions naturally.' },
        { ja: 'ここ何書くの？', kana: 'ここなにかくの？', en: '"What do I write here?" (casual)', ok: false,
          why: 'Casual 〜の？. Ask ここには何を書けばいいですか。' },
        { ja: 'わからない。', kana: 'わからない。', en: '"I don\'t get it." (casual)', ok: false,
          why: 'Plain and vague. Ask specifically with 何を書けばいいですか。' },
      ],
    },
    {
      npc: ['マイナンバーカードは作りますか。', 'まいなんばーかーどはつくりますか。'],
      npcEn: '"Would you like to make a My Number card?"',
      stage: 'They offer an optional card.',
      options: [
        { ja: 'いいえ、今はけっこうです。', kana: 'いいえ、いまはけっこうです。', en: '"No, not right now."', ok: true,
          note: '今はけっこうです politely declines for now.' },
        { ja: 'はい、お願いします。', kana: 'はい、おねがいします。', en: '"Yes, please."', ok: true,
          note: 'Fine if you do want one.' },
        { ja: 'いらない。', kana: 'いらない。', en: '"Don\'t want it." (casual)', ok: false,
          why: 'Blunt. Say いいえ、今はけっこうです。' },
      ],
    },
    {
      npc: ['手続きは以上です。', 'てつづきはいじょうです。'],
      npcEn: '"That completes the procedure."',
      stage: 'Your registration is done.',
      options: [
        { ja: '助かりました。ありがとうございます。', kana: 'たすかりました。ありがとうございます。', en: '"That helped — thank you."', ok: true,
          note: '助かりました warmly thanks for the help.' },
        { ja: 'ありがとうございました。', kana: 'ありがとうございました。', en: '"Thank you."', ok: true,
          note: 'A clean, polite close.' },
        { ja: 'うん。', kana: 'うん。', en: '"Yeah." (casual)', ok: false,
          why: 'うん is a casual grunt; say ありがとうございました。' },
      ],
    },
  ],
  outro:
    'Bureaucracy handled: 出したいんですが to state your business, 何を書けばいいですか to ask for ' +
    'help, and 今はけっこうです to decline an extra. City-hall errands run on exactly these lines.',
};
