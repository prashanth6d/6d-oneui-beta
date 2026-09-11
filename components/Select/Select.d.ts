import type * as React from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  label?: string;
  /** Options as plain strings or `{ value, label, disabled }` objects. */
  options: Array<string | SelectOption>;
  /** Selected value — a string for single select, `string[]` for multiple. */
  value?: string | string[];
  onChange?: (value: any) => void;
  placeholder?: string;
  /** Multi-select with tags (collapses to "N Selected" past two). */
  multiple?: boolean;
  /** Show the in-panel search field. Default true. */
  searchable?: boolean;
  disabled?: boolean;
  /** Show the clear control once a value is set (single select). Default true. */
  clearable?: boolean;
  /** Copy shown when the search matches nothing. */
  emptyText?: string;
  className?: string;
}

/**
 * Canonical 6D ONE UI select / dropdown.
 *
 * The trigger is the 40px canonical form field; the open panel uses the
 * hairline `--field-list-border`, never the focus border. Supports search,
 * keyboard navigation (↑ ↓ Enter Esc), and multi-select tags.
 * See RULES.md §10.20.
 */
export declare function Select(props: SelectProps): React.JSX.Element;
