import React from 'react';

export interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  max?: number;
  className?: string;
}

const sizeClasses = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-3xl',
};

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  ({ value, onChange, readonly = false, size = 'md', max = 5, className = '' }, ref) => (
    <div
      ref={ref}
      className={['flex gap-1', className].filter(Boolean).join(' ')}
      role="group"
      aria-label={`Rating: ${value} out of ${max}`}
    >
      {Array.from({ length: max }, (_, i) => i + 1).map(star => (
        <button
          key={star}
          type="button"
          onClick={() => !readonly && onChange?.(star)}
          disabled={readonly}
          aria-label={`${star} star${star !== 1 ? 's' : ''}`}
          aria-pressed={star <= value}
          className={[
            sizeClasses[size],
            'transition-colors',
            star <= value ? 'text-warning' : 'text-muted',
            readonly ? 'cursor-default' : 'cursor-pointer hover:text-warning',
            'disabled:cursor-default',
          ].filter(Boolean).join(' ')}
        >
          ★
        </button>
      ))}
    </div>
  )
);

Rating.displayName = 'Rating';

export default Rating;
