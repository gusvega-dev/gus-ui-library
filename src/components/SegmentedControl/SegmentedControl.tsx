import React from 'react';

interface SegmentOption { value: string; label: string }
interface SegmentedControlProps {
  options: SegmentOption[];
  value?: string;
  onChange?: (value: string) => void;
}

export function SegmentedControl({ options, value, onChange }: SegmentedControlProps) {
  return (
    <div className="inline-flex rounded-lg bg-neutral-100 p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange?.(opt.value)}
          className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
            value === opt.value ? 'bg-white text-neutral-900 shadow' : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
