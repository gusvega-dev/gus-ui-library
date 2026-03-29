import React from 'react';

export type LinkVariant = 'default' | 'muted' | 'underline';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: LinkVariant;
  children: React.ReactNode;
}

const variantClasses: Record<LinkVariant, string> = {
  default: 'text-neutral-900 hover:text-neutral-600 underline underline-offset-2',
  muted: 'text-neutral-500 hover:text-neutral-900',
  underline: 'text-neutral-900 underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-900',
};

export const Link: React.FC<LinkProps> = ({
  variant = 'default',
  className = '',
  children,
  ...props
}) => (
  <a
    className={[
      'text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded',
      variantClasses[variant],
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  >
    {children}
  </a>
);

export default Link;
