// src/screens/ReferenceScreen.js — groups kana, particles, dictionary under one tab.
import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { C } from '../theme';
import KanaScreen from './KanaScreen';
import ParticlesScreen from './ParticlesScreen';
import LibraryScreen from './LibraryScreen';

const SUB = [
  { key: 'kana', label: 'かな' },
  { key: 'particles', label: '助詞' },
  { key: 'dict', label: '辞書' },
];

export default function ReferenceScreen() {
  const [sub, setSub] = useState('kana');
  return (
    <View style={{ flex: 1, backgroundColor: C.washi }}>
      <View style={st.bar}>
        {SUB.map(s => (
          <Pressable key={s.key} onPress={() => setSub(s.key)}
            style={[st.tab, sub === s.key && st.tabActive]}>
            <Text style={[st.tabText, sub === s.key && { color: C.ink, fontWeight: '700' }]}>
              {s.label}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={{ flex: 1 }}>
        {sub === 'kana' && <KanaScreen />}
        {sub === 'particles' && <ParticlesScreen />}
        {sub === 'dict' && <LibraryScreen />}
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  bar: {
    flexDirection: 'row', backgroundColor: C.card,
    borderBottomWidth: 1, borderBottomColor: C.line,
  },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 11 },
  tabActive: { borderBottomWidth: 2, borderBottomColor: C.shu },
  tabText: { fontSize: 14, color: C.inkSoft },
});
