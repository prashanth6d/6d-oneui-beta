const cx = (...c) => c.filter(Boolean).join(' ');
const norm = (o) => (typeof o === 'string' ? { value: o, label: o } : o);

const Caret = () => (
  <svg className="ds-select__caret" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M6 9l6 6 6-6" />
  </svg>
);
const Search = () => (
  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" />
  </svg>
);
const X = () => (
  <svg fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

/**
 * Canonical select / dropdown — single or multi, optionally searchable.
 * Spec: RULES.md §10.20 / Component/Dropdown.html.
 */
export function Select({
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

  const selected = multiple ? (Array.isArray(value) ? value : []) : value;

  React.useEffect(() => {
    if (!open) return;
    const away = (e) => { if (root.current && !root.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', away);
    return () => document.removeEventListener('mousedown', away);
  }, [open]);

  React.useEffect(() => {
    if (open && searchable && searchRef.current) searchRef.current.focus();
    if (!open) { setQ(''); setActive(-1); }
  }, [open, searchable]);

  const visible = opts.filter((o) => o.label.toLowerCase().includes(q.toLowerCase()));

  const commit = (opt) => {
    if (opt.disabled) return;
    if (multiple) {
      const next = selected.includes(opt.value)
        ? selected.filter((v) => v !== opt.value)
        : [...selected, opt.value];
      onChange && onChange(next);
    } else {
      onChange && onChange(opt.value);
      setOpen(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') { setOpen(false); return; }
    if (!open && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); if (!disabled) setOpen(true); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((i) => Math.min(i + 1, visible.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((i) => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); if (visible[active]) commit(visible[active]); }
  };

  const labelFor = (v) => (opts.find((o) => o.value === v) || {}).label || v;
  const hasValue = multiple ? selected.length > 0 : value !== undefined && value !== null && value !== '';

  let display;
  if (multiple) {
    display = selected.length === 0
      ? <span className="ds-select__value ds-select__value--ph">{placeholder}</span>
      : selected.length <= 2
        ? (
          <span className="ds-select__tags">
            {selected.map((v) => (
              <span className="ds-select__tag" key={v}>
                {labelFor(v)}
                <button
                  type="button"
                  aria-label={`Remove ${labelFor(v)}`}
                  onClick={(e) => { e.stopPropagation(); onChange && onChange(selected.filter((s) => s !== v)); }}
                ><X /></button>
              </span>
            ))}
          </span>
        )
        : <span className="ds-select__value">{selected.length} Selected</span>;
  } else {
    display = hasValue
      ? <span className="ds-select__value">{labelFor(value)}</span>
      : <span className="ds-select__value ds-select__value--ph">{placeholder}</span>;
  }

  return (
    <div className={cx('ds-field-wrap', className)} {...rest}>
      {label && <span className="ds-field-label">{label}</span>}
      <div
        ref={root}
        className={cx('ds-select', open && 'ds-select--open', multiple && 'ds-select--multi')}
        onKeyDown={onKeyDown}
      >
        <div
          className={cx('ds-select__trigger', disabled && 'ds-select__trigger--dis')}
          role="combobox"
          tabIndex={disabled ? -1 : 0}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-disabled={disabled || undefined}
          onClick={() => { if (!disabled) setOpen((o) => !o); }}
        >
          {display}
          {clearable && hasValue && !disabled && !multiple && (
            <button
              type="button"
              className="ds-select__clear"
              aria-label="Clear selection"
              onClick={(e) => { e.stopPropagation(); onChange && onChange(''); }}
            ><X /></button>
          )}
          <Caret />
        </div>

        {open && (
          <div className="ds-select__panel" role="listbox">
            {searchable && (
              <div className="ds-select__search">
                <Search />
                <input
                  ref={searchRef}
                  value={q}
                  placeholder="Search"
                  onChange={(e) => { setQ(e.target.value); setActive(-1); }}
                />
              </div>
            )}
            <div className="ds-select__opts">
              {visible.length === 0 && <div className="ds-select__empty">{emptyText}</div>}
              {visible.map((o, i) => {
                const isSel = multiple ? selected.includes(o.value) : value === o.value;
                return (
                  <div
                    key={o.value}
                    role="option"
                    aria-selected={isSel}
                    className={cx(
                      'ds-select__opt',
                      isSel && 'ds-select__opt--sel',
                      i === active && 'ds-select__opt--active',
                      o.disabled && 'ds-select__opt--dis'
                    )}
                    onClick={() => commit(o)}
                  >
                    {o.label}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
