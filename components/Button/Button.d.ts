import type * as React from 'react';

/**
 * `ghost` is an alias of `tertiary`: the canonical Cancel button in
 * popup-dialog.html, overlay-panel.html and both pickers is `.btn.ghost`,
 * which renders the Tertiary treatment (surface-0 fill, ink-900 text,
 * line-200 border). Use `ghost` for Cancel so intent reads in the markup.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'success' | 'danger' | 'ghost';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Rung on the action ladder. Exactly one `primary` per action group. */
  variant?: ButtonVariant;
  /** Outlined fill — `success` and `danger` only; ignored on other variants. */
  outline?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

/**
 * Canonical 6D ONE UI button.
 *
 * Width is auto (min 80px), there are no icons inside buttons, and every
 * variant ships Default / Hover / Focused / Disabled. See RULES.md §8.
 */
export declare function Button(props: ButtonProps): React.JSX.Element;

export interface TextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger';
  children?: React.ReactNode;
}

/** Low-emphasis text button — underlines on hover. */
export declare function TextButton(props: TextButtonProps): React.JSX.Element;

export interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean;
  onChange?: (next: boolean) => void;
  /** Accessible name for the switch. */
  label?: string;
}

/** Binary on/off switch (controlled). */
export declare function Toggle(props: ToggleProps): React.JSX.Element;
