import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, ...props }, ref) => (
    <input
      ref={ref}
      className={[
        'w-full px-3 py-2 text-sm rounded-md bg-white text-neutral-900',
        'placeholder:text-neutral-400 border',
        'focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'transition-colors duration-150',
        error ? 'border-neutral-900' : 'border-neutral-200',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  )
);

Input.displayName = 'Input';

export default Input;
