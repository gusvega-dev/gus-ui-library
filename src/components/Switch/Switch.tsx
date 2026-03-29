import React from 'react';

export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  id,
  className = '',
}) => (
  <label
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
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-9 h-5 rounded-full bg-neutral-200 peer-checked:bg-neutral-900 transition-colors duration-200" />
      <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 peer-checked:translate-x-4" />
    </div>
    {label && <span className="text-sm text-neutral-700">{label}</span>}
  </label>
);

export default Switch;
