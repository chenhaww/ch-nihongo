// src/conversation/kaimono.js — Situational dialogue: shopping (clothing store).
// Authored offline content; shape mirrors conbini.js. Readings are pure kana.
export const KAIMONO = {
  id: 'conv-kaimono-01',
  setting: '買い物',
  settingEn: 'Shopping (clothes)',
  emoji: '🛍️',
  level: 4,
  register: 'polite',
  goal: 'Find a shirt, ask to try it on, request a smaller size, check the price, and buy it — politely.',
  intro:
    'You\'re in a clothing shop. Staff use keigo; you reply in plain polite Japanese. Ask permission ' +
    'with 〜てもいいですか, request alternatives with 〜のはありますか, and keep size words polite.',
  turns: [
    {
      npc: ['いらっしゃいませ。何かお探しですか。', 'いらっしゃいませ。なにかおさがしですか。'],
      npcEn: '"Welcome. Are you looking for something?"',
      stage: 'A clerk approaches as you browse.',
      options: [
        { ja: 'すみません、シャツを探しているんです。', kana: 'すみません、しゃつをさがしているんです。', en: '"I\'m looking for a shirt."', ok: true,
          note: '〜を探しているんです explains what you\'re after — the 〜んです gives a natural "you see" tone.' },
        { ja: '見ているだけです。', kana: 'みているだけです。', en: '"Just looking, thanks."', ok: true,
          note: 'The polite way to wave off help — 〜だけです = "only ~". (見てる without い is the casual slip.)' },
        { ja: '見てるだけ。', kana: 'みてるだけ。', en: '"Just looking." (casual)', ok: false,
          why: 'Drops both い and です — too casual to staff. Say 見ているだけです。' },
      ],
    },
    {
      npc: ['こちらはいかがですか。', 'こちらはいかがですか。'],
      npcEn: '"How about this one?"',
      stage: 'The clerk shows you a shirt; you want to try it on.',
      options: [
        { ja: '試着してもいいですか。', kana: 'しちゃくしてもいいですか。', en: '"May I try it on?"', ok: true,
          note: '試着 (trying on) + 〜てもいいですか asks permission — the exact N4 pattern.' },
        { ja: 'これ着ていい？', kana: 'これきていい？', en: '"Can I wear this?" (casual)', ok: false,
          why: 'Casual drop of です and uses 着る ("wear") oddly here. Ask 試着してもいいですか。' },
        { ja: '着る。', kana: 'きる。', en: '"I\'ll wear it." (plain)', ok: false,
          why: 'A bare verb isn\'t a request. Ask permission: 試着してもいいですか。' },
      ],
    },
    {
      npc: ['サイズはいかがですか。', 'さいずはいかがですか。'],
      npcEn: '"How\'s the size?"',
      stage: 'It\'s a little big — you want a smaller one.',
      options: [
        { ja: '少し大きいです。もっと小さいのはありますか。', kana: 'すこしおおきいです。もっとちいさいのはありますか。', en: '"A bit big. Do you have a smaller one?"', ok: true,
          note: 'State it politely, then 〜のはありますか asks for a different one ("a smaller one").' },
        { ja: 'でかい。', kana: 'でかい。', en: '"Huge." (slang)', ok: false,
          why: 'でかい is rough slang. Say 少し大きいです and ask もっと小さいのはありますか。' },
        { ja: '大きい。', kana: 'おおきい。', en: '"Big."', ok: false,
          why: 'A bare adjective is abrupt. Add です and request a size: 大きいです。小さいのはありますか。' },
      ],
    },
    {
      npc: ['では、こちらのMサイズはいかがでしょう。', 'では、こちらのえむさいずはいかがでしょう。'],
      npcEn: '"Then how about this size M?"',
      stage: 'It fits — you want to know the price.',
      options: [
        { ja: 'これはいくらですか。', kana: 'これはいくらですか。', en: '"How much is this?"', ok: true,
          note: '〜はいくらですか is the clean way to ask a price.' },
        { ja: '値段は？', kana: 'ねだんは？', en: '"Price?" (casual fragment)', ok: false,
          why: 'Trailing 〜は？ is casual and abrupt. Ask これはいくらですか。' },
        { ja: '高い？', kana: 'たかい？', en: '"Expensive?" (casual)', ok: false,
          why: 'Casual and doesn\'t actually ask the price. Say これはいくらですか。' },
      ],
    },
    {
      npc: ['三千円です。', 'さんぜんえんです。'],
      npcEn: '"That\'s 3,000 yen."',
      stage: 'You decide to buy it.',
      options: [
        { ja: 'じゃあ、これをください。', kana: 'じゃあ、これをください。', en: '"I\'ll take this, then."', ok: true,
          note: 'これをください is the standard "I\'ll take this" at the point of buying.' },
        { ja: 'これにします。', kana: 'これにします。', en: '"I\'ll go with this."', ok: true,
          note: 'Also natural — 〜にします signals your decision.' },
        { ja: '買う。', kana: 'かう。', en: '"I\'ll buy it." (plain)', ok: false,
          why: 'Plain 買う is casual self-talk. To staff: これをください or これにします。' },
      ],
    },
    {
      npc: ['ありがとうございます。お会計はあちらです。', 'ありがとうございます。おかいけいはあちらです。'],
      npcEn: '"Thank you. The register is over there."',
      stage: 'The clerk directs you to pay.',
      options: [
        { ja: 'はい、ありがとうございます。', kana: 'はい、ありがとうございます。', en: '"Okay, thank you."', ok: true,
          note: 'Acknowledge and thank — smooth and polite.' },
        { ja: 'どうも。', kana: 'どうも。', en: '"Thanks."', ok: true,
          note: 'A lighter but fine close.' },
        { ja: 'うん。', kana: 'うん。', en: '"Yeah." (casual)', ok: false,
          why: 'うん is a casual grunt; to staff say はい、ありがとうございます。' },
      ],
    },
  ],
  outro:
    'A full shopping run: 探しているんです to say what you want, 試着してもいいですか for permission, ' +
    '小さいのはありますか for another size, いくらですか for the price, and これをください to buy.',
};
