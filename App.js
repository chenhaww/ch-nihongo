// App.js — Kado Nihongo root
import React, { Suspense, useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, SafeAreaView, Platform, StatusBar } from 'react-native';
import { SQLiteProvider } from 'expo-sqlite';
import { initUserDb } from './src/db';
import { initGrammarTable } from './src/grammar';
import { C } from './src/theme';
import HomeScreen from './src/screens/HomeScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import GrammarScreen from './src/screens/GrammarScreen';
import ReferenceScreen from './src/screens/ReferenceScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const TABS = [
  { key: 'home', label: '今日', icon: '⛩' },
  { key: 'grammar', label: '文法', icon: '✏️' },
  { key: 'reference', label: '辞書', icon: '📖' },
  { key: 'settings', label: '設定', icon: '⚙' },
];

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <SQLiteProvider
        databaseName="japanese-content.db"
        assetSource={{ assetId: require('./assets/japanese-content.db') }}
        useSuspense>
        <Root />
      </SQLiteProvider>
    </Suspense>
  );
}

function Root() {
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState('home');
  const [reviewing, setReviewing] = useState(null);   // null | 'review' | 'practice'
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    (async () => { await initUserDb(); await initGrammarTable(); setReady(true); })();
  }, []);
  if (!ready) return <Loading />;

  return (
    <SafeAreaView style={s.safe}>
      <View style={{ flex: 1 }}>
        {reviewing ? (
          <ReviewScreen
            practice={reviewing === 'practice'}
            onDone={() => { setReviewing(null); setRefreshKey(k => k + 1); }} />
        ) : (
          <>
            {tab === 'home' && (
              <HomeScreen
                onStartReview={(practice) => setReviewing(practice ? 'practice' : 'review')}
                onGoGrammar={() => setTab('grammar')}
                refreshKey={refreshKey} />
            )}
            {tab === 'grammar' && <GrammarScreen />}
            {tab === 'reference' && <ReferenceScreen />}
            {tab === 'settings' && <SettingsScreen />}
          </>
        )}
      </View>
      {!reviewing && (
        <View style={s.tabBar}>
          {TABS.map(t => (
            <Pressable key={t.key} onPress={() => setTab(t.key)} style={s.tabBtn}>
              <Text style={{ fontSize: 20, opacity: tab === t.key ? 1 : 0.45 }}>{t.icon}</Text>
              <Text style={[s.tabLabel, tab === t.key && { color: C.ink, fontWeight: '700' }]}>
                {t.label}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

function Loading() {
  return (
    <View style={[s.safe, { alignItems: 'center', justifyContent: 'center' }]}>
      <ActivityIndicator size="large" color={C.shu} />
      <Text style={{ marginTop: 14, color: C.inkSoft }}>Preparing dictionary…</Text>
    </View>
  );
}

const s = StyleSheet.create({
  safe: {
    flex: 1, backgroundColor: C.washi,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  tabBar: {
    flexDirection: 'row', borderTopWidth: 1, borderTopColor: C.line,
    backgroundColor: C.card, paddingBottom: 6,
  },
  tabBtn: { flex: 1, alignItems: 'center', paddingVertical: 8 },
  tabLabel: { fontSize: 11, color: C.inkSoft, marginTop: 2 },
});
