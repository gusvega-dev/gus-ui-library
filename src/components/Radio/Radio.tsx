import React from 'react';

export interface RadioProps {
  checked?: boolean;
  onChange?: (value: string) => void;
  value: string;
  label?: string;
  disabled?: boolean;
  name?: string;
  className?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ checked, onChange, value, label, disabled = false, name, className = '' }, ref) => (
    <label
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
          type="radio"
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={() => onChange?.(value)}
          className="sr-only peer"
        />
        <div className="w-4 h-4 rounded-full border border-input bg-background peer-checked:border-primary transition-colors" />
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
          aria-hidden="true"
        >
          <div className="w-2 h-2 rounded-full bg-primary" />
        </div>
      </div>
      {label && <span className="text-sm text-foreground">{label}</span>}
    </label>
  )
);

Radio.displayName = 'Radio';

export default Radio;
