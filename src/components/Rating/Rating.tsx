import React from 'react';

interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Rating({ value, onChange, readonly = false, size = 'md' }: RatingProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          onClick={() => !readonly && onChange?.(star)}
          disabled={readonly}
          className={`${sizeClasses[size]} transition-colors ${
            star <= value
              ? 'text-yellow-400'
              : 'text-neutral-300'
          } ${readonly ? 'cursor-default' : 'cursor-pointer hover:text-yellow-400'}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
