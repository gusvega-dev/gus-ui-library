'use client';

import React, { useId } from 'react';

export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ checked, onChange, label, disabled = false, id, className = '' }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <label
        htmlFor={inputId}
        className={[
          'inline-flex items-center gap-3 cursor-pointer select-none',
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
            role="switch"
            aria-checked={checked}
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange?.(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-9 h-5 rounded-full bg-input peer-checked:bg-primary transition-colors duration-normal" />
          <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-background shadow-sm transition-transform duration-normal peer-checked:translate-x-4" />
        </div>
        {label && <span className="text-sm text-foreground">{label}</span>}
      </label>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;
