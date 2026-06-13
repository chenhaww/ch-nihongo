// src/tts.js — offline Japanese text-to-speech via the OS voices.
import * as Speech from 'expo-speech';
import { getSetting } from './db';

export async function listJapaneseVoices() {
  try {
    const voices = await Speech.getAvailableVoicesAsync();
    return voices
      .filter(v => (v.language || '').toLowerCase().startsWith('ja'))
      .sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  } catch (e) {
    return [];
  }
}

export async function speak(text) {
  if (!text) return;
  const voiceId = await getSetting('voiceId');
  const rate = parseFloat(await getSetting('speechRate')) || 0.9;
  Speech.stop();
  Speech.speak(text, {
    language: 'ja-JP',
    voice: voiceId || undefined,
    rate,
  });
}
