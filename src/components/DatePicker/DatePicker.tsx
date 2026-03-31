import React from 'react';

interface DatePickerProps {
  value?: string;
  onChange?: (date: string) => void;
  label?: string;
}

export function DatePicker({ value, onChange, label }: DatePickerProps) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-neutral-900 mb-2">{label}</label>}
      <input
        type="date"
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
      />
    </div>
  );
}
