// src/screens/HomeScreen.js
import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { C, F, LEVEL_COLORS } from '../theme';
import { todayStats } from '../srs';
import { levelProgress, streakDays } from '../db';
import { dueCount as grammarDue, studiedCount as grammarStudied } from '../grammar';

export default function HomeScreen({ onStartReview, onGoGrammar, refreshKey }) {
  const contentDb = useSQLiteContext();
  const [stats, setStats] = useState(null);
  const [progress, setProgress] = useState(null);
  const [streak, setStreak] = useState(0);
  const [gram, setGram] = useState({ due: 0, studied: 0 });

  React.useEffect(() => {
    let alive = true;
    (async () => {
      const s = await todayStats(contentDb);
      const p = await levelProgress(contentDb);
      const st = await streakDays();
      const gd = await grammarDue();
      const gs = await grammarStudied();
      if (alive) { setStats(s); setProgress(p); setStreak(st); setGram({ due: gd, studied: gs }); }
    })();
    return () => { alive = false; };
  }, [refreshKey]);

  const total = stats ? stats.due + stats.newRemaining : 0;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: C.washi }} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
      <Text style={[F.mono, { marginTop: 8 }]}>KADO 日本語</Text>
      <Text style={[F.h1, { marginTop: 4 }]}>今日の勉強</Text>

      <View style={s.row}>
        <View style={s.stat}>
          <Text style={s.statNum}>{stats ? stats.due : '–'}</Text>
          <Text style={F.sub}>due reviews</Text>
        </View>
        <View style={s.stat}>
          <Text style={s.statNum}>{stats ? stats.newRemaining : '–'}</Text>
          <Text style={F.sub}>new cards</Text>
        </View>
        <View style={s.stat}>
          <Text style={[s.statNum, { color: C.gold }]}>{streak}</Text>
          <Text style={F.sub}>day streak</Text>
        </View>
      </View>

      <Pressable
        onPress={() => onStartReview(false)}
        disabled={total === 0}
        style={({ pressed }) => [s.cta, total === 0 && { opacity: 0.35 }, pressed && { opacity: 0.8 }]}>
        <Text style={s.ctaText}>
          {total === 0 ? 'All done for today 🎉' : `Start review (${total})`}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => onStartReview(true)}
        style={({ pressed }) => [s.practiceBtn, pressed && { opacity: 0.7 }]}>
        <Text style={s.practiceText}>Practice today's cards again (doesn't affect schedule)</Text>
      </Pressable>

      <Pressable onPress={onGoGrammar}
        style={({ pressed }) => [s.grammarCard, pressed && { opacity: 0.85 }]}>
        <View style={{ flex: 1 }}>
          <Text style={[F.h2, { color: C.green }]}>文法 Grammar</Text>
          <Text style={F.sub}>
            {gram.due > 0
              ? `${gram.due} lesson${gram.due > 1 ? 's' : ''} ready to review`
              : gram.studied > 0
                ? 'All grammar reviewed — learn a new point'
                : 'Start the N5 grammar course'}
          </Text>
        </View>
        {gram.due > 0 && <View style={s.badge}><Text style={s.badgeText}>{gram.due}</Text></View>}
        <Text style={{ color: C.inkSoft, fontSize: 20, marginLeft: 8 }}>›</Text>
      </Pressable>

      <Text style={[F.h2, { marginTop: 32, marginBottom: 12 }]}>JLPT progress</Text>
      {progress && [5, 4, 3, 2, 1].map(lvl => (
        <LevelBar key={lvl} lvl={lvl} progress={progress} />
      ))}
      <Text style={[F.sub, { marginTop: 16 }]}>
        {stats ? `${stats.reviewed} reviews done today` : ''}
      </Text>
    </ScrollView>
  );
}

function LevelBar({ lvl, progress }) {
  const v = { done: progress.learned.vocab[lvl], total: progress.totals.vocab[lvl] };
  const k = { done: progress.learned.kanji[lvl], total: progress.totals.kanji[lvl] };
  const pct = x => x.total ? Math.round(100 * x.done / x.total) : 0;
  return (
    <View style={{ marginBottom: 14 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={[F.h2, { color: LEVEL_COLORS[lvl] }]}>N{lvl}</Text>
        <Text style={F.sub}>vocab {v.done}/{v.total} · kanji {k.done}/{k.total}</Text>
      </View>
      <Bar pct={pct(v)} color={LEVEL_COLORS[lvl]} />
      <Bar pct={pct(k)} color={LEVEL_COLORS[lvl]} faded />
    </View>
  );
}

function Bar({ pct, color, faded }) {
  return (
    <View style={[s.barTrack, { marginTop: 4 }]}>
      <View style={[s.barFill, { width: `${pct}%`, backgroundColor: color, opacity: faded ? 0.45 : 1 }]} />
    </View>
  );
}

const s = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12, marginTop: 20 },
  stat: { flex: 1, backgroundColor: C.card, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: C.line },
  statNum: { fontSize: 28, fontWeight: '700', color: C.ink },
  cta: { marginTop: 24, backgroundColor: C.shu, borderRadius: 16, paddingVertical: 18, alignItems: 'center' },
  ctaText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  practiceBtn: {
    marginTop: 10, borderRadius: 14, paddingVertical: 12, alignItems: 'center',
    borderWidth: 1, borderColor: C.line, backgroundColor: C.card,
  },
  practiceText: { color: C.inkSoft, fontSize: 13, fontWeight: '600' },
  grammarCard: {
    marginTop: 12, backgroundColor: C.greenSoft, borderRadius: 14,
    padding: 16, flexDirection: 'row', alignItems: 'center',
  },
  badge: {
    backgroundColor: C.green, borderRadius: 999, minWidth: 26, height: 26,
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 7,
  },
  badgeText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  barTrack: { height: 7, backgroundColor: C.line, borderRadius: 4, overflow: 'hidden' },
  barFill: { height: 7, borderRadius: 4 },
});
