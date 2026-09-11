# 6D ONE UI — Project Authority

These rules govern every generation in this project. They are not suggestions.

**Before generating any screen, read `RULES.md`** — it is the single normative
rulebook (colour, type, spacing, grid, motion, and the locked component specs).
This file owns the source-of-truth hierarchy, the non-negotiables, the Component
Reuse Contract, and the generation pipeline. Nothing is stated twice: where a
topic lives elsewhere, this file links to it.

| Document | Owns |
|---|---|
| `CLAUDE.md` (this file) | Hierarchy, non-negotiables, reuse contract, pipeline, changelog |
| `RULES.md` | All design rules and locked component specs |
| `SKILL.md` | Skill entry point + the component registry (which file, when) |
| `DESIGN_SYSTEM.md` | Compliance, accessibility, AI experience, heuristics, governance |
| `README.md` | Orientation, provenance, repository index (non-normative) |

---

## 1. Source-of-truth hierarchy (strict)

When two sources disagree, the higher one wins. Never average, blend, or
"improve" — resolve by hierarchy:

1. `colors_and_type.css` — colour, type, radius, spacing, shadow, field spec
2. `tokens/structure.css` — z-index scale, grid geometry, locked component dimensions
3. `tokens/motion.css` — durations, easings, keyframes
4. `Component/*.html` — canonical markup per component (copy structure exactly).
   The importable code components in `components/<Name>/` implement the same
   spec; where the two disagree, the canonical HTML wins and the JSX is fixed.
5. `icons/` — the only permitted icon set
6. `RULES.md` — behavioural rules and component specs in prose
7. `DESIGN_SYSTEM.md` — compliance, accessibility, AI-experience and governance
   process. Process authority; where it names a value that conflicts with a
   token, the token (1–3) still wins.
8. Everything else (`README.md`, `Moodboard/`, `uploads/`) is **reference
   only**: it may inform content and layout topology but never overrides a
   token, dimension, colour, font, motion, or icon.

The canonical colour/type source is `Components.fig` as encoded in
`colors_and_type.css`. Values from prior skill versions are deprecated —
see `RULES.md` §1.4.

---

## 2. Non-negotiables

Each item is enforced in full by the linked rule. A screen that breaks one is
rejected regardless of how good it looks.

| # | Constraint | Rule |
|---|---|---|
| 1 | **No new colours, ever** — the palette is closed, and a colour a user pastes into chat is never authorisation to add one | `RULES.md` §1 |
| 2 | **Tokens only** — never hardcode a value that duplicates or conflicts with a token; if none exists, STOP and ask | `RULES.md` §1–§6 |
| 3 | **One brand blue, applied by role**; `--orange-500` is AI-only | `RULES.md` §1.3 |
| 4 | **Poppins only**, sizes 12/14/16/20/24 with their locked line-heights | `RULES.md` §2 |
| 5 | **Spacing from `--space-1…5`**; grid geometry only through `.ds-grid` | `RULES.md` §3–§4 |
| 6 | **Declare the grid type (12/6/5/3/2) before laying out** any screen | `RULES.md` §4 |
| 7 | **Radius, shadow, blur, motion, z-index from the scales**; `prefers-reduced-motion` gate mandatory | `RULES.md` §5–§6 |
| 8 | **Icons only from `icons/`; logos never altered** | `RULES.md` §7 |
| 9 | **One primary action per group**; five button variants, four states each | `RULES.md` §8 |
| 10 | **Every form field is 40px** (`--field-h`) | `RULES.md` §9 |
| 11 | **App shell (Header + Left Menu) is locked and present on every screen** | `RULES.md` §10.1–§10.2 |
| 12 | **One popup, one drawer, one chatbot, one close affordance** | `RULES.md` §10.3, §10.4, §10.6, §9 |
| 13 | **WCAG 2.1 AA on every screen**; all ten usability heuristics pass | `DESIGN_SYSTEM.md` §4–§5 |

---

## 3. Generation pipeline (every screen request)

1. **Analyse topology** — identify the required layout blocks from the prompt or
   wireframe, and declare the grid type.
2. **Map to components** — replace each block exclusively with its canonical
   component from `Component/` (see §4), styled only by tokens.
   `box-sizing: border-box` everywhere; no padding or border may alter an
   explicit dimension.
3. **Verify** — run the verification pass in `RULES.md` §13, remove every
   violation, then print.

---

## 4. Component Reuse Contract

Nearly every consistency defect comes from **hand-building a component instead
of reproducing the canonical one**. Copy its markup and classes verbatim and
drive it with tokens. Before writing any screen, map each block to its file:

| If the screen has… | Reproduce | Do NOT |
|---|---|---|
| App header / top bar | `Component/header-ui.html` | omit the user cell, go icon-only on the right, or leave a gap between Reminders and the user cell |
| Global smart search | `header-ui.html` `.search` | recolour the placeholder dark — it is readable white on the gradient |
| Left navigation | `Component/left-menu.html` | draw a bordered search box (it is borderless) or omit the search |
| Any data grid / list | `Component/Data Table.html` | use inline pencil/trash icons, or drop More Filters, Sort, Add Column, Per View |
| Row actions (View/Edit/Delete) | the kebab (⋮) menu | scatter icon buttons in the row or drop actions from the menu |
| Breadcrumb | `Component/breadcrumb.html` | restyle it, use a bare `<a>`, or show it on a Level 1 page |
| Toast / confirmation | `Component/Toaster.html` | centre it or add a left accent stripe |
| Confirmation / modal | `Component/popup-dialog.html` | build a new shell or drop the `--glass-dark` scrim |
| Slide-in / drawer / edit panel | `Component/overlay-panel.html` | forget the mandatory scrim, or add a × close icon |
| Select / dropdown field | `Component/Dropdown.html` | rebuild the field or reposition the caret |
| Text input | `Component/Input Field.html` | change the 40px height or the border tokens |
| Login | `Component/Login.html` | show two 6D logos, or stretch the wordmark |
| Chatbot / AI assistant | `Component/aarya.html` | build a new chat widget |
| Tabs | `Component/tabs.html` | style a blue highlighted bar instead of the canonical tab |
| Cards / KPI tiles | `Component/score-card.html`, `micro-dashboard.html` | invent a card shell |
| Profile / entity overview | `Component/profile-overview.html` | hand-roll a bespoke profile header |

If a screen needs something with no canonical component, **STOP and ask** — do
not improvise a new pattern.

---

## 5. Design System Guardian

Act as the **Design System Guardian** on every request. The full process lives
in `DESIGN_SYSTEM.md`; in short:

- **Reuse before create.** Approved components only; reuse the locked
  singletons; cover every state (error, loading, success, empty).
- **Accessibility is mandatory** — WCAG 2.1 AA, every screen.
- **Usability heuristics are a gate, not advice** — all ten
  (`DESIGN_SYSTEM.md` §5).
- **Before introducing anything new** (component, pattern, interaction, token,
  guideline): prove no existing one fits, document the justification, propose it
  for review, then record it in `DESIGN_SYSTEM.md` and the relevant `.md` files,
  keeping backward compatibility.
- **If a request violates the design system, explain the conflict and propose
  the closest compliant alternative — never generate inconsistent UI.**

**Regression set:** `Component/Login.html`, SIM List View, NIM. After any
design-system change, regenerate one and diff it against the previously approved
output before new work.

---

## 6. Changelog — ratified decisions

Ratified July 2026 and already baked into the source files named. Each is
specified in full in `RULES.md`; this list is the record of what changed, so a
fix is never silently regressed. When a defect is reported on a shared or locked
component, fix it in the `Component/*.html` source and add a line here.

| Decision | Where it is specified |
|---|---|
| Official 729-SVG icon set installed (`icons/`, `icons/registry.json`) | §7 |
| Left Menu: brand background `#F1F8FF`, 20px nav icons, 10px/400 footer, collapsed Level 2 hover flyout | §10.2 |
| Primary colour system locked to four Primary tokens + AI orange, applied by role | §1.3 |
| Responsive Header is a default element on every screen; search optional | §10.1 |
| Login locked: dummy copy, logo-only product lockup, 3-slide hero carousel | §10.7 |
| One canonical popup on a `--glass-dark` scrim; one overlay panel, Cancel-only | §10.3–§10.4 |
| AARYA is the one chatbot; fully token-driven colours, radii, and dimensions | §10.6 |
| Notification bars: tinted fill + uniform 1px border, no left accent stripe | §10.12 |
| Badge redefined as numeric status data; label-badge/callout system removed | §10.9 |
| Breadcrumb: locked style, body placement, detail-drilldown use only, max 4 steps | §10.8 |
| Banner: full-width `.ds-col-12`, 80px, built-in carousel | §10.17 |
| Avatar: circle only, five sizes, presence + status, avatar-with-text tokens | §10.11 |
| Lozenge: three locked heights, semantic palette only, Lozenge vs Tag guidance | §10.10 |
| Date Range and Date & Time pickers: canonical field trigger, Apply/Cancel behaviour | §10.15 |
| Snackbar: bottom-left, auto-dismiss 5s or persistent, sanctioned Undo carrier | §10.14 |
| Dropdown open panel uses the hairline `--field-list-border`, not the focus border | §9, §10.20 |
| Profile Overview is the entity-overview header, config-driven via `PROFILE` | §10.16 |
| Form-field height locked at 40px system-wide | §9 |
| Type scale locked to 12/14/16/20/24 (+ tiny/micro tier); 18/11/36px removed | §2 |
| Data Table: 60px rows, 7 default columns, all-column search, sortable headings | §10.5 |
