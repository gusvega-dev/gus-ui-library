import React from 'react';

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  id,
  className = '',
}) => (
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
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-4 h-4 rounded border border-neutral-300 bg-white peer-checked:bg-neutral-900 peer-checked:border-neutral-900 transition-colors" />
      <svg
        className="absolute inset-0 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
        viewBox="0 0 16 16"
        fill="none"
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
    {label && <span className="text-sm text-neutral-700">{label}</span>}
  </label>
);

export default Checkbox;
