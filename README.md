# 6D Technologies — ONE UI Design System

A working design system reconstructed from 6D Technologies' **ONE UI** component
library: the design language behind 6D's enterprise telecom **BSS/OSS** product
suite. This repository gives a design agent everything needed to build on-brand
6D interfaces, mocks, and assets.

> **6D Technologies** is a telecom software vendor ("Smart Ideas, Delivered").
> ONE UI is the shared UI system for its operator-facing consoles — used by
> network operators, **MVNOs, Resellers, and Enterprise** customers to manage
> SIMs, connectivity plans, packages, partners, notifications, automation rules,
> and operations. The product also embeds an AI assistant, **AARYA**.

**This file is orientation, not law.** It is non-normative: nothing here
overrides a token or a rule. For rules, read `CLAUDE.md` then `RULES.md`.

---

## Where things are defined

| Document | Owns |
|---|---|
| `CLAUDE.md` | Source-of-truth hierarchy, non-negotiables, Component Reuse Contract, generation pipeline, changelog |
| `RULES.md` | Every design rule and every locked component spec |
| `SKILL.md` | Skill entry point and the component registry (which file, when) |
| `DESIGN_SYSTEM.md` | Compliance, accessibility, AI experience, usability heuristics, governance |
| `README.md` | This file — context, provenance, repository index, content and visual character |

## Repository index

| Path | What |
|---|---|
| `styles.css` | Root stylesheet — the single entry point; `@import`s the token closure |
| `colors_and_type.css` | Colour, type, radius, spacing, shadow and field-spec tokens; `@import`s the structure + motion token files |
| `tokens/structure.css` | z-index scale, grid geometry, locked component dimensions |
| `tokens/motion.css` | Duration scale, easings, named transitions, canonical `ds-*` keyframes |
| `Component/` | Canonical, token-pure markup for every component; also renders the Design System tab cards |
| `components/` | Importable code components (JSX + types) and their shared class CSS |
| `templates/` | Starting-point templates (app shell, list view) for consuming projects |
| `icons/` | The 729-SVG sanctioned icon set + `registry.json` name list |
| `assets/` | Brand mark and wordmark, product wordmarks (`assets/products/`), AARYA mascot, sample imagery |
| `fonts/` | Self-hosted Poppins (300 / 400 / 600 / 700) |
| `login/` | Tweaks-panel scaffold loaded by `Component/Login.html` |
| `Moodboard/`, `uploads/` | Reference material only — source PDFs and spec redlines, never a source of values |

## Provenance

- **Figma:** `Components.fig` — one page (`6D-Component`) with 8 frames
  (Components, Components2, AARYA, Dropdowns, Icons, Text-Animation, calendar,
  Frame-2147224395) and 289 local components. The primary source for tokens,
  components, and layout.
- **Component spec PDFs** (`uploads/`): buttons, form fields, header, tabs,
  breadcrumb, data table, overlay, popup, toaster, wizard, micro-dashboard —
  annotated redlines with exact spacing and type per component family.

No live codebase or website was provided; the reconstruction is from the Figma
file plus the PDFs. Tokens were verified against Figma node values.

---

## Components

The system ships in two forms. Both are token-pure and specified by the same
rules; use whichever suits the consumer.

**Canonical markup** — `Component/*.html`, one file per component (39 in all:
header, left menu, data table, popup, overlay panel, AARYA, login, breadcrumb,
badge, lozenge, avatar, tabs, toaster, snackbar, pickers, and the rest). Copy
the markup into a screen and drive it with tokens. The full list with usage
notes is the component registry in `SKILL.md`.

**Importable code components** — `components/<Name>/`, each a `.jsx`
implementation plus a `.d.ts` API and a live usage card. They compile into
`_ds_bundle.js` and are read off the global namespace:

```js
const { Button, TextButton, Toggle, InputField, Select } =
  window.Ds6DTechnologiesONEUIDesignSystem_9f23d5;
```

| Component | Source | Spec |
|---|---|---|
| **Button** (+ `TextButton`, `Toggle`) | `components/Button/` | `RULES.md` §8 |
| **InputField** | `components/InputField/` | `RULES.md` §9 |
| **Select** | `components/Select/` | `RULES.md` §10.20 |

Their shared classes live in `components/ds-components.css` (prefixed `ds-`,
imported by `styles.css`); every declaration resolves to an existing token —
the code components add no new values. The canonical HTML remains the spec: if
the two ever disagree, `Component/*.html` wins and the JSX is corrected.

---

## What the product is

ONE UI is a **dense, data-heavy admin console**, not a marketing site. The core
surfaces in the source material:

- **Left menu / navigation** — Offer Management, Pricing & Packages,
  Notifications, Users & Roles, AI Insights, Message Templates, Partners, User
  Guides & FAQs, Automation Rules, Plans & Offers, Operations & Support.
- **Listing + data table** — e.g. "Listing 450 Resellers": searchable,
  filterable, with row actions, bulk actions, per-view, pagination, and export.
- **Micro dashboard** — a summary card of key values, statuses, copyable
  values, and labelled value pairs.
- **Entity management** — SIM-level actions (SIM Swap, Change Plan, Lock SIM,
  Update Device IMEI, Run Diagnostics, Reset Location, Raise Ticket, Download
  Usage Report) surfaced through action menus.
- **Partner tiers** — **MVNO**, **Reseller**, and **Enterprise** are the three
  customer segments throughout.
- **AARYA** — the embedded AI assistant, with prompt input, video/result cards,
  and response bubbles.
- **Supporting components** — toasters, popups, overlays, tabs, breadcrumbs,
  wizard navigation, tooltips, date pickers, form fields.

---

## Content fundamentals

How 6D ONE UI writes copy.

- **Voice.** Neutral, professional, system-operator voice. Address the user as
  "you"; describe system actions in plain tense ("The system will generate a new
  temporary password automatically.").
- **Casing.** **Title Case for all UI chrome** — buttons, tabs, menu items,
  headings ("Reset Password", "View Details", "Bulk Actions", "More Filters").
  Sentence case for descriptions and body copy.
- **Tone.** Calm, factual, reassuring on errors. Errors explain what happened
  and what to do next, without blame.
- **Structure.** "What happens next:" explanatory lists on confirm and error
  popups set expectations step by step.
- **Microcopy.** Counts in parentheses — "Accounts (4)", "All Status (500)".
  Instructive search placeholders — "Search all columns", "Type to search or
  press '/' to begin". Truncate with an ellipsis and reveal the full value on
  hover.
- **Labels.** Short, reusable field labels; action verbs lead button labels
  (Send, Reset, Proceed, Cancel, Export, View Details).
- **Emoji.** **None** — this is an enterprise console. Status is a coloured word
  label, never an emoji.
- **Domain vocabulary.** SIM, MVNO, Reseller, Enterprise, Plan, Offer, Package,
  APN, IMEI, Add-on, Diagnostics, Audit Trail, Partner, Entity.

---

## Visual character

A descriptive summary of the look. Every value below is defined authoritatively
in the token files and in `RULES.md` — read those before building.

- **Overall.** Clean, dense, light-mode enterprise: lots of white, a single
  confident blue, hairline borders, small type, restrained shadows. The only
  expressive surface is **AARYA**, which goes dark with a navy→purple gradient.
- **Colour.** Light UI on white and near-white. One brand blue carries every
  primary action, link, active tab, and selection; neutrals do most of the work;
  semantics are conventional (green active, red failed, orange warning). Deep
  navy is reserved for the logo wordmark; navy→purple plus the orange swirl is
  the AI signature. The palette is closed (`RULES.md` §1).
- **Type.** Poppins throughout, on a small, tight scale — body at 12px, headings
  stepping to 14 / 16 / 20 / 24 (`RULES.md` §2).
- **Spacing.** Tight and grid-disciplined, from the `--space-1…5` scale, on the
  responsive 12-column grid (`RULES.md` §3–§4).
- **Radius.** Small and consistent — 4 / 6 / 10 / 16 and pill, bound to their
  components (`RULES.md` §5).
- **Borders and elevation.** Hairline borders everywhere, a stronger hairline for
  hover; shadows are very subtle — a soft lift on cards and toasts, a deeper one
  on popovers, drawers, and popups. No glows, no neumorphism.
- **Backgrounds.** Flat. White cards on a near-white page; a pale-blue band marks
  header and utility zones. No full-bleed photography, no decorative gradients,
  no textures in the core UI — gradients appear only on AI surfaces and brand
  marks.
- **States.** Buttons darken on hover and pick up a soft shadow; table rows and
  menu items tint pale blue; links underline. Active tab = blue bold label with a
  blue underline; selected nav item = pale-blue fill with blue text.
- **Transparency and blur.** Sparing. Selection highlights use a blue tint;
  scrims are a translucent dark wash; frosted glass is limited to four blur radii
  with a paired overlay. No heavy glassmorphism.
- **Motion.** Minimal and utilitarian — fades and short slides, a thin progress
  bar on the toaster. No bounces, no decorative loops.
- **Layout.** Fixed top header, fixed left navigation rail, scrollable content.
  Tables stick their header and pagination; overlays are right-anchored slide-in
  panels.

---

## Iconography

- **The set.** The official 6D ONE UI icon set — **729 SVGs** in `icons/`, one
  per file, named in camelCase by their delivered semantic name (`dashboard`,
  `simSwap`, `addAccount`, `changePlan`, `activateSim`…). Browse
  `Component/iconography.html`; the machine-readable list is
  `icons/registry.json`. This is the **only** sanctioned set.
- **Style.** Monochrome filled glyphs on a `0 0 24 24` viewBox, single flat fill,
  rendered at 16px by default. Hover and active colour belong to the surrounding
  component, never to the file.
- **Naming is usage.** Reference by exact registry name —
  `<img src="icons/<name>.svg">` — and map each action or entity to its icon by
  name (Add → `add`, Delete → `delete`, SIM Swap → `simSwap`, Export → `export`).
  If the exact concept is missing, pick the closest listed name; if nothing fits,
  ask. Never invent an icon or reach for another set.
- **Format.** Individual SVG paths — not an icon font, not emoji. Status is
  communicated with a coloured word label.
- **Logo.** The 6D mark (blue swirl + orange accent) with the "6D Technologies /
  Smart Ideas, Delivered" wordmark in deep navy. Official assets:
  `assets/6d-logo.webp` (full lockup), `assets/6d-mark.webp` (mark only, for the
  collapsed rail and favicon), `assets/6d-logo-white.png`. The 8 product
  wordmarks live in `assets/products/`. Logos are never recoloured, redrawn,
  restyled, stretched, or substituted (`RULES.md` §7).

---

*Reconstructed June 2026 from `Components.fig` + spec PDFs; last documentation
revision August 2026.*
