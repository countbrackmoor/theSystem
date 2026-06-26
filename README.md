# The System

A Solo Leveling–inspired self-improvement tracker. Single-file HTML, `localStorage` first, optional cloud sync via [gorgon-api](https://github.com/countbrackmoor/gorgon-api).

Part of the [gorgon.live](https://gorgon.live) tool suite.

---

## Concept

You are the Player. The app is the System: an external, semi-sentient overseer that issues a Daily Quest, tracks your stats, and levels you up. Miss the Daily Quest and a random stat is debited the next morning. No fake encouragement, no streak-shaming copy — just bracketed System notifications and consequences.

The design philosophy is laid out in `DESIGN.md` (if present); the short version is that the fiction is load-bearing. The aesthetic and tone are the retention mechanic, not decoration.

---

## Features

### Status window
- Player name, class, level
- HP / MP / XP bars (HP and MP are currently cosmetic; reserved for future mechanics)
- Five-stat block: **STR · AGI · VIT · INT · SEN**
- Current and best streak counters
- Stat allocation: every level grants 5 points; tap a stat to spend them

### Daily Quest
- Issued at 00:00 local time
- Expires at midnight; countdown displayed in real time
- Defaults to the show's iconic loadout: 100 push-ups, 100 sit-ups, 100 squats, 10 km run
- Tap a quest segment to mark it complete and bank the XP

### Penalty system
- Missing the Daily Quest → random stat −1 the following day
- Multiple consecutive missed days stack penalties
- Streak resets to 0 on any failure

### Leveling
- XP-to-next-level curve: `lvl² × 100`
- Each level grants 5 stat points
- Allocatable stats glow gold when points are pending

### Persistence
- Auto-saves to `localStorage` (key: `gorgon.system.v3`) on every action
- Refresh-safe, browser-tab-safe
- Schema-versioned with a `migrate()` step so future updates don't break old saves
- Legacy keys (`v1`, `v2`) auto-imported on first load if no `v3` save exists

### Cloud sync (optional)
- Single-user, cross-device sync via Cloudflare Workers + KV (`gorgon-api`)
- Settings → **CLOUD SYNC** panel: paste API URL + device token, hit SAVE CONFIG
- Cloud config stored in `localStorage` key `gorgon.cloud.config`
- On load: if cloud's `lastModified` > local's, cloud state wins and replaces local
- On every state change: debounced 2 s push to cloud
- Manual PUSH NOW / PULL NOW buttons for explicit control
- Status indicator: IDLE · PENDING · SYNCING · SYNCED · ERROR
- Fully optional — leave the config blank and the app behaves exactly as v2

### Settings
- Edit player name and class string
- Custom Daily Quest editor — add, remove, rename, re-XP, re-scale any quest segment
- **Cloud Sync** — endpoint config, manual push/pull, last-synced timestamp
- **Export JSON** — downloads a dated save file
- **Import** via file picker or paste-into-textarea
- Hard reset (double-confirmed)
- Debug helpers: force level-up, force penalty, force item drop

### System messaging
- All notifications styled as bracketed System messages (`[QUEST CLEARED. +25 XP]`)
- Color-coded toast notifications: cyan (info), gold (level/clear), red (penalty)
- Rolling system log shows the last 50 events, persisted across sessions

---

## Files

| Path | Purpose |
|---|---|
| `index.html` | The entire app — HTML, CSS, JS in one file |
| `README.md` | This file |
| `CHANGELOG.md` | Dated change log |

No build step, no dependencies beyond two Google Fonts (Rajdhani and Share Tech Mono) loaded via CDN.

---

## Aesthetic

Dark navy/black background, cyan (`#5fd4ff`) primary accent, gold (`#ffd166`) for XP and milestones, red (`#ff4d6d`) for penalties. Sharp clip-path corners on panels and toasts mirror the show's status-window UI. Rajdhani for body text, Share Tech Mono for System messages.

---

## Stack

- Pure HTML / CSS / JS, single file
- No framework, no build, optional cloud backend
- `localStorage` for primary persistence (key: `gorgon.system.v3`)
- Optional cloud sync via [gorgon-api](https://github.com/countbrackmoor/gorgon-api) Worker
- Google Fonts CDN for Rajdhani and Share Tech Mono
- Hosted via GitHub Pages, fronted by Cloudflare (orange-cloud proxy)

---

## Not implemented yet

- Class change mechanic at Lv 10 (Hunter / Mage / Assassin / Tank)
- Skill tree
- Dungeons (bounded high-stakes challenges)
- Side Quests and Weekly Quests (v3 design doc exists)
- HealthKit / Google Fit integration for AGI / VIT auto-tracking
- Browser push notifications for quest expiry warnings
- HP / MP mechanical wiring (currently cosmetic)

See `DESIGN.md` for the full roadmap.
