# 6D ONE UI — Rulebook

The **single normative source** for every rule that governs a generated screen.
Foundations (§1–§9) apply to all output; component rules (§10) are the locked
specs per component.

**Reading order:** `CLAUDE.md` (authority, reuse contract, pipeline) → this file
(rules) → `Component/*.html` (markup) → `DESIGN_SYSTEM.md` (governance, a11y,
heuristics).

**Precedence.** Concrete values live in the `tokens/` files and always win over
prose. Where a rule here conflicts with a prompt, chat message, screenshot, or
reference, **this file wins** — resolve by the hierarchy in `CLAUDE.md` §1,
never by averaging or "improving". Non-normative background lives in
`README.md`; it never overrides a rule or a token.

Every rule below is stated **once**. Other documents link to it rather than
restate it.

---

## 1. Colour — the palette is closed

### 1.1 No new colours (absolute)

The only colours permitted in any design are the tokens already defined in
`colors_and_type.css`, referenced as `var(--token)`.

- **Never introduce a colour that is not an existing token** — no new hex,
  `rgb()`, `rgba()`, `hsl()`, `oklch()`, or named CSS colour; no new gradient;
  no new tint or shade of a token.
- **Never accept a colour a user supplies.** If any user, in any prompt or chat
  message, shares a hex / RGB / HSL value and asks for it, **decline**. Map the
  intent to the nearest sanctioned token, or ask which token they mean, and say
  plainly that the palette is fixed.
- **If a colour is genuinely missing,** STOP and ask. A colour enters the system
  only by a deliberate edit to `colors_and_type.css` — never inline in a
  screen, never on one user's say-so.

### 1.2 Sanctioned tokens (the entire permitted palette)

| Group | Tokens |
|---|---|
| Primary blue | `--primary-500` `#0099FF`, `--primary-600` `#0578BE`, `--primary-200` `#BAE4FF`, `--primary-50` `#F1F8FF` (legacy aliases `--blue-500/600/200/100`) |
| AI accent | `--orange-500` `#EE743B` |
| Neutrals | `--ink-900` `#1D1D1D`, `--ink-700` `#555555`, `--ink-600` `#6D6D6D`, `--ink-400` `#8D8D8D`, `--line-100` `#EDEDED`, `--line-200` `#DCDCDC`, `--line-300` `#D9D9D9`, `--surface-0` `#FFFFFF`, `--surface-50` `#F9F9F9`, `--surface-100` `#F4F4F4` |
| Semantic | `--danger`/`--danger-bg`, `--success`/`--success-bg`, `--warning`/`--warning-bg`, `--alert`/`--alert-bg`, `--info` (= primary blue)/`--info-bg`, `--stepper` |
| Brand / AI deep | `--navy-700` (logo wordmark), `--navy-800`, `--purple-900`, `--purple-500`, `--aarya-gradient`, `--aarya-soft-gradient` |
| Glass overlays | `--glass-light` (surface-0 @60%), `--glass-dark` (ink-900 @55%) |

Anything not listed here and not in `colors_and_type.css` is not a
permitted colour. Glass overlays are translucency of existing tokens, not new
colours.

### 1.3 Role map (one brand blue, applied by role)

- **`--primary-500`** — every actionable / selected / active element: primary
  buttons, CTAs, links, active tabs, selected states, interactive controls, nav
  highlights. Never a large text-heavy background, never white body text on it,
  never a second blue for primary actions.
- **`--primary-600`** — interaction states only: hover, pressed, active button,
  hovered links/cards. Never the default primary, never a large surface.
- **`--primary-200`** — focus rings, input focus borders, selected-row
  indicators, hover outlines, keyboard-nav / accessibility states. Never a CTA
  background, never white text on it, never destructive.
- **`--primary-50`** — tinted surfaces: containers, table-row hover,
  selected-menu background, header bands, cards, info sections; dark text only.
  Never a button, active state, or white text.
- **`--orange-500`** — AI only: AARYA indicators, AI insights, AI
  recommendation badges/notifications/highlights, innovation callouts. Used
  sparingly. Never primary, destructive, or error.
- **`--aarya-gradient` / `--aarya-soft-gradient`** — AARYA/AI surfaces and brand
  marks only, on explicit request (plus the sanctioned Profile Overview top
  section, §10.16). Never a general surface.

### 1.4 Resolved deprecations

- **Canonical `--info` = `#0099FF`** (primary blue). The teal `#42A6CE` and
  `--info-bg #EBF6FA` are deprecated — no teal in new screens.
- **`--gold`** is an alias of `--warning`; prefer `--warning`.
- Values from prior skill versions are **deprecated and must not be used**:
  danger `#E53935`, success `#0F9731`, page background `#F5F6FA`, header
  `#EEF2F7`, search gradient `#7B2FBE→#1A56DB`, Open Sans.

---

## 2. Typography

Poppins only, self-hosted from `fonts/` (Light 300 / Regular 400 / SemiBold 600
/ Bold 700). No other webfont, no Open Sans, no system-font styling decisions.

The **only** sanctioned sizes are 12 / 14 / 16 / 20 / 24px, each bound to a
mandatory line-height (every role ≥ 1.33× for WCAG 2.1 AA):

| Size | Line-height | Ratio | Roles |
|---|---|---|---|
| 24 | 32 | 1.33× | `--t-h1` — overlay & page titles |
| 20 | 28 | 1.40× | `--t-page-title`, `--t-h2` |
| 16 | 24 | 1.50× | `--t-section` |
| 14 | 20 | 1.43× | `--t-h3` — card / popup headings |
| 12 | 16 | 1.33× | `--t-body`, `--t-body-med`, `--t-body-bold`, `--t-label`, `--t-small` |

- There is **no 18px, 11px, or 36px role** — the old `--t-display` (36px) is
  removed. Pull any off-scale value to the nearest sanctioned pair.
- **Sub-caption exception tier:** `--t-tiny` (10/14) and `--t-micro` (9/12) sit
  below the 12px floor and are reserved for dense badge / pill / timestamp
  glyphs and locked micro copy (Left Menu footer 10px, header tool labels 9px).
  Never body or general screen text.
- Never create a custom size or line-height without explicit approval — change
  the token file deliberately, never a screen.
- Minimise type and weight variation; keep one hierarchy: Page Title → Section
  Title → Card Title → Body → Caption.
- **Label weight:** form-field labels are 12/500 `--field-label` (`#6D6D6D`).
  `--t-label` (12/600 `--ink-900`) is for **non-field** labels (section labels,
  definition lists, micro-dashboard keys). Never mix the two.

---

## 3. Spacing

The layout spacing scale is `--space-1…5` = **4 / 8 / 16 / 20 / 30**. It governs
all gaps between elements, module padding, and page margins. **5px and 10px are
banned as layout values.**

**Best practice:** prefer multiples of **8px**; use **4px** only for fine
adjustment; line objects up vertically and horizontally; never invent an
off-scale value.

Two exemptions, neither reusable as general spacing:

- **Locked component internals** — values baked into an approved component spec
  (button padding 9/10px, header search padding `0 3px 0 10px`, profile `.mi`
  gap 5px / padding 10px). Reproduce them inside that component only.
- **Grid geometry** — container / margin / gutter values (§4) are grid
  infrastructure, consumed only through `.ds-grid`.

---

## 4. Layout grid (responsive 12 → 6 → 2)

Compose every screen inside the `.ds-grid` container; children span columns with
`.ds-col-N`. Geometry comes only from the grid tokens in `tokens/structure.css`.
Reference: `Component/column-grid.html`.

| Breakpoint | Container | Margin | Columns | Gutter |
|---|---|---|---|---|
| Desktop ≥1024 | `--container-max` 1320px | 60px | 12 | 24px |
| Tablet 768–1023 | fluid | 32px | 6 | 16px |
| Mobile 320–767 | fluid | 16px | 2 | 16px |

- **Desktop** is the default for all enterprise screens; use spans in multiples
  of 2 / 3 / 4 / 6 / 12 and align every card to columns.
- **Tablet** stacks secondary content below primary, collapses side panels, and
  converts 4-column layouts to 2-column; spans > 6 clamp to full width. No
  desktop sidebars.
- **Mobile** is single-column-first: cards stack (opt into a 2-up with
  `.ds-col-1`), tables become cards or expandable rows. No horizontal scroll, no
  multi-column forms.

**Always:** plan on the 12-column desktop grid, use approved containers only,
align components to columns, keep spacing-token consistency, design mobile-first
behaviour, preserve hierarchy across breakpoints.
**Never:** place components outside the grid, use arbitrary spacing or widths,
create a custom container width, mix two grid systems on one screen, or break
responsive alignment.

**Declare the grid type first.** Every screen must declare its grid — **12, 6,
5, 3, or 2 columns** — before layout is generated, and all components snap to it.

---

## 5. Radius, elevation, blur

- **Radius:** only SM 4 / MD 6 / LG 10 / XL 16 / pill 999, bound to their
  components. Never a new radius — dropdown and popover panels use
  `--radius-md`, not 12px.
- **Elevation:** the shadow tokens only. Popovers, drawers, and popups use
  `--shadow-lg`; never substitute another shadow.
- **Blur (frosted glass).** Background blur positions a surface on the z-axis,
  as shadow does. Use only `--blur-sm` 4 / `--blur-md` 8 (default) / `--blur-lg`
  16 / `--blur-xl` 24 — never a literal. Always pair the blur with the matching
  glass overlay so text stays legible: `--glass-light` (dark text) or
  `--glass-dark` (white text). Apply blur only over textured / imagery /
  scrolling backdrops (glass panels, dropdowns, drawers, scrims, sticky headers
  over media) — never on an already-opaque surface — and always ship a
  `@supports not (backdrop-filter)` fallback that raises the overlay opacity.
  Reference: `Component/blur.html`.

```css
backdrop-filter: blur(var(--blur-md));
background: var(--glass-light);   /* dark UI → var(--glass-dark) */
```

---

## 6. Motion and layering

- Every transition and animation uses the named tokens and keyframes in
  `tokens/motion.css`. No literal durations or easings.
- A `prefers-reduced-motion` gate is **mandatory on every screen**; decorative
  loops must die under it.
- Motion is utilitarian: fades and short slides only — no bounces, no long
  decorative loops.
- Every `z-index` comes from the scale in `tokens/structure.css`
  (`--z-scrim` < `--z-drawer` / `--z-modal` < `--z-toaster`).

---

## 7. Icons and logos

- **Icons:** only the SVGs in `icons/` — the official 6D ONE UI set (729 filled,
  monochrome `#555` glyphs on a `0 0 24 24` viewBox). Reference each by its
  semantic name from `icons/registry.json`: `<img src="icons/<name>.svg">`.
  Never generate, draw, or import icons from another set — no emoji, no
  improvised inline paths, no icon fonts. Default size `--icon-size` (16px);
  hover colour is owned by the surrounding component. **Left Menu nav-row icons
  are 20px** (locked exception). If the exact concept is missing, pick the
  closest registry name; if nothing fits, ask. Gallery:
  `Component/iconography.html`.
- **Logos (closed, locked set).** Brand: `assets/6d-logo.webp`,
  `assets/6d-mark.webp`, `assets/6d-logo-white.png`. The 8 official product
  wordmarks: `assets/products/{aureus,canvas,echelon,engrafi,infinity,magik,
  mercado,ventas}.png` (transparent PNG, navy Poppins wordmark + colour mark).
  Reference by path only; gallery `Component/product-logos.html`. Never
  recolour, redraw, restyle, stretch, substitute, or invent a logo. If a needed
  logo is missing, STOP and ask.

---

## 8. Buttons and action hierarchy

- Only the five approved variants — Primary, Secondary, Tertiary, Success,
  Danger — plus Text buttons (underline on hover). No new variants.
- **Width is auto** (min-width 80px); never fixed.
- **No icons inside buttons** — there is no "button with icon" variant.
- **Every variant ships four states:** Default, Hover, Focused
  (`box-shadow: 0 0 0 3px var(--primary-200)` via `.fc` / `:focus-visible`), and
  one canonical Disabled (`--line-100` fill, `--ink-400` text, no shadow,
  `not-allowed`). Never hide an unavailable action. Reference:
  `Component/buttons.html`.
- **Action hierarchy** (any screen or component with more than one action):
  never two equal-weight actions. Exactly **one primary** (`.primary`, filled
  blue — the main, most obvious action), then **secondary** (`.secondary`, blue
  outline; may be several), **tertiary** (`.tertiary` or text button), then
  **quaternary** (`.ghost` / text, e.g. Cancel). Button style is the
  differentiator: heavier = more important. Never two `.primary` in one group;
  demote extras down the ladder rather than invent a style; destructive primary
  uses `.danger`. In footers the primary sits on the trailing edge per the popup
  / overlay specs. If two equal primaries seem needed, STOP and rethink.

---

## 9. Form fields

- **Height is 40px — locked, every screen.** Write `height: var(--field-h)` for
  every field: text inputs, number fields and spinners, select / dropdown
  triggers, searchable and multi-select fields, search fields, and date /
  date-range / time picker triggers. Never a literal `34px`, `36px`, `42px`, or
  any other ad-hoc control height. Multi-line `textarea` keeps `--textarea-h`
  (60px, resizable). The only exceptions are the Login page's floating-label
  fields and the Data Table's "go to page" micro-input — locked component
  anatomy. If a different height seems needed, STOP and ask.
- All field dimensions, borders, and label/value type and colour come from the
  `--field-*` tokens.
- **Hover** fills the field `--surface-50`, reverts on focus/active, and **never
  applies to a disabled field**.
- A clear/cross icon (`--clear-icon`, hover `--clear-icon-hover`) appears once a
  field holds a value.
- **Dropdowns open real lists and set real values** — never decorative.
- The **open** dropdown/select panel uses `--field-list-border` (`#DCDCDC` =
  `--line-200`) with `--field-list-shadow` — the hairline, **not** the focused
  `--field-border-focus` (`#6D6D6D`).
- **Canonical close affordance:** every close / clear / dismiss control uses
  `.ds-close` (defined in `colors_and_type.css`). Never hand-roll an
  alternative.

---

## 10. Component rules (locked specs)

Reproduce the canonical markup in `Component/` verbatim and drive it with
tokens. Never hand-roll a substitute, never re-derive a component. The mapping
of screen block → canonical file is the Component Reuse Contract in
`CLAUDE.md` §4. If a screen needs something with no canonical component, STOP
and ask.

### 10.1 Header — `Component/header-ui.html` (LOCKED, default on every screen)

Fully responsive: it fills any width, flexes down, and never overflows — never
give it a fixed width or wrap it in a fixed min-width shell.

- **Mandatory parts, always present:** Title, Sub-text line, Reminders CTA, and
  the User details cell + dropdown. Never omit any of them.
- **Smart search + voice mic is OPTIONAL** — include only when a screen requests
  search.
- **Extra CTAs are added on request** by cloning the Reminders `.tool` cell
  (icon + label, optional `.badge`) — identical size, spacing, and hover. Never
  a differently-styled header action.
- **Alignment, at every screen size:** Title and Sub-text always LEFT; smart
  search, CTAs, Reminders, and User details always RIGHT (an elastic spacer pins
  the right group to the edge; the title block never grows past its cap).
  Reminders and the user cell are flush, full-height bordered cells — no gap
  between them.
- **Hamburger** appears at the far left (before the Title) at ≤820px to toggle
  the Left Menu; hidden on desktop.
- **Built-in responsive behaviour (do not alter):** ≤1024px search narrows;
  ≤820px sub-text hides and search collapses to an icon cell; ≤560px optional
  search hides and tool/user labels drop — Title, Reminders, and User details
  always remain.
- Sub-text is a single ellipsized line; its full text appears only via the
  native `title` tooltip.
- Search placeholder is `rgba(255,255,255,.82)` — readable white on the
  gradient; never recoloured dark.
- Mic recording state: magnifier removed, waveform fills the bar, mic becomes
  the stop button, `title` toggles "Voice search" ⇄ "Stop".
- The Profile cell takes its open-state background while its dropdown is open.
- The header hides on content scroll-up past one header height and returns on
  scroll-down.
- The logo lives in the Left Menu brand section, never in the header.

### 10.2 Left Menu — `Component/left-menu.html` (LOCKED, every screen)

- Brand/logo section background `#F1F8FF`; its height matches `--header-h`.
- Nav-row icons **20px** (`.item .ic`); chevron stays 16px.
- Footer "powered by 6D Technologies" is **10px / Regular (400)** with the
  default cursor; `cursor:pointer` belongs to the collapse button only.
- Rows are Regular weight; **only the selected row is SemiBold**. Every row
  carries its hairline bottom border.
- The menu search is **borderless** (icon + input, `focus-within` =
  `--blue-100`) and is never omitted.
- **Collapsed-rail Level 2 hover flyout.** In the collapsed rail (72px) the
  inline Level 2 accordion is hidden, so hovering a Level 2 row
  (`.group[data-acc]`) reveals its children in a right-side popover:
  `--surface-0`, `--radius-md`, `--shadow-lg`, `--line-100` border, positioned
  8px right of the row, top-aligned, nudged up if it would overflow the
  viewport. It carries a 600-weight header (the Level 2 label) then child rows
  (`--sub-fg` Regular; active `--sub-active` SemiBold; hover `--blue-100`). It
  stays open while the pointer travels row → panel (short close delay) and
  dismisses on leave or rail expand. Level 1 rows have **no** flyout — they
  expand the rail on click. Entry transition is `prefers-reduced-motion` gated.
  Never build an alternate collapsed-menu reveal.
- **No-result state:** zero gap between illustration and label; label Regular in
  the danger colour; thin red magnifier; cloud floats and magnifier scans
  (decorative loops die under `prefers-reduced-motion`).

### 10.3 Popup / dialog — `Component/popup-dialog.html` (the ONE popup)

Every popup, modal, confirmation, and dialog reuses this component. Never build
a new popup shell or an alternate layout, and add no elements until asked.

- **Anatomy:** header — title (22px/500) + subtext description line (`.p-desc`,
  13px, `--ink-600`), with the header's own bottom drop shadow; body — a
  "What happens next:" heading (`.next-h`, 16px/500) followed by an ordered
  `.next` list of dynamic bullet points (CSS auto-numbering); footer —
  right-aligned, exactly two buttons: `Cancel` (`.ghost`) and one main action.
- **Elevation** is always `--shadow-lg`. **Radius** is `--radius-lg` (10px) —
  12px is off-scale and banned.
- **Backdrop:** the popup sits centred on a dimmed `--glass-dark` scrim at
  `--z-scrim`, the popup itself at `--z-modal`. Never float a popup without a
  backdrop.
- **Responsive:** width `min(800px, calc(100vw − page gutters))` — caps at
  800px, otherwise fills its column span on the 12-column grid, centred. Below
  560px gutters tighten and the footer buttons stack full-width (Cancel below
  the main action).
- **Error variant:** `.error` on `.popup` → danger title + `.danger` main
  button. No other structural change.
- No new colours, no extra icons, no in-popup close button.

### 10.4 Overlay panel — `Component/overlay-panel.html` (the ONE drawer)

The right-to-left slide-in overlay for detail, edit, and create views.

- **Fixed header + footer, scrolling body.** Header (60px, title + sub-text,
  bottom drop shadow, **no close icon**) and footer (56px, on `--line-100`,
  `Cancel` `.ghost` left + main action `.primary` right) are `flex:none`; only
  `.o-body` scrolls (`flex:1; min-height:0; overflow-y:auto`).
- **Body is on the 12-column grid** (`repeat(12,minmax(0,1fr))`,
  `--grid-gutter`) and is a CSS container. Compose with `.o-col-12` / `.o-col-6`
  / `.o-col-4` / `.o-col-3`, which collapse to the panel's own width (≤640px
  thirds/quarters → halves; ≤420px → full-width stack). Never off-grid or raw
  `span-N`.
- **Content-adaptive width (desktop ≥1024):** more data → `.w-10` or `.w-8`;
  less data → `.w-4` or `.w-3`; default `.w-8`. Never an off-grid width.
- **Tablet (≤1023) and mobile (≤767) always render 100% width**, full-bleed
  (`top:0; right:0; height:100vh; border-radius:0`), 12-grid body intact.
- **Scrim is mandatory:** a dimmed `--glass-dark` scrim at `--z-scrim`, one
  layer below the panel's `--z-drawer`, fading with `--dur-5` / `--ease-out` and
  `prefers-reduced-motion` gated. Clicking the scrim is **not** a dismiss
  affordance — dismissal is via Cancel only; never add a × icon.
- **Motion** `--dur-5` / `--ease-out` (exit `--ease-in`); elevation
  `--shadow-lg`.

### 10.5 Data Table — `Component/Data Table.html`

The one tabular-data component. Extend it; never strip defaults.

- **Principles:** data-first (the critical value is found in ~3s); progressive
  disclosure (show key info only — push detail into a detail view, side panel,
  modal, or expandable row); minimal visual noise (subtle borders, soft row
  separators, transparent panel, minimal colour and icons — no heavy borders, no
  zebra striping, no icon clutter).
- Composed on the 12-column desktop grid. Panel is **transparent** — never a
  filled table background. Column headings are **500 weight** — never heavier.
- **Row height is the locked `--table-row-h` (60px)** — never a literal or
  ad-hoc padding. A pasted "64px" standard is superseded by this token.
- **Header zone order:** Listing count → Search → Filter → Sort → Columns (Add
  Column) → Views → Bulk Actions.
- **Default 10 data rows minimum**; **Per View is the locked set 5 / 10 / 25 /
  50 / 100 (default 10)** — a functional dropdown that repaginates and resets to
  page 1.
- **Exactly 7 default columns**; every other column lives under **Add Column**.
- **Free search across ALL columns** (not one field); placeholder "Search all
  columns".
- **Every column heading sorts by default** — first click ascending, second
  descending, with an arrow indicator (`--blue-500` when active) and a filter
  chip. Numeric columns sort numerically, text alphabetically. A toolbar
  shortcut such as "Sort by Risk" simply sorts that column.
- **Listing count is dynamic** — "Listing N Reseller" is the total matching rows
  across all pages, live with search and filters, never the current page's
  count.
- **Left-aligned** text; **text-based statuses** (coloured label, no dot).
- **Row actions live in the overflow (kebab) menu** with a visible **Actions**
  header — never scattered pencil/trash icons in the row, and never drop
  View/Edit/Delete. At most **one** row-level dropdown (min `--table-rowdd-min`
  120px), for quick actions only, never a row's primary action.
- **Add Column** is a multi-select dropdown that stays open until an outside
  click: added columns show a check plus a **Danger text button "Remove"**
  (`--danger`, Button-component style), others show a "+". Added columns also
  carry an inline "×" remove control in their header.
- **Truncated cells** show their full value in a custom tooltip popover on hover
  (`--ink-900` surface, white text, `--shadow-lg`) — only when the text is
  actually clipped.
- Inline dropdowns and fields inside columns are functional, never decorative.
- **Pagination** is transparent and always includes First, Previous, Next, Last,
  numbered pages, and a Go-to-page input.
- Keep every default — search, More Filters, chips, select-all, per-view, sort,
  Add Column, bulk actions, full pagination. WCAG 2.1 AA throughout.

### 10.6 AARYA chatbot — `Component/aarya.html` (the ONE chat)

Any request for a chatbot, conversational AI, AI assistant, or chat widget uses
this component. Never build a new one.

- **Structure:** flex column, height `calc(100vh - var(--header-h))`, docked at
  `top: var(--header-h)`; dragging is clamped so it never overlaps the header.
  Fixed header + **sticky input bar** (`flex-shrink:0`); the message list is the
  only scroll region (`flex:1; min-height:0; overflow-y:auto`).
  **Minimise/reopen must restore `display:flex`** — never `display:block`; the
  before-minimise and after-reopen states must be identical.
- **Colours (token-driven, no literal hex):** header `--aarya-gradient`; frame
  border `2px solid var(--purple-500)`; video toggle-on `--success` (off track =
  translucent `--surface-0`); bot bubble `--surface-100` on a `--line-100`
  hairline; user bubble `--aarya-soft-gradient`; input bar `--primary-50` fill +
  `--primary-200` border; send button `--ink-400` idle → `--primary-500` with
  text.
- **Radii (scale only):** frame `--radius-xl`; input bar `--radius-lg`; bubbles
  `--radius-xl` on the three round corners + `--radius-sm` on the tail corner
  (bot tail top-left, user tail top-right); attach menu `--radius-sm`.
- **Dimensions (locked tokens in `tokens/structure.css`, never literals):**
  `--aarya-w` 340; `--aarya-video-h` 170 (collapses to 0 when Video is off);
  `--aarya-input-h` 48; launcher `--aarya-launcher-w` × `--aarya-launcher-h`
  58 × 66.
- The message edit icon sits on the **right** of the message; the search bar
  follows the AARYA input spec.

### 10.7 Login — `Component/Login.html` (LOCKED)

The DS-standard responsive split login, driven by `window.LOGIN_CONFIG` /
`applyLoginConfig()`.

- **Template copy stays DUMMY.** Hero heading/subtext and product name ship as
  neutral placeholder copy; never hardcode product marketing text into the
  source — consumers swap it via config or tweaks.
- **Product lockup is logo-only.** The product logo shows by default with **no
  product-name text line** above the "Welcome to …" heading; `productName`
  drives that heading only. The logo **defaults to the Ventas wordmark**
  (`assets/products/ventas.png`), renders at **20px height**
  (`.product-lockup img`), and is dynamic — the Tweaks **Product** selector (all
  8 sanctioned products) or `LOGIN_CONFIG.productLogo` swaps it.
- **One 6D logo only:** the hero uses the 6D wordmark, never stretched
  (`height:34px; width:auto`); the form lockup uses a product wordmark.
- **Hero is an animated 3-slide carousel** (`.hero-carousel` → `.hero-slide`
  stacked in one grid cell + `.hero-dots` pill indicators): crossfade,
  auto-advance every 5s, pauses on hover and when the tab is hidden, clickable
  dots (`role="tablist"`, active dot widens), entry animation
  `prefers-reduced-motion` gated. Never a single static hero.
- **Equal, viewport-responsive vertical rhythm:** the heading↔subtext gap and
  the carousel↔dots gap are the same value `clamp(14px,2.2vh,20px)`, and
  hero-body padding is `clamp(20px,4vh,36px) 0`. Keep the two gaps equal if
  retuned.

### 10.8 Breadcrumb — `Component/breadcrumb.html`

- **Style is locked:** reproduce the markup and classes verbatim, tokens only —
  completed steps `--ink-900` 12/20 600-weight, current `--ink-400` 400-weight,
  `/` separators. Never a bare `<a>` (renders browser blue), never recolour,
  respace, or restyle.
- **Placement is locked:** always inside the Body, directly below the Header, as
  the first body element above the page title/content — never in the header, the
  Left Menu, or floating.
- **Usage — detail drilldown only:** show a breadcrumb only once the user has
  navigated from a main/landing (Level 1) page into a detail page (Level 2, 3,
  or 4), appending the current step as they go deeper. **Never on a Level 1
  main/landing/list page.**
- **Max 4 steps** — 3 previous steps + the current step (`.cur`, non-clickable,
  4th). Beyond 4, keep only the first and the current step visible; every step
  between collapses into a "…" item (`.dots`) revealing the hidden steps in a
  hover dropdown (`.menu`). Every completed step carries a `.tip` tooltip of its
  full label.

### 10.9 Badge — `Component/badge.html`

A badge displays **numeric status data — a numeric value only**.

- **Parts:** the numeric label; an optional leading symbol (`+` / `−`); optional
  trailing abbreviation letters (`d` day, `K` thousand, `M` million). Overflow
  caps at `99+`. Never arbitrary text, dots, icons, avatars, or a dismiss ×
  inside a badge — the old label-badge / callout system is removed.
- **Shape:** pill (`--radius-pill`, `--font-ui`, 11px/600,
  `font-variant-numeric:tabular-nums`, height 20 / min-width 20).
- **Default (soft) appearances:** `neutral` (`--surface-100`/`--ink-700`),
  `information` (`--primary-50`/`--primary-600`), `success`
  (`--success-bg`/`--success`), `warning` (`--warning-bg`/`--ink-900` — dark
  text, never yellow-on-yellow), `danger` (`--danger-bg`/`--danger`).
- **Bold appearances:** `informationBold` (`--primary-500`/white), `successBold`
  (`--success`/white), `warningBold` (`--warning`/`--ink-900`), `dangerBold`
  (`--danger`/white). **Inverse:** `--surface-0`/`--ink-900` for dark
  backgrounds.
- **Anchored count:** the same badge on an icon / nav host (icons from `icons/`
  only), plus a dot-only variant (`--danger`).
- **Sanctioned semantics only** — Neutral, Information (primary blue), Success,
  Warning, Danger. There is **no `discovery` appearance** (purple is AI-only and
  there is no light-purple surface token): map a discovery/purple request to the
  nearest semantic and say so, or ratify `--discovery` / `--discovery-bg`
  deliberately first.
- **Accessibility:** number grouping differs by locale — format with the app's
  i18n library or `Intl.NumberFormat`. Never a new badge colour, size, or
  radius.

### 10.10 Lozenge — `Component/Lozenge.html`

A prominent, compact label for a meaningful attribute — workflow status, system
state, priority, permission — with **higher prominence than a Tag**.

- **Parts:** a text **label** (required); an optional **leading icon** (only
  where its meaning is well established — an `icons/` glyph tinted to the label
  colour via inline `currentColor`, never recolouring the file); an optional
  **trailing metric** (count/score) on subtle semantic lozenges only.
- **Shape:** uppercase `--font-ui` 600, letter-spacing `.04em`, `--radius-sm`;
  the metric uses tabular numerals.
- **Sizes (locked tokens):** `--lz-h-sm` 16 (dense rows / cells) / `--lz-h` 20
  (default) / `--lz-h-lg` 26 (headers, focal labels); text 9 / 10 / 12px. Never
  a literal.
- **Subtle (default):** `neutral`, `information`, `success`, `warning`
  (`--warning-bg`/`--ink-900`), `alert`, `danger`. **Bold:** `neutralBold`,
  `informationBold`, `successBold`, `warningBold` (dark text), `alertBold`,
  `dangerBold` — maximum prominence, one focal lozenge per view.
- **Colours: sanctioned semantics only.** No accent-teal, accent-red, or purple
  lozenge (purple and orange are AI-only). Map any accent request to the nearest
  semantic and say so; never accept a user-supplied hex.
- **Lozenge vs Tag:** use a lozenge when the label affects prioritisation,
  action, or interpretation; use a **Tag** (`Component/tag.html`) when the label
  is descriptive metadata that classifies, groups, or filters.
- Never colour alone (WCAG 2.1 AA); never a new lozenge colour, size, or radius.

### 10.11 Avatar — `Component/Avatar.html`

- **Body is a CIRCLE only** (`border-radius:50%`) — no square or hexagon avatar.
- **Five sizes only** (tokens, never literals): `--avatar-xs` 24 /
  `--avatar-sm` 32 / `--avatar-md` 40 (default) / `--avatar-lg` 48 /
  `--avatar-xl` 64. Pick the smallest that stays legible.
- **Body content:** a photo (`<img>` cover-filling the circle), initials
  (`--blue-100` fill + `--blue-600` text), an icon, or the default `account`
  glyph on `--surface-100`. Fills use only `--blue-100` / `--success-bg` /
  `--surface-100` with their paired dark text.
- **Presence dot (bottom-left):** available `--success` / away `--alert` /
  focused `--primary-500` / busy `--danger`, with a 2px `--surface-0` ring.
- **Status badge (top-right):** approved `--success` / verified `--primary-500`
  / locked `--ink-700` / declined `--danger`; the glyph comes from `icons/` and
  is tinted white via CSS `mask` (the file is never recoloured). Presence and
  status may appear together.
- **Avatar with text:** avatar (default `--avatar-lg` 48) + **name**
  (`--t-avatar-name`, 12/600, `--ink-900`) + **designation**
  (`--t-avatar-role`, 10/400, `--ink-600`) at gap `--space-3` — these tokens
  only, never a hardcoded size or weight.
- **Accessibility:** meaningful avatars use the image `alt` (the user's name);
  decorative ones use `alt=""`. No tooltip on a non-interactive or disabled
  avatar. On mobile, tapping the avatar reveals its details.
- Never a new avatar shape, size, or colour.

### 10.12 Notification bars — `Component/notification-bars.html`

Persistent system notification bars use a tinted fill (`--info-bg` /
`--success-bg` / `--alert-bg` / `--danger-bg`) with a uniform 1px border
(`border:1px solid transparent` + the variant `border-color`). **No left accent
stripe** — never a `border-left-width` or thick coloured left edge.

### 10.13 Toaster — `Component/Toaster.html`

Top-right, `10px` margins. Rounded top, square-ish bottom, progress bar along
the **bottom**, state-coloured heading. Enters with `ds-toaster-in`; the close
icon rotates 180° and turns danger-red on hover (`.ds-toaster-close`). Never
centre it, and never add a left accent stripe.

### 10.14 Snackbar — `Component/snackbar.html`

A brief, **non-interrupting** message anchored **bottom-left** on a dark
`--ink-900` surface with white (`--surface-0`) text.

- **Two behaviours:** auto-dismiss clears itself after **5s**; persistent stays
  until the user acts or closes it via the trailing **×**.
- **Anatomy:** message text (12px) + optional action link (`--blue-500`,
  underline on hover) + optional close × on persistent snackbars only
  (`--surface-0` at `opacity:.6` → `--danger` on hover).
- **Visuals:** `--radius-sm`, `--shadow-lg`, stacked newest-on-bottom with a
  `--space-2` gap, slide-up in/out, layered at `--z-toaster`. Tokens only.
- The snackbar **Undo** link is the only sanctioned undo pattern
  (`DESIGN_SYSTEM.md` §5, heuristic 3).

### 10.15 Date pickers

**Date Range Picker — `Component/Date Range Picker.html`.** Dual-month start–end
calendar behind the canonical form-field trigger (§9): 40px `--field-h`,
`--field-border`, `--field-radius`; on open `--field-border-focus` +
`--field-focus-ring`; value text `--field-value`.

- **Closed by default; opens only on a field click.**
- After the start day is picked the popover **stays open until the range is
  complete** — outside clicks never dismiss it.
- It closes **only** on **Apply** (`.primary`, disabled until both ends are set;
  commits the range) or **Cancel** (`.ghost`, discards).
- **Visuals:** range band `--radius-pill` ends on `--blue-100`; start
  `--blue-600` / end `--blue-500` endpoints; today a 1px `--ink-400` ring;
  popover `--radius-md` + `--shadow-lg`.

**Date & Time Picker — `Component/date-time-picker.html`.** A single **Date**
selector plus a single **Time** selector sharing the range picker's field,
popover, and calendar styling exactly.

- **Closed by default; opens only on a field click;** no outside-click dismiss.
- **Date** has **no footer** — clicking a day commits it and closes immediately.
- **Time** uses Hour + Minute scroll columns and an AM/PM toggle with a
  two-button footer — **Apply** (`.primary`, disabled until both hour and minute
  are chosen) / **Cancel** (`.ghost`).
- **Visuals:** circular 34px cells, hover `--blue-tint-15`, selected
  `--blue-500` (hover `--blue-600`), today a 1px `--ink-400` ring, centred
  14px/500 month header, single-letter weekdays `--ink-400`, popover
  `--radius-md` + `--shadow-lg`. **No weekend/holiday red, no legend, no "Today"
  shortcut.**

### 10.16 Profile Overview — `Component/profile-overview.html`

**The** overview header for any entity page — customer, partner, reseller, user,
account. It sits directly below the Header (and breadcrumb) on a Level 2+ detail
page; never hand-roll a bespoke profile header.

- **Anatomy (in order),** one card (`--surface-0`, `--radius-md`,
  `--shadow-sm`, `--line-100` border):
  1. **Identity / meta** — `Avatar.html` circle at `--avatar-xl`, the entity
     name in `--t-h1`, and a meta line of `icons/` icon+text items (ID, tenure,
     phone, email, segment) divided by `--line-200` hairlines; then one or more
     status **lozenges**; the **Actions** dropdown pinned right. This top zone
     sits on the **AARYA AI surface** (`--aarya-gradient`) with white text,
     white-translucent dividers, and inverted meta icons — a sanctioned explicit
     gradient use; the Actions button and lozenges keep their own tokens.
  2. **KPI strip** — a `--line-100`-topped grid of label → value stats (label
     `--t-small` / `--ink-400`, value 16/24 semibold `--ink-900`) divided by
     vertical hairlines; responsive 6 → 3 → 2.
  3. **Tabs + panel** — the `tabs.html` primary underline treatment (active
     `--t-body-bold` / `--blue-500` with a `--blue-500` underline, counts in
     `--ink-400`) over a content panel.
- **Actions = exactly one primary dropdown.** A single `.primary` "Actions"
  button opens a menu (`--field-list-border`, `--field-list-shadow`,
  `--radius-md`) holding every entity action; destructive items use `--danger`.
  Never scatter header buttons.
- **Tabs are dynamic** — list only the tabs the entity needs (each with an
  optional `count`), first selected by default. Each panel is a `fields`
  definition grid (responsive 4 → 3 → 2 → 1), raw `html`, or an embedded
  component (e.g. `Data Table.html`); a tab with no panel shows the built-in
  empty state.
- **Config-driven:** the component renders entirely from the single `PROFILE`
  object — swap the data, never fork the markup.
- Composes as a `.ds-col-12` child of `.ds-grid`; responsive (identity stacks,
  Actions goes full width, KPI/fields reflow, the tab bar scrolls). Tokens only;
  `prefers-reduced-motion` gated.

### 10.17 Banner — `Component/Banner.html`

The promotional strip spans 100% width and composes inside `.ds-grid` as a
`.ds-col-12` child — never a custom, off-grid, or fixed-max width. Fixed 80px
height, `--radius-md`, built-in carousel (solid / gradient / full-bleed-image
slides, 5s autoplay pausing on hover, prev/next controls, pagination dots).

### 10.18 Status labels — `Component/status-badges.html`

Status is a coloured **text label only — no leading dot**: success/active green,
failed red, pending orange, blocked gray, from the semantic tokens.

### 10.19 Accordion — `Component/Accordion.html`

100% wide and responsive. Header 12px / line-height 20px — **Regular (400)
closed, SemiBold (600) only for the open row**; subtext 11px / line-height 16px
with a 0px gap under the heading; body 12px / line-height 16px with equal 14px
top and bottom padding; the open header sits on `--surface-50`; the 18px chevron
rotates 180° and turns `--blue-500`.

### 10.20 Dropdown / Select — `Component/Dropdown.html`

Single and multi-select dropdowns — searchable, tag selects, clear control,
keyboard navigation. The trigger is the canonical form field and the open panel
uses the hairline border (§9). Multi-select tags use `--tag-bg` / `--tag-border`.
Never rebuild the field or reposition the caret — reuse `.field` / `.caret-icon`
and the `.list` panel style.

---

## 11. Accessibility

Every screen meets **WCAG 2.1 AA** minimum: keyboard operable, visible focus
(`--primary-200`), sufficient contrast, no colour-only communication (always
pair with text, icon, or label), and screen-reader-friendly semantics, labels,
and roles. Full compliance detail: `DESIGN_SYSTEM.md` §4.

---

## 12. Usability heuristics

All ten Nielsen heuristics are a **review gate, not advice** — a screen that
fails one is non-compliant even when every token is correct. Each is satisfied
by a named canonical component; never invent a pattern to satisfy a heuristic.
Full text: `DESIGN_SYSTEM.md` §5.

The four historically missed items, to check before printing:

1. **Status after every action** — Toaster, Snackbar, or an approved
   loading/empty state. No silent action.
2. **Undo or confirm on every destructive action** — the one popup (`.error` +
   `.danger`) to confirm; a Snackbar **Undo** link to reverse.
3. **Three-part error anatomy** — what happened / why / how to recover. Never
   "Something went wrong", a bare code, or only a red border.
4. **An explanatory empty state** — never a bare "No data".

---

## 13. Verification pass (before printing any screen)

Scan the markup and reject on any of the following:

- A literal colour (`#…`, `rgb`, `rgba`, `hsl`, `oklch`, named colour) that is
  not a `var(--token)` reference — including any colour pasted into the prompt
  or chat.
- A blue used outside its sanctioned Primary role (§1.3), a second blue for
  primary actions, or `--orange-500` used as anything but an AI accent.
- A literal px value that shadows a token; an off-scale radius, type size, or
  spacing value; a `z-index` outside the scale; a literal duration or easing.
- An icon from outside `icons/`; a recoloured or substituted logo.
- A missing tooltip on a truncated cell; a missing `prefers-reduced-motion`
  gate; a missing scrim behind a popup or overlay panel.
- Two `.primary` actions in one group; a hand-rolled version of a canonical
  component.
- A missing state — error, loading, success, or empty.

Remove every violation, then print. If removal would require a value that does
not exist as a token, STOP and ask.

---

## 14. Governance

New components, patterns, interactions, tokens, and accessibility or AI
guidelines follow the governance process in `DESIGN_SYSTEM.md` §7: prove no
existing pattern fits, document the justification, propose it for review, then
document it in `DESIGN_SYSTEM.md` and the relevant `.md` files, keeping backward
compatibility. If a request violates the design system, explain the conflict and
propose the closest compliant alternative — never generate inconsistent UI.

**Regression set:** `Component/Login.html`, the SIM List View, and NIM. After
any design-system change, regenerate one and diff it against the previously
approved output before starting new work.

When a defect is reported on a shared or locked component, fix it in the
`Component/*.html` source — never per screen — and record it in the changelog
(`CLAUDE.md` §6) so the fix holds for everyone.
