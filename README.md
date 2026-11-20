# The System

A self-improvement tracker inspired by Solo Leveling. It is a single HTML file that saves to `localStorage` first, with optional cloud sync via [gorgon-api](https://github.com/countbrackmoor/gorgon-api).

Part of the [gorgon.live](https://gorgon.live) tool suite.

- **Live:** https://gorgon.live/theSystem/ (cyan) · https://gorgon.live/theSystem/?theme=ember (orange; `ember.html` redirects here)
- **Install:** iPhone: Safari → Share → Add to Home Screen. Android/desktop: Settings → APP → INSTALL APP. Works offline after the first load.

---

## Concept

You are the Player and the app is the System. It issues Daily Quests, trains your stats, levels you up and enforces penalties. All copy is terse and bracketed. There is no encouragement copy and no guilt-tripping.

---

## Core loop

- **Daily Quest**
  - Each quest has an icon, XP, a stat, a weekday schedule and optional `{n}` scaling.
  - Tap a quest to clear it. You can undo for 8 seconds.
  - On a cleared scalable quest, tap the `N ✎` chip to log what you actually did. Beating the target raises the next one.
- **Training**
  - Every clear adds a pip to that quest's stat; 5 pips = +1.
  - Level-ups give 5 free points.
- **Failure**
  - A missed day costs HP and breaks the streak.
  - The next day you get a **Penalty Quest**: clear it to void the penalty, ignore it and that stat −1.
  - Only the last 7 days of absence are penalized. Anything older logs `SYSTEM DORMANT`.
- **HP / MP**
  - HP drops on failed days and recovers on clears. At 0 HP you lose your current level progress.
  - MP regenerates on clears; using an item costs 20 MP.
- **Day end:** set to anywhere from midnight to 05:00 (Settings → PLAYER).
- **Side quests:** optional ONCE or N×/week objectives. XP and training, no penalty.
- **Class change at Lv 10:** permanent. The class stat gets +10% XP and trains in 4 clears.
- **Gauntlet:** an optional 7/30/66/custom-day window. Clearing it requires ≥70% of scheduled days and rewards a rare-or-better item. 66 days is the *average* time to habit automaticity found by Lally et al. (2010); individual times ranged from 18 to 254 days.
- **Titles and items:** 32 titles and 8 items (drops every 3–5 cleared days).

## Feedback

- Sticky top strip with today's progress
- Stat radar (now vs ≥30 days ago or Day 1)
- 12-week heatmap
- Quest-target chart (performed vs projected)
- Weekly report
- Full log (1000 entries)

---

## Storage

| Key | Contents |
|---|---|
| `gorgon.system.v5` | Full state (unchanged in v6): `history` (per day: stats plus `[done, target, actual]` for each quest; capped at 400 days), `baseline`, `train`, `job`, `penaltyQuest`, `sideQuests`, `reports`, `trial` (the Gauntlet), `settings.dayStartHour` |
| `gorgon.system.theme` | `cyan` or `ember` |
| `gorgon.cloud.config` | `{url, token}` for optional cloud sync |

- Legacy keys v4 → v1 are migrated on first load. Existing players skip onboarding.
- Cloud sync is last-write-wins by `lastModified`, with `history` merged by date.

---

## Files

| Path | Purpose |
|---|---|
| `index.html` | The app (both palettes) |
| `ember.html` | Redirect to `./?theme=ember` |
| `manifest.webmanifest` | App manifest (name, icons, standalone display) |
| `sw.js` | Service worker: offline cache (`system-vX.Y`; bump it on release) |
| `icons/` | `icon.svg` plus PNG icons (apple-touch 180, 192, 512, maskable 512) |
| `CHANGELOG.md` | Dated change log |

Earlier versions live in the git history (v1 `7e883b0`, v2 `1e692c0`, v3 `eef4d2c`, v4 `f8a84e6`, v5 `f18c475`).

The only dependency is Google Fonts (Rajdhani and Share Tech Mono).

---

## Aesthetic

| Palette | Background | Accent | Gold |
|---|---|---|---|
| Cyan | `#02060d` | `#5fd4ff` | `#ffd166` |
| Ember | `#0c0704` | `#ff8a3d` | `#ffe08a` |

Both palettes share danger `#ff4d6d`, magenta `#d885ff` and green `#7fff6a`. Panels use clip-path corners and bracket frames, with a breathing glow layer *behind* each clipped panel (a filter on a clip-pathed element gets clipped). `prefers-reduced-motion` turns off the animations.

---

## Not implemented yet

- Background reminders (needs Web Push via a gorgon-api cron)
- Skill tree
- HealthKit / Google Fit integration
