import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', ...props }, ref) => (
    <textarea
      ref={ref}
      className={[
        'w-full px-3 py-2 text-sm rounded-md bg-white text-neutral-900',
        'placeholder:text-neutral-400 border border-neutral-200',
        'focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'resize-y min-h-[100px] transition-colors duration-150',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  )
);

Textarea.displayName = 'Textarea';

export default Textarea;
