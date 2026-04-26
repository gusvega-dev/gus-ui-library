'use client';

import React, { useRef, useState } from 'react';

export interface PinInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  /** Mask input like a password field */
  mask?: boolean;
  /** Accept only digits */
  numeric?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export const PinInput: React.FC<PinInputProps> = ({
  length = 6,
  value = '',
  onChange,
  onComplete,
  mask = false,
  numeric = true,
  disabled = false,
  error,
  className = '',
}) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [focused, setFocused] = useState<number | null>(null);

  const digits = Array.from({ length }, (_, i) => value[i] ?? '');

  const handleChange = (index: number, char: string) => {
    const allowed = numeric ? /^\d$/ : /^[a-zA-Z0-9]$/;
    if (char && !allowed.test(char)) return;

    const next = [...digits];
    next[index] = char;
    const joined = next.join('');
    onChange?.(joined);

    if (char && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
    if (joined.length === length && !joined.includes('')) {
      onComplete?.(joined);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (digits[index]) {
        const next = [...digits];
        next[index] = '';
        onChange?.(next.join(''));
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
        const next = [...digits];
        next[index - 1] = '';
        onChange?.(next.join(''));
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').slice(0, length);
    onChange?.(pasted);
    const lastIndex = Math.min(pasted.length, length - 1);
    inputsRef.current[lastIndex]?.focus();
    if (pasted.length === length) onComplete?.(pasted);
  };

  const cellBase = [
    'w-10 h-12 text-center text-base font-semibold rounded-md border',
    'bg-background text-foreground',
    'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
    'transition-colors duration-normal',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    error ? 'border-destructive' : 'border-input',
  ].join(' ');

  return (
    <div className={['flex flex-col gap-1', className].filter(Boolean).join(' ')}>
      <div className="flex gap-2" onPaste={handlePaste}>
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={el => { inputsRef.current[i] = el; }}
            type={mask ? 'password' : 'text'}
            inputMode={numeric ? 'numeric' : 'text'}
            maxLength={1}
            value={digit}
            disabled={disabled}
            aria-label={`Pin digit ${i + 1}`}
            className={[cellBase, focused === i ? 'ring-2 ring-ring border-transparent' : ''].filter(Boolean).join(' ')}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKeyDown(i, e)}
            onFocus={() => setFocused(i)}
            onBlur={() => setFocused(null)}
          />
        ))}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
};

export default PinInput;
