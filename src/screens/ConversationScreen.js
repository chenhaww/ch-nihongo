// src/screens/ConversationScreen.js — situational dialogue practice (prototype).
// Pick the most natural reply each turn; hear the clerk and the model reply.
// Offline: all content from src/conversation. Mirrors the grammar quiz UX.
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View, Text, Pressable, ScrollView, StyleSheet,
  TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { C, F, LEVEL_COLORS } from '../theme';
import { speak } from '../tts';
import { toRomaji, normalizeKana } from '../romaji';
import { SCENARIOS, allScenarioProgress, recordScenario } from '../conversation';

export default function ConversationScreen() {
  const [active, setActive] = useState(null);
  const [progress, setProgress] = useState({});

  const refresh = useCallback(async () => setProgress(await allScenarioProgress()), []);
  useEffect(() => { refresh(); }, []);

  if (active) return <Dialogue scenario={active} onExit={() => { setActive(null); refresh(); }} />;

  return (
    <View style={{ flex: 1, backgroundColor: C.washi, padding: 20, paddingBottom: 0 }}>
      <Text style={[F.h1, { marginTop: 8 }]}>会話 — Situations</Text>
      <Text style={[F.sub, { marginTop: 6, lineHeight: 19 }]}>
        Role-play real settings. Pick the most natural reply for the register — the way you'd
        actually say it to a clerk, a friend, or a boss.
      </Text>
      <ScrollView contentContainerStyle={{ paddingVertical: 16, paddingBottom: 30 }}>
        {SCENARIOS.map(sc => {
          const pr = progress[sc.id];
          const pct = pr ? Math.round(100 * pr.best_ratio) : null;
          const mastered = pr && pr.best_ratio >= 1;
          return (
            <Pressable key={sc.id} onPress={() => setActive(sc)} style={st.card}>
              <Text style={{ fontSize: 30 }}>{sc.emoji}</Text>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={F.h2}>{sc.setting} · {sc.settingEn}</Text>
                <Text style={[F.sub, { marginTop: 2, lineHeight: 18 }]} numberOfLines={2}>{sc.goal}</Text>
                {pct !== null && (
                  <Text style={{ marginTop: 4, fontSize: 12, fontWeight: '700', color: mastered ? C.green : C.gold }}>
                    {mastered ? '★ mastered' : `best ${pct}% natural`}
                  </Text>
                )}
              </View>
              <View style={[st.levelTag, { backgroundColor: LEVEL_COLORS[sc.level] }]}>
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 11 }}>N{sc.level}</Text>
              </View>
            </Pressable>
          );
        })}
        <Text style={[F.sub, { textAlign: 'center', marginTop: 18, lineHeight: 18 }]}>
          More settings coming: airport, bank, asking a favor…
        </Text>
      </ScrollView>
    </View>
  );
}

function Dialogue({ scenario, onExit }) {
  // Turns are navigated by reference. A scenario is "branching" when any option
  // carries a `goto` (a turn id, or 'end'); otherwise it advances linearly.
  const turnsById = useMemo(() => {
    const m = {};
    scenario.turns.forEach((t, idx) => { m[t.id ?? idx] = t; });
    return m;
  }, [scenario]);
  const branching = useMemo(
    () => scenario.turns.some(t => t.options.some(o => o.goto)), [scenario]);

  const [started, setStarted] = useState(false);
  const [typedMode, setTypedMode] = useState(false);
  const [cur, setCur] = useState(scenario.turns[0]);
  const [step, setStep] = useState(1);
  const [picked, setPicked] = useState(null);      // tap mode: chosen option index
  const [typed, setTyped] = useState('');          // typed mode: input
  const [typedRes, setTypedRes] = useState(null);  // typed mode: { natural, credited }
  const [routeOpt, setRouteOpt] = useState(null);  // option whose goto we follow
  const [natural, setNatural] = useState(0);        // first-try natural replies
  const [asked, setAsked] = useState(0);            // turns answered (denominator)
  const [done, setDone] = useState(false);

  const turn = cur;
  const answered = picked !== null || typedRes !== null;

  // Auto-speak the other party's line when a new turn appears.
  useEffect(() => {
    if (started && !done && turn?.npc?.[1]) speak(turn.npc[1]);
  }, [cur, started, done]);

  // Persist the run when it completes (best natural ratio over turns answered).
  useEffect(() => {
    if (done) recordScenario(scenario.id, asked ? natural / asked : 0);
  }, [done]);

  function reset() {
    setStarted(false); setCur(scenario.turns[0]); setStep(1); setPicked(null);
    setTyped(''); setTypedRes(null); setRouteOpt(null);
    setNatural(0); setAsked(0); setDone(false);
  }

  // Resolve and move to the next turn, following the routing option's `goto`,
  // else the natural option's goto, else linear order; 'end' finishes the run.
  function advance() {
    setAsked(c => c + 1);
    const router = (routeOpt && routeOpt.goto)
      ? routeOpt
      : (turn.options.find(o => o.ok && o.goto) || null);
    const g = router?.goto;
    if (g === 'end') { setDone(true); return; }
    if (g && turnsById[g]) {
      setCur(turnsById[g]); setStep(s => s + 1);
      setPicked(null); setTyped(''); setTypedRes(null); setRouteOpt(null);
      return;
    }
    const idx = scenario.turns.indexOf(turn);
    if (idx + 1 < scenario.turns.length) {
      setCur(scenario.turns[idx + 1]); setStep(s => s + 1);
      setPicked(null); setTyped(''); setTypedRes(null); setRouteOpt(null);
    } else setDone(true);
  }

  if (!started) {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: C.washi }} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <Pressable onPress={onExit}><Text style={[F.sub, { marginTop: 6 }]}>‹ back to situations</Text></Pressable>
        <Text style={{ fontSize: 44, marginTop: 14 }}>{scenario.emoji}</Text>
        <Text style={[F.h1, { marginTop: 8 }]}>{scenario.setting} · {scenario.settingEn}</Text>
        <View style={st.goalBox}>
          <Text style={st.goalLabel}>YOUR GOAL</Text>
          <Text style={[F.body, { lineHeight: 22 }]}>{scenario.goal}</Text>
        </View>
        <Text style={[F.body, { lineHeight: 23, marginTop: 16 }]}>{scenario.intro}</Text>

        <Text style={[F.mono, { marginTop: 20, marginBottom: 8 }]}>MODE</Text>
        <View style={st.modeRow}>
          <Pressable onPress={() => setTypedMode(false)} style={[st.modePill, !typedMode && st.modePillOn]}>
            <Text style={[st.modePillText, !typedMode && { color: '#fff' }]}>Tap replies</Text>
          </Pressable>
          <Pressable onPress={() => setTypedMode(true)} style={[st.modePill, typedMode && st.modePillOn]}>
            <Text style={[st.modePillText, typedMode && { color: '#fff' }]}>Type replies · challenge</Text>
          </Pressable>
        </View>
        <Text style={[F.sub, { marginTop: 8, lineHeight: 18 }]}>
          {typedMode
            ? 'Produce the reply yourself — type a natural line in Japanese (needs a JP keyboard). Harder, but it’s real output practice.'
            : 'Choose the most natural reply from a few options.'}
        </Text>

        <Pressable onPress={() => setStarted(true)} style={st.primaryBtn}>
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>Start the conversation</Text>
        </Pressable>
      </ScrollView>
    );
  }

  if (done) {
    const total = asked;
    const allNatural = total > 0 && natural === total;
    return (
      <View style={{ flex: 1, backgroundColor: C.washi, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Text style={{ fontSize: 52 }}>{allNatural ? '🎉' : '🗣'}</Text>
        <Text style={[F.h1, { marginTop: 10 }]}>{natural} / {total} natural</Text>
        <Text style={[F.sub, { marginTop: 4 }]}>{typedMode ? 'typed challenge' : 'tap mode'}</Text>
        <Text style={[F.sub, { marginTop: 8, textAlign: 'center', lineHeight: 20 }]}>{scenario.outro}</Text>
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 26 }}>
          <Pressable onPress={reset} style={[st.primaryBtn, { marginTop: 0, paddingHorizontal: 24 }]}>
            <Text style={{ color: '#fff', fontWeight: '700' }}>Try again</Text>
          </Pressable>
          <Pressable onPress={onExit} style={[st.secondaryBtn]}>
            <Text style={{ color: C.ink, fontWeight: '700' }}>Done</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const chosen = picked !== null ? turn.options[picked] : null;
  const naturalOpts = turn.options.filter(o => o.ok);   // accepted/model replies
  const model = naturalOpts[0];

  function pick(idx) {
    if (answered) return;
    const opt = turn.options[idx];
    setPicked(idx);
    setRouteOpt(opt);                 // a chosen branch follows its own goto
    if (opt.ok) {
      setNatural(n => n + 1);
      if (opt.kana) speak(opt.kana);
    } else if (model?.kana) {
      speak(model.kana);   // hear how to say it naturally instead
    }
  }

  function checkTyped() {
    if (answered) return;
    const ans = normalizeKana(typed);
    const matchedOpt = ans.length > 0 ? naturalOpts.find(o =>
      ans === normalizeKana(o.kana || '') || ans === normalizeKana(o.ja)) : null;
    if (matchedOpt) setNatural(n => n + 1);
    setRouteOpt(matchedOpt || model);   // route by what they said, else the model branch
    setTypedRes({ natural: !!matchedOpt, credited: false });
    if (model?.kana) speak(model.kana);
  }

  function skipTyped() {
    if (answered) return;
    setRouteOpt(model);
    setTypedRes({ natural: false, credited: false });
  }

  function credit() {
    setNatural(n => n + 1);
    setTypedRes(r => ({ ...r, natural: true, credited: true }));
  }

  const next = advance;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: C.washi }}>
    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
        <Pressable onPress={onExit}><Text style={F.sub}>‹ exit</Text></Pressable>
        <Text style={F.mono}>TURN {step}{branching ? '' : ` / ${scenario.turns.length}`}</Text>
      </View>

      {turn.stage && <Text style={[F.sub, { marginTop: 14, fontStyle: 'italic' }]}>{turn.stage}</Text>}

      {/* Clerk's line — a speech bubble; tap to replay */}
      <Pressable onPress={() => speak(turn.npc[1])} style={st.npcBubble}>
        <Text style={st.npcWho}>{scenario.speaker || '相手'}</Text>
        <Text style={[F.body, { fontSize: 19, lineHeight: 28 }]}>{turn.npc[0]} <Text style={{ fontSize: 13 }}>🔊</Text></Text>
        {turn.npc[1] ? <Text style={[F.sub, { marginTop: 2, letterSpacing: 0.5 }]}>{toRomaji(turn.npc[1], { spaced: true })}</Text> : null}
        <Text style={[F.sub, { marginTop: 6, color: C.inkSoft }]}>{turn.npcEn}</Text>
      </Pressable>

      <Text style={[F.mono, { marginTop: 18 }]}>YOUR REPLY{typedMode ? ' · TYPE' : ''}</Text>

      {/* ---- Tap mode: choose an option ---- */}
      {!typedMode && (
        <View style={{ marginTop: 8 }}>
          {turn.options.map((opt, idx) => {
            let bg = C.card, border = C.line;
            if (picked !== null) {
              if (opt.ok) { bg = C.greenSoft; border = C.green; }
              else if (idx === picked) { bg = C.shuSoft; border = C.shu; }
            }
            return (
              <Pressable key={idx} onPress={() => pick(idx)} style={[st.option, { backgroundColor: bg, borderColor: border }]}>
                <Text style={{ fontSize: 17, color: C.ink, fontWeight: '600', lineHeight: 24 }}>{opt.ja}</Text>
                <Text style={[F.sub, { marginTop: 2 }]}>{opt.en}</Text>
              </Pressable>
            );
          })}
        </View>
      )}

      {/* ---- Typed mode: produce the reply ---- */}
      {typedMode && !answered && (
        <View style={{ marginTop: 8 }}>
          <TextInput
            value={typed}
            onChangeText={setTyped}
            onSubmitEditing={checkTyped}
            autoFocus autoCorrect={false} autoCapitalize="none"
            placeholder="にほんごで…" placeholderTextColor={C.inkSoft}
            style={st.input} returnKeyType="done" multiline
          />
          <Pressable onPress={checkTyped} style={st.checkBtn}>
            <Text style={{ color: '#fff', fontWeight: '700' }}>Check</Text>
          </Pressable>
          <Pressable onPress={skipTyped} style={{ marginTop: 12, alignItems: 'center' }}>
            <Text style={F.sub}>show me a natural reply</Text>
          </Pressable>
        </View>
      )}

      {/* ---- Tap-mode feedback ---- */}
      {!typedMode && chosen && (
        <>
          <View style={[st.feedbackBox, { borderColor: chosen.ok ? C.green : C.shu }]}>
            <Text style={{ fontWeight: '700', color: chosen.ok ? C.green : C.shu, marginBottom: 4 }}>
              {chosen.ok ? '✓ Natural here' : '✗ Off for this setting'}
            </Text>
            <Text style={[F.sub, { lineHeight: 19, color: C.ink }]}>{chosen.ok ? chosen.note : chosen.why}</Text>
            {!chosen.ok && model && (
              <Pressable onPress={() => model.kana && speak(model.kana)} style={st.replayRow}>
                <Text style={[F.body, { flex: 1 }]}>Try: {model.ja} {model.kana ? <Text style={{ fontSize: 12 }}>🔊</Text> : null}</Text>
                <Text style={st.replayHint}>tap to hear</Text>
              </Pressable>
            )}
          </View>
          <Pressable onPress={next} style={st.nextBtn}>
            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>
              {i + 1 < scenario.turns.length ? 'Next →' : 'Finish'}
            </Text>
          </Pressable>
        </>
      )}

      {/* ---- Typed-mode feedback ---- */}
      {typedMode && typedRes && (
        <>
          <View style={[st.feedbackBox, { borderColor: typedRes.natural ? C.green : C.shu }]}>
            <Text style={{ fontWeight: '700', color: typedRes.natural ? C.green : C.shu, marginBottom: 4 }}>
              {typedRes.natural ? (typedRes.credited ? '✓ Counted as natural' : '✓ Natural — nice') : '✗ Not a match'}
            </Text>
            {!typedRes.natural && !!typed && (
              <Text style={[F.sub, { color: C.ink, marginBottom: 6 }]}>You typed: {typed}</Text>
            )}
            <Text style={[F.sub, { color: C.inkSoft, marginBottom: 4 }]}>Natural reply{naturalOpts.length > 1 ? 'ies' : ''} here:</Text>
            {naturalOpts.map((o, k) => (
              <Pressable key={k} onPress={() => o.kana && speak(o.kana)} style={st.replayRow}>
                <View style={{ flex: 1 }}>
                  <Text style={F.body}>{o.ja} {o.kana ? <Text style={{ fontSize: 12 }}>🔊</Text> : null}</Text>
                  <Text style={[F.sub, { marginTop: 1 }]}>{o.en}</Text>
                </View>
              </Pressable>
            ))}
            {!typedRes.natural && !typedRes.credited && (
              <Pressable onPress={credit} style={st.creditBtn}>
                <Text style={{ color: C.green, fontWeight: '700' }}>I had it right — count it</Text>
              </Pressable>
            )}
          </View>
          <Pressable onPress={next} style={st.nextBtn}>
            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>
              {i + 1 < scenario.turns.length ? 'Next →' : 'Finish'}
            </Text>
          </Pressable>
        </>
      )}
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const st = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: C.card,
    borderWidth: 1, borderColor: C.line, borderRadius: 14, padding: 14, marginBottom: 10,
  },
  levelTag: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4, marginLeft: 8 },
  goalBox: { backgroundColor: C.greenSoft, borderRadius: 12, padding: 12, marginTop: 14 },
  goalLabel: { fontSize: 10, fontWeight: '700', color: C.green, letterSpacing: 1, marginBottom: 4 },
  npcBubble: {
    backgroundColor: C.card, borderWidth: 1, borderColor: C.line,
    borderRadius: 14, borderTopLeftRadius: 4, padding: 14, marginTop: 12,
  },
  npcWho: { fontSize: 10, fontWeight: '700', color: C.inkSoft, letterSpacing: 1, marginBottom: 6 },
  option: { borderWidth: 1, borderRadius: 14, padding: 14, marginBottom: 10 },
  feedbackBox: { backgroundColor: C.card, borderWidth: 1, borderRadius: 12, padding: 12, marginTop: 10 },
  replayRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: C.washi,
    borderRadius: 10, borderWidth: 1, borderColor: C.line, padding: 10, marginTop: 10,
  },
  replayHint: { fontSize: 10, color: C.inkSoft, letterSpacing: 0.5, marginLeft: 8 },
  modeRow: { flexDirection: 'row', gap: 8 },
  modePill: {
    flex: 1, borderWidth: 1, borderColor: C.line, borderRadius: 999,
    paddingVertical: 9, alignItems: 'center', backgroundColor: C.card,
  },
  modePillOn: { backgroundColor: C.green, borderColor: C.green },
  modePillText: { color: C.inkSoft, fontWeight: '700', fontSize: 13 },
  input: {
    borderWidth: 1, borderColor: C.line, borderRadius: 12, backgroundColor: C.card,
    paddingHorizontal: 14, paddingVertical: 12, fontSize: 20, color: C.ink, minHeight: 52,
  },
  checkBtn: { marginTop: 12, backgroundColor: C.shu, borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  creditBtn: {
    marginTop: 10, borderWidth: 1, borderColor: C.green, borderRadius: 10,
    paddingVertical: 9, alignItems: 'center', backgroundColor: C.greenSoft,
  },
  primaryBtn: { marginTop: 24, backgroundColor: C.shu, borderRadius: 14, paddingVertical: 15, alignItems: 'center' },
  secondaryBtn: {
    backgroundColor: C.card, borderWidth: 1, borderColor: C.line,
    borderRadius: 14, paddingVertical: 15, paddingHorizontal: 30, alignItems: 'center',
  },
  nextBtn: { marginTop: 14, backgroundColor: C.green, borderRadius: 14, paddingVertical: 15, alignItems: 'center' },
});
