// src/conversation/taxi.js — Situational dialogue: taking a taxi.
// Authored offline content; shape mirrors conbini.js. Readings are pure kana.
export const TAXI = {
  id: 'conv-taxi-01',
  setting: 'タクシー',
  settingEn: 'Taking a taxi',
  emoji: '🚕',
  level: 4,
  register: 'polite',
  speaker: '運転手 · DRIVER',
  goal: 'Give your destination, ask how long, ask the driver to stop, and pay — politely (not by command).',
  intro:
    'You get in a taxi. Drivers are staff: state the destination with 〜までお願いします and make ' +
    'requests with 〜てください — never the bare imperative (止まれ).',
  turns: [
    {
      npc: ['どちらまで行かれますか。', 'どちらまでいかれますか。'],
      npcEn: '"Where to?" (行かれる = honorific "go")',
      stage: 'The driver pulls away from the curb.',
      options: [
        { ja: '東京駅までお願いします。', kana: 'とうきょうえきまでおねがいします。', en: '"To Tokyo Station, please."', ok: true,
          note: '〜まで (as far as) + お願いします states the destination politely.' },
        { ja: '東京駅行って。', kana: 'とうきょうえきいって。', en: '"Go to Tokyo Station." (casual)', ok: false,
          why: 'A casual command. Say 東京駅までお願いします。' },
        { ja: '東京駅。', kana: 'とうきょうえき。', en: '"Tokyo Station."', ok: false,
          why: 'A bare place name. Add までお願いします。' },
      ],
    },
    {
      npc: ['かしこまりました。お急ぎですか。', 'かしこまりました。おいそぎですか。'],
      npcEn: '"Certainly. Are you in a hurry?"',
      stage: 'The driver asks about your pace.',
      options: [
        { ja: 'はい、少し急いでいます。', kana: 'はい、すこしいそいでいます。', en: '"Yes, a little."', ok: true,
          note: '急いでいます ("I\'m hurrying") states it politely.' },
        { ja: 'いいえ、大丈夫です。', kana: 'いいえ、だいじょうぶです。', en: '"No, it\'s fine."', ok: true,
          note: 'Also natural — no rush.' },
        { ja: '急いで。', kana: 'いそいで。', en: '"Hurry up." (command)', ok: false,
          why: 'A bare command is rude. Say 少し急いでいます。' },
      ],
    },
    {
      npc: ['道が少し混んでいますね。', 'みちがすこしこんでいますね。'],
      npcEn: '"The roads are a bit busy."',
      stage: 'You want a rough time estimate.',
      options: [
        { ja: 'どのくらいかかりますか。', kana: 'どのくらいかかりますか。', en: '"About how long will it take?"', ok: true,
          note: 'どのくらいかかりますか asks the duration smoothly.' },
        { ja: '何分？', kana: 'なんぷん？', en: '"How many minutes?" (casual)', ok: false,
          why: 'Casual fragment. Ask どのくらいかかりますか。' },
        { ja: '早く。', kana: 'はやく。', en: '"Faster." (command)', ok: false,
          why: 'Bossy. Ask the time politely instead.' },
      ],
    },
    {
      npc: ['二十分ほどです。', 'にじゅっぷんほどです。'],
      npcEn: '"About twenty minutes."',
      stage: 'You spot your stop and want out here.',
      options: [
        { ja: 'あ、ここで停めてください。', kana: 'あ、ここでとめてください。', en: '"Oh, please stop here."', ok: true,
          note: '〜てください is the polite request to stop — 止まれ would be an order.' },
        { ja: 'ここ止まって。', kana: 'こことまって。', en: '"Stop here." (casual)', ok: false,
          why: 'Casual. Say ここで停めてください。' },
        { ja: '停まれ。', kana: 'とまれ。', en: '"Stop." (command)', ok: false,
          why: 'The imperative 停まれ is rude. Use 停めてください。' },
      ],
    },
    {
      npc: ['千二百円です。', 'せんにひゃくえんです。'],
      npcEn: '"That\'s 1,200 yen."',
      stage: 'You want to pay by card.',
      options: [
        { ja: 'カードで払えますか。', kana: 'かーどではらえますか。', en: '"Can I pay by card?"', ok: true,
          note: 'Potential 払える + ますか asks whether card payment is possible.' },
        { ja: '千二百円ね。', kana: 'せんにひゃくえんね。', en: '"1,200 yen, huh." (casual)', ok: false,
          why: 'Just repeating the price isn\'t paying. Ask カードで払えますか or hand over cash.' },
        { ja: 'お金。', kana: 'おかね。', en: '"Money."', ok: false,
          why: 'A bare noun. Say 現金で払います or カードで払えますか。' },
      ],
    },
    {
      npc: ['はい、ありがとうございました。', 'はい、ありがとうございました。'],
      npcEn: '"Thank you very much."',
      stage: 'You\'ve arrived and paid.',
      options: [
        { ja: 'ありがとうございました。', kana: 'ありがとうございました。', en: '"Thank you."', ok: true,
          note: 'A natural close to the ride.' },
        { ja: 'どうも。', kana: 'どうも。', en: '"Thanks."', ok: true,
          note: 'Lighter but fine.' },
        { ja: 'うん。', kana: 'うん。', en: '"Yeah." (casual)', ok: false,
          why: 'うん is a casual grunt; say ありがとうございました。' },
      ],
    },
  ],
  outro:
    'You rode like a local: 〜までお願いします for the destination, どのくらいかかりますか for time, ' +
    '停めてください to get out, and 払えますか to pay. Requests stay polite — never the imperative.',
};
