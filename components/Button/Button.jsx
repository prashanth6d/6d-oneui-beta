const cx = (...c) => c.filter(Boolean).join(' ');

/**
 * Canonical 6D ONE UI button. Five variants + ghost, auto width, no icons
 * inside. Spec: RULES.md §8 / Component/buttons.html.
 */
export function Button({
  variant = 'primary',
  outline = false,
  type = 'button',
  disabled = false,
  className,
  children,
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cx(
        'ds-btn',
        `ds-btn--${variant}`,
        outline && (variant === 'success' || variant === 'danger') && 'ds-btn--outline',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

/** Low-emphasis text button (tertiary / quaternary rung of the ladder). */
export function TextButton({ variant = 'primary', type = 'button', disabled = false, className, children, ...rest }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cx('ds-tbtn', `ds-tbtn--${variant}`, className)}
      {...rest}
    >
      {children}
    </button>
  );
}

/** Binary on/off switch. Controlled via `checked` + `onChange`. */
export function Toggle({ checked = false, onChange, disabled = false, label, className, ...rest }) {
  return (
    <button
      type="button"
      role="switch"
      aria-pressed={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange && onChange(!checked)}
      className={cx('ds-switch', className)}
      {...rest}
    >
      <span className="ds-switch__knob" />
    </button>
  );
}
