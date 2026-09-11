/* @ds-bundle: {"format":4,"namespace":"Ds6DTechnologiesONEUIDesignSystem_9f23d5","components":[{"name":"Button","sourcePath":"components/Button/Button.jsx"},{"name":"TextButton","sourcePath":"components/Button/Button.jsx"},{"name":"Toggle","sourcePath":"components/Button/Button.jsx"},{"name":"InputField","sourcePath":"components/InputField/InputField.jsx"},{"name":"Select","sourcePath":"components/Select/Select.jsx"}],"sourceHashes":{"Component/color-card-render.js":"aaa054c3bd6b","components/Button/Button.jsx":"5898345dca3f","components/InputField/InputField.jsx":"cc766614b1d5","components/Select/Select.jsx":"3e4036a1b87a","login/tweaks-panel.jsx":"6591467622ed"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.Ds6DTechnologiesONEUIDesignSystem_9f23d5 = window.Ds6DTechnologiesONEUIDesignSystem_9f23d5 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// Component/color-card-render.js
try { (() => {
/* Shared renderer for the 6D ONE UI colour reference cards.
   Reads window.PALETTE = [{ title, colors:[ …swatches ] }] and paints
   rich swatch cards: colour panel with WCAG contrast badges (black-text +
   white-text ratio & AA/AAA grades), #HEX / RGBA readouts and a one-line
   usage note (where the colour is used).
   A swatch is either  { name, hex, use }  or a gradient
   { name, gradient:'<css>', stops:[{pct,hex}], use }. All numbers are derived
   from the token value so they can never drift from the source. */
(function () {
  function hexToRgb(hex) {
    hex = hex.replace('#', '').trim();
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    return [0, 2, 4].map(i => parseInt(hex.slice(i, i + 2), 16));
  }
  function lum(r, g, b) {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }
  function grade(ratio, large) {
    if (large) return ratio >= 4.5 ? 'AAA' : ratio >= 3 ? 'AA' : '';
    return ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : '';
  }
  function badgeLabel(ratio) {
    const g = [grade(ratio, false), grade(ratio, true)].filter(Boolean).join(' ');
    return ratio.toFixed(2) + (g ? ' ' + g : '');
  }
  function esc(s) {
    return String(s).replace(/[&<>]/g, c => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;'
    })[c]);
  }
  function swatchCard(sw) {
    if (sw.gradient) {
      const stops = (sw.stops || []).map(s => `<span><span class="cc-stopdot" style="background:${s.hex}"></span>${s.pct} &nbsp;${esc(s.hex.replace('#', '').toUpperCase())}</span>`).join('');
      return `<div class="cc">
        <div class="cc-fill cc-grad" style="background:${sw.gradient}">
          <div class="cc-stops${sw.textDark ? ' dark' : ''}">${stops}</div>
        </div>
        <div class="cc-name">${esc(sw.name)}</div>
        <div class="cc-meta cc-hex">Gradient</div>
        <div class="cc-meta">${(sw.stops || []).map(s => s.hex.toUpperCase()).join(' → ')}</div>
        ${sw.use ? `<div class="cc-use">${esc(sw.use)}</div>` : ''}
      </div>`;
    }
    const [r, g, b] = hexToRgb(sw.hex);
    const L = lum(r, g, b);
    const rBlack = (L + 0.05) / 0.05; // black text on this colour
    const rWhite = 1.05 / (L + 0.05); // white text on this colour
    const HEX = '#' + sw.hex.replace('#', '').toUpperCase();
    return `<div class="cc">
      <div class="cc-fill" style="background:${sw.hex}">
        <div class="cc-badges">
          <span class="cc-badge"><span class="cc-dot dark"></span>${badgeLabel(rBlack)}</span>
          <span class="cc-badge"><span class="cc-dot light"></span>${badgeLabel(rWhite)}</span>
        </div>
      </div>
      <div class="cc-name">${esc(sw.name)}</div>
      <div class="cc-meta cc-hex">${HEX}</div>
      <div class="cc-meta">RGBA (${r}, ${g}, ${b}, 1)</div>
      ${sw.use ? `<div class="cc-use">${esc(sw.use)}</div>` : ''}
    </div>`;
  }
  function render() {
    const root = document.getElementById('palette');
    if (!root || !window.PALETTE) return;
    root.innerHTML = window.PALETTE.map(sec => `
      <section class="cc-section">
        <h2 class="cc-h">${esc(sec.title)}</h2>
        <div class="cc-grid">${sec.colors.map(swatchCard).join('')}</div>
      </section>`).join('');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);else render();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "Component/color-card-render.js", error: String((e && e.message) || e) }); }

// components/Button/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...c) => c.filter(Boolean).join(' ');

/**
 * Canonical 6D ONE UI button. Five variants + ghost, auto width, no icons
 * inside. Spec: RULES.md §8 / Component/buttons.html.
 */
function Button({
  variant = 'primary',
  outline = false,
  type = 'button',
  disabled = false,
  className,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    className: cx('ds-btn', `ds-btn--${variant}`, outline && (variant === 'success' || variant === 'danger') && 'ds-btn--outline', className)
  }, rest), children);
}

/** Low-emphasis text button (tertiary / quaternary rung of the ladder). */
function TextButton({
  variant = 'primary',
  type = 'button',
  disabled = false,
  className,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    className: cx('ds-tbtn', `ds-tbtn--${variant}`, className)
  }, rest), children);
}

/** Binary on/off switch. Controlled via `checked` + `onChange`. */
function Toggle({
  checked = false,
  onChange,
  disabled = false,
  label,
  className,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "switch",
    "aria-pressed": checked,
    "aria-label": label,
    disabled: disabled,
    onClick: () => onChange && onChange(!checked),
    className: cx('ds-switch', className)
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "ds-switch__knob"
  }));
}
Object.assign(__ds_scope, { Button, TextButton, Toggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Button/Button.jsx", error: String((e && e.message) || e) }); }

// components/InputField/InputField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...c) => c.filter(Boolean).join(' ');
const ClearIcon = () => /*#__PURE__*/React.createElement("svg", {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  viewBox: "0 0 24 24",
  width: "16",
  height: "16"
}, /*#__PURE__*/React.createElement("path", {
  d: "M18 6 6 18M6 6l12 12"
}));

/**
 * Canonical single-line form field — 40px, label + value + clear + validation.
 * Spec: RULES.md §9 / Component/Input Field.html.
 */
function InputField({
  label,
  value,
  defaultValue = '',
  onChange,
  placeholder,
  hint,
  error,
  disabled = false,
  clearable = true,
  id,
  className,
  inputProps,
  ...rest
}) {
  const auto = React.useId();
  const fieldId = id || auto;
  const inputRef = React.useRef(null);
  const [inner, setInner] = React.useState(defaultValue);
  const controlled = value !== undefined;
  const val = controlled ? value : inner;
  const set = next => {
    if (!controlled) setInner(next);
    if (onChange) onChange(next);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cx('ds-field-wrap', className)
  }, rest), label && /*#__PURE__*/React.createElement("label", {
    className: "ds-field-label",
    htmlFor: fieldId
  }, label), /*#__PURE__*/React.createElement("div", {
    className: cx('ds-field', error && 'ds-field--err', disabled && 'ds-field--dis')
  }, /*#__PURE__*/React.createElement("input", _extends({}, inputProps, {
    id: fieldId,
    ref: inputRef,
    value: val,
    disabled: disabled,
    placeholder: placeholder,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${fieldId}-err` : hint ? `${fieldId}-hint` : undefined,
    onChange: e => set(e.target.value)
  })), clearable && !disabled && String(val).length > 0 && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ds-field__clear",
    "aria-label": "Clear",
    onClick: () => {
      set('');
      if (inputRef.current) inputRef.current.focus();
    }
  }, /*#__PURE__*/React.createElement(ClearIcon, null))), error ? /*#__PURE__*/React.createElement("div", {
    className: "ds-field__err",
    id: `${fieldId}-err`
  }, error) : hint ? /*#__PURE__*/React.createElement("div", {
    className: "ds-field__hint",
    id: `${fieldId}-hint`
  }, hint) : null);
}
Object.assign(__ds_scope, { InputField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/InputField/InputField.jsx", error: String((e && e.message) || e) }); }

// components/Select/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...c) => c.filter(Boolean).join(' ');
const norm = o => typeof o === 'string' ? {
  value: o,
  label: o
} : o;
const Caret = () => /*#__PURE__*/React.createElement("svg", {
  className: "ds-select__caret",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  viewBox: "0 0 24 24"
}, /*#__PURE__*/React.createElement("path", {
  d: "M6 9l6 6 6-6"
}));
const Search = () => /*#__PURE__*/React.createElement("svg", {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  viewBox: "0 0 24 24"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "11",
  cy: "11",
  r: "7"
}), /*#__PURE__*/React.createElement("path", {
  d: "M21 21l-4-4"
}));
const X = () => /*#__PURE__*/React.createElement("svg", {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2.2",
  viewBox: "0 0 24 24"
}, /*#__PURE__*/React.createElement("path", {
  d: "M18 6 6 18M6 6l12 12"
}));

/**
 * Canonical select / dropdown — single or multi, optionally searchable.
 * Spec: RULES.md §10.20 / Component/Dropdown.html.
 */
function Select({
  label,
  options = [],
  value,
  onChange,
  placeholder = 'Select',
  multiple = false,
  searchable = true,
  disabled = false,
  clearable = true,
  emptyText = 'No results',
  className,
  ...rest
}) {
  const opts = React.useMemo(() => options.map(norm), [options]);
  const [open, setOpen] = React.useState(false);
  const [q, setQ] = React.useState('');
  const [active, setActive] = React.useState(-1);
  const root = React.useRef(null);
  const searchRef = React.useRef(null);
  const selected = multiple ? Array.isArray(value) ? value : [] : value;
  React.useEffect(() => {
    if (!open) return;
    const away = e => {
      if (root.current && !root.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', away);
    return () => document.removeEventListener('mousedown', away);
  }, [open]);
  React.useEffect(() => {
    if (open && searchable && searchRef.current) searchRef.current.focus();
    if (!open) {
      setQ('');
      setActive(-1);
    }
  }, [open, searchable]);
  const visible = opts.filter(o => o.label.toLowerCase().includes(q.toLowerCase()));
  const commit = opt => {
    if (opt.disabled) return;
    if (multiple) {
      const next = selected.includes(opt.value) ? selected.filter(v => v !== opt.value) : [...selected, opt.value];
      onChange && onChange(next);
    } else {
      onChange && onChange(opt.value);
      setOpen(false);
    }
  };
  const onKeyDown = e => {
    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (!open && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      if (!disabled) setOpen(true);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(i => Math.min(i + 1, visible.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (visible[active]) commit(visible[active]);
    }
  };
  const labelFor = v => (opts.find(o => o.value === v) || {}).label || v;
  const hasValue = multiple ? selected.length > 0 : value !== undefined && value !== null && value !== '';
  let display;
  if (multiple) {
    display = selected.length === 0 ? /*#__PURE__*/React.createElement("span", {
      className: "ds-select__value ds-select__value--ph"
    }, placeholder) : selected.length <= 2 ? /*#__PURE__*/React.createElement("span", {
      className: "ds-select__tags"
    }, selected.map(v => /*#__PURE__*/React.createElement("span", {
      className: "ds-select__tag",
      key: v
    }, labelFor(v), /*#__PURE__*/React.createElement("button", {
      type: "button",
      "aria-label": `Remove ${labelFor(v)}`,
      onClick: e => {
        e.stopPropagation();
        onChange && onChange(selected.filter(s => s !== v));
      }
    }, /*#__PURE__*/React.createElement(X, null))))) : /*#__PURE__*/React.createElement("span", {
      className: "ds-select__value"
    }, selected.length, " Selected");
  } else {
    display = hasValue ? /*#__PURE__*/React.createElement("span", {
      className: "ds-select__value"
    }, labelFor(value)) : /*#__PURE__*/React.createElement("span", {
      className: "ds-select__value ds-select__value--ph"
    }, placeholder);
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cx('ds-field-wrap', className)
  }, rest), label && /*#__PURE__*/React.createElement("span", {
    className: "ds-field-label"
  }, label), /*#__PURE__*/React.createElement("div", {
    ref: root,
    className: cx('ds-select', open && 'ds-select--open', multiple && 'ds-select--multi'),
    onKeyDown: onKeyDown
  }, /*#__PURE__*/React.createElement("div", {
    className: cx('ds-select__trigger', disabled && 'ds-select__trigger--dis'),
    role: "combobox",
    tabIndex: disabled ? -1 : 0,
    "aria-haspopup": "listbox",
    "aria-expanded": open,
    "aria-disabled": disabled || undefined,
    onClick: () => {
      if (!disabled) setOpen(o => !o);
    }
  }, display, clearable && hasValue && !disabled && !multiple && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ds-select__clear",
    "aria-label": "Clear selection",
    onClick: e => {
      e.stopPropagation();
      onChange && onChange('');
    }
  }, /*#__PURE__*/React.createElement(X, null)), /*#__PURE__*/React.createElement(Caret, null)), open && /*#__PURE__*/React.createElement("div", {
    className: "ds-select__panel",
    role: "listbox"
  }, searchable && /*#__PURE__*/React.createElement("div", {
    className: "ds-select__search"
  }, /*#__PURE__*/React.createElement(Search, null), /*#__PURE__*/React.createElement("input", {
    ref: searchRef,
    value: q,
    placeholder: "Search",
    onChange: e => {
      setQ(e.target.value);
      setActive(-1);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "ds-select__opts"
  }, visible.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "ds-select__empty"
  }, emptyText), visible.map((o, i) => {
    const isSel = multiple ? selected.includes(o.value) : value === o.value;
    return /*#__PURE__*/React.createElement("div", {
      key: o.value,
      role: "option",
      "aria-selected": isSel,
      className: cx('ds-select__opt', isSel && 'ds-select__opt--sel', i === active && 'ds-select__opt--active', o.disabled && 'ds-select__opt--dis'),
      onClick: () => commit(o)
    }, o.label);
  })))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Select/Select.jsx", error: String((e && e.message) || e) }); }

// login/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "login/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.TextButton = __ds_scope.TextButton;

__ds_ns.Toggle = __ds_scope.Toggle;

__ds_ns.InputField = __ds_scope.InputField;

__ds_ns.Select = __ds_scope.Select;

})();
