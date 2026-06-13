// src/conversation/resto.js — Situational dialogue: restaurant.
// Authored offline content; shape mirrors conbini.js. Readings are pure kana.
export const RESTO = {
  id: 'conv-resto-01',
  setting: 'レストラン',
  settingEn: 'Restaurant',
  emoji: '🍜',
  level: 4,
  register: 'polite',
  goal: 'Be seated, order a dish (and ask what one is), then ask for the check — in polite register.',
  intro:
    'You walk into a restaurant for two. Staff use keigo; you reply in plain polite Japanese. ' +
    'Watch the counters (people vs things) and keep requests in 〜をお願いします shape.',
  turns: [
    {
      npc: ['いらっしゃいませ。何名様ですか。', 'いらっしゃいませ。なんめいさまですか。'],
      npcEn: '"Welcome. How many people?" (名様 = polite counter for guests)',
      stage: 'The host greets you at the door.',
      options: [
        { ja: '二人です。', kana: 'ふたりです。', en: '"Two."', ok: true,
          note: 'Natural — people are counted with 〜人 (ふたり for two).' },
        { ja: '二つです。', kana: 'ふたつです。', en: '"Two (things)."', ok: false,
          why: '〜つ counts objects, not people. For people use 〜人 → 二人(ふたり)です。' },
        { ja: '二名様です。', kana: 'にめいさまです。', en: '"Two guests." (with 様)', ok: false,
          why: '様 is an honorific for OTHERS — don\'t attach it to yourself. Just 二人です。' },
      ],
    },
    {
      npc: ['お飲み物はいかがですか。', 'おのみものはいかがですか。'],
      npcEn: '"How about something to drink?"',
      stage: 'Seated, you\'re asked about drinks.',
      options: [
        { ja: 'お水をください。', kana: 'おみずをください。', en: '"Water, please."', ok: true,
          note: 'Clean request: noun + を + ください。' },
        { ja: 'とりあえずビールで。', kana: 'とりあえずびーるで。', en: '"A beer for now."', ok: true,
          note: 'Very natural in a casual eatery — とりあえず…で is the set "to start with" phrase.' },
        { ja: '水。', kana: 'みず。', en: '"Water."', ok: false,
          why: 'A bare noun is abrupt. Add をください or で(お願いします): お水をください。' },
      ],
    },
    {
      npc: ['ご注文はお決まりですか。', 'ごちゅうもんはおきまりですか。'],
      npcEn: '"Are you ready to order?"',
      stage: 'You see something on the menu you don\'t recognize.',
      options: [
        { ja: 'すみません、これは何ですか。', kana: 'すみません、これはなんですか。', en: '"Excuse me, what is this?"', ok: true,
          note: 'Polite way to ask about a menu item — すみません softens the question.' },
        { ja: 'おすすめは何ですか。', kana: 'おすすめはなんですか。', en: '"What do you recommend?"', ok: true,
          note: 'A great natural move — おすすめ asks for the staff\'s recommendation.' },
        { ja: '何これ。', kana: 'なにこれ。', en: '"What\'s this?" (blunt)', ok: false,
          why: '何これ is casual muttering to yourself, not how you address staff. Use これは何ですか。' },
      ],
    },
    {
      npc: ['お決まりになりましたか。', 'おきまりになりましたか。'],
      npcEn: '"Have you decided?"',
      stage: 'You point at the dish you want.',
      options: [
        { ja: 'これをお願いします。', kana: 'これをおねがいします。', en: '"This one, please."', ok: true,
          note: 'The default polite order: これを + お願いします。' },
        { ja: 'これにします。', kana: 'これにします。', en: '"I\'ll have this."', ok: true,
          note: 'Also natural — 〜にします = "I\'ll go with ~", a decisive choice.' },
        { ja: 'これ食べる。', kana: 'これたべる。', en: '"I\'ll eat this." (plain)', ok: false,
          why: 'Plain 食べる is too casual to staff. Order with これをお願いします or これにします。' },
      ],
    },
    {
      npc: ['はい、何でしょうか。', 'はい、なんでしょうか。'],
      npcEn: '"Yes, what can I do?" — you\'ve raised your hand after the meal.',
      stage: 'You\'re done and want the bill.',
      options: [
        { ja: 'お会計をお願いします。', kana: 'おかいけいをおねがいします。', en: '"The check, please."', ok: true,
          note: 'Standard — お会計 (or お勘定) + お願いします asks for the bill.' },
        { ja: 'お勘定お願いします。', kana: 'おかんじょうおねがいします。', en: '"The bill, please."', ok: true,
          note: 'Also natural; お勘定 is a touch more old-school but perfectly polite.' },
        { ja: 'お金払う。', kana: 'おかねはらう。', en: '"I\'ll pay." (plain)', ok: false,
          why: 'States the obvious in casual form. Ask for the bill: お会計をお願いします。' },
      ],
    },
    {
      npc: ['ありがとうございました。', 'ありがとうございました。'],
      npcEn: '"Thank you very much." — as you leave.',
      stage: 'You head for the door.',
      options: [
        { ja: 'ごちそうさまでした。', kana: 'ごちそうさまでした。', en: '"Thanks for the meal."', ok: true,
          note: 'The natural thing to say leaving an eatery — acknowledges the food.' },
        { ja: 'どうも。', kana: 'どうも。', en: '"Thanks."', ok: true,
          note: 'A light, fine sign-off on its own.' },
        { ja: 'さようなら。', kana: 'さようなら。', en: '"Goodbye."', ok: false,
          why: 'さようなら is a weighty farewell — odd to staff. ごちそうさまでした or どうも fits.' },
      ],
    },
  ],
  outro:
    'Nicely done — seated, ordered, asked about a dish, and settled up, all in polite register. ' +
    'ごちそうさまでした is the phrase that marks you as someone who eats out in Japan.',
};
