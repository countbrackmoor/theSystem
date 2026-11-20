# Changelog — The System

Solo Leveling–inspired self-improvement tracker. Repo: `countbrackmoor/theSystem`.

The format is loosely based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## 2026-11-19 — v6.1

### Removed
- **`archive/`** (index page and the v1–v4 loaders), along with the footer "archive" link. Earlier versions are in the git history: v1 `7e883b0`, v2 `1e692c0`, v3 `eef4d2c`, v4 `f8a84e6`, v5 `f18c475`.
- The service worker's cache rule for archive builds on `raw.githubusercontent.com`.

### Changed
- The service worker cache is bumped to `system-v6.1`, so installed copies drop the old cache.
- The CLEAR SYSTEM STORAGE text no longer mentions archives. The button still removes every `gorgon.system*` key, so any leftover archive saves get cleaned up too.

---

## 2026-11-19 — v6.0

### Added
- **Installable app (PWA)**:
  - `manifest.webmanifest`: standalone display, portrait, `#02060d` theme/background, scope `./`.
  - iOS meta tags: `apple-mobile-web-app-capable`, black-translucent status bar, home-screen title "SYSTEM".
- **Offline support** via `sw.js` (cache `system-v6.0`):
  - The app page is network-first with a 3.5 s timeout, falling back to the cached copy.
  - Static files are cache-first; Google Fonts are stale-while-revalidate.
  - Archive builds (pinned commit SHAs, so immutable) are cache-first, which means an archive opened once also works offline.
  - The gorgon-api cloud requests and every other gorgon.live tool are left alone.
- **APP panel** (Settings, right after PLAYER):
  - Shows version, mode (browser tab or home-screen app), offline status and storage persistence.
  - INSTALL APP button where the browser supports an install prompt; on iPhone, step-by-step Add to Home Screen instructions.
  - CHECK UPDATE.
- **Icon badge** (opt-in): the home-screen icon shows the objectives left today (+1 for an open Penalty Quest). It updates whenever the app runs. iOS needs notification permission for this; the panel requests it.
- **Persistent storage request** (`navigator.storage.persist()`) at boot.
- **Icons**:
  - `icons/icon.svg` (favicon and manifest "any").
  - PNG `apple-touch-icon` (180), 192, 512 and maskable 512 — uploaded separately, because the GitHub connector can only write text files.

### Notes
- No schema change: `gorgon.system.v5` is unchanged (`settings.badge` defaults to off).
- On iOS the installed app usually gets its own storage, separate from Safari. Move progress with EXPORT → IMPORT, or with cloud sync.
- Background reminders (when the app is closed) need Web Push from a server, i.e. a gorgon-api cron. Not built yet.

---

## 2026-11-19 — v5.0

### Added
- **Undo**: clearing a quest, side quest, penalty quest or using an item shows an 8-second UNDO bar that restores the previous state exactly.
- **Day-end hour** (Settings → PLAYER → DAY ENDS, 00:00–05:00). Activity before that hour counts toward the previous day, and the countdown follows it.
- **Quest → stat training**: each quest has a stat (STR/AGI/VIT/INT/SEN), editable in the quest editor. Every clear adds a training pip; 5 pips = +1 to that stat (4 for your class stat). Existing quests get a stat guessed from their icon.
- **Log the actual number**: on a cleared scalable quest, tap the `15 ✎` chip to log what you really did. Entries below the target are refused (undo instead). If you beat the target, the next target jumps to your actual number (still capped at 5× base). History stores `[done, target, actual]`, and the chart now plots what you performed.
- **HP / MP are real**:
  - HP: −5 to −25 on a failed day (scaled by how much you missed), +10 on a cleared day, +5 on a rest day. At 0 HP you lose your current level progress and HP resets to 50.
  - MP: +20 on a cleared day, +10 on a rest day. Using an item costs 20 MP.
- **Penalty Quest**: failing yesterday no longer debits a stat immediately. Today you get a Penalty Quest: 1.5× the highest-XP scalable quest you missed, or "clear today's Daily Quest in full" if none of the missed quests scale. Clear it and the penalty is voided; ignore it and that quest's stat −1 at rollover. Shields still block it outright. Older gap days (up to 7) are still penalized directly.
- **12-week heatmap** in PROGRESS: cleared / partial (shaded by fraction) / missed / rest / no-data.
- **Weekly report**: on the first open of a new week, a WEEKLY REPORT panel covers last week's clear rate, partial days, objectives, stat change, and strongest/weakest quest. The last 12 reports are kept.
- **Side quests**: optional ONCE or 2–5×/WEEK objectives with XP and training and no penalty. Hitting a weekly quota gives bonus XP. Cleared ONCE quests are pruned at rollover.
- **Class change at Lv 10**: pick FIGHTER / ASSASSIN / TANK / MAGE / RANGER (STR / AGI / VIT / INT / SEN; your highest stat is highlighted). The class stat gets +10% XP and trains in 4 clears. The choice is permanent.
- **First-run onboarding**: 3 screens (name → pick quests and day-end hour → rules). Existing saves skip it.
- **Gauntlet presets** (7 / 30 / 66 days, plus custom). Clearing one grants a guaranteed rare-or-better item.
- **New titles**: CLASSED, ERRAND RUNNER, PENITENT (hidden). 32 titles in total.
- **`prefers-reduced-motion`** support: animations and transitions are disabled when the OS asks.
- **`archive/`**: frozen v1–v4 plus an index page (footer link: archive).
  - Each archive page loads its exact original `index.html` from GitHub (`raw.githubusercontent.com`), pinned to the full commit SHA, so it can't drift.
  - Before running, the build is sandboxed: its save key becomes `gorgon.system.archive.vN` and its cloud config key is renamed, which makes sync inert.
  - Its storage wipe only touches archive keys.
  - Pinned commits: v1 `7e883b0`, v2 `1e692c0`, v3 `eef4d2c`, v4 `f8a84e6`.

### Changed
- **Trial → Gauntlet** in all UI and log text (the stored field is still `trial`, so no migration is needed). The TRIAL CONQUEROR title is now GAUNTLET SURVIVOR.
- **One HTML file for both palettes.** The palette comes from `?theme=` or the saved `gorgon.system.theme`; Settings → switch toggles it in place. `ember.html` is now a redirect to `./?theme=ember`, so old links still work.
- **Cloud pull merges `history` by date** (keeping the more-complete day) instead of replacing it, so a stale device can't erase days. This is the one edit to the carried-over cloud code.
- **Danger zone**:
  - CLEAR SYSTEM STORAGE removes only `gorgon.system*` keys.
  - The old wipe is relabeled CLEAR ALL GORGON.LIVE STORAGE, because `localStorage` is per-origin and that button also wipes every other gorgon.live tool.
- Penalties hit the stat of a missed quest when known, rather than a random stat.
- Storage key `gorgon.system.v4` → `gorgon.system.v5`; `LEGACY_KEYS` gains v4.

### Fixed
- Re-applying the same stat buff no longer stacks the +3 permanently (the old buff's bonus is removed before the new one applies).
- Changing the day-end hour later mid-day no longer regenerates (and wipes) today's quests.

---

## 2026-11-19 — v4.0

### Added
- **Two palettes, one save.** `index.html` (cyan) and `ember.html` (orange) are built from one template and share `gorgon.system.v4`. You can switch between them from Settings → PLAYER.
- **Sticky top strip** with `[SYSTEM] DAILY QUEST · d/n · %` and a progress bar. It turns gold when the day is cleared and shows REST DAY when nothing is scheduled.
- **New section headers.** Every panel uses `[!] [SYSTEM] NAME ─── meta`.
- **Corner-bracket frames** on every panel, with `///` hash marks.
- **Rank chip** (UNRANKED / E–S, derived from level) next to the level chip.
- **Per-quest icons**: 14 stroke SVGs, auto-guessed from the quest name and selectable in the quest editor.
- **Per-quest weekday schedules**: S–S pills in the quest editor, minimum 1 day. A day with nothing scheduled is a rest day, with no penalty and no change to the streak.
- **TODAY / THIS WEEK toggle** on Daily Quest. The week view shows each quest's Sun–Sat pills (scheduled / done / missed / today) and an `N× / WEEK · N DONE` count.
- **QUEST CLEARED stamp**: rotated, gold, with a slam animation on the clear that completes the day.
- **Daily history**: `history[date] = {s:{stats}, q:{questId:[done, target]}}`, recorded on each save and capped at 400 days.
- **Baseline snapshot** (`baseline = {date, stats}`), written once on first v4 load.
- **NOW / DAY 1 stat toggle.** DAY 1 shows the baseline values with a ± delta to now.
- **PROGRESS panel**:
  - Pentagon stat radar: filled for now, dashed for the latest snapshot ≥30 days old (falls back to Day 1).
  - Quest-target chart for each scalable quest. Icon tabs switch between quests. The actual line is solid and built from cleared days in history; the dashed projection covers the next 20 clears at the scale factor, up to the 5× cap.
- **Optional TRIAL** (Settings → TRIAL), off by default:
  - A bounded N-day window (7–365, default 66) inside the endless System.
  - Pass with a clear rate ≥70% of scheduled days; rest days are excluded.
  - Shows day X/N, the current clear rate, a 70% marker and start/end dates in the status window.
  - Can be abandoned.
- **Title TRIAL CONQUEROR** (epic, +1000 XP) for passing a Trial.

### Changed
- Storage key `gorgon.system.v3` → `gorgon.system.v4`. `LEGACY_KEYS` now walks v3 → v2 → v1.
- `migrate()` changes:
  - Quest templates gain a stable `id`, `icon` and `days`.
  - v3 positional `questsToday` ids (`q0`…) are remapped to template ids by name, then by index.
  - `questsToday` entries now carry `t`, the target at issue time.
- Day rollover rewritten (`ensureTodayQuest` / `evaluateDay`):
  - Each missed day in the gap is evaluated against its own schedule.
  - Only the last 7 days are penalized. An older gap logs `SYSTEM DORMANT N DAYS. Unrecorded, unpenalized.`
  - Quest scaling applies only to quests that were scheduled and cleared that day.
- All date math uses local time (`fmtDate` / `parseDate`). The old `addDays` mixed UTC (`toISOString`) with local time and could be off by a day near midnight.
- Panel glow rebuilt structurally:
  - The old `drop-shadow` sat on the clip-pathed panel. CSS applies `filter` before `clip-path`, so the glow was most likely being clipped away (the earlier iOS "fix" probably did nothing).
  - Now a separate `.glow` layer is blurred behind the panel inside a `.frame` wrapper, and the brackets sit outside the clip.
- Ambient background gains a faint HUD grid.
- The log keeps 1000 entries.
- Footer reads `THE SYSTEM v4 — <palette>`.

### Fixed
- Restored Adam's default quest values from `1cbda5a`, which the `1e692c0` clear-storage push overwrote from a stale local copy:
  - 15 Push-Ups (×1.08)
  - 10 Sit-Ups (×1.08)
  - 20-min Walk or Run (×1.02)
  - 20-min Focused Reading (×1.01)
  - Water
  - Put-off task

  This only affects new or reset saves; existing saves keep their own templates.

### Notes
- Cloud sync is unchanged (code carried over verbatim). An older v3 client pushing to the same KV after v4 will write a state without `history`, and the next v4 pull would accept it under last-write-wins. Update every device.

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

## 2026-06-25 → 06-26 — between v2.0 and v3.0 (backfilled)

These pushes shipped without changelog entries. Short hashes are listed for reference. (Corrected in v5.0: v4.0 mislabeled this block as falling between v3.0 and v4.0.)

### Added
- `553e235` — Ambient effects: breathing panel glow, scanline overlay, radial ambient background, title text-shadow breathe.
- `1e692c0` — Settings → DATA: **CLEAR ALL BROWSER STORAGE** (localStorage, sessionStorage, cookies, then reload).

### Changed
- `01245b2` — Made the effects more prominent and attempted an iOS Safari fix (z-index layering, `inset` → explicit offsets, `-webkit-` prefixes).
- `9ff76fe` — Dimmed the scanlines back to `rgba(0,15,35,0.055)`.
- `1cbda5a` — Adam edited the default quests directly on GitHub (the values restored in v4.0 above).

### Regressed
- `1e692c0` also reverted `1cbda5a`'s default quests, because it was built from a stale copy. Fixed in v4.0.

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
