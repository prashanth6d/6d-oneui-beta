# 6D ONE UI — Compliance & Governance

The authority for **process**: how a screen is reviewed, what accessibility and
AI-experience obligations it carries, and how the design system changes.

Concrete **values** come from the `tokens/` files; concrete **rules** come from
`RULES.md`. Where a process rule here and a value token disagree, the token wins
(`CLAUDE.md` §1).

---

## 1. Scope

Every screen generated in this project is reviewed against this document before
it is printed, alongside the verification pass in `RULES.md` §13. Sections 2–6
are review gates; section 7 governs change to the system itself.

---

## 2. Mandatory design-system adherence

- Use **only approved components** — the canonical markup in `Component/`. Do
  not create a new component if an existing one can meet the requirement.
- Reuse the locked singletons: one popup (`popup-dialog.html`), one overlay
  panel (`overlay-panel.html`), one chatbot (`aarya.html`), one close affordance
  (`.ds-close`). The full mapping of screen block → component is the Component
  Reuse Contract, `CLAUDE.md` §4.
- Use **only approved tokens** for colour, typography, spacing, radius,
  elevation, blur, motion, and layering (`RULES.md` §1–§6). Never a literal,
  never a colour a user pastes into chat.
- Maintain consistency across web, tablet, and mobile on the responsive
  12-column grid, and **declare the grid type before laying out**
  (`RULES.md` §4).
- **Cover every state on every screen** — error, loading, success, and empty —
  using the approved patterns.
- Minimise cognitive load: one clear hierarchy, intentional whitespace,
  progressive disclosure, no filler.

---

## 3. AI-first experience rules

- AI surfaces use the AARYA patterns (`Component/aarya.html`) — the single
  locked chatbot (`RULES.md` §10.6).
- **`--orange-500` is used only for AI**; the AARYA gradients appear only on AI
  surfaces and brand marks, on explicit request (plus the sanctioned Profile
  Overview top section).
- AI recommendations must be **visually differentiated** from operational UI.
- AI actions must always be **explainable**; show confidence, rationale, or
  context where appropriate.
- AI **assists** — it never replaces a critical user decision.

---

## 4. Accessibility compliance

Every screen must:

- Meet **WCAG 2.1 AA** minimum contrast.
- Be fully **keyboard operable**.
- Show a **visible focus state** (`--primary-200` ring).
- Never communicate by **colour alone** — pair colour with text, icon, or label.
- Support **screen readers**: semantic markup, labels, roles, meaningful `alt`
  text (and `alt=""` for decorative imagery).
- Format numbers, dates, and currency for the user's locale
  (`Intl.NumberFormat`).

---

## 5. Usability heuristics (mandatory — every screen)

The ten heuristics are a **design-review gate**, not advice. Each maps to the
canonical component(s) that satisfy it; never invent a pattern to satisfy a
heuristic — use the component named here, or STOP and ask. A screen that fails a
heuristic is non-compliant even if every token is correct.

**1. Visibility of system status.** Every action that changes state or takes
longer than an instant reports back: `Toaster.html` (top-right, state-coloured
heading, progress bar) for confirmations and failures; `snackbar.html`
(bottom-left) for brief non-interrupting messages; approved loading and empty
states for in-progress and no-data views; a selected/active state on every
interactive control. Never leave an action silent; never invent a spinner,
progress bar, or status colour.

**2. Match between the system and the real world.** Labels, column headings,
statuses, and menu items use plain domain terms ("Subscriber", "Plan",
"Recharge") — never internal identifiers, table names, enum values, or developer
abbreviations. Statuses read as words (`Active`, `Suspended`), never as codes or
colour alone. Order fields and steps the way the user performs them, not the way
the API expects. Dates, numbers, and currency are locale-formatted.

**3. User control and freedom.** Every flow has a visible way out, and every
destructive action is confirmed or reversible:

- **Confirm before destroying** — delete / suspend / bulk-apply routes through
  the one popup, `.error` variant with a `.danger` main action.
- **Undo where reversal is possible** — a completed reversible action posts a
  persistent Snackbar carrying a single **Undo** link. This is the only
  sanctioned reversal pattern; never a separate undo bar, banner, or history
  panel.
- **Cancel is always present** — the popup and overlay panel both ship a
  `.ghost` Cancel in the footer. Cancel-only dismissal (no × icon,
  non-dismissive scrim) is deliberate; do not add a close icon to satisfy this
  heuristic.
- **Multi-step flows are backward-navigable** via the breadcrumb on Level 2/3/4
  pages; a wizard keeps a `.secondary` Back beside its primary.

**4. Consistency and standards.** Governed by §2 and the Component Reuse
Contract: one popup, one chatbot, one close affordance, one brand blue, one type
ramp, one icon set, one grid. The same action carries the same label, weight,
and position on every screen. A hand-rolled variant of an existing component is
a heuristic failure as well as a token failure.

**5. Error prevention.** Prevent the mistake rather than report it: disable the
committing action until input is valid (the pickers' Apply buttons are the
reference implementation); constrain input with a sanctioned control instead of
free text where the value set is known; keep exactly one primary action per
group; confirm the irreversible; surface inline validation on blur, before
submit. Use the canonical Disabled state — never hide an unavailable action.

**6. Recognition rather than recall.** The user should never have to remember
what the screen can show: breadcrumbs carry the path; the Left Menu keeps the
active branch visible; truncated cells reveal their full value in the hover
tooltip; icons come from the semantic registry paired with a text label; filter
and sort state is visible as chips; field labels persist above the value (never
placeholder-as-label).

**7. Flexibility and efficiency of use.** Serve novice and expert from the same
screen. Progressive disclosure keeps the default view simple (7 default columns,
detail in a side panel / modal / expandable row) while accelerators serve power
users: all-column search, sortable headings, More Filters, saved Views, Bulk
Actions, Per View, full keyboard operability. Accelerators are additive — never
the only route to an action.

**8. Aesthetic and minimalist design.** Every element earns its place. Show only
what the user needs in order to decide or act; move the rest behind progressive
disclosure. Data-first tables with minimal chrome, intentional whitespace, a
single hierarchy, minimal type and weight variation. No decorative imagery, no
filler metrics, no duplicated status, no second competing emphasis colour.

**9. Help users recognise, diagnose, and recover from errors.** Error *styling*
comes from the tokens; error **content** follows this required three-part
anatomy, in plain language:

1. **What happened** — the specific failure in the user's terms ("Recharge could
   not be applied").
2. **Why** — the cause, when known ("the plan expired on 12 Aug 2026").
3. **How to recover** — the next action, as a real control where possible (a
   `.primary` Retry, or a link to the screen that fixes it).

Never "Something went wrong", never a bare code as the message, never blame,
never only a red border. Field-level errors sit with their field; screen-level
errors use the approved notification bar; transient failures use the Toaster
danger variant. A request or error id may appear as secondary `--t-small`
`--ink-600` copy beneath the recovery action, never in place of it.

**10. Help and documentation.** Help is embedded, not a separate manual.
Sanctioned carriers only: the approved **empty state** (explains what the view
is for and offers the action that fills it — never a bare "No data"); **field
hint text** (`--t-small`, `--ink-600`, beneath the field); the **tooltip** for
an icon-only control or truncated value; the **notification bar** (`--info-bg`)
for section-level guidance; and **AARYA** for open questions, with its AI
framing per §3. Help copy is short, task-focused, and actionable. Never a help
modal, tour overlay, coach-mark layer, or paragraph of prose — if a screen needs
more, STOP and ask.

**Review pass.** The four historically missed items are status after every
action (1), Undo-or-confirm on every destructive action (3), the three-part
error anatomy (9), and an explanatory empty state (10). Confirm these before
printing.

---

## 6. UX review checklist

Before finalising any screen:

- Is the component already available in the design system?
- Is the layout visually consistent with other screens?
- Is spacing aligned to the tokens and the grid?
- Are typography styles compliant?
- Are accessibility requirements met (§4)?
- Is cognitive load minimised?
- Is the experience responsive across desktop, tablet, and mobile?
- Are error, loading, success, and empty states covered?
- Is AI behaviour consistent with the AARYA guidelines (§3)?
- Does the screen satisfy all ten usability heuristics (§5)?
- Does the markup pass the verification scan (`RULES.md` §13)?

---

## 7. Governance

Claude acts as the **Design System Guardian**. Before generating any UI,
validate the request against the design system, the accessibility rules, the UX
principles, the component library, and the AI experience guidelines.

**If a request violates the design system, explain the conflict and propose the
closest compliant alternative — never generate inconsistent UI.**

### 7.1 Introducing anything new

Before adding a component, pattern, interaction, token, accessibility guideline,
or AI-interaction pattern:

1. Validate that no existing component or pattern can be reused.
2. Document the justification.
3. Propose it for design-system review — never ship a new component silently.

### 7.2 Once approved, it must be

1. Documented in this file and in the relevant `Component/` source.
2. Reflected in `RULES.md` (the spec) and `CLAUDE.md` §6 (the changelog).
3. Added to the component registry in `SKILL.md`.
4. Added to the accessibility documentation (§4) where applicable.
5. Added to the design principles where applicable.
6. Kept **backward-compatible** with existing patterns.

### 7.3 Defects on shared components

Fix a defect in the `Component/*.html` source, never per screen, and record it
in the changelog (`CLAUDE.md` §6) so the fix holds for everyone.

### 7.4 Regression set

`Component/Login.html`, the SIM List View, and NIM. After any design-system
change, regenerate one and diff it against the previously approved output before
starting new work.
