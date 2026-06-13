// src/grammar/n5.js — Foundational N5 grammar (batch 1).
// Each lesson: id, level, title, structure, explanation, registers (example
// triples casual/polite/formal where meaningful), mistake, quiz[].
// readings in examples are pure kana (drive TTS). Extend with more batches.

export const N5 = [
  {
    id: 'n5-01', level: 5, title: '〜です / 〜だ (copula)',
    structure: 'Noun + です (polite) / だ (casual) / でございます (formal)',
    explanation:
      'The copula links a noun to the subject — English "to be" (am/is/are). ' +
      'Politeness is carried by the copula itself, so this single point underlies the whole register system.',
    registers: [
      ['学生だ。', 'がくせいだ。', 'casual'],
      ['学生です。', 'がくせいです。', 'polite'],
      ['学生でございます。', 'がくせいでございます。', 'formal'],
    ],
    mistake: 'Don\'t stack だ before です. 学生だです is wrong — pick one register.',
    quiz: [
      { q: 'Polite "I am a teacher": 先生＿。', options: ['だ', 'です', 'でした', 'を'], answer: 1, why: { 0: 'だ is casual — fine among friends, but not polite enough here.', 2: 'でした is past tense ("was"), not present.', 3: 'を marks an object, not the copula.' } ,
        explain: 'です is the polite copula.' },
      { q: 'Which is casual?', options: ['です', 'でございます', 'だ', 'ですか'], answer: 2, why: { 0: 'です is polite, not casual.', 1: 'でございます is the most formal, used in business.', 3: 'ですか makes a polite question.' } ,
        explain: 'だ is the plain/casual copula.' },
    ],
  },
  {
    id: 'n5-02', level: 5, title: '〜は〜です (topic)',
    structure: 'Topic + は + Noun + です',
    explanation:
      'は (pronounced "wa") marks the topic — what the sentence is about. The basic ' +
      'sentence frame for stating identity or description.',
    registers: [
      ['私は日本人だ。', 'わたしはにほんじんだ。', 'casual'],
      ['私は日本人です。', 'わたしはにほんじんです。', 'polite'],
    ],
    mistake: 'は as a particle is written は but said "wa". Saying "ha" marks you as a beginner.',
    quiz: [
      { q: '私＿田中です。', options: ['は', 'を', 'で', 'と'], answer: 0, why: { 1: 'を marks a direct object, not the topic.', 2: 'で marks where an action happens.', 3: 'と means "and/with".' } ,
        explain: 'は marks 私 as the topic.' },
      { q: 'How is the topic-marker は pronounced?', options: ['ha', 'wa', 'ba', 'pa'], answer: 1,
        explain: 'As a particle, は is read "wa".' },
    ],
  },
  {
    id: 'n5-03', level: 5, title: '〜ます (polite verbs)',
    structure: 'Verb stem + ます (non-past polite)',
    explanation:
      'The ます-form is the polite present/future verb ending. Its casual counterpart ' +
      'is the dictionary form. Negative is 〜ません.',
    registers: [
      ['毎日勉強する。', 'まいにちべんきょうする。', 'casual'],
      ['毎日勉強します。', 'まいにちべんきょうします。', 'polite'],
    ],
    mistake: '〜ます attaches to the verb STEM, not the dictionary form: 行きます (○) not 行くます (✗).',
    quiz: [
      { q: 'Polite form of 食べる:', options: ['食べるます', '食べます', '食べります', '食べました'], answer: 1, why: { 0: 'ます attaches to the stem, not the dictionary form — 食べるます is wrong.', 2: '食べります invents an extra り — 食べる is an ichidan verb.', 3: '食べました is past tense.' } ,
        explain: 'Stem 食べ + ます.' },
      { q: 'Polite negative ending is:', options: ['〜ません', '〜なlate', '〜まする', '〜ないです'], answer: 0,
        explain: '〜ません is the polite negative.' },
    ],
  },
  {
    id: 'n5-04', level: 5, title: '〜を (object)',
    structure: 'Noun + を + transitive verb',
    explanation: 'を (said "o") marks the direct object — the thing the verb acts on.',
    registers: [
      ['ご飯を食べる。', 'ごはんをたべる。', 'casual'],
      ['ご飯を食べます。', 'ごはんをたべます。', 'polite'],
    ],
    mistake: 'を is only for direct objects. Movement-through uses it too (道を歩く), but existence/destination is に, not を.',
    quiz: [
      { q: '水＿飲みます。', options: ['を', 'は', 'に', 'へ'], answer: 0, why: { 1: 'は would mark water as the topic, shifting the nuance away from "drink water".', 2: 'に marks destination/time, not the object.', 3: 'へ marks direction of movement.' } ,
        explain: 'を marks 水 as the object of 飲む.' },
    ],
  },
  {
    id: 'n5-05', level: 5, title: '〜に / 〜へ (destination)',
    structure: 'Place + に / へ + movement verb',
    explanation:
      'Both mark where you\'re going. に emphasizes arrival; へ (said "e") emphasizes ' +
      'direction. For everyday "go to X", に is more common.',
    registers: [
      ['東京に行く。', 'とうきょうにいく。', 'casual'],
      ['東京へ行きます。', 'とうきょうへいきます。', 'polite'],
    ],
    mistake: 'へ as a particle is written へ but pronounced "e".',
    quiz: [
      { q: '学校＿行きます。', options: ['を', 'に', 'が', 'も'], answer: 1, why: { 0: 'を can\'t mark a plain destination (only a path travelled through).', 2: 'が marks a subject, not a destination.', 3: 'も means "also".' } ,
        explain: 'に marks the destination.' },
      { q: 'The particle へ is pronounced:', options: ['he', 'e', 'be', 'we'], answer: 1,
        explain: 'As a particle, へ is read "e".' },
    ],
  },
  {
    id: 'n5-06', level: 5, title: '〜で (location of action / means)',
    structure: 'Place + で + action verb  ·  Tool + で',
    explanation:
      'で marks where an action happens, or the means/tool used. Contrast に, which ' +
      'marks existence or destination — not the site of an action.',
    registers: [
      ['図書館で勉強する。', 'としょかんでべんきょうする。', 'casual'],
      ['図書館で勉強します。', 'としょかんでべんきょうします。', 'polite'],
    ],
    mistake: 'に vs で: 家にいる (exist at home) but 家で食べる (eat at home). Action → で.',
    quiz: [
      { q: 'レストラン＿食べます。', options: ['に', 'で', 'を', 'へ'], answer: 1, why: { 0: 'に marks existence or destination, not where an action happens.', 2: 'を marks the object being eaten, not the place.', 3: 'へ marks direction of movement.' } ,
        explain: 'Eating is an action, so the location takes で.' },
      { q: '箸＿食べます (eat WITH chopsticks):', options: ['で', 'に', 'を', 'と'], answer: 0, why: { 1: 'に doesn\'t mark a tool.', 2: 'を would mark chopsticks as the thing eaten!', 3: 'と would mean "with chopsticks" as a companion, not a tool.' } ,
        explain: 'で marks the means/tool.' },
    ],
  },
  {
    id: 'n5-07', level: 5, title: 'い-adjectives',
    structure: 'い-adj + Noun  ·  Negative: 〜くない  ·  Past: 〜かった',
    explanation:
      'い-adjectives end in い and conjugate themselves (no だ needed in casual). ' +
      'Negative drops い → くない; past drops い → かった.',
    registers: [
      ['寒い。', 'さむい。', 'casual'],
      ['寒いです。', 'さむいです。', 'polite'],
    ],
    mistake: 'Never put だ after an い-adjective: 寒いだ is wrong. Polite is 寒いです.',
    quiz: [
      { q: 'Negative of 高い (expensive):', options: ['高いない', '高くない', '高じゃない', '高くじゃ'], answer: 1, why: { 0: '高いない double-marks — drop the い first.', 2: '高じゃない treats it like a な-adjective, but 高い is an い-adjective.', 3: '高くじゃ is incomplete.' } ,
        explain: 'Drop い, add くない.' },
      { q: 'Past of 楽しい:', options: ['楽しいだった', '楽しかった', '楽しくた', '楽しいでした'], answer: 1, why: { 0: '楽しいだった keeps い AND adds だった — drop the い.', 2: '楽しくた is missing the か.', 3: '楽しいでした stacks い with でした.' } ,
        explain: 'Drop い, add かった.' },
    ],
  },
  {
    id: 'n5-08', level: 5, title: 'な-adjectives',
    structure: 'な-adj + な + Noun  ·  Predicate: 〜だ/です',
    explanation:
      'な-adjectives behave like nouns: they need な before a noun, and だ/です as a ' +
      'predicate. Negative is 〜じゃない / 〜ではありません.',
    registers: [
      ['静かだ。', 'しずかだ。', 'casual'],
      ['静かです。', 'しずかです。', 'polite'],
    ],
    mistake: 'Use な (not い) before a noun: 静かな部屋 (a quiet room), never 静かい部屋.',
    quiz: [
      { q: '_ 部屋 (a quiet room): 静か＿部屋', options: ['い', 'な', 'だ', 'の'], answer: 1, why: { 0: 'い is for い-adjectives; 静か is a な-adjective.', 2: 'だ is the predicate form, not used directly before a noun.', 3: 'の links two nouns, but 静か is an adjective.' } ,
        explain: 'な-adjectives take な before a noun.' },
      { q: 'Negative of 元気 (polite):', options: ['元気くない', '元気じゃありません', '元気ない', '元気かった'], answer: 1, why: { 0: '元気くない treats it like an い-adjective; 元気 is な-type.', 2: '元気ない is too casual/incomplete for polite.', 3: '元気かった is a past form, not negative.' } ,
        explain: 'な-adj negative: じゃありません / ではありません.' },
    ],
  },
  {
    id: 'n5-09', level: 5, title: '〜ない / 〜ません (negation)',
    structure: 'Casual: verb 〜ない  ·  Polite: verb stem 〜ません',
    explanation: 'Negates a verb. Casual uses the 〜ない form; polite uses 〜ません.',
    registers: [
      ['肉を食べない。', 'にくをたべない。', 'casual'],
      ['肉を食べません。', 'にくをたべません。', 'polite'],
    ],
    mistake: '〜ません is already polite — don\'t add です. 食べませんです is wrong.',
    quiz: [
      { q: 'Polite negative of 行きます:', options: ['行きません', '行かない', '行きないです', '行きませんだ'], answer: 0, why: { 1: '行かない is the casual negative, not polite.', 2: '行きないです isn\'t a real form.', 3: '行きませんだ stacks だ onto ません.' } ,
        explain: 'ます → ません.' },
    ],
  },
  {
    id: 'n5-10', level: 5, title: '〜ました / 〜た (past)',
    structure: 'Polite past: 〜ました  ·  Casual past: 〜た',
    explanation: 'Past tense of verbs. Polite ます → ました; casual uses the た-form.',
    registers: [
      ['映画を見た。', 'えいがをみた。', 'casual'],
      ['映画を見ました。', 'えいがをみました。', 'polite'],
    ],
    mistake: 'Polite past negative is 〜ませんでした, not 〜なかったです in formal writing.',
    quiz: [
      { q: 'Polite past of 食べます:', options: ['食べました', '食べた', '食べでした', '食べますた'], answer: 0, why: { 1: '食べた is the casual past.', 2: '食べでした isn\'t a valid form.', 3: '食べますた mangles the conjugation.' } ,
        explain: 'ます → ました.' },
      { q: 'Polite past negative:', options: ['〜ませんでした', '〜なかった', '〜ますでした', '〜ません'], answer: 0,
        explain: '〜ませんでした.' },
    ],
  },
  {
    id: 'n5-11', level: 5, title: '〜て form (connecting)',
    structure: 'Verb て-form: links actions, requests (〜てください), progressive (〜ている)',
    explanation:
      'The て-form is the connective hub of Japanese grammar — chains actions ("do X and ' +
      'then Y"), forms requests, and builds the progressive. Learn the conjugation well.',
    registers: [
      ['起きて、顔を洗う。', 'おきて、かおをあらう。', 'casual'],
      ['起きて、顔を洗います。', 'おきて、かおをあらいます。', 'polite'],
    ],
    mistake: 'て-form conjugation depends on the verb ending: 飲む→飲んで, 書く→書いて, 食べる→食べて. Memorize the groups.',
    quiz: [
      { q: 'て-form of 飲む:', options: ['飲みて', '飲んで', '飲むて', '飲いて'], answer: 1, why: { 0: '飲みて uses the stem incorrectly — む-verbs become んで.', 2: '飲むて attaches て to the dictionary form.', 3: '飲いて isn\'t a valid conjugation.' } ,
        explain: 'む/ぶ/ぬ verbs → んで.' },
      { q: 'Polite request "please wait": 待っ＿', options: ['てください', 'てだ', 'てます', 'てない'], answer: 0, why: { 1: 'てだ isn\'t a request form.', 2: 'てます would be progressive ("is waiting").', 3: 'てない is a casual negative.' } ,
        explain: '〜てください = please do.' },
    ],
  },
  {
    id: 'n5-12', level: 5, title: '〜たい (want to)',
    structure: 'Verb stem + たい',
    explanation:
      'Expresses the speaker\'s desire to do something. 〜たい conjugates like an ' +
      'い-adjective (〜たくない, 〜たかった).',
    registers: [
      ['日本へ行きたい。', 'にほんへいきたい。', 'casual'],
      ['日本へ行きたいです。', 'にほんへいきたいです。', 'polite'],
    ],
    mistake: '〜たい is for the speaker\'s own desire. For others\' desires use 〜たがっている.',
    quiz: [
      { q: '"I want to eat": 食べ＿', options: ['たい', 'たいだ', 'ほしい', 'まい'], answer: 0, why: { 1: 'たいだ stacks だ onto たい (which is already adjective-like).', 2: 'ほしい expresses wanting a thing, not wanting to do an action.', 3: 'まい is a negative volitional, the opposite meaning.' } ,
        explain: 'stem 食べ + たい.' },
      { q: 'Negative of 行きたい:', options: ['行きたいない', '行きたくない', '行きたくじゃ', '行きないたい'], answer: 1, why: { 0: '行きたいない double-marks; drop the い of たい first.', 2: '行きたくじゃ is incomplete.', 3: '行きないたい reverses the order.' } ,
        explain: 'たい conjugates like an い-adj → たくない.' },
    ],
  },
  {
    id: 'n5-13', level: 5, title: '〜ましょう / 〜ませんか (let\'s / invite)',
    structure: 'Verb stem + ましょう (let\'s) / ませんか (won\'t you?)',
    explanation:
      '〜ましょう proposes doing something together ("let\'s"); 〜ませんか invites more ' +
      'politely ("won\'t you…?"). Casual equivalent of ましょう is the volitional 〜よう.',
    registers: [
      ['一緒に行こう。', 'いっしょにいこう。', 'casual'],
      ['一緒に行きましょう。', 'いっしょにいきましょう。', 'polite'],
    ],
    mistake: '〜ませんか is an invitation, not a real negative question — answer はい to accept.',
    quiz: [
      { q: '"Let\'s eat": 食べ＿', options: ['ましょう', 'ません', 'ました', 'まい'], answer: 0,
        explain: '〜ましょう = let\'s.' },
      { q: 'Polite invitation "won\'t you come?": 来＿', options: ['ましょうか', 'ませんか', 'ましたか', 'たいか'], answer: 1,
        explain: '〜ませんか invites.' },
    ],
  },
  {
    id: 'n5-14', level: 5, title: '〜から (because)',
    structure: 'Reason + から、 result',
    explanation:
      'から after a clause gives a reason ("because"). More direct than ので. In casual ' +
      'speech the plain form precedes から; in polite, です/ます can.',
    registers: [
      ['寒いから、コートを着る。', 'さむいから、コートをきる。', 'casual'],
      ['寒いですから、コートを着ます。', 'さむいですから、コートをきます。', 'polite'],
    ],
    mistake: 'から (because) vs から (from): both exist; reason-から follows a full clause, "from"-から follows a noun.',
    quiz: [
      { q: '"Because it\'s expensive, I won\'t buy it": 高い＿、買いません。', options: ['から', 'まで', 'より', 'のに'], answer: 0, why: { 1: 'まで means "until", not "because".', 2: 'より marks comparison ("than").', 3: 'のに means "even though", the opposite nuance.' } ,
        explain: 'から gives the reason.' },
    ],
  },
  {
    id: 'n5-15', level: 5, title: '〜があります / います (existence)',
    structure: 'Noun + が + あります (inanimate) / います (animate)',
    explanation:
      'States that something exists or you have it. あります for objects/plants; います ' +
      'for people and animals.',
    registers: [
      ['犬がいる。', 'いぬがいる。', 'casual'],
      ['犬がいます。', 'いぬがいます。', 'polite'],
    ],
    mistake: 'Pick by animacy: 猫がいます (cat — animate) but 本があります (book — inanimate).',
    quiz: [
      { q: '猫が＿。', options: ['あります', 'います', 'です', 'します'], answer: 1, why: { 0: 'あります is for inanimate things; a cat is alive.', 2: 'です is the copula, not an existence verb.', 3: 'します means "to do".' } ,
        explain: 'A cat is animate → います.' },
      { q: '机の上に本が＿。', options: ['います', 'あります', 'です', 'いります'], answer: 1, why: { 0: 'います is for animate things; a book isn\'t alive.', 2: 'です is the copula.', 3: 'いります means "to need".' } ,
        explain: 'A book is inanimate → あります.' },
    ],
  },
];
