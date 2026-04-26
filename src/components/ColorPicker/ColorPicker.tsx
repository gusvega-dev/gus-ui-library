'use client';

import React, { useRef } from 'react';

export interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
  /** Show hex text input alongside the swatch. Default: true */
  showInput?: boolean;
  className?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  disabled = false,
  error,
  showInput = true,
  className = '',
}) => {
  const nativeRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    onChange(raw);
  };

  const handleNativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={['flex flex-col gap-1', className].filter(Boolean).join(' ')}>
      <div
        className={[
          'inline-flex items-center gap-2 w-full px-2.5 py-2 rounded-md border',
          'bg-background',
          error ? 'border-destructive' : 'border-input',
          'focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent',
          'transition-colors duration-normal',
          disabled ? 'opacity-50 cursor-not-allowed' : '',
        ].filter(Boolean).join(' ')}
      >
        {/* Color swatch — clicking it opens the native color picker */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => nativeRef.current?.click()}
          className="relative w-6 h-6 rounded shrink-0 border border-border overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring"
          style={{ backgroundColor: value }}
          aria-label="Pick color"
        >
          <input
            ref={nativeRef}
            type="color"
            value={value.startsWith('#') ? value : '#000000'}
            onChange={handleNativeChange}
            disabled={disabled}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            tabIndex={-1}
          />
        </button>

        {showInput && (
          <input
            type="text"
            value={value}
            onChange={handleTextChange}
            disabled={disabled}
            placeholder="#000000"
            maxLength={9}
            className="flex-1 min-w-0 bg-transparent text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        )}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
};

export default ColorPicker;
