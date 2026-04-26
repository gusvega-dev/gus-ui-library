import React from 'react';

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  onRemove?: () => void;
  variant?: 'default' | 'secondary' | 'outline';
  icon?: React.ReactNode;
}

const variantClasses = {
  default: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  outline: 'border border-border text-foreground bg-background',
};

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ label, onRemove, variant = 'default', icon, className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={[
        'inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm',
        variantClasses[variant],
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      <span>{label}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${label}`}
          className="ml-1 hover:opacity-70 transition-opacity focus:outline-none focus:opacity-70 rounded-full"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  )
);

Chip.displayName = 'Chip';

export default Chip;
