# Kado Nihongo — Phase 2 Setup (Expo Go on iOS)

What you're getting: a working SRS study app — FSRS-scheduled flashcards for
all JLPT vocab + kanji, offline TTS with voice picker, library/search, streaks,
and per-level progress tracking. Runs in Expo Go, no Apple developer account needed.

## One-time setup (≈10 minutes)

**1. Install Expo Go on your iPhone** — App Store, search "Expo Go", free.

**2. On your PC**, create the project shell (this resolves all correct
package versions automatically):

```
cd E:\
npx create-expo-app kado-nihongo --template blank
cd kado-nihongo
```

**3. Install the four libraries the app uses:**

```
npx expo install expo-sqlite expo-speech expo-asset expo-file-system
npm install ts-fsrs
```

**4. Copy this zip's contents into the project folder**, overwriting when asked:
- `App.js`            → replaces the default one
- `metro.config.js`   → new file in the project root
- `src/`              → whole folder into the project root
- `assets/japanese-content.db` → into the existing `assets/` folder

**5. Start it:**

```
npx expo start
```

**6. On your iPhone**: open the Camera app, scan the QR code in the terminal.
It opens in Expo Go. First launch takes ~30s while the 27MB dictionary copies over.

> Phone and PC must be on the same WiFi. If the connection fails (some routers
> block it), run `npx expo start --tunnel` instead.

## Daily use

While developing: keep `npx expo start` running and open via Expo Go.
Expo Go caches the last loaded bundle, but treat it as a dev environment —
when we reach Phase 5-ish and the app is worth carrying daily, switch to
TestFlight (US$99/yr Apple Developer) for a real standalone install.

Your study progress lives in `user.db` on the phone itself and survives
app reloads and content updates.

## Better voices (recommended, 2 minutes)

iOS ships a basic Japanese voice; the enhanced ones are much nicer:
Settings → Accessibility → Spoken Content → Voices → Japanese →
download **Kyoko (Enhanced)** (female) and **Otoya (Enhanced)** (male).
Then pick one in the app's 設定 tab — it speaks a test sentence on selection.

## Quick tour

- **今日 (Home)** — due reviews, new-card count, streak, JLPT progress bars
  (solid bar = vocab, faded = kanji). Big red button starts the session.
- **Review** — tap card to reveal; 🔊 speaks it; grade with Again/Hard/Good/Easy.
  The small text under each button is FSRS's predicted next interval.
  "Again" re-queues the card later in the same session.
- **辞書 (Library)** — browse vocab/kanji by level or search in Japanese or
  English. Tap any row to hear it.
- **設定 (Settings)** — voice (male/female), speech rate, new cards/day,
  card types, politeness register (feeds Phase 3 grammar), reset.

## Troubleshooting

- **"No Japanese voices found"** → install one in iOS Settings (see above), restart Expo Go.
- **Stuck on "Preparing dictionary…"** → shake phone → Reload. If persistent,
  confirm `assets/japanese-content.db` exists and `metro.config.js` was copied.
- **QR won't connect** → `npx expo start --tunnel`.

## What's next (Phase 3)

Grammar lessons N5→N3 with casual/polite/formal variants of every example
sentence, quizzes feeding this same SRS queue. The register setting you see
in Settings already stores your preference for it.
