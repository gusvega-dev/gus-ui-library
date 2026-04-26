'use client';

import React, { useCallback } from 'react';

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'> {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  error?: string;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ value, onChange, min, max, step = 1, disabled, error, className = '', ...props }, ref) => {
    const clamp = useCallback(
      (val: number) => {
        let clamped = val;
        if (min !== undefined) clamped = Math.max(min, clamped);
        if (max !== undefined) clamped = Math.min(max, clamped);
        return clamped;
      },
      [min, max]
    );

    const decrement = () => !disabled && onChange(clamp(value - step));
    const increment = () => !disabled && onChange(clamp(value + step));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = parseFloat(e.target.value);
      if (!isNaN(parsed)) onChange(clamp(parsed));
    };

    const btnBase = [
      'flex items-center justify-center w-8 shrink-0',
      'text-muted-foreground hover:text-foreground',
      'hover:bg-muted transition-colors duration-normal',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'select-none text-base font-medium',
    ].join(' ');

    return (
      <div className="flex flex-col gap-1">
        <div
          className={[
            'flex items-center w-full rounded-md border overflow-hidden',
            'bg-background',
            error ? 'border-destructive' : 'border-input',
            'focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent',
            'transition-colors duration-normal',
            disabled ? 'opacity-50 cursor-not-allowed' : '',
            className,
          ].filter(Boolean).join(' ')}
        >
          <button
            type="button"
            onClick={decrement}
            disabled={disabled || (min !== undefined && value <= min)}
            className={btnBase}
            tabIndex={-1}
            aria-label="Decrease"
          >
            −
          </button>
          <input
            ref={ref}
            type="number"
            value={value}
            onChange={handleChange}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
            className={[
              'flex-1 min-w-0 px-2 py-2 text-sm text-center text-foreground bg-transparent',
              'focus:outline-none',
              '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
            ].join(' ')}
            {...props}
          />
          <button
            type="button"
            onClick={increment}
            disabled={disabled || (max !== undefined && value >= max)}
            className={btnBase}
            tabIndex={-1}
            aria-label="Increase"
          >
            +
          </button>
        </div>
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    );
  }
);

NumberInput.displayName = 'NumberInput';

export default NumberInput;
