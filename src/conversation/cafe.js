// src/conversation/cafe.js — Situational dialogue: café order (BRANCHING).
// Demonstrates branching: turns have `id`, options carry `goto` (a turn id or
// 'end'). The "for here / to go" choice forks into two different endings.
// Readings are pure kana.
export const CAFE = {
  id: 'conv-cafe-01',
  setting: 'カフェ',
  settingEn: 'Café order',
  emoji: '☕',
  level: 4,
  register: 'polite',
  speaker: '店員 · BARISTA',
  goal: 'Order a coffee, pick a size, and choose for-here or to-go — the path changes with your choice.',
  intro:
    'You order at a café counter. This one BRANCHES: whether you drink in or take out leads to a ' +
    'different last exchange. Order with 〜をお願いします and keep it polite.',
  turns: [
    {
      id: 'order',
      npc: ['いらっしゃいませ。ご注文はお決まりですか。', 'いらっしゃいませ。ごちゅうもんはおきまりですか。'],
      npcEn: '"Welcome. Are you ready to order?"',
      stage: 'You reach the counter.',
      options: [
        { ja: 'ホットコーヒーを一つお願いします。', kana: 'ほっとこーひーをひとつおねがいします。', en: '"One hot coffee, please."', ok: true, goto: 'size',
          note: 'Item + counter (一つ) + お願いします — a clean order.' },
        { ja: 'アイスコーヒーを一つお願いします。', kana: 'あいすこーひーをひとつおねがいします。', en: '"One iced coffee, please."', ok: true, goto: 'size',
          note: 'Same clean pattern — just iced instead.' },
        { ja: 'コーヒー。', kana: 'こーひー。', en: '"Coffee." (curt)', ok: false,
          why: 'A bare noun is abrupt. Order with コーヒーを一つお願いします。' },
      ],
    },
    {
      id: 'size',
      npc: ['サイズはいかがなさいますか。', 'さいずはいかがなさいますか。'],
      npcEn: '"What size would you like?" (なさる = honorific "do")',
      stage: 'You pick a size.',
      options: [
        { ja: 'Mサイズでお願いします。', kana: 'えむさいずでおねがいします。', en: '"Medium, please."', ok: true, goto: 'where',
          note: 'Size + でお願いします selects it neatly.' },
        { ja: '一番小さいのをお願いします。', kana: 'いちばんちいさいのをおねがいします。', en: '"The smallest, please."', ok: true, goto: 'where',
          note: 'Natural too — 一番小さいの = "the smallest one".' },
        { ja: '大きいの。', kana: 'おおきいの。', en: '"A big one." (casual)', ok: false,
          why: 'Casual and bare. Say Lサイズでお願いします or 大きいのをお願いします。' },
      ],
    },
    {
      id: 'where',
      npc: ['店内でお召し上がりですか、お持ち帰りですか。', 'てんないでおめしあがりですか、おもちかえりですか。'],
      npcEn: '"For here, or to go?" (the fork — your answer changes what comes next)',
      stage: 'Decide where you\'ll drink it.',
      options: [
        { ja: '店内で。', kana: 'てんないで。', en: '"For here."', ok: true, goto: 'here',
          note: '店内で = "(I\'ll have it) in the store" — leads to seat service.' },
        { ja: '持ち帰りで。', kana: 'もちかえりで。', en: '"To go."', ok: true, goto: 'togo',
          note: '持ち帰りで = "to take out" — leads to the bag question.' },
        { ja: 'ここで食べる。', kana: 'ここでたべる。', en: '"I\'ll eat here." (casual)', ok: false, goto: 'here',
          why: 'Casual, and you drink coffee (飲む) — say 店内で。' },
      ],
    },
    {
      id: 'here',
      npc: ['かしこまりました。お席までお持ちします。', 'かしこまりました。おせきまでおもちします。'],
      npcEn: '"Certainly. We\'ll bring it to your table." (the for-here ending)',
      stage: 'You chose to stay — they\'ll serve you.',
      options: [
        { ja: 'ありがとうございます。', kana: 'ありがとうございます。', en: '"Thank you."', ok: true, goto: 'end',
          note: 'A clean close — your drink comes to the table.' },
        { ja: 'はい、お願いします。', kana: 'はい、おねがいします。', en: '"Yes, please."', ok: true, goto: 'end',
          note: 'Also fine while you head to a seat.' },
        { ja: 'うん。', kana: 'うん。', en: '"Yeah." (casual)', ok: false, goto: 'end',
          why: 'うん is a casual grunt; say ありがとうございます。' },
      ],
    },
    {
      id: 'togo',
      npc: ['かしこまりました。袋はご利用ですか。', 'かしこまりました。ふくろはごりようですか。'],
      npcEn: '"Certainly. Will you need a bag?" (the to-go ending)',
      stage: 'You chose takeout — they offer a bag.',
      options: [
        { ja: 'いえ、大丈夫です。', kana: 'いえ、だいじょうぶです。', en: '"No, I\'m fine."', ok: true, goto: 'end',
          note: 'The polite decline — 大丈夫です = no need.' },
        { ja: 'はい、お願いします。', kana: 'はい、おねがいします。', en: '"Yes, please."', ok: true, goto: 'end',
          note: 'Fine too if you do want one.' },
        { ja: 'いらない。', kana: 'いらない。', en: '"Don\'t need it." (blunt)', ok: false, goto: 'end',
          why: 'Blunt and casual. Decline with いえ、大丈夫です。' },
      ],
    },
  ],
  outro:
    'That one branched: 店内で sent you to seat service, 持ち帰りで to the bag question. Same opening, ' +
    'different ending — replay it and take the other path.',
};
