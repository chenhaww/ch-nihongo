// src/particles.js — core particle reference (N5–N4 backbone).
// Examples use polite register; readings drive TTS. Extend freely.
export const PARTICLES = [
  {
    p: 'は', romaji: 'wa', name: 'Topic marker',
    note: 'Marks the topic — what the sentence is about. Pronounced "wa", not "ha". Sets the frame; the comment follows.',
    examples: [
      ['私は学生です。', 'わたしはがくせいです。', 'I am a student. (As for me — student.)'],
      ['今日は寒いです。', 'きょうはさむいです。', 'Today is cold.'],
    ],
    confusion: 'は vs が: は marks the known topic and backgrounds it ("as for X"); が introduces or emphasizes new information. 私は = "as for me…"; 私が = "I (and no one else)".',
  },
  {
    p: 'が', romaji: 'ga', name: 'Subject marker',
    note: 'Marks the grammatical subject, often new or emphasized information, the answer to "who/what".',
    examples: [
      ['猫がいます。', 'ねこがいます。', 'There is a cat.'],
      ['誰が来ましたか。', 'だれがきましたか。', 'Who came?'],
    ],
    confusion: 'Also used with likes/abilities: 日本語が分かります (I understand Japanese). Learners wrongly use を here — it\'s が.',
  },
  {
    p: 'を', romaji: 'o', name: 'Direct object',
    note: 'Marks the direct object — the thing the verb acts on. Written を but pronounced "o".',
    examples: [
      ['水を飲みます。', 'みずをのみます。', 'I drink water.'],
      ['本を読みます。', 'ほんをよみます。', 'I read a book.'],
    ],
    confusion: 'With movement verbs it marks the path, not an object: 公園を散歩する (stroll through the park), 道を歩く (walk along the road).',
  },
  {
    p: 'に', romaji: 'ni', name: 'Target / time / location of existence',
    note: 'A workhorse: destination, point in time, indirect object, and where something exists.',
    examples: [
      ['学校に行きます。', 'がっこうにいきます。', 'I go to school.'],
      ['七時に起きます。', 'しちじにおきます。', 'I wake up at seven.'],
      ['机の上に本があります。', 'つくえのうえにほんがあります。', 'There is a book on the desk.'],
    ],
    confusion: 'に vs で: に marks where something EXISTS or a destination; で marks where an ACTION happens. 家にいる (be at home) vs 家で食べる (eat at home).',
  },
  {
    p: 'へ', romaji: 'e', name: 'Direction',
    note: 'Marks direction of movement ("toward"). Written へ but pronounced "e". Often interchangeable with に for destinations.',
    examples: [
      ['東京へ行きます。', 'とうきょうへいきます。', 'I go to Tokyo.'],
      ['家へ帰ります。', 'いえへかえります。', 'I return home.'],
    ],
    confusion: 'へ vs に: へ stresses the direction/journey; に stresses arrival at the destination. For simple "go to X", both work and に is more common in speech.',
  },
  {
    p: 'で', romaji: 'de', name: 'Location of action / means',
    note: 'Where an action takes place, or the means/method/tool used to do it.',
    examples: [
      ['図書館で勉強します。', 'としょかんでべんきょうします。', 'I study at the library.'],
      ['電車で行きます。', 'でんしゃでいきます。', 'I go by train.'],
      ['箸で食べます。', 'はしでたべます。', 'I eat with chopsticks.'],
    ],
    confusion: 'で (action location) vs に (existence/destination). If a verb DOES something somewhere, use で.',
  },
  {
    p: 'と', romaji: 'to', name: 'And / with / quotation',
    note: 'Joins nouns exhaustively ("A and B"), marks the person you do something with, or quotes speech/thought.',
    examples: [
      ['パンと卵を食べます。', 'パンとたまごをたべます。', 'I eat bread and eggs.'],
      ['友達と話します。', 'ともだちとはなします。', 'I talk with a friend.'],
    ],
    confusion: 'と vs や: と lists everything ("A and B", complete); や lists examples ("A, B, among others", incomplete).',
  },
  {
    p: 'も', romaji: 'mo', name: 'Also / too',
    note: 'Means "also/too/even". Replaces は, が, or を (not added on top of them).',
    examples: [
      ['私も行きます。', 'わたしもいきます。', 'I will go too.'],
      ['水もお茶もあります。', 'みずもおちゃもあります。', 'There is both water and tea.'],
    ],
    confusion: 'も replaces は/が/を, so 私はも is wrong — say 私も. With numbers it adds emphasis: 三杯も飲んだ (drank as many as three cups).',
  },
  {
    p: 'の', romaji: 'no', name: 'Possessive / linking',
    note: 'Links two nouns: possession, type, or modification ("X\'s Y" / "Y of X").',
    examples: [
      ['私の本です。', 'わたしのほんです。', 'It is my book.'],
      ['日本語の先生。', 'にほんごのせんせい。', 'A Japanese-language teacher.'],
    ],
    confusion: 'Can also nominalize or stand in for a noun: 赤いのが好き (I like the red one). And it softens questions in casual speech: 行くの？ (Are you going?).',
  },
  {
    p: 'か', romaji: 'ka', name: 'Question marker',
    note: 'Turns a statement into a question. Also "or" between options.',
    examples: [
      ['学生ですか。', 'がくせいですか。', 'Are you a student?'],
      ['コーヒーか紅茶を飲みます。', 'コーヒーかこうちゃをのみます。', 'I drink coffee or tea.'],
    ],
    confusion: 'In casual speech か is often dropped, with rising intonation doing the work: 行く？ instead of 行くか？ (which can sound brusque).',
  },
  {
    p: 'から', romaji: 'kara', name: 'From / because',
    note: 'Marks a starting point (time or place) or gives a reason ("because").',
    examples: [
      ['九時から始まります。', 'くじからはじまります。', 'It starts from nine.'],
      ['寒いから、上着を着ます。', 'さむいから、うわぎをきます。', 'Because it\'s cold, I wear a jacket.'],
    ],
    confusion: 'から vs ので (both "because"): から is more subjective/direct; ので is softer and more polite, better for excuses and formal settings.',
  },
  {
    p: 'まで', romaji: 'made', name: 'Until / up to',
    note: 'Marks an end point in time or space ("until / as far as"). Pairs naturally with から.',
    examples: [
      ['五時まで働きます。', 'ごじまではたらきます。', 'I work until five.'],
      ['駅まで歩きます。', 'えきまであるきます。', 'I walk to the station.'],
    ],
    confusion: 'まで (until, continuous) vs までに (by a deadline, point). 五時まで = do it the whole time until 5; 五時までに = finish by 5.',
  },
  {
    p: 'より', romaji: 'yori', name: 'Than (comparison)',
    note: 'Marks the standard in a comparison ("than X").',
    examples: [
      ['今日は昨日より暑いです。', 'きょうはきのうよりあついです。', 'Today is hotter than yesterday.'],
      ['電車より車が速い。', 'でんしゃよりくるまがはやい。', 'A car is faster than a train.'],
    ],
    confusion: 'Pairs with のほうが for the other side: AよりBのほうが… = "B is more … than A".',
  },
  {
    p: 'ね', romaji: 'ne', name: 'Confirmation (sentence-end)',
    note: 'Seeks agreement or confirmation — "right? / isn\'t it?". Softens the tone, invites the listener in.',
    examples: [
      ['いい天気ですね。', 'いいてんきですね。', 'Nice weather, isn\'t it?'],
      ['難しいですね。', 'むずかしいですね。', 'It\'s hard, isn\'t it?'],
    ],
    confusion: 'ね vs よ: ね assumes shared feeling/agreement; よ asserts NEW info to the listener. ね = "we agree"; よ = "I\'m telling you".',
  },
  {
    p: 'よ', romaji: 'yo', name: 'Assertion (sentence-end)',
    note: 'Adds emphasis, asserts information the listener may not know, or gives gentle warning/encouragement.',
    examples: [
      ['この店は安いですよ。', 'このみせはやすいですよ。', 'This shop is cheap, you know.'],
      ['もう時間ですよ。', 'もうじかんですよ。', 'It\'s time already, you know.'],
    ],
    confusion: 'Overusing よ can sound pushy or know-it-all. Use it when genuinely informing; drop it when simply stating the obvious.',
  },
];
