import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  invert?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', invert = false, ...props }, ref) => (
    <div
      ref={ref}
      className={[
        invert ? 'bg-white/5 border border-white/10' : 'bg-card text-card-foreground border border-border',
        'rounded-xl',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  )
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', invert = false, ...props }, ref) => (
    <div
      ref={ref}
      className={[
        invert ? 'px-6 py-4 border-b border-white/10' : 'px-6 py-4 border-b border-border',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  )
);
CardHeader.displayName = 'CardHeader';

export const CardContent = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', ...props }, ref) => (
    <div ref={ref} className={['px-6 py-5', className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  )
);
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', invert = false, ...props }, ref) => (
    <div
      ref={ref}
      className={[
        invert ? 'px-6 py-4 border-t border-white/10' : 'px-6 py-4 border-t border-border',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  )
);
CardFooter.displayName = 'CardFooter';

export default Card;
