// src/screens/ReviewScreen.js
import React, { useEffect, useState } from 'react';
import {
  View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { C, F, LEVEL_COLORS } from '../theme';
import { buildQueue, buildPracticeQueue, grade, previewIntervals, Rating } from '../srs';
import { speak } from '../tts';
import { toRomaji, normalizeKana } from '../romaji';
import { fetchSentences } from '../db';
import { EMOJI } from '../emoji';

const GRADE_META = [
  { r: Rating.Again, label: 'Forgot', color: '#9E2B25', help: 'Couldn\'t recall it — comes back in ~10 minutes, this session.' },
  { r: Rating.Hard,  label: 'Struggled', color: '#B8860B', help: 'Got there, but it was a real fight. Shorter wait.' },
  { r: Rating.Good,  label: 'Remembered', color: C.green, help: 'Recalled with normal effort. Your default choice.' },
  { r: Rating.Easy,  label: 'Too easy', color: '#2F6B8E', help: 'Instant, effortless. Card waits much longer.' },
];

export default function ReviewScreen({ onDone, practice = false }) {
  const contentDb = useSQLiteContext();
  const [queue, setQueue] = useState(null);
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [doneCount, setDoneCount] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [typedResult, setTypedResult] = useState(null);   // null | true | false
  const [sentences, setSentences] = useState([]);

  useEffect(() => {
    (async () => setQueue(
      practice ? await buildPracticeQueue(contentDb) : await buildQueue(contentDb)
    ))();
  }, []);

  const entry = queue && idx < queue.length ? queue[idx] : null;

  // load example sentences whenever the answer is revealed on a vocab card
  useEffect(() => {
    let alive = true;
    setSentences([]);
    if (revealed && entry && entry.type === 'vocab') {
      fetchSentences(contentDb, entry.item.id).then(rows => { if (alive) setSentences(rows); });
    }
    return () => { alive = false; };
  }, [revealed, idx]);

  if (!queue) return <Center><ActivityIndicator color={C.shu} size="large" /></Center>;
  if (!entry) {
    return (
      <Center>
        <Text style={{ fontSize: 56 }}>🌸</Text>
        <Text style={[F.h1, { marginTop: 12 }]}>お疲れ様でした！</Text>
        <Text style={[F.sub, { marginTop: 6 }]}>
          {doneCount} {practice ? 'practice cards' : 'reviews'} completed
        </Text>
        <Pressable onPress={onDone} style={[s.gradeBtn, { backgroundColor: C.green, marginTop: 28, paddingHorizontal: 40 }]}>
          <Text style={s.gradeLabel}>Back to home</Text>
        </Pressable>
      </Center>
    );
  }

  const { item, type, typed } = entry;
  const front = type === 'vocab' ? item.expression : item.literal;
  // Always speak a kana reading, never the raw kanji — otherwise the OS TTS may
  // pick a different reading than the one shown (e.g. 開く read ひらく, not あく).
  const speakText = type === 'vocab' ? (item.reading || item.expression) : kanjiSpeakText(item);
  const meanings = type === 'vocab'
    ? item.meaning
    : JSON.parse(item.meanings || '[]').join(', ');
  const intervals = revealed && !practice ? previewIntervals(entry.cardRow) : null;

  function checkTyped() {
    const ans = normalizeKana(typedAnswer);
    const ok = ans.length > 0 && (
      ans === normalizeKana(item.expression) || ans === normalizeKana(item.reading));
    setTypedResult(ok);
    setRevealed(true);
    speak(speakText);
  }

  function advance(requeue) {
    setRevealed(false); setTypedAnswer(''); setTypedResult(null);
    if (requeue) {
      setQueue(q => {
        const copy = [...q];
        copy.splice(Math.min(idx + 1 + 5, copy.length), 0, { ...entry, isNew: false });
        return copy;
      });
    } else {
      setDoneCount(n => n + 1);
    }
    setIdx(i => i + 1);
  }

  async function onGrade(r) {
    if (!practice) await grade(entry, r);
    advance(r === Rating.Again);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: C.washi }}>
      <View style={{ flex: 1, padding: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
          <Text style={F.mono}>{idx + 1} / {queue.length}</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {practice && <Tag text="PRACTICE" color={C.gold} />}
            {typed && <Tag text="✍ TYPE" color={C.shu} />}
            {entry.isNew && <Tag text="NEW" color={C.shu} />}
            <Tag text={`N${item.jlpt}`} color={LEVEL_COLORS[item.jlpt] || C.inkSoft} />
            <Pressable onPress={() => setShowHelp(h => !h)}>
              <Tag text="?" color={C.inkSoft} />
            </Pressable>
          </View>
        </View>

        <Pressable style={s.card} onPress={() => { if (!typed && !revealed) { setRevealed(true); speak(speakText); } }}>
          {typed && !revealed ? (
            // ---- EN → JP typed recall ----
            <View style={{ alignItems: 'center', width: '100%' }}>
              <Text style={[F.sub, { marginBottom: 8 }]}>type this in Japanese</Text>
              <Text style={[F.h1, { textAlign: 'center' }]}>{meanings}</Text>
              <TextInput
                value={typedAnswer}
                onChangeText={setTypedAnswer}
                onSubmitEditing={checkTyped}
                autoFocus autoCorrect={false} autoCapitalize="none"
                placeholder="にほんご…" placeholderTextColor={C.inkSoft}
                style={s.input} returnKeyType="done"
              />
              <Pressable onPress={checkTyped} style={s.checkBtn}>
                <Text style={{ color: '#fff', fontWeight: '700' }}>Check</Text>
              </Pressable>
              <Text style={[F.sub, { marginTop: 10 }]}>kana or kanji both accepted</Text>
            </View>
          ) : (
            <>
              {typed && typedResult !== null && (
                <Text style={{ fontSize: 15, fontWeight: '700', marginBottom: 6, color: typedResult ? C.green : C.shu }}>
                  {typedResult ? '✓ correct' : `✗ you typed: ${typedAnswer || '—'}`}
                </Text>
              )}
              <Text style={[F.display, type === 'kanji' && { fontSize: 110 }]} adjustsFontSizeToFit numberOfLines={1}>
                {front}
              </Text>
              {revealed ? (
                <View style={{ alignItems: 'center', marginTop: 12, width: '100%' }}>
                  {type === 'vocab' && (
                    <>
                      {item.reading !== item.expression && (
                        <Text style={[F.h1, { color: C.shu }]}>{item.reading}</Text>
                      )}
                      <Text style={[F.body, { color: C.inkSoft, marginTop: 2, letterSpacing: 1 }]}>
                        {toRomaji(item.reading)}
                      </Text>
                    </>
                  )}
                  {type === 'kanji' && (
                    <>
                      <ReadingRow label="音" json={item.on_yomi} />
                      <ReadingRow label="訓" json={item.kun_yomi} />
                      <Text style={[F.sub, { marginTop: 6, textAlign: 'center', fontStyle: 'italic' }]}>
                        tap a reading to hear it · 音 on-yomi · 訓 kun-yomi
                      </Text>
                    </>
                  )}
                  {!typed && <Text style={[F.h2, { marginTop: 10, textAlign: 'center' }]}>{EMOJI[item.expression] ? EMOJI[item.expression] + ' ' : ''}{meanings}</Text>}

                  {typed && EMOJI[item.expression] && (
                    <Text style={{ fontSize: 30, marginTop: 6 }}>{EMOJI[item.expression]}</Text>
                  )}
                  {sentences.map((sen, i) => (
                    <Pressable key={i} onPress={() => speak(sen.ja)} style={s.sentence}>
                      <Text style={[F.body, { lineHeight: 24 }]}>{sen.ja} <Text style={{ fontSize: 12 }}>🔊</Text></Text>
                      <Text style={[F.sub, { marginTop: 2 }]}>{sen.en}</Text>
                    </Pressable>
                  ))}

                  <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
                    <Pressable onPress={() => speak(speakText)} style={s.speakBtn}>
                      <Text style={{ fontSize: 22 }}>🔊</Text>
                    </Pressable>
                    <Pressable onPress={() => speak(speakText, { slow: true })} style={s.speakBtn}>
                      <Text style={{ fontSize: 22 }}>🐢</Text>
                    </Pressable>
                  </View>
                </View>
              ) : (
                <Text style={[F.sub, { marginTop: 24 }]}>tap to reveal</Text>
              )}
            </>
          )}
        </Pressable>

        {revealed ? (
          <View style={s.gradeRow}>
            {GRADE_META.map(g => (
              <Pressable key={g.r} onPress={() => onGrade(g.r)}
                style={({ pressed }) => [s.gradeBtn, { backgroundColor: g.color }, pressed && { opacity: 0.8 }]}>
                <Text style={s.gradeLabel} adjustsFontSizeToFit numberOfLines={1}>{g.label}</Text>
                <Text style={s.gradeIvl}>{practice ? ' ' : intervals[g.r]}</Text>
              </Pressable>
            ))}
          </View>
        ) : (
          <View style={{ height: 76 }} />
        )}

        {showHelp && (
          <Pressable style={s.helpOverlay} onPress={() => setShowHelp(false)}>
            <View style={s.helpCard}>
              <Text style={[F.h2, { marginBottom: 10 }]}>How grading works</Text>
              <Text style={[F.sub, { marginBottom: 12, lineHeight: 18 }]}>
                After seeing the answer, tell the app how well you recalled it.
                It schedules the next appearance — the time under each button.
                {practice ? '\n\nPractice mode: grades are NOT saved.' : ''}
              </Text>
              {GRADE_META.map(g => (
                <View key={g.r} style={{ flexDirection: 'row', marginBottom: 8 }}>
                  <Text style={{ color: g.color, fontWeight: '700', width: 96 }}>{g.label}</Text>
                  <Text style={[F.sub, { flex: 1, lineHeight: 17 }]}>{g.help}</Text>
                </View>
              ))}
              <Text style={[F.sub, { marginTop: 6, fontStyle: 'italic' }]}>
                Words speak automatically on reveal · 🔊 repeat · 🐢 slow repeat\n✍ cards ask you to type the Japanese · sentences: tap to hear{'\n'}tap anywhere to close
              </Text>
            </View>
          </Pressable>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

// Strip okurigana/long-mark notation so the audio is a clean kana reading
// (ふた.つ → ふたつ, く.う → くう).
function cleanReading(r) {
  return (r || '').replace(/[.\-]/g, '');
}

// The reading spoken on reveal / via 🔊. Prefer the on-yomi: for a kanji read in
// isolation (especially numbers like 二 → に) the on-reading is the standard
// "name"; the kun-reading (二 → ふた) only applies inside specific words.
function kanjiSpeakText(item) {
  const on = JSON.parse(item.on_yomi || '[]');
  const kun = JSON.parse(item.kun_yomi || '[]');
  return cleanReading(on[0] || kun[0] || item.literal);
}

// A row of individually tappable readings — each speaks exactly its own kana,
// so the audio always matches the label the learner taps.
function ReadingRow({ label, json }) {
  const arr = JSON.parse(json || '[]').slice(0, 4);
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginTop: 4 }}>
      <Text style={[F.body, { color: C.inkSoft, marginRight: 4 }]}>{label}</Text>
      {arr.length === 0
        ? <Text style={[F.body, { color: C.inkSoft }]}>—</Text>
        : arr.map((r, i) => (
            <Pressable key={i} onPress={() => speak(cleanReading(r))} style={s.readingChip}>
              <Text style={{ color: C.ink, fontSize: 15 }}>{r}</Text>
              <Text style={{ color: C.inkSoft, fontSize: 11, marginLeft: 3 }}>{toRomaji(cleanReading(r))}</Text>
              <Text style={{ fontSize: 10, marginLeft: 3 }}>🔊</Text>
            </Pressable>
          ))}
    </View>
  );
}

function Tag({ text, color }) {
  return (
    <View style={{ borderWidth: 1, borderColor: color, borderRadius: 6, paddingHorizontal: 7, paddingVertical: 2 }}>
      <Text style={{ color, fontSize: 11, fontWeight: '700', letterSpacing: 1 }}>{text}</Text>
    </View>
  );
}

function Center({ children }) {
  return <View style={{ flex: 1, backgroundColor: C.washi, alignItems: 'center', justifyContent: 'center' }}>{children}</View>;
}

const s = StyleSheet.create({
  card: {
    flex: 1, marginVertical: 20, backgroundColor: C.card, borderRadius: 22,
    borderWidth: 1, borderColor: C.line, alignItems: 'center', justifyContent: 'center', padding: 20,
  },
  input: {
    marginTop: 18, borderWidth: 1, borderColor: C.line, borderRadius: 12,
    backgroundColor: C.washi, paddingHorizontal: 16, paddingVertical: 12,
    fontSize: 22, color: C.ink, width: '90%', textAlign: 'center',
  },
  checkBtn: {
    marginTop: 14, backgroundColor: C.shu, borderRadius: 12,
    paddingHorizontal: 28, paddingVertical: 10,
  },
  sentence: {
    marginTop: 12, backgroundColor: C.washi, borderRadius: 12,
    borderWidth: 1, borderColor: C.line, padding: 10, width: '100%',
  },
  speakBtn: { backgroundColor: C.shuSoft, borderRadius: 999, padding: 12 },
  readingChip: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: C.washi,
    borderWidth: 1, borderColor: C.line, borderRadius: 8,
    paddingHorizontal: 8, paddingVertical: 4, margin: 3,
  },
  gradeRow: { flexDirection: 'row', gap: 6, marginBottom: 10 },
  gradeBtn: { flex: 1, borderRadius: 14, paddingVertical: 11, alignItems: 'center', paddingHorizontal: 2 },
  gradeLabel: { color: '#fff', fontWeight: '700', fontSize: 13 },
  gradeIvl: { color: '#ffffffcc', fontSize: 11, marginTop: 2 },
  helpOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: '#00000055', justifyContent: 'center', padding: 24,
  },
  helpCard: {
    backgroundColor: C.card, borderRadius: 18, padding: 20,
    borderWidth: 1, borderColor: C.line,
  },
});
