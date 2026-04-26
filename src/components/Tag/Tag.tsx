import React from 'react';

export type TagVariant = 'default' | 'secondary' | 'outline';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  onRemove?: () => void;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<TagVariant, string> = {
  default: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  outline: 'bg-transparent text-foreground border border-border',
};

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ variant = 'secondary', onRemove, children, className = '', ...props }, ref) => (
    <span
      ref={ref}
      className={[
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium',
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="flex-shrink-0 ml-0.5 -mr-0.5 rounded hover:opacity-70 transition-opacity focus:outline-none focus:ring-1 focus:ring-current"
          aria-label="Remove"
        >
          <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
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
  )
);

Tag.displayName = 'Tag';

export default Tag;
