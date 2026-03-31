import React from 'react';

interface SearchBoxProps {
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
}

export function SearchBox({ value, onChange, onClear, placeholder = 'Search...' }: SearchBoxProps) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-3 pr-10 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-900"
        >
          ✕
        </button>
      )}
    </div>
  );
}
