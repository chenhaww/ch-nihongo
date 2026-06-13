// src/conversation/hotel.js — Situational dialogue: hotel check-in.
// Authored offline content; shape mirrors conbini.js. Readings are pure kana.
export const HOTEL = {
  id: 'conv-hotel-01',
  setting: 'ホテル',
  settingEn: 'Hotel check-in',
  emoji: '🏨',
  level: 4,
  register: 'polite',
  goal: 'Check in under your reservation, give the number of nights, sort breakfast, ask about wifi and checkout.',
  intro:
    'You arrive at a hotel front desk. Staff use polished keigo; you reply in plain polite Japanese. ' +
    'Watch the counter for nights (〜泊), and use the potential form to ask what you can do.',
  turns: [
    {
      npc: ['いらっしゃいませ。ご予約はございますか。', 'いらっしゃいませ。ごよやくはございますか。'],
      npcEn: '"Welcome. Do you have a reservation?"',
      stage: 'You step up to the front desk.',
      options: [
        { ja: 'はい、予約しています。田中です。', kana: 'はい、よやくしています。たなかです。', en: '"Yes, I have a reservation. Tanaka."', ok: true,
          note: 'Confirm + give the booking name — exactly what the desk needs.' },
        { ja: 'はい、予約してる。', kana: 'はい、よやくしてる。', en: '"Yeah, I booked." (casual)', ok: false,
          why: 'Drops the い (してる) — casual. Say 予約しています and give your name.' },
        { ja: '予約。', kana: 'よやく。', en: '"Reservation."', ok: false,
          why: 'A bare noun. Say はい、予約しています。〜です with your name.' },
      ],
    },
    {
      npc: ['田中様ですね。お泊まりは何泊ですか。', 'たなかさまですね。おとまりはなんぱくですか。'],
      npcEn: '"Mr./Ms. Tanaka. How many nights?" (何泊 = how many nights)',
      stage: 'The clerk confirms your stay length.',
      options: [
        { ja: '二泊です。', kana: 'にはくです。', en: '"Two nights."', ok: true,
          note: 'Nights are counted with 〜泊(はく): 二泊 = two nights.' },
        { ja: '二日。', kana: 'ふつか。', en: '"Two days."', ok: false,
          why: '二日 counts days, not nights. For a stay use 〜泊 → 二泊です。' },
        { ja: '二個。', kana: 'にこ。', en: '"Two (items)."', ok: false,
          why: '〜個 counts objects. Nights take 〜泊 → 二泊です。' },
      ],
    },
    {
      npc: ['朝食はお付けしますか。', 'ちょうしょくはおつけしますか。'],
      npcEn: '"Shall I add breakfast?"',
      stage: 'The clerk offers to include breakfast.',
      options: [
        { ja: 'はい、お願いします。', kana: 'はい、おねがいします。', en: '"Yes, please."', ok: true,
          note: 'Accept the option politely with お願いします。' },
        { ja: 'いいえ、けっこうです。', kana: 'いいえ、けっこうです。', en: '"No, thank you."', ok: true,
          note: 'けっこうです politely declines — you just skip breakfast.' },
        { ja: 'いらない。', kana: 'いらない。', en: '"Don\'t want it." (casual)', ok: false,
          why: 'Blunt and casual. Decline with いいえ、けっこうです。' },
      ],
    },
    {
      npc: ['何かご質問はございますか。', 'なにかごしつもんはございますか。'],
      npcEn: '"Do you have any questions?"',
      stage: 'You want to know about the internet.',
      options: [
        { ja: 'インターネットは使えますか。', kana: 'いんたーねっとはつかえますか。', en: '"Can I use the internet?"', ok: true,
          note: 'Potential form 使える + ますか politely asks whether it\'s available.' },
        { ja: 'ネット使える？', kana: 'ねっとつかえる？', en: '"Net work?" (casual)', ok: false,
          why: 'Casual clip with no です. Ask インターネットは使えますか。' },
        { ja: 'インターネット。', kana: 'いんたーねっと。', en: '"Internet."', ok: false,
          why: 'A bare noun isn\'t a question. Ask インターネットは使えますか。' },
      ],
    },
    {
      npc: ['はい、無料でご利用いただけます。', 'はい、むりょうでごりよういただけます。'],
      npcEn: '"Yes, it\'s available free of charge."',
      stage: 'You want to know the checkout time.',
      options: [
        { ja: 'チェックアウトは何時ですか。', kana: 'ちぇっくあうとはなんじですか。', en: '"What time is checkout?"', ok: true,
          note: '〜は何時ですか asks a clock time cleanly.' },
        { ja: '何時に出る？', kana: 'なんじにでる？', en: '"When do I leave?" (casual)', ok: false,
          why: 'Plain 出る + casual tone. Ask チェックアウトは何時ですか。' },
        { ja: '出る時間。', kana: 'でるじかん。', en: '"Leaving time."', ok: false,
          why: 'A noun phrase, not a question. Ask チェックアウトは何時ですか。' },
      ],
    },
    {
      npc: ['午前十時でございます。', 'ごぜんじゅうじでございます。'],
      npcEn: '"It\'s 10 a.m."',
      stage: 'You\'ve got everything you need.',
      options: [
        { ja: 'わかりました。ありがとうございます。', kana: 'わかりました。ありがとうございます。', en: '"Understood. Thank you."', ok: true,
          note: 'Confirm and thank — a clean close to check-in.' },
        { ja: 'どうも。', kana: 'どうも。', en: '"Thanks."', ok: true,
          note: 'A lighter but acceptable sign-off.' },
        { ja: 'はい。', kana: 'はい。', en: '"Yes."', ok: false,
          why: '"はい" alone doesn\'t thank. Say わかりました。ありがとうございます。' },
      ],
    },
  ],
  outro:
    'Checked in like a pro: gave your name, 二泊 with the 〜泊 counter, sorted breakfast, asked ' +
    'with 使えますか, and confirmed checkout. These lines work at any front desk in Japan.',
};
