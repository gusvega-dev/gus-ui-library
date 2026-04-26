import React from 'react';

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  invert?: boolean;
  className?: string;
}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ orientation = 'horizontal', invert = false, className = '', ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      className={[
        invert ? 'bg-white/10' : 'bg-border',
        'flex-shrink-0',
        orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  )
);

Separator.displayName = 'Separator';

export default Separator;
