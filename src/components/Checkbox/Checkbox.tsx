'use client';

import React, { useId } from 'react';

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked, onChange, label, disabled = false, id, className = '' }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <label
        htmlFor={inputId}
        className={[
          'inline-flex items-center gap-2 cursor-pointer select-none',
          disabled ? 'opacity-50 cursor-not-allowed' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="relative flex-shrink-0">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange?.(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-4 h-4 rounded border border-input bg-background peer-checked:bg-primary peer-checked:border-primary transition-colors" />
          <svg
            className="absolute inset-0 w-4 h-4 text-primary-foreground opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3.5 8.5l2.5 2.5 6-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {label && <span className="text-sm text-foreground">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
