import type * as React from 'react';

export interface InputFieldProps {
  /** Persistent label above the field — never use the placeholder as a label. */
  label?: string;
  /** Controlled value. Omit for uncontrolled use with `defaultValue`. */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  /** Hint text beneath the field (format or consequence). */
  hint?: string;
  /** Error message. Present = the field renders its error state. */
  error?: string;
  disabled?: boolean;
  /** Show the clear control once the field holds a value. Default true. */
  clearable?: boolean;
  id?: string;
  className?: string;
  /** Extra props forwarded to the inner `<input>`. */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

/**
 * Canonical 6D ONE UI single-line text field.
 *
 * Height is locked at 40px (`--field-h`); hover fills `--surface-50` except
 * when disabled; the clear icon appears once the field holds a value.
 * See RULES.md §9.
 */
export declare function InputField(props: InputFieldProps): React.JSX.Element;
