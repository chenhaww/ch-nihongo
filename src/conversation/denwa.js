// src/conversation/denwa.js — Situational dialogue: business phone call (keigo).
// Authored offline content; shape mirrors conbini.js. Readings are pure kana.
export const DENWA = {
  id: 'conv-denwa-01',
  setting: '電話',
  settingEn: 'Business phone call',
  emoji: '📞',
  speaker: '相手 · ON THE LINE',
  level: 3,
  register: 'formal',
  goal: 'Call a company in keigo: open properly, ask for someone, handle "they\'re out", and close politely.',
  intro:
    'You phone a company (you are the caller). Business phone Japanese is highly formal: open with ' +
    'お世話になっております, name yourself with 〜と申します, and use humble verbs (いたします).',
  turns: [
    {
      npc: ['はい、さくら商事でございます。', 'はい、さくらしょうじでございます。'],
      npcEn: '"Hello, this is Sakura Trading."',
      stage: 'The company picks up.',
      options: [
        { ja: 'お世話になっております。田中と申します。', kana: 'おせわになっております。たなかともうします。', en: '"Hello — this is Tanaka."', ok: true,
          note: 'The set business opener: お世話になっております + 〜と申します (humble "I\'m called…").' },
        { ja: '田中です。', kana: 'たなかです。', en: '"It\'s Tanaka."', ok: false,
          why: 'Polite but skips the business convention. Open with お世話になっております。〜と申します。' },
        { ja: 'もしもし、田中だけど。', kana: 'もしもし、たなかだけど。', en: '"Hello, it\'s Tanaka." (casual)', ok: false,
          why: 'もしもし + だけど is casual — not for a business call. Use お世話になっております。' },
      ],
    },
    {
      npc: ['いつもお世話になっております。', 'いつもおせわになっております。'],
      npcEn: '"Thank you for your continued business." (the standard return)',
      stage: 'You ask for the person you need.',
      options: [
        { ja: '営業部の佐藤様はいらっしゃいますか。', kana: 'えいぎょうぶのさとうさまはいらっしゃいますか。', en: '"Is Mr. Sato in sales available?"', ok: true,
          note: 'いらっしゃいますか is the honorific "is (he) there?" — correct for the other company\'s staff.' },
        { ja: '佐藤さんをお願いします。', kana: 'さとうさんをおねがいします。', en: '"Sato, please."', ok: true,
          note: 'Also natural and common — 〜をお願いします to ask to be put through.' },
        { ja: '佐藤さんいる？', kana: 'さとうさんいる？', en: '"Is Sato there?" (casual)', ok: false,
          why: 'Plain いる is casual. Use いらっしゃいますか or 〜をお願いします。' },
      ],
    },
    {
      npc: ['申し訳ございません。佐藤はただ今席を外しております。', 'もうしわけございません。さとうはただいませきをはずしております。'],
      npcEn: '"I\'m sorry, Sato is away from his desk." (note: own staff named without 様)',
      stage: 'The person you want is unavailable.',
      options: [
        { ja: 'それでは、また後でお電話します。', kana: 'それでは、またあとでおでんわします。', en: '"Then I\'ll call again later."', ok: true,
          note: 'A clean, polite plan to call back — お電話します keeps it courteous.' },
        { ja: '伝言をお願いできますか。', kana: 'でんごんをおねがいできますか。', en: '"Could you take a message?"', ok: true,
          note: 'Also natural — 〜をお願いできますか politely requests they take a message.' },
        { ja: 'じゃあいいや。', kana: 'じゃあいいや。', en: '"Eh, never mind." (casual)', ok: false,
          why: 'Casual and dismissive on a business call. Say また後でお電話します。' },
      ],
    },
    {
      npc: ['かしこまりました。何かお伝えしましょうか。', 'かしこまりました。なにかおつたえしましょうか。'],
      npcEn: '"Certainly. Shall I pass on a message?"',
      stage: 'You decide how to follow up.',
      options: [
        { ja: 'では、また改めてお電話いたします。', kana: 'では、またあらためておでんわいたします。', en: '"I\'ll call again another time."', ok: true,
          note: 'いたします is the humble "do" — 改めてお電話いたします is textbook-polite.' },
        { ja: '折り返しお電話いただけますか。', kana: 'おりかえしおでんわいただけますか。', en: '"Could he call me back?"', ok: true,
          note: 'Natural too — 折り返し = "call back"; 〜いただけますか politely requests it.' },
        { ja: '電話してって伝えて。', kana: 'でんわしてってつたえて。', en: '"Tell him to call." (casual)', ok: false,
          why: 'A casual command. Say 折り返しお電話いただけますか or お電話いたします。' },
      ],
    },
    {
      npc: ['承知いたしました。', 'しょうちいたしました。'],
      npcEn: '"Understood."',
      stage: 'You close the call.',
      options: [
        { ja: 'お忙しいところ失礼いたしました。', kana: 'おいそがしいところしつれいいたしました。', en: '"Sorry to trouble you."', ok: true,
          note: 'The polished phone close — acknowledges you took their time, then hangs up.' },
        { ja: '失礼いたします。', kana: 'しつれいいたします。', en: '"Goodbye." (polite)', ok: true,
          note: 'The standard humble way to end a call before hanging up.' },
        { ja: 'じゃあね。', kana: 'じゃあね。', en: '"See ya." (casual)', ok: false,
          why: 'じゃあね is for friends. End a business call with 失礼いたします。' },
      ],
    },
  ],
  outro:
    'A full keigo phone call: お世話になっております to open, 〜と申します to name yourself, ' +
    'いらっしゃいますか to ask for someone, and 失礼いたします to close. Business phone is peak keigo.',
};
