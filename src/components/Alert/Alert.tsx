import React from 'react';

export type AlertVariant = 'default' | 'outline' | 'filled';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<AlertVariant, string> = {
  default: 'bg-muted border border-border text-foreground',
  outline: 'bg-background border border-foreground text-foreground',
  filled: 'bg-primary border border-primary text-primary-foreground',
};

const bodyClasses: Record<AlertVariant, string> = {
  default: 'text-muted-foreground',
  outline: 'text-foreground',
  filled: 'text-primary-foreground/80',
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'default', title, children, className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={[
        'rounded-lg px-4 py-3',
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="alert"
      {...props}
    >
      {title && (
        <p className="text-sm font-semibold mb-1">{title}</p>
      )}
      <p className={['text-sm leading-relaxed', bodyClasses[variant]].join(' ')}>
        {children}
      </p>
    </div>
  )
);

Alert.displayName = 'Alert';

export default Alert;
