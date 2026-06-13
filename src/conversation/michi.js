// src/conversation/michi.js — Situational dialogue: asking for directions.
// Authored offline content; shape mirrors conbini.js. Readings are pure kana.
export const MICHI = {
  id: 'conv-michi-01',
  setting: '道を聞く',
  settingEn: 'Asking directions',
  emoji: '🗺️',
  speaker: '通行人 · STRANGER',
  level: 4,
  register: 'polite',
  goal: 'Stop a stranger politely, ask the way, confirm each step back, and thank them.',
  intro:
    'You\'re lost and stop a passerby. Open with すみません, keep it polite (they owe you nothing), ' +
    'and confirm directions back with 〜ですね so you don\'t mishear.',
  turns: [
    {
      npc: ['はい、何でしょう。', 'はい、なんでしょう。'],
      npcEn: '"Yes? What is it?" — the stranger stops for you.',
      stage: 'You\'ve said すみません and they\'ve turned around.',
      options: [
        { ja: 'すみません、駅はどこですか。', kana: 'すみません、えきはどこですか。', en: '"Excuse me, where\'s the station?"', ok: true,
          note: 'すみません + 〜はどこですか is the clean, polite way to ask a location.' },
        { ja: '駅どこ。', kana: 'えきどこ。', en: '"Where\'s the station?" (casual)', ok: false,
          why: 'Far too casual to a stranger. Ask すみません、駅はどこですか。' },
        { ja: '駅。', kana: 'えき。', en: '"Station."', ok: false,
          why: 'A single word isn\'t a question. Ask 駅はどこですか。' },
      ],
    },
    {
      npc: ['駅ですね。まっすぐ行ってください。', 'えきですね。まっすぐいってください。'],
      npcEn: '"The station? Go straight ahead."',
      stage: 'They start giving directions.',
      options: [
        { ja: 'はい、まっすぐですね。', kana: 'はい、まっすぐですね。', en: '"Straight ahead, right?"', ok: true,
          note: 'Confirming with 〜ですね keeps you in sync and invites the next step.' },
        { ja: 'わかった。', kana: 'わかった。', en: '"Got it." (casual)', ok: false,
          why: 'Plain わかった is casual; to a stranger say わかりました or confirm with 〜ですね。' },
        { ja: 'で？', kana: 'で？', en: '"And?" (impatient)', ok: false,
          why: 'で？ to rush someone helping you is rude. Confirm politely: はい、まっすぐですね。' },
      ],
    },
    {
      npc: ['そして、二つ目の角を右に曲がってください。', 'そして、ふたつめのかどをみぎにまがってください。'],
      npcEn: '"Then turn right at the second corner."',
      stage: 'They add the next step.',
      options: [
        { ja: '二つ目の角を右ですね。', kana: 'ふたつめのかどをみぎですね。', en: '"Right at the second corner, yes?"', ok: true,
          note: 'Read back the key detail (二つ目・右) with 〜ですね to lock it in.' },
        { ja: '右ね。', kana: 'みぎね。', en: '"Right, yeah." (casual)', ok: false,
          why: 'ね alone with a plain word is casual and drops the "second corner". Confirm fully and politely.' },
        { ja: '二つ目を右に曲がる。', kana: 'ふたつめをみぎにまがる。', en: '"Turn right at the second." (plain)', ok: false,
          why: 'Plain-form muttering. Confirm with the polite 〜ですね: 二つ目の角を右ですね。' },
      ],
    },
    {
      npc: ['はい。歩いて五分ぐらいです。', 'はい。あるいてごふんぐらいです。'],
      npcEn: '"Right. It\'s about a five-minute walk."',
      stage: 'They finish — you understand.',
      options: [
        { ja: 'わかりました。ありがとうございます。', kana: 'わかりました。ありがとうございます。', en: '"Understood. Thank you."', ok: true,
          note: 'Close the exchange: confirm understanding, then thank them.' },
        { ja: '五分か。', kana: 'ごふんか。', en: '"Five minutes, huh." (to yourself)', ok: false,
          why: 'Muttering to yourself ignores the person. Thank them: ありがとうございます。' },
        { ja: 'そう。', kana: 'そう。', en: '"I see." (casual)', ok: false,
          why: 'そう alone is a flat casual reaction. Say わかりました。ありがとうございます。' },
      ],
    },
    {
      npc: ['いえいえ、お気をつけて。', 'いえいえ、おきをつけて。'],
      npcEn: '"Not at all — take care." (お気をつけて = mind how you go)',
      stage: 'They send you off.',
      options: [
        { ja: 'はい、ありがとうございます。', kana: 'はい、ありがとうございます。', en: '"Thank you."', ok: true,
          note: 'Receive the well-wish with thanks — natural and warm.' },
        { ja: 'どうも。', kana: 'どうも。', en: '"Thanks."', ok: true,
          note: 'A light, fine close.' },
        { ja: 'お気をつけて。', kana: 'おきをつけて。', en: '"Take care." (said back)', ok: false,
          why: 'They\'re wishing YOU well as you head off; echoing it back is odd. Reply ありがとうございます。' },
      ],
    },
  ],
  outro:
    'You stopped a stranger politely, asked with 〜はどこですか, confirmed every step with 〜ですね, ' +
    'and thanked them — exactly how to get unlost without a map.',
};
