# Changelog — The System

Solo Leveling–inspired self-improvement tracker. Repo: `countbrackmoor/theSystem`.

The format is loosely based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## 2026-06-23 — Title (achievement) system

### Added
- **TITLES** mechanic — Solo Leveling–style achievement system. 27 titles spanning four tiers (common, rare, epic, legendary). Hunter-rank progression mirrors the show's E → D → C → B → A → S → Shadow Monarch arc tied to level.
- **Title categories:**
  - Hunter ranks at Lv 5/10/25/50/75/90/100/150
  - Streak titles at 7/30/100/365 days
  - Stat specialists at 25 in each individual stat (STRONGMAN, SWIFT, ENDURING, SCHOLAR, AWARE)
  - Mastery (any stat to 50), Sovereign (any to 100)
  - Balance titles (all stats to 20, all to 50)
  - Quest count titles at 10/100/365 cleared
  - Hidden narrative titles: **PHOENIX** (clear a Daily Quest the day after a penalty), **REINCARNATED** (import a save), **SHADOW MONARCH** (Lv 150)
- **Equipped title slot** — earned titles can be selected from a dropdown in Player settings; the equipped title replaces the class string on the status window in the form `[ TITLE_NAME ]`
- **Title browser** in settings (TITLE ARCHIVE panel) showing the full registry with descriptions, tier badges, and XP rewards. Locked titles are visible to motivate progression; hidden ones stay concealed until earned.
- **Main-view TITLES panel** between Daily Quest and System Log: count badge, equipped-title label, and color-coded pills for every acquired title
- **Tier visual treatment:**
  - common → cyan-dim outline
  - rare → cyan glow
  - epic → gold glow
  - legendary → magenta with continuous pulse animation
- **XP rewards on unlock** (50 → 5000 scaled by tier) — matches the show's `[Quest Reward]` style without breaking the level curve
- **Ceremonial unlock sequence** — staggered magenta `[TITLE ACQUIRED — name]` toasts, 1.4s between each so multiple simultaneous unlocks feel like a sequence of System pronouncements rather than spam
- Magenta toast variant and `.line.title` log color

### Changed
- `DEFAULT_STATE` extended with `titles`, `equippedTitle`, `questsCleared`, `lastClearedDate`, `penaltyYesterday`, `importedOnce`. `migrate()` handles old saves transparently — existing players get all back-earned titles at next load.
- `completeQuest()` now tracks per-day full-clear counts (`questsCleared`) and detects the Phoenix condition
- `ensureTodayQuest()` sets `penaltyYesterday` on miss, clears it on next-day clear
- `applyImport()` sets `importedOnce` flag for Reincarnated unlock

### Notes
- Title checks are debounced (50ms) so a single action triggering multiple title conditions batches into one announcement sequence
- The equipped title only persists if the player still owns it — defensive check on save prevents stale references
- The PLAYER settings copy "// equipped title replaces class on status window" explains the system inline
- Phoenix is a true one-shot: detected via a transient `_phoenixUnlock` flag that's cleared immediately after the check

---

## 2026-06-23 — Full system log + quest editor labels

### Added
- Full system log panel in settings view — shows all log entries with `420px` max-height scroll area; entry count displayed in the panel header
- Column header row above the Daily Quest editor inputs labelling QUEST NAME, XP

### Changed
- Log entry cap raised from 50 → 1000 so the "full" log is actually meaningful for long-term history (~6 months of daily quest activity)

### Notes
- The main-view log on the home screen is unchanged (still shows last 20 entries in a 180px scroll area)
- Both logs render from the same `state.log` array; render() now populates both when settings panel is in DOM

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
