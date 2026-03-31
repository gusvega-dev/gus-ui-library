import React from 'react';

interface AdvancedBadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  onRemove?: () => void;
}

export function AdvancedBadge({ label, variant = 'primary', onRemove }: AdvancedBadgeProps) {
  const variantClass = { primary: 'bg-blue-100 text-blue-800', secondary: 'bg-gray-100 text-gray-800', success: 'bg-green-100 text-green-800', warning: 'bg-yellow-100 text-yellow-800', error: 'bg-red-100 text-red-800' }[variant];
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${variantClass}`}>
      <span>{label}</span>
      {onRemove && (
        <button onClick={onRemove} className="ml-1 hover:opacity-70 transition">
          ✕
        </button>
      )}
    </div>
  );
}
