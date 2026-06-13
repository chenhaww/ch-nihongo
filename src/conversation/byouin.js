// src/conversation/byouin.js — Situational dialogue: clinic & pharmacy.
// Authored offline content; shape mirrors conbini.js. Readings are pure kana.
export const BYOUIN = {
  id: 'conv-byouin-01',
  setting: '病院・薬局',
  settingEn: 'Clinic & pharmacy',
  emoji: '🏥',
  level: 4,
  register: 'polite',
  goal: 'Check in, describe a symptom, answer the doctor, and take your medicine instructions — politely.',
  intro:
    'You feel unwell and visit a clinic, then the pharmacy. Describe symptoms in full sentences ' +
    '(〜んです explains your situation), and give numbers with their units (度 for temperature).',
  turns: [
    {
      npc: ['こんにちは。今日はどうされましたか。', 'こんにちは。きょうはどうされましたか。'],
      npcEn: '"Hello. What brings you in today?"',
      stage: 'The receptionist asks why you\'ve come.',
      options: [
        { ja: '昨日から熱があるんです。', kana: 'きのうからねつがあるんです。', en: '"I\'ve had a fever since yesterday."', ok: true,
          note: '〜んです explains your situation; 昨日から marks "since yesterday".' },
        { ja: '喉も痛いです。', kana: 'のどもいたいです。', en: '"My throat hurts too."', ok: true,
          note: 'A clear symptom report — 〜が痛いです is the pattern for "X hurts".' },
        { ja: '病気。', kana: 'びょうき。', en: '"Sick."', ok: false,
          why: 'Too vague and bare. Name the symptom: 熱があるんです / 喉が痛いです。' },
      ],
    },
    {
      npc: ['熱は何度ありますか。', 'ねつはなんどありますか。'],
      npcEn: '"What\'s your temperature?" (何度 = how many degrees)',
      stage: 'The nurse asks for your temperature.',
      options: [
        { ja: '三十八度ぐらいです。', kana: 'さんじゅうはちどぐらいです。', en: '"About 38 degrees."', ok: true,
          note: 'Give the number with its unit 度 and soften with ぐらい (about).' },
        { ja: '三十八。', kana: 'さんじゅうはち。', en: '"Thirty-eight."', ok: false,
          why: 'A bare number is ambiguous. Add the unit: 三十八度です。' },
        { ja: '高い。', kana: 'たかい。', en: '"High." (casual)', ok: false,
          why: 'Vague and plain. State the figure: 三十八度ぐらいです。' },
      ],
    },
    {
      npc: ['保険証はお持ちですか。', 'ほけんしょうはおもちですか。'],
      npcEn: '"Do you have your insurance card?"',
      stage: 'Reception needs your health-insurance card.',
      options: [
        { ja: 'はい、これです。', kana: 'はい、これです。', en: '"Yes, here it is."', ok: true,
          note: 'Natural while handing it over — これです = "here it is".' },
        { ja: 'はい、持っています。', kana: 'はい、もっています。', en: '"Yes, I have it."', ok: true,
          note: 'Also fine — 持っています is the "I have (it on me)" state.' },
        { ja: 'ない。', kana: 'ない。', en: '"Don\'t have it." (casual)', ok: false,
          why: 'Plain ない is too casual here; if you lack it say 持っていません, else はい、これです。' },
      ],
    },
    {
      npc: ['では、お薬を出しておきますね。', 'では、おくすりをだしておきますね。'],
      npcEn: '"Then I\'ll prescribe some medicine." (出しておく = prepare in advance — an N4 point!)',
      stage: 'The doctor will write a prescription.',
      options: [
        { ja: 'はい、お願いします。', kana: 'はい、おねがいします。', en: '"Yes, please."', ok: true,
          note: 'Politely accept the service with お願いします。' },
        { ja: 'ありがとうございます。', kana: 'ありがとうございます。', en: '"Thank you."', ok: true,
          note: 'Also natural — a simple thanks works.' },
        { ja: 'いらない。', kana: 'いらない。', en: '"Don\'t want it." (blunt)', ok: false,
          why: 'Blunt and casual, and you came for treatment. Accept with はい、お願いします。' },
      ],
    },
    {
      npc: ['この薬は一日三回、食後に飲んでください。', 'このくすりはいちにちさんかい、しょくごにのんでください。'],
      npcEn: '"Take this medicine three times a day, after meals."',
      stage: 'The pharmacist explains the dosage.',
      options: [
        { ja: '食後ですね。わかりました。', kana: 'しょくごですね。わかりました。', en: '"After meals, right? Understood."', ok: true,
          note: 'Confirming with 〜ですね then わかりました shows you caught the key instruction.' },
        { ja: 'はい、わかりました。', kana: 'はい、わかりました。', en: '"Yes, understood."', ok: true,
          note: 'Clear acknowledgement — perfectly polite.' },
        { ja: 'うん。', kana: 'うん。', en: '"Yeah." (casual)', ok: false,
          why: 'うん is a casual grunt; to a pharmacist say はい、わかりました。' },
      ],
    },
    {
      npc: ['お大事に。', 'おだいじに。'],
      npcEn: '"Take care / get well soon." — the set send-off to a patient.',
      stage: 'You\'re leaving the pharmacy.',
      options: [
        { ja: 'ありがとうございます。', kana: 'ありがとうございます。', en: '"Thank you."', ok: true,
          note: 'The standard reply to お大事に — you receive the well-wish with thanks.' },
        { ja: 'はい、どうも。', kana: 'はい、どうも。', en: '"Thanks."', ok: true,
          note: 'A lighter but fine response.' },
        { ja: 'お大事に。', kana: 'おだいじに。', en: '"Take care." (said back)', ok: false,
          why: 'お大事に is said TO the patient — echoing it back to staff is odd. Reply ありがとうございます。' },
      ],
    },
  ],
  outro:
    'You checked in, described symptoms with 〜んです, gave a temperature with its 度 unit, and ' +
    'confirmed dosage. ありがとうございます is the right answer to お大事に.',
};
