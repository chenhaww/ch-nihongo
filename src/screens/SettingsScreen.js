// src/screens/SettingsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Alert } from 'react-native';
import { C, F } from '../theme';
import { getSetting, setSetting, getUserDb } from '../db';
import { listJapaneseVoices, speak } from '../tts';

export default function SettingsScreen() {
  const [voices, setVoices] = useState([]);
  const [voiceId, setVoiceId] = useState('');
  const [rate, setRate] = useState('0.9');
  const [newPerDay, setNewPerDay] = useState('10');
  const [newTypes, setNewTypes] = useState('both');
  const [register, setRegister] = useState('polite');

  useEffect(() => {
    (async () => {
      setVoices(await listJapaneseVoices());
      setVoiceId(await getSetting('voiceId'));
      setRate(await getSetting('speechRate'));
      setNewPerDay(await getSetting('newPerDay'));
      setNewTypes(await getSetting('newTypes'));
      setRegister(await getSetting('register'));
    })();
  }, []);

  async function save(key, value, setter) {
    setter(value);
    await setSetting(key, value);
  }

  async function pickVoice(v) {
    await save('voiceId', v.identifier, setVoiceId);
    speak('こんにちは。日本語の勉強を頑張りましょう。');
  }

  function resetProgress() {
    Alert.alert('Reset all progress?', 'Deletes every card and review. This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset', style: 'destructive',
        onPress: async () => {
          const udb = getUserDb();
          await udb.execAsync('DELETE FROM reviews; DELETE FROM cards;');
          Alert.alert('Progress reset.');
        },
      },
    ]);
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: C.washi }} contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
      <Text style={[F.h1, { marginTop: 8 }]}>Settings</Text>

      <Section title="Voice">
        <Text style={F.sub}>
          Pick any installed Japanese voice (male and female options vary by device —
          add more under iOS Settings → Accessibility → Spoken Content → Voices → Japanese).
        </Text>
        {voices.length === 0 && (
          <Text style={[F.body, { marginTop: 10, color: C.shu }]}>
            No Japanese voices found — install one in iOS Settings first.
          </Text>
        )}
        {voices.map(v => (
          <Choice key={v.identifier} active={voiceId === v.identifier}
            label={`${v.name}${v.quality === 'Enhanced' ? ' ✦' : ''}`}
            onPress={() => pickVoice(v)} />
        ))}
      </Section>

      <Section title="Speech rate">
        <RowChoices value={rate} options={[['0.45','Very slow'],['0.7','Slow'],['0.9','Normal'],['1.1','Fast']]}
          onPick={v => { save('speechRate', v, setRate); speak('日本語'); }} />
      </Section>

      <Section title="New cards per day">
        <RowChoices value={newPerDay} options={[['5','5'],['10','10'],['20','20'],['30','30']]}
          onPick={v => save('newPerDay', v, setNewPerDay)} />
      </Section>

      <Section title="New card types">
        <RowChoices value={newTypes} options={[['vocab','Vocab'],['kanji','Kanji'],['both','Both']]}
          onPick={v => save('newTypes', v, setNewTypes)} />
      </Section>

      <Section title="Politeness register">
        <Text style={F.sub}>Default register for grammar lessons and example sentences (Phase 3).</Text>
        <RowChoices value={register} options={[['casual','Casual'],['polite','Polite'],['formal','Formal/Keigo']]}
          onPick={v => save('register', v, setRegister)} />
      </Section>

      <Pressable onPress={resetProgress} style={s.danger}>
        <Text style={{ color: C.shu, fontWeight: '700' }}>Reset all progress</Text>
      </Pressable>

      <Text style={[F.sub, { marginTop: 28, lineHeight: 18 }]}>
        Data: JMdict/KANJIDIC2 © EDRDG (CC BY-SA 4.0) · KanjiVG © Ulrich Apel (CC BY-SA 3.0)
        · JLPT lists via elzup/jlpt-word-list · kanji meta via davidluzgouveia/kanji-data.
      </Text>
    </ScrollView>
  );
}

function Section({ title, children }) {
  return (
    <View style={{ marginTop: 24 }}>
      <Text style={[F.h2, { marginBottom: 8 }]}>{title}</Text>
      {children}
    </View>
  );
}

function Choice({ active, label, onPress }) {
  return (
    <Pressable onPress={onPress} style={[s.choice, active && s.choiceActive]}>
      <Text style={{ color: active ? '#fff' : C.ink, fontWeight: '600' }}>{label}</Text>
    </Pressable>
  );
}

function RowChoices({ value, options, onPick }) {
  return (
    <View style={{ flexDirection: 'row', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
      {options.map(([v, label]) => (
        <Pressable key={v} onPress={() => onPick(v)}
          style={[s.pill, value === v && { backgroundColor: C.green, borderColor: C.green }]}>
          <Text style={{ color: value === v ? '#fff' : C.inkSoft, fontWeight: '600' }}>{label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  choice: {
    backgroundColor: C.card, borderWidth: 1, borderColor: C.line, borderRadius: 12,
    padding: 12, marginTop: 8,
  },
  choiceActive: { backgroundColor: C.green, borderColor: C.green },
  pill: {
    borderWidth: 1, borderColor: C.line, borderRadius: 999,
    paddingHorizontal: 16, paddingVertical: 8, backgroundColor: C.card,
  },
  danger: {
    marginTop: 36, borderWidth: 1, borderColor: C.shu, borderRadius: 12,
    padding: 14, alignItems: 'center', backgroundColor: C.shuSoft,
  },
});
