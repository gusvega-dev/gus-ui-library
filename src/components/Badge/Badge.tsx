import React from 'react';

export type BadgeVariant = 'default' | 'secondary' | 'outline';

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-neutral-900 text-white',
  secondary: 'bg-neutral-100 text-neutral-700',
  outline: 'bg-transparent text-neutral-700 border border-neutral-300',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  className = '',
  children,
}) => (
  <span
    className={[
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      variantClasses[variant],
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {children}
  </span>
);

export default Badge;
