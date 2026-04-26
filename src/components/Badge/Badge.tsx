import React from 'react';

export type BadgeVariant = 'default' | 'secondary' | 'outline';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  invert?: boolean;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  outline: 'bg-transparent text-foreground border border-border',
};

const variantInvertClasses: Record<BadgeVariant, string> = {
  default: 'bg-primary-foreground text-primary',
  secondary: 'bg-white/10 text-white',
  outline: 'bg-transparent text-white border border-white/30',
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', invert = false, className = '', children, ...props }, ref) => (
    <span
      ref={ref}
      className={[
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        invert ? variantInvertClasses[variant] : variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </span>
  )
);

Badge.displayName = 'Badge';

export default Badge;
