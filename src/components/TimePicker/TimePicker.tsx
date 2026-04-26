'use client';

import React, { useId } from 'react';

export interface TimePickerProps {
  value?: string;
  onChange?: (time: string) => void;
  label?: string;
  id?: string;
  min?: string;
  max?: string;
  step?: number;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
}

export function TimePicker({
  value,
  onChange,
  label,
  id,
  min,
  max,
  step,
  disabled = false,
  required = false,
  error,
  hint,
  className = '',
}: TimePickerProps) {
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
        type="time"
        value={value ?? ''}
        min={min}
        max={max}
        step={step}
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

export default TimePicker;
