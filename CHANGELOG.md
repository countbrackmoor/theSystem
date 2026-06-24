# Changelog — The System

Solo Leveling–inspired self-improvement tracker. Repo: `countbrackmoor/theSystem`.

The format is loosely based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## 2026-06-23 — v1 release

### Added
- Initial public release at `/theSystem/` on gorgon.live
- Single-file `index.html` containing HTML, CSS, and JS
- Status window: player name, class, level, HP/MP/XP bars, five-stat block (STR/AGI/VIT/INT/SEN)
- Daily Quest panel with the show's iconic 100/100/100/10km loadout, tap-to-complete, real-time countdown to midnight
- Penalty system: random stat −1 per missed day, stacks across consecutive misses
- Streak counter (current + best), resets on any miss
- XP / leveling: `lvl² × 100` curve, 5 stat points per level, allocatable stats glow gold when points pending
- `localStorage` persistence under key `gorgon.system.v1`, schema-versioned with `migrate()`
- Settings panel: player name/class editor, Daily Quest editor (add/remove/rename/re-XP), JSON export (downloads dated file), JSON import (file picker or paste), hard reset (double-confirmed), force-level-up and force-penalty debug helpers
- System log: rolling 50-event history with color-coded entries (cyan info, gold milestone, red penalty)
- Toast notifications styled as bracketed System messages
- `README.md` and this `CHANGELOG.md`

### Design notes
- Aesthetic: dark `#02060d` background, cyan `#5fd4ff` primary, gold `#ffd166` for XP/milestones, red `#ff4d6d` for penalties
- Sharp clip-path corners on panels and toasts mirror the show's status-window UI
- Typography: Rajdhani (body) and Share Tech Mono (System messages) via Google Fonts CDN
- All System messaging is terse and bracketed; no encouragement copy, no guilt-tripping — tone discipline is treated as a feature

### Known limitations
- HP and MP bars are cosmetic; no mechanics wired to them yet
- No class change at Lv 10 yet (planned: Hunter / Mage / Assassin / Tank)
- No skill tree, dungeons, side quests, or weekly quests yet
- No HealthKit / Google Fit integration
- No browser push notifications for quest expiry warnings

---

## 2026-06-23 — Pre-release mockup

### Added
- Non-functional static mockup (`system-mockup.html`) used to validate the visual language before building v1
- Status window, daily quest panel, system log panel, simulate-level-up and simulate-penalty buttons
- No persistence, no daily reset, no settings — purely visual

The mockup was developed in the same session as v1 and superseded by it. Retained in the repo as a reference for the locked-in aesthetic.
