import React from 'react';

interface InputGroupProps {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function InputGroup({ prefix, suffix, placeholder, value, onChange }: InputGroupProps) {
  return (
    <div className="flex items-center border border-neutral-200 rounded-lg focus-within:ring-2 focus-within:ring-neutral-900">
      {prefix && <div className="px-3 text-neutral-400">{prefix}</div>}
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-3 py-2 outline-none"
      />
      {suffix && <div className="px-3 text-neutral-400">{suffix}</div>}
    </div>
  );
}
