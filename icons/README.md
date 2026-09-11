# Icons — 6D Technologies ONE UI

The **official 6D ONE UI icon set** — **729 self-hosted SVGs**, one per file.
This folder is the single home for every icon used by the design system and the
**only** sanctioned set. Never generate, draw, or import icons from anywhere
else (no emoji, no icon fonts, no ad-hoc inline paths).

- **Gallery:** `Component/iconography.html` (browsable + searchable, click to copy a name)
- **Name list:** `icons/registry.json` (machine-readable array of every icon name)

## Drawing spec (as delivered)
| Property        | Value                                   |
|-----------------|-----------------------------------------|
| Grid / viewBox  | `0 0 24 24`                             |
| Default size    | `16px` rendered (`--icon-size`)         |
| Fill style      | Monochrome **filled** glyph, single flat fill `#555` (≈ `--ink-600`) |
| Color control   | Hover/active handled by the surrounding component, not baked per-icon |
| Style family    | Solid / filled (6D delivered set)       |

## File + naming convention
- One icon per file: `icons/<name>.svg`.
- `<name>` is the **delivered semantic name in camelCase** — `dashboard.svg`,
  `simSwap.svg`, `addAccount.svg`, `changePlan.svg`, `activateSim.svg`. This is
  the name to reference everywhere; it is the identity of the icon.
- The name is semantic (what it's *for*), not visual — pick by meaning.

## Usage — reference by name
```html
<!-- decorative / standalone -->
<img src="icons/simSwap.svg" alt="SIM swap" style="width:var(--icon-size);height:var(--icon-size)">
```
When building a new screen, **map each action/entity to its icon by the name in
`registry.json`** — e.g. Add → `add`, Edit → `edit`, Delete → `delete`,
SIM Swap → `simSwap`, Change Plan → `changePlan`, Dashboard → `dashboard`,
Notifications → `notifications`, Filter → `filter` / `advanceFilter`,
Export → `export` / `exportCsv`, Approve → `approved`, Reject → `reject`.

If the exact concept isn't in the registry, pick the **closest listed name** —
do not invent a new icon or reach for another set. If nothing fits, ask before
substituting.
