import React from 'react';

interface ChipProps {
  label: string;
  onRemove?: () => void;
  variant?: 'default' | 'secondary' | 'outline';
  icon?: React.ReactNode;
}

export function Chip({ label, onRemove, variant = 'default', icon }: ChipProps) {
  const variantClasses = {
    default: 'bg-neutral-900 text-white',
    secondary: 'bg-neutral-100 text-neutral-900',
    outline: 'border border-neutral-200 text-neutral-900 bg-white',
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${variantClasses[variant]}`}>
      {icon && <span>{icon}</span>}
      <span>{label}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 hover:opacity-70 transition-opacity"
        >
          ✕
        </button>
      )}
    </div>
  );
}
