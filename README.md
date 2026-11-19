# The System

A self-improvement tracker inspired by Solo Leveling. It is a single HTML file that stores everything in `localStorage` first, with optional cloud sync via [gorgon-api](https://github.com/countbrackmoor/gorgon-api).

Part of the [gorgon.live](https://gorgon.live) tool suite.

- **Cyan:** https://gorgon.live/theSystem/
- **Ember (orange):** https://gorgon.live/theSystem/ember.html

Both palettes read and write the same save. Switch between them in Settings → PLAYER.

---

## Concept

You are the Player and the app is the System. It issues Daily Quests, tracks your stats, levels you up and applies penalties. All copy is terse and bracketed. There is no encouragement copy and no guilt-tripping.

---

## Features

### Status window
- Name, class or equipped title, level, rank chip (UNRANKED → E–S by level)
- HP / MP / XP bars (HP and MP are cosmetic)
- Five stats: **STR · AGI · VIT · INT · SEN**
  - Tap a stat to spend points; each level grants 5.
  - The **NOW / DAY 1** toggle shows your baseline with a ± delta.
- Active buffs and shields
- Current and best streak
- Progress bar for an active Trial

### Daily Quest
- A sticky top strip shows today's progress (`d/n · %`) and turns gold when the day is cleared.
- **TODAY** view:
  - Tap a quest to clear it.
  - Clearing the last quest slams a QUEST CLEARED stamp.
  - The countdown turns red in the final 2 hours.
- **THIS WEEK** view: Sun–Sat pills for each quest (scheduled / done / missed / today).
- Per-quest icon, XP, weekday schedule and optional scaling:
  - Use `{n}` in the name to make the number scale.
  - The factor is applied on each clear, up to a 5× cap.
- A day with nothing scheduled is a **rest day**: no penalty and no change to the streak.

### Penalties and rollover
- Each failed scheduled day costs a random stat −1 and resets the streak.
- Penalty shields from items block it.
- Only the last **7 days** of absence are penalized. Anything older logs `SYSTEM DORMANT` and is skipped.

### Progress
- Pentagon stat radar: now versus the latest snapshot ≥30 days old (falls back to Day 1).
- Quest-target chart for each scalable quest: actual targets on cleared days, plus a dashed 20-clear projection.

### Trial (optional)
- A bounded N-day window (default 66, range 7–365) that you start from Settings.
- You pass with a ≥70% clear rate on scheduled days, which unlocks **TRIAL CONQUEROR**.
- 66 days is the *average* time to habit automaticity found by Lally et al. (2010). Individual times ranged from 18 to 254 days.

### Titles and items
- 29 titles across the common / rare / epic / legendary tiers. Each grants XP, and you can equip one in place of your class.
- 8 items drop roughly every 3–5 cleared days: consumables (shields, XP boost, all-stats) or timed buffs.

### Settings
- Player, title archive, quest editor, trial, full log (1000 entries)
- Cloud sync, export / import JSON, reset, clear all browser storage
- Debug actions

---

## Storage

| Key | Contents |
|---|---|
| `gorgon.system.v4` | Full state, including `history` (per-day stats and quest results, capped at 400 days), `baseline` and `trial` |
| `gorgon.cloud.config` | `{url, token}` for optional cloud sync |

Legacy keys `gorgon.system.v3`, `v2` and `v1` are migrated automatically on first load. Cloud sync is last-write-wins by `lastModified`; update every device to v4.

---

## Files

| Path | Purpose |
|---|---|
| `index.html` | App, cyan palette |
| `ember.html` | App, ember palette (same code; only `data-theme` differs) |
| `CHANGELOG.md` | Dated change log |

The two HTML files are generated from one template, so any change must go into both. The only dependency is Google Fonts (Rajdhani and Share Tech Mono).

---

## Aesthetic

| Palette | Background | Accent | Gold |
|---|---|---|---|
| Cyan | `#02060d` | `#5fd4ff` | `#ffd166` |
| Ember | `#0c0704` | `#ff8a3d` | `#ffe08a` |

Both palettes share danger `#ff4d6d`, magenta `#d885ff` and green `#7fff6a`. Panels use clip-path corners, bracket frames and a breathing glow layer. That glow layer sits *behind* the clipped panel, because a filter on a clip-pathed element gets clipped on iOS.

---

## Not implemented yet

- A class-change mechanic at Lv 10
- Skill tree
- Dungeons
- Side and weekly quests
- HealthKit / Google Fit integration
- Push notifications
- HP / MP mechanics
