// src/screens/ReviewScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { C, F, LEVEL_COLORS } from '../theme';
import { buildQueue, buildPracticeQueue, grade, previewIntervals, Rating } from '../srs';
import { speak } from '../tts';
import { toRomaji } from '../romaji';

const GRADE_META = [
  { r: Rating.Again, label: 'Again', color: '#9E2B25', help: 'Forgot it — comes back in ~10 minutes, this session.' },
  { r: Rating.Hard,  label: 'Hard',  color: '#B8860B', help: 'Remembered, but it was a real struggle.' },
  { r: Rating.Good,  label: 'Good',  color: C.green,   help: 'Recalled it with normal effort. Your default.' },
  { r: Rating.Easy,  label: 'Easy',  color: '#2F6B8E', help: 'Instant, effortless. Card waits much longer.' },
];

export default function ReviewScreen({ onDone, practice = false }) {
  const contentDb = useSQLiteContext();
  const [queue, setQueue] = useState(null);
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [doneCount, setDoneCount] = useState(0);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    (async () => setQueue(
      practice ? await buildPracticeQueue(contentDb) : await buildQueue(contentDb)
    ))();
  }, []);

  if (!queue) return <Center><ActivityIndicator color={C.shu} size="large" /></Center>;
  if (idx >= queue.length) {
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

  const entry = queue[idx];
  const { item, type } = entry;
  const front = type === 'vocab' ? item.expression : item.literal;
  const speakText = type === 'vocab' ? item.expression : front;
  const meanings = type === 'vocab'
    ? item.meaning
    : JSON.parse(item.meanings || '[]').join(', ');
  const intervals = revealed && !practice ? previewIntervals(entry.cardRow) : null;

  function advance(requeue) {
    setRevealed(false);
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
    if (!practice) await grade(entry, r);   // practice never touches the schedule
    advance(r === Rating.Again);
  }

  return (
    <View style={{ flex: 1, backgroundColor: C.washi, padding: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
        <Text style={F.mono}>{idx + 1} / {queue.length}</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {practice && <Tag text="PRACTICE" color={C.gold} />}
          {entry.isNew && <Tag text="NEW" color={C.shu} />}
          <Tag text={`N${item.jlpt}`} color={LEVEL_COLORS[item.jlpt] || C.inkSoft} />
          <Pressable onPress={() => setShowHelp(h => !h)}>
            <Tag text="?" color={C.inkSoft} />
          </Pressable>
        </View>
      </View>

      <Pressable style={s.card} onPress={() => setRevealed(true)}>
        <Text style={[F.display, type === 'kanji' && { fontSize: 120 }]} adjustsFontSizeToFit numberOfLines={1}>
          {front}
        </Text>
        {revealed ? (
          <View style={{ alignItems: 'center', marginTop: 16 }}>
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
                <Text style={[F.body, { color: C.inkSoft, textAlign: 'center' }]}>
                  音 {readingLine(item.on_yomi)}
                </Text>
                <Text style={[F.body, { color: C.inkSoft, marginTop: 2, textAlign: 'center' }]}>
                  訓 {readingLine(item.kun_yomi)}
                </Text>
              </>
            )}
            <Text style={[F.h2, { marginTop: 12, textAlign: 'center' }]}>{meanings}</Text>
            <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
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
      </Pressable>

      {revealed ? (
        <View style={s.gradeRow}>
          {GRADE_META.map(g => (
            <Pressable key={g.r} onPress={() => onGrade(g.r)}
              style={({ pressed }) => [s.gradeBtn, { backgroundColor: g.color }, pressed && { opacity: 0.8 }]}>
              <Text style={s.gradeLabel}>{g.label}</Text>
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
              After revealing, tell the app how well you remembered. It schedules
              the card's next appearance — the time shown under each button.
              {practice ? '\n\nPractice mode: grades are NOT saved.' : ''}
            </Text>
            {GRADE_META.map(g => (
              <View key={g.r} style={{ flexDirection: 'row', marginBottom: 8 }}>
                <Text style={{ color: g.color, fontWeight: '700', width: 56 }}>{g.label}</Text>
                <Text style={[F.sub, { flex: 1, lineHeight: 17 }]}>{g.help}</Text>
              </View>
            ))}
            <Text style={[F.sub, { marginTop: 6, fontStyle: 'italic' }]}>
              🔊 normal speed · 🐢 slow · tap anywhere to close
            </Text>
          </View>
        </Pressable>
      )}
    </View>
  );
}

function readingLine(jsonArr) {
  const arr = JSON.parse(jsonArr || '[]');
  if (!arr.length) return '—';
  return arr.slice(0, 4).map(r => `${r} (${toRomaji(r)})`).join('、');
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
    borderWidth: 1, borderColor: C.line, alignItems: 'center', justifyContent: 'center', padding: 24,
  },
  speakBtn: { backgroundColor: C.shuSoft, borderRadius: 999, padding: 12 },
  gradeRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  gradeBtn: { flex: 1, borderRadius: 14, paddingVertical: 12, alignItems: 'center' },
  gradeLabel: { color: '#fff', fontWeight: '700', fontSize: 15 },
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
