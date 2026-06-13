// src/grammar/n4.js — N4 grammar (batch 1: 15 foundational points).
// Same lesson shape as n5.js: id, level, title, structure, explanation,
// registers (example triples [ja, kana-reading, register]), mistake, quiz[].
// Readings in registers are pure kana (drive TTS). Extend with more batches.

export const N4 = [
  {
    id: 'n4-01', level: 4, title: '〜ている (progressive / state)',
    structure: 'Verb て-form + いる (casual) / います (polite) / おります (humble)',
    explanation:
      'The て-form + いる has two core meanings: an action in progress ("is doing"), ' +
      'and a resulting ongoing state. 食べている = is eating; 結婚している = is married ' +
      '(the state that resulted from marrying), not "is getting married".',
    registers: [
      ['今、本を読んでいる。', 'いま、ほんをよんでいる。', 'casual'],
      ['今、本を読んでいます。', 'いま、ほんをよんでいます。', 'polite'],
      ['父は出かけております。', 'ちちはでかけております。', 'formal'],
    ],
    mistake:
      'In fast casual speech the い drops (読んでる), and verbs like 結婚する・住む・知る ' +
      'describe a STATE in 〜ている, so 結婚している means "is married", not the act of marrying.',
    quiz: [
      { q: '"I am reading a book now": 今、本を読ん＿。', options: ['でいる', 'ている', 'でいた', 'どいる'], answer: 0,
        why: { 1: 'ている attaches to the て-form, but 読む becomes 読んで (not 読んて).', 2: 'でいた is past progressive ("was reading").', 3: 'どいる is not a valid form.' },
        explain: 'て-form of 読む is 読んで, then + いる.' },
      { q: 'What does 田中さんは結婚しています mean?', options: ['Tanaka will marry', 'Tanaka is married', 'Tanaka is marrying right now', 'Tanaka wants to marry'], answer: 1,
        why: { 0: 'Future would be 結婚します.', 2: 'It is a resulting state, not the live action of the ceremony.', 3: 'Wanting to is 結婚したい.' },
        explain: '〜ている with verbs like 結婚する expresses a resulting ongoing state.' },
    ],
  },
  {
    id: 'n4-02', level: 4, title: 'Potential form (can do)',
    structure: 'G1: 書く→書ける · G2: 食べる→食べられる · する→できる · 来る→来られる',
    explanation:
      'The potential form expresses ability or possibility ("can do"). Group 1 verbs ' +
      'shift the final -u to -eru (読む→読める); Group 2 add られる (見る→見られる). ' +
      'The thing you can do is often marked with が rather than を.',
    registers: [
      ['漢字が読める。', 'かんじがよめる。', 'casual'],
      ['漢字が読めます。', 'かんじがよめます。', 'polite'],
    ],
    mistake:
      'Standard Group 2 potential keeps ら (食べられる); dropping it (食べれる, "ら抜き") is ' +
      'common in speech but non-standard. Also, the object usually takes が: 日本語が話せる.',
    quiz: [
      { q: 'Potential form of 書く:', options: ['書ける', '書かれる', '書けられる', '書きる'], answer: 0,
        why: { 1: '書かれる is the passive ("is written"), not the potential.', 2: '書けられる double-marks the potential.', 3: '書きる is not a real conjugation.' },
        explain: 'Group 1: final -u → -eru (書く→書ける).' },
      { q: '"I can speak Japanese": 日本語＿話せます。', options: ['が', 'を', 'に', 'で'], answer: 0,
        why: { 1: 'を is the normal object marker, but the potential prefers が for the thing one can do.', 2: 'に marks a destination or time.', 3: 'で marks a place or means.' },
        explain: 'With the potential form the object is standardly marked が.' },
      { q: 'Standard potential of 食べる:', options: ['食べれる', '食べられる', '食べさせる', '食べる'], answer: 1,
        why: { 0: '食べれる is the casual ら抜き form, not standard.', 2: '食べさせる is the causative ("make/let eat").', 3: '食べる is the dictionary form.' },
        explain: 'Group 2 adds られる: 食べる→食べられる.' },
    ],
  },
  {
    id: 'n4-03', level: 4, title: '〜たことがある (have done before)',
    structure: 'Verb た-form + ことがある / ことがあります',
    explanation:
      'States that you have had the experience of doing something ("have ever done"). ' +
      'It uses the past (た) form before ことがある. With the dictionary form, ' +
      '〜ことがある instead means "there are times when I do…".',
    registers: [
      ['日本に行ったことがある。', 'にほんにいったことがある。', 'casual'],
      ['日本に行ったことがあります。', 'にほんにいったことがあります。', 'polite'],
    ],
    mistake:
      'Experience needs the た-form: 食べたことがある (○). 食べることがある uses the ' +
      'dictionary form and means "I sometimes eat it" — a different meaning.',
    quiz: [
      { q: '"Have you ever eaten sushi?": 寿司を食べ＿ありますか。', options: ['たことが', 'ることが', 'たことを', 'たのが'], answer: 0,
        why: { 1: '食べることが means a habit ("sometimes eat"), not an experience.', 2: 'The pattern takes が, not を.', 3: 'たのが is not the experience pattern.' },
        explain: 'Experience = た-form + ことがある.' },
      { q: 'What does 日本に行くことがある mean?', options: ['I have been to Japan', 'I sometimes go to Japan', 'I will go to Japan', 'I went to Japan'], answer: 1,
        why: { 0: '"Have been" needs the past form: 行ったことがある.', 2: 'Future is simply 行く.', 3: 'Simple past is 行った.' },
        explain: 'Dictionary form + ことがある expresses an occasional occurrence.' },
    ],
  },
  {
    id: 'n4-04', level: 4, title: '〜ことができる (be able to)',
    structure: 'Dictionary verb + ことができる / ことができます',
    explanation:
      'A more formal, often written equivalent of the potential form. The verb stays in ' +
      'its dictionary form. (Noun + ができる works too: 運転ができる = can drive.)',
    registers: [
      ['ピアノを弾くことができる。', 'ぴあのをひくことができる。', 'casual'],
      ['ピアノを弾くことができます。', 'ぴあのをひくことができます。', 'polite'],
      ['こちらでご利用いただくことができます。', 'こちらでごりよういただくことができます。', 'formal'],
    ],
    mistake:
      'Use the plain dictionary form, not the potential: 食べることができる (○), ' +
      'not 食べられることができる. It is more formal than the plain potential 食べられる.',
    quiz: [
      { q: '"I can speak Japanese": 日本語を話す＿できます。', options: ['ことが', 'ことを', 'のが', 'ように'], answer: 0,
        why: { 1: 'The pattern takes が, not を.', 2: 'のが is not used with できる here.', 3: 'ように expresses purpose/manner, not ability.' },
        explain: '〜ことができる: dictionary verb + ことが + できる.' },
      { q: 'Which is the more formal way to say "can speak"?', options: ['話せる', '話すことができる', '話している', '話したい'], answer: 1,
        why: { 0: '話せる is the potential — natural but more casual/spoken.', 2: '話している is the progressive ("is speaking").', 3: '話したい means "want to speak".' },
        explain: '〜ことができる is the more formal/written option.' },
    ],
  },
  {
    id: 'n4-05', level: 4, title: '〜なければならない (must)',
    structure: 'Verb ない-base + なければならない/なりません · casual: なきゃ / なくちゃ',
    explanation:
      'Expresses obligation ("must / have to"). Literally "if you don\'t…, it won\'t do". ' +
      'In casual speech it shortens to なきゃ (from なければ) or なくちゃ (from なくては).',
    registers: [
      ['宿題をしなきゃ。', 'しゅくだいをしなきゃ。', 'casual'],
      ['宿題をしなければなりません。', 'しゅくだいをしなければなりません。', 'polite'],
    ],
    mistake:
      'Build it from the ない-form minus い: しない→しなければ. Don\'t keep the extra い ' +
      '(しないなければ is wrong). なきゃ is just the casual shortening of なければ.',
    quiz: [
      { q: '"I have to go": 行か＿なりません。', options: ['なければ', 'なくても', 'なくて', 'ないで'], answer: 0,
        why: { 1: 'なくても leads to "even if not" (なくてもいい).', 2: 'なくて just connects ("and not").', 3: 'ないで means "without doing".' },
        explain: '〜なければならない expresses obligation.' },
      { q: 'Casual contraction of しなければ:', options: ['しなきゃ', 'しなくて', 'しないで', 'しても'], answer: 0,
        why: { 1: 'しなくて just connects clauses.', 2: 'しないで means "without doing".', 3: 'しても means "even if I do".' },
        explain: 'なければ shortens to なきゃ in casual speech.' },
    ],
  },
  {
    id: 'n4-06', level: 4, title: '〜なくてもいい (don\'t have to)',
    structure: 'Verb ない-base + なくてもいい(です)',
    explanation:
      'Says that not doing something is fine — i.e. there is no obligation. ' +
      'It is the "lack of obligation" counterpart to 〜なければならない (must).',
    registers: [
      ['明日は来なくてもいい。', 'あしたはこなくてもいい。', 'casual'],
      ['明日は来なくてもいいです。', 'あしたはこなくてもいいです。', 'polite'],
    ],
    mistake:
      'From the ない-form: drop い and add くてもいい (行かない→行かなくてもいい). ' +
      'Don\'t confuse it with the obligation pattern 〜なければならない.',
    quiz: [
      { q: '"You don\'t have to come": 来＿もいいです。', options: ['なくて', 'なくては', 'ないで', 'なければ'], answer: 0,
        why: { 1: 'なくては leads to obligation (なくてはいけない).', 2: 'ないで means "without doing".', 3: 'なければ leads to "must" (なければならない).' },
        explain: '〜なくてもいい = it\'s okay not to do it.' },
      { q: 'What does 食べなくてもいい mean?', options: ['must eat', "don't have to eat", 'must not eat', 'want to eat'], answer: 1,
        why: { 0: '"Must eat" is 食べなければならない.', 2: '"Must not eat" is 食べてはいけない.', 3: '"Want to eat" is 食べたい.' },
        explain: '〜なくてもいい expresses absence of obligation.' },
    ],
  },
  {
    id: 'n4-07', level: 4, title: '〜てもいい (may / permission)',
    structure: 'Verb て-form + もいい(です) · formal: もよろしいでしょうか',
    explanation:
      'Grants or asks for permission ("may I… / it\'s okay to…"). As a question, ' +
      '〜てもいいですか asks permission; the very formal version is 〜てもよろしいでしょうか.',
    registers: [
      ['入ってもいい？', 'はいってもいい？', 'casual'],
      ['入ってもいいですか。', 'はいってもいいですか。', 'polite'],
      ['入ってもよろしいでしょうか。', 'はいってもよろしいでしょうか。', 'formal'],
    ],
    mistake:
      'Built on the て-form: 食べて + もいい. The opposite (refusing permission) is the ' +
      'prohibition 〜てはいけない, so don\'t mix up ても and ては.',
    quiz: [
      { q: '"May I sit here?": ここに座っ＿いいですか。', options: ['ても', 'ては', 'ないで', 'たら'], answer: 0,
        why: { 1: 'ては leads to prohibition (てはいけない).', 2: 'ないで means "without doing".', 3: 'たら means "if/when".' },
        explain: '〜てもいい asks or grants permission.' },
      { q: 'Which is the most formal way to ask permission?', options: ['〜てもいい？', '〜てもいいですか', '〜てもよろしいでしょうか', '〜てもいいだろう'], answer: 2,
        why: { 0: '〜てもいい？ is casual.', 1: '〜てもいいですか is polite but not the most formal.', 3: '〜てもいいだろう is a casual guess, not a polite request.' },
        explain: '〜てもよろしいでしょうか is the most formal.' },
    ],
  },
  {
    id: 'n4-08', level: 4, title: '〜てはいけない (must not)',
    structure: 'Verb て-form + はいけない / はだめ (casual) / はなりません (formal)',
    explanation:
      'Expresses prohibition ("must not / may not"). In casual speech ては often ' +
      'contracts to ちゃ, and では to じゃ (食べてはだめ→食べちゃだめ).',
    registers: [
      ['ここで遊んではだめ。', 'ここであそんではだめ。', 'casual'],
      ['ここで遊んではいけません。', 'ここであそんではいけません。', 'polite'],
      ['許可なく入ってはなりません。', 'きょかなくはいってはなりません。', 'formal'],
    ],
    mistake:
      'Built on the て-form + は: 食べてはいけない. Note ては→ちゃ and では→じゃ in ' +
      'casual contractions; the latter applies to ぐ/む/ぶ/ぬ verbs (読んでは→読んじゃ).',
    quiz: [
      { q: '"You must not smoke here": ここでタバコを吸っ＿いけません。', options: ['ては', 'ても', 'たら', 'ながら'], answer: 0,
        why: { 1: 'てもいい would grant permission, the opposite.', 2: 'たら means "if/when".', 3: 'ながら means "while doing".' },
        explain: '〜てはいけない expresses prohibition.' },
      { q: 'Casual contraction of 食べては:', options: ['食べちゃ', '食べじゃ', '食べでは', '食べんで'], answer: 0,
        why: { 1: 'じゃ comes from では, used after verbs like 読んでは→読んじゃ.', 2: '食べでは is uncontracted and uses the wrong syllable.', 3: '食べんで is not this pattern.' },
        explain: 'ては contracts to ちゃ in casual speech.' },
    ],
  },
  {
    id: 'n4-09', level: 4, title: '〜たほうがいい (had better)',
    structure: 'Affirmative: 〜た-form + ほうがいい · Negative: 〜ない + ほうがいい',
    explanation:
      'Gives advice or a recommendation. The affirmative uses the PAST (た) form even ' +
      'though it points to the future; the negative uses the plain ない form.',
    registers: [
      ['早く寝たほうがいい。', 'はやくねたほうがいい。', 'casual'],
      ['早く寝たほうがいいです。', 'はやくねたほうがいいです。', 'polite'],
    ],
    mistake:
      'Affirmative advice takes the past form (行ったほうがいい), not the dictionary form. ' +
      'Negative advice uses ない directly: 行かないほうがいい.',
    quiz: [
      { q: '"You\'d better go to a doctor": 医者に行っ＿ほうがいいです。', options: ['た', 'て', 'る', 'ない'], answer: 0,
        why: { 1: 'て is the connective form, not the past needed here.', 2: 'る (dictionary form) is not used in this advice pattern.', 3: 'ない would give the opposite advice ("better not go").' },
        explain: 'Affirmative advice uses the past た-form.' },
      { q: '"You\'d better not go": 行か＿ほうがいい。', options: ['ない', 'なくて', 'た', 'ず'], answer: 0,
        why: { 1: 'なくて is the wrong connection here.', 2: 'た gives affirmative advice ("better to go").', 3: 'ず is a formal negative not used in this pattern.' },
        explain: 'Negative advice = ない + ほうがいい.' },
    ],
  },
  {
    id: 'n4-10', level: 4, title: '〜つもり (intend to)',
    structure: 'Dictionary verb + つもり(だ/です) · Negative: 〜ない + つもり',
    explanation:
      'States the speaker\'s intention or plan ("intend to"). It carries a firmer sense ' +
      'of a settled decision than 〜たい (want to).',
    registers: [
      ['来年留学するつもりだ。', 'らいねんりゅうがくするつもりだ。', 'casual'],
      ['来年留学するつもりです。', 'らいねんりゅうがくするつもりです。', 'polite'],
    ],
    mistake:
      'つもり follows the plain dictionary (or ない) form, not the stem: 行くつもり (○), ' +
      '行きつもり (✗). For "don\'t intend to", use 〜ないつもり.',
    quiz: [
      { q: '"I intend to study tomorrow": 明日勉強する＿です。', options: ['つもり', 'ところ', 'はず', 'まま'], answer: 0,
        why: { 1: 'ところ means "about to / just (did)".', 2: 'はず expresses expectation ("should be").', 3: 'まま means "as it is / unchanged".' },
        explain: '〜つもり expresses intention.' },
      { q: '"I don\'t intend to go": 行か＿つもりです。', options: ['ない', 'なくて', 'る', 'た'], answer: 0,
        why: { 1: 'なくて is the wrong form before つもり.', 2: 'る gives the affirmative intention.', 3: 'た is past tense.' },
        explain: 'Negative intention = ない + つもり.' },
    ],
  },
  {
    id: 'n4-11', level: 4, title: '〜ながら (while doing)',
    structure: 'Verb ます-stem + ながら + main action',
    explanation:
      'Links two actions done at the same time by the same person. The verb after ' +
      'ながら is the main action; the ながら-verb is the simultaneous, secondary one.',
    registers: [
      ['音楽を聞きながら勉強する。', 'おんがくをききながらべんきょうする。', 'casual'],
      ['音楽を聞きながら勉強します。', 'おんがくをききながらべんきょうします。', 'polite'],
    ],
    mistake:
      'ながら attaches to the ます-stem (聞き+ながら), and both actions must share the same ' +
      'subject. The main action comes after ながら.',
    quiz: [
      { q: '"while listening to music": 音楽を聞き＿勉強する。', options: ['ながら', 'ないで', 'たり', 'ても'], answer: 0,
        why: { 1: 'ないで means "without doing".', 2: 'たり lists representative actions.', 3: 'ても means "even if".' },
        explain: 'ます-stem + ながら = doing X while Y.' },
      { q: 'ながら attaches to which form?', options: ['the ます-stem', 'the dictionary form', 'the た-form', 'the ない-form'], answer: 0,
        why: { 1: 'The dictionary form is used in other patterns, not before ながら.', 2: 'The た-form is past tense.', 3: 'The ない-form is the negative.' },
        explain: '食べる→食べながら uses the stem 食べ.' },
    ],
  },
  {
    id: 'n4-12', level: 4, title: '〜たり〜たり (do things like X and Y)',
    structure: 'Verb た-form + り、 (Verb た-form + り) + する',
    explanation:
      'Lists a couple of representative actions out of many ("do things like X and Y"), ' +
      'without implying a fixed order or that the list is complete. It usually ends in する.',
    registers: [
      ['週末は本を読んだり映画を見たりする。', 'しゅうまつはほんをよんだりえいがをみたりする。', 'casual'],
      ['週末は本を読んだり映画を見たりします。', 'しゅうまつはほんをよんだりえいがをみたりします。', 'polite'],
    ],
    mistake:
      'Built on the た-form + り (読む→読んだり), normally closing with する/します. ' +
      'For an ordered sequence ("do X then Y"), use the て-form instead.',
    quiz: [
      { q: '"read books, watch movies, and so on": 本を読ん＿映画を見たりする。', options: ['だり', 'たり', 'でり', 'だら'], answer: 0,
        why: { 1: 'り attaches after the た-form, and 読む becomes 読んだ → 読んだり.', 2: 'でり is not a valid form.', 3: 'だら is a conditional ("if/when").' },
        explain: 'た-form 読んだ + り = 読んだり.' },
      { q: 'A 〜たり〜たり list normally ends with:', options: ['する', 'ある', 'いる', 'です'], answer: 0,
        why: { 1: 'ある is the existence verb for objects.', 2: 'いる is the existence verb for people/animals.', 3: 'です alone does not complete this verb pattern.' },
        explain: 'The pattern closes with する/します.' },
    ],
  },
  {
    id: 'n4-13', level: 4, title: 'Giving / receiving favors (〜てあげる・てくれる・てもらう)',
    structure: '〜てあげる (I→others) · 〜てくれる (others→me) · 〜てもらう (I receive the doing)',
    explanation:
      'These mark the DIRECTION of a favor. あげる = I do something for someone else; ' +
      'くれる = someone does something for me (toward my side); もらう = I get/have someone ' +
      'do something. くれる\'s honorific is くださる; あげる\'s humble is さしあげる.',
    registers: [
      ['友達が手伝ってくれた。', 'ともだちがてつだってくれた。', 'casual'],
      ['友達が手伝ってくれました。', 'ともだちがてつだってくれました。', 'polite'],
      ['先生が教えてくださいました。', 'せんせいがおしえてくださいました。', 'formal'],
    ],
    mistake:
      'くれる means the favor comes TOWARD me; あげる means it goes FROM me to others — ' +
      'never 私に〜てあげる. Use もらう (doer marked with に) when "I had someone do" it.',
    quiz: [
      { q: '"My friend helped me": 友達が手伝っ＿。', options: ['てくれた', 'てあげた', 'てもらった', 'ておいた'], answer: 0,
        why: { 1: 'てあげた means I did the favor for them (wrong direction).', 2: 'てもらった needs 友達に, not 友達が.', 3: 'ておいた means "did in advance".' },
        explain: 'A favor done toward me = 〜てくれる.' },
      { q: '"I had my teacher teach me": 先生＿教えてもらった。', options: ['に', 'が', 'を', 'へ'], answer: 0,
        why: { 1: 'が would suit くれる (先生が教えてくれた).', 2: 'を marks an object, not the doer.', 3: 'へ marks direction of movement.' },
        explain: 'With もらう the doer of the favor is marked に.' },
      { q: '"I\'ll help you (do you the favor)": 手伝っ＿。', options: ['てあげる', 'てくれる', 'てもらう', 'ておく'], answer: 0,
        why: { 1: 'てくれる is for favors toward me.', 2: 'てもらう means "receive a favor".', 3: 'ておく means "do in advance".' },
        explain: 'I do something for you = 〜てあげる.' },
    ],
  },
  {
    id: 'n4-14', level: 4, title: '〜てみる (try doing)',
    structure: 'Verb て-form + みる / みます',
    explanation:
      'Do something to see how it goes — "try doing it (and see)". The みる comes from ' +
      '見る ("to see") but is written in kana here.',
    registers: [
      ['この服を着てみる。', 'このふくをきてみる。', 'casual'],
      ['この服を着てみます。', 'このふくをきてみます。', 'polite'],
    ],
    mistake:
      'Write the helper in kana (みる), not 見る. It means "do and see the result" — ' +
      'distinct from 〜ようとする (attempt/make an effort that may not succeed).',
    quiz: [
      { q: '"I\'ll try eating it (and see)": 食べ＿。', options: ['てみる', 'てある', 'ておく', 'てしまう'], answer: 0,
        why: { 1: 'てある describes a resulting state (something has been done).', 2: 'ておく means "do in advance".', 3: 'てしまう means "do completely / unfortunately".' },
        explain: '〜てみる = try doing to see the result.' },
      { q: 'How is the 〜てみる helper normally written?', options: ['in kana (みる)', 'with 見る', 'with 観る', 'with 診る'], answer: 0,
        why: { 1: '見る is literal "see/look".', 2: '観る is for watching films/sports.', 3: '診る is for a doctor examining a patient.' },
        explain: 'As a grammar helper it is written in kana.' },
    ],
  },
  {
    id: 'n4-15', level: 4, title: '〜ておく (do in advance)',
    structure: 'Verb て-form + おく / おきます · casual: 〜とく / 〜どく',
    explanation:
      'Do something ahead of time in preparation, or leave something in a state on ' +
      'purpose. The おく comes from 置く ("to put/place") but is written in kana.',
    registers: [
      ['ビールを買っておく。', 'びーるをかっておく。', 'casual'],
      ['ビールを買っておきます。', 'びーるをかっておきます。', 'polite'],
    ],
    mistake:
      'Written in kana (おく), not 置く. In casual speech て+おく contracts to とく ' +
      '(買っとく) and で+おく to どく (読んどく).',
    quiz: [
      { q: '"I\'ll buy the tickets in advance": 切符を買っ＿。', options: ['ておく', 'てある', 'ている', 'てみる'], answer: 0,
        why: { 1: 'てある describes an already-completed state.', 2: 'ている is the progressive.', 3: 'てみる means "try doing".' },
        explain: '〜ておく = do something in advance / in preparation.' },
      { q: 'Casual contraction of 買っておく:', options: ['買っとく', '買っどく', '買っとる', '買っちゃう'], answer: 0,
        why: { 1: 'どく comes from でおく (e.g. 読んでおく→読んどく).', 2: '買っとる is a dialectal 〜ている.', 3: '買っちゃう is the contraction of 買ってしまう.' },
        explain: 'ておく contracts to とく in casual speech.' },
    ],
  },
];
