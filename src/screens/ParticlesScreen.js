// src/screens/ParticlesScreen.js
import React, { useState } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import { C, F } from '../theme';
import { speak } from '../tts';
import { PARTICLES } from '../particles';

export default function ParticlesScreen() {
  const [open, setOpen] = useState(null);

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: C.washi }}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      ListHeaderComponent={
        <View>
          <Text style={[F.h1, { marginTop: 8 }]}>助詞 — Particles</Text>
          <Text style={[F.sub, { marginTop: 4, marginBottom: 12 }]}>
            The 15 core particles. Tap one to expand — examples speak when tapped.
          </Text>
        </View>
      }
      data={PARTICLES}
      keyExtractor={item => item.p}
      renderItem={({ item }) => {
        const isOpen = open === item.p;
        return (
          <Pressable onPress={() => setOpen(isOpen ? null : item.p)} style={st.card}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={st.particle}>{item.p}</Text>
              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={F.h2}>{item.name}</Text>
                <Text style={[F.sub, { letterSpacing: 1 }]}>{item.romaji}</Text>
              </View>
              <Text style={{ color: C.inkSoft, fontSize: 18 }}>{isOpen ? '−' : '+'}</Text>
            </View>

            {isOpen && (
              <View style={{ marginTop: 12 }}>
                <Text style={[F.body, { lineHeight: 22 }]}>{item.note}</Text>

                {item.examples.map((ex, i) => (
                  <Pressable key={i} onPress={() => speak(ex[1])} style={st.example}>
                    <Text style={[F.body, { lineHeight: 24 }]}>
                      {ex[0]} <Text style={{ fontSize: 12 }}>🔊</Text>
                    </Text>
                    <Text style={[F.sub, { marginTop: 1 }]}>{ex[2]}</Text>
                  </Pressable>
                ))}

                <View style={st.confusionBox}>
                  <Text style={st.confusionLabel}>⚠ COMMON CONFUSION</Text>
                  <Text style={[F.sub, { lineHeight: 19, color: C.ink }]}>{item.confusion}</Text>
                </View>
              </View>
            )}
          </Pressable>
        );
      }}
    />
  );
}

const st = StyleSheet.create({
  card: {
    backgroundColor: C.card, borderWidth: 1, borderColor: C.line,
    borderRadius: 14, padding: 14, marginBottom: 10,
  },
  particle: {
    fontSize: 40, color: C.shu, fontWeight: '500',
    minWidth: 56, textAlign: 'center',
  },
  example: {
    backgroundColor: C.washi, borderRadius: 10, borderWidth: 1, borderColor: C.line,
    padding: 10, marginTop: 8,
  },
  confusionBox: {
    backgroundColor: C.greenSoft, borderRadius: 10, padding: 11, marginTop: 12,
  },
  confusionLabel: {
    fontSize: 10, fontWeight: '700', color: C.green, letterSpacing: 1, marginBottom: 4,
  },
});
