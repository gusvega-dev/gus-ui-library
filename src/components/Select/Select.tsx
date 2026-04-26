import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: SelectOption[];
  placeholder?: string;
  onChange?: (value: string) => void;
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, placeholder, onChange, error, className = '', ...props }, ref) => (
    <div className="relative w-full">
      <select
        ref={ref}
        aria-invalid={error ? true : undefined}
        onChange={(e) => onChange?.(e.target.value)}
        className={[
          'w-full appearance-none px-3 py-2 pr-8 text-sm rounded-md bg-background border',
          'text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
          'disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-normal',
          error ? 'border-destructive' : 'border-input',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map(({ value, label, disabled }) => (
          <option key={value} value={value} disabled={disabled}>
            {label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
        <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
);

Select.displayName = 'Select';

export default Select;
