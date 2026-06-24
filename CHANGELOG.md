# Changelog — The System

Solo Leveling–inspired self-improvement tracker. Repo: `countbrackmoor/theSystem`.

The format is loosely based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## 2026-06-24 — v2.0

### Added

**Item / perk drop system**
- 8 items across 4 rarities drop after full daily quest clears (~every 3–5 days, randomized)
- Drop roll is weighted: common 50%, uncommon 36%, rare 12%, legendary 2%
- Items are fitness/productivity themed and mechanically meaningful:
  - RECOVERY DRAFT (common, consumable) — absorb next penalty
  - IRON SUPPLEMENT (common, consumable) — +50% XP on next single quest
  - WARRIOR'S RESOLVE (uncommon, buff 3d) — +3 STR
  - SCHOLAR'S FOCUS (uncommon, buff 3d) — +3 INT
  - AWAKENING CRYSTAL (rare, consumable) — +2 to all stats immediately
  - IRON CONSTITUTION (rare, consumable) — absorb next 2 penalties
  - BATTLE MANUAL (rare, buff 5d) — +25% XP on all quests
  - CHALLENGER'S MARK (legendary, buff 1d) — ×2 XP on all quests
- Consumables land in the INVENTORY panel; tap USE to activate
- Buffs auto-apply on drop and expire after their stated duration; stat buffs reverse on expiry
- Active buff/shield/boost summary shown on STATUS WINDOW below stats
- INVENTORY panel visible on main screen, hidden when empty (no clutter on new accounts)
- Active buffs also listed in INVENTORY panel with days remaining
- Two new titles: HOARDER (hold 3 items at once), WELL EQUIPPED (10 total drops)
- Debug: FORCE ITEM DROP button in settings

**Scalable quest targets**
- Quest templates now support `{n}` in the name (e.g. `{n} Push-Ups`)
- `scaleFactor` per quest: multiplies the displayed number on every full daily clear
  (e.g. 1.08 = +8% per clear; 25 push-ups → 27 → 29 → 31...)
- `currentTarget` persisted per quest so progress is never lost on reload
- Scale is capped at `5 × baseTarget` to prevent runaway numbers
- Missing days do not regress the target — only clears advance it
- Quest editor gains a SCALE column (leave blank or 1 to disable)

**Updated default quest set (6 quests, mixed physical + cognitive)**
- `{n} Push-Ups` — base 25, scale 1.08
- `{n} Sit-Ups` — base 25, scale 1.08
- `{n}-min Walk or Run` — base 20, scale 1.06
- `{n}-min Focused Reading` — base 20, scale 1.05
- `Drink 8 glasses of water` — fixed
- `Tackle one thing you've been putting off` — fixed (30 XP)

**Layout reorder**
- Main screen: STATUS WINDOW → DAILY QUEST → INVENTORY (hidden when empty) → TITLES (hidden until first title) → SYSTEM LOG
- Settings: PLAYER → TITLE ARCHIVE → QUEST EDITOR → FULL LOG → DATA → DEBUG
- TITLES panel now suppressed entirely for new players until first title drops
- INVENTORY panel suppressed when both inventory and activeBuffs are empty

### Changed
- Storage key: `gorgon.system.v1` → `gorgon.system.v2`. Old saves migrated on first load.
- Penalty system checks `penaltyShields` before deducting a stat
- XP boost flags checked in `completeQuest()` before calling `gainXP()`
- Footer updated to `THE SYSTEM v2`
- Toast duration extended to 2.6s

### Notes
- `tickBuffExpiry()` fires on each new-day detection; stat buffs reversed on expiry
- Drop schedule persisted as `nextDropDate`; debug button resets it for re-trigger
- `resolveQuestName()` handles both fixed and templated quest types
- `migrate()` handles v1 → v2 quest template schema

---

## 2026-06-23 — Title (achievement) system

### Added
- 27 titles across four tiers (common, rare, epic, legendary)
- Hunter rank progression (AWAKENED → SHADOW MONARCH) tied to level
- Equipped title slot, Title Archive in settings, main-view pill grid
- Hidden narrative titles: PHOENIX, REINCARNATED, SHADOW MONARCH
- XP rewards on unlock (50–5000), staggered magenta toasts

---

## 2026-06-23 — Full system log + quest editor labels

### Added
- Full system log panel in settings (420px scroll, 1000-entry cap)
- Column header row above quest editor

---

## 2026-06-23 — v1 release

### Added
- Initial release: status window, daily quest, penalty system, streak, XP/leveling, stat allocation, localStorage persistence, JSON export/import, system log, toasts, settings
