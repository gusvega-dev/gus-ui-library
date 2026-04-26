import React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'ghost';
  'aria-label': string;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

const variantClasses = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost: 'text-foreground hover:bg-muted',
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, size = 'md', variant = 'primary', className = '', ...props }, ref) => (
    <button
      ref={ref}
      className={[
        'flex items-center justify-center rounded-lg transition-colors duration-normal',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizeClasses[size],
        variantClasses[variant],
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {icon}
    </button>
  )
);

IconButton.displayName = 'IconButton';

export default IconButton;
