import React from 'react';

export interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ value, onChange, min = 0, max = 100, step = 1, label, disabled = false, className = '' }, ref) => (
    <div className={['w-full', className].filter(Boolean).join(' ')}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">{label}</label>
      )}
      <div className="flex items-center gap-3">
        <input
          ref={ref}
          type="range"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <span className="text-sm font-semibold text-foreground w-12 text-right" aria-hidden="true">{value}</span>
      </div>
    </div>
  )
);

Slider.displayName = 'Slider';

export default Slider;
