import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  invert?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, invert = false, ...props }, ref) => (
    <input
      ref={ref}
      className={[
        'w-full px-3 py-2 text-sm rounded-md',
        invert
          ? 'bg-white/10 text-white placeholder:text-white/40 border-white/20 focus:ring-white'
          : 'bg-white text-neutral-900 placeholder:text-neutral-400 border-neutral-200 focus:ring-neutral-900',
        'border focus:outline-none focus:ring-2 focus:border-transparent',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'transition-colors duration-150',
        error ? (invert ? 'border-white' : 'border-neutral-900') : '',
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
