import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'inverted';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-primary-foreground border-transparent hover:bg-primary/90 focus:ring-ring',
  secondary:
    'bg-background text-foreground border-border hover:bg-muted focus:ring-ring',
  ghost:
    'bg-transparent text-muted-foreground border-transparent hover:bg-muted hover:text-foreground focus:ring-ring',
  inverted:
    'bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary focus:ring-primary-foreground',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-sm',
  md: 'px-4 py-2 text-base rounded-md',
  lg: 'px-6 py-3 text-lg rounded-lg',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const classes = [
      'inline-flex items-center justify-center border font-medium',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'transition-colors duration-normal',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      variantClasses[variant],
      sizeClasses[size],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
