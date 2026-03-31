import React from 'react';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
}

export function Slider({ value, onChange, min = 0, max = 100, step = 1, label }: SliderProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-neutral-900 mb-2">{label}</label>}
      <div className="flex items-center gap-3">
        <input
          type="range"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          step={step}
          className="flex-1 h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-900"
        />
        <span className="text-sm font-semibold text-neutral-900 w-12 text-right">{value}</span>
      </div>
    </div>
  );
}
