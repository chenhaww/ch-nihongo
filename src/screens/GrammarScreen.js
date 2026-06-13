// src/screens/GrammarScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView, FlatList, StyleSheet } from 'react-native';
import { C, F, LEVEL_COLORS } from '../theme';
import { speak } from '../tts';
import { toRomaji } from '../romaji';
import {
  lessonsByLevel, allProgress, recordQuiz, getProgress,
} from '../grammar';

export default function GrammarScreen() {
  const [level, setLevel] = useState(5);
  const [lesson, setLesson] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [progress, setProgress] = useState({});

  async function refresh() { setProgress(await allProgress()); }
  useEffect(() => { refresh(); }, [lesson, quiz]);

  if (quiz) return <Quiz lesson={quiz} onDone={() => { setQuiz(null); }} />;
  if (lesson) return <LessonView lesson={lesson} onBack={() => setLesson(null)} onQuiz={() => setQuiz(lesson)} />;

  const lessons = lessonsByLevel(level);
  const available = level === 5;

  return (
    <View style={{ flex: 1, backgroundColor: C.washi, padding: 20, paddingBottom: 0 }}>
      <Text style={[F.h1, { marginTop: 8 }]}>文法 — Grammar</Text>
      <View style={{ flexDirection: 'row', gap: 8, marginTop: 12, marginBottom: 12 }}>
        {[5, 4, 3, 2, 1].map(l => (
          <Pressable key={l} onPress={() => setLevel(l)}
            style={[st.pill, level === l && { backgroundColor: LEVEL_COLORS[l], borderColor: LEVEL_COLORS[l] }]}>
            <Text style={{ color: level === l ? '#fff' : C.inkSoft, fontWeight: '700', fontSize: 13 }}>N{l}</Text>
          </Pressable>
        ))}
      </View>

      {!available ? (
        <View style={{ marginTop: 40, alignItems: 'center' }}>
          <Text style={{ fontSize: 40 }}>🚧</Text>
          <Text style={[F.h2, { marginTop: 10, textAlign: 'center' }]}>N{level} lessons coming soon</Text>
          <Text style={[F.sub, { marginTop: 6, textAlign: 'center' }]}>
            N5 is the first batch. N4→N3 lessons arrive in upcoming content updates.
          </Text>
        </View>
      ) : (
        <FlatList
          data={lessons}
          keyExtractor={l => l.id}
          contentContainerStyle={{ paddingBottom: 30 }}
          renderItem={({ item, index }) => {
            const pr = progress[item.id];
            const mastered = pr && pr.box >= 4;
            return (
              <Pressable onPress={() => setLesson(item)} style={st.lessonRow}>
                <View style={[st.num, mastered && { backgroundColor: C.green }]}>
                  <Text style={{ color: pr ? '#fff' : C.inkSoft, fontWeight: '700' }}>{index + 1}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={F.h2}>{item.title}</Text>
                  <Text style={F.sub} numberOfLines={1}>{item.structure}</Text>
                </View>
                {pr && (
                  <Text style={{ color: mastered ? C.green : C.gold, fontSize: 11, fontWeight: '700' }}>
                    {mastered ? '★ mastered' : `box ${pr.box}`}
                  </Text>
                )}
              </Pressable>
            );
          }}
        />
      )}
    </View>
  );
}

function LessonView({ lesson, onBack, onQuiz }) {
  const reg = { casual: 'CASUAL', polite: 'POLITE', formal: 'FORMAL' };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: C.washi }} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
      <Pressable onPress={onBack}><Text style={[F.sub, { marginTop: 6 }]}>‹ back to lessons</Text></Pressable>
      <Text style={[F.h1, { marginTop: 10 }]}>{lesson.title}</Text>

      <View style={st.structureBox}>
        <Text style={st.structureLabel}>STRUCTURE</Text>
        <Text style={[F.body, { lineHeight: 22 }]}>{lesson.structure}</Text>
      </View>

      <Text style={[F.body, { lineHeight: 23, marginTop: 16 }]}>{lesson.explanation}</Text>

      <Text style={[F.h2, { marginTop: 22, marginBottom: 4 }]}>Examples by register</Text>
      {lesson.registers.map((ex, i) => (
        <Pressable key={i} onPress={() => speak(ex[1])} style={st.example}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={[F.body, { flex: 1, lineHeight: 24 }]}>{ex[0]} <Text style={{ fontSize: 12 }}>🔊</Text></Text>
            <Text style={st.regTag}>{reg[ex[2]] || ex[2].toUpperCase()}</Text>
          </View>
          <Text style={[F.sub, { marginTop: 2, letterSpacing: 0.5 }]}>{toRomaji(ex[1])}</Text>
        </Pressable>
      ))}

      <View style={st.mistakeBox}>
        <Text style={st.mistakeLabel}>⚠ COMMON MISTAKE</Text>
        <Text style={[F.sub, { lineHeight: 19, color: C.ink }]}>{lesson.mistake}</Text>
      </View>

      <Pressable onPress={onQuiz} style={st.quizBtn}>
        <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>
          Take quiz ({lesson.quiz.length} questions)
        </Text>
      </Pressable>
    </ScrollView>
  );
}

function Quiz({ lesson, onDone }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);
  const [result, setResult] = useState(null);

  const q = lesson.quiz[i];

  async function finish(score) {
    const r = await recordQuiz(lesson.id, score);
    setResult(r);
    setFinished(true);
  }

  function pick(idx) {
    if (picked !== null) return;
    setPicked(idx);
    const isRight = idx === q.answer;
    const nc = correct + (isRight ? 1 : 0);
    if (isRight) setCorrect(nc);
    setTimeout(() => {
      if (i + 1 < lesson.quiz.length) { setI(i + 1); setPicked(null); }
      else finish(nc / lesson.quiz.length);
    }, 1100);
  }

  if (finished) {
    const pct = Math.round(100 * correct / lesson.quiz.length);
    return (
      <View style={{ flex: 1, backgroundColor: C.washi, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Text style={{ fontSize: 52 }}>{result.passed ? '🎉' : '📚'}</Text>
        <Text style={[F.h1, { marginTop: 10 }]}>{pct}%</Text>
        <Text style={[F.sub, { marginTop: 6, textAlign: 'center' }]}>
          {correct} / {lesson.quiz.length} correct
          {result.passed
            ? `\nPassed! Next review in ${reviewGap(result.box)}.`
            : '\nReview the lesson and try again — you\'ll get it.'}
        </Text>
        <Pressable onPress={onDone} style={[st.quizBtn, { paddingHorizontal: 40, marginTop: 24 }]}>
          <Text style={{ color: '#fff', fontWeight: '700' }}>Done</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: C.washi, padding: 20 }}>
      <Text style={[F.mono, { marginTop: 8 }]}>QUESTION {i + 1} / {lesson.quiz.length}</Text>
      <Text style={[F.h1, { marginTop: 18, fontSize: 24, lineHeight: 34 }]}>{q.q}</Text>

      <View style={{ marginTop: 24 }}>
        {q.options.map((opt, idx) => {
          let bg = C.card, border = C.line, color = C.ink;
          if (picked !== null) {
            if (idx === q.answer) { bg = C.greenSoft; border = C.green; color = C.green; }
            else if (idx === picked) { bg = C.shuSoft; border = C.shu; color = C.shu; }
          }
          return (
            <Pressable key={idx} onPress={() => pick(idx)}
              style={[st.option, { backgroundColor: bg, borderColor: border }]}>
              <Text style={{ fontSize: 18, color, fontWeight: '600' }}>{opt}</Text>
            </Pressable>
          );
        })}
      </View>

      {picked !== null && (
        <View style={st.explainBox}>
          <Text style={[F.sub, { lineHeight: 19, color: C.ink }]}>
            {picked === q.answer ? '✓ ' : '✗ '}{q.explain}
          </Text>
        </View>
      )}
    </View>
  );
}

function reviewGap(box) {
  const d = [0, 1, 3, 7, 16, 35, 90][box] || 1;
  return d === 1 ? '1 day' : `${d} days`;
}

const st = StyleSheet.create({
  pill: {
    borderWidth: 1, borderColor: C.line, borderRadius: 999,
    paddingHorizontal: 14, paddingVertical: 6, backgroundColor: C.card,
  },
  lessonRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: C.card,
    borderWidth: 1, borderColor: C.line, borderRadius: 12, padding: 12, marginBottom: 8,
  },
  num: {
    width: 34, height: 34, borderRadius: 999, backgroundColor: C.washi,
    borderWidth: 1, borderColor: C.line, alignItems: 'center', justifyContent: 'center',
  },
  structureBox: { backgroundColor: C.greenSoft, borderRadius: 12, padding: 12, marginTop: 14 },
  structureLabel: { fontSize: 10, fontWeight: '700', color: C.green, letterSpacing: 1, marginBottom: 4 },
  example: { backgroundColor: C.card, borderWidth: 1, borderColor: C.line, borderRadius: 12, padding: 12, marginTop: 8 },
  regTag: { fontSize: 9, fontWeight: '700', color: C.inkSoft, letterSpacing: 1, marginLeft: 8 },
  mistakeBox: { backgroundColor: C.shuSoft, borderRadius: 12, padding: 12, marginTop: 18 },
  mistakeLabel: { fontSize: 10, fontWeight: '700', color: C.shu, letterSpacing: 1, marginBottom: 4 },
  quizBtn: { marginTop: 22, backgroundColor: C.shu, borderRadius: 14, paddingVertical: 15, alignItems: 'center' },
  option: { borderWidth: 1, borderRadius: 14, padding: 16, marginBottom: 10 },
  explainBox: { backgroundColor: C.card, borderWidth: 1, borderColor: C.line, borderRadius: 12, padding: 12, marginTop: 8 },
});
