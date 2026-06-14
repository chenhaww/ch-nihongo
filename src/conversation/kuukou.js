// src/conversation/kuukou.js — Situational dialogue: airport check-in.
// Authored offline content; shape mirrors conbini.js. Readings are pure kana.
export const KUUKOU = {
  id: 'conv-kuukou-01',
  setting: '空港',
  settingEn: 'Airport check-in',
  emoji: '✈️',
  level: 4,
  register: 'polite',
  speaker: '係員 · AGENT',
  goal: 'Check in for a flight: hand over your passport, check a bag, pick a seat, and ask the boarding time.',
  intro:
    'You\'re at the airline counter. Use どうぞ when handing something over, the right counters, and ' +
    'keep requests polite (〜をお願いします).',
  turns: [
    {
      npc: ['次のお客様、どうぞ。パスポートを拝見します。', 'つぎのおきゃくさま、どうぞ。ぱすぽーとをはいけんします。'],
      npcEn: '"Next, please. May I see your passport?" (拝見します = humble "look at")',
      stage: 'You reach the check-in desk.',
      options: [
        { ja: 'はい、どうぞ。', kana: 'はい、どうぞ。', en: '"Here you are."', ok: true,
          note: 'どうぞ is exactly what you say while handing something over.' },
        { ja: 'はい、お願いします。', kana: 'はい、おねがいします。', en: '"Yes, please."', ok: true,
          note: 'Also fine as you pass it across.' },
        { ja: 'これ。', kana: 'これ。', en: '"This." (curt)', ok: false,
          why: 'A bare これ is abrupt. Hand it over with はい、どうぞ。' },
      ],
    },
    {
      npc: ['お預けのお荷物はございますか。', 'おあずけのおにもつはございますか。'],
      npcEn: '"Do you have any bags to check?"',
      stage: 'You have one suitcase to check.',
      options: [
        { ja: 'はい、一つあります。', kana: 'はい、ひとつあります。', en: '"Yes, one."', ok: true,
          note: '一つ (ひとつ) counts the bag; あります states it exists.' },
        { ja: 'いいえ、ありません。', kana: 'いいえ、ありません。', en: '"No, none."', ok: true,
          note: 'Also natural if you\'re carrying everything on.' },
        { ja: '荷物ある。', kana: 'にもつある。', en: '"Got luggage." (casual)', ok: false,
          why: 'Plain ある is casual. Say はい、一つあります。' },
      ],
    },
    {
      npc: ['お席のご希望はございますか。', 'おせきのごきぼうはございますか。'],
      npcEn: '"Do you have a seat preference?"',
      stage: 'You\'d like a window seat.',
      options: [
        { ja: '窓側の席をお願いします。', kana: 'まどがわのせきをおねがいします。', en: '"A window seat, please."', ok: true,
          note: '窓側 = window side; 〜をお願いします makes the polite request.' },
        { ja: '窓がいい。', kana: 'まどがいい。', en: '"Window\'s good." (casual)', ok: false,
          why: 'Casual. Say 窓側の席をお願いします。' },
        { ja: '窓。', kana: 'まど。', en: '"Window."', ok: false,
          why: 'A bare noun. Ask 窓側の席をお願いします。' },
      ],
    },
    {
      npc: ['搭乗口は十二番です。', 'とうじょうぐちはじゅうにばんです。'],
      npcEn: '"Your boarding gate is number 12."',
      stage: 'You want to know when boarding starts.',
      options: [
        { ja: '搭乗は何時からですか。', kana: 'とうじょうはなんじからですか。', en: '"What time does boarding start?"', ok: true,
          note: '〜は何時からですか asks the start time politely.' },
        { ja: '何時？', kana: 'なんじ？', en: '"What time?" (casual)', ok: false,
          why: 'A bare 何時？ is casual. Ask 搭乗は何時からですか。' },
        { ja: 'いつ乗る？', kana: 'いつのる？', en: '"When do I board?" (casual)', ok: false,
          why: 'Plain 乗る + casual tone. Ask 搭乗は何時からですか。' },
      ],
    },
    {
      npc: ['午後三時からです。', 'ごごさんじからです。'],
      npcEn: '"From 3 p.m."',
      stage: 'You\'re all checked in.',
      options: [
        { ja: 'ありがとうございます。', kana: 'ありがとうございます。', en: '"Thank you."', ok: true,
          note: 'A clean, polite close.' },
        { ja: 'どうも。', kana: 'どうも。', en: '"Thanks."', ok: true,
          note: 'A lighter but fine sign-off.' },
        { ja: 'はい。', kana: 'はい。', en: '"Yes."', ok: false,
          why: '"はい" alone doesn\'t thank. Say ありがとうございます。' },
      ],
    },
  ],
  outro:
    'Checked in smoothly: どうぞ to hand over your passport, 一つあります with the counter, a 窓側 ' +
    'seat request, and 何時からですか for boarding. These work at any airline counter.',
};
