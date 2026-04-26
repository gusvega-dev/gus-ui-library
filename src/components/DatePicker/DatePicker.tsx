'use client';

import React, { useId } from 'react';

export interface DatePickerProps {
  value?: string;
  onChange?: (date: string) => void;
  label?: string;
  id?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  hint?: string;
  placeholder?: string;
  className?: string;
}

export function DatePicker({
  value,
  onChange,
  label,
  id,
  min,
  max,
  disabled = false,
  required = false,
  error,
  hint,
  className = '',
}: DatePickerProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;

  const describedBy = [error ? errorId : null, hint && !error ? hintId : null]
    .filter(Boolean)
    .join(' ') || undefined;

  return (
    <div className={['flex flex-col gap-1.5', className].filter(Boolean).join(' ')}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-foreground">
          {label}
          {required && <span className="ml-0.5 text-muted-foreground" aria-hidden="true">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type="date"
        value={value ?? ''}
        min={min}
        max={max}
        disabled={disabled}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        onChange={(e) => onChange?.(e.target.value)}
        className={[
          'w-full px-3 py-2 text-sm rounded-md border bg-background text-foreground',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'transition-colors duration-normal',
          error ? 'border-destructive' : 'border-input',
        ]
          .filter(Boolean)
          .join(' ')}
      />
      {error && (
        <p id={errorId} className="text-xs text-destructive font-medium" role="alert">
          {error}
        </p>
      )}
      {!error && hint && (
        <p id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  );
}

export default DatePicker;
