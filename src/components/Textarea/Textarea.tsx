import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', error, ...props }, ref) => (
    <textarea
      ref={ref}
      aria-invalid={error ? true : undefined}
      className={[
        'w-full px-3 py-2 text-sm rounded-md bg-background text-foreground',
        'placeholder:text-muted-foreground border border-input',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'resize-y min-h-[100px] transition-colors duration-normal',
        error ? 'border-destructive' : '',
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
