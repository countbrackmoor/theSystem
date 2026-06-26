# Changelog — The System

Solo Leveling–inspired self-improvement tracker. Repo: `countbrackmoor/theSystem`.

The format is loosely based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## 2026-06-26 — v3.0

### Added

**Cloud sync (optional, single-user)**
- New settings panel: **CLOUD SYNC** (positioned before DATA panel)
- Fields: API URL, Device Token (password input)
- Buttons: SAVE CONFIG, TEST CONNECTION, PUSH NOW, PULL NOW
- Status indicator: IDLE · PENDING · SYNCING · SYNCED · ERROR (color-coded)
- Last-synced timestamp displayed under manual controls
- Cloud config persisted in `localStorage` key `gorgon.cloud.config` (`{url, token}`)
- Backed by [`gorgon-api`](https://github.com/countbrackmoor/gorgon-api) Cloudflare Worker
- KV key: `system:state` (Worker side); payload `{state, lastModified}`
- Auth: `Authorization: Bearer <DEVICE_TOKEN>` header on all requests
- Pull strategy: on app load, if cloud's `lastModified` > local's, cloud wins and replaces local state (re-renders, re-checks titles, logs `Cloud state pulled`)
- Push strategy: `saveState()` triggers a debounced 2 s push to cloud after every state change
- Manual buttons bypass debounce and force-push/pull regardless of timestamps
- All cloud functions are no-ops when `cloudConfig` is unset — the app behaves identically to v2 with no config

### Changed
- Storage key: `gorgon.system.v2` → `gorgon.system.v3`. Old saves (v2, v1) auto-imported on first load if no v3 save exists.
- `DEFAULT_STATE` gains `lastModified` and `lastSyncedAt` ISO-timestamp fields
- `saveState()` updates `state.lastModified` on every call and schedules a cloud push (unless `{skipCloud:true}` is passed — used internally by cloud pull to avoid echo)
- `loadState()` walks `LEGACY_KEYS` fallback list (`['gorgon.system.v2','gorgon.system.v1']`) when v3 key is missing
- `migrate()` stamps `m.version = VERSION` on every migrated payload
- `populateSettings()` rehydrates the cloud config form fields and re-renders cloud status
- Footer updated to `THE SYSTEM v3`

### Notes
- Cloud sync is fully opt-in. Existing users see the new panel but no change in behavior until they paste a URL + token.
- Conflict resolution is last-write-wins by `lastModified` ISO string. Since this is a single-user model, divergence between devices is bounded by the 2 s debounce window plus network latency.
- Status indicator updates on every state transition: pending fires the moment `saveState()` runs; synced fires on successful PUT response.
- 401 responses surface as `ERROR · Unauthorized` and a `[CLOUD: BAD TOKEN]` toast on manual operations.
- Worker source and setup steps live in the `gorgon-api` repo.

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
