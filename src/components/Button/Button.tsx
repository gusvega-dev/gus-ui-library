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
    'bg-neutral-900 text-white border-transparent hover:bg-neutral-700 focus:ring-neutral-900',
  secondary:
    'bg-white text-neutral-900 border-neutral-200 hover:bg-neutral-50 focus:ring-neutral-400',
  ghost:
    'bg-transparent text-neutral-600 border-transparent hover:bg-neutral-100 focus:ring-neutral-400',
  inverted:
    'bg-transparent text-white border-white hover:bg-white hover:text-neutral-900 focus:ring-white',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded',
  md: 'px-4 py-2 text-base rounded-md',
  lg: 'px-6 py-3 text-lg rounded-lg',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const classes = [
    'inline-flex items-center justify-center border font-medium',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'transition-colors duration-150',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
