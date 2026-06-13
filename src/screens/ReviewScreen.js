// src/screens/ReviewScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { C, F, LEVEL_COLORS } from '../theme';
import { buildQueue, grade, previewIntervals, Rating } from '../srs';
import { speak } from '../tts';

const GRADE_META = [
  { r: Rating.Again, label: 'Again', color: '#9E2B25' },
  { r: Rating.Hard,  label: 'Hard',  color: '#B8860B' },
  { r: Rating.Good,  label: 'Good',  color: C.green },
  { r: Rating.Easy,  label: 'Easy',  color: '#2F6B8E' },
];

export default function ReviewScreen({ onDone }) {
  const contentDb = useSQLiteContext();
  const [queue, setQueue] = useState(null);
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    (async () => setQueue(await buildQueue(contentDb)))();
  }, []);

  if (!queue) return <Center><ActivityIndicator color={C.shu} size="large" /></Center>;
  if (idx >= queue.length) {
    return (
      <Center>
        <Text style={{ fontSize: 56 }}>🌸</Text>
        <Text style={[F.h1, { marginTop: 12 }]}>お疲れ様でした！</Text>
        <Text style={[F.sub, { marginTop: 6 }]}>{doneCount} reviews completed</Text>
        <Pressable onPress={onDone} style={[s.gradeBtn, { backgroundColor: C.green, marginTop: 28, paddingHorizontal: 40 }]}>
          <Text style={s.gradeLabel}>Back to home</Text>
        </Pressable>
      </Center>
    );
  }

  const entry = queue[idx];
  const { item, type } = entry;
  const front = type === 'vocab' ? item.expression : item.literal;
  const meanings = type === 'vocab'
    ? item.meaning
    : JSON.parse(item.meanings || '[]').join(', ');
  const intervals = revealed ? previewIntervals(entry.cardRow) : null;

  async function onGrade(r) {
    // Again puts the card back later in this session's queue
    await grade(entry, r);
    setRevealed(false);
    if (r === Rating.Again) {
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

  return (
    <View style={{ flex: 1, backgroundColor: C.washi, padding: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
        <Text style={F.mono}>{idx + 1} / {queue.length}</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {entry.isNew && <Tag text="NEW" color={C.shu} />}
          <Tag text={`N${item.jlpt}`} color={LEVEL_COLORS[item.jlpt] || C.inkSoft} />
          <Tag text={type.toUpperCase()} color={C.inkSoft} />
        </View>
      </View>

      <Pressable style={s.card} onPress={() => setRevealed(true)}>
        <Text style={[F.display, type === 'kanji' && { fontSize: 120 }]} adjustsFontSizeToFit numberOfLines={1}>
          {front}
        </Text>
        {revealed ? (
          <View style={{ alignItems: 'center', marginTop: 18 }}>
            {type === 'vocab' && item.reading !== item.expression && (
              <Text style={[F.h1, { color: C.shu }]}>{item.reading}</Text>
            )}
            {type === 'kanji' && (
              <>
                <Text style={[F.body, { color: C.inkSoft }]}>
                  音 {JSON.parse(item.on_yomi || '[]').join('、') || '—'}
                </Text>
                <Text style={[F.body, { color: C.inkSoft, marginTop: 2 }]}>
                  訓 {JSON.parse(item.kun_yomi || '[]').join('、') || '—'}
                </Text>
              </>
            )}
            <Text style={[F.h2, { marginTop: 12, textAlign: 'center' }]}>{meanings}</Text>
            <Pressable onPress={() => speak(type === 'vocab' ? item.expression : front)} style={s.speakBtn}>
              <Text style={{ fontSize: 22 }}>🔊</Text>
            </Pressable>
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
              <Text style={s.gradeIvl}>{intervals[g.r]}</Text>
            </Pressable>
          ))}
        </View>
      ) : (
        <View style={{ height: 76 }} />
      )}
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
    borderWidth: 1, borderColor: C.line, alignItems: 'center', justifyContent: 'center', padding: 24,
  },
  speakBtn: { marginTop: 16, backgroundColor: C.shuSoft, borderRadius: 999, padding: 12 },
  gradeRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  gradeBtn: { flex: 1, borderRadius: 14, paddingVertical: 12, alignItems: 'center' },
  gradeLabel: { color: '#fff', fontWeight: '700', fontSize: 15 },
  gradeIvl: { color: '#ffffffcc', fontSize: 11, marginTop: 2 },
});
