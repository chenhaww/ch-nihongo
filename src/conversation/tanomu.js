// src/conversation/tanomu.js — Situational dialogue: asking a friend a favor (casual).
// A register CONTRAST scenario: here the natural replies are casual, and the
// "off" options are over-formal keigo (too stiff for a friend) or rude commands.
// Authored offline content; readings are pure kana.
export const TANOMU = {
  id: 'conv-tanomu-01',
  setting: '友達に頼む',
  settingEn: 'Asking a friend a favor',
  emoji: '🤝',
  level: 4,
  register: 'casual',
  speaker: '友達 · FRIEND',
  goal: 'Ask a close friend a favor in natural casual Japanese — and notice when keigo is TOO formal.',
  intro:
    'You\'re talking with a close friend. Here the register flips: plain casual forms are right, ' +
    'and stiff keigo (ございます, いただけますか, 承知しました) sounds oddly distant. Commands are just rude.',
  turns: [
    {
      npc: ['どうしたの？', 'どうしたの？'],
      npcEn: '"What\'s up?"',
      stage: 'Your friend notices you want something.',
      options: [
        { ja: 'ちょっとお願いがあるんだけど。', kana: 'ちょっとおねがいがあるんだけど。', en: '"I\'ve got a small favor to ask…"', ok: true,
          note: '〜んだけど softly opens a request among friends — casual and natural.' },
        { ja: 'お願いがございます。', kana: 'おねがいがございます。', en: '"I have a request." (keigo)', ok: false,
          why: 'ございます is business keigo — bizarrely stiff to a friend. Say お願いがあるんだけど。' },
        { ja: '手伝え。', kana: 'てつだえ。', en: '"Help me." (command)', ok: false,
          why: 'The imperative 手伝え is an order — rude even to friends. Ask, don\'t command.' },
      ],
    },
    {
      npc: ['いいよ、何？', 'いいよ、なに？'],
      npcEn: '"Sure, what is it?"',
      stage: 'You want to borrow their notes.',
      options: [
        { ja: 'ノート貸してくれない？', kana: 'のーとかしてくれない？', en: '"Could you lend me your notes?"', ok: true,
          note: '〜てくれない？ is the friendly "could you…?" — a soft casual request (giving/receiving).' },
        { ja: 'ノートを貸していただけますか。', kana: 'のーとをかしていただけますか。', en: '"Could you lend me your notes?" (keigo)', ok: false,
          why: 'いただけますか is super-polite — too formal for a friend. Use 貸してくれない？' },
        { ja: 'ノート貸せ。', kana: 'のーとかせ。', en: '"Lend me your notes." (command)', ok: false,
          why: '貸せ is a blunt order. Ask with 貸してくれない？' },
      ],
    },
    {
      npc: ['いいよ。明日でいい？', 'いいよ。あしたでいい？', ],
      npcEn: '"Sure. Is tomorrow okay?"',
      stage: 'They agreed — you thank them.',
      options: [
        { ja: 'うん、ありがとう！助かる！', kana: 'うん、ありがとう！たすかる！', en: '"Yeah, thanks — that helps!"', ok: true,
          note: '助かる ("that saves me") is the warm, casual way to thank a friend for a favor.' },
        { ja: 'はい、ありがとうございます。', kana: 'はい、ありがとうございます。', en: '"Yes, thank you." (formal)', ok: false,
          why: 'Not wrong, but to a close friend the keigo sounds distant. うん、ありがとう！is warmer.' },
        { ja: '当然。', kana: 'とうぜん。', en: '"Obviously." (entitled)', ok: false,
          why: 'Sounds entitled, as if they owed you. Show warmth: ありがとう！助かる！' },
      ],
    },
    {
      npc: ['あ、そういえば、来週ひま？', 'あ、そういえば、らいしゅうひま？'],
      npcEn: '"Oh, by the way — are you free next week?"',
      stage: 'Your friend has something to ask you now.',
      options: [
        { ja: 'うん、ひまだよ。どうしたの？', kana: 'うん、ひまだよ。どうしたの？', en: '"Yeah, I\'m free. What\'s up?"', ok: true,
          note: 'Natural casual back-and-forth — answer + a friendly どうしたの？' },
        { ja: 'はい、暇でございます。', kana: 'はい、ひまでございます。', en: '"Yes, I am free." (keigo)', ok: false,
          why: '暇でございます to a friend is comically formal. Just say ひまだよ。' },
        { ja: '知らない。', kana: 'しらない。', en: '"Dunno." (dismissive)', ok: false,
          why: 'Cold and unhelpful. Engage: ひまだよ。どうしたの？' },
      ],
    },
    {
      npc: ['引っ越し手伝ってくれる？', 'ひっこしてつだってくれる？'],
      npcEn: '"Could you help me move?"',
      stage: 'Your friend asks you for a favor in return.',
      options: [
        { ja: 'うん、もちろん！', kana: 'うん、もちろん！', en: '"Yeah, of course!"', ok: true,
          note: 'Warm and easy — もちろん gladly accepts a friend\'s request.' },
        { ja: '承知しました。', kana: 'しょうちしました。', en: '"Understood." (business keigo)', ok: false,
          why: '承知しました is for a boss/client — robotic between friends. Say うん、もちろん！' },
        { ja: '無理。', kana: 'むり。', en: '"No way." (blunt)', ok: false,
          why: 'Even when declining, bare 無理 is cold. Soften: ごめん、その日はちょっと…。' },
      ],
    },
  ],
  outro:
    'Register works both ways: among friends, casual is correct and keigo feels cold. お願いがあるんだ' +
    'けど, 貸してくれない？, 助かる, もちろん — this is how you actually talk with people close to you.',
};
