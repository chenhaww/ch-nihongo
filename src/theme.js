// src/theme.js — Kado Nihongo design tokens
// Washi-paper ground, ink type, vermilion (shu) reserved for grading actions.
export const C = {
  washi: '#FAF7F0',      // background
  card: '#FFFFFF',
  ink: '#1C1B18',        // primary text
  inkSoft: '#6B675E',    // secondary text
  line: '#E5E0D5',       // hairline borders
  shu: '#D9381E',        // vermilion accent — grading & primary actions
  shuSoft: '#FBE9E5',
  green: '#1F4D34',      // Kado forest green — progress / success
  greenSoft: '#E8F0EB',
  gold: '#B8860B',       // streak
};

export const LEVEL_COLORS = {
  5: '#7BA05B', 4: '#4E8D7C', 3: '#2F6B8E', 2: '#6A4C93', 1: '#9E2B25',
};

export const F = {
  display: { fontSize: 88, color: C.ink, fontWeight: '400' },
  h1: { fontSize: 26, color: C.ink, fontWeight: '700' },
  h2: { fontSize: 18, color: C.ink, fontWeight: '600' },
  body: { fontSize: 16, color: C.ink },
  sub: { fontSize: 13, color: C.inkSoft },
  mono: { fontSize: 12, color: C.inkSoft, letterSpacing: 1 },
};
