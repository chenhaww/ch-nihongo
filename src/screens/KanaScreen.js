// src/screens/KanaScreen.js — hiragana/katakana charts + words per kana
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { C, F, LEVEL_COLORS } from '../theme';
import { speak } from '../tts';
import { toRomaji } from '../romaji';

// gojūon layout: '' = empty cell to keep the grid aligned
const BASIC = [
  ['あ','い','う','え','お'],
  ['か','き','く','け','こ'],
  ['さ','し','す','せ','そ'],
  ['た','ち','つ','て','と'],
  ['な','に','ぬ','ね','の'],
  ['は','ひ','ふ','へ','ほ'],
  ['ま','み','む','め','も'],
  ['や','','ゆ','','よ'],
  ['ら','り','る','れ','ろ'],
  ['わ','','','','を'],
  ['ん','','','',''],
];
const DAKUTEN = [
  ['が','ぎ','ぐ','げ','ご'],
  ['ざ','じ','ず','ぜ','ぞ'],
  ['だ','ぢ','づ','で','ど'],
  ['ば','び','ぶ','べ','ぼ'],
  ['ぱ','ぴ','ぷ','ぺ','ぽ'],
];
const YOON = [
  ['きゃ','きゅ','きょ'], ['しゃ','しゅ','しょ'], ['ちゃ','ちゅ','ちょ'],
  ['にゃ','にゅ','にょ'], ['ひゃ','ひゅ','ひょ'], ['みゃ','みゅ','みょ'],
  ['りゃ','りゅ','りょ'], ['ぎゃ','ぎゅ','ぎょ'], ['じゃ','じゅ','じょ'],
  ['びゃ','びゅ','びょ'], ['ぴゃ','ぴゅ','ぴょ'],
];

const toKata = s => s.replace(/[\u3041-\u3096]/g,
  ch => String.fromCharCode(ch.charCodeAt(0) + 0x60));
const toHira = s => s.replace(/[\u30a1-\u30f6]/g,
  ch => String.fromCharCode(ch.charCodeAt(0) - 0x60));

export default function KanaScreen() {
  const contentDb = useSQLiteContext();
  const [script, setScript] = useState('hira');   // hira | kata
  const [selected, setSelected] = useState(null);   // always the HIRAGANA form
  const [selectedShown, setSelectedShown] = useState(null); // as displayed
  const [words, setWords] = useState([]);

  const conv = k => (script === 'kata' ? toKata(k) : k);

  useEffect(() => {
    let alive = true;
    if (!selected) { setWords([]); return; }
    (async () => {
      // Search by hiragana (covers most readings) AND the katakana form
      // (for loanwords stored with katakana readings).
      const kata = toKata(selected);
      const rows = await contentDb.getAllAsync(
        `SELECT * FROM vocab WHERE reading LIKE ? OR reading LIKE ?
         ORDER BY jlpt DESC, id LIMIT 80`,
        selected + '%', kata + '%');
      if (alive) setWords(rows);
    })();
    return () => { alive = false; };
  }, [selected]);

  function tapKana(k) {
    if (!k) return;
    // k is in the displayed script; store hiragana base for searching
    const hira = script === 'kata' ? toHira(k) : k;
    setSelected(hira);
    setSelectedShown(k);
    speak(k, { slow: true });
  }

  const Header = (
    <View>
      <Text style={[F.h1, { marginTop: 8 }]}>かな</Text>
      <View style={{ flexDirection: 'row', gap: 8, marginTop: 12, marginBottom: 4 }}>
        {[['hira', 'ひらがな'], ['kata', 'カタカナ']].map(([v, label]) => (
          <Pressable key={v}
            onPress={() => { setScript(v); setSelected(null); }}
            style={[st.pill, script === v && { backgroundColor: C.green, borderColor: C.green }]}>
            <Text style={{ color: script === v ? '#fff' : C.inkSoft, fontWeight: '600' }}>{label}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={[F.sub, { marginBottom: 8 }]}>tap a kana to hear it and see words that start with it</Text>

      <Grid rows={BASIC} conv={conv} selected={selected} toHira={toHira} script={script} onTap={tapKana} cols={5} />
      <Text style={[F.h2, { marginTop: 14, marginBottom: 6 }]}>゛゜ dakuten</Text>
      <Grid rows={DAKUTEN} conv={conv} selected={selected} toHira={toHira} script={script} onTap={tapKana} cols={5} />
      <Text style={[F.h2, { marginTop: 14, marginBottom: 6 }]}>ゃゅょ combinations</Text>
      <Grid rows={YOON} conv={conv} selected={selected} toHira={toHira} script={script} onTap={tapKana} cols={3} />

      {selected && (
        <View style={st.resultHeader}>
          <Text style={[F.h2, { color: C.shu }]}>
            {selectedShown} ({toRomaji(selected)})
          </Text>
          <Text style={F.sub}>
            {words.length
              ? `${words.length} word${words.length > 1 ? 's' : ''} starting with this kana ↓`
              : 'no words start with this kana'}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: C.washi }}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      ListHeaderComponent={Header}
      data={words}
      keyExtractor={r => String(r.id)}
      renderItem={({ item }) => (
        <Pressable onPress={() => speak(item.expression)} style={st.row}>
          <View style={{ minWidth: 80 }}>
            <Text style={[F.h2, { fontWeight: '500' }]}>{item.expression}</Text>
            {item.reading !== item.expression && <Text style={F.sub}>{item.reading}</Text>}
          </View>
          <Text style={[F.sub, { flex: 1, marginLeft: 10 }]} numberOfLines={2}>{item.meaning}</Text>
          <Text style={{ color: LEVEL_COLORS[item.jlpt] || C.inkSoft, fontWeight: '700', fontSize: 12 }}>
            N{item.jlpt}
          </Text>
        </Pressable>
      )}
    />
  );
}

function Grid({ rows, conv, selected, toHira, script, onTap, cols }) {
  return (
    <View>
      {rows.map((row, ri) => (
        <View key={ri} style={{ flexDirection: 'row', gap: 6, marginBottom: 6 }}>
          {row.map((k, ci) => {
            const kk = k ? conv(k) : '';
            const base = kk ? (script === 'kata' ? toHira(kk) : kk) : '';
            const active = base && selected === base;
            return (
              <Pressable key={ci} onPress={() => onTap(kk)} disabled={!kk}
                style={[st.cell, { flex: 1 }, !kk && { opacity: 0 },
                  active && { backgroundColor: C.shu, borderColor: C.shu }]}>
                <Text style={{ fontSize: cols === 3 ? 20 : 24, color: active ? '#fff' : C.ink }}>{kk}</Text>
                {!!kk && (
                  <Text style={{ fontSize: 10, color: active ? '#ffffffcc' : C.inkSoft }}>
                    {toRomaji(kk)}
                  </Text>
                )}
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const st = StyleSheet.create({
  pill: {
    borderWidth: 1, borderColor: C.line, borderRadius: 999,
    paddingHorizontal: 16, paddingVertical: 8, backgroundColor: C.card,
  },
  cell: {
    backgroundColor: C.card, borderWidth: 1, borderColor: C.line, borderRadius: 10,
    alignItems: 'center', paddingVertical: 8,
  },
  resultHeader: {
    marginTop: 18, marginBottom: 8, paddingTop: 14,
    borderTopWidth: 1, borderTopColor: C.line,
  },
  row: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: C.card,
    borderWidth: 1, borderColor: C.line, borderRadius: 12, padding: 12, marginBottom: 8,
  },
});
