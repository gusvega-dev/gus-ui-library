'use client';

import React from 'react';

export interface ToggleGroupOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ToggleGroupProps {
  options: ToggleGroupOption[];
  value?: string;
  onChange?: (value: string) => void;
  multiple?: boolean;
  className?: string;
}

export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ options, value, onChange, multiple = false, className = '' }, ref) => {
    const [selected, setSelected] = React.useState<string | string[]>(
      value ?? (multiple ? [] : '')
    );

    const handleToggle = (val: string) => {
      if (multiple) {
        const arr = Array.isArray(selected) ? selected : [];
        const next = arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];
        setSelected(next);
        onChange?.(next.join(','));
      } else {
        const next = selected === val ? '' : val;
        setSelected(next);
        onChange?.(next as string);
      }
    };

    const isSelected = (val: string) =>
      Array.isArray(selected) ? selected.includes(val) : selected === val;

    return (
      <div
        ref={ref}
        role="group"
        className={[
          'inline-flex rounded-lg border border-border p-1 bg-muted',
          className,
        ].filter(Boolean).join(' ')}
      >
        {options.map(opt => (
          <button
            key={opt.value}
            type="button"
            onClick={() => handleToggle(opt.value)}
            disabled={opt.disabled}
            aria-pressed={isSelected(opt.value)}
            className={[
              'px-4 py-2 rounded transition-all text-sm font-medium',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset',
              isSelected(opt.value)
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
              opt.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
            ].filter(Boolean).join(' ')}
          >
            {opt.label}
          </button>
        ))}
      </div>
    );
  }
);

ToggleGroup.displayName = 'ToggleGroup';

export default ToggleGroup;
