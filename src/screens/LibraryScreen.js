// src/screens/LibraryScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { C, F, LEVEL_COLORS } from '../theme';
import { searchVocab } from '../db';
import { speak } from '../tts';

export default function LibraryScreen() {
  const contentDb = useSQLiteContext();
  const [mode, setMode] = useState('vocab');   // vocab | kanji
  const [level, setLevel] = useState(5);
  const [query, setQuery] = useState('');
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      let data;
      if (query.trim()) {
        data = mode === 'vocab'
          ? await searchVocab(contentDb, query)
          : await contentDb.getAllAsync(
              `SELECT id, literal, jlpt, meanings, on_yomi, kun_yomi FROM kanji
               WHERE literal LIKE ? OR meanings LIKE ? LIMIT 30`,
              `%${query.trim()}%`, `%${query.trim()}%`);
      } else if (mode === 'vocab') {
        data = await contentDb.getAllAsync(
          'SELECT * FROM vocab WHERE jlpt = ? ORDER BY id LIMIT 200', level);
      } else {
        data = await contentDb.getAllAsync(
          `SELECT id, literal, jlpt, meanings, on_yomi, kun_yomi FROM kanji
           WHERE jlpt = ? ORDER BY COALESCE(freq, 99999) LIMIT 200`, level);
      }
      if (alive) setRows(data);
    })();
    return () => { alive = false; };
  }, [mode, level, query]);

  return (
    <View style={{ flex: 1, backgroundColor: C.washi, padding: 20, paddingBottom: 0 }}>
      <Text style={[F.h1, { marginTop: 8 }]}>Library</Text>

      <View style={{ flexDirection: 'row', gap: 8, marginTop: 14 }}>
        {['vocab', 'kanji'].map(m => (
          <Pill key={m} active={mode === m} label={m} onPress={() => setMode(m)} />
        ))}
      </View>

      <TextInput
        placeholder="Search (日本語 or English)…"
        placeholderTextColor={C.inkSoft}
        value={query} onChangeText={setQuery}
        style={s.search} autoCorrect={false}
      />

      {!query.trim() && (
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 10 }}>
          {[5, 4, 3, 2, 1].map(l => (
            <Pill key={l} active={level === l} label={`N${l}`}
              color={LEVEL_COLORS[l]} onPress={() => setLevel(l)} />
          ))}
        </View>
      )}

      <FlatList
        data={rows}
        keyExtractor={r => `${mode}-${r.id}`}
        renderItem={({ item }) => <Row item={item} mode={mode} />}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

function Row({ item, mode }) {
  const main = mode === 'vocab' ? item.expression : item.literal;
  const sub = mode === 'vocab'
    ? `${item.reading !== item.expression ? item.reading + ' · ' : ''}${item.meaning}`
    : `${JSON.parse(item.meanings || '[]').slice(0, 3).join(', ')}`;
  return (
    <Pressable onPress={() => speak(main)} style={s.row}>
      <Text style={[F.h1, { fontWeight: '500', minWidth: 64 }]}>{main}</Text>
      <Text style={[F.sub, { flex: 1, marginLeft: 12 }]} numberOfLines={2}>{sub}</Text>
      <Text style={{ color: LEVEL_COLORS[item.jlpt] || C.inkSoft, fontWeight: '700', fontSize: 12 }}>
        N{item.jlpt}
      </Text>
    </Pressable>
  );
}

function Pill({ active, label, onPress, color = C.ink }) {
  return (
    <Pressable onPress={onPress}
      style={[s.pill, active && { backgroundColor: color, borderColor: color }]}>
      <Text style={{ color: active ? '#fff' : C.inkSoft, fontWeight: '600', fontSize: 13 }}>
        {label.toUpperCase()}
      </Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  search: {
    backgroundColor: C.card, borderWidth: 1, borderColor: C.line, borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 10, marginVertical: 12, color: C.ink, fontSize: 16,
  },
  pill: {
    borderWidth: 1, borderColor: C.line, borderRadius: 999,
    paddingHorizontal: 14, paddingVertical: 6, backgroundColor: C.card,
  },
  row: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: C.card,
    borderWidth: 1, borderColor: C.line, borderRadius: 12, padding: 12, marginBottom: 8,
  },
});
