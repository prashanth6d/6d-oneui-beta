const cx = (...c) => c.filter(Boolean).join(' ');

const ClearIcon = () => (
  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16" height="16">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

/**
 * Canonical single-line form field — 40px, label + value + clear + validation.
 * Spec: RULES.md §9 / Component/Input Field.html.
 */
export function InputField({
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

  const set = (next) => {
    if (!controlled) setInner(next);
    if (onChange) onChange(next);
  };

  return (
    <div className={cx('ds-field-wrap', className)} {...rest}>
      {label && <label className="ds-field-label" htmlFor={fieldId}>{label}</label>}
      <div className={cx('ds-field', error && 'ds-field--err', disabled && 'ds-field--dis')}>
        <input
          {...inputProps}
          id={fieldId}
          ref={inputRef}
          value={val}
          disabled={disabled}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${fieldId}-err` : hint ? `${fieldId}-hint` : undefined}
          onChange={(e) => set(e.target.value)}
        />
        {clearable && !disabled && String(val).length > 0 && (
          <button
            type="button"
            className="ds-field__clear"
            aria-label="Clear"
            onClick={() => { set(''); if (inputRef.current) inputRef.current.focus(); }}
          >
            <ClearIcon />
          </button>
        )}
      </div>
      {error
        ? <div className="ds-field__err" id={`${fieldId}-err`}>{error}</div>
        : hint ? <div className="ds-field__hint" id={`${fieldId}-hint`}>{hint}</div> : null}
    </div>
  );
}
