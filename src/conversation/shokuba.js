// src/conversation/shokuba.js — Situational dialogue: workplace (keigo-heavy).
// Authored offline content; shape mirrors conbini.js. Readings are pure kana.
export const SHOKUBA = {
  id: 'conv-shokuba-01',
  setting: '職場',
  settingEn: 'Workplace',
  emoji: '🏢',
  speaker: '上司・同僚 · WORK',
  level: 3,
  register: 'formal',
  goal: 'Greet, ask a senior a favor, acknowledge a task, report it done, and leave — in business keigo.',
  intro:
    'You\'re at the office, speaking with a senior (先輩) and your boss (上司). Register is high: ' +
    'plain forms and casual acknowledgements (わかった, 了解) sound wrong upward — keigo is expected.',
  turns: [
    {
      npc: ['おはようございます。', 'おはようございます。'],
      npcEn: '"Good morning." — your boss, as you arrive.',
      stage: 'You walk into the office in the morning.',
      options: [
        { ja: 'おはようございます。', kana: 'おはようございます。', en: '"Good morning."', ok: true,
          note: 'At work it\'s always the full おはようございます, to anyone — never the clipped おはよう upward.' },
        { ja: 'おはよう。', kana: 'おはよう。', en: '"Morning." (casual)', ok: false,
          why: 'おはよう is for close peers/family. To a boss, use おはようございます。' },
        { ja: 'こんにちは。', kana: 'こんにちは。', en: '"Hello."', ok: false,
          why: 'The first workplace greeting of the day is おはようございます, even past noon when you arrive.' },
      ],
    },
    {
      npc: ['はい、何でしょうか。', 'はい、なんでしょうか。'],
      npcEn: '"Yes, what is it?" — your boss turns to you.',
      stage: 'You need the boss to check a document.',
      options: [
        { ja: 'すみません、資料を確認していただけますか。', kana: 'すみません、しりょうをかくにんしていただけますか。', en: '"Sorry — could you check this document?"', ok: true,
          note: '〜ていただけますか is the polite "could you (for me)" request — ideal upward.' },
        { ja: 'これ見て。', kana: 'これみて。', en: '"Look at this." (casual)', ok: false,
          why: 'A bare 見て command is fine to a friend, never to a boss. Use 〜ていただけますか。' },
        { ja: '資料を確認しろ。', kana: 'しりょうをかくにんしろ。', en: '"Check the document." (command)', ok: false,
          why: 'しろ is a blunt imperative — ordering your boss. Soften to 確認していただけますか。' },
      ],
    },
    {
      npc: ['この件、お願いできますか。', 'このけん、おねがいできますか。'],
      npcEn: '"Can I ask you to handle this matter?"',
      stage: 'The boss assigns you a task.',
      options: [
        { ja: 'はい、承知しました。', kana: 'はい、しょうちしました。', en: '"Yes, understood."', ok: true,
          note: '承知しました (or かしこまりました) is the business way to accept a task from a superior.' },
        { ja: 'はい、了解です。', kana: 'はい、りょうかいです。', en: '"Yes, got it."', ok: false,
          why: '了解です is fine among peers but reads as too light upward. Use 承知しました。' },
        { ja: 'はい、わかった。', kana: 'はい、わかった。', en: '"Yeah, okay." (casual)', ok: false,
          why: 'Plain わかった is casual. To a boss: 承知しました or わかりました。' },
      ],
    },
    {
      npc: ['例の件、どうなりましたか。', 'れいのけん、どうなりましたか。'],
      npcEn: '"That matter — how did it go?"',
      stage: 'The boss asks for a status update; you finished it.',
      options: [
        { ja: 'はい、先ほど終わりました。', kana: 'はい、さきほどおわりました。', en: '"Yes, I finished it just now."', ok: true,
          note: '先ほど is the formal "a little while ago" — crisp business reporting.' },
        { ja: 'はい、終わりました。', kana: 'はい、おわりました。', en: '"Yes, it\'s done."', ok: true,
          note: 'Clear and polite — perfectly fine to report completion.' },
        { ja: 'もう終わったよ。', kana: 'もうおわったよ。', en: '"Already done." (casual + よ)', ok: false,
          why: 'Plain 終わった + よ is buddy talk. Report up with 終わりました。' },
      ],
    },
    {
      npc: ['今日もありがとう。助かったよ。', 'きょうもありがとう。たすかったよ。'],
      npcEn: '"Thanks again today — you really helped."',
      stage: 'The boss thanks you for your work.',
      options: [
        { ja: 'いえ、とんでもないです。', kana: 'いえ、とんでもないです。', en: '"Not at all."', ok: true,
          note: 'The humble, natural reply to thanks from a superior — deflects the praise modestly.' },
        { ja: 'どういたしまして。', kana: 'どういたしまして。', en: '"You\'re welcome."', ok: false,
          why: 'Textbook-correct but reads as slightly condescending downward; to a boss, とんでもないです is more natural.' },
        { ja: 'うん。', kana: 'うん。', en: '"Yeah." (casual)', ok: false,
          why: 'うん is a casual grunt — never an answer to a boss. Use いえ、とんでもないです。' },
      ],
    },
    {
      npc: ['お疲れ様です。', 'おつかれさまです。'],
      npcEn: '"Good work." — a colleague, still working, as you pack up.',
      stage: 'You\'re leaving for the day before your colleagues.',
      options: [
        { ja: 'お先に失礼します。', kana: 'おさきにしつれいします。', en: '"I\'ll be heading out ahead of you."', ok: true,
          note: 'THE set phrase for leaving the office before others — always use it.' },
        { ja: 'さようなら。', kana: 'さようなら。', en: '"Goodbye."', ok: false,
          why: 'Coworkers don\'t say さようなら leaving work — it sounds final/strange. Say お先に失礼します。' },
        { ja: 'バイバイ。', kana: 'ばいばい。', en: '"Bye-bye." (casual)', ok: false,
          why: 'バイバイ is for friends. In the office: お先に失礼します。' },
      ],
    },
  ],
  outro:
    'That\'s a full workday in keigo: 承知しました to accept, 先ほど終わりました to report, ' +
    'とんでもないです for thanks, and お先に失礼します to leave. Register upward is the whole game here.',
};
