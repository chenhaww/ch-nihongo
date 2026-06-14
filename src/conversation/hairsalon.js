// src/conversation/hairsalon.js — Situational dialogue: hair salon (美容院).
// Authored offline content; shape mirrors conbini.js. Readings are pure kana.
export const SALON = {
  id: 'conv-salon-01',
  setting: '美容院',
  settingEn: 'Hair salon',
  emoji: '💇',
  level: 4,
  register: 'polite',
  speaker: '美容師 · STYLIST',
  goal: 'Get a haircut: ask for a cut, say how much to take off, handle bangs and shampoo, and react at the end.',
  intro:
    'You\'re at a salon. Make the request with 〜をお願いします, give amounts with a counter ' +
    '(センチ), and use 〜てください for specific instructions.',
  turns: [
    {
      npc: ['いらっしゃいませ。本日はどうなさいますか。', 'いらっしゃいませ。ほんじつはどうなさいますか。'],
      npcEn: '"Welcome. What are we doing today?"',
      stage: 'You sit down at the chair.',
      options: [
        { ja: 'カットをお願いします。', kana: 'かっとをおねがいします。', en: '"A cut, please."', ok: true,
          note: 'Name the service + お願いします — simple and clear.' },
        { ja: 'カット。', kana: 'かっと。', en: '"Cut."', ok: false,
          why: 'A bare word. Say カットをお願いします。' },
        { ja: '髪切って。', kana: 'かみきって。', en: '"Cut my hair." (casual)', ok: false,
          why: 'Casual 切って. Say カットをお願いします。' },
      ],
    },
    {
      npc: ['どのくらい切りますか。', 'どのくらいきりますか。'],
      npcEn: '"How much shall I take off?"',
      stage: 'You want just a trim.',
      options: [
        { ja: '三センチくらい切ってください。', kana: 'さんせんちくらいきってください。', en: '"About 3 cm, please."', ok: true,
          note: 'Amount + counter (センチ) + 切ってください gives a precise instruction.' },
        { ja: '少しだけお願いします。', kana: 'すこしだけおねがいします。', en: '"Just a little, please."', ok: true,
          note: 'Also natural — 少しだけ = "just a bit".' },
        { ja: '短く。', kana: 'みじかく。', en: '"Short." (fragment)', ok: false,
          why: 'Vague and bare. Say 短くしてください or give an amount.' },
      ],
    },
    {
      npc: ['前髪はどうしますか。', 'まえがみはどうしますか。'],
      npcEn: '"What about your bangs?"',
      stage: 'You\'d rather leave the bangs.',
      options: [
        { ja: '前髪はそのままでお願いします。', kana: 'まえがみはそのままでおねがいします。', en: '"Leave the bangs, please."', ok: true,
          note: 'そのままで = "as they are" — a tidy way to say "don\'t touch them".' },
        { ja: '前髪も少し切ってください。', kana: 'まえがみもすこしきってください。', en: '"Trim the bangs a little too."', ok: true,
          note: 'Also fine if you do want them trimmed.' },
        { ja: 'いい。', kana: 'いい。', en: '"Nah." (casual)', ok: false,
          why: 'Ambiguous and casual. Say そのままでお願いします。' },
      ],
    },
    {
      npc: ['シャンプーもなさいますか。', 'しゃんぷーもなさいますか。'],
      npcEn: '"Would you like a shampoo as well?"',
      stage: 'They offer a wash.',
      options: [
        { ja: 'はい、お願いします。', kana: 'はい、おねがいします。', en: '"Yes, please."', ok: true,
          note: 'Accept politely with お願いします。' },
        { ja: 'いいえ、けっこうです。', kana: 'いいえ、けっこうです。', en: '"No, thank you."', ok: true,
          note: 'けっこうです politely declines.' },
        { ja: 'いらない。', kana: 'いらない。', en: '"Don\'t want it." (casual)', ok: false,
          why: 'Blunt. Decline with いいえ、けっこうです。' },
      ],
    },
    {
      npc: ['いかがですか。', 'いかがですか。'],
      npcEn: '"How does it look?"',
      stage: 'They show you the finished cut.',
      options: [
        { ja: 'はい、ちょうどいいです。ありがとうございます。', kana: 'はい、ちょうどいいです。ありがとうございます。', en: '"Just right, thank you."', ok: true,
          note: 'ちょうどいい = "just right" — a warm, clear reaction + thanks.' },
        { ja: 'いい感じです。', kana: 'いいかんじです。', en: '"Looks good."', ok: true,
          note: 'Natural and friendly approval.' },
        { ja: '別に。', kana: 'べつに。', en: '"Whatever." (cold)', ok: false,
          why: '別に sounds indifferent or displeased. Say ちょうどいいです or いい感じです。' },
      ],
    },
  ],
  outro:
    'Salon sorted: カットをお願いします to start, an amount with センチ, そのままで for the bangs, ' +
    'and ちょうどいいです at the end. These let you get exactly the cut you want.',
};
