import React from 'react';

export type TagVariant = 'default' | 'secondary' | 'outline';

export interface TagProps {
  variant?: TagVariant;
  onRemove?: () => void;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<TagVariant, string> = {
  default: 'bg-neutral-900 text-white',
  secondary: 'bg-neutral-100 text-neutral-700',
  outline: 'bg-transparent text-neutral-700 border border-neutral-300',
};

export const Tag: React.FC<TagProps> = ({
  variant = 'secondary',
  onRemove,
  children,
  className = '',
}) => (
  <span
    className={[
      'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium',
      variantClasses[variant],
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {children}
    {onRemove && (
      <button
        type="button"
        onClick={onRemove}
        className="flex-shrink-0 ml-0.5 -mr-0.5 rounded hover:opacity-70 transition-opacity focus:outline-none"
        aria-label="Remove"
      >
        <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
          <path
            d="M2 2l8 8M10 2l-8 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    )}
  </span>
);

export default Tag;
