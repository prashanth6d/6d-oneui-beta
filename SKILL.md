---
name: 6d-oneui
description: Use this skill to generate well-branded interfaces and assets for 6D Technologies ONE UI, either for production or throwaway prototypes/mocks. Behavioral rulebook for the design system — all VALUES live in the token CSS files, all STRUCTURES live in components/.
user-invocable: true
---

# 6D ONE UI — Skill Entry Point

This file is the **entry point and component registry**. It contains no values
and no rules of its own: values live in the token files, structures live in
`Component/`, and rules live in `RULES.md`.

## Division of labour (strict)

| Source | Owns |
|---|---|
| `colors_and_type.css` | Every colour, font, size, weight, radius, shadow, spacing, field dimension |
| `tokens/structure.css` | z-index scale, grid geometry, locked component dimensions |
| `tokens/motion.css` | Every duration, easing, keyframe |
| `Component/*.html` | Canonical markup — copy exactly, never re-derive |
| `components/<Name>/` | Importable code components (JSX + `.d.ts`) implementing the same specs |
| `icons/` | The only permitted icon set |
| `CLAUDE.md` | Source-of-truth hierarchy, non-negotiables, reuse contract, pipeline |
| `RULES.md` | Every design rule and locked component spec |
| `DESIGN_SYSTEM.md` | Compliance, accessibility, AI experience, heuristics, governance |

## How to work

1. Read `CLAUDE.md`, then `RULES.md`.
2. Import all token files (a single `<link>` to `colors_and_type.css` pulls in
   structure + motion) and style **only** through tokens.
3. Follow the generation pipeline in `CLAUDE.md` §3: analyse topology → map to
   canonical components → run the verification pass (`RULES.md` §13).
4. If this file or any document appears to state a value that conflicts with a
   token file, **the token file wins** — report the conflict, never resolve it
   silently.

If invoked without other guidance: ask what to build, ask a few clarifying
questions, then act as an expert designer producing HTML artifacts or production
code.

---

## Importable code components

A subset of the system is also published as React components, compiled into
`_ds_bundle.js` and read off the global namespace:

```js
const { Button, TextButton, Toggle, InputField, Select } =
  window.Ds6DTechnologiesONEUIDesignSystem_9f23d5;
```

Each lives in `components/<Name>/` with its `.jsx`, its `.d.ts` API, and a live
usage card; shared classes are in `components/ds-components.css`. They are an
alternative delivery of the same specs, not a second source of truth — the
canonical HTML in `Component/` wins on any disagreement. Everything else in the
registry below is HTML-only.

---

## Component registry

Canonical, token-pure markup for every component lives in `Component/`. Copy the
structure exactly and style only through tokens. Files marked **(reference)**
document tokens or foundations rather than a reusable block — read them for
values, don't paste them into a screen. Files marked **(LOCKED)** are reproduced
verbatim. The linked rule section carries the full spec.

| File | When to use | Rule |
|---|---|---|
| `aarya.html` | **The** chatbot / conversational AI / assistant widget **(LOCKED)** | `RULES.md` §10.6 |
| `Accordion.html` | Collapsible sections, FAQ panels, expandable settings groups | §10.19 |
| `Avatar.html` | User avatars — photo / initials / icon / fallback, presence + status, avatar-with-text | §10.11 |
| `badge.html` | Numeric status data only — counts, deltas, anchored counts | §10.9 |
| `Banner.html` | Full-width 80px promotional strip with carousel | §10.17 |
| `blur.html` | Backdrop-blur tokens — sm/md/lg/xl + glass overlays **(reference)** | §5 |
| `breadcrumb.html` | Hierarchical trail on Level 2+ detail pages | §10.8 |
| `breakpoints.html` | Responsive breakpoint tokens **(reference)** | §4 |
| `button-dropdowns.html` | Split / menu buttons with dropdown actions and drilldown submenus | §8 |
| `buttons.html` | Primary / Secondary / Tertiary / Success / Danger buttons and toggle switches | §8 |
| `buttons-text-semantic.html` | Text buttons and semantic button variants | §8 |
| `canvas-overlay.html` | Node/flow canvas with connector links + slide-in overlay | §10.4 |
| `checkbox-radio.html` | Checkboxes and radio groups in forms | §9 |
| `color-brand-ai.html` | Brand + AI palette swatches and AARYA gradients **(reference)** | §1 |
| `color-neutrals.html` | Neutral ink / line / surface palette **(reference)** | §1 |
| `color-primary.html` | Primary blue palette **(reference)** | §1 |
| `color-semantic.html` | Semantic / status palette **(reference)** | §1 |
| `color-card-render.js` | Shared renderer for the four colour cards **(support)** | — |
| `column-grid.html` | 12-column responsive layout grid **(reference)** | §4 |
| `Data Table.html` | All tabular data — search, filter, sort, bulk actions, pagination | §10.5 |
| `Date Range Picker.html` | Start–end date range selection | §10.15 |
| `date-time-picker.html` | Single date and single time selection | §10.15 |
| `Dropdown.html` | Single and multi-select dropdowns — searchable, tag select, clear | §10.20 |
| `header-ui.html` | App header shell **(LOCKED, default on every screen)** | §10.1 |
| `iconography.html` | Searchable gallery of the 729 sanctioned icons **(reference)** | §7 |
| `Input Field.html` | Single-line text input with label, hover/focus, clear, validation | §9 |
| `left-menu.html` | App left navigation **(LOCKED)** | §10.2 |
| `Login.html` | DS-standard responsive split login **(LOCKED)** | §10.7 |
| `logo.html` | 6D brand logo / wordmark usage **(reference)** | §7 |
| `Lozenge.html` | Prominent attribute label — workflow status, state, priority, permission | §10.10 |
| `micro-dashboard.html` | Compact multi-stat module / key–value summary panel | — |
| `notification-bars.html` | Persistent system notification / alert strips | §10.12 |
| `number-field.html` | Numeric input with stepper spinners | §9 |
| `overlay-panel.html` | **The** right slide-in overlay / drawer | §10.4 |
| `popup-dialog.html` | **The** popup / modal / confirmation for every screen | §10.3 |
| `product-logos.html` | The 8 sanctioned 6D product wordmarks **(reference)** | §7 |
| `profile-overview.html` | **The** overview header for any entity page | §10.16 |
| `radius.html` | Border-radius tokens **(reference)** | §5 |
| `range.html` | Range / slider input | §9 |
| `rating.html` | Star rating input or display | — |
| `score-card.html` | Single-KPI score card with trend arrow | — |
| `sections.html` | Form / CRUD section headers and grouped form layout | §3 |
| `shadow.html` | Elevation tokens **(reference)** | §5 |
| `skeleton.html` | Loading skeleton placeholders | — |
| `snackbar.html` | Brief bottom-left message; the sanctioned Undo carrier | §10.14 |
| `spacing.html` | Spacing scale tokens **(reference)** | §3 |
| `spinner.html` | Loading spinners / indeterminate progress | — |
| `status-badges.html` | Status text labels — active / failed / pending / blocked | §10.18 |
| `tabs.html` | Tabbed navigation within a single view | — |
| `tag.html` | Tags / chips for descriptive metadata and filter selections | §10.10 |
| `Textarea.html` | Multi-line text input — default, filled, disabled | §9 |
| `timeline.html` | Vertical activity / history / audit timeline | — |
| `Toaster.html` | Toast notifications — top-right, bottom progress bar | §10.13 |
| `todo-list.html` | Checklist / task list with completion toggles | — |
| `tooltip.html` | Hover tooltips for truncated text or contextual hints | — |
| `type-fonts.html` | Poppins family and weight ramp **(reference)** | §2 |
| `type-scale.html` | Type ramp (`--t-*`) **(reference)** | §2 |
